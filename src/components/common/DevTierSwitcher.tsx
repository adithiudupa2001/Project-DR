import React from 'react';
import { useApp } from '../../context/AppContext';

export const DevTierSwitcher: React.FC = () => {
  const { tier, setTier } = useApp();

  return (
    <div className="bg-[#ECECE8] text-[#0E1A2B] px-6 py-1.5 text-xs flex items-center justify-between">
      <span className="text-[#6B7280]">Preview mode:</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTier('free')}
          className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            tier === 'free'
              ? 'bg-[#0E1A2B] text-white font-medium'
              : 'text-[#6B7280] hover:text-[#0E1A2B]'
          }`}
        >
          Free
        </button>
        <button
          onClick={() => setTier('investor')}
          className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            tier === 'investor'
              ? 'bg-[#0E1A2B] text-white font-medium'
              : 'text-[#6B7280] hover:text-[#0E1A2B]'
          }`}
        >
          Investor
        </button>
        <button
          onClick={() => setTier('pro')}
          className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            tier === 'pro'
              ? 'bg-[#0E1A2B] text-white font-medium'
              : 'text-[#6B7280] hover:text-[#0E1A2B]'
          }`}
        >
          Pro
        </button>
      </div>
    </div>
  );
};
