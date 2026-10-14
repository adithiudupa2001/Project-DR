import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES, ASSET_IMAGES } from '../../data/mockProperties';
import { formatCurrencyValue, formatRent, formatYield, GROSS_YIELD_FOOTNOTE } from '../../utils/formatters';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Users,
  Compass,
  FileCheck,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, navigateToProperty, currency } = useApp();

  const benchmarkListings = MOCK_PROPERTIES.slice(0, 7);
  const avgGrossYield = (
    benchmarkListings.reduce((acc, curr) => acc + curr.grossYieldPct, 0) /
    benchmarkListings.length
  ).toFixed(2);
  const totalVerifiedRentFlow = benchmarkListings.reduce((acc, curr) => acc + curr.monthlyRent, 0);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does remote pre-rented asset acquisition work for global NRIs?',
      a: 'Rentier operates as a private-bank style discovery and diligence venue. Overseas investors review institutional-grade dossiers covering biometric registered lease deeds, 36-month bank payment statements, and Kaveri portal encumbrance records. Title conveyance is executed remotely via registered Special Power of Attorney (PoA) without requiring travel to India.',
    },
    {
      q: 'Do rental cash flows begin from Day 1 of registration?',
      a: 'Yes. Because the tenant is already residing in the property under an active registered lease agreement, the tenancy covenants, security deposits, and rental obligations legally transfer on the date of title deed execution. Subsequent monthly rents are credited directly to your designated NRO or domestic bank account.',
    },
    {
      q: 'How are tenant payment records audited?',
      a: 'Rentier forensically reconciles 24 to 36 consecutive bank statements showing electronic NEFT, RTGS, or UPI credits from the tenant, cross-verifies registered Sub-Registrar lease filings, and inspects society resident welfare association (RWA) maintenance ledgers for zero arrears.',
    },
    {
      q: 'Why can landlords command a 10–15% premium on tenanted inventory?',
      a: 'Pre-rented residential assets eliminate 3 to 6 months of tenant-hunting vacancy downtime, interior setup outlays, and broker commissions for the incoming buyer. Investors willingly pay a modest premium for the certainty of immediate, audited yield.',
    },
    {
      q: 'What are the repatriation and taxation provisions for NRIs (Section 195)?',
      a: 'Rental income credited to an NRO account can be seamlessly repatriated up to USD 1,000,000 per financial year under RBI guidelines using Form 15CA/15CB. Rentier’s legal partners assist in securing Lower TDS Certificates under Section 195.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1A1F2B]">
      
      {/* 1. HERO SECTION: Midnight Navy #0E1A2B */}
      <section className="relative bg-[#0E1A2B] text-[#F7F3EC] pt-14 pb-24 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#C9A45C]/25">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Eyebrow Label in Antique Gold */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C9A45C]/10 border border-[#C9A45C]/35 text-[#C9A45C] text-[11px] font-semibold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]"></span>
                <span>RESIDENTIAL YIELD PLATFORM • BENGALURU</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide text-[#F7F3EC] leading-[1.14] text-balance">
                Investing in Bangalore from afar?
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-light">
                Pre-rented homes with Day-1 rental yields, vetted tenants, and zero construction delays. Confident wealth preservation designed for global NRIs and discerning capital.
              </p>

              {/* Three Feature Chips */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#09111D] border border-[#C9A45C]/30 text-xs font-medium text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6E]" />
                  <span>Day-1 Passive Yield</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#09111D] border border-[#C9A45C]/30 text-xs font-medium text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B6E]" />
                  <span>Vetted Corporate Tenants</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#09111D] border border-[#C9A45C]/30 text-xs font-medium text-slate-200">
                  <FileCheck className="w-3.5 h-3.5 text-[#2E8B6E]" />
                  <span>Complete Remote Audit</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98"
                >
                  <span>Explore Pre-Rented Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('list-property');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xs bg-[#0E1A2B] hover:bg-[#142338] border border-[#C9A45C]/40 text-[#F7F3EC] font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Landlords: Exit at +10%</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C9A45C]" />
                </button>
              </div>

              {/* Footnote */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 font-sans">
                <span className="text-[#C9A45C] font-semibold tracking-wide">Launch Market: Bengaluru</span>
                <span>·</span>
                <span>Whitefield · Outer Ring Road · Hebbal · Bellandur</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-[#C9A45C]/40 bg-[#09111D] shadow-2xl group">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={ASSET_IMAGES.hero}
                    alt="Pre-rented luxury residence in Bengaluru"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B] via-transparent to-black/25"></div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-xs bg-[#0E1A2B]/95 border border-[#C9A45C]/40 text-[#F7F3EC] text-xs font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B6E]"></span>
                      <span>Benchmark Asset Spotlight</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-[#F7F3EC]">
                    <div>
                      <div className="text-[11px] text-[#C9A45C] uppercase tracking-wider font-semibold">Whitefield IT Corridor</div>
                      <div className="font-serif text-2xl font-bold">Prestige Wildwood</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-300 uppercase tracking-wider">Day-1 Cash Flow</div>
                      <div className="font-mono text-xl font-bold text-[#F7F3EC] tabular-nums">
                        {formatRent(35000, currency)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Strip */}
                <div className="p-5 space-y-3 bg-[#0E1A2B] border-t border-[#C9A45C]/25">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs divide-x divide-[#C9A45C]/20">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Gross Yield</span>
                      <strong className="text-[#2E8B6E] text-sm font-bold font-mono">3.7% Gross</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Audited Rent</span>
                      <strong className="text-[#F7F3EC] text-sm font-bold font-mono">3+ Years</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Tenant</span>
                      <strong className="text-slate-200 text-sm font-semibold truncate block">IT Architect</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToProperty('prop-1')}
                    className="w-full py-2.5 rounded-xs bg-[#142338] hover:bg-[#1C2F4A] text-[#C9A45C] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors border border-[#C9A45C]/30"
                  >
                    <span>Inspect Benchmark Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION: Ivory #F7F3EC + Muted Brick #B4483C */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B4483C]">
            The Remote Allocation Dilemma
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
            Why Remote Real Estate Buying Breaks Down
          </h2>
          <p className="text-[#1A1F2B]/75 text-sm sm:text-base leading-relaxed">
            Outstation investors and global NRIs face a <strong className="text-[#B4483C]">"zero yield horizon"</strong> when purchasing off-plan or vacant units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pain Point 1 */}
          <div className="bg-[#F7F3EC] p-8 rounded-sm border border-[#B4483C]/30 space-y-4">
            <div className="w-10 h-10 rounded-sm bg-[#B4483C]/10 text-[#B4483C] border border-[#B4483C]/25 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">
              Delayed Possession
            </h3>
            <p className="text-[#1A1F2B]/75 text-xs sm:text-sm leading-relaxed font-sans">
              Capital tied up for 3 to 6 years with zero rental cash flow. Construction delays and bureaucratic hold-ups drain liquidity while home loan interest accrues without interruption.
            </p>
            <div className="pt-2 text-xs font-mono text-[#B4483C] border-t border-[#B4483C]/20">
              Avg. Metro Delay: 18–36 months of lost yield
            </div>
          </div>

          {/* Pain Point 2 */}
          <div className="bg-[#F7F3EC] p-8 rounded-sm border border-[#B4483C]/30 space-y-4">
            <div className="w-10 h-10 rounded-sm bg-[#B4483C]/10 text-[#B4483C] border border-[#B4483C]/25 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">
              Builder Rental Promises
            </h3>
            <p className="text-[#1A1F2B]/75 text-xs sm:text-sm leading-relaxed font-sans">
              Brochure projections advertise 5–6% yields that fail to materialize upon handover. In reality, landlords face interior fitting delays, broker friction, and 4 to 6 months of dead vacancy.
            </p>
            <div className="pt-2 text-xs font-mono text-[#B4483C] border-t border-[#B4483C]/20">
              Post-handover vacancy gap: 4–6 months
            </div>
          </div>

          {/* Pain Point 3 */}
          <div className="bg-[#F7F3EC] p-8 rounded-sm border border-[#B4483C]/30 space-y-4">
            <div className="w-10 h-10 rounded-sm bg-[#B4483C]/10 text-[#B4483C] border border-[#B4483C]/25 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">
              Unknown Legal Hurdles
            </h3>
            <p className="text-[#1A1F2B]/75 text-xs sm:text-sm leading-relaxed font-sans">
              Unverified title chains, undisclosed society maintenance arrears, and the stress of coordinating biometric Sub-Registrar filings across time zones create chronic anxiety for NRIs.
            </p>
            <div className="pt-2 text-xs font-mono text-[#B4483C] border-t border-[#B4483C]/20">
              Lack of institutional diligence & escrow
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SMARTER ALTERNATIVE: Midnight Navy #0E1A2B Section */}
      <section className="py-20 bg-[#0E1A2B] text-[#F7F3EC] border-y border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
                The Rentier Thesis
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-[#F7F3EC]">
                The Smarter Alternative: Pre-Rented Residential
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Why wait on speculative builder promises when you can acquire proven cash flow? Rentier curates modern, gated-community apartments where vetted corporate tenants are already residing and paying rent.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo(0, 0);
                  }}
                  className="px-6 py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs tracking-wide flex items-center gap-2 transition-colors"
                >
                  <span>Explore Audited Assets</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-6 rounded-sm bg-[#09111D] border border-[#C9A45C]/25 space-y-3">
                <div className="text-[#C9A45C] font-semibold text-[10px] uppercase tracking-[0.18em]">
                  01 · Modern Stock
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F7F3EC]">Not Very Old</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Handed over within the last 2 to 4 years. Low maintenance overhead, modern clubhouse facilities, and long residual asset life.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-[#09111D] border border-[#C9A45C]/25 space-y-3">
                <div className="text-[#C9A45C] font-semibold text-[10px] uppercase tracking-[0.18em]">
                  02 · Documented
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F7F3EC]">Audited History</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Backed by 2 to 4 years of verified electronic bank credits. Known escalation trajectories and zero payment gaps.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-[#09111D] border border-[#C9A45C]/25 space-y-3">
                <div className="text-[#C9A45C] font-semibold text-[10px] uppercase tracking-[0.18em]">
                  03 · Day-1 Yield
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F7F3EC]">Tenanted Day 1</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Rental income accrues from the precise date of title registration. Zero tenant-hunting downtime, fully passive ownership.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHO IT'S FOR: 4 KEY PERSONAS */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
            Private Allocator Profiles
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
            Designed for Four Discerning Buyer Profiles
          </h2>
          <p className="text-[#1A1F2B]/75 text-sm sm:text-base leading-relaxed">
            Eliminating the operational and physical burdens of distant real estate management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Persona 1: NRIs */}
          <div className="bg-[#F7F3EC] p-7 rounded-sm border border-[#C9A45C]/35 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A45C]">Primary Persona</div>
              <h3 className="font-serif text-xl font-bold text-[#0E1A2B]">
                1. Global NRIs
              </h3>
              <p className="text-[#1A1F2B]/75 text-xs leading-relaxed font-sans">
                Deploying capital from the US, UAE, UK, or Singapore. Requires 100% remote title audit, registered PoA execution, and direct NRO rental credits without maintenance calls.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#C9A45C]/20 text-[11px] text-[#C9A45C] font-semibold">
              Remote diligence & Day-1 passive yield.
            </div>
          </div>

          {/* Persona 2: Tier 2/3 Investors */}
          <div className="bg-[#F7F3EC] p-7 rounded-sm border border-[#C9A45C]/35 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A45C]">Regional Capital</div>
              <h3 className="font-serif text-xl font-bold text-[#0E1A2B]">
                2. Tier 2 & 3 Investors
              </h3>
              <p className="text-[#1A1F2B]/75 text-xs leading-relaxed font-sans">
                Outstation capital from Jaipur, Coimbatore, Indore, and Surat seeking exposure to Bengaluru’s tech expansion without the friction of local broker coordination.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#C9A45C]/20 text-[11px] text-[#C9A45C] font-semibold">
              Bengaluru tech growth with zero broker friction.
            </div>
          </div>

          {/* Persona 3: Retirees & Seniors */}
          <div className="bg-[#F7F3EC] p-7 rounded-sm border border-[#C9A45C]/35 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A45C]">Dependable Income</div>
              <h3 className="font-serif text-xl font-bold text-[#0E1A2B]">
                3. Retirees & Seniors
              </h3>
              <p className="text-[#1A1F2B]/75 text-xs leading-relaxed font-sans">
                Need dependable monthly cash flow to complement pensions. No tenant disputes, large legible interfaces, and clean bank reconciliations without physical upkeep.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#C9A45C]/20 text-[11px] text-[#C9A45C] font-semibold">
              Peace of mind with audited tenancies.
            </div>
          </div>

          {/* Persona 4: Yield Investors */}
          <div className="bg-[#F7F3EC] p-7 rounded-sm border border-[#C9A45C]/35 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A45C]">Total Return</div>
              <h3 className="font-serif text-xl font-bold text-[#0E1A2B]">
                4. Yield Investors
              </h3>
              <p className="text-[#1A1F2B]/75 text-xs leading-relaxed font-sans">
                Institutional-minded portfolio builders looking for inflation-beating 3.8%–4.1% gross cash yields coupled with 8–10% annual Bangalore capital appreciation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#C9A45C]/20 text-[11px] text-[#C9A45C] font-semibold">
              Cash flow stability + capital compounding.
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE BENCHMARK TABLE */}
      <section className="py-20 bg-[#F7F3EC] border-y border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A45C] mb-1">
                Bengaluru Market Benchmark
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1A2B]">
                Live Pre-Rented Market Benchmark Table
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Audited inventory currently tenanted in Tier-1 Bengaluru communities.
              </p>
            </div>

            <div className="flex items-center gap-5 bg-[#0E1A2B] text-[#F7F3EC] px-5 py-3 rounded-xs border border-[#C9A45C]/30 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Avg Gross Yield</span>
                <strong className="text-[#2E8B6E] font-bold font-mono text-base tabular-nums">{avgGrossYield}%</strong>
              </div>
              <div className="h-6 w-px bg-[#C9A45C]/30"></div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Monthly Rental Volume</span>
                <strong className="text-[#F7F3EC] font-bold font-mono text-base tabular-nums">{formatRent(totalVerifiedRentFlow, currency)}</strong>
              </div>
            </div>
          </div>

          {/* Benchmark Table View */}
          <div className="overflow-x-auto rounded-sm border border-[#C9A45C]/35 bg-[#F7F3EC]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E1A2B] text-[#F7F3EC] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-[0.12em] text-[10px]">
                <tr>
                  <th className="py-4 px-4">Project & Details</th>
                  <th className="py-4 px-4">Corridor</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Monthly Rent</th>
                  <th className="py-4 px-4">Gross Yield</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A45C]/15">
                {benchmarkListings.map((prop) => (
                  <tr
                    key={prop.id}
                    onClick={() => navigateToProperty(prop.id)}
                    className="hover:bg-[#0E1A2B]/4 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="font-serif font-bold text-[#0E1A2B] text-base group-hover:text-[#C9A45C] transition-colors">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans">
                        {prop.bhk} BHK · {prop.superBuiltUpSqft.toLocaleString('en-IN')} sq ft · {prop.tower} {prop.floor}th flr
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#0E1A2B] font-medium font-sans">
                      {prop.corridor}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#0E1A2B] tabular-nums font-serif text-sm">
                      {formatCurrencyValue(prop.price, currency)}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#0E1A2B] font-mono tabular-nums text-sm">
                      {formatRent(prop.monthlyRent, currency)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-[#2E8B6E] tabular-nums text-sm">
                        {formatYield(prop.grossYieldPct)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-semibold tracking-wider uppercase ${
                        prop.status === 'Verified (3+ yrs)'
                          ? 'bg-[#2E8B6E]/10 text-[#2E8B6E] border border-[#2E8B6E]/30'
                          : 'bg-[#0E1A2B]/8 text-[#0E1A2B] border border-[#0E1A2B]/20'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{prop.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToProperty(prop.id);
                        }}
                        className="text-xs font-semibold text-[#0E1A2B] group-hover:text-[#C9A45C] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-3 font-sans">
            <span>*Footnote: {GROSS_YIELD_FOOTNOTE}</span>
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo(0, 0);
              }}
              className="text-[#0E1A2B] font-semibold hover:text-[#C9A45C] underline underline-offset-4"
            >
              View all 12+ audited Bengaluru assets &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 6. WIN-WIN FOR BOTH SIDES */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
            Two-Sided Liquidity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
            A Genuine Win-Win For Investors & Landlords
          </h2>
          <p className="text-[#1A1F2B]/75 text-sm sm:text-base leading-relaxed">
            Eliminating broker downtime and aligning capital with income certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Side A: Investors */}
          <div className="bg-[#F7F3EC] p-8 sm:p-10 rounded-sm border border-[#2E8B6E]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase bg-[#2E8B6E]/12 text-[#2E8B6E] px-3 py-1 rounded-xs border border-[#2E8B6E]/30">
                For Investors
              </span>
              <span className="text-xs text-slate-500 font-mono">Day-1 Rental Wealth</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1A2B]">
              Immediate Income with Zero Blind Spots
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#1A1F2B]/85 font-sans">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                <span><strong>Rental income from Day 1:</strong> No waiting for construction possession, civil repairs, or painting.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                <span><strong>Zero initial setup cost:</strong> Pre-rented homes already feature interior cabinetry, appliances, and active tenant utilities.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                <span><strong>Audited multi-year rent ledger:</strong> Reconciled bank records establish bona fide rental demand.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B6E] shrink-0 mt-0.5" />
                <span><strong>100% Remote Closing:</strong> Biometric registered PoA and Sub-Registrar support for overseas NRIs.</span>
              </li>
            </ul>

            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo(0, 0);
              }}
              className="mt-4 w-full py-3.5 rounded-xs bg-[#0E1A2B] hover:bg-[#142338] text-[#C9A45C] font-semibold text-xs tracking-wide transition-colors border border-[#C9A45C]/35"
            >
              Browse Investor Opportunities
            </button>
          </div>

          {/* Side B: Landlords */}
          <div className="bg-[#F7F3EC] p-8 sm:p-10 rounded-sm border border-[#C9A45C]/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase bg-[#C9A45C]/15 text-[#C9A45C] px-3 py-1 rounded-xs border border-[#C9A45C]/30">
                For Landlords
              </span>
              <span className="text-xs text-slate-500 font-mono">Discreet Premium Exit</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1A2B]">
              Exit at a 10–15% Premium Without Vacating
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#1A1F2B]/85 font-sans">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span><strong>Faster exit at a premium:</strong> Serious capital pays a premium for tenanted certainty instead of discounting vacant units.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span><strong>Complimentary listing for owners:</strong> Zero upfront fee or broker commission to publish your asset.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span><strong>Algorithmic valuation reality check:</strong> Cash flow multiple calculated from prevailing corridor yields.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span><strong>Zero tenant eviction friction:</strong> Your tenant remains peacefully in place throughout conveyance.</span>
              </li>
            </ul>

            <button
              onClick={() => {
                setActiveTab('list-property');
                window.scrollTo(0, 0);
              }}
              className="mt-4 w-full py-3.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <span>List Your Tenanted Flat (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-20 bg-[#F7F3EC] border-t border-[#C9A45C]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
              Institutional Inquiries
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B]">
              Frequently Addressed Matters
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/30 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#0E1A2B] hover:text-[#C9A45C] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A45C] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#1A1F2B]/80 leading-relaxed border-t border-[#C9A45C]/15 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA: Midnight Navy */}
      <section className="bg-[#0E1A2B] text-[#F7F3EC] py-16 border-t border-[#C9A45C]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-[10px] font-semibold tracking-[0.2em] uppercase">
            Private Client Coverage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-[#F7F3EC]">
            Deploy Capital with Complete Tenancy Diligence
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed font-sans">
            Browse verified inventory, review unmasked tenant profiles, and simulate 10-year compounding equity returns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo(0, 0);
              }}
              className="px-7 py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs"
            >
              Explore Benchmark Listings
            </button>
            <button
              onClick={() => {
                setActiveTab('pricing');
                window.scrollTo(0, 0);
              }}
              className="px-7 py-3 rounded-xs bg-[#0E1A2B] hover:bg-[#142338] border border-[#C9A45C]/40 text-[#F7F3EC] font-medium text-xs sm:text-sm tracking-wide transition-colors"
            >
              Review Membership Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
