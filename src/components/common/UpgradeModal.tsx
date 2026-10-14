import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubscriptionTier } from '../../types/property';
import { X, Check, ShieldCheck, Sparkles, Download, Video, PhoneCall, TrendingUp } from 'lucide-react';
import { USD_EXCHANGE_RATE, AED_EXCHANGE_RATE } from '../../utils/formatters';

export const UpgradeModal: React.FC = () => {
  const {
    isUpgradeModalOpen,
    closeUpgradeModal,
    upgradeReason,
    tier,
    setTier,
    currency,
  } = useApp();

  const [isAnnual, setIsAnnual] = useState(true);

  if (!isUpgradeModalOpen) return null;

  const investorMonthlyINR = 999;
  const investorAnnualMonthlyEquivalentINR = 833;
  
  const proMonthlyINR = 2499;
  const proAnnualMonthlyEquivalentINR = 2083;

  const getPriceDisplay = (monthlyINR: number, annualEquivalentINR: number) => {
    const rate = isAnnual ? annualEquivalentINR : monthlyINR;
    const usd = Math.round(rate / USD_EXCHANGE_RATE);
    const aed = Math.round(rate / AED_EXCHANGE_RATE);

    return {
      inr: `₹${rate.toLocaleString('en-IN')}`,
      nriEquivalent: currency === 'USD' ? `~$${usd}/mo` : currency === 'AED' ? `~AED ${aed}/mo` : `~$${usd} / AED ${aed}`,
      billedText: isAnnual ? 'annual retainer (2 months complimentary)' : 'monthly retainer, cancel anytime',
    };
  };

  const investorPricing = getPriceDisplay(investorMonthlyINR, investorAnnualMonthlyEquivalentINR);
  const proPricing = getPriceDisplay(proMonthlyINR, proAnnualMonthlyEquivalentINR);

  const handleSelectPlan = (plan: SubscriptionTier) => {
    setTier(plan);
    closeUpgradeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-10 text-[#F7F3EC] shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={closeUpgradeModal}
          className="absolute top-6 right-6 p-2 rounded-xs text-slate-400 hover:text-[#C9A45C] hover:bg-[#142338] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rentier Private Membership</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-[#F7F3EC] mb-2.5">
            Confidential Intelligence & Deal Flow
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {upgradeReason || 'Access complete Asset Audit Dossiers, verified bank rental ledgers, and remote diligence services.'}
          </p>

          {/* Monthly / Annual Billing Switch */}
          <div className="mt-6 inline-flex items-center gap-2 bg-[#09111D] p-1 rounded-xs border border-[#C9A45C]/30">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-xs text-xs font-semibold tracking-wide transition-all ${
                !isAnnual ? 'bg-[#142338] text-[#F7F3EC]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-xs text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
                isAnnual ? 'bg-[#C9A45C] text-[#0E1A2B]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Retainer</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-xs ${isAnnual ? 'bg-[#0E1A2B] text-[#C9A45C]' : 'bg-[#C9A45C]/20 text-[#C9A45C]'}`}>
                2 Mo Free
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Investor Tier */}
          <div className={`rounded-sm p-6 sm:p-7 border transition-all relative flex flex-col justify-between ${
            tier === 'investor'
              ? 'bg-[#142338] border-[#C9A45C] ring-1 ring-[#C9A45C]/50'
              : 'bg-[#0A1422] border-[#C9A45C]/25 hover:border-[#C9A45C]/40'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#2E8B6E]" />
                  <h3 className="font-serif text-2xl font-semibold text-[#F7F3EC]">Investor Member</h3>
                </div>
                {tier === 'investor' && (
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase bg-[#C9A45C]/20 text-[#C9A45C] px-2 py-0.5 rounded-xs">
                    Current Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                For active residential capital allocators requiring verified tenant histories and in-pocket cash flow clarity.
              </p>

              <div className="mb-5 pb-4 border-b border-[#C9A45C]/20">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F3EC] tabular-nums">
                    {investorPricing.inr}
                  </span>
                  <span className="text-xs text-slate-400">/mo</span>
                  <span className="text-xs text-[#C9A45C] font-mono">({investorPricing.nriEquivalent})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">{investorPricing.billedText}</div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                  <span><strong>Full Asset Audit Dossiers</strong> with unmasked tenant profiles</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                  <span><strong>Net Yield & Outflows Audit</strong> (society dues, property tax)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                  <span><strong>Multi-Asset Comparison Desk</strong> up to 4 tenanted properties</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                  <span><strong>Watchlist & Real-Time Alerts</strong> on new Bengaluru listings</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                  <span><strong>Rentier Underwriting Score</strong> with corridor liquidity drivers</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('investor')}
              className={`mt-8 w-full py-3 rounded-xs font-semibold text-xs tracking-wide transition-all ${
                tier === 'investor'
                  ? 'bg-[#142338] text-[#C9A45C] border border-[#C9A45C]/40'
                  : 'bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] shadow-xs'
              }`}
            >
              {tier === 'investor' ? 'Active Membership' : 'Select Investor Retainer'}
            </button>
          </div>

          {/* Pro / NRI Tier */}
          <div className={`rounded-sm p-6 sm:p-7 border transition-all relative flex flex-col justify-between ${
            tier === 'pro'
              ? 'bg-[#142338] border-[#C9A45C] ring-1 ring-[#C9A45C]'
              : 'bg-gradient-to-b from-[#142338] to-[#0A1422] border-[#C9A45C]/50 hover:border-[#C9A45C]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C9A45C]" />
                  <h3 className="font-serif text-2xl font-semibold text-[#F7F3EC]">Private Client (NRI)</h3>
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase bg-[#C9A45C] text-[#0E1A2B] px-2 py-0.5 rounded-xs">
                  NRI Standard
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Tailored for overseas NRIs and family offices requiring video walkthroughs, PoA execution, and priority seller contact.
              </p>

              <div className="mb-5 pb-4 border-b border-[#C9A45C]/20">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F3EC] tabular-nums">
                    {proPricing.inr}
                  </span>
                  <span className="text-xs text-slate-400">/mo</span>
                  <span className="text-xs text-[#C9A45C] font-mono">({proPricing.nriEquivalent})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">{proPricing.billedText}</div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span><strong>Everything in Investor</strong> included</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Download className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span><strong>Downloadable PDF Audit Dossiers</strong> for legal counsel</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Video className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span><strong>On-Demand 4K Video Walkthrough</strong> with tenant interaction</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span><strong>Direct Landlord Introduction</strong> & 24h early deal flow</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span><strong>10-Year Compounding Cash Flow & EMI Underwriting Desk</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('pro')}
              className={`mt-8 w-full py-3 rounded-xs font-semibold text-xs tracking-wide transition-all ${
                tier === 'pro'
                  ? 'bg-[#142338] text-[#C9A45C] border border-[#C9A45C]'
                  : 'bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] shadow-xs'
              }`}
            >
              {tier === 'pro' ? 'Active Membership' : 'Acquire Private Client Access'}
            </button>
          </div>
        </div>

        {/* Free Plan note for Landlords */}
        <div className="mt-8 pt-5 border-t border-[#C9A45C]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <span>
            Landlords wishing to exit tenanted inventory: <strong>Discreet listing is 100% complimentary</strong>.
          </span>
          <button
            onClick={() => {
              closeUpgradeModal();
              setTier('free');
            }}
            className="text-slate-400 hover:text-[#C9A45C] underline underline-offset-4"
          >
            Continue with Public Limited View
          </button>
        </div>
      </div>
    </div>
  );
};
