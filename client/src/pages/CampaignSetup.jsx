import { useState, useEffect } from 'react';
import { campaignAPI, dndAPI } from '../api';
import CharacterCreator from '../components/CharacterCreator';

export default function CampaignSetup({ onNavigate }) {
  const [campaignName, setCampaignName] = useState('');
  const [players, setPlayers] = useState([]);
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [dndData, setDndData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDndData();
  }, []);

  const loadDndData = async () => {
    try {
      const res = await dndAPI.getReferenceData();
      setDndData(res.data);
    } catch (err) {
      console.error('Error loading D&D data:', err);
    }
  };

  const handleAddPlayer = (playerData) => {
    setPlayers([...players, { ...playerData, id: Date.now() }]);
    setShowCharacterForm(false);
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      alert('Por favor, escribe un nombre para la campaña');
      return;
    }
    if (players.length < 3) {
      alert('Se necesitan al menos 3 jugadores');
      return;
    }

    setLoading(true);
    try {
      const res = await campaignAPI.create(campaignName, players);
      onNavigate('campaign', res.data.id);
    } catch (err) {
      console.error('Error creating campaign:', err);
      alert('Error al crear la campaña');
    } finally {
      setLoading(false);
    }
  };

  if (!dndData) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <div className="card">
        <h2>Nueva Campaña</h2>

        <div>
          <label>Nombre de la campaña:</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="ej: La Mina Perdida de Durth-Karim"
          />
        </div>

        <h3 style={{ marginTop: '30px' }}>Jugadores ({players.length})</h3>
        {players.length > 0 && (
          <div>
            {players.map(player => (
              <div key={player.id} className="character-card">
                <div className="flex-between">
                  <div>
                    <h4>{player.name}</h4>
                    <div className="details">
                      {player.race} {player.class} - Nivel {player.level}
                    </div>
                  </div>
                  <button
                    className="danger"
                    onClick={() => handleRemovePlayer(player.id)}
                    style={{ padding: '8px 16px' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCharacterForm ? (
          <CharacterCreator
            dndData={dndData}
            onSave={handleAddPlayer}
            onCancel={() => setShowCharacterForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowCharacterForm(true)}
            style={{ marginTop: '15px' }}
          >
            ➕ Añadir Jugador
          </button>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={handleCreateCampaign}
            disabled={loading || players.length < 3 || !campaignName.trim()}
            style={{
              opacity: loading || players.length < 3 || !campaignName.trim() ? 0.5 : 1,
              cursor: loading || players.length < 3 || !campaignName.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creando...' : '🚀 Crear Campaña'}
          </button>
          <button
            className="secondary"
            onClick={() => onNavigate('home')}
            style={{ marginLeft: '10px' }}
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}
