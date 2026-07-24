import { useState, useEffect } from 'react';
import { campaignAPI } from '../api';

export default function Home({ onNavigate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await campaignAPI.getAll();
      setCampaigns(res.data);
    } catch (err) {
      console.error('Error loading campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayCampaign = (campaignId) => {
    onNavigate('campaign', campaignId);
  };

  const handleNewCampaign = () => {
    onNavigate('setup');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando campañas...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card text-center">
        <h2>Bienvenido a DMAI</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Tu Dungeon Master de IA para D&D 5ª edición
        </p>
        <button onClick={handleNewCampaign} style={{ marginRight: '10px' }}>
          ➕ Nueva Campaña
        </button>
        <button className="secondary" onClick={loadCampaigns}>
          🔄 Recargar
        </button>
      </div>

      {campaigns.length > 0 ? (
        <div>
          <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Mis Campañas</h2>
          <div className="grid">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="card">
                <h3>{campaign.name}</h3>
                <div className="details" style={{ marginBottom: '15px' }}>
                  <p>👥 {campaign.playerCount} jugadores</p>
                  <p>📅 {new Date(campaign.lastPlayed).toLocaleDateString('es-ES')}</p>
                </div>
                <button onClick={() => handlePlayCampaign(campaign.id)}>
                  Jugar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <p style={{ fontSize: '16px', color: '#aaa' }}>
            No hay campañas aún. ¡Crea una nueva para empezar!
          </p>
        </div>
      )}
    </div>
  );
}
