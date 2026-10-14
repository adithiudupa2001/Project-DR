import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCompare } from '../../context/CompareContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { formatCurrencyValue, formatRent, formatYield } from '../../utils/formatters';
import { TenantProfileCard } from '../property/TenantProfileCard';
import { RentHistoryChart } from '../property/RentHistoryChart';
import { DueDiligenceChecklist } from '../property/DueDiligenceChecklist';
import { InvestmentScoreBanner } from '../property/InvestmentScoreBanner';
import { CostBreakdownPanel } from '../property/CostBreakdownPanel';
import { LeaseTimeline } from '../property/LeaseTimeline';
import { PaywallOverlay } from '../common/PaywallOverlay';
import { StatCard } from '../common/StatCard';
import {
  ArrowLeft,
  Heart,
  Plus,
  Check,
  Download,
  Video,
  Send,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Share2,
  X,
  MoreHorizontal,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const {
    selectedPropertyId,
    setActiveTab,
    toggleWatchlist,
    isWatchlisted,
    currency,
    tier,
    openUpgradeModal,
    recordDossierDownload,
    showToast,
  } = useApp();

  const { isInCompare, toggleCompare, compareIds } = useCompare();

  const property =
    MOCK_PROPERTIES.find((p) => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];

  const watchlisted = isWatchlisted(property.id);
  const inCompare = isInCompare(property.id);

  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [interestName, setInterestName] = useState('');
  const [interestEmail, setInterestEmail] = useState('');
  const [interestPhone, setInterestPhone] = useState('');
  const [interestNote, setInterestNote] = useState('');
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const [videoSlot, setVideoSlot] = useState('Weekend Morning (IST)');
  const [videoSubmitted, setVideoSubmitted] = useState(false);

  const handleDownloadDossier = () => {
    if (tier === 'free') {
      openUpgradeModal('Downloadable institutional dossiers require Investor or Private Client membership');
      return;
    }
    recordDossierDownload(property.id);
    showToast(`Downloading confidential legal dossier for ${property.title} (PDF)...`);
    setShowMobileMore(false);
  };

  const handleVideoWalkthrough = () => {
    if (tier === 'free') {
      openUpgradeModal('On-demand 4K video walkthroughs are available for Private Client (NRI) members');
      return;
    }
    setShowVideoModal(true);
    setShowMobileMore(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Asset Dossier link copied to clipboard');
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInterestSubmitted(true);
    setTimeout(() => {
      setShowInterestModal(false);
      setInterestSubmitted(false);
      showToast('Mandate received. Rentier Private Relationship Director will initiate contact.');
    }, 1800);
  };

  const isLockedForFreeTier = tier === 'free';
  const hasCompareItems = compareIds.length > 0;

  return (
    <div
      className={`min-h-screen bg-[#F7F3EC] py-8 sm:py-10 text-[#1A1F2B] transition-all ${
        hasCompareItems ? 'pb-52 sm:pb-48' : 'pb-32 sm:pb-36'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-7">
        
        {/* Navigation Breadcrumb & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <button
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 text-[#4A5160] hover:text-[#0E1A2B] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#8C6D2F]" />
            <span className="text-[13px]">Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-xs bg-[#F7F3EC] border border-[#C9A45C]/35 text-[#4A5160] hover:text-[#0E1A2B] transition-colors"
              title="Share dossier link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Compare Button with required Add/Added behavior */}
            <button
              onClick={() => toggleCompare(property.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs font-semibold transition-all ${
                inCompare
                  ? 'bg-[#C9A45C] text-[#0E1A2B] border-[#C9A45C] shadow-xs'
                  : 'bg-transparent text-[#0E1A2B] border-[#C9A45C]/40 hover:border-[#8C6D2F]'
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

            <button
              onClick={() => toggleWatchlist(property.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs font-semibold transition-all ${
                watchlisted
                  ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                  : 'bg-[#F7F3EC] text-[#0E1A2B] border-[#C9A45C]/35 hover:border-[#8C6D2F]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${watchlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
              <span>{watchlisted ? 'Saved' : 'Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Hero Dossier Header */}
        <div className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 p-6 sm:p-9 shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Titles & Covenants */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 font-sans">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#2E8B6E]/12 text-[#2E8B6E] border border-[#2E8B6E]/30 text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B6E]"></span>
                  <span>Tenanted Day 1</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#0E1A2B]/6 text-[#0E1A2B] border border-[#C9A45C]/25 text-[11px] font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D2F]" />
                  <span>{property.yearsRentDocumented}+ Yrs Audited History</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#0E1A2B]/6 text-[#0E1A2B] text-[11px] font-medium tracking-wider uppercase border border-[#C9A45C]/20">
                  {property.developerTier} Pedigree
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0E1A2B] tracking-tight">
                  {property.title}
                </h1>
                <p className="text-[#4A5160] text-[13px] sm:text-sm mt-1.5 flex items-center gap-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D2F] shrink-0" />
                  <span>{property.microMarket}</span>
                </p>
              </div>

              {/* Unit Specifications */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#4A5160] pt-3 border-t border-[#C9A45C]/20 font-sans">
                <span className="font-bold text-[#0E1A2B] text-sm">{property.bhkLabel}</span>
                <span>·</span>
                <span className="tabular-nums font-mono">{property.superBuiltUpSqft.toLocaleString('en-IN')} sq ft (SBA)</span>
                <span>·</span>
                <span className="tabular-nums font-mono">{property.carpetAreaSqft.toLocaleString('en-IN')} sq ft (Carpet)</span>
                <span>·</span>
                <span>{property.tower}, Floor {property.floor} of {property.totalFloors}</span>
                <span>·</span>
                <span>{property.furnishing}</span>
                <span>·</span>
                <span>{property.facing} Facing</span>
              </div>
            </div>

            {/* Right: Headline Stat Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <StatCard
                label="Acquisition Price"
                value={formatCurrencyValue(property.price, currency)}
                subValue={`₹${(property.price / property.superBuiltUpSqft).toFixed(0)}/sq ft`}
                variant="neutral"
              />

              <StatCard
                label="Contractual Rent"
                value={formatRent(property.monthlyRent, currency)}
                subValue={`Escrow Deposit: ₹${(property.tenant.securityDeposit / 100000).toFixed(2)} L`}
                variant="emerald"
              />

              <StatCard
                label="Gross Yield"
                value={formatYield(property.grossYieldPct)}
                subValue="Day-1 Annualized"
                variant="emerald"
              />

              <StatCard
                label="Net In-Pocket Yield"
                value={formatYield(property.netYieldPct)}
                subValue="After society maintenance"
                variant="amber"
              />
            </div>

          </div>
        </div>

        {/* Investment Score Banner */}
        <InvestmentScoreBanner score={property.score} />

        {/* Gallery Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative aspect-16/10 rounded-sm overflow-hidden bg-[#0E1A2B] border border-[#C9A45C]/35">
            <img
              src={property.galleryImages[activeImageIndex] || property.primaryImage}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#0E1A2B]/90 px-3.5 py-1.5 rounded-xs text-[#F7F3EC] text-xs font-sans border border-[#C9A45C]/30">
              <span className="text-[#C9A45C] font-mono">Plate {activeImageIndex + 1} of {property.galleryImages.length}</span>
              <span className="text-slate-300 ml-2">· Verified Grounds</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {property.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-1 rounded-xs overflow-hidden border transition-all ${
                  activeImageIndex === idx ? 'border-[#C9A45C] ring-1 ring-[#C9A45C]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Asset Cards (Subject to Gating for Free Tier) */}
        {isLockedForFreeTier ? (
          <PaywallOverlay
            title="Institutional Diligence Dossier is Gated"
            subtitle="The registered biometric lease deed, consecutive 36-month bank NEFT ledger, 5-tier legal audit checklist, and unmasked tenant background are reserved for Investor & Private Client members."
            actionText="Access Institutional Dossier"
          />
        ) : (
          <div className="space-y-7">
            <TenantProfileCard tenant={property.tenant} />

            <RentHistoryChart
              rentalHistory={property.rentalHistory}
              yearsDocumented={property.yearsRentDocumented}
            />

            <DueDiligenceChecklist
              items={property.dueDiligence}
              reranumber={property.reranumber}
            />
          </div>
        )}

        {/* Cost Breakdown & Lease Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CostBreakdownPanel
            grossMonthlyRent={property.monthlyRent}
            expenses={property.expenses}
            netCashFlow={property.netMonthlyCashFlow}
          />

          <LeaseTimeline tenant={property.tenant} />
        </div>

        {/* Society Description & Amenities */}
        <div className="bg-[#F7F3EC] rounded-sm border border-[#C9A45C]/35 p-6 sm:p-8 space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#0E1A2B]">
            Development Architecture & Amenities
          </h3>
          <p className="text-[13px] sm:text-sm text-[#4A5160] leading-relaxed font-sans font-light">
            {property.description}
          </p>

          <div className="pt-2 font-sans">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C6D2F] block mb-2">
              Verified Clubhouse & Community Amenities
            </span>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xs bg-[#0E1A2B]/6 text-[#0E1A2B] text-xs font-medium border border-[#C9A45C]/25"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* COMPACT STICKY BOTTOM ACTION BAR (Max height ~88px on desktop, single row) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E1A2B] border-t border-[#C9A45C]/40 text-[#F7F3EC] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] sm:h-[84px] flex items-center justify-between gap-4">
          
          {/* Left: Price + Yield in a single row */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-2.5 whitespace-nowrap">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F7F3EC] tabular-nums whitespace-nowrap">
                  {formatCurrencyValue(property.price, currency)}
                </span>
                <span className="text-xs sm:text-sm text-[#2E8B6E] font-bold font-sans tracking-tight whitespace-nowrap">
                  {property.grossYieldPct}% Gross Yield
                </span>
              </div>
              <div className="hidden sm:block text-[11px] text-slate-300 font-sans truncate">
                Day-1 contractual rent: <strong className="font-sans font-semibold text-[#F7F3EC]">{formatRent(property.monthlyRent, currency)}</strong>
              </div>
            </div>
          </div>

          {/* Right: Buttons (Desktop: single row; Mobile: Express Interest + More button) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-sans">
            
            {/* Desktop Only Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={handleDownloadDossier}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xs bg-[#09111D] hover:bg-[#142338] border border-[#C9A45C]/35 text-xs font-semibold text-[#F7F3EC] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Download Dossier {tier === 'free' && '(Pro)'}</span>
              </button>

              <button
                onClick={handleVideoWalkthrough}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xs bg-[#09111D] hover:bg-[#142338] border border-[#C9A45C]/35 text-xs font-semibold text-[#F7F3EC] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-[#2E8B6E]" />
                <span>4K Video</span>
              </button>
            </div>

            {/* Mobile More Button */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowMobileMore(!showMobileMore)}
                className="p-2.5 rounded-xs bg-[#09111D] border border-[#C9A45C]/35 text-slate-300 hover:text-[#C9A45C] transition-colors"
                title="More actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* Mobile More Popover Menu */}
              {showMobileMore && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm shadow-2xl p-1 space-y-1 text-xs">
                  <button
                    onClick={handleDownloadDossier}
                    className="w-full text-left px-3 py-2 rounded-xs hover:bg-[#142338] flex items-center gap-2 text-slate-200"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Download Dossier</span>
                  </button>
                  <button
                    onClick={handleVideoWalkthrough}
                    className="w-full text-left px-3 py-2 rounded-xs hover:bg-[#142338] flex items-center gap-2 text-slate-200"
                  >
                    <Video className="w-3.5 h-3.5 text-[#2E8B6E]" />
                    <span>Video Walkthrough</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary CTA Button (Visible on both Desktop and Mobile) */}
            <button
              onClick={() => setShowInterestModal(true)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Express Interest</span>
            </button>
          </div>

        </div>
      </div>

      {/* EXPRESS INTEREST MODAL */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-8 text-[#F7F3EC] shadow-2xl">
            <button
              onClick={() => setShowInterestModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xs text-slate-400 hover:text-[#C9A45C] hover:bg-[#142338]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
                Private Client Mandate
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F7F3EC] mt-1">
                Acquisition Interest in {property.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                Connect with the registered owner and request our verified title packet.
              </p>
            </div>

            {interestSubmitted ? (
              <div className="py-8 text-center space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-[#2E8B6E]/20 text-[#2E8B6E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F7F3EC]">Mandate Transmitted</h4>
                <p className="text-xs text-slate-300">
                  A dedicated Rentier Private Relationship Director has been allocated to your transaction.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Reddy"
                    value={interestName}
                    onChange={(e) => setInterestName(e.target.value)}
                    className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={interestEmail}
                      onChange={(e) => setInterestEmail(e.target.value)}
                      className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                      Phone (with Country Code)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 408... / +91 98..."
                      value={interestPhone}
                      onChange={(e) => setInterestPhone(e.target.value)}
                      className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                    Mandate Notes & Timeline
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Seeking immediate registration, looking for Section 195 Lower TDS support."
                    value={interestNote}
                    onChange={(e) => setInterestNote(e.target.value)}
                    className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-bold text-xs uppercase tracking-wider transition-colors mt-2"
                >
                  Submit Private Mandate
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIDEO WALKTHROUGH MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-8 text-[#F7F3EC] shadow-2xl">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xs text-slate-400 hover:text-[#C9A45C] hover:bg-[#142338]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C]">
                Concierge 4K Video Tour
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F7F3EC] mt-1">
                Schedule Live Walkthrough
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                A verified Rentier field officer will conduct a live HD video walkthrough with the resident tenant.
              </p>
            </div>

            {videoSubmitted ? (
              <div className="py-6 text-center space-y-3 font-sans">
                <CheckCircle2 className="w-10 h-10 text-[#2E8B6E] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#F7F3EC]">Walkthrough Confirmed</h4>
                <p className="text-xs text-slate-300">
                  Calendar invite and encrypted stream link have been emailed to your account.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-sans">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                    Select Convenient Time Window (IST)
                  </label>
                  <select
                    value={videoSlot}
                    onChange={(e) => setVideoSlot(e.target.value)}
                    className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C]"
                  >
                    <option value="Saturday 10:30 AM IST (US Friday Night)">Saturday 10:30 AM IST (US Friday Night)</option>
                    <option value="Saturday 4:00 PM IST (Dubai 2:30 PM)">Saturday 4:00 PM IST (Dubai 2:30 PM)</option>
                    <option value="Sunday 11:00 AM IST (Singapore 1:30 PM)">Sunday 11:00 AM IST (Singapore 1:30 PM)</option>
                    <option value="Sunday 6:00 PM IST (UK 1:30 PM)">Sunday 6:00 PM IST (UK 1:30 PM)</option>
                  </select>
                </div>

                <div className="p-3 bg-[#0A1422] rounded-xs border border-[#C9A45C]/20 text-[11px] text-slate-300 space-y-1">
                  <div className="font-semibold text-[#C9A45C]">Tenant Courtesy Protocol:</div>
                  <div>Tenant has consented to 20-minute walkthroughs during daylight hours. High-speed 5G Wi-Fi enabled.</div>
                </div>

                <button
                  onClick={() => {
                    setVideoSubmitted(true);
                    setTimeout(() => {
                      setShowVideoModal(false);
                      setVideoSubmitted(false);
                      showToast('Live walkthrough reserved on your calendar');
                    }, 1600);
                  }}
                  className="w-full py-3 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-bold text-xs uppercase tracking-wider transition-colors mt-2"
                >
                  Confirm Video Walkthrough Slot
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
