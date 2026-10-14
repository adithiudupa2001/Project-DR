import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatPriceINR, GROSS_YIELD_FOOTNOTE } from '../../utils/formatters';
import {
  Building2,
  TrendingUp,
  UserCheck,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  Shield,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const ListPropertyPage: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  // Step 1: Property Basics
  const [projectName, setProjectName] = useState('Godrej Athena');
  const [developer, setDeveloper] = useState('Godrej Properties');
  const [corridor, setCorridor] = useState('Indiranagar Extension');
  const [bhk, setBhk] = useState('3');
  const [sqft, setSqft] = useState(1550);
  const [towerFloor, setTowerFloor] = useState('Tower 2, 7th Floor');
  const [buildingAge, setBuildingAge] = useState(2);
  const [furnishing, setFurnishing] = useState('Semi-Furnished');

  // Step 2: Rent & History
  const [monthlyRent, setMonthlyRent] = useState(48000);
  const [securityDeposit, setSecurityDeposit] = useState(200000);
  const [pastYearRent, setPastYearRent] = useState(45000);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(5500);

  // Step 3: Tenant Profile
  const [tenantProfession, setTenantProfession] = useState('IT / Tech Senior Lead');
  const [tenantHousehold, setTenantHousehold] = useState('Family');
  const [tenantFood, setTenantFood] = useState('Vegetarian');
  const [tenantTenureMonths, setTenantTenureMonths] = useState(24);
  const [tenantConsentChecked, setTenantConsentChecked] = useState(true);

  // Step 4: Documents Upload Simulation
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({
    saleDeed: true,
    khata: true,
    leaseAgreement: true,
    societyNoc: false,
  });

  // Step 5: Submitted State
  const [submitted, setSubmitted] = useState(false);

  // Indicative Valuation calculation
  // Benchmark residential capitalization rate in Bengaluru: ~3.8%
  const annualRent = monthlyRent * 12;
  const indicativeFairValuation = Math.round(annualRent / 0.038);
  const vacantComparableValuation = Math.round(indicativeFairValuation * 0.9);
  const tenantedExitPremiumPct = 11.1; // ~11% premium

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Listing submitted! Our Bengaluru curation desk will review the documentation.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Value Proposition Header */}
        <div className="bg-gradient-to-br from-[#0B1220] via-[#0F1D33] to-[#0B1220] text-white p-7 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Landlord Exit Desk · 100% Free Listing</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Exit Your Tenanted Apartment at a 10–15% Premium
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl">
              Don’t discount an empty flat. Serious yield investors and overseas NRIs actively pay a premium for verified, tenanted homes that generate Day-1 cash flow without tenant-hunting delays.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-0.5">0% Brokerage & Listing Fee</span>
              <span className="text-slate-400">Owners list completely free. Zero hidden exit charges.</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-0.5">Valuation Reality Check</span>
              <span className="text-slate-400">Algorithmic cash flow multiple based on real corridor rents.</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-blue-400 font-bold block mb-0.5">No Tenant Eviction</span>
              <span className="text-slate-400">Current tenant stays undisturbed throughout transaction.</span>
            </div>
          </div>
        </div>

        {/* Multi-Step Wizard Progress Bar */}
        {!submitted && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Step {currentStep} of 5: {
                currentStep === 1 ? 'Property Specs' :
                currentStep === 2 ? 'Rent & Bank History' :
                currentStep === 3 ? 'Tenant Profile' :
                currentStep === 4 ? 'Due Diligence Documents' :
                'Valuation & Instant Preview'
              }</span>
              <span className="text-emerald-600">{currentStep * 20}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${currentStep * 20}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step Forms */}
        {submitted ? (
          /* Submission Celebration */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Property Successfully Submitted!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Listing ID: <strong>YG-BLR-{Math.floor(10000 + Math.random() * 90000)}</strong>. Our Bengaluru curation desk has initiated the title and lease verification. Your listing will go live to verified NRI investors within 24 hours.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-md mx-auto text-xs text-emerald-900 space-y-1">
              <div>Indicative Marketplace Price: <strong>{formatPriceINR(indicativeFairValuation)}</strong></div>
              <div>Estimated Day-1 Gross Yield: <strong>3.8%</strong></div>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setActiveTab('explore');
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* STEP 1: PROPERTY SPECS */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Step 1: Property Details & Location
                  </h3>
                  <p className="text-xs text-slate-500">
                    Specify the gated community and layout specs
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project / Apartment Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Developer Name
                    </label>
                    <input
                      type="text"
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bengaluru Corridor / Locality
                    </label>
                    <input
                      type="text"
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Configuration (BHK)
                    </label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Super Built-up Area (Sq Ft)
                    </label>
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tower & Floor
                    </label>
                    <input
                      type="text"
                      value={towerFloor}
                      onChange={(e) => setTowerFloor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: RENT HISTORY */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Step 2: Rental Cash Flow & Security Deposit
                  </h3>
                  <p className="text-xs text-slate-500">
                    Document current rent receipt and recurring maintenance
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Monthly Rent (₹/mo)
                    </label>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Security Deposit Held (₹)
                    </label>
                    <input
                      type="number"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Previous Year Rent (For Escalation Check)
                    </label>
                    <input
                      type="number"
                      value={pastYearRent}
                      onChange={(e) => setPastYearRent(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Monthly Society Maintenance (₹/mo)
                    </label>
                    <input
                      type="number"
                      value={monthlyMaintenance}
                      onChange={(e) => setMonthlyMaintenance(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: TENANT PROFILE (ANONYMISED) */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Step 3: Anonymised Tenant Profile
                  </h3>
                  <p className="text-xs text-slate-500">
                    Never reveal personal names or contact info. Anonymised for tenant privacy.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tenant Profession Category
                    </label>
                    <select
                      value={tenantProfession}
                      onChange={(e) => setTenantProfession(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="IT / Tech Senior Lead">IT / Tech Senior Lead</option>
                      <option value="Corporate Leadership">Corporate Leadership / VP</option>
                      <option value="Consulting / Finance">Consulting / Finance Professional</option>
                      <option value="Doctor / Healthcare">Doctor / Healthcare Specialist</option>
                      <option value="MNC Expatriate">MNC Expatriate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Household Composition
                    </label>
                    <select
                      value={tenantHousehold}
                      onChange={(e) => setTenantHousehold(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Family">Family</option>
                      <option value="Couple">Working Couple</option>
                      <option value="Single Professional">Single Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Food Preference
                    </label>
                    <select
                      value={tenantFood}
                      onChange={(e) => setTenantFood(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Flexible">Flexible / Non-Vegetarian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Continuous Tenure (Months)
                    </label>
                    <input
                      type="number"
                      value={tenantTenureMonths}
                      onChange={(e) => setTenantTenureMonths(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-700 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={tenantConsentChecked}
                      onChange={(e) => setTenantConsentChecked(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5"
                    />
                    <span>
                      <strong>Tenant Consent Confirmation:</strong> I confirm the tenant has been informed of ownership succession transfer under standard tenancy act terms, and consent has been obtained.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENT CHECKLIST */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Step 4: Title & Lease Documentation Placeholders
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload or mark available documents for legal due diligence desk verification
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { key: 'saleDeed', label: 'Registered Sale Deed / Mother Deed' },
                    { key: 'khata', label: 'BBMP / BDA A-Khata Certificate' },
                    { key: 'leaseAgreement', label: 'Current Biometric Rental Agreement' },
                    { key: 'societyNoc', label: 'Society NOC & Maintenance No-Dues' },
                  ].map((doc) => (
                    <div
                      key={doc.key}
                      onClick={() =>
                        setUploadedDocs((prev) => ({ ...prev, [doc.key]: !prev[doc.key] }))
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        uploadedDocs[doc.key]
                          ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold">{doc.label}</span>
                      </div>
                      <span className="text-[11px] font-bold">
                        {uploadedDocs[doc.key] ? '✓ Uploaded' : '+ Add File'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Rentier legal desk verifies all Kaveri portal encumbrance records prior to buyer escrow.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 5: INSTANT VALUATION PREVIEW */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Step 5: Indicative Valuation & Yield Preview
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time market valuation calculated from your verified monthly cash flow
                  </p>
                </div>

                {/* Valuation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-300 shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Recommended Tenanted Listing Price
                    </span>
                    <div className="font-serif text-3xl font-bold text-emerald-700 tabular-nums">
                      {formatPriceINR(indicativeFairValuation)}
                    </div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      Gross Yield: 3.8% · High NRI Demand
                    </div>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">
                      Vacant Comparable Valuation (Traditional Sale)
                    </span>
                    <div className="font-serif text-2xl font-bold text-slate-700 tabular-nums">
                      {formatPriceINR(vacantComparableValuation)}
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      ★ +{tenantedExitPremiumPct}% Tenanted Exit Premium Realised
                    </div>
                  </div>
                </div>

                {/* Summary Recap Strip */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Asset:</span>
                    <strong>{projectName} ({bhk} BHK, {sqft} sq ft, {corridor})</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Monthly Cash Flow:</span>
                    <strong className="text-emerald-700 font-mono">{formatINR(monthlyRent)}/mo</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Tenant Stability:</span>
                    <strong>{tenantProfession} ({tenantTenureMonths} continuous months)</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div></div>}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  <span>Submit Free Listing</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
