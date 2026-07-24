import { useState } from 'react';

const DAMAGE_TYPES = ['Cortante', 'Perforante', 'Contundente', 'Fuego', 'Hielo', 'Rayo', 'Magia'];

export default function Combat({ combatants, players, onAttack, onEndCombat, loading }) {
  const [attacker, setAttacker] = useState('');
  const [defender, setDefender] = useState('');
  const [attackRoll, setAttackRoll] = useState('');
  const [damage, setDamage] = useState('');
  const [damageType, setDamageType] = useState('Cortante');

  const currentCombatant = combatants[0];
  const activePlayers = combatants.map(c => c.playerName);

  const handleAttack = () => {
    if (!attacker || !defender || !attackRoll || !damage) {
      alert('Completa todos los campos');
      return;
    }
    onAttack(attacker, defender, parseInt(attackRoll), parseInt(damage), damageType);
    setAttackRoll('');
    setDamage('');
  };

  return (
    <div>
      <div className="combat-panel">
        <h3>🎲 COMBATE ACTIVO</h3>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#d4af37', marginBottom: '15px' }}>Orden de Iniciativa:</h4>
          {combatants.map((comb, idx) => (
            <div
              key={idx}
              className={`combatant ${comb.active ? 'active' : ''}`}
            >
              <span className="combatant-name">
                {idx + 1}. {comb.playerName}
              </span>
              <span className="combatant-initiative">
                Init: {comb.initiative}
              </span>
              <span className={`combatant-hp ${comb.hp <= 5 ? 'low' : ''}`}>
                ❤️ {comb.hp} HP
              </span>
            </div>
          ))}
        </div>

        {currentCombatant && (
          <div style={{
            background: 'rgba(212, 175, 55, 0.1)',
            border: '2px solid #d4af37',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#d4af37', fontWeight: 'bold' }}>
              Es el turno de: <strong style={{ fontSize: '18px' }}>{currentCombatant.playerName}</strong>
            </p>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>Realizar Ataque</h4>

          <label>Atacante:</label>
          <select
            value={attacker}
            onChange={(e) => setAttacker(e.target.value)}
          >
            <option value="">Selecciona un atacante</option>
            {activePlayers.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <label>Objetivo/Defensor:</label>
          <input
            type="text"
            value={defender}
            onChange={(e) => setDefender(e.target.value)}
            placeholder="ej: Goblin 1, Enemigo mago, etc."
          />

          <label>Resultado del Ataque (d20):</label>
          <input
            type="number"
            min="0"
            max="20"
            value={attackRoll}
            onChange={(e) => setAttackRoll(e.target.value)}
            placeholder="ej: 16"
          />

          <label>Daño (si acierta):</label>
          <input
            type="number"
            min="0"
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
            placeholder="ej: 8"
          />

          <label>Tipo de Daño:</label>
          <select
            value={damageType}
            onChange={(e) => setDamageType(e.target.value)}
          >
            {DAMAGE_TYPES.map(dt => (
              <option key={dt} value={dt}>{dt}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button
              onClick={handleAttack}
              disabled={loading || !attacker || !defender || !attackRoll || !damage}
              style={{
                flex: 1,
                opacity: loading || !attacker || !defender || !attackRoll || !damage ? 0.5 : 1
              }}
            >
              {loading ? '⏳ Procesando...' : '⚔️ Resolver Ataque'}
            </button>
          </div>
        </div>

        <button
          onClick={onEndCombat}
          className="secondary"
          style={{ width: '100%' }}
        >
          🛡️ Finalizar Combate
        </button>
      </div>
    </div>
  );
}
