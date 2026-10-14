import React from 'react';
import { GROSS_YIELD_FOOTNOTE, DISCLAIMER_NOTE } from '../../utils/formatters';
import { MapPin, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#080E1A] text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">YieldGhar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India’s first verified marketplace for pre-rented residential properties. Day-1 rental cash flow, audited tenant histories, and 100% remote due diligence for NRIs and long-term capital allocators.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Launch City: <strong className="text-white">Bengaluru</strong> (Pan-India expansion Q2 2027: Pune, Hyderabad, Mumbai, NCR)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('explore'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  All Pre-Rented Deals
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('explore'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Whitefield IT Corridor
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('explore'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Outer Ring Road & Bellandur
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('explore'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Hebbal & North Bangalore
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculator'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Yield & EMI Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* For Landlords & NRIs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Sellers & NRIs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('list-property'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Exit Rented Property (Free)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('pricing'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors">
                  Subscription Plans & NRI Access
                </button>
              </li>
              <li>
                <span className="text-slate-400">NRE / NRO Bank Repatriation Guide</span>
              </li>
              <li>
                <span className="text-slate-400">TDS 20% Section 195 Advisory</span>
              </li>
              <li>
                <span className="text-slate-400">Power of Attorney (PoA) Buying</span>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Audit Standards</h4>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>YieldGhar Dossier Standard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Every listed asset includes verified bank rental credits, sub-registrar lease deed check, BBMP A-Khata, and society NOC.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory & Footnote Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-3 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>Gross Yield Note:</strong> {GROSS_YIELD_FOOTNOTE}
          </p>
          <p>
            <strong>Regulatory & Demonstration Disclaimer:</strong> {DISCLAIMER_NOTE} YieldGhar operates as an independent discovery and due diligence marketplace. YieldGhar is not a registered investment advisor, SEBI-registered portfolio manager, or financial broker. Past rental continuity does not guarantee future market returns.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} YieldGhar Proptech Technologies Pvt. Ltd. Bengaluru, Karnataka.
            </div>
            <div className="flex items-center gap-4">
              <span>RERA Ready Framework</span>
              <span>·</span>
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
