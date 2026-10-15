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
import { ComparePage } from './components/pages/ComparePage';
import { SavedPage } from './components/pages/SavedPage';
import { FaqPage } from './components/pages/FaqPage';
import { PricingPage } from './components/pages/PricingPage';
import { Check } from 'lucide-react';

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
      case 'compare':
        return <ComparePage />;
      case 'saved':
      case 'dashboard':
        return <SavedPage />;
      case 'faq':
        return <FaqPage />;
      case 'membership':
      case 'pricing':
        return <PricingPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#0E1A2B] font-sans antialiased selection:bg-[#8C6D2F]/20 selection:text-[#0E1A2B]">
      {/* Dev preview switcher */}
      <DevTierSwitcher />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Sticky compare tray */}
      <CompareTray />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <UpgradeModal />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0E1A2B] text-white px-4 py-2.5 rounded-lg border border-[#ECECE8]/20 flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
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
