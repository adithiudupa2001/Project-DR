import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { formatRent, formatINR } from '../../utils/formatters';
import { RentHistoryChart } from '../property/RentHistoryChart';
import {
  Heart,
  Check,
  Download,
  X,
  Lock,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const {
    selectedPropertyId,
    setActiveTab,
    toggleWatchlist,
    isWatchlisted,
    tier,
    openUpgradeModal,
    showToast,
  } = useApp();

  const { isInCompare, toggleCompare } = useCompare();

  const property =
    MOCK_PROPERTIES.find((p) => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];

  const watchlisted = isWatchlisted(property.id);
  const inCompare = isInCompare(property.id);

  const [activePhoto, setActivePhoto] = useState(0);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isMember = tier !== 'free';

  const tenantSinceYear =
    property.tenant.tenureStartFormatted.match(/\b(20\d\d)\b/)?.[1] ||
    String(2026 - Math.max(1, Math.round(property.tenant.tenureMonths / 12)));

  const handleDownload = () => {
    if (tier === 'free') {
      setActiveTab('membership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (tier === 'investor') {
      showToast('PDF downloads are available on Pro');
      return;
    }
    showToast(`Downloading report PDF for ${property.title}`);
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInterestSubmitted(true);
    setTimeout(() => {
      setShowInterestModal(false);
      setInterestSubmitted(false);
      setName('');
      setPhone('');
      showToast("Thank you. We'll be in touch shortly.");
    }, 1200);
  };

  const allPhotos = [property.primaryImage, ...(property.galleryImages || [])];

  return (
    <div className="bg-[#FAFAF8] text-[#0E1A2B] pb-24 lg:pb-16 pt-6">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between text-[13px]">
          <button
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#6B7280] hover:text-[#0E1A2B] transition-colors cursor-pointer"
          >
            ← Properties
          </button>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-[#0E1A2B]">
              <input
                type="checkbox"
                checked={inCompare}
                onChange={() => toggleCompare(property.id)}
                className="w-4 h-4 rounded text-[#0E1A2B] border-[#ECECE8] focus:ring-0 cursor-pointer"
              />
              <span>Compare</span>
            </label>

            <button
              onClick={() => toggleWatchlist(property.id)}
              className="p-1.5 text-[#6B7280] hover:text-[#0E1A2B] transition-colors cursor-pointer"
              aria-label="Save property"
            >
              <Heart
                className={`w-4 h-4 ${
                  watchlisted ? 'fill-[#B4483C] text-[#B4483C]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Header: photos, name, locality, BHK/size */}
        <div className="space-y-4">
          <div className="aspect-[16/9] w-full rounded-[12px] overflow-hidden bg-[#ECECE8] border border-[#ECECE8]">
            <img
              src={allPhotos[activePhoto]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/images/placeholder.svg';
              }}
            />
          </div>

          {allPhotos.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {allPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border shrink-0 transition-opacity cursor-pointer ${
                    activePhoto === i
                      ? 'border-[#0E1A2B] opacity-100'
                      : 'border-[#ECECE8] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/images/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="pt-2">
            <h1 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
              {property.title}, {property.corridor}
            </h1>
            <p className="text-[#6B7280] text-[15px] mt-1">
              {property.bhk} BHK · {property.superBuiltUpSqft.toLocaleString()} sq ft · {property.tower}, Floor {property.floor} of {property.totalFloors}
            </p>
          </div>
        </div>

        {/* Key figures strip (5 numbers) */}
        <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            <div>
              <span className="block text-[13px] text-[#6B7280] mb-1">Price</span>
              <span className="text-[28px] font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {property.priceInCrFormatted}
              </span>
            </div>

            <div>
              <span className="block text-[13px] text-[#6B7280] mb-1">Monthly rent</span>
              <span className="text-[28px] font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {formatRent(property.monthlyRent)}
              </span>
            </div>

            <div>
              <span className="block text-[13px] text-[#6B7280] mb-1">Gross yield</span>
              <span className="text-[28px] font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap">
                {property.grossYieldPct}%
              </span>
            </div>

            <div>
              <span className="block text-[13px] text-[#6B7280] mb-1">Net yield</span>
              <span className="text-[28px] font-semibold text-[#2E8B6E] tabular-nums whitespace-nowrap">
                {property.netYieldPct}%
              </span>
            </div>

            <div>
              <span className="block text-[13px] text-[#6B7280] mb-1">Tenant since</span>
              <span className="text-[28px] font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
                {tenantSinceYear}
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA and Secondary CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowInterestModal(true)}
            className="bg-[#0E1A2B] text-white px-6 py-3 rounded-[12px] font-medium text-[15px] hover:bg-[#142338] transition-colors cursor-pointer"
          >
            I'm interested
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white text-[#0E1A2B] border border-[#ECECE8] px-5 py-3 rounded-[12px] font-medium text-[15px] hover:border-[#0E1A2B]/40 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#6B7280]" />
            <span>Download report</span>
            {tier !== 'pro' && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#B08D4C]/15 text-[#B08D4C] border border-[#B08D4C]/30">
                Pro
              </span>
            )}
          </button>
        </div>

        {/* Rent history (locked for free members) */}
        <div className="relative">
          {!isMember ? (
            <div className="relative bg-white rounded-[12px] border border-[#ECECE8] p-6 overflow-hidden">
              <div className="filter blur-sm select-none pointer-events-none opacity-40">
                <RentHistoryChart rentalHistory={property.rentalHistory} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/70">
                <p className="text-[15px] font-medium text-[#0E1A2B] mb-3">
                  Members only
                </p>
                <button
                  onClick={() => {
                    setActiveTab('membership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#0E1A2B] text-white px-5 py-2 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
                >
                  Membership
                </button>
              </div>
            </div>
          ) : (
            <RentHistoryChart rentalHistory={property.rentalHistory} />
          )}
        </div>

        {/* Tenant: one compact row of facts (profile, family/bachelor, veg/non-veg, lease ends, deposit) */}
        <div className="relative">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-4">
            <h3 className="font-serif font-semibold text-xl text-[#0E1A2B]">Tenant</h3>

            {!isMember ? (
              <div className="relative">
                <div className="filter blur-sm select-none pointer-events-none opacity-40 grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Profile</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">IT Senior</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Family</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">Family</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Diet</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">Vegetarian</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Lease ends</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">Feb 2026</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Deposit</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">₹2,10,000</span>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/70">
                  <p className="text-[15px] font-medium text-[#0E1A2B] mb-2">
                    Members only
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('membership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#0E1A2B] text-white px-5 py-2 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
                  >
                    Membership
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-1">
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Profile</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B]">
                    {property.tenant.category}
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Type</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B]">
                    {property.tenant.familyType}
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Diet</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B]">
                    {property.tenant.foodPreference}
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Lease ends</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B]">
                    {property.tenant.leaseExpiryDate}
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Deposit</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B] tabular-nums">
                    {formatINR(property.tenant.securityDeposit)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Costs: 3 lines (maintenance, tax, net monthly income) */}
        <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-4">
          <h3 className="font-serif font-semibold text-xl text-[#0E1A2B]">Costs</h3>

          <div className="space-y-2.5 max-w-md text-[14px]">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280]">Maintenance</span>
              <span className="text-[#B4483C] tabular-nums font-medium">
                -₹{property.expenses.societyMaintenance.toLocaleString()}/mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280]">Property tax</span>
              <span className="text-[#B4483C] tabular-nums font-medium">
                -₹{property.expenses.propertyTaxEstimate.toLocaleString()}/mo
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#ECECE8]">
              <span className="text-[#0E1A2B] font-medium">Net monthly income</span>
              <span className="text-[#2E8B6E] tabular-nums font-semibold">
                ₹{property.netMonthlyCashFlow.toLocaleString()}/mo
              </span>
            </div>
            <div className="pt-2 text-xs text-[#6B7280]">
              Estimated loan EMI: ₹82,000/mo (at 8.5% for 20 yrs)
            </div>
          </div>
        </div>

        {/* Checks: one line of 4 ticks (Agreement, Dues, Title, Tenant) */}
        <div className="relative">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-4">
            <h3 className="font-serif font-semibold text-xl text-[#0E1A2B]">Checks</h3>

            {!isMember ? (
              <div className="relative">
                <div className="filter blur-sm select-none pointer-events-none opacity-40 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Agreement</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Dues</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Title</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                    <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                    <span>Tenant</span>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/70">
                  <p className="text-[15px] font-medium text-[#0E1A2B] mb-2">
                    Members only
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('membership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#0E1A2B] text-white px-5 py-2 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
                  >
                    Membership
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Agreement</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Dues</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Title</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#0E1A2B]">
                  <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
                  <span>Tenant</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Locality rent trends */}
        <div className="relative">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-xl text-[#0E1A2B]">
                Locality rent trends
              </h3>
              {tier !== 'pro' && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#B08D4C]/15 text-[#B08D4C] border border-[#B08D4C]/30">
                  Pro
                </span>
              )}
            </div>

            {!isMember ? (
              <div className="relative">
                <div className="filter blur-sm select-none pointer-events-none opacity-40 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Rent growth</span>
                    <span className="text-[15px] font-medium text-[#2E8B6E]">+8.4% YoY</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Corridor yield</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">3.9%</span>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#6B7280]">Avg rate</span>
                    <span className="text-[15px] font-medium text-[#0E1A2B]">₹38/sq ft</span>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/70">
                  <p className="text-[15px] font-medium text-[#0E1A2B] mb-2">
                    Members only
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('membership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#0E1A2B] text-white px-5 py-2 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
                  >
                    Membership
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Rent growth</span>
                  <span className="text-[15px] font-medium text-[#2E8B6E] tabular-nums">
                    +8.4% YoY
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Corridor yield</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B] tabular-nums">
                    3.9% avg
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] text-[#6B7280]">Avg rate</span>
                  <span className="text-[15px] font-medium text-[#0E1A2B] tabular-nums">
                    ₹38/sq ft/mo
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bar only (<768px): price + "I'm interested" */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-[#ECECE8] p-4 flex items-center justify-between md:hidden z-30">
        <div>
          <span className="block text-xs text-[#6B7280]">Price</span>
          <span className="text-lg font-semibold text-[#0E1A2B] tabular-nums whitespace-nowrap">
            {property.priceInCrFormatted}
          </span>
        </div>
        <button
          onClick={() => setShowInterestModal(true)}
          className="bg-[#0E1A2B] text-white px-5 py-2.5 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
        >
          I'm interested
        </button>
      </div>

      {/* Interest modal */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[12px] border border-[#ECECE8] max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0E1A2B]">
                I'm interested
              </h3>
              <button
                onClick={() => setShowInterestModal(false)}
                className="text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[13px] text-[#6B7280]">
              Leave your details for {property.title}. We'll contact you today.
            </p>

            <form onSubmit={handleInterestSubmit} className="space-y-3">
              <div>
                <label className="block text-[13px] text-[#6B7280] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-[#ECECE8] rounded-lg text-sm text-[#0E1A2B] focus:outline-none focus:border-[#0E1A2B]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-[#6B7280] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 or international"
                  className="w-full px-3 py-2 border border-[#ECECE8] rounded-lg text-sm text-[#0E1A2B] focus:outline-none focus:border-[#0E1A2B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={interestSubmitted}
                  className="w-full bg-[#0E1A2B] text-white py-2.5 rounded-[10px] text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
                >
                  {interestSubmitted ? 'Sending...' : 'Send request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
