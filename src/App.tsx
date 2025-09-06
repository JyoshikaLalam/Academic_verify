import React, { useState } from 'react';
import { Header } from './components/Header';
import { PublicPortal } from './components/PublicPortal';
import { InstitutionPortal } from './components/InstitutionPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { ViewMode } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('public');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'public':
        return <PublicPortal />;
      case 'institution':
        return <InstitutionPortal />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <PublicPortal />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;