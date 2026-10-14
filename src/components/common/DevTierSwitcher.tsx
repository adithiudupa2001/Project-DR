import React from 'react';
import { useApp } from '../../context/AppContext';
import { SubscriptionTier } from '../../types/property';
import { ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

export const DevTierSwitcher: React.FC = () => {
  const { tier, setTier } = useApp();

  const tiers: { id: SubscriptionTier; label: string; icon: React.ReactNode; hint: string }[] = [
    {
      id: 'free',
      label: 'Free Tier',
      icon: <KeyRound className="w-3.5 h-3.5 text-slate-400" />,
      hint: 'Blurred dossiers & basic yields',
    },
    {
      id: 'investor',
      label: 'Investor Plan',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      hint: '₹999/mo · Full audit & cash flows',
    },
    {
      id: 'pro',
      label: 'Pro / NRI Plan',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      hint: '₹2,499/mo · PDF dossier & priority exit',
    },
  ];

  return (
    <div className="bg-[#080E1A] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="uppercase tracking-wider text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
            Dev Mode
          </span>
          <span className="hidden sm:inline">Preview plan gating:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          {tiers.map((t) => {
            const isActive = tier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                title={t.hint}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
          <span>Active:</span>
          <span className="text-emerald-400 font-semibold uppercase">{tier} Mode</span>
        </div>
      </div>
    </div>
  );
};
