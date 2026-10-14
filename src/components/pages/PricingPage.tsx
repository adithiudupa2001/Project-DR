import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { USD_EXCHANGE_RATE, AED_EXCHANGE_RATE } from '../../utils/formatters';
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  Download,
  Video,
  FileCheck2,
  Globe2,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { tier, setTier, currency, setActiveTab, showToast } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);

  // Pricing values
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
      billedAnnualTotal: `₹${(annualEquivalentINR * 12).toLocaleString('en-IN')}`,
      nriEquivalent:
        currency === 'USD'
          ? `~$${usd}/mo`
          : currency === 'AED'
          ? `~AED ${aed}/mo`
          : `~$${usd} / AED ${aed} per month`,
    };
  };

  const investorPricing = getPriceDisplay(investorMonthlyINR, investorAnnualMonthlyEquivalentINR);
  const proPricing = getPriceDisplay(proMonthlyINR, proAnnualMonthlyEquivalentINR);

  const featureRows = [
    { name: 'Browse all Bengaluru Pre-Rented Deals', free: true, investor: true, pro: true },
    { name: 'Basic Price, Contractual Rent, & Gross Yield %', free: true, investor: true, pro: true },
    { name: 'Unmasked Tenant Profile & Verified Profession Category', free: false, investor: true, pro: true },
    { name: 'Audited Multi-Year Rent History Ledger & Escalations', free: false, investor: true, pro: true },
    { name: '5-Tier Due Diligence Legal Checklist (RERA, OC/CC, Khata)', free: false, investor: true, pro: true },
    { name: 'Net In-Pocket Yield & Monthly Society Expense Breakdown', free: false, investor: true, pro: true },
    { name: 'Side-by-Side Multi-Property Underwriting Comparison (Up to 4)', free: false, investor: true, pro: true },
    { name: 'Personal Watchlist & Instant Corridors Alerts', free: false, investor: true, pro: true },
    { name: 'Downloadable Offline PDF Dossiers (for legal review & PoA)', free: false, investor: false, pro: true },
    { name: 'On-Demand 4K Video Walkthrough Requests with Tenant', free: false, investor: false, pro: true },
    { name: 'Priority Landlord Direct Connect & 24-Hour Early Access', free: false, investor: false, pro: true },
    { name: 'Corridor 10-Year Compounding Cash Flow & Loan EMI Simulator', free: false, investor: false, pro: true },
    { name: 'Dedicated NRI Relationship Officer (Time-zone aligned Concierge)', free: false, investor: false, pro: true },
  ];

  const handleSelectTier = (newTier: 'free' | 'investor' | 'pro') => {
    setTier(newTier);
    showToast(`Switched membership to ${newTier.toUpperCase()} Tier`);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-10 sm:py-16 text-[#1A1F2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-[11px] font-semibold tracking-[0.2em] uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]"></span>
            <span>MEMBERSHIP TIERS · INSTITUTIONAL INTELLIGENCE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0E1A2B] tracking-tight">
            Transparent Membership for Discerning Capital
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-sans font-light max-w-2xl mx-auto">
            Choose the diligence tier matched to your portfolio deployment. All tenanted assets are verified against registered deeds and multi-year bank statements.
          </p>

          {/* Monthly / Annual Toggle with 2 Months Free */}
          <div className="pt-4 inline-flex items-center gap-2 bg-[#0E1A2B]/8 p-1.5 rounded-xs border border-[#C9A45C]/25">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xs text-xs font-semibold font-sans transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-[#0E1A2B] text-[#F7F3EC] shadow-xs'
                  : 'text-slate-600 hover:text-[#0E1A2B]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xs text-xs font-semibold font-sans transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? 'bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]/40 shadow-xs'
                  : 'text-slate-600 hover:text-[#0E1A2B]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#2E8B6E] text-white">
                2 Months Free
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Free */}
          <div
            className={`p-6 sm:p-8 rounded-sm border flex flex-col justify-between transition-all ${
              tier === 'free'
                ? 'bg-[#F7F3EC] border-[#0E1A2B] shadow-sm ring-1 ring-[#0E1A2B]'
                : 'bg-[#F7F3EC] border-[#C9A45C]/35 hover:border-[#C9A45C]'
            }`}
          >
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500 font-sans">
                  Tier 1
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">Free Public Desk</h3>
                <p className="text-xs text-slate-600 mt-1.5 font-sans leading-relaxed">
                  Browse verified Bengaluru inventory, project specs, and benchmark gross yields.
                </p>
              </div>

              <div className="pt-2 border-t border-[#C9A45C]/20">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#0E1A2B]">₹0</span>
                  <span className="text-xs text-slate-500 font-sans">/ month</span>
                </div>
                <span className="block text-[11px] text-slate-500 font-sans mt-0.5">Free forever</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-sans pt-3">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Browse all live gated community listings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Gross Yield %, price, and contractual rent</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Full dossiers blurred behind unlock overlay</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 shrink-0" />
                  <span>No downloadable PDF legal records</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 shrink-0" />
                  <span>No tenant banking audit ledger</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier('free')}
              className={`mt-8 w-full py-3 rounded-xs font-semibold text-xs transition-colors cursor-pointer font-sans tracking-wide ${
                tier === 'free'
                  ? 'bg-[#0E1A2B]/10 text-[#0E1A2B] cursor-default'
                  : 'bg-[#0E1A2B] hover:bg-[#15253C] text-[#F7F3EC]'
              }`}
            >
              {tier === 'free' ? 'Current Tier Active' : 'Switch to Free Tier'}
            </button>
          </div>

          {/* Card 2: Investor Plan (₹999/mo) */}
          <div
            className={`p-6 sm:p-8 rounded-sm border flex flex-col justify-between relative transition-all ${
              tier === 'investor'
                ? 'bg-[#F7F3EC] border-[#2E8B6E] ring-1 ring-[#2E8B6E] shadow-sm'
                : 'bg-[#F7F3EC] border-[#C9A45C]/40 hover:border-[#C9A45C]'
            }`}
          >
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2E8B6E] font-sans">
                  Tier 2 · Most Popular
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">Investor Membership</h3>
                <p className="text-xs text-slate-600 mt-1.5 font-sans leading-relaxed">
                  Institutional dossiers unmasked for domestic yield buyers and multi-property capital.
                </p>
              </div>

              <div className="pt-2 border-t border-[#C9A45C]/20">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#0E1A2B] tabular-nums">
                    {investorPricing.inr}
                  </span>
                  <span className="text-xs text-slate-500 font-sans">/ month</span>
                </div>
                <span className="block text-[11px] text-[#2E8B6E] font-semibold font-sans mt-0.5">
                  {investorPricing.nriEquivalent} · {isAnnual ? `Billed ${investorPricing.billedAnnualTotal}/yr` : 'Billed monthly'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-800 font-sans pt-3">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span><strong>Full Asset Audit Dossiers</strong> unmasked</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span><strong>Audited Bank Rent History</strong> & Escalation timeline</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span><strong>Net Yield & Outflows Audit</strong> (Society dues & Kaveri tax)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Side-by-side comparison for up to 4 assets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Watchlist & instant new tenanted listing alerts</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier('investor')}
              className={`mt-8 w-full py-3 rounded-xs font-semibold text-xs transition-colors cursor-pointer font-sans tracking-wide ${
                tier === 'investor'
                  ? 'bg-[#2E8B6E] text-white cursor-default'
                  : 'bg-[#0E1A2B] hover:bg-[#15253C] text-[#C9A45C]'
              }`}
            >
              {tier === 'investor' ? 'Active Membership' : 'Select Investor Plan'}
            </button>
          </div>

          {/* Card 3: Pro / NRI (₹2,499/mo) */}
          <div
            className={`p-6 sm:p-8 rounded-sm border flex flex-col justify-between relative bg-[#0E1A2B] text-[#F7F3EC] shadow-xl ${
              tier === 'pro'
                ? 'border-[#C9A45C] ring-1 ring-[#C9A45C]'
                : 'border-[#C9A45C]/40'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A45C] font-sans">
                    Tier 3 · Private Client
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#F7F3EC]">Pro / NRI Client</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C9A45C] text-[#0E1A2B] px-2 py-0.5 rounded-xs font-sans">
                  NRI Recommended
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Full-stack remote acquisition suite with 4K video walkthroughs, downloadable legal files, and concierge closing.
              </p>

              <div className="pt-2 border-t border-[#C9A45C]/25">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#F7F3EC] tabular-nums">
                    {proPricing.inr}
                  </span>
                  <span className="text-xs text-slate-300 font-sans">/ month</span>
                </div>
                <span className="block text-[11px] text-[#C9A45C] font-semibold font-sans mt-0.5">
                  {proPricing.nriEquivalent} · {isAnnual ? `Billed ${proPricing.billedAnnualTotal}/yr` : 'Billed monthly'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 font-sans pt-3">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span><strong>Everything in Investor</strong> tier included</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span><strong>Downloadable PDF Dossiers</strong> for overseas legal counsel</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span><strong>On-Demand 4K Video Walkthroughs</strong> with resident tenant</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span><strong>Priority Owner Direct Connect</strong> (24h early access)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>Loan EMI & Underwriting Cash Flow Simulator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>NRI Concierge: Special PoA & Section 195 Lower TDS</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier('pro')}
              className={`mt-8 w-full py-3 rounded-xs font-semibold text-xs transition-colors cursor-pointer font-sans tracking-wide ${
                tier === 'pro'
                  ? 'bg-[#C9A45C] text-[#0E1A2B] font-bold cursor-default'
                  : 'bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B]'
              }`}
            >
              {tier === 'pro' ? 'Active Private Client Tier' : 'Upgrade to Pro / NRI Client'}
            </button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 p-6 sm:p-9 space-y-6">
          <div className="border-b border-[#C9A45C]/25 pb-4">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C] font-sans">
              Audit Specifications Matrix
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0E1A2B] mt-1">
              Detailed Feature & Diligence Comparison
            </h3>
            <p className="text-xs text-slate-600 font-sans font-light">
              Full breakdown of data coverage and services by membership tier.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-[#C9A45C]/30 text-slate-600 uppercase text-[11px] font-medium tracking-wider">
                  <th className="py-3 px-4">Feature / Intelligence Scope</th>
                  <th className="py-3 px-4 text-center">Free Desk</th>
                  <th className="py-3 px-4 text-center text-[#2E8B6E] font-bold">Investor</th>
                  <th className="py-3 px-4 text-center text-[#0E1A2B] font-bold">Pro / NRI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A45C]/20">
                {featureRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#0E1A2B]/4 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#1A1F2B]">{row.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      {row.free ? (
                        <Check className="w-4 h-4 text-[#2E8B6E] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.investor ? (
                        <Check className="w-4 h-4 text-[#2E8B6E] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.pro ? (
                        <Check className="w-4 h-4 text-[#C9A45C] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free Listing Banner for Landlords */}
        <div className="bg-[#0E1A2B] text-[#F7F3EC] rounded-sm border border-[#C9A45C]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#C9A45C]/15 border border-[#C9A45C]/30 text-[#C9A45C] text-[10px] font-semibold tracking-widest uppercase font-sans">
              <span>FOR APARTMENT OWNERS & LANDLORDS</span>
            </div>
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#F7F3EC]">
              Selling a Tenanted Flat in Bengaluru?
            </h4>
            <p className="text-xs text-slate-300 font-sans max-w-xl font-light">
              Listing your pre-rented home on Rentier is <strong className="text-[#C9A45C] font-semibold">100% Free</strong>. No upfront listing fees, no brokerage commissions charged to owners. Exit at a 10–15% capitalization premium.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('list-property')}
            className="px-6 py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs whitespace-nowrap transition-all tracking-wide cursor-pointer font-sans shrink-0 shadow-xs active:scale-98"
          >
            List Tenanted Apartment (Free)
          </button>
        </div>

      </div>
    </div>
  );
};
