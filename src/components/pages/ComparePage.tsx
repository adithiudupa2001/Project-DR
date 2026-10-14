import React, { useState, useMemo } from 'react';
import { useCompare } from '../../context/CompareContext';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { formatCurrencyValue, formatRent, formatYield, GROSS_YIELD_FOOTNOTE } from '../../utils/formatters';
import {
  Scale,
  X,
  Plus,
  ArrowRight,
  Award,
  Check,
  ShieldCheck,
  CheckCircle2,
  Lock,
  SlidersHorizontal,
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { setActiveTab, currency, tier, openUpgradeModal, navigateToProperty } = useApp();

  const [showOnlyDiffs, setShowOnlyDiffs] = useState<boolean>(false);

  // Get active compared properties
  const properties = useMemo(() => {
    return compareIds
      .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
      .filter((p): p is (typeof MOCK_PROPERTIES)[0] => Boolean(p));
  }, [compareIds]);

  // Compute best values for numeric rows
  const bestMetrics = useMemo(() => {
    if (properties.length === 0) return {};
    const maxGrossYield = Math.max(...properties.map((p) => p.grossYieldPct));
    const maxNetYield = Math.max(...properties.map((p) => p.netYieldPct));
    const minPricePerSqft = Math.min(...properties.map((p) => Math.round(p.price / p.superBuiltUpSqft)));
    const maxMonthlyRent = Math.max(...properties.map((p) => p.monthlyRent));
    const maxCashFlow = Math.max(...properties.map((p) => p.netMonthlyCashFlow));
    const maxScore = Math.max(...properties.map((p) => p.score.overallScore));
    const maxTenure = Math.max(...properties.map((p) => p.tenant.tenureMonths));
    const minAge = Math.min(...properties.map((p) => p.buildingAgeYears));

    return {
      maxGrossYield,
      maxNetYield,
      minPricePerSqft,
      maxMonthlyRent,
      maxCashFlow,
      maxScore,
      maxTenure,
      minAge,
    };
  }, [properties]);

  // 3-Year Rent CAGR calculation helper
  const getRentCagr = (p: (typeof MOCK_PROPERTIES)[0]) => {
    const history = p.rentalHistory;
    if (!history || history.length < 2) return '4.8%';
    const initial = history[0].monthlyRent;
    const latest = history[history.length - 1].monthlyRent;
    const years = history.length - 1;
    if (initial <= 0 || years <= 0) return '4.8%';
    const cagr = (Math.pow(latest / initial, 1 / years) - 1) * 100;
    return `${cagr.toFixed(1)}%`;
  };

  // Helper to check if a row has differences across all compared properties
  const valuesDiffer = (extractor: (p: (typeof MOCK_PROPERTIES)[0]) => string | number | boolean) => {
    if (properties.length <= 1) return true;
    const firstVal = extractor(properties[0]);
    return properties.some((p) => extractor(p) !== firstVal);
  };

  const isFreePlan = tier === 'free';

  // Empty state when fewer than 2 properties are selected
  if (properties.length < 2) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] py-12 sm:py-16 text-[#1A1F2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#0E1A2B] border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mx-auto shadow-md">
            <Scale className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans">
              Multi-Asset Underwriting Desk
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B]">
              Side-by-Side Asset Comparison
            </h1>
            <p className="text-[13px] sm:text-sm text-[#4A5160] max-w-lg mx-auto font-sans">
              Select at least 2 pre-rented properties to benchmark cash flows, tenant stability, due diligence checklists, and investment ratings.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#0E1A2B] hover:bg-[#15253C] text-[#C9A45C] font-semibold text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer font-sans"
            >
              <span>Browse Pre-Rented Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick-Add Suggestions from Benchmark Listings */}
          <div className="mt-10 pt-8 border-t border-[#C9A45C]/25 text-left font-sans">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C6D2F] mb-4 text-center">
              Or quick-add benchmark properties to test comparison:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOCK_PROPERTIES.slice(0, 3).map((bench) => {
                const added = compareIds.includes(bench.id);
                return (
                  <div
                    key={bench.id}
                    className="p-4 rounded-sm bg-[#F7F3EC] border border-[#C9A45C]/35 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#8C6D2F] font-semibold">
                        <span>{bench.corridor}</span>
                        <span className="font-mono text-[#2E8B6E] font-bold">{bench.grossYieldPct}% Yield</span>
                      </div>
                      <h4 className="font-serif font-bold text-[#0E1A2B] text-base mt-1">
                        {bench.title}
                      </h4>
                      <div className="text-xs text-[#4A5160] font-mono mt-0.5">
                        {formatCurrencyValue(bench.price, currency)} · {formatRent(bench.monthlyRent, currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCompare(bench.id)}
                      className={`w-full py-2 rounded-xs text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        added
                          ? 'bg-[#C9A45C] text-[#0E1A2B]'
                          : 'bg-[#0E1A2B] hover:bg-[#15253C] text-[#F7F3EC]'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#C9A45C]" />
                          <span>Add to Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-8 sm:py-12 text-[#1A1F2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#C9A45C]/25">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans mb-1">
              Multi-Asset Underwriting
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
              Side-by-Side Asset Comparison
            </h1>
            <p className="text-[13px] text-[#4A5160] mt-1 font-sans">
              Comparing {properties.length} of 4 tenanted properties. Green highlights denote best-in-class metrics.
            </p>
          </div>

          {/* Controls: Show Differences Toggle & Clear All */}
          <div className="flex items-center gap-3 font-sans">
            <button
              onClick={() => setShowOnlyDiffs(!showOnlyDiffs)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                showOnlyDiffs
                  ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                  : 'bg-transparent text-[#0E1A2B] border-[#C9A45C]/40 hover:border-[#8C6D2F]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Show Only Differences</span>
            </button>

            <button
              onClick={clearCompare}
              className="text-xs font-semibold text-[#B4483C] hover:underline cursor-pointer px-2 py-1"
            >
              Clear All ({properties.length})
            </button>
          </div>
        </div>

        {/* COMPARISON MATRIX CONTAINER WITH HORIZONTAL SCROLL & STICKY ROW LABELS */}
        <div className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-sm overflow-hidden shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              
              {/* PROPERTY HEADERS (STICKY TOP) */}
              <thead>
                <tr className="border-b border-[#C9A45C]/30 bg-[#0E1A2B] text-[#F7F3EC]">
                  <th className="p-4 sm:p-5 w-56 sticky left-0 z-30 bg-[#0E1A2B] text-xs font-semibold uppercase tracking-wider text-[#C9A45C] border-r border-[#C9A45C]/30">
                    Property Specimen
                  </th>

                  {properties.map((p) => (
                    <th key={p.id} className="p-4 sm:p-5 min-w-[220px] max-w-[280px] align-top font-sans font-normal border-r border-slate-800 last:border-r-0">
                      <div className="relative space-y-2.5">
                        <div className="relative aspect-16/10 rounded-xs overflow-hidden border border-[#C9A45C]/30 bg-slate-900">
                          <img
                            src={p.primaryImage}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1 rounded-xs bg-[#0E1A2B]/85 hover:bg-[#B4483C] text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title={`Remove ${p.title}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C9A45C] block">
                            {p.corridor}
                          </span>
                          <h3
                            onClick={() => navigateToProperty(p.id)}
                            className="font-serif font-bold text-base sm:text-lg text-[#F7F3EC] hover:text-[#C9A45C] transition-colors cursor-pointer truncate"
                          >
                            {p.title}
                          </h3>
                          <div className="text-xs text-slate-300 font-mono mt-0.5">
                            {formatCurrencyValue(p.price, currency)}
                          </div>
                        </div>

                        <button
                          onClick={() => navigateToProperty(p.id)}
                          className="w-full py-1.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] text-xs font-bold transition-all cursor-pointer"
                        >
                          View Dossier
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#C9A45C]/15 font-sans text-xs">
                
                {/* SECTION 1: PRICE & RETURNS */}
                <tr className="bg-[#0E1A2B]/6 border-t border-b border-[#C9A45C]/25">
                  <td
                    colSpan={properties.length + 1}
                    className="py-2.5 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] text-[#8C6D2F]"
                  >
                    1. Price & Rental Returns
                  </td>
                </tr>

                {(!showOnlyDiffs || valuesDiffer((p) => p.price)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Acquisition Price
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 font-mono text-[#0E1A2B] font-bold text-sm border-r border-[#C9A45C]/15 last:border-r-0">
                        {formatCurrencyValue(p.price, currency)}
                      </td>
                    ))}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.monthlyRent)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Contractual Monthly Rent
                    </td>
                    {properties.map((p) => {
                      const isBest = p.monthlyRent === bestMetrics.maxMonthlyRent;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 font-mono font-bold text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/8' : ''
                          }`}
                        >
                          <span>{formatRent(p.monthlyRent, currency)}</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.grossYieldPct)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Gross Rental Yield
                    </td>
                    {properties.map((p) => {
                      const isBest = p.grossYieldPct === bestMetrics.maxGrossYield;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 font-mono font-bold text-sm text-[#2E8B6E] border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/12' : ''
                          }`}
                        >
                          <span>{p.grossYieldPct}%</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.netYieldPct)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Net In-Pocket Yield
                    </td>
                    {properties.map((p) => {
                      const isBest = p.netYieldPct === bestMetrics.maxNetYield;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 font-mono font-bold text-[#8C6D2F] border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/8' : ''
                          }`}
                        >
                          <span>{p.netYieldPct}%</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.netMonthlyCashFlow)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Net Monthly Cash Flow
                    </td>
                    {properties.map((p) => {
                      const isBest = p.netMonthlyCashFlow === bestMetrics.maxCashFlow;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 font-mono font-bold text-[#2E8B6E] border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/8' : ''
                          }`}
                        >
                          <span>+{formatRent(p.netMonthlyCashFlow, currency)}</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => getRentCagr(p))) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      3-Year Rent CAGR
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 font-mono text-[#0E1A2B] font-semibold border-r border-[#C9A45C]/15 last:border-r-0">
                        {getRentCagr(p)}
                      </td>
                    ))}
                  </tr>
                )}

                {/* SECTION 2: TENANT PROFILE & CONTINUITY */}
                <tr className="bg-[#0E1A2B]/6 border-t border-b border-[#C9A45C]/25">
                  <td
                    colSpan={properties.length + 1}
                    className="py-2.5 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] text-[#8C6D2F]"
                  >
                    2. Tenant Profile & Continuity
                  </td>
                </tr>

                {/* Gated rows for Free Tier */}
                {isFreePlan ? (
                  <tr>
                    <td colSpan={properties.length + 1} className="p-6 bg-[#0E1A2B]/3 text-center">
                      <div className="max-w-md mx-auto space-y-2">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#8C6D2F] uppercase tracking-wider">
                          <Lock className="w-4 h-4 text-[#8C6D2F]" />
                          <span>Tenant Profile Gated in Free Tier</span>
                        </div>
                        <p className="text-xs text-[#4A5160]">
                          Unmask continuous residency records, profession categories, and lock-in covenants across all compared properties.
                        </p>
                        <button
                          onClick={() => openUpgradeModal('Unlock comparative tenant intelligence')}
                          className="px-4 py-2 rounded-xs bg-[#0E1A2B] text-[#C9A45C] font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Unlock Tenant Intelligence
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {(!showOnlyDiffs || valuesDiffer((p) => p.tenant.category)) && (
                      <tr className="hover:bg-[#0E1A2B]/2">
                        <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                          Profession Category
                        </td>
                        {properties.map((p) => (
                          <td key={p.id} className="py-3 px-4 sm:px-5 font-medium text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                            <div>{p.tenant.category}</div>
                            <div className="text-[11px] text-[#4A5160]">{p.tenant.companySector}</div>
                          </td>
                        ))}
                      </tr>
                    )}

                    {(!showOnlyDiffs || valuesDiffer((p) => p.tenant.tenureMonths)) && (
                      <tr className="hover:bg-[#0E1A2B]/2">
                        <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                          Continuous Tenure
                        </td>
                        {properties.map((p) => {
                          const isBest = p.tenant.tenureMonths === bestMetrics.maxTenure;
                          return (
                            <td
                              key={p.id}
                              className={`py-3 px-4 sm:px-5 font-medium border-r border-[#C9A45C]/15 last:border-r-0 ${
                                isBest ? 'bg-[#2E8B6E]/8' : ''
                              }`}
                            >
                              <span className="font-semibold text-[#0E1A2B]">{p.tenant.tenureMonths} Months</span>
                              <span className="text-[11px] text-[#4A5160] block font-mono">
                                Since {p.tenant.tenureStartFormatted.split('(')[0]}
                              </span>
                              {isBest && (
                                <span className="inline-block mt-1 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                                  Longest
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )}

                    {(!showOnlyDiffs || valuesDiffer((p) => p.tenant.leaseExpiryDate)) && (
                      <tr className="hover:bg-[#0E1A2B]/2">
                        <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                          Lease Expiry Date
                        </td>
                        {properties.map((p) => (
                          <td key={p.id} className="py-3 px-4 sm:px-5 font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                            {p.tenant.leaseExpiryDate} ({p.tenant.remainingMonths} mo)
                          </td>
                        ))}
                      </tr>
                    )}

                    {(!showOnlyDiffs || valuesDiffer((p) => p.tenant.lockInPeriodMonths)) && (
                      <tr className="hover:bg-[#0E1A2B]/2">
                        <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                          Lock-in Covenant
                        </td>
                        {properties.map((p) => (
                          <td key={p.id} className="py-3 px-4 sm:px-5 text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                            {p.tenant.lockInPeriodMonths} Months Binding
                          </td>
                        ))}
                      </tr>
                    )}

                    {(!showOnlyDiffs || valuesDiffer((p) => p.tenant.securityDeposit)) && (
                      <tr className="hover:bg-[#0E1A2B]/2">
                        <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                          Escrow Security Deposit
                        </td>
                        {properties.map((p) => (
                          <td key={p.id} className="py-3 px-4 sm:px-5 font-mono text-[#0E1A2B] font-semibold border-r border-[#C9A45C]/15 last:border-r-0">
                            {formatCurrencyValue(p.tenant.securityDeposit, currency)}
                          </td>
                        ))}
                      </tr>
                    )}
                  </>
                )}

                {/* SECTION 3: PROPERTY & DEVELOPMENT */}
                <tr className="bg-[#0E1A2B]/6 border-t border-b border-[#C9A45C]/25">
                  <td
                    colSpan={properties.length + 1}
                    className="py-2.5 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] text-[#8C6D2F]"
                  >
                    3. Property & Development Specifications
                  </td>
                </tr>

                {(!showOnlyDiffs || valuesDiffer((p) => p.bhk)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      BHK Configuration
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 font-bold text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                        {p.bhk} BHK
                      </td>
                    ))}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.superBuiltUpSqft)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Super Built-Up Area
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 font-mono text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                        {p.superBuiltUpSqft.toLocaleString('en-IN')} sq ft
                      </td>
                    ))}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => Math.round(p.price / p.superBuiltUpSqft))) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Price per Sq Ft
                    </td>
                    {properties.map((p) => {
                      const rate = Math.round(p.price / p.superBuiltUpSqft);
                      const isBest = rate === bestMetrics.minPricePerSqft;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 font-mono font-bold border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/8 text-[#2E8B6E]' : 'text-[#0E1A2B]'
                          }`}
                        >
                          <span>₹{rate.toLocaleString('en-IN')}/sq ft</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.floor)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Floor Elevation
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                        {p.tower}, Floor {p.floor} of {p.totalFloors}
                      </td>
                    ))}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.buildingAgeYears)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Building Age
                    </td>
                    {properties.map((p) => {
                      const isBest = p.buildingAgeYears === bestMetrics.minAge;
                      return (
                        <td
                          key={p.id}
                          className={`py-3 px-4 sm:px-5 text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/8 font-bold' : ''
                          }`}
                        >
                          <span>{p.buildingAgeYears} Years</span>
                          {isBest && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                              Newest
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.developer)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Developer Pedigree
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 text-[#0E1A2B] font-semibold border-r border-[#C9A45C]/15 last:border-r-0">
                        {p.developer} ({p.developerTier})
                      </td>
                    ))}
                  </tr>
                )}

                {(!showOnlyDiffs || valuesDiffer((p) => p.furnishing)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Furnishing Status
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="py-3 px-4 sm:px-5 text-[#0E1A2B] border-r border-[#C9A45C]/15 last:border-r-0">
                        {p.furnishing}
                      </td>
                    ))}
                  </tr>
                )}

                {/* SECTION 4: DUE DILIGENCE AUDIT CHECKLIST */}
                <tr className="bg-[#0E1A2B]/6 border-t border-b border-[#C9A45C]/25">
                  <td
                    colSpan={properties.length + 1}
                    className="py-2.5 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] text-[#8C6D2F]"
                  >
                    4. 5-Tier Due Diligence Audit
                  </td>
                </tr>

                {isFreePlan ? (
                  <tr>
                    <td colSpan={properties.length + 1} className="p-6 bg-[#0E1A2B]/3 text-center">
                      <div className="max-w-md mx-auto space-y-2">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#8C6D2F] uppercase tracking-wider">
                          <Lock className="w-4 h-4 text-[#8C6D2F]" />
                          <span>Forensic Audit Checklist Gated</span>
                        </div>
                        <p className="text-xs text-[#4A5160]">
                          Sub-Registrar deeds, Khata certifications, and RERA compliance verification are available to Investor & Pro members.
                        </p>
                        <button
                          onClick={() => openUpgradeModal('Unlock comparative due diligence audit')}
                          className="px-4 py-2 rounded-xs bg-[#0E1A2B] text-[#C9A45C] font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Unlock Diligence Matrix
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="hover:bg-[#0E1A2B]/2">
                      <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                        Rental Agreement Verified
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="py-3 px-4 sm:px-5 border-r border-[#C9A45C]/15 last:border-r-0">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#2E8B6E]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ Verified</span>
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-[#0E1A2B]/2">
                      <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                        Maintenance Dues Cleared
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="py-3 px-4 sm:px-5 border-r border-[#C9A45C]/15 last:border-r-0">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#2E8B6E]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ Zero Arrears</span>
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-[#0E1A2B]/2">
                      <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                        Zero Legal Encumbrances
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="py-3 px-4 sm:px-5 border-r border-[#C9A45C]/15 last:border-r-0">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#2E8B6E]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ 30-Yr Clear</span>
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-[#0E1A2B]/2">
                      <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                        Tenant Continuity Confirmed
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="py-3 px-4 sm:px-5 border-r border-[#C9A45C]/15 last:border-r-0">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#2E8B6E]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ Confirmed</span>
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-[#0E1A2B]/2">
                      <td className="py-3 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                        RERA & OC / CC Status
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="py-3 px-4 sm:px-5 text-[#2E8B6E] font-semibold border-r border-[#C9A45C]/15 last:border-r-0">
                          ✓ RERA & OC Ready
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* SECTION 5: INVESTMENT SCORE */}
                <tr className="bg-[#0E1A2B]/6 border-t border-b border-[#C9A45C]/25">
                  <td
                    colSpan={properties.length + 1}
                    className="py-2.5 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] text-[#8C6D2F]"
                  >
                    5. Composite Investment Rating
                  </td>
                </tr>

                {(!showOnlyDiffs || valuesDiffer((p) => p.score.overallScore)) && (
                  <tr className="hover:bg-[#0E1A2B]/2">
                    <td className="py-3.5 px-4 sm:px-5 sticky left-0 z-20 bg-[#F7F3EC] font-semibold text-[#0E1A2B] border-r border-[#C9A45C]/25">
                      Composite Score (out of 10)
                    </td>
                    {properties.map((p) => {
                      const isBest = p.score.overallScore === bestMetrics.maxScore;
                      return (
                        <td
                          key={p.id}
                          className={`py-3.5 px-4 sm:px-5 font-mono font-bold text-base border-r border-[#C9A45C]/15 last:border-r-0 ${
                            isBest ? 'bg-[#2E8B6E]/12 text-[#2E8B6E]' : 'text-[#0E1A2B]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#8C6D2F]" />
                            <span>{p.score.overallScore.toFixed(1)}/10</span>
                            {isBest && (
                              <span className="px-1.5 py-0.5 rounded-xs bg-[#2E8B6E] text-white text-[9px] font-bold uppercase">
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* Footnote on Gross Yield */}
        <div className="text-xs text-[#4A5160] font-sans italic pt-2">
          * {GROSS_YIELD_FOOTNOTE}
        </div>

      </div>
    </div>
  );
};
