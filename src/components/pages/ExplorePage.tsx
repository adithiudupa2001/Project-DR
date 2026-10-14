import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { MOCK_PROPERTIES, CORRIDORS_LIST } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { formatCurrencyValue, formatRent, formatYield, GROSS_YIELD_FOOTNOTE } from '../../utils/formatters';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  RotateCcw,
  ShieldCheck,
  Award,
  ArrowUpDown,
  ArrowRight,
  Plus,
  Check,
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { navigateToProperty, currency } = useApp();
  const { isInCompare, toggleCompare } = useCompare();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState('All Corridors');
  const [maxBudgetCr, setMaxBudgetCr] = useState<number>(3.0);
  const [selectedBhk, setSelectedBhk] = useState<string>('all');
  const [minYield, setMinYield] = useState<number>(0);
  const [tenantType, setTenantType] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [minTenureYears, setMinTenureYears] = useState<number>(0);
  const [developerTier, setDeveloperTier] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<'yield' | 'price-asc' | 'price-desc' | 'score' | 'tenure'>('yield');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q);
        const matchDev = prop.developer.toLowerCase().includes(q);
        const matchCorridor = prop.corridor.toLowerCase().includes(q);
        const matchTenant = prop.tenant.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDev && !matchCorridor && !matchTenant) return false;
      }

      if (selectedCorridor !== 'All Corridors' && prop.corridor !== selectedCorridor) {
        return false;
      }

      const priceInCr = prop.price / 10000000;
      if (priceInCr > maxBudgetCr) return false;

      if (selectedBhk !== 'all' && prop.bhk.toString() !== selectedBhk) {
        return false;
      }

      if (minYield > 0 && prop.grossYieldPct < minYield) return false;

      if (tenantType !== 'all' && prop.tenant.familyType !== tenantType) {
        return false;
      }

      if (vegOnly && prop.tenant.foodPreference !== 'Vegetarian') {
        return false;
      }

      if (minTenureYears > 0) {
        const tenureYears = prop.tenant.tenureMonths / 12;
        if (tenureYears < minTenureYears) return false;
      }

      if (developerTier !== 'all' && prop.developerTier !== developerTier) {
        return false;
      }

      if (minScore > 0 && prop.score.overallScore < minScore) {
        return false;
      }

      if (verifiedOnly && prop.status !== 'Verified (3+ yrs)') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'yield') return b.grossYieldPct - a.grossYieldPct;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'score') return b.score.overallScore - a.score.overallScore;
      if (sortBy === 'tenure') return b.tenant.tenureMonths - a.tenant.tenureMonths;
      return 0;
    });
  }, [
    searchQuery,
    selectedCorridor,
    maxBudgetCr,
    selectedBhk,
    minYield,
    tenantType,
    vegOnly,
    minTenureYears,
    developerTier,
    minScore,
    verifiedOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCorridor('All Corridors');
    setMaxBudgetCr(3.0);
    setSelectedBhk('all');
    setMinYield(0);
    setTenantType('all');
    setVegOnly(false);
    setMinTenureYears(0);
    setDeveloperTier('all');
    setMinScore(0);
    setVerifiedOnly(false);
    setSortBy('yield');
  };

  const activeFiltersCount =
    (selectedCorridor !== 'All Corridors' ? 1 : 0) +
    (maxBudgetCr < 3.0 ? 1 : 0) +
    (selectedBhk !== 'all' ? 1 : 0) +
    (minYield > 0 ? 1 : 0) +
    (tenantType !== 'all' ? 1 : 0) +
    (vegOnly ? 1 : 0) +
    (minTenureYears > 0 ? 1 : 0) +
    (developerTier !== 'all' ? 1 : 0) +
    (minScore > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-10 sm:py-12 text-[#1A1F2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Title & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#C9A45C]/25">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C] mb-1">
              Curated Portfolio · Bengaluru
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
              Pre-Rented Residential Inventory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
              {filteredProperties.length} verified tenanted units backed by audited bank receipts and long-term covenants.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto font-sans">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#F7F3EC] px-3.5 py-1.5 rounded-xs border border-[#C9A45C]/35 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span className="text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-[#0E1A2B] focus:outline-none cursor-pointer"
              >
                <option value="yield">Highest Gross Yield</option>
                <option value="score">Highest Underwriting Score</option>
                <option value="tenure">Longest Audited Tenure</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Grid / Table View switch */}
            <div className="flex items-center bg-[#0E1A2B]/8 p-0.5 rounded-xs border border-[#C9A45C]/25">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xs text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-[#0E1A2B] text-[#C9A45C]' : 'text-slate-600 hover:text-[#0E1A2B]'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-xs text-xs font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-[#0E1A2B] text-[#C9A45C]' : 'text-slate-600 hover:text-[#0E1A2B]'
                }`}
                aria-label="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#0E1A2B] text-[#C9A45C] text-xs font-medium border border-[#C9A45C]/40"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Filters Bar */}
        <div className="my-6 flex flex-col md:flex-row items-stretch md:items-center gap-3 font-sans">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A45C]" />
            <input
              type="text"
              placeholder="Search by project name, developer, corridor (e.g. Prestige, Whitefield)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xs bg-[#F7F3EC] border border-[#C9A45C]/35 text-xs sm:text-sm text-[#0E1A2B] placeholder-slate-400 focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          <select
            value={selectedCorridor}
            onChange={(e) => setSelectedCorridor(e.target.value)}
            className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-xs px-3.5 py-2.5 text-xs text-[#0E1A2B] font-medium focus:outline-none focus:border-[#C9A45C] cursor-pointer"
          >
            {CORRIDORS_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* 3+ Yrs Verified Filter */}
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xs border text-xs font-semibold transition-all whitespace-nowrap ${
              verifiedOnly
                ? 'bg-[#2E8B6E] text-[#F7F3EC] border-[#2E8B6E]'
                : 'bg-[#F7F3EC] text-[#0E1A2B] border-[#C9A45C]/35 hover:border-[#C9A45C]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verified 3+ Yrs Only</span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 hover:text-[#B4483C] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFiltersDrawer ? 'block' : 'hidden'} lg:col-span-1 bg-[#F7F3EC] p-6 rounded-sm border border-[#C9A45C]/35 space-y-6 font-sans`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#C9A45C]/25">
              <span className="font-serif font-bold text-sm text-[#0E1A2B] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C9A45C]" />
                <span>Underwriting Criteria</span>
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B4483C] font-semibold hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter: Max Budget */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E1A2B] mb-1.5">
                <span>Maximum Capital</span>
                <span className="font-mono text-[#2E8B6E] tabular-nums font-bold">
                  ₹{maxBudgetCr.toFixed(2)} Cr
                </span>
              </div>
              <input
                type="range"
                min="0.9"
                max="3.0"
                step="0.05"
                value={maxBudgetCr}
                onChange={(e) => setMaxBudgetCr(parseFloat(e.target.value))}
                className="w-full accent-[#0E1A2B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>₹90 L</span>
                <span>₹3.0 Cr</span>
              </div>
            </div>

            {/* Filter: BHK */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Bedrooms (BHK)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['all', '2', '3', '4'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBhk(b)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-all ${
                      selectedBhk === b
                        ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                        : 'bg-transparent text-slate-600 border-[#C9A45C]/30 hover:border-[#C9A45C]'
                    }`}
                  >
                    {b === 'all' ? 'All' : `${b} BHK`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Min Gross Yield */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Minimum Gross Yield %
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {[0, 3.5, 3.8, 4.0].map((y) => (
                  <button
                    key={y}
                    onClick={() => setMinYield(y)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-all tabular-nums ${
                      minYield === y
                        ? 'bg-[#2E8B6E] text-[#F7F3EC] border-[#2E8B6E]'
                        : 'bg-transparent text-slate-600 border-[#C9A45C]/30 hover:border-[#C9A45C]'
                    }`}
                  >
                    {y === 0 ? 'Any' : `${y}%+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Audited Tenure */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Audited Tenure Length
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[0, 1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setMinTenureYears(t)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-all ${
                      minTenureYears === t
                        ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                        : 'bg-transparent text-slate-600 border-[#C9A45C]/30 hover:border-[#C9A45C]'
                    }`}
                  >
                    {t === 0 ? 'Any' : `${t}+ Yrs`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Household */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Household Composition
              </label>
              <select
                value={tenantType}
                onChange={(e) => setTenantType(e.target.value)}
                className="w-full bg-transparent border border-[#C9A45C]/35 rounded-xs px-3 py-2 text-xs text-[#0E1A2B] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="all">All Household Structures</option>
                <option value="Family">Corporate Family</option>
                <option value="Couple">Executive Couple</option>
                <option value="Single Professional">Single Professional</option>
              </select>
            </div>

            {/* Filter: Veg Only */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#0E1A2B]">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="rounded-xs text-[#0E1A2B] focus:ring-[#C9A45C] w-4 h-4 cursor-pointer accent-[#0E1A2B]"
                />
                <span className="font-medium">Strict Vegetarian Resident Only</span>
              </label>
            </div>

            {/* Filter: Min Score */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Min Underwriting Score
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {[0, 8.0, 8.3, 8.6].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMinScore(s)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-all tabular-nums ${
                      minScore === s
                        ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                        : 'bg-transparent text-slate-600 border-[#C9A45C]/30 hover:border-[#C9A45C]'
                    }`}
                  >
                    {s === 0 ? 'Any' : `${s}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Tier-1 Developer */}
            <div>
              <label className="block text-xs font-semibold text-[#0E1A2B] mb-2">
                Developer Grade
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setDeveloperTier('all')}
                  className={`py-1.5 text-xs font-semibold rounded-xs border transition-all ${
                    developerTier === 'all'
                      ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                      : 'bg-transparent text-slate-600 border-[#C9A45C]/30'
                  }`}
                >
                  All Developers
                </button>
                <button
                  onClick={() => setDeveloperTier('Tier-1')}
                  className={`py-1.5 text-xs font-semibold rounded-xs border transition-all ${
                    developerTier === 'Tier-1'
                      ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                      : 'bg-transparent text-slate-600 border-[#C9A45C]/30'
                  }`}
                >
                  Tier-1 Only
                </button>
              </div>
            </div>
          </aside>

          {/* Properties Area */}
          <main className="lg:col-span-3 space-y-6">
            {filteredProperties.length === 0 ? (
              <div className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-sm bg-[#0E1A2B] text-[#C9A45C] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0E1A2B]">
                  No pre-rented assets match this mandate
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                  Revise your capital slider, yield threshold, or selected corridor criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xs bg-[#0E1A2B] text-[#C9A45C] text-xs font-semibold tracking-wide"
                >
                  Reset Criteria
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              /* TABLE VIEW */
              <div className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#0E1A2B] text-[#F7F3EC] font-semibold border-b border-[#C9A45C]/30 uppercase tracking-[0.12em] text-[10px]">
                      <tr>
                        <th className="py-4 px-4">Project & Details</th>
                        <th className="py-4 px-4">Corridor</th>
                        <th className="py-4 px-4">Price</th>
                        <th className="py-4 px-4">Monthly Rent</th>
                        <th className="py-4 px-4">Gross Yield</th>
                        <th className="py-4 px-4">Tenant Category</th>
                        <th className="py-4 px-4">Score</th>
                        <th className="py-4 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A45C]/15">
                      {filteredProperties.map((prop) => (
                        <tr
                          key={prop.id}
                          onClick={() => navigateToProperty(prop.id)}
                          className="hover:bg-[#0E1A2B]/4 transition-colors cursor-pointer group"
                        >
                          <td className="py-4 px-4">
                            <div className="font-serif font-bold text-[#0E1A2B] text-base group-hover:text-[#C9A45C] transition-colors">
                              {prop.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {prop.bhk} BHK · {prop.superBuiltUpSqft.toLocaleString('en-IN')} sq ft · {prop.tower}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#0E1A2B] font-medium">
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
                          <td className="py-4 px-4 text-[#1A1F2B]">
                            <div className="font-medium">{prop.tenant.category}</div>
                            <span className="text-[10px] text-slate-500">
                              Since {prop.tenant.tenureStartFormatted.split('(')[0]}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 font-bold text-[#8C6D2F] font-mono">
                              <Award className="w-3.5 h-3.5" />
                              <span>{prop.score.overallScore.toFixed(1)}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCompare(prop.id);
                                }}
                                className={`px-2.5 py-1.5 rounded-xs border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                  isInCompare(prop.id)
                                    ? 'bg-[#C9A45C] text-[#0E1A2B] border-[#C9A45C]'
                                    : 'bg-transparent text-[#0E1A2B] border-[#C9A45C]/40 hover:border-[#8C6D2F]'
                                }`}
                              >
                                {isInCompare(prop.id) ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5 text-[#8C6D2F]" />
                                    <span>Compare</span>
                                  </>
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateToProperty(prop.id);
                                }}
                                className="px-3 py-1.5 rounded-xs bg-[#0E1A2B] text-[#C9A45C] font-semibold text-xs inline-flex items-center gap-1 transition-colors border border-[#C9A45C]/30 cursor-pointer"
                              >
                                <span>Dossier</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="p-4 rounded-xs bg-[#0E1A2B]/4 border border-[#C9A45C]/25 text-[11px] text-slate-500 flex items-center justify-between font-sans">
              <span>*Gross Yield methodology: {GROSS_YIELD_FOOTNOTE}</span>
              <span className="font-semibold text-[#0E1A2B]">Rentier Private Client Desk</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
