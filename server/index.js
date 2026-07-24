import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import Anthropic from '@anthropic-ai/sdk';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = join(__dirname, 'data');
const CAMPAIGNS_DIR = join(DATA_DIR, 'campaigns');

// Ensure data directories exist
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(CAMPAIGNS_DIR)) mkdirSync(CAMPAIGNS_DIR, { recursive: true });

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, '../client/dist')));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// D&D 5e Constants
const RACES = {
  human: { name: 'Humano', bonuses: { ability: 2 } },
  elf: { name: 'Elfo', bonuses: { dexterity: 2, wisdom: 1 } },
  dwarf: { name: 'Enano', bonuses: { constitution: 2, wisdom: 1 } },
  halfling: { name: 'Mediano', bonuses: { dexterity: 2, charisma: 1 } },
  dragonborn: { name: 'Dracónido', bonuses: { strength: 2, charisma: 1 } },
  gnome: { name: 'Gnomo', bonuses: { intelligence: 2, constitution: 1 } },
  'half-elf': { name: 'Semielfo', bonuses: { charisma: 2, ability: 2 } },
  'half-orc': { name: 'Semiorco', bonuses: { strength: 2, constitution: 1 } },
  tiefling: { name: 'Tiefling', bonuses: { charisma: 2, intelligence: 1 } },
  kobold: { name: 'Kobold', bonuses: { dexterity: 2, strength: -2 } },
  orc: { name: 'Orco', bonuses: { strength: 2, constitution: 1 } },
};

const CLASSES = {
  barbarian: { name: 'Bárbaro', hit_die: 12 },
  bard: { name: 'Bardo', hit_die: 8 },
  cleric: { name: 'Clérigo', hit_die: 8 },
  druid: { name: 'Druida', hit_die: 8 },
  fighter: { name: 'Guerrero', hit_die: 10 },
  monk: { name: 'Monje', hit_die: 8 },
  paladin: { name: 'Paladín', hit_die: 10 },
  ranger: { name: 'Explorador', hit_die: 10 },
  rogue: { name: 'Pícaro', hit_die: 8 },
  sorcerer: { name: 'Hechicero', hit_die: 6 },
  warlock: { name: 'Brujo', hit_die: 8 },
  wizard: { name: 'Mago', hit_die: 6 },
};

const ABILITY_SCORES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

// Helper functions
function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

function saveCampaign(campaign) {
  const path = join(CAMPAIGNS_DIR, `${campaign.id}.json`);
  writeFileSync(path, JSON.stringify(campaign, null, 2));
}

function loadCampaign(id) {
  const path = join(CAMPAIGNS_DIR, `${id}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function listCampaigns() {
  if (!existsSync(CAMPAIGNS_DIR)) return [];
  return require('fs').readdirSync(CAMPAIGNS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const campaign = JSON.parse(readFileSync(join(CAMPAIGNS_DIR, f), 'utf-8'));
      return {
        id: campaign.id,
        name: campaign.name,
        createdAt: campaign.createdAt,
        lastPlayed: campaign.lastPlayed,
        playerCount: campaign.players.length
      };
    });
}

// API Routes

// Create a new campaign
app.post('/api/campaigns', (req, res) => {
  const { name, players } = req.body;
  const campaign = {
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
    lastPlayed: new Date().toISOString(),
    players: players || [],
    currentScene: 0,
    narrative: [],
    combatActive: false,
    combatants: [],
    currentInitiativeRound: 0,
    worldState: {
      location: '',
      weather: '',
      atmosphere: ''
    }
  };
  saveCampaign(campaign);
  res.json(campaign);
});

// Get all campaigns
app.get('/api/campaigns', (req, res) => {
  res.json(listCampaigns());
});

// Get specific campaign
app.get('/api/campaigns/:id', (req, res) => {
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
  res.json(campaign);
});

// Save campaign state
app.put('/api/campaigns/:id', (req, res) => {
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  const updated = { ...campaign, ...req.body, lastPlayed: new Date().toISOString() };
  saveCampaign(updated);
  res.json(updated);
});

// Start new adventure (AI generates initial narrative)
app.post('/api/campaigns/:id/start-adventure', async (req, res) => {
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  const playerDescriptions = campaign.players
    .map(p => `${p.name} (${p.race} ${p.class}), nivel ${p.level}`)
    .join(', ');

  const prompt = `Eres un Dungeon Master de D&D 5ª edición creativo y divertido. Los siguientes personajes de nivel 4 comienzan una nueva aventura: ${playerDescriptions}.

Crea el inicio de una aventura completamente nueva e independiente. Describe:
1. Dónde se encuentran los personajes en este momento
2. Qué ven a su alrededor
3. Una situación interesante que los involucra
4. 2-3 acciones posibles que podrían tomar

Sé narrativo, utiliza detalles sensoriales y mantén un tono épico pero accesible. La aventura debe ser completamente nueva, sin conexión con campañas anteriores.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const narrative = message.content[0].type === 'text' ? message.content[0].text : '';
    campaign.narrative.push({
      timestamp: new Date().toISOString(),
      type: 'dm-narrative',
      content: narrative,
      scene: 0
    });

    saveCampaign(campaign);
    res.json({ narrative, campaign });
  } catch (error) {
    console.error('Error calling Claude:', error);
    res.status(500).json({ error: 'Failed to generate adventure' });
  }
});

