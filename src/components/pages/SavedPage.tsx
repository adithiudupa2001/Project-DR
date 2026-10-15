import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';

export const SavedPage: React.FC = () => {
  const { watchlist, setActiveTab } = useApp();

  const savedProperties = MOCK_PROPERTIES.filter((p) => watchlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0E1A2B] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#0E1A2B]">Saved</h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            {savedProperties.length} saved homes
          </p>
        </div>

        {savedProperties.length === 0 ? (
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-12 text-center space-y-3 max-w-md mx-auto">
            <p className="text-[15px] font-medium text-[#0E1A2B]">No saved properties</p>
            <p className="text-[13px] text-[#6B7280]">
              Save properties to easily compare and review later.
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
