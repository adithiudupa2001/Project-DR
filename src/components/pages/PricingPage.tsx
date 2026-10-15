import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ChevronDown } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { tier, setTier, setActiveTab, showToast } = useApp();
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const comparisonRows = [
    { name: 'Browse all properties', free: true, investor: true, pro: true },
    { name: 'Price, rent, and yield', free: true, investor: true, pro: true },
    { name: 'Save favourites', free: true, investor: true, pro: true },
    { name: 'Full rent history', free: false, investor: true, pro: true },
    { name: 'Tenant details and lease terms', free: false, investor: true, pro: true },
    { name: 'Verification report', free: false, investor: true, pro: true },
    { name: 'Compare up to 4 homes', free: false, investor: true, pro: true },
    { name: 'New listing alerts', free: false, investor: true, pro: true },
    { name: 'Download reports (PDF)', free: false, investor: false, pro: true },
    { name: 'Locality rent trends', free: false, investor: false, pro: true },
    { name: 'Early access, 24 hours', free: false, investor: false, pro: true },
    { name: 'Priority owner contact', free: false, investor: false, pro: true },
  ];

  const faqs = [
    {
      q: 'What do members see?',
      a: 'Members see full rent history from bank records, verified tenant profiles and employment categories, lease agreement terms, and verification reports for every property.',
    },
    {
      q: 'Can I cancel?',
      a: 'Yes, you can cancel your membership anytime in one click from your account. Your access continues until the end of your billing cycle.',
    },
    {
      q: 'Is the data verified?',
      a: 'Every property is verified through registered sale deeds, BBMP records, 30-year title searches, and multi-year bank statements showing actual rent receipts.',
    },
    {
      q: 'Do you charge a fee when I buy?',
      a: 'No. Rentier does not charge brokerage or transaction fees to buyers. You deal directly with the property owner.',
    },
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#0E1A2B] py-12 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* Header & Plans */}
        <div className="space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Membership
            </span>
            <h1 className="font-serif font-semibold text-[36px] sm:text-[48px] text-[#0E1A2B] leading-tight">
              Choose your plan
            </h1>

            {/* Monthly / Yearly toggle */}
            <div className="pt-4 inline-flex items-center gap-2 bg-[#ECECE8] p-1 rounded-full text-xs font-medium">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  !isYearly
                    ? 'bg-[#0E1A2B] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#0E1A2B]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isYearly
                    ? 'bg-[#0E1A2B] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#0E1A2B]'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#2E8B6E] text-white">
                  2 months free
                </span>
              </button>
            </div>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
            {/* FREE */}
            <div className="bg-white rounded-[16px] border border-[#ECECE8] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-semibold text-2xl text-[#0E1A2B]">
                    Free
                  </h3>
                  <div className="mt-3">
                    <span className="font-serif text-4xl font-semibold text-[#0E1A2B]">₹0</span>
                  </div>
                  <span className="block text-xs text-[#6B7280] mt-1">Free forever</span>
                </div>

                <ul className="space-y-3 text-[14px] text-[#374151]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Browse all properties</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Price, rent, and yield</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Save favourites</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-8 w-full border border-[#0E1A2B] text-[#0E1A2B] hover:bg-[#0E1A2B] hover:text-white py-3 rounded-[12px] font-medium text-[15px] transition-colors cursor-pointer text-center"
              >
                Start browsing
              </button>
            </div>

            {/* INVESTOR */}
            <div className="bg-[#0E1A2B] text-[#F7F3EC] rounded-[16px] border border-[#B08D4C] p-8 flex flex-col justify-between relative md:-translate-y-2 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B08D4C] text-[#0E1A2B] text-[11px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most popular
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-semibold text-2xl text-[#F7F3EC]">
                    Investor
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl font-semibold text-[#F7F3EC] tabular-nums">
                      {isYearly ? '₹9,990' : '₹999'}
                    </span>
                    <span className="text-sm text-[#9CA3AF]">
                      {isYearly ? '/yr' : '/mo'}
                    </span>
                  </div>
                  <div className="text-xs text-[#B08D4C] mt-1 font-sans">
                    ₹999/mo · ₹9,990/yr
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">
                    {isYearly ? '≈ $120/yr' : '≈ $12/mo'}
                  </div>
                </div>

                <ul className="space-y-3 text-[14px] text-[#E5E7EB]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B08D4C] shrink-0" />
                    <span>Full rent history</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B08D4C] shrink-0" />
                    <span>Tenant details and lease terms</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B08D4C] shrink-0" />
                    <span>Verification report</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B08D4C] shrink-0" />
                    <span>Compare up to 4 homes</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B08D4C] shrink-0" />
                    <span>New listing alerts</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setTier('investor');
                  showToast('Welcome to Investor plan');
                }}
                className={`mt-8 w-full py-3 rounded-[12px] font-semibold text-[15px] transition-colors cursor-pointer text-center ${
                  tier === 'investor'
                    ? 'bg-[#2E8B6E] text-white cursor-default'
                    : 'bg-[#B08D4C] hover:bg-[#9b7b41] text-[#0E1A2B]'
                }`}
              >
                {tier === 'investor' ? 'Active plan' : 'Become an investor'}
              </button>
            </div>

            {/* PRO */}
            <div className="bg-white rounded-[16px] border border-[#ECECE8] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-semibold text-2xl text-[#0E1A2B]">
                    Pro
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl font-semibold text-[#0E1A2B] tabular-nums">
                      {isYearly ? '₹24,990' : '₹2,499'}
                    </span>
                    <span className="text-sm text-[#6B7280]">
                      {isYearly ? '/yr' : '/mo'}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1 font-sans">
                    ₹2,499/mo · ₹24,990/yr
                  </div>
                  <div className="text-xs text-[#6B7280] mt-0.5">
                    {isYearly ? '≈ $300/yr' : '≈ $30/mo'}
                  </div>
                </div>

                <ul className="space-y-3 text-[14px] text-[#374151]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Everything in Investor</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Download reports (PDF)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Locality rent trends</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Early access, 24 hours</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Priority owner contact</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setTier('pro');
                  showToast('Upgraded to Pro plan');
                }}
                className={`mt-8 w-full border border-[#0E1A2B] py-3 rounded-[12px] font-medium text-[15px] transition-colors cursor-pointer text-center ${
                  tier === 'pro'
                    ? 'bg-[#0E1A2B] text-white cursor-default'
                    : 'text-[#0E1A2B] hover:bg-[#0E1A2B] hover:text-white'
                }`}
              >
                {tier === 'pro' ? 'Active plan' : 'Go Pro'}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-[#6B7280]">
            Cancel anytime.
          </p>
        </div>

        {/* Simple feature comparison table (ticks only) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Comparison
            </span>
            <h2 className="font-serif font-semibold text-[28px] sm:text-[36px] text-[#0E1A2B]">
              Compare features
            </h2>
          </div>

          <div className="bg-white rounded-[16px] border border-[#ECECE8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#ECECE8] bg-[#FAFAF8] text-[#0E1A2B]">
                    <th className="py-4 px-6 font-medium text-[14px]">Feature</th>
                    <th className="py-4 px-6 text-center font-medium text-[14px] w-28 sm:w-36">Free</th>
                    <th className="py-4 px-6 text-center font-medium text-[14px] w-28 sm:w-36 text-[#B08D4C]">
                      Investor
                    </th>
                    <th className="py-4 px-6 text-center font-medium text-[14px] w-28 sm:w-36">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECE8]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAF8]/50 transition-colors">
                      <td className="py-3.5 px-6 text-[#374151] font-medium">{row.name}</td>
                      <td className="py-3.5 px-6 text-center">
                        {row.free ? (
                          <Check className="w-4 h-4 text-[#2E8B6E] mx-auto" />
                        ) : (
                          <span className="text-[#9CA3AF]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {row.investor ? (
                          <Check className="w-4 h-4 text-[#2E8B6E] mx-auto font-bold" />
                        ) : (
                          <span className="text-[#9CA3AF]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {row.pro ? (
                          <Check className="w-4 h-4 text-[#2E8B6E] mx-auto font-bold" />
                        ) : (
                          <span className="text-[#9CA3AF]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4 FAQ accordions */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Answers
            </span>
            <h2 className="font-serif font-semibold text-[28px] sm:text-[36px] text-[#0E1A2B]">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[12px] border border-[#ECECE8] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif font-semibold text-[18px] text-[#0E1A2B]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6B7280] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-[15px] text-[#4B5563] leading-relaxed border-t border-[#ECECE8]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
