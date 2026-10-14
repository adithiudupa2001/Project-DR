import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { PropertyCard } from '../property/PropertyCard';
import { formatCurrencyValue, formatRent, formatYield } from '../../utils/formatters';
import {
  Heart,
  Bell,
  Clock,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    user,
    tier,
    watchlist,
    recentlyViewed,
    downloadedDossiers,
    currency,
    openUpgradeModal,
    navigateToProperty,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'watchlist' | 'alerts' | 'dossiers' | 'recent'>('watchlist');

  // Alert settings state
  const [alertCorridors, setAlertCorridors] = useState<string[]>(['Whitefield', 'Outer Ring Road / Panathur']);
  const [minAlertYield, setMinAlertYield] = useState<number>(3.8);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);

  // Watchlisted properties
  const watchlistedProperties = MOCK_PROPERTIES.filter((p) => watchlist.includes(p.id));
  const recentProperties = MOCK_PROPERTIES.filter((p) => recentlyViewed.includes(p.id)).slice(0, 4);
  const downloadedProperties = MOCK_PROPERTIES.filter((p) => downloadedDossiers.includes(p.id));

  // Summary Metrics
  const totalWatchlistValue = watchlistedProperties.reduce((acc, p) => acc + p.price, 0);
  const totalWatchlistRent = watchlistedProperties.reduce((acc, p) => acc + p.monthlyRent, 0);
  const avgWatchlistYield =
    watchlistedProperties.length > 0
      ? (
          watchlistedProperties.reduce((acc, p) => acc + p.grossYieldPct, 0) /
          watchlistedProperties.length
        ).toFixed(2)
      : '0.0';

  const toggleCorridorAlert = (corridor: string) => {
    setAlertCorridors((prev) =>
      prev.includes(corridor) ? prev.filter((c) => c !== corridor) : [...prev, corridor]
    );
    showToast('Alert preferences updated');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* User Profile Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-700 font-bold text-xl flex items-center justify-center font-serif">
                {user ? user.name.charAt(0) : 'I'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-bold text-slate-900">
                    {user ? user.name : 'NRI Investor Dashboard'}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    {tier.toUpperCase()} TIER
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {user?.email || 'investor@rentier.private'} · {user?.country || 'San Jose, CA (NRI Member)'}
                </p>
              </div>
            </div>

            {/* Plan Card */}
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Active Subscription</span>
                <strong className="text-slate-900 font-bold capitalize">{tier} Plan</strong>
                <span className="text-emerald-600 block text-[10px]">
                  {tier === 'pro' ? 'Full Access + Video + Early Connect' : tier === 'investor' ? 'Full Dossier & Net Yields' : 'Basic View'}
                </span>
              </div>
              {tier !== 'pro' && (
                <button
                  onClick={() => openUpgradeModal('Upgrade for video inspections and priority access')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs"
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="p-3.5 bg-slate-50 rounded-xl">
              <span className="text-slate-500 text-xs block">Watchlist Portfolio Value</span>
              <span className="font-serif text-xl font-bold text-slate-900 tabular-nums">
                {formatCurrencyValue(totalWatchlistValue, currency)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{watchlistedProperties.length} saved assets</span>
            </div>

            <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-emerald-800 text-xs block">Target Monthly Cash Flow</span>
              <span className="font-serif text-xl font-bold text-emerald-600 tabular-nums">
                {formatRent(totalWatchlistRent, currency)}
              </span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Day-1 verified rent</span>
            </div>

            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-blue-800 text-xs block">Avg Watchlist Gross Yield</span>
              <span className="font-mono text-xl font-extrabold text-blue-600 tabular-nums">
                {avgWatchlistYield}%
              </span>
              <span className="text-[10px] text-blue-700 block mt-0.5">Pre-tax & maintenance</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'watchlist'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Watchlist ({watchlistedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'alerts'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Deal Alerts Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('dossiers')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'dossiers'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloaded Dossiers ({downloadedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'recent'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Recently Viewed</span>
          </button>
        </div>

        {/* TAB 1: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <div>
            {watchlistedProperties.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
                <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-slate-900">Your Watchlist is Empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the heart icon on any property card to save it for quick yield monitoring and comparison.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlistedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DEAL ALERTS PREFERENCES */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 max-w-3xl">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Bengaluru Pre-Rented Listing Alerts
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Receive immediate email and WhatsApp notifications when verified tenanted apartments matching your parameters hit the marketplace.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Corridors to Monitor
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Whitefield',
                    'Outer Ring Road / Panathur',
                    'Hebbal / North Bengaluru',
                    'Bellandur / ORR Tech Corridor',
                    'Sarjapur Extension',
                    'Kanakapura Road / JP Nagar',
                  ].map((corridor) => {
                    const isSelected = alertCorridors.includes(corridor);
                    return (
                      <button
                        key={corridor}
                        onClick={() => toggleCorridorAlert(corridor)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {corridor} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Minimum Gross Yield Threshold: <strong className="text-emerald-600 font-mono">{minAlertYield}%</strong>
                </label>
                <input
                  type="range"
                  min="3.5"
                  max="4.5"
                  step="0.1"
                  value={minAlertYield}
                  onChange={(e) => setMinAlertYield(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={emailAlertsEnabled}
                    onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Send instant early-access deal alerts to {user?.email}</span>
                </label>
              </div>

              <button
                onClick={() => showToast('Deal alert preferences saved')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Save Alert Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: DOWNLOADED DOSSIERS */}
        {activeTab === 'dossiers' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Downloaded Due Diligence Dossiers
            </h3>
            <p className="text-xs text-slate-500">
              Complete offline legal title reports, society ledgers, and biometric lease scans.
            </p>

            <div className="divide-y divide-slate-100 pt-2">
              {downloadedProperties.map((prop) => (
                <div key={prop.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{prop.title}</h4>
                    <span className="text-xs text-slate-500">
                      {prop.corridor} · Verified {prop.tenant.tenureStartFormatted}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateToProperty(prop.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      View Online
                    </button>
                    <button
                      onClick={() => showToast(`Opening PDF Dossier for ${prop.title}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECENTLY VIEWED */}
        {activeTab === 'recent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
