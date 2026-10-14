import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CompareProvider } from './context/CompareContext';
import { DevTierSwitcher } from './components/common/DevTierSwitcher';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CompareTray } from './components/common/CompareTray';
import { UpgradeModal } from './components/common/UpgradeModal';
import { AuthModal } from './components/common/AuthModal';

import { LandingPage } from './components/pages/LandingPage';
import { ExplorePage } from './components/pages/ExplorePage';
import { PropertyDetailPage } from './components/pages/PropertyDetailPage';
import { CalculatorPage } from './components/pages/CalculatorPage';
import { ComparePage } from './components/pages/ComparePage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ListPropertyPage } from './components/pages/ListPropertyPage';
import { PricingPage } from './components/pages/PricingPage';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'explore':
        return <ExplorePage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'compare':
        return <ComparePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'list-property':
        return <ListPropertyPage />;
      case 'pricing':
        return <PricingPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#1A1F2B] font-sans antialiased selection:bg-[#C9A45C]/20 selection:text-[#0E1A2B]">
      {/* Dev Mode Tier Switcher at very top */}
      <DevTierSwitcher />

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Sticky Compare Tray (appears when 1+ property is selected) */}
      <CompareTray />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <UpgradeModal />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0E1A2B] text-white px-4 py-3 rounded-xs border border-[#C9A45C]/40 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 font-sans">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B6E] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <CompareProvider>
        <AppContent />
      </CompareProvider>
    </AppProvider>
  );
}
