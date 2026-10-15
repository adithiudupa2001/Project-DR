import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES, CORRIDORS_LIST } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { formatRent, formatPriceINR } from '../../utils/formatters';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { navigateToProperty } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Visible filters: Locality, Budget, BHK, Min yield
  const [locality, setLocality] = useState<string>('all');
  const [maxBudgetCr, setMaxBudgetCr] = useState<number>(0); // 0 = any
  const [bhk, setBhk] = useState<string>('all');
  const [minYield, setMinYield] = useState<number>(0);

  // More filters
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Sort: Highest yield (default), Lowest price, Longest tenancy
  const [sortOrder, setSortOrder] = useState<'yield' | 'price' | 'tenancy'>('yield');

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      if (locality !== 'all' && prop.corridor !== locality) return false;

      if (maxBudgetCr > 0) {
        const propCr = prop.price / 10000000;
        if (propCr > maxBudgetCr) return false;
      }

      if (bhk !== 'all' && prop.bhk.toString() !== bhk) return false;

      if (minYield > 0 && prop.grossYieldPct < minYield) return false;

      if (vegOnly && prop.tenant.foodPreference !== 'Vegetarian') return false;

      if (verifiedOnly && prop.status !== 'Verified (3+ yrs)') return false;

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'yield') return b.grossYieldPct - a.grossYieldPct;
      if (sortOrder === 'price') return a.price - b.price;
      if (sortOrder === 'tenancy') return b.tenant.tenureMonths - a.tenant.tenureMonths;
      return 0;
    });
  }, [locality, maxBudgetCr, bhk, minYield, vegOnly, verifiedOnly, sortOrder]);

  const hasExtraFilters = vegOnly || verifiedOnly;

  return (
    <div className="bg-[#FAFAF8] text-[#0E1A2B] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#0E1A2B]">
              Properties
            </h1>
            <p className="text-[14px] text-[#6B7280] mt-1">
              {filteredProperties.length} homes available
            </p>
          </div>

          {/* Controls: Sort & View Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#6B7280]">Sort</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                aria-label="Sort properties"
                className="bg-white border border-[#ECECE8] rounded-lg px-3 py-1.5 text-sm text-[#0E1A2B] focus:outline-none cursor-pointer"
              >
                <option value="yield">Highest yield</option>
                <option value="price">Lowest price</option>
                <option value="tenancy">Longest tenancy</option>
              </select>
            </div>

            <div className="flex items-center bg-white border border-[#ECECE8] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#0E1A2B] text-white'
                    : 'text-[#6B7280] hover:text-[#0E1A2B]'
                }`}
                title="Card view"
                aria-label="Card view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#0E1A2B] text-white'
                    : 'text-[#6B7280] hover:text-[#0E1A2B]'
                }`}
                title="Table view"
                aria-label="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar: Locality, Budget, BHK, Min yield + More */}
        <div className="bg-white rounded-[12px] border border-[#ECECE8] p-4 flex flex-wrap items-center gap-3">
          {/* Locality */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs text-[#6B7280] mb-1">Locality</label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              aria-label="Filter by locality"
              className="w-full bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-3 py-1.5 text-sm text-[#0E1A2B] focus:outline-none cursor-pointer"
            >
              <option value="all">All localities</option>
              {CORRIDORS_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="w-36">
            <label className="block text-xs text-[#6B7280] mb-1">Budget</label>
            <select
              value={maxBudgetCr}
              onChange={(e) => setMaxBudgetCr(Number(e.target.value))}
              aria-label="Filter by budget"
              className="w-full bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-3 py-1.5 text-sm text-[#0E1A2B] focus:outline-none cursor-pointer"
            >
              <option value={0}>Any budget</option>
              <option value={1.2}>Under ₹1.2 Cr</option>
              <option value={1.5}>Under ₹1.5 Cr</option>
              <option value={2.0}>Under ₹2.0 Cr</option>
              <option value={2.5}>Under ₹2.5 Cr</option>
            </select>
          </div>

          {/* BHK */}
          <div className="w-28">
            <label className="block text-xs text-[#6B7280] mb-1">BHK</label>
            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              aria-label="Filter by BHK"
              className="w-full bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-3 py-1.5 text-sm text-[#0E1A2B] focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
            </select>
          </div>

          {/* Min yield */}
          <div className="w-32">
            <label className="block text-xs text-[#6B7280] mb-1">Min yield</label>
            <select
              value={minYield}
              onChange={(e) => setMinYield(Number(e.target.value))}
              aria-label="Filter by minimum yield"
              className="w-full bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-3 py-1.5 text-sm text-[#0E1A2B] focus:outline-none cursor-pointer"
            >
              <option value={0}>Any yield</option>
              <option value={3.5}>3.5%+</option>
              <option value={3.8}>3.8%+</option>
              <option value={4.0}>4.0%+</option>
            </select>
          </div>

          {/* More filters */}
          <div className="self-end">
            <button
              onClick={() => setShowMoreFilters(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                hasExtraFilters
                  ? 'border-[#0E1A2B] text-[#0E1A2B] bg-[#ECECE8]'
                  : 'border-[#ECECE8] text-[#6B7280] hover:text-[#0E1A2B]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>More</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-12 text-center space-y-3">
            <p className="text-[15px] font-medium text-[#0E1A2B]">No properties found</p>
            <p className="text-[13px] text-[#6B7280]">Try adjusting your filters</p>
            <button
              onClick={() => {
                setLocality('all');
                setMaxBudgetCr(0);
                setBhk('all');
                setMinYield(0);
                setVegOnly(false);
                setVerifiedOnly(false);
              }}
              className="text-sm font-medium text-[#0E1A2B] underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Table View: Project, Price, Rent, Yield, Tenant since */
          <div className="bg-white rounded-[12px] border border-[#ECECE8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#ECECE8] bg-[#FAFAF8] text-[#6B7280] text-xs">
                    <th className="py-3 px-4 font-normal">Project</th>
                    <th className="py-3 px-4 font-normal">Price</th>
                    <th className="py-3 px-4 font-normal">Rent</th>
                    <th className="py-3 px-4 font-normal">Yield</th>
                    <th className="py-3 px-4 font-normal">Tenant since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECE8]">
                  {filteredProperties.map((prop) => {
                    const tenantSince =
                      prop.tenant.tenureStartFormatted.match(/\b(20\d\d)\b/)?.[1] ||
                      String(2026 - Math.max(1, Math.round(prop.tenant.tenureMonths / 12)));

                    return (
                      <tr
                        key={prop.id}
                        onClick={() => navigateToProperty(prop.id)}
                        className="hover:bg-[#FAFAF8] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-serif font-semibold text-base text-[#0E1A2B]">
                            {prop.title}
                          </div>
                          <div className="text-xs text-[#6B7280]">
                            {prop.corridor} · {prop.bhk} BHK
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                          {prop.priceInCrFormatted || formatPriceINR(prop.price)}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                          {formatRent(prop.monthlyRent)}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap">
                          {prop.grossYieldPct}%
                        </td>
                        <td className="py-3.5 px-4 text-[#6B7280] tabular-nums whitespace-nowrap">
                          {tenantSince}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* More Filters Modal */}
      {showMoreFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0E1A2B]">More filters</h3>
              <button
                onClick={() => setShowMoreFilters(false)}
                className="text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#0E1A2B]">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0E1A2B] border-[#ECECE8] focus:ring-0 cursor-pointer"
                />
                <span>Vegetarian tenant only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#0E1A2B]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0E1A2B] border-[#ECECE8] focus:ring-0 cursor-pointer"
                />
                <span>Verified 3+ years only</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#ECECE8]">
              <button
                onClick={() => {
                  setVegOnly(false);
                  setVerifiedOnly(false);
                }}
                className="text-xs text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
              >
                Reset
              </button>

              <button
                onClick={() => setShowMoreFilters(false)}
                className="bg-[#0E1A2B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
