import { useState } from 'react';
import { dndAPI } from '../api';

export default function CharacterCreator({ dndData, onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({
    name: '',
    race: 'human',
    class: 'fighter',
    level: 4,
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    hp: 20,
    ac: 10,
    skills: []
  });

  const handleStatChange = (stat, value) => {
    const numValue = parseInt(value);
    if (numValue >= 3 && numValue <= 20) {
      setCharacter({
        ...character,
        stats: { ...character.stats, [stat]: numValue }
      });
    }
  };

  const handleCharacterChange = (field, value) => {
    setCharacter({ ...character, [field]: value });
  };

  const handleSave = () => {
    if (!character.name.trim()) {
      alert('El personaje necesita un nombre');
      return;
    }
    onSave(character);
  };

  const getModifier = (score) => Math.floor((score - 10) / 2);

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>Crear Personaje</h3>

      {step === 1 && (
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => handleCharacterChange('name', e.target.value)}
            placeholder="ej: Tharok"
          />

          <label>Raza:</label>
          <select
            value={character.race}
            onChange={(e) => handleCharacterChange('race', e.target.value)}
          >
            {Object.entries(dndData.races).map(([key, race]) => (
              <option key={key} value={key}>{race.name}</option>
            ))}
          </select>

          <label>Clase:</label>
          <select
            value={character.class}
            onChange={(e) => handleCharacterChange('class', e.target.value)}
          >
            {Object.entries(dndData.classes).map(([key, cls]) => (
              <option key={key} value={key}>{cls.name}</option>
            ))}
          </select>

          <label>Nivel:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={character.level}
            onChange={(e) => handleCharacterChange('level', parseInt(e.target.value))}
          />

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setStep(2)}
              style={{ marginRight: '10px' }}
            >
              Siguiente →
            </button>
            <button className="secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ marginBottom: '20px', color: '#d4af37' }}>
            Distribuye tus puntuaciones de habilidad (3-18)
          </p>

          <div className="stats">
            {dndData.abilityScores.map(ability => (
              <div key={ability} className="stat">
                <div className="stat-name">{ability.slice(0, 3).toUpperCase()}</div>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={character.stats[ability]}
                  onChange={(e) => handleStatChange(ability, e.target.value)}
                  style={{ textAlign: 'center', marginBottom: '0' }}
                />
                <div className="stat-modifier">
                  {getModifier(character.stats[ability]) > 0 ? '+' : ''}{getModifier(character.stats[ability])}
                </div>
              </div>
            ))}
          </div>

          <label style={{ marginTop: '20px' }}>Puntos de Vida (HP):</label>
          <input
            type="number"
            min="1"
            value={character.hp}
            onChange={(e) => handleCharacterChange('hp', parseInt(e.target.value))}
          />

          <label>Clase de Armadura (AC):</label>
          <input
            type="number"
            min="8"
            max="20"
            value={character.ac}
            onChange={(e) => handleCharacterChange('ac', parseInt(e.target.value))}
          />

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setStep(1)}
              style={{ marginRight: '10px' }}
            >
              ← Atrás
            </button>
            <button
              onClick={handleSave}
              style={{ marginRight: '10px' }}
            >
              ✅ Guardar Personaje
            </button>
            <button className="secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
