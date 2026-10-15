import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { X } from 'lucide-react';

export const CompareTray: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const { activeTab, setActiveTab } = useApp();

  // Show the compare tray ONLY on the Properties list page and property pages, never on the homepage
  const isAllowedPage = activeTab === 'explore' || activeTab === 'property-detail';

  if (!isAllowedPage || compareIds.length === 0) {
    return null;
  }

  const canCompare = compareIds.length >= 2;

  const comparedProperties = compareIds
    .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
    .filter(Boolean);

  const handleCompareClick = () => {
    if (!canCompare) return;
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPropertyPage = activeTab === 'property-detail';

  return (
    <div
      className={`fixed inset-x-0 z-40 bg-white border-t border-[#ECECE8] h-[64px] flex items-center transition-all ${
        isPropertyPage ? 'bottom-16 md:bottom-0' : 'bottom-0'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 px-6">
        {/* Left: Thumbnails */}
        <div className="flex items-center gap-2.5 overflow-x-auto py-1">
          {comparedProperties.map((property) => {
            if (!property) return null;
            return (
              <div
                key={property.id}
                className="flex items-center gap-2 bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-2 py-1 shrink-0"
              >
                <img
                  src={property.primaryImage}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/placeholder.svg';
                  }}
                />
                <span className="text-xs font-medium text-[#0E1A2B] max-w-[120px] truncate">
                  {property.title}
                </span>
                <button
                  onClick={() => removeFromCompare(property.id)}
                  aria-label={`Remove ${property.title}`}
                  className="text-[#6B7280] hover:text-[#0E1A2B] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
          >
            Clear all
          </button>

          <button
            onClick={handleCompareClick}
            disabled={!canCompare}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              canCompare
                ? 'bg-[#0E1A2B] text-white hover:bg-[#142338]'
                : 'bg-[#ECECE8] text-[#6B7280] cursor-not-allowed'
            }`}
          >
            {canCompare
              ? `Compare (${compareIds.length})`
              : 'Select 2 to compare'}
          </button>
        </div>
      </div>
    </div>
  );
};
