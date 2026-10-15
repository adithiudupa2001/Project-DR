import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier, Currency, UserProfile } from '../types/property';

interface AppContextType {
  // Subscription Tier & Dev switch
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;

  // Currency & NRI conversion
  currency: Currency;
  setCurrency: (c: Currency) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  navigateToProperty: (id: string) => void;

  // Watchlist & Compare
  watchlist: string[];
  toggleWatchlist: (propertyId: string) => void;
  isWatchlisted: (propertyId: string) => boolean;

  compareList: string[];
  addToCompare: (propertyId: string) => boolean;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;

  // Dossiers
  downloadedDossiers: string[];
  recordDossierDownload: (propertyId: string) => void;
  recentlyViewed: string[];

  // Modals
  isUpgradeModalOpen: boolean;
  upgradeReason: string;
  openUpgradeModal: (reason?: string) => void;
  closeUpgradeModal: () => void;

  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // User Auth
  user: UserProfile | null;
  loginUser: (userData: Partial<UserProfile>) => void;
  logoutUser: () => void;

  // Toast / notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'usr-nri-1',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@gmail.com',
  phone: '+1 408 555 0192',
  countryCode: '+1',
  isNri: true,
  country: 'United States (San Jose, CA)',
  tier: 'investor',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTierState] = useState<SubscriptionTier>(() => {
    const saved = localStorage.getItem('rentier_tier');
    return (saved as SubscriptionTier) || 'investor';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('rentier_currency');
    return (saved as Currency) || 'INR';
  });

  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/membership') {
      return 'membership';
    }
    return 'landing';
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-1');

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'membership') {
        window.history.pushState({}, '', '/membership');
      } else if (tab === 'landing') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/membership') {
        setActiveTabState('membership');
      } else {
        setActiveTabState('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rentier_watchlist');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-4'];
    } catch {
      return ['prop-1', 'prop-4'];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rentier_compare');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-2', 'prop-4'];
    } catch {
      return ['prop-1', 'prop-2', 'prop-4'];
    }
  });

  const [downloadedDossiers, setDownloadedDossiers] = useState<string[]>(['prop-1']);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['prop-1', 'prop-2', 'prop-7', 'prop-4']);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeReason, setUpgradeReason] = useState<string>('Unlock complete Asset Audit Dossier');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setTier = (newTier: SubscriptionTier) => {
    setTierState(newTier);
    localStorage.setItem('rentier_tier', newTier);
    if (user) {
      setUser({ ...user, tier: newTier });
    }
    showToast(`Switched active plan to ${newTier.toUpperCase()}`);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('rentier_currency', c);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const navigateToProperty = (id: string) => {
    setSelectedPropertyId(id);
    setActiveTab('property-detail');
    setRecentlyViewed(prev => [id, ...prev.filter(item => item !== id)].slice(0, 8));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWatchlist = (propertyId: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      localStorage.setItem('rentier_watchlist', JSON.stringify(updated));
      showToast(exists ? 'Removed from saved' : 'Saved');
      return updated;
    });
  };

  const isWatchlisted = (propertyId: string) => watchlist.includes(propertyId);

  const addToCompare = (propertyId: string): boolean => {
    if (compareList.includes(propertyId)) {
      showToast('Already in comparison');
      return false;
    }
    if (compareList.length >= 4) {
      showToast('Maximum 4 properties can be compared simultaneously');
      return false;
    }
    const updated = [...compareList, propertyId];
    setCompareList(updated);
    localStorage.setItem('rentier_compare', JSON.stringify(updated));
    showToast('Added to property comparison');
    return true;
  };

  const removeFromCompare = (propertyId: string) => {
    const updated = compareList.filter(id => id !== propertyId);
    setCompareList(updated);
    localStorage.setItem('rentier_compare', JSON.stringify(updated));
    showToast('Removed from comparison');
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('rentier_compare');
    showToast('Comparison cleared');
  };

  const isInCompare = (propertyId: string) => compareList.includes(propertyId);

  const recordDossierDownload = (propertyId: string) => {
    if (!downloadedDossiers.includes(propertyId)) {
      setDownloadedDossiers(prev => [...prev, propertyId]);
    }
  };

  const openUpgradeModal = (reason: string = 'Unlock complete Asset Audit Dossier') => {
    setUpgradeReason(reason);
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginUser = (userData: Partial<UserProfile>) => {
    setUser({
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name || 'NRI Investor',
      email: userData.email || 'client@rentier.private',
      phone: userData.phone || '+91 98450 12345',
      countryCode: userData.countryCode || '+91',
      isNri: userData.isNri ?? false,
      country: userData.country || 'India',
      tier: tier,
    });
    setIsAuthModalOpen(false);
    showToast('Authenticated successfully');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out');
  };

  return (
    <AppContext.Provider
      value={{
        tier,
        setTier,
        currency,
        setCurrency,
        activeTab,
        setActiveTab,
        selectedPropertyId,
        setSelectedPropertyId,
        navigateToProperty,
        watchlist,
        toggleWatchlist,
        isWatchlisted,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        downloadedDossiers,
        recordDossierDownload,
        recentlyViewed,
        isUpgradeModalOpen,
        upgradeReason,
        openUpgradeModal,
        closeUpgradeModal,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        user,
        loginUser,
        logoutUser,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
