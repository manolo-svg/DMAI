import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CampaignSetup from './pages/CampaignSetup';
import CampaignView from './pages/CampaignView';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const navigateTo = (page, campaignId = null) => {
    setCurrentPage(page);
    if (campaignId) setSelectedCampaignId(campaignId);
  };

  return (
    <>
      <header>
        <h1>⚔️ DMAI - D&D Master AI</h1>
      </header>
      <main className="container">
        {currentPage === 'home' && (
          <Home onNavigate={navigateTo} />
        )}
        {currentPage === 'setup' && (
          <CampaignSetup onNavigate={navigateTo} />
        )}
        {currentPage === 'campaign' && selectedCampaignId && (
          <CampaignView campaignId={selectedCampaignId} onNavigate={navigateTo} />
        )}
      </main>
    </>
  );
}
