import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1C2A3D] bg-[#0E1A2B] py-14 text-[#9CA3AF] text-[13px]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 170 44"
            className="h-[32px] w-auto"
            aria-label="Rentier"
          >
            <path
              d="M4 42V18a14 14 0 0 1 28 0v24"
              fill="none"
              stroke="#B08D4C"
              strokeWidth="2.5"
            />
            <text
              x="18"
              y="35"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="600"
              fontSize="20"
              fill="#F7F3EC"
            >
              R
            </text>
            <text
              x="44"
              y="31"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="600"
              fontSize="28"
              fill="#F7F3EC"
            >
              Rentier
            </text>
          </svg>
          <span className="text-xs text-[#9CA3AF] pl-2 border-l border-[#1C2A3D]">
            Pre-rented residential homes.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('explore')}
            className="hover:text-[#F7F3EC] transition-colors cursor-pointer"
          >
            Properties
          </button>
          <button
            onClick={() => handleNavClick('compare')}
            className="hover:text-[#F7F3EC] transition-colors cursor-pointer"
          >
            Compare
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            className="hover:text-[#F7F3EC] transition-colors cursor-pointer"
          >
            Saved
          </button>
          <button
            onClick={() => handleNavClick('membership')}
            className="hover:text-[#F7F3EC] transition-colors cursor-pointer"
          >
            Membership
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#F7F3EC] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </div>
      </div>
    </footer>
  );
};
