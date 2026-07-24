import { useState } from 'react';

const SUGGESTED_ACTIONS = [
  'Inspecciono mi alrededor buscando pistas',
  'Me acerco cautelosamente a ese sonido',
  'Hablo con el personaje más cercano',
  'Busco una forma de ocultarme',
  'Intento persuadir al NPC',
  'Ataco con mi arma',
  'Lanzo un hechizo',
  'Uso mis habilidades especiales'
];

export default function ActionPanel({ players, onAction, onStartCombat, loading }) {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]?.name || '');
  const [action, setAction] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (!action.trim()) {
      alert('Escribe una acción');
      return;
    }
    onAction(selectedPlayer, action);
    setAction('');
    setShowSuggestions(false);
  };

  const handleSuggestedAction = (suggestedAction) => {
    setAction(suggestedAction);
    setShowSuggestions(false);
  };

  return (
    <div className="action-panel">
      <h3>Turno del Jugador</h3>

      <div className="action-input-group">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {players.map(p => (
            <option key={p.name} value={p.name}>
              {p.name} ({p.race} {p.class})
            </option>
          ))}
        </select>

        <textarea
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="¿Qué hace tu personaje? (ej: Intento abrir la puerta)"
          style={{
            minHeight: '60px',
            resize: 'vertical',
            marginBottom: '0'
          }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSubmit}
            disabled={loading || !action.trim()}
            style={{
              flex: 1,
              opacity: loading || !action.trim() ? 0.5 : 1,
              cursor: loading || !action.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳' : '→'} Enviar
          </button>
        </div>
      </div>

      {!showSuggestions ? (
        <button
          className="secondary"
          onClick={() => setShowSuggestions(true)}
          style={{ marginRight: '10px', marginBottom: '20px' }}
        >
          💡 Ver Sugerencias
        </button>
      ) : (
        <div className="suggestions">
          <p>Aquí hay algunas acciones que puedes hacer:</p>
          <ul>
            {SUGGESTED_ACTIONS.map((act, idx) => (
              <li key={idx} onClick={() => handleSuggestedAction(act)}>
                • {act}
              </li>
            ))}
          </ul>
          <button
            className="secondary"
            onClick={() => setShowSuggestions(false)}
            style={{ marginTop: '10px' }}
          >
            Cerrar
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #d4af37' }}>
        <button
          onClick={onStartCombat}
          className="secondary"
          style={{ width: '100%' }}
        >
          ⚔️ Iniciar Combate
        </button>
      </div>
    </div>
  );
}
