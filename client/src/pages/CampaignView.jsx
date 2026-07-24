import { useState, useEffect, useRef } from 'react';
import { campaignAPI } from '../api';
import Narrative from '../components/Narrative';
import ActionPanel from '../components/ActionPanel';
import Combat from '../components/Combat';
import InitiativeRoller from '../components/InitiativeRoller';

export default function CampaignView({ campaignId, onNavigate }) {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInitiativeRoller, setShowInitiativeRoller] = useState(false);
  const narrativeEndRef = useRef(null);

  useEffect(() => {
    loadCampaign();
  }, [campaignId]);

  useEffect(() => {
    if (narrativeEndRef.current) {
      narrativeEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [campaign?.narrative]);

  const loadCampaign = async () => {
    try {
      const res = await campaignAPI.getOne(campaignId);
      setCampaign(res.data);
      setGameStarted(res.data.narrative.length > 0);
    } catch (err) {
      console.error('Error loading campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAdventure = async () => {
    setLoading(true);
    try {
      const res = await campaignAPI.startAdventure(campaignId);
      setCampaign(res.data.campaign);
      setGameStarted(true);
    } catch (err) {
      console.error('Error starting adventure:', err);
      alert('Error al iniciar la aventura');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerAction = async (playerName, action) => {
    setLoading(true);
    try {
      const res = await campaignAPI.playerAction(campaignId, playerName, action);
      setCampaign(res.data.campaign);
    } catch (err) {
      console.error('Error processing action:', err);
      alert('Error al procesar la acción');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiativeSubmit = async (rolls) => {
    setLoading(true);
    try {
      const res = await campaignAPI.initiative(campaignId, rolls);
      setCampaign(prev => ({
        ...prev,
        combatActive: true,
        combatants: res.data.combatants
      }));
      setShowInitiativeRoller(false);
    } catch (err) {
      console.error('Error rolling initiative:', err);
      alert('Error al lanzar iniciativa');
    } finally {
      setLoading(false);
    }
  };

  const handleAttack = async (attacker, defender, roll, damage, damageType) => {
    setLoading(true);
    try {
      const res = await campaignAPI.attack(campaignId, attacker, defender, roll, damage, damageType);
      setCampaign(res.data.campaign);
      alert(res.data.message);
    } catch (err) {
      console.error('Error processing attack:', err);
      alert('Error al procesar el ataque');
    } finally {
      setLoading(false);
    }
  };

  const handleEndCombat = async () => {
    setLoading(true);
    try {
      const res = await campaignAPI.endCombat(campaignId);
      setCampaign(res.data.campaign);
    } catch (err) {
      console.error('Error ending combat:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !campaign) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando campaña...</p>
      </div>
    );
  }

  if (!campaign) {
    return <div className="card">Error al cargar la campaña</div>;
  }

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <div>
          <h2>{campaign.name}</h2>
          <p style={{ color: '#aaa' }}>Nivel 4 • {campaign.players.length} jugadores</p>
        </div>
        <button className="secondary" onClick={() => onNavigate('home')}>
          ← Volver
        </button>
      </div>

      {!gameStarted ? (
        <div className="card text-center">
          <h3>¡Bienvenidos a la aventura!</h3>
          <p style={{ marginBottom: '20px', fontSize: '15px' }}>
            Pulsa el botón para que la IA genere el inicio de vuestra aventura.
          </p>
          <button
            onClick={handleStartAdventure}
            disabled={loading}
            style={{
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Generando...' : '🎬 Comenzar Aventura'}
          </button>
        </div>
      ) : (
        <>
          <Narrative campaign={campaign} />
          <div ref={narrativeEndRef} />

          {campaign.combatActive ? (
            <>
              <Combat
                combatants={campaign.combatants}
                players={campaign.players}
                onAttack={handleAttack}
                onEndCombat={handleEndCombat}
                loading={loading}
              />
            </>
          ) : (
            <>
              {!showInitiativeRoller && (
                <ActionPanel
                  players={campaign.players}
                  onAction={handlePlayerAction}
                  onStartCombat={() => setShowInitiativeRoller(true)}
                  loading={loading}
                />
              )}
              {showInitiativeRoller && (
                <InitiativeRoller
                  players={campaign.players}
                  onSubmit={handleInitiativeSubmit}
                  onCancel={() => setShowInitiativeRoller(false)}
                  loading={loading}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
