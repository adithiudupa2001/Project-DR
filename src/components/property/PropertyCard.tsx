import React from 'react';
import { Property } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { formatRent, formatPriceINR } from '../../utils/formatters';
import { Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { navigateToProperty, toggleWatchlist, isWatchlisted } = useApp();
  const { isInCompare, toggleCompare } = useCompare();

  const watchlisted = isWatchlisted(property.id);
  const inCompare = isInCompare(property.id);


  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(property.id);
  };

  // Extract year for "Tenant since YYYY"
  const tenantSinceYear =
    property.tenant.tenureStartFormatted.match(/\b(20\d\d)\b/)?.[1] ||
    String(2026 - Math.max(1, Math.round(property.tenant.tenureMonths / 12)));

  return (
    <div
      onClick={() => navigateToProperty(property.id)}
      className="bg-white rounded-[12px] border border-[#ECECE8] overflow-hidden hover:border-[#0E1A2B]/30 transition-colors cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Photo */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#ECECE8]">
          <img
            src={property.primaryImage}
            alt={`${property.title}, ${property.corridor}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-serif font-semibold text-lg text-[#0E1A2B] truncate">
              {property.title}, {property.corridor}
            </h3>
            <p className="text-[13px] text-[#6B7280] mt-0.5">
              {property.bhk} BHK · {property.superBuiltUpSqft.toLocaleString()} sq ft
            </p>
          </div>

          {/* 3-Figure Row */}
          <div className="grid grid-cols-3 pt-2 border-t border-[#ECECE8] gap-2">
            <div>
              <span className="block text-[13px] text-[#6B7280]">Price</span>
              <span className="text-base font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {property.priceInCrFormatted || formatPriceINR(property.price)}
              </span>
            </div>
            <div>
              <span className="block text-[13px] text-[#6B7280]">Rent</span>
              <span className="text-base font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {formatRent(property.monthlyRent)}
              </span>
            </div>
            <div>
              <span className="block text-[13px] text-[#6B7280]">Yield</span>
              <span className="text-base font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap">
                {property.grossYieldPct}%
              </span>
            </div>
          </div>

          {/* Tenancy Line */}
          <div className="text-[13px] text-[#6B7280]">
            Tenant since {tenantSinceYear} · Lease to {property.tenant.leaseExpiryDate}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="px-4 py-3 border-t border-[#ECECE8] flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#0E1A2B]">
          <input
            type="checkbox"
            checked={inCompare}
            onChange={() => toggleCompare(property.id)}
            className="w-4 h-4 rounded text-[#0E1A2B] border-[#ECECE8] focus:ring-0 focus:outline-none cursor-pointer"
          />
          <span>Compare</span>
        </label>

        <button
          onClick={handleWatchlistClick}
          aria-label={watchlisted ? 'Remove from saved' : 'Save property'}
          className="p-1 text-[#6B7280] hover:text-[#0E1A2B] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              watchlisted ? 'fill-[#B4483C] text-[#B4483C]' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};