// Player action - get DM response
app.post('/api/campaigns/:id/player-action', async (req, res) => {
  const { playerName, action } = req.body;
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  const recentNarrative = campaign.narrative.slice(-3).map(n => n.content).join('\n\n');
  const prompt = `Eres un Dungeon Master de D&D 5ª edición. Este es el contexto reciente de la aventura:

${recentNarrative}

El personaje ${playerName} dice: "${action}"

Responde de forma narrativa y coherente con el contexto. Describe las consecuencias de su acción, qué ocurre en el mundo, y si es necesario, sugiere 2-3 acciones alternativas que podrían tomar los personajes si el jugador no sabe qué hacer a continuación. Mantén un tono épico y divertido.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }]
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    campaign.narrative.push({
      timestamp: new Date().toISOString(),
      type: 'player-action',
      player: playerName,
      action: action
    });
    campaign.narrative.push({
      timestamp: new Date().toISOString(),
      type: 'dm-response',
      content: response
    });

    saveCampaign(campaign);
    res.json({ response, campaign });
  } catch (error) {
    console.error('Error calling Claude:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Initiative roll - start combat
app.post('/api/campaigns/:id/initiative', (req, res) => {
  const { rolls } = req.body; // Array of { playerName, initiative }
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  campaign.combatActive = true;
  campaign.currentInitiativeRound++;

  // Sort by initiative (descending)
  const sorted = [...rolls].sort((a, b) => b.initiative - a.initiative);

  campaign.combatants = sorted.map((s, idx) => ({
    order: idx + 1,
    playerName: s.playerName,
    initiative: s.initiative,
    hp: campaign.players.find(p => p.name === s.playerName)?.hp || 20,
    active: idx === 0
  }));

  saveCampaign(campaign);
  res.json({ combatants: campaign.combatants, message: 'Ronda de iniciativa lanzada. ¡Que empiece el combate!' });
});

// Process attack roll
app.post('/api/campaigns/:id/attack', async (req, res) => {
  const { attacker, defender, attackRoll, damage, damageType } = req.body;
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  // Find AC of defender or assume enemy
  const defenderChar = campaign.players.find(p => p.name === defender);
  const ac = defenderChar?.ac || 14; // Default enemy AC

  const hit = attackRoll >= ac;
  const actualDamage = hit ? damage : 0;

  // Update HP if it's a player character
  if (defenderChar) {
    defenderChar.hp = Math.max(0, defenderChar.hp - actualDamage);
  }

  const combatant = campaign.combatants.find(c => c.playerName === defender);
  if (combatant) {
    combatant.hp = Math.max(0, combatant.hp - actualDamage);
  }

  const result = {
    attacker,
    defender,
    roll: attackRoll,
    ac,
    hit,
    damage: actualDamage,
    message: hit
      ? `¡Golpe! ${attacker} acierta a ${defender} por ${actualDamage} de daño (${damageType}).`
      : `¡Fallo! El ataque de ${attacker} no acierta a ${defender}.`
  };

  saveCampaign(campaign);
  res.json(result);
});

// End combat
app.post('/api/campaigns/:id/end-combat', (req, res) => {
  const campaign = loadCampaign(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  campaign.combatActive = false;
  campaign.combatants = [];

  saveCampaign(campaign);
  res.json({ message: 'Combate finalizado', campaign });
});

// Get D&D reference data
app.get('/api/dnd-data', (req, res) => {
  res.json({
    races: RACES,
    classes: CLASSES,
    abilityScores: ABILITY_SCORES
  });
});

// Validate ability scores sum (4d6 drop lowest for standard array)
app.post('/api/validate-scores', (req, res) => {
  const { scores } = req.body;
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  const isValid = sum >= 70 && sum <= 80; // Reasonable range
  res.json({ valid: isValid, sum });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎲 DMAI Server running on port ${PORT}`);
  console.log(`Make sure ANTHROPIC_API_KEY is set in your environment`);
});
