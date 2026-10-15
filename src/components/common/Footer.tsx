import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#ECECE8] bg-white py-12 text-[#6B7280] text-[13px]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 170 44"
            className="h-[28px] w-auto"
            aria-label="Rentier"
          >
            <path
              d="M4 42V18a14 14 0 0 1 28 0v24"
              fill="none"
              stroke="#B08D4C"
              strokeWidth="2.2"
            />
            <text
              x="18"
              y="35"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="600"
              fontSize="20"
              fill="#0E1A2B"
            >
              R
            </text>
            <text
              x="44"
              y="31"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="600"
              fontSize="28"
              fill="#0E1A2B"
            >
              Rentier
            </text>
          </svg>
          <span className="text-xs text-[#6B7280]">
            Pre-rented residential homes.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('explore')}
            className="hover:text-[#0E1A2B] transition-colors cursor-pointer"
          >
            Properties
          </button>
          <button
            onClick={() => handleNavClick('compare')}
            className="hover:text-[#0E1A2B] transition-colors cursor-pointer"
          >
            Compare
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            className="hover:text-[#0E1A2B] transition-colors cursor-pointer"
          >
            Saved
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#0E1A2B] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </div>
      </div>
    </footer>
  );
};
