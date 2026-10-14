import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useApp } from './AppContext';
import { MOCK_PROPERTIES } from '../data/mockProperties';

interface CompareState {
  compareIds: string[];
}

type CompareAction =
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'INIT'; payload: string[] };

interface CompareContextType {
  compareIds: string[];
  addToCompare: (propertyId: string) => boolean;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
  toggleCompare: (propertyId: string) => void;
  maxProperties: number;
}

const STORAGE_KEY = 'rentier_compare_ids';

const compareReducer = (state: CompareState, action: CompareAction): CompareState => {
  switch (action.type) {
    case 'INIT':
      return { compareIds: action.payload };
    case 'ADD':
      if (state.compareIds.includes(action.payload)) return state;
      return { compareIds: [...state.compareIds, action.payload] };
    case 'REMOVE':
      return { compareIds: state.compareIds.filter((id) => id !== action.payload) };
    case 'CLEAR':
      return { compareIds: [] };
    default:
      return state;
  }
};

const getInitialCompareIds = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to read compare IDs from localStorage', err);
  }
  // Default benchmark initial selection for testing
  return ['prop-1', 'prop-2'];
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(compareReducer, { compareIds: [] }, () => ({
    compareIds: getInitialCompareIds(),
  }));

  const { tier, openUpgradeModal, showToast } = useApp();

  const maxProperties = tier === 'free' ? 2 : 4;

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.compareIds));
    } catch (err) {
      console.warn('Failed to persist compare IDs to localStorage', err);
    }
  }, [state.compareIds]);

  const isInCompare = (propertyId: string) => state.compareIds.includes(propertyId);

  const addToCompare = (propertyId: string): boolean => {
    if (isInCompare(propertyId)) {
      removeFromCompare(propertyId);
      return false;
    }

    const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
    const propTitle = property ? property.title : 'Property';

    // Free plan max 2 constraint
    if (tier === 'free' && state.compareIds.length >= 2) {
      openUpgradeModal(
        'Free plan allows comparing up to 2 properties. Upgrade to Investor or Pro to compare up to 4.'
      );
      return false;
    }

    // Max 4 limit for Investor/Pro
    if (state.compareIds.length >= 4) {
      showToast('You can compare up to 4 properties. Remove one to add another.');
      return false;
    }

    dispatch({ type: 'ADD', payload: propertyId });
    showToast(`${propTitle} added to compare`);
    return true;
  };

  const removeFromCompare = (propertyId: string) => {
    const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
    const propTitle = property ? property.title : 'Property';
    dispatch({ type: 'REMOVE', payload: propertyId });
    showToast(`${propTitle} removed from compare`);
  };

  const clearCompare = () => {
    dispatch({ type: 'CLEAR' });
    showToast('Comparison list cleared');
  };

  const toggleCompare = (propertyId: string) => {
    if (isInCompare(propertyId)) {
      removeFromCompare(propertyId);
    } else {
      addToCompare(propertyId);
    }
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds: state.compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toggleCompare,
        maxProperties,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
