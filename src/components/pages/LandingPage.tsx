import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { FileText, CheckCircle2, ShieldCheck, UserCheck, Check } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, navigateToProperty, setTier, tier, showToast } = useApp();
  const [isYearly, setIsYearly] = useState(false);

  const sampleProperty = MOCK_PROPERTIES[0];
  const featuredProperties = MOCK_PROPERTIES.slice(0, 6);

  // Stats count-up hook (1 second, ease-out)
  const [yieldVal, setYieldVal] = useState(3.8);
  const [occVal, setOccVal] = useState(100);
  const [tenancyVal, setTenancyVal] = useState(3);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  useEffect(() => {
    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      setYieldVal(3.8);
      setOccVal(100);
      setTenancyVal(3);
      setHasAnimatedStats(true);
      return;
    }

    let start: number | null = null;
    const duration = 1000;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setYieldVal(3.8 * easeOut);
      setOccVal(Math.round(100 * easeOut));
      setTenancyVal(3 * easeOut);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setHasAnimatedStats(true);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Budget Calculator State
  // Budget range: ₹50 L to ₹3 Cr, step ₹5 L, default ₹1.2 Cr (12,000,000)
  const [budget, setBudget] = useState(12000000);

  // Formatting budget into Indian format
  const formatBudgetDisplay = (val: number) => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    return `₹${Math.round(val / 100000)} L`;
  };

  // Monthly rent: budget * 3.8% / 12 rounded to nearest ₹500
  const monthlyRent = Math.round((budget * 0.038 / 12) / 500) * 500;
  // Yearly rent: monthlyRent * 12
  const yearlyRent = monthlyRent * 12;
  // Rent over 5 years with 5% yearly escalation
  const fiveYearMultiplier = 1 + 1.05 + Math.pow(1.05, 2) + Math.pow(1.05, 3) + Math.pow(1.05, 4);
  const fiveYearRent = Math.round(yearlyRent * fiveYearMultiplier);

  const formatLakhsCr = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} L`;
  };

  const matchingPropertiesCount = MOCK_PROPERTIES.filter(p => p.price <= budget).length;

  // Percentage for gold slider filled track
  const sliderPct = ((budget - 5000000) / (30000000 - 5000000)) * 100;

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-[#0E1A2B] overflow-x-hidden">
      {/* 1. Hero Section: #FAFAF8 */}
      <section className="bg-[#FAFAF8] pt-8 sm:pt-12 pb-24 sm:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Pre-rented homes · Bengaluru
            </span>

            {/* Headline: Cormorant Garamond, "pay you" in italic gold, max-w-[12ch] */}
            <h1 className="font-serif font-semibold text-[44px] sm:text-[60px] leading-[1.06] tracking-[-0.5px] text-[#0E1A2B] max-w-[12ch]">
              Homes that <span className="italic text-[#B08D4C] font-normal">pay you</span> from day one.
            </h1>

            {/* Body text in 16px Inter, #4B5563 */}
            <p className="text-[16px] text-[#4B5563] max-w-xl leading-relaxed">
              Verified residential properties with active leases and regular monthly cash flow.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#0E1A2B] text-white px-7 py-3.5 rounded-[12px] font-medium text-[15px] hover:bg-[#142338] transition-colors cursor-pointer shadow-xs"
              >
                View properties
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="text-[15px] font-medium text-[#0E1A2B] hover:text-[#B08D4C] transition-colors cursor-pointer flex items-center gap-1"
              >
                How it works →
              </button>
            </div>

            {/* Stats row with 1-second count-up */}
            <div className="pt-8 border-t border-[#ECECE8] flex items-center gap-8 sm:gap-10">
              <div>
                <span className="block text-[24px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {yieldVal.toFixed(1)}%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1.5 block">
                  avg yield
                </span>
              </div>

              <div className="w-[1px] h-9 bg-[#ECECE8]" />

              <div>
                <span className="block text-[24px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {occVal}%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1.5 block">
                  occupied
                </span>
              </div>

              <div className="w-[1px] h-9 bg-[#ECECE8]" />

              <div>
                <span className="block text-[24px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {hasAnimatedStats ? '3+ yrs' : `${Math.floor(tenancyVal)}+ yrs`}
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1.5 block">
                  avg tenancy
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 pb-12 sm:pb-8">
            {/* Solid soft-sand arch (#EFE6D6) backdrop, offset 24px up and right */}
            <div
              className="absolute -top-6 -right-6 w-full h-[460px] sm:h-[560px] bg-[#EFE6D6] pointer-events-none hidden sm:block z-0"
              style={{ borderRadius: '999px 999px 16px 16px' }}
              aria-hidden="true"
            />

            {/* Hero photo taller: 560px, arch-top mask */}
            <div
              className="relative w-full h-[460px] sm:h-[560px] overflow-hidden bg-[#ECECE8] z-1 shadow-sm"
              style={{ borderRadius: '999px 999px 16px 16px' }}
            >
              <img
                src={sampleProperty.primaryImage}
                alt="Prestige Wildwood, Whitefield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/images/placeholder.svg';
                }}
              />
            </div>

            {/* Overlaid floating property card on bottom-left with rent sparkline */}
            <div
              onClick={() => navigateToProperty(sampleProperty.id)}
              className="absolute -bottom-6 sm:-bottom-8 left-2 sm:-left-8 bg-white border border-[#ECECE8] rounded-[16px] p-4 shadow-md z-10 w-[calc(100%-16px)] sm:w-[350px] cursor-pointer hover:border-[#B08D4C] transition-colors"
            >
              <h3 className="font-serif font-semibold text-base sm:text-lg text-[#0E1A2B] truncate">
                Prestige Wildwood · Whitefield
              </h3>

              <div className="grid grid-cols-3 gap-2 pt-2.5 mt-2 border-t border-[#ECECE8] text-[13px]">
                <div>
                  <span className="block text-xs text-[#6B7280]">Rent</span>
                  <span className="font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                    ₹35,000/mo
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#6B7280]">Yield</span>
                  <span className="font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap">
                    3.7%
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#6B7280]">Tenant</span>
                  <span className="font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                    since 2022
                  </span>
                </div>
              </div>

              {/* Tiny rent sparkline 2022→2025 in green with label */}
              <div className="flex items-center gap-2 pt-2.5 mt-2 border-t border-[#ECECE8] text-[12px]">
                <svg width="60" height="18" viewBox="0 0 60 18" className="overflow-visible shrink-0" aria-hidden="true">
                  <polyline
                    fill="none"
                    stroke="#2E8B6E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="2,16 20,11 38,7 56,2"
                  />
                  <circle cx="56" cy="2" r="2.5" fill="#2E8B6E" />
                </svg>
                <span className="font-medium text-[#2E8B6E] tabular-nums font-sans">
                  ↑15% since 2022
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Calculator Section: Soft Sand #F3EEE4 */}
      <section className="bg-[#F3EEE4] py-20 sm:py-28 px-6 border-y border-[#E5DFD3]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Income Potential
            </span>
            <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#0E1A2B] leading-tight">
              See what your money earns
            </h2>
            <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto">
              Simulate cash flow from day one with verified historical tenant yields.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-[24px] border border-[#E5DFD3] p-8 sm:p-12 shadow-sm space-y-10">
            {/* Budget Slider */}
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-[#4B5563] font-medium text-[15px]">Your budget</span>
                <span className="text-2xl font-semibold text-[#0E1A2B] font-sans tabular-nums">
                  {formatBudgetDisplay(budget)}
                </span>
              </div>

              <input
                type="range"
                min={5000000}
                max={30000000}
                step={500000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                aria-label="Your budget slider"
                className="gold-slider w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #B08D4C 0%, #B08D4C ${sliderPct}%, #ECECE8 ${sliderPct}%, #ECECE8 100%)`,
                }}
              />

              <div className="flex justify-between text-xs text-[#6B7280]">
                <span>₹50 L</span>
                <span>₹1.75 Cr</span>
                <span>₹3 Cr</span>
              </div>
            </div>

            {/* Results: Monthly rent in 48px serif navy, other two results smaller below */}
            <div className="pt-8 border-t border-[#ECECE8] space-y-8">
              <div className="text-center">
                <span className="text-[13px] uppercase tracking-wider text-[#6B7280] font-medium block mb-2">
                  Monthly rent
                </span>
                <div className="font-serif font-bold text-[40px] sm:text-[48px] text-[#0E1A2B] tabular-nums leading-none">
                  ₹{monthlyRent.toLocaleString('en-IN')}
                  <span className="font-sans text-[16px] font-normal text-[#6B7280] ml-2">/ month</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto pt-6 border-t border-[#ECECE8] text-center">
                <div>
                  <span className="text-[13px] text-[#6B7280] block mb-1">
                    Yearly rent
                  </span>
                  <div className="text-[22px] sm:text-[24px] font-semibold text-[#0E1A2B] tabular-nums font-sans">
                    {formatLakhsCr(yearlyRent)}
                  </div>
                </div>

                <div>
                  <span className="text-[13px] text-[#6B7280] block mb-1">
                    Rent over 5 years
                  </span>
                  <div className="text-[22px] sm:text-[24px] font-semibold text-[#2E8B6E] tabular-nums font-sans">
                    {formatLakhsCr(fiveYearRent)}
                  </div>
                  <span className="text-[11px] text-[#6B7280] block mt-0.5">5% yearly escalation</span>
                </div>
              </div>
            </div>

            {/* Match Link and Footnote */}
            <div className="pt-6 text-center space-y-2 border-t border-[#ECECE8]">
              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[15px] font-medium text-[#0E1A2B] hover:text-[#B08D4C] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{matchingPropertiesCount} homes match this budget →</span>
              </button>

              <p className="text-xs text-[#6B7280] block">
                Based on 3.8% average gross yield. Indicative only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties: #FAFAF8 */}
      <section className="bg-[#FAFAF8] py-20 sm:py-28 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider mb-2">
                Curated Listings
              </span>
              <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#0E1A2B] leading-tight">
                Available properties
              </h2>
            </div>

            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[15px] font-medium text-[#0E1A2B] hover:text-[#B08D4C] transition-colors cursor-pointer self-start sm:self-auto"
            >
              View all →
            </button>
          </div>

          {/* Larger cards: 3 per row, photo 4:5 portrait ratio with arch-top mask */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                archPhoto={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Every home is checked": Navy #0E1A2B with ivory text and gold line icons */}
      <section className="bg-[#0E1A2B] text-[#F7F3EC] py-20 sm:py-28 px-6 border-y border-[#1C2A3D]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Verification Standards
            </span>
            <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#F7F3EC] leading-tight">
              Every home is checked
            </h2>
            <p className="text-[16px] text-[#9CA3AF]">
              Independent legal, financial, and physical audits before listing.
            </p>
          </div>

          {/* 4 items in a row with gold line icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#142338]/80 border border-[#23354E] rounded-[16px] p-6 space-y-3">
              <div className="w-11 h-11 rounded-lg bg-[#0E1A2B] border border-[#23354E] flex items-center justify-center text-[#B08D4C]">
                <FileText className="w-5 h-5 text-[#B08D4C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#F7F3EC]">
                Rent agreement
              </h3>
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                Registered agreement with audited rental escalation clauses.
              </p>
            </div>

            <div className="bg-[#142338]/80 border border-[#23354E] rounded-[16px] p-6 space-y-3">
              <div className="w-11 h-11 rounded-lg bg-[#0E1A2B] border border-[#23354E] flex items-center justify-center text-[#B08D4C]">
                <CheckCircle2 className="w-5 h-5 text-[#B08D4C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#F7F3EC]">
                Dues cleared
              </h3>
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                Zero pending society maintenance, property tax, or utility dues.
              </p>
            </div>

            <div className="bg-[#142338]/80 border border-[#23354E] rounded-[16px] p-6 space-y-3">
              <div className="w-11 h-11 rounded-lg bg-[#0E1A2B] border border-[#23354E] flex items-center justify-center text-[#B08D4C]">
                <ShieldCheck className="w-5 h-5 text-[#B08D4C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#F7F3EC]">
                Clear title
              </h3>
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                Independent 30-year title search and encumbrance verification.
              </p>
            </div>

            <div className="bg-[#142338]/80 border border-[#23354E] rounded-[16px] p-6 space-y-3">
              <div className="w-11 h-11 rounded-lg bg-[#0E1A2B] border border-[#23354E] flex items-center justify-center text-[#B08D4C]">
                <UserCheck className="w-5 h-5 text-[#B08D4C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#F7F3EC]">
                Tenant confirmed
              </h3>
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                Verified employment and clean multi-year payment history.
              </p>
            </div>
          </div>

          {/* Link: "See a sample report →" opening Prestige Wildwood */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                navigateToProperty('prop-1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[15px] font-medium text-[#F7F3EC] hover:text-[#B08D4C] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>See a sample report →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. How it works: Soft Sand #F3EEE4 */}
      <section id="how-it-works" className="bg-[#F3EEE4] py-20 sm:py-28 px-6 border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#0E1A2B] leading-tight">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[16px] border border-[#E5DFD3] p-8 space-y-3 shadow-xs">
              <span className="text-sm font-semibold text-[#B08D4C] tabular-nums font-sans">
                01
              </span>
              <p className="text-[16px] text-[#0E1A2B] font-medium font-sans">
                Browse verified homes with active leases.
              </p>
              <p className="text-[14px] text-[#4B5563]">
                Filter by yield, budget, and location with transparent tenant details.
              </p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#E5DFD3] p-8 space-y-3 shadow-xs">
              <span className="text-sm font-semibold text-[#B08D4C] tabular-nums font-sans">
                02
              </span>
              <p className="text-[16px] text-[#0E1A2B] font-medium font-sans">
                Review past rent payments and tenant history.
              </p>
              <p className="text-[14px] text-[#4B5563]">
                Inspect multi-year audited rent escalation statements and lease agreements.
              </p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#E5DFD3] p-8 space-y-3 shadow-xs">
              <span className="text-sm font-semibold text-[#B08D4C] tabular-nums font-sans">
                03
              </span>
              <p className="text-[16px] text-[#0E1A2B] font-medium font-sans">
                Complete purchase and start receiving rent.
              </p>
              <p className="text-[14px] text-[#4B5563]">
                Transfer ownership while existing tenant deposits rent into your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership Section: #FAFAF8 */}
      <section className="bg-[#FAFAF8] py-20 sm:py-28 px-6 border-b border-[#ECECE8]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[13px] font-medium text-[#B08D4C] block uppercase tracking-wider">
              Membership
            </span>
            <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#0E1A2B] leading-tight">
              Choose your plan
            </h2>

            {/* Monthly / Yearly toggle (Yearly = 2 months free) */}
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

          {/* Three cards in a row (stacked on mobile), equal height, max 5 bullets each */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
            {/* FREE (white card, 1px #ECECE8 border) */}
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

            {/* INVESTOR (navy #0E1A2B card, ivory text, 1px gold border, gold pill "Most popular", slightly raised above the others) */}
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

            {/* PRO (white card, 1px #ECECE8 border) */}
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

          {/* Below the cards, one muted line: "Cancel anytime." */}
          <p className="text-center text-sm text-[#6B7280] pt-2">
            Cancel anytime.
          </p>
        </div>
      </section>

      {/* 7. Final Call-to-Action Band: Full-width photo with 70% dark navy overlay */}
      <section className="relative w-full py-28 sm:py-36 px-6 overflow-hidden flex items-center justify-center text-center">
        {/* Full-width photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        {/* Dark navy overlay (70%) */}
        <div className="absolute inset-0 bg-[#0E1A2B] opacity-70" />

        {/* Arch outline watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-72 sm:w-96 h-80 sm:h-[420px] pointer-events-none opacity-15 translate-x-12 sm:translate-x-4"
          aria-hidden="true"
        >
          <svg viewBox="0 0 170 180" fill="none" className="w-full h-full">
            <path
              d="M 15 180 V 65 A 70 70 0 0 1 155 65 V 180"
              stroke="#B08D4C"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Content: Centred ivory serif headline and a gold button */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif font-semibold text-[36px] sm:text-[46px] text-[#F7F3EC] leading-[1.12]">
            Own a home that already pays you.
          </h2>

          <div>
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#B08D4C] hover:bg-[#9b7b41] text-[#0E1A2B] font-semibold px-8 py-4 rounded-[12px] text-[16px] transition-colors cursor-pointer shadow-lg"
            >
              View properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
