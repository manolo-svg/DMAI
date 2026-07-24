import { useState } from 'react';

export default function InitiativeRoller({ players, onSubmit, onCancel, loading }) {
  const [initiatives, setInitiatives] = useState(
    players.map(p => ({ playerName: p.name, initiative: 0 }))
  );

  const handleInitiativeChange = (playerName, value) => {
    setInitiatives(initiatives.map(i =>
      i.playerName === playerName ? { ...i, initiative: parseInt(value) || 0 } : i
    ));
  };

  const handleSubmit = () => {
    if (initiatives.some(i => i.initiative === 0)) {
      alert('Todos los jugadores deben tirar iniciativa');
      return;
    }
    onSubmit(initiatives);
  };

  return (
    <div className="combat-panel">
      <h3>Tirada de Iniciativa</h3>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>
        Tira un d20 para cada jugador. Introduce el resultado aquí.
      </p>

      <div style={{ marginBottom: '20px' }}>
        {initiatives.map(init => (
          <div key={init.playerName} className="flex-between" style={{ marginBottom: '10px' }}>
            <label style={{ flex: 1, marginBottom: '0' }}>{init.playerName}</label>
            <input
              type="number"
              min="0"
              max="20"
              value={init.initiative}
              onChange={(e) => handleInitiativeChange(init.playerName, e.target.value)}
              placeholder="d20"
              style={{ width: '80px', marginBottom: '0' }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSubmit}
          disabled={loading || initiatives.some(i => i.initiative === 0)}
          style={{
            flex: 1,
            opacity: loading || initiatives.some(i => i.initiative === 0) ? 0.5 : 1
          }}
        >
          {loading ? '⏳ Iniciando...' : '⚔️ Comenzar Combate'}
        </button>
        <button
          className="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          ✕ Cancelar
        </button>
      </div>
    </div>
  );
}
