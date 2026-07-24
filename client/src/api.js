import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const campaignAPI = {
  create: (name, players) => api.post('/campaigns', { name, players }),
  getAll: () => api.get('/campaigns'),
  getOne: (id) => api.get(`/campaigns/${id}`),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  startAdventure: (id) => api.post(`/campaigns/${id}/start-adventure`),
  playerAction: (id, playerName, action) =>
    api.post(`/campaigns/${id}/player-action`, { playerName, action }),
  initiative: (id, rolls) => api.post(`/campaigns/${id}/initiative`, { rolls }),
  attack: (id, attacker, defender, attackRoll, damage, damageType) =>
    api.post(`/campaigns/${id}/attack`, { attacker, defender, attackRoll, damage, damageType }),
  endCombat: (id) => api.post(`/campaigns/${id}/end-combat`)
};

export const dndAPI = {
  getReferenceData: () => api.get('/dnd-data'),
  validateScores: (scores) => api.post('/validate-scores', { scores })
};

export default api;
