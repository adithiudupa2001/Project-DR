import React from 'react';
import { Property } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { formatCurrencyValue, formatRent } from '../../utils/formatters';
import {
  Heart,
  Plus,
  Check,
  ShieldCheck,
  Award,
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  compact = false,
}) => {
  const {
    navigateToProperty,
    toggleWatchlist,
    isWatchlisted,
    currency,
  } = useApp();

  const { isInCompare, toggleCompare } = useCompare();

  const watchlisted = isWatchlisted(property.id);
  const inCompare = isInCompare(property.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(property.id);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(property.id);
  };

  return (
    <div
      onClick={() => navigateToProperty(property.id)}
      className="group bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 overflow-hidden hover:border-[#C9A45C] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Visual Showcase */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#0E1A2B]">
          <img
            src={property.primaryImage}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Top Overlays */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-xs bg-[#0E1A2B]/90 text-[#F7F3EC] border border-[#C9A45C]/30 flex items-center gap-1 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B6E]"></span>
                <span>Tenanted Day 1</span>
              </span>
              {property.status === 'Verified (3+ yrs)' && (
                <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-xs bg-[#2E8B6E] text-[#F7F3EC] flex items-center gap-1 font-sans">
                  <ShieldCheck className="w-3 h-3" />
                  <span>3+ Yrs Audited</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={handleWatchlistClick}
                title={watchlisted ? 'Saved' : 'Save to Watchlist'}
                className={`w-7 h-7 rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
                  watchlisted
                    ? 'bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]'
                    : 'bg-[#0E1A2B]/85 text-slate-300 hover:text-red-400 hover:bg-[#0E1A2B]'
                }`}
                aria-label="Add to watchlist"
              >
                <Heart className={`w-3.5 h-3.5 ${watchlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Financial Scrim on Image */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0E1A2B] via-[#0E1A2B]/75 to-transparent p-3.5 pt-6 flex items-baseline justify-between text-[#F7F3EC]">
            <div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A45C] block font-medium font-sans">
                Day-1 Rental Cash Flow
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#F7F3EC] tabular-nums">
                {formatRent(property.monthlyRent, currency)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] tracking-wider uppercase text-slate-300 block font-sans">
                Gross Yield
              </span>
              <span className="text-sm sm:text-base font-bold text-[#2E8B6E] font-sans tabular-nums">
                {property.grossYieldPct}%
              </span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 space-y-3.5 bg-[#F7F3EC]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C6D2F] font-sans">
                {property.developer} · {property.developerTier}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0E1A2B] font-mono bg-[#0E1A2B]/6 px-1.5 py-0.5 rounded-xs border border-[#C9A45C]/25">
                <Award className="w-3 h-3 text-[#8C6D2F]" />
                <span>{property.score.overallScore}/10</span>
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0E1A2B] group-hover:text-[#8C6D2F] transition-colors mt-0.5">
              {property.title}
            </h3>

            <div className="flex items-center justify-between text-[13px] text-[#4A5160] mt-1 font-sans">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D2F] shrink-0" />
                <span>{property.corridor}</span>
              </span>
            </div>
          </div>

          {/* Unit Spec details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#4A5160] pt-2 border-t border-[#C9A45C]/20 font-sans">
            <span className="font-semibold text-[#0E1A2B]">{property.bhk} BHK</span>
            <span>·</span>
            <span className="tabular-nums font-mono">{property.superBuiltUpSqft.toLocaleString('en-IN')} sq ft</span>
            <span>·</span>
            <span>{property.tower}, {property.floor}th Flr</span>
            <span>·</span>
            <span>{property.buildingAgeYears} yrs old</span>
          </div>

          {/* Tenant preview strip */}
          <div className="p-2.5 rounded-xs bg-[#0E1A2B]/4 border border-[#C9A45C]/25 text-xs font-sans">
            <div className="flex items-center justify-between text-[11px] text-[#4A5160] mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8C6D2F]">
                Verified Tenant:
              </span>
              <span className="text-[#2E8B6E] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Since {property.tenant.tenureStartFormatted.split(' ')[0]} {property.tenant.tenureStartFormatted.split(' ')[1]}
              </span>
            </div>
            <div className="text-[#0E1A2B] font-semibold truncate text-[13px]">
              {property.tenant.category} · {property.tenant.familyType}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Price, Compare Button & Audit Dossier CTA */}
      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-[#C9A45C]/20 bg-[#F7F3EC] flex flex-wrap items-center justify-between gap-3 font-sans">
        <div>
          <span className="text-[11px] tracking-wider uppercase text-[#4A5160] block font-medium">
            Acquisition Price
          </span>
          <span className="font-serif font-bold text-[#0E1A2B] text-base sm:text-lg tabular-nums">
            {formatCurrencyValue(property.price, currency)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Compare Button with exact specified behaviour */}
          <button
            onClick={handleCompareClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
              inCompare
                ? 'bg-[#C9A45C] text-[#0E1A2B] border-[#C9A45C] shadow-xs'
                : 'bg-transparent text-[#0E1A2B] border-[#C9A45C]/40 hover:border-[#8C6D2F] hover:bg-[#C9A45C]/10'
            }`}
          >
            {inCompare ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0E1A2B]" />
                <span>Added to compare</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#8C6D2F]" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* Audit Dossier CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToProperty(property.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-[#0E1A2B] hover:bg-[#142338] text-[#C9A45C] font-semibold text-xs tracking-wide transition-colors border border-[#C9A45C]/30 cursor-pointer"
          >
            <span>Dossier</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
