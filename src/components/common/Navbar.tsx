import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    openAuthModal,
    logoutUser,
    watchlist,
  } = useApp();

  const { compareIds } = useCompare();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8] border-b border-[#ECECE8] text-[#0E1A2B]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo: inline SVG component (height 36px desktop, 28px mobile) */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center text-left focus:outline-none cursor-pointer"
          aria-label="Rentier Home"
        >
          <svg
            viewBox="0 0 170 44"
            className="h-[28px] sm:h-[36px] w-auto"
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
        </button>

        {/* Navigation items in Inter 15px #4B5563, active link navy with 2px gold underline */}
        <nav className="flex items-center gap-6 sm:gap-8 text-[15px] font-normal">
          <button
            onClick={() => handleNavClick('explore')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'explore'
                ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                : 'text-[#4B5563] hover:text-[#0E1A2B] border-b-2 border-transparent'
            }`}
          >
            Properties
          </button>

          <button
            onClick={() => handleNavClick('compare')}
            className={`cursor-pointer transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                : 'text-[#4B5563] hover:text-[#0E1A2B] border-b-2 border-transparent'
            }`}
          >
            <span>Compare</span>
            {compareIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#0E1A2B] text-white text-[11px] font-medium tabular-nums">
                {compareIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            className={`cursor-pointer transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                : 'text-[#4B5563] hover:text-[#0E1A2B] border-b-2 border-transparent'
            }`}
          >
            <span>Saved</span>
            {watchlist.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#ECECE8] text-[#0E1A2B] text-[11px] font-medium tabular-nums">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* User profile initial in a 32px navy circle with dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full bg-[#0E1A2B] text-white flex items-center justify-center text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer select-none focus:outline-none"
                aria-label="User menu"
              >
                {userInitial}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-[12px] border border-[#ECECE8] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 border-b border-[#ECECE8] mb-1">
                    <p className="text-xs text-[#6B7280]">Signed in as</p>
                    <p className="text-sm font-medium text-[#0E1A2B] truncate">{user.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      logoutUser();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-[#4B5563] hover:text-[#0E1A2B] hover:bg-[#FAFAF8] rounded-md transition-colors cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="text-[15px] text-[#4B5563] hover:text-[#0E1A2B] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
