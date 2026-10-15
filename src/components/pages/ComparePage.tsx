import React, { useState, useMemo } from 'react';
import { useCompare } from '../../context/CompareContext';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { formatRent, formatPriceINR } from '../../utils/formatters';
import { X, Check } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareIds, removeFromCompare } = useCompare();
  const { setActiveTab, tier, openUpgradeModal, navigateToProperty } = useApp();

  const isMember = tier !== 'free';

  const properties = useMemo(() => {
    return compareIds
      .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
      .filter((p): p is (typeof MOCK_PROPERTIES)[0] => Boolean(p));
  }, [compareIds]);

  // Compute best values for numeric rows
  const bests = useMemo(() => {
    if (properties.length === 0) return {};
    const minPrice = Math.min(...properties.map((p) => p.price));
    const maxRent = Math.max(...properties.map((p) => p.monthlyRent));
    const maxGrossYield = Math.max(...properties.map((p) => p.grossYieldPct));
    const maxNetYield = Math.max(...properties.map((p) => p.netYieldPct));
    const maxSize = Math.max(...properties.map((p) => p.superBuiltUpSqft));

    // Rent growth: compute (latest - first) / first
    const growths = properties.map((p) => {
      const init = p.rentalHistory[0]?.monthlyRent || 1;
      const curr = p.rentalHistory[p.rentalHistory.length - 1]?.monthlyRent || 1;
      return ((curr - init) / init) * 100;
    });
    const maxGrowth = Math.max(...growths);

    const maxTenure = Math.max(...properties.map((p) => p.tenant.tenureMonths));

    return {
      minPrice,
      maxRent,
      maxGrossYield,
      maxNetYield,
      maxSize,
      maxGrowth,
      maxTenure,
    };
  }, [properties]);

  // If fewer than 2 properties, show empty state
  if (properties.length < 2) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#0E1A2B] py-20 px-6">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#0E1A2B]">
            Compare properties
          </h1>
          <p className="text-[14px] text-[#6B7280]">
            Select at least 2 properties to compare them side by side.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#0E1A2B] text-white px-5 py-2.5 rounded-[12px] font-medium text-sm hover:bg-[#142338] transition-colors cursor-pointer"
            >
              Browse properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0E1A2B] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#0E1A2B]">
            Compare properties
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Comparing {properties.length} homes
          </p>
        </div>

        {/* Comparison Table with Horizontal Scroll */}
        <div className="bg-white rounded-[12px] border border-[#ECECE8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECECE8]">
                  <th className="sticky left-0 bg-white z-20 w-44 min-w-[176px] p-4 text-[13px] font-medium text-[#6B7280]">
                    Property
                  </th>
                  {properties.map((prop) => (
                    <th
                      key={prop.id}
                      className="p-4 min-w-[220px] align-top bg-white border-l border-[#ECECE8]"
                    >
                      <div className="relative space-y-2">
                        <button
                          onClick={() => removeFromCompare(prop.id)}
                          aria-label={`Remove ${prop.title}`}
                          className="absolute -top-1 -right-1 text-[#6B7280] hover:text-[#0E1A2B] p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div
                          onClick={() => navigateToProperty(prop.id)}
                          className="cursor-pointer group"
                        >
                          <img
                            src={prop.primaryImage}
                            alt={prop.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-28 object-cover rounded-lg bg-[#ECECE8]"
                          />
                          <h3 className="font-serif font-semibold text-base text-[#0E1A2B] mt-2 group-hover:text-[#B08D4C] transition-colors truncate">
                            {prop.title}
                          </h3>
                          <p className="text-xs text-[#6B7280] truncate">
                            {prop.corridor}
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#ECECE8] text-sm">
                {/* 1. Price */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Price
                  </td>
                  {properties.map((prop) => {
                    const isBest = prop.price === bests.minPrice;
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums font-semibold ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E]' : 'text-[#0E1A2B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{prop.priceInCrFormatted || formatPriceINR(prop.price)}</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Rent */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Rent
                  </td>
                  {properties.map((prop) => {
                    const isBest = prop.monthlyRent === bests.maxRent;
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums font-semibold ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E]' : 'text-[#0E1A2B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{formatRent(prop.monthlyRent)}</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Gross yield */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Gross yield
                  </td>
                  {properties.map((prop) => {
                    const isBest = prop.grossYieldPct === bests.maxGrossYield;
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums font-semibold ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E]' : 'text-[#2E8B6E]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{prop.grossYieldPct}%</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Net yield */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Net yield
                  </td>
                  {properties.map((prop) => {
                    const isBest = prop.netYieldPct === bests.maxNetYield;
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums font-semibold ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E]' : 'text-[#2E8B6E]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{prop.netYieldPct}%</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 5. Rent growth */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Rent growth
                  </td>
                  {properties.map((prop) => {
                    const init = prop.rentalHistory[0]?.monthlyRent || 1;
                    const curr = prop.rentalHistory[prop.rentalHistory.length - 1]?.monthlyRent || 1;
                    const growth = Math.round(((curr - init) / init) * 100);
                    const isBest = growth === Math.round(bests.maxGrowth ?? 0);
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums font-medium ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E]' : 'text-[#0E1A2B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>+{growth}%</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 6. BHK */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    BHK
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-4 border-l border-[#ECECE8] text-[#0E1A2B]">
                      {prop.bhk} BHK
                    </td>
                  ))}
                </tr>

                {/* 7. Size */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Size
                  </td>
                  {properties.map((prop) => {
                    const isBest = prop.superBuiltUpSqft === bests.maxSize;
                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums ${
                          isBest ? 'bg-[#2E8B6E]/5 text-[#2E8B6E] font-medium' : 'text-[#0E1A2B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{prop.superBuiltUpSqft.toLocaleString()} sq ft</span>
                          {isBest && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Gated Rows for Free Tier: Tenant since, Lease ends, Checks */}
                {/* 8. Tenant since */}
                <tr className="relative">
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Tenant since
                  </td>
                  {properties.map((prop) => {
                    const yr =
                      prop.tenant.tenureStartFormatted.match(/\b(20\d\d)\b/)?.[1] ||
                      String(2026 - Math.max(1, Math.round(prop.tenant.tenureMonths / 12)));
                    const isBest = prop.tenant.tenureMonths === bests.maxTenure;

                    return (
                      <td
                        key={prop.id}
                        className={`p-4 border-l border-[#ECECE8] tabular-nums ${
                          !isMember ? 'filter blur-sm select-none opacity-40' : ''
                        } ${isBest && isMember ? 'bg-[#2E8B6E]/5 text-[#2E8B6E] font-medium' : 'text-[#0E1A2B]'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{yr}</span>
                          {isBest && isMember && (
                            <span className="text-[10px] bg-[#2E8B6E]/15 text-[#2E8B6E] font-medium px-1.5 py-0.5 rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 9. Lease ends */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Lease ends
                  </td>
                  {properties.map((prop) => (
                    <td
                      key={prop.id}
                      className={`p-4 border-l border-[#ECECE8] text-[#0E1A2B] ${
                        !isMember ? 'filter blur-sm select-none opacity-40' : ''
                      }`}
                    >
                      {prop.tenant.leaseExpiryDate}
                    </td>
                  ))}
                </tr>

                {/* 10. Checks */}
                <tr>
                  <td className="sticky left-0 bg-white z-10 p-4 font-medium text-[13px] text-[#6B7280]">
                    Checks
                  </td>
                  {properties.map((prop) => (
                    <td
                      key={prop.id}
                      className={`p-4 border-l border-[#ECECE8] text-[#0E1A2B] ${
                        !isMember ? 'filter blur-sm select-none opacity-40' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-[#2E8B6E] font-medium">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>4/4 verified</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Membership overlay for locked rows if free */}
          {!isMember && (
            <div className="border-t border-[#ECECE8] p-6 text-center bg-[#FAFAF8]">
              <p className="text-[14px] font-medium text-[#0E1A2B] mb-2">
                Members only
              </p>
              <p className="text-xs text-[#6B7280] mb-3">
                Join membership to unlock verified tenant profiles and legal checks.
              </p>
              <button
                onClick={() => openUpgradeModal('Join membership to compare tenant & diligence records')}
                className="bg-[#0E1A2B] text-white px-5 py-2 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
