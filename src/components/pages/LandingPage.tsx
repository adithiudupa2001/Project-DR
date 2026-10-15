import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { Check, FileText, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

// Reusable viewport fade-up animation component
const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { setActiveTab, openUpgradeModal, navigateToProperty } = useApp();

  const sampleProperty = MOCK_PROPERTIES[0];
  const featuredProperties = MOCK_PROPERTIES.slice(0, 6);

  // 1. Stats count-up hook (1 second, ease-out, respects prefers-reduced-motion)
  const [hasLoaded, setHasLoaded] = useState(false);
  const [yieldVal, setYieldVal] = useState(0);
  const [occVal, setOccVal] = useState(0);
  const [tenancyVal, setTenancyVal] = useState(0);

  useEffect(() => {
    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      setYieldVal(3.8);
      setOccVal(100);
      setTenancyVal(3);
      setHasLoaded(true);
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
        setHasLoaded(true);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 2. Budget Calculator State
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
  // Rent over 5 years with 5% yearly escalation:
  // Year 1 + Year 1 * 1.05 + Year 1 * 1.05^2 + Year 1 * 1.05^3 + Year 1 * 1.05^4
  const fiveYearMultiplier = 1 + 1.05 + Math.pow(1.05, 2) + Math.pow(1.05, 3) + Math.pow(1.05, 4);
  const fiveYearRent = Math.round(yearlyRent * fiveYearMultiplier);

  const formatLakhsCr = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} L`;
  };

  const matchingPropertiesCount = MOCK_PROPERTIES.filter(p => p.price <= budget).length;

  // 3. Timeline Animation (Rent from month one)
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineVisible, setTimelineVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimelineVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFAF8] text-[#0E1A2B] overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-[96px] pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[13px] font-medium text-[#B08D4C] block tracking-normal">
              Pre-rented homes · Bengaluru
            </span>

            <h1 className="font-serif font-semibold text-[36px] sm:text-[56px] leading-[1.1] tracking-[-0.5px] text-[#0E1A2B]">
              Homes that pay you from day one.
            </h1>

            <p className="text-base sm:text-lg text-[#6B7280] max-w-xl">
              Verified residential properties with active leases and regular monthly cash flow.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#0E1A2B] text-white px-6 py-3 rounded-[12px] font-medium text-[15px] hover:bg-[#142338] transition-colors cursor-pointer"
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

            {/* Stats with 1-second ease-out count-up */}
            <div className="pt-6 border-t border-[#ECECE8] flex items-center gap-6 sm:gap-8">
              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {yieldVal.toFixed(1)}%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  avg yield
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#ECECE8]" />

              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {occVal}%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  occupied
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#ECECE8]" />

              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  {hasLoaded ? '3+ yrs' : `${Math.floor(tenancyVal)}+ yrs`}
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  avg tenancy
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 pb-10 sm:pb-8">
            {/* Soft gold arch outline behind photo: same shape as logo, 1px #B08D4C at 30% opacity, offset 24px up-right */}
            <div
              className="absolute -top-6 -right-6 w-full h-[380px] sm:h-[460px] pointer-events-none hidden sm:block z-0"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 400 460"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M 2 458 V 160 A 198 198 0 0 1 398 160 V 458"
                  stroke="#B08D4C"
                  strokeWidth="1.2"
                  strokeOpacity="0.3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Building photo with 16px radius, height ~460px, object-fit cover */}
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-[16px] overflow-hidden bg-[#ECECE8] z-1">
              <img
                src={sampleProperty.primaryImage}
                alt="Prestige Wildwood, Whitefield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[16px]"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/images/placeholder.svg';
                }}
              />
            </div>

            {/* Overlaid floating property card on the bottom-left corner with tiny rent sparkline */}
            <div
              onClick={() => navigateToProperty(sampleProperty.id)}
              className="absolute -bottom-4 sm:-bottom-8 left-2 sm:-left-8 bg-white border border-[#ECECE8] rounded-[16px] p-4 shadow-sm z-10 w-[calc(100%-16px)] sm:w-[350px] cursor-pointer hover:border-[#B08D4C] transition-colors"
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

              {/* Tiny rent sparkline 2022→2025 (32k, 33.6k, 35k, 36.75k) in green with label */}
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-[#ECECE8] text-[12px]">
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

      {/* 2. NEW SECTION: "See what your money earns" (right after the hero) */}
      <FadeInSection className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[16px] border border-[#ECECE8] p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
              See what your money earns
            </h2>
            <p className="text-[14px] text-[#6B7280]">
              Explore rental income based on verified Day-1 tenant yield.
            </p>
          </div>

          {/* Budget Slider */}
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280] font-medium">Your budget</span>
              <span className="text-xl font-semibold text-[#0E1A2B] font-sans tabular-nums">
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
              className="w-full h-2 bg-[#ECECE8] rounded-lg appearance-none cursor-pointer"
            />

            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>₹50 L</span>
              <span>₹1.5 Cr</span>
              <span>₹3 Cr</span>
            </div>
          </div>

          {/* Three live results in large numbers (32px) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#ECECE8] text-center sm:text-left">
            <div>
              <span className="text-[13px] text-[#6B7280] block mb-1">
                Monthly rent
              </span>
              <div className="text-[28px] sm:text-[32px] font-semibold text-[#0E1A2B] tabular-nums leading-none">
                ₹{monthlyRent.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <span className="text-[13px] text-[#6B7280] block mb-1">
                Yearly rent
              </span>
              <div className="text-[28px] sm:text-[32px] font-semibold text-[#0E1A2B] tabular-nums leading-none">
                {formatLakhsCr(yearlyRent)}
              </div>
            </div>

            <div>
              <span className="text-[13px] text-[#6B7280] block mb-1">
                Rent over 5 years
              </span>
              <div className="text-[28px] sm:text-[32px] font-semibold text-[#2E8B6E] tabular-nums leading-none">
                {formatLakhsCr(fiveYearRent)}
              </div>
            </div>
          </div>

          {/* Match Link and Footnote */}
          <div className="pt-4 text-center space-y-2 border-t border-[#ECECE8]">
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
      </FadeInSection>

      {/* 3. NEW SECTION: "Rent from month one" */}
      <FadeInSection className="max-w-4xl mx-auto px-6 py-16">
        <div ref={timelineRef} className="bg-white rounded-[16px] border border-[#ECECE8] p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
              Rent from month one
            </h2>
            <p className="text-[14px] text-[#6B7280]">
              Comparing cash flow across 36 months of ownership.
            </p>
          </div>

          {/* Month Scale Header */}
          <div className="flex justify-between text-xs text-[#6B7280] font-sans px-1">
            <span>Month 1</span>
            <span>Month 12</span>
            <span>Month 24</span>
            <span>Month 36</span>
          </div>

          <div className="space-y-6">
            {/* Timeline 1: Pre-rented home */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[#0E1A2B]">Pre-rented home</span>
                <span className="font-semibold text-[#2E8B6E] tabular-nums">₹12.6 L earned</span>
              </div>
              <div className="h-10 bg-[#ECECE8] rounded-[8px] overflow-hidden p-1">
                <div
                  style={{
                    width: timelineVisible ? '100%' : '0%',
                  }}
                  className="h-full bg-[#2E8B6E] rounded-[6px] transition-all duration-800 ease-out flex items-center px-4 text-white text-xs sm:text-sm font-medium"
                >
                  <span className="whitespace-nowrap">₹12.6 L earned</span>
                </div>
              </div>
            </div>

            {/* Timeline 2: Under-construction flat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[#6B7280]">Under-construction flat</span>
                <span className="font-semibold text-[#6B7280] tabular-nums">₹2.1 L earned</span>
              </div>
              <div className="h-10 bg-[#ECECE8] rounded-[8px] overflow-hidden p-1 flex gap-1">
                {/* 1–30 months: waiting */}
                <div
                  style={{
                    width: timelineVisible ? '83.33%' : '0%',
                  }}
                  className="h-full bg-white border border-dashed border-[#6B7280]/40 rounded-[6px] transition-all duration-800 ease-out flex items-center justify-center text-xs text-[#6B7280] font-medium overflow-hidden px-2"
                >
                  <span className="whitespace-nowrap truncate">Waiting for possession (30 mos)</span>
                </div>
                {/* 31–36 months: rental */}
                <div
                  style={{
                    width: timelineVisible ? '16.67%' : '0%',
                  }}
                  className="h-full bg-[#2E8B6E] rounded-[6px] transition-all duration-800 ease-out flex items-center justify-center text-white text-xs font-medium overflow-hidden px-1"
                >
                  <span className="whitespace-nowrap truncate">₹2.1 L</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[15px] text-[#6B7280] font-medium pt-2">
            Same budget. Very different first three years.
          </p>
        </div>
      </FadeInSection>

      {/* 4. Properties: 6 cards + "View all" */}
      <FadeInSection className="max-w-7xl mx-auto px-6 py-16 border-t border-[#ECECE8]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
            Available properties
          </h2>
          <button
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[14px] font-medium text-[#0E1A2B] hover:text-[#B08D4C] transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </FadeInSection>

      {/* 5. NEW SECTION: "Every home is checked" */}
      <FadeInSection className="max-w-7xl mx-auto px-6 py-20 border-t border-[#ECECE8]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
            Every home is checked
          </h2>
          <p className="text-[14px] text-[#6B7280] mt-2">
            Rigorous due diligence audits before any property is listed.
          </p>
        </div>

        {/* 4 items in a row, each with a thin-line icon, a 2–3 word title, and one short line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#ECECE8] flex items-center justify-center text-[#0E1A2B]">
              <FileText className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-[#0E1A2B]">
              Rent agreement verified
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Registered agreements and recorded escalation clauses.
            </p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#ECECE8] flex items-center justify-center text-[#0E1A2B]">
              <CheckCircle2 className="w-5 h-5 text-[#2E8B6E]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-[#0E1A2B]">
              Dues cleared
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Zero pending society maintenance, water, or utility charges.
            </p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#ECECE8] flex items-center justify-center text-[#0E1A2B]">
              <ShieldCheck className="w-5 h-5 text-[#B08D4C]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-[#0E1A2B]">
              Clear title
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Independent 30-year title search and encumbrance audit.
            </p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#ECECE8] flex items-center justify-center text-[#0E1A2B]">
              <UserCheck className="w-5 h-5 text-[#0E1A2B]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-[#0E1A2B]">
              Tenant confirmed
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Corporate employment track and punctual payment history.
            </p>
          </div>
        </div>

        {/* Link: "See a sample report →" opening Prestige Wildwood */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              navigateToProperty('prop-1');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[15px] font-medium text-[#0E1A2B] hover:text-[#B08D4C] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>See a sample report →</span>
          </button>
        </div>
      </FadeInSection>

      {/* 6. How it works: 3 steps, 1 line each */}
      <FadeInSection id="how-it-works" className="border-t border-[#ECECE8] bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B] mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#6B7280] tabular-nums font-sans">
                01
              </span>
              <p className="text-[15px] text-[#0E1A2B] font-medium font-sans">
                Browse verified homes with active leases.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#6B7280] tabular-nums font-sans">
                02
              </span>
              <p className="text-[15px] text-[#0E1A2B] font-medium font-sans">
                Review past rent payments and tenant history.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#6B7280] tabular-nums font-sans">
                03
              </span>
              <p className="text-[15px] text-[#0E1A2B] font-medium font-sans">
                Complete purchase and start receiving rent.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 7. Membership: one plan, 3 bullet benefits, one button */}
      <FadeInSection className="border-t border-[#ECECE8] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B] mb-8">
            Membership
          </h2>

          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-8 text-left space-y-6">
            <div>
              <span className="text-[13px] text-[#6B7280] block font-sans">Plan</span>
              <div className="text-2xl font-semibold text-[#0E1A2B] tabular-nums font-sans">
                Membership ₹999/mo
              </div>
            </div>

            <ul className="space-y-3 font-sans">
              <li className="flex items-center gap-3 text-[14px] text-[#0E1A2B]">
                <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                <span>Access full rent payment histories</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#0E1A2B]">
                <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                <span>View tenant background and lease terms</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#0E1A2B]">
                <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                <span>Compare properties and download reports</span>
              </li>
            </ul>

            <button
              onClick={() => openUpgradeModal('Join membership for complete property records')}
              className="w-full bg-[#0E1A2B] text-white py-3 rounded-[12px] font-medium text-[15px] hover:bg-[#142338] transition-colors cursor-pointer font-sans"
            >
              Join now
            </button>
          </div>
        </div>
      </FadeInSection>

      {/* 8. NEW SECTION: Navy Band (only one on the page, before the footer) */}
      <FadeInSection className="w-full bg-[#0E1A2B] relative overflow-hidden py-16 sm:py-20 text-center px-6">
        {/* Large faint gold arch outline watermark on the right */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-72 sm:h-96 pointer-events-none opacity-10 translate-x-12 sm:translate-x-4"
          aria-hidden="true"
        >
          <svg viewBox="0 0 170 180" fill="none" className="w-full h-full">
            <path
              d="M 15 180 V 65 A 70 70 0 0 1 155 65 V 180"
              stroke="#B08D4C"
              strokeWidth="5"
            />
          </svg>
        </div>

        <div className="relative z-1 max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#F7F3EC]">
            Own a home that already pays you.
          </h2>

          <div>
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#B08D4C] hover:bg-[#9b7b41] text-[#0E1A2B] font-semibold px-7 py-3.5 rounded-[12px] text-[15px] transition-colors cursor-pointer shadow-sm"
            >
              View properties
            </button>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};
