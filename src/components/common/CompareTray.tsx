import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { formatCurrencyValue } from '../../utils/formatters';
import { X, Scale, Plus, ArrowRight } from 'lucide-react';

export const CompareTray: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare, maxProperties } = useCompare();
  const { activeTab, setActiveTab, currency } = useApp();

  // Hidden when empty or when already on the compare page
  if (compareIds.length === 0 || activeTab === 'compare') {
    return null;
  }

  const isDossierPage = activeTab === 'property-detail';
  const canCompare = compareIds.length >= 2;

  const comparedProperties = compareIds
    .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
    .filter(Boolean);

  const emptySlotsCount = Math.max(0, Math.min(4, maxProperties) - comparedProperties.length);

  const handleCompareClick = () => {
    if (!canCompare) return;
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseMore = () => {
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Comparison Tray"
      className={`fixed left-0 right-0 z-40 bg-[#0E1A2B] border-t border-[#C9A45C]/40 text-[#F7F3EC] shadow-2xl transition-all duration-300 ${
        isDossierPage ? 'bottom-[76px] sm:bottom-[84px]' : 'bottom-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        
        {/* Mobile View: Single Compact Row */}
        <div className="flex md:hidden items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#C9A45C] shrink-0"></span>
            <span className="text-xs font-semibold text-[#F7F3EC] truncate">
              {compareIds.length} of {maxProperties} selected
            </span>
            <button
              onClick={clearCompare}
              className="text-[11px] text-[#B4483C] hover:underline shrink-0 ml-1 font-medium cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {canCompare ? (
              <button
                onClick={handleCompareClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-bold text-xs shadow-xs cursor-pointer active:scale-98"
              >
                <span>Compare now ({compareIds.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Select 2+ to compare</span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop View: Full 4-Slot Tray */}
        <div className="hidden md:flex items-center justify-between gap-6">
          
          {/* Left: Selected Property Slots */}
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            <div className="flex items-center gap-2 pr-2 border-r border-[#C9A45C]/25 shrink-0">
              <Scale className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">
                Compare Desk
              </span>
            </div>

            {/* Filled Slots */}
            {comparedProperties.map((property) => {
              if (!property) return null;
              return (
                <div
                  key={property.id}
                  className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[#09111D] border border-[#C9A45C]/35 min-w-[190px] max-w-[220px] shrink-0 group"
                >
                  <img
                    src={property.primaryImage}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-xs object-cover shrink-0 border border-[#C9A45C]/25"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-semibold text-[#F7F3EC] truncate">
                      {property.title}
                    </h5>
                    <div className="text-[11px] text-[#C9A45C] font-mono tabular-nums">
                      {formatCurrencyValue(property.price, currency)} · {property.grossYieldPct}%
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCompare(property.id)}
                    className="p-1 rounded text-slate-400 hover:text-[#B4483C] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    title={`Remove ${property.title}`}
                    aria-label={`Remove ${property.title} from compare`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            {/* Empty Slots */}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => (
              <button
                key={`empty-${idx}`}
                onClick={handleBrowseMore}
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-sm border border-dashed border-slate-700 hover:border-[#C9A45C]/50 text-slate-400 hover:text-slate-200 text-xs transition-colors shrink-0 min-w-[150px] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-slate-500" />
                <span>Add a property</span>
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 shrink-0 font-sans">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-400 hover:text-[#B4483C] font-medium transition-colors cursor-pointer"
            >
              Clear all
            </button>

            <div className="flex flex-col items-end">
              <button
                onClick={handleCompareClick}
                disabled={!canCompare}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xs font-bold text-xs uppercase tracking-wider transition-all shadow-xs ${
                  canCompare
                    ? 'bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] cursor-pointer active:scale-98'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Compare now ({compareIds.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {!canCompare && (
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Select at least 2 properties
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
};
