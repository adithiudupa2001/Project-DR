import React from 'react';
import { Property } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { formatRent, formatPriceINR } from '../../utils/formatters';
import { Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
  archPhoto?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  archPhoto = false,
}) => {
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

  // Rent growth & sparkline data computed from rentalHistory
  const history = property.rentalHistory || [];
  const firstRent = history.length > 0 ? history[0].monthlyRent : Math.round(property.monthlyRent * 0.85);
  const lastRent = history.length > 0 ? history[history.length - 1].monthlyRent : property.monthlyRent;
  const growthPct = Math.max(1, Math.round(((lastRent - firstRent) / firstRent) * 100));

  const startYear = history.length > 0
    ? history[0].year.slice(0, 4)
    : tenantSinceYear || '2022';

  const sparklineRentValues = history.length >= 4
    ? history.slice(0, 4).map(h => h.monthlyRent)
    : [
        firstRent,
        Math.round(firstRent + (lastRent - firstRent) * 0.35),
        Math.round(firstRent + (lastRent - firstRent) * 0.7),
        lastRent,
      ];
  const minVal = Math.min(...sparklineRentValues);
  const maxVal = Math.max(...sparklineRentValues);
  const range = maxVal - minVal || 1;
  const sparklinePoints = sparklineRentValues
    .map((val, idx) => {
      const x = 2 + idx * 18;
      const y = 14 - Math.round(((val - minVal) / range) * 10);
      return `${x},${y}`;
    })
    .join(' ');
  const lastPoint = sparklinePoints.split(' ').pop()?.split(',') || ['56', '4'];

  // Card badge: "Just listed" on prop-1, "Lease renewed" on prop-3
  const cardBadge = property.id === 'prop-1'
    ? 'Just listed'
    : property.id === 'prop-3'
    ? 'Lease renewed'
    : null;

  return (
    <div
      onClick={() => navigateToProperty(property.id)}
      className="group bg-white rounded-[16px] border border-[#ECECE8] overflow-hidden hover:border-[#B08D4C] transition-all duration-400 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Photo with signature arch mask or rectangular ratio */}
        <div className={archPhoto ? 'p-3 pb-0' : ''}>
          <div
            className={`relative overflow-hidden bg-[#ECECE8] ${
              archPhoto ? 'aspect-[4/5]' : 'aspect-[16/10]'
            }`}
            style={
              archPhoto
                ? { borderRadius: '999px 999px 16px 16px' }
                : undefined
            }
          >
            {cardBadge && (
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0E1A2B] text-xs font-medium px-2.5 py-1 rounded-full border border-[#ECECE8] shadow-xs z-10">
                {cardBadge}
              </span>
            )}

            <img
              src={property.primaryImage}
              alt={`${property.title}, ${property.corridor}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/images/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif font-semibold text-xl text-[#0E1A2B] truncate group-hover:text-[#8C6D2F] transition-colors">
              {property.title}, {property.corridor}
            </h3>
            <p className="text-[14px] text-[#4B5563] mt-0.5">
              {property.bhk} BHK · {property.superBuiltUpSqft.toLocaleString()} sq ft
            </p>
          </div>

          {/* Clean row: Price, Rent, and Yield (yield in green, 20px) */}
          <div className="grid grid-cols-3 pt-3 border-t border-[#ECECE8] gap-2 items-baseline">
            <div>
              <span className="block text-[12px] text-[#6B7280]">Price</span>
              <span className="text-[15px] sm:text-base font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {property.priceInCrFormatted || formatPriceINR(property.price)}
              </span>
            </div>
            <div>
              <span className="block text-[12px] text-[#6B7280]">Rent</span>
              <span className="text-[15px] sm:text-base font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {formatRent(property.monthlyRent)}
              </span>
            </div>
            <div>
              <span className="block text-[12px] text-[#6B7280]">Yield</span>
              <span className="text-[20px] font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap font-sans">
                {property.grossYieldPct}%
              </span>
            </div>
          </div>

          {/* Tenancy & Rent Sparkline */}
          <div className="space-y-1.5 pt-3 border-t border-[#ECECE8]">
            <div className="text-[13px] text-[#6B7280]">
              Tenant since {tenantSinceYear} · Lease to {property.tenant.leaseExpiryDate}
            </div>

            <div className="flex items-center gap-2 text-[12px]">
              <svg width="60" height="18" viewBox="0 0 60 18" className="overflow-visible shrink-0" aria-hidden="true">
                <polyline
                  fill="none"
                  stroke="#2E8B6E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={sparklinePoints}
                />
                <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2" fill="#2E8B6E" />
              </svg>
              <span className="font-medium text-[#2E8B6E] tabular-nums font-sans">
                ↑{growthPct}% since {startYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="px-5 py-3.5 border-t border-[#ECECE8] flex items-center justify-between"
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
