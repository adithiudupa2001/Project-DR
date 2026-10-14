import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PaywallOverlayProps {
  title?: string;
  subtitle?: string;
  actionText?: string;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  title = 'Confidential Audit Dossier is Restricted',
  subtitle = 'Access unmasked tenant verification, 36-month bank NEFT reconciliation, title encumbrance certificates, and institutional liquidity scoring.',
  actionText = 'Unlock Confidential Dossier',
}) => {
  const { openUpgradeModal } = useApp();

  return (
    <div className="relative rounded-sm overflow-hidden my-6 border border-[#C9A45C]/30 bg-[#0E1A2B]">
      {/* Blurred preview backdrop */}
      <div className="filter blur-md opacity-25 select-none pointer-events-none p-8 space-y-4 bg-[#0E1A2B]">
        <div className="h-6 bg-slate-700 rounded w-1/3"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-slate-700 rounded"></div>
          <div className="h-20 bg-slate-700 rounded"></div>
          <div className="h-20 bg-slate-700 rounded"></div>
        </div>
        <div className="h-28 bg-slate-700 rounded"></div>
        <div className="h-14 bg-slate-700 rounded"></div>
      </div>

      {/* Quiet luxury lock overlay banner */}
      <div className="absolute inset-0 bg-[#0E1A2B]/95 flex flex-col items-center justify-center p-6 sm:p-10 text-center text-[#F7F3EC] z-10">
        <div className="w-12 h-12 rounded-sm bg-[#0E1A2B] border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mb-4">
          <Lock className="w-5 h-5" />
        </div>

        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C] mb-1.5">
          Private Client Diligence
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#F7F3EC] mb-2.5 max-w-xl">
          {title}
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => openUpgradeModal('Unlock full dossier')}
            className="flex items-center gap-2 px-6 py-3 rounded-sm bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs sm:text-sm transition-all tracking-wide shadow-xs active:scale-98"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-mono">
            Investor membership: ₹999/mo · Discretion assured
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B6E]" /> Forensic Bank Transfer Audit
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" /> NRI Repatriation Advisory (Sec 195)
          </span>
        </div>
      </div>
    </div>
  );
};
