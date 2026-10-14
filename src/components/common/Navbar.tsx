import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { CurrencyToggle } from './CurrencyToggle';
import { User, Menu, X, ArrowUpRight, Scale } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    openAuthModal,
    openUpgradeModal,
    tier,
  } = useApp();

  const { compareIds } = useCompare();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'explore', label: 'Portfolio' },
    { id: 'calculator', label: 'Underwriting Desk' },
    {
      id: 'compare',
      label: 'Compare',
      badge: compareIds.length > 0 ? compareIds.length : null,
      icon: <Scale className="w-3.5 h-3.5 inline mr-1 opacity-80" />,
    },
    { id: 'list-property', label: 'Discreet Exit' },
    { id: 'pricing', label: 'Membership' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E1A2B] border-b border-[#C9A45C]/25 text-[#F7F3EC] shadow-xs">
      {/* 3-Zone Header Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-4">
        
        {/* Zone 1: Brand Wordmark (Rentier, Cormorant Garamond, Quiet Luxury) */}
        <button
          onClick={() => handleNavClick('landing')}
          className="text-left group flex items-baseline gap-2 focus:outline-none cursor-pointer"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#F7F3EC] group-hover:text-[#C9A45C] transition-colors">
            Rentier
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] self-center"></span>
        </button>

        {/* Zone 2: Single-line quiet luxury text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b text-[13px] flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-[#C9A45C] border-[#C9A45C] font-semibold'
                    : 'border-transparent text-slate-300 hover:text-[#F7F3EC]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#C9A45C] text-[#0E1A2B] text-[10px] font-bold tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Currency selector & Client Access CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <CurrencyToggle compact />

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm text-xs font-medium border transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#142338] text-[#C9A45C] border-[#C9A45C]/50'
                    : 'bg-[#0A1422] text-[#F7F3EC] border-[#C9A45C]/20 hover:border-[#C9A45C]/40'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#C9A45C]/20 text-[#C9A45C] flex items-center justify-center font-serif text-[11px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-xs bg-[#C9A45C]/20 text-[#C9A45C]">
                  {tier}
                </span>
              </button>

              {tier === 'free' && (
                <button
                  onClick={() => openUpgradeModal('Upgrade for complete confidential dossiers')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#0E1A2B] bg-[#C9A45C] hover:bg-[#D8B46C] rounded-sm transition-colors whitespace-nowrap tracking-wide cursor-pointer"
                >
                  Membership
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0E1A2B] bg-[#C9A45C] hover:bg-[#D8B46C] rounded-sm transition-colors whitespace-nowrap tracking-wide shadow-xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Private Access</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <CurrencyToggle compact />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-[#F7F3EC] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A45C]" /> : <Menu className="w-6 h-6 text-[#C9A45C]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C9A45C]/20 bg-[#0E1A2B] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#C9A45C]/15">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-2.5 rounded-sm text-left text-xs font-medium tracking-wide flex items-center justify-between cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#142338] text-[#C9A45C] font-semibold border-l-2 border-[#C9A45C]'
                    : 'text-slate-300 hover:bg-[#142338]/50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#C9A45C] text-[#0E1A2B] text-[10px] font-bold tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {user ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center justify-between p-2.5 rounded-sm bg-[#0A1422] border border-[#C9A45C]/30 text-xs text-[#F7F3EC] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C9A45C]/20 text-[#C9A45C] flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </span>
                  <span>{user.name}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C9A45C]" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 rounded-sm bg-[#C9A45C] text-[#0E1A2B] font-bold text-xs text-center tracking-wide cursor-pointer"
              >
                Client Authentication
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
