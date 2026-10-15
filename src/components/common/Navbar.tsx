import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    tier,
    openAuthModal,
    logoutUser,
    watchlist,
  } = useApp();

  const { compareIds } = useCompare();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener for transparent -> white transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isTransparent = activeTab === 'landing' && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-40 h-[88px] flex items-center transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-[#ECECE8] shadow-xs'
      } text-[#0E1A2B]`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo: inline SVG component (height 48px desktop, 36px mobile, arch stroke 2.5px) */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center text-left focus:outline-none cursor-pointer"
          aria-label="Rentier Home"
        >
          <svg
            viewBox="0 0 170 44"
            className="h-[36px] sm:h-[48px] w-auto"
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

        {/* Navigation items in 15px Inter, #374151, active link navy with 2px gold underline */}
        <nav className="flex items-center gap-6 sm:gap-8 text-[15px] font-normal">
          <button
            onClick={() => handleNavClick('explore')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'explore'
                ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                : 'text-[#374151] hover:text-[#0E1A2B] border-b-2 border-transparent'
            }`}
          >
            Properties
          </button>

          <button
            onClick={() => handleNavClick('compare')}
            className={`cursor-pointer transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                : 'text-[#374151] hover:text-[#0E1A2B] border-b-2 border-transparent'
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
                : 'text-[#374151] hover:text-[#0E1A2B] border-b-2 border-transparent'
            }`}
          >
            <span>Saved</span>
            {watchlist.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#ECECE8] text-[#0E1A2B] text-[11px] font-medium tabular-nums">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* Membership link / Tier tag & User profile circle */}
          {user && (tier === 'investor' || tier === 'pro') ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('membership')}
                className="px-2 py-0.5 rounded text-xs font-medium bg-[#B08D4C]/15 text-[#B08D4C] border border-[#B08D4C]/30 hover:bg-[#B08D4C]/25 transition-colors cursor-pointer"
                title="View membership"
              >
                {tier === 'investor' ? 'Investor' : 'Pro'}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full bg-[#0E1A2B] text-white flex items-center justify-center text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer select-none focus:outline-none"
                  aria-label="User menu"
                >
                  {userInitial}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-[12px] border border-[#ECECE8] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 shadow-md">
                    <div className="px-3 py-2 border-b border-[#ECECE8] mb-1">
                      <p className="text-xs text-[#6B7280]">Signed in as</p>
                      <p className="text-sm font-medium text-[#0E1A2B] truncate">{user.name}</p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-[#B08D4C]">
                        {tier === 'investor' ? 'Investor Plan' : 'Pro Plan'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('membership');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#4B5563] hover:text-[#0E1A2B] hover:bg-[#FAFAF8] rounded-md transition-colors cursor-pointer"
                    >
                      Membership
                    </button>
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
            </div>
          ) : user ? (
            <div className="flex items-center gap-6 sm:gap-8">
              <button
                onClick={() => handleNavClick('membership')}
                className={`cursor-pointer transition-colors py-1 ${
                  activeTab === 'membership'
                    ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                    : 'text-[#374151] hover:text-[#0E1A2B] border-b-2 border-transparent'
                }`}
              >
                Membership
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full bg-[#0E1A2B] text-white flex items-center justify-center text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer select-none focus:outline-none"
                  aria-label="User menu"
                >
                  {userInitial}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-[12px] border border-[#ECECE8] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 shadow-md">
                    <div className="px-3 py-2 border-b border-[#ECECE8] mb-1">
                      <p className="text-xs text-[#6B7280]">Signed in as</p>
                      <p className="text-sm font-medium text-[#0E1A2B] truncate">{user.name}</p>
                      <span className="inline-block mt-1 text-[11px] text-[#6B7280]">Free Plan</span>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('membership');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#4B5563] hover:text-[#0E1A2B] hover:bg-[#FAFAF8] rounded-md transition-colors cursor-pointer"
                    >
                      Upgrade plan
                    </button>
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
            </div>
          ) : (
            <div className="flex items-center gap-6 sm:gap-8">
              <button
                onClick={() => handleNavClick('membership')}
                className={`cursor-pointer transition-colors py-1 ${
                  activeTab === 'membership'
                    ? 'text-[#0E1A2B] font-medium border-b-2 border-[#B08D4C]'
                    : 'text-[#374151] hover:text-[#0E1A2B] border-b-2 border-transparent'
                }`}
              >
                Membership
              </button>

              <button
                onClick={openAuthModal}
                className="text-[15px] text-[#374151] hover:text-[#0E1A2B] transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
