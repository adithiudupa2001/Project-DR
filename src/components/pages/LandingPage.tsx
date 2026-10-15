import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { Check } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, openUpgradeModal, navigateToProperty } = useApp();

  const sampleProperty = MOCK_PROPERTIES[0];
  const featuredProperties = MOCK_PROPERTIES.slice(0, 6);

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFAF8] text-[#0E1A2B]">
      {/* 1. Hero (two columns on desktop, stacked on mobile) */}
      <section className="max-w-7xl mx-auto px-6 pt-[96px] pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small gold eyebrow */}
            <span className="text-[13px] font-medium text-[#B08D4C] block tracking-normal">
              Pre-rented homes · Bengaluru
            </span>

            {/* Headline: Cormorant Garamond 600, 56px desktop / 36px mobile, line-height 1.1, letter-spacing -0.5px */}
            <h1 className="font-serif font-semibold text-[36px] sm:text-[56px] leading-[1.1] tracking-[-0.5px] text-[#0E1A2B]">
              Homes that pay you from day one.
            </h1>

            {/* One subline (max 12 words, #6B7280) */}
            <p className="text-base sm:text-lg text-[#6B7280] max-w-xl">
              Verified residential properties with active leases and regular monthly cash flow.
            </p>

            {/* Primary button + secondary text link */}
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

            {/* Below buttons: row of 3 small stats separated by thin vertical dividers */}
            <div className="pt-6 border-t border-[#ECECE8] flex items-center gap-6 sm:gap-8">
              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  3.8%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  avg yield
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#ECECE8]" />

              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  100%
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  occupied
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#ECECE8]" />

              <div>
                <span className="block text-[22px] font-semibold text-[#0E1A2B] tabular-nums font-sans leading-none">
                  3+ yrs
                </span>
                <span className="text-[13px] text-[#6B7280] mt-1 block">
                  avg tenancy
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 pb-10 sm:pb-8">
            {/* Building photo with 16px radius, height ~460px, object-fit cover */}
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-[16px] overflow-hidden bg-[#ECECE8]">
              <img
                src={sampleProperty.primaryImage}
                alt="Prestige Wildwood, Whitefield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>

            {/* Overlaid white property card on the bottom-left corner (overlapping the edge by ~32px) */}
            <div
              onClick={() => navigateToProperty(sampleProperty.id)}
              className="absolute -bottom-4 sm:-bottom-8 left-2 sm:-left-8 bg-white border border-[#ECECE8] rounded-[16px] p-4 shadow-sm z-10 w-[calc(100%-16px)] sm:w-[350px] cursor-pointer hover:border-[#0E1A2B]/30 transition-colors"
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
            </div>
          </div>

        </div>
      </section>

      {/* 2. Properties: 6 cards + "View all" */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#ECECE8]">
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
      </section>

      {/* 3. How it works: 3 steps, 1 line each */}
      <section id="how-it-works" className="border-t border-[#ECECE8] bg-white py-20">
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
      </section>

      {/* 4. Membership: one plan, 3 bullet benefits, one button */}
      <section className="border-t border-[#ECECE8] py-20">
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
      </section>
    </div>
  );
};
