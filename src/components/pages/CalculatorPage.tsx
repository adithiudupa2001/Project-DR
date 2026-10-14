import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyValue, formatRent, formatYield } from '../../utils/formatters';
import {
  Calculator,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export const CalculatorPage: React.FC = () => {
  const { currency, setCurrency } = useApp();

  const [propertyPrice, setPropertyPrice] = useState<number>(11500000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRatePct, setInterestRatePct] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [initialMonthlyRent, setInitialMonthlyRent] = useState<number>(35000);
  const [annualEscalationPct, setAnnualEscalationPct] = useState<number>(5.0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(5700);

  const calculations = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;

    const monthlyRate = interestRatePct / (12 * 100);
    const totalMonths = loanTenureYears * 12;
    const emi =
      loanAmount > 0 && monthlyRate > 0
        ? Math.round(
            (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1)
          )
        : 0;

    const initialGrossYield = ((initialMonthlyRent * 12) / propertyPrice) * 100;
    const initialNetCashFlow = initialMonthlyRent - monthlyExpenses;
    const initialNetCashFlowAfterEmi = initialMonthlyRent - monthlyExpenses - emi;

    const projectionData = [];
    let currentRent = initialMonthlyRent;
    let cumulativeRent = 0;
    let cumulativeEmi = 0;
    let cumulativeNetSurplus = 0;

    for (let year = 1; year <= 10; year++) {
      const annualRent = currentRent * 12;
      const annualEmi = emi * 12;
      const annualExpenses = monthlyExpenses * 12 * Math.pow(1.04, year - 1);

      cumulativeRent += annualRent;
      cumulativeEmi += annualEmi;
      const annualNetCashFlow = annualRent - annualExpenses - annualEmi;
      cumulativeNetSurplus += annualNetCashFlow;

      const estimatedValue = Math.round(propertyPrice * Math.pow(1.08, year));

      projectionData.push({
        year: `Yr ${year}`,
        annualRent: Math.round(annualRent),
        annualEmi: Math.round(annualEmi),
        netCashFlow: Math.round(annualNetCashFlow),
        cumulativeRent: Math.round(cumulativeRent),
        propertyValue: Math.round(estimatedValue),
      });

      currentRent = currentRent * (1 + annualEscalationPct / 100);
    }

    return {
      downPaymentAmount,
      loanAmount,
      emi,
      initialGrossYield,
      initialNetCashFlow,
      initialNetCashFlowAfterEmi,
      projectionData,
    };
  }, [
    propertyPrice,
    downPaymentPct,
    interestRatePct,
    loanTenureYears,
    initialMonthlyRent,
    annualEscalationPct,
    monthlyExpenses,
  ]);

  const loadPreset = (price: number, rent: number, exp: number) => {
    setPropertyPrice(price);
    setInitialMonthlyRent(rent);
    setMonthlyExpenses(exp);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-10 sm:py-12 text-[#1A1F2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#C9A45C]/25">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A45C] mb-1">
              Private Wealth Underwriting Desk
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1A2B] tracking-tight">
              Pre-Rented Yield & Mortgage Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
              Model Day-1 rental yields, debt service coverage, and 10-year compounding equity horizons.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-sans">
            <span className="text-xs text-slate-500 hidden sm:inline">Benchmark:</span>
            <button
              onClick={() => loadPreset(11500000, 35000, 5700)}
              className="px-3 py-1.5 text-xs rounded-xs bg-[#F7F3EC] border border-[#C9A45C]/35 hover:border-[#C9A45C] text-[#0E1A2B] font-medium"
            >
              Prestige Wildwood (₹1.15 Cr)
            </button>
            <button
              onClick={() => loadPreset(12500000, 40000, 5900)}
              className="px-3 py-1.5 text-xs rounded-xs bg-[#F7F3EC] border border-[#C9A45C]/35 hover:border-[#C9A45C] text-[#0E1A2B] font-medium"
            >
              Sobha Green Acres (₹1.25 Cr)
            </button>
            <button
              onClick={() => loadPreset(13500000, 45000, 6900)}
              className="px-3 py-1.5 text-xs rounded-xs bg-[#F7F3EC] border border-[#C9A45C]/35 hover:border-[#C9A45C] text-[#0E1A2B] font-medium"
            >
              Brigade Lakeview (₹1.35 Cr)
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-5 bg-[#F7F3EC] p-6 sm:p-7 rounded-sm border border-[#C9A45C]/35 space-y-6 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9A45C]/25">
              <span className="font-serif font-bold text-base text-[#0E1A2B] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#C9A45C]" />
                <span>Underwriting Parameters</span>
              </span>
              <button
                onClick={() => loadPreset(11500000, 35000, 5700)}
                className="text-xs text-slate-500 hover:text-[#C9A45C] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Input 1: Property Price */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E1A2B] mb-1.5">
                <span>Purchase Price</span>
                <span className="font-mono text-[#0E1A2B] tabular-nums font-bold">
                  {formatCurrencyValue(propertyPrice, currency)}
                </span>
              </div>
              <input
                type="range"
                min="9000000"
                max="30000000"
                step="250000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                className="w-full accent-[#0E1A2B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>₹90 L</span>
                <span>₹3.0 Cr</span>
              </div>
            </div>

            {/* Input 2: Down Payment */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E1A2B] mb-1.5">
                <span>Equity Down Payment ({downPaymentPct}%)</span>
                <span className="font-mono text-[#0E1A2B] tabular-nums">
                  {formatCurrencyValue(calculations.downPaymentAmount, currency)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 50].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDownPaymentPct(pct)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-all ${
                      downPaymentPct === pct
                        ? 'bg-[#0E1A2B] text-[#C9A45C] border-[#0E1A2B]'
                        : 'bg-transparent text-slate-600 border-[#C9A45C]/30 hover:border-[#C9A45C]'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Interest Rate & Tenure */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0E1A2B] mb-1">
                  Mortgage Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="6"
                    max="14"
                    value={interestRatePct}
                    onChange={(e) => setInterestRatePct(parseFloat(e.target.value) || 8.5)}
                    className="w-full bg-[#0E1A2B]/4 border border-[#C9A45C]/35 rounded-xs px-3 py-2 text-xs font-mono font-semibold text-[#0E1A2B] focus:outline-none focus:border-[#C9A45C]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    % p.a.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0E1A2B] mb-1">
                  Loan Tenure
                </label>
                <select
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(parseInt(e.target.value))}
                  className="w-full bg-[#0E1A2B]/4 border border-[#C9A45C]/35 rounded-xs px-3 py-2 text-xs text-[#0E1A2B] font-semibold focus:outline-none focus:border-[#C9A45C]"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                </select>
              </div>
            </div>

            {/* Input 4: Monthly Rent */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E1A2B] mb-1.5">
                <span>Contractual Monthly Rent</span>
                <span className="font-mono text-[#2E8B6E] tabular-nums font-bold">
                  {formatRent(initialMonthlyRent, currency)}
                </span>
              </div>
              <input
                type="range"
                min="25000"
                max="120000"
                step="1000"
                value={initialMonthlyRent}
                onChange={(e) => setInitialMonthlyRent(parseInt(e.target.value))}
                className="w-full accent-[#0E1A2B] cursor-pointer"
              />
            </div>

            {/* Input 5: Escalation & Expenses */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0E1A2B] mb-1">
                  Annual Escalator
                </label>
                <select
                  value={annualEscalationPct}
                  onChange={(e) => setAnnualEscalationPct(parseFloat(e.target.value))}
                  className="w-full bg-[#0E1A2B]/4 border border-[#C9A45C]/35 rounded-xs px-3 py-2 text-xs text-[#0E1A2B] font-semibold focus:outline-none focus:border-[#C9A45C]"
                >
                  <option value={4.0}>4% Standard</option>
                  <option value={5.0}>5% Bangalore Benchmark</option>
                  <option value={6.0}>6% Tech Corridor</option>
                  <option value={7.0}>7% High Demand</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0E1A2B] mb-1">
                  Monthly Deductions
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="500"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0E1A2B]/4 border border-[#C9A45C]/35 rounded-xs px-3 py-2 text-xs font-mono font-semibold text-[#0E1A2B] focus:outline-none focus:border-[#C9A45C]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    ₹/mo
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#C9A45C]/20 flex items-center justify-between text-xs text-slate-500">
              <span>Display currency:</span>
              <div className="flex gap-1">
                {(['INR', 'USD', 'AED'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 rounded-xs text-[11px] font-bold font-mono ${
                      currency === c
                        ? 'bg-[#0E1A2B] text-[#C9A45C]'
                        : 'bg-transparent text-slate-500 border border-[#C9A45C]/20 hover:border-[#C9A45C]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & 10-Yr Recharts Chart */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-sm bg-[#F7F3EC] border border-[#C9A45C]/35">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A45C] font-semibold block mb-1">Monthly Mortgage EMI</span>
                <span className="font-serif text-2xl font-bold text-[#0E1A2B] tabular-nums">
                  {formatRent(calculations.emi, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                  Principal: {formatCurrencyValue(calculations.loanAmount, currency)}
                </span>
              </div>

              <div className="p-4 rounded-sm bg-[#2E8B6E]/6 border border-[#2E8B6E]/30">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#2E8B6E] font-semibold block mb-1">Gross Yield</span>
                <span className="font-mono text-2xl font-bold text-[#2E8B6E] tabular-nums">
                  {formatYield(calculations.initialGrossYield)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                  Annual Rent: {formatCurrencyValue(initialMonthlyRent * 12, currency)}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-sm bg-[#0E1A2B] text-[#F7F3EC] border border-[#C9A45C]/35">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A45C] font-semibold block mb-1">Unlevered Surplus</span>
                <span className="font-serif text-2xl font-bold text-[#F7F3EC] tabular-nums">
                  {formatRent(calculations.initialNetCashFlow, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  After all society outflows
                </span>
              </div>
            </div>

            {/* 10-Year Compounding Projection Chart */}
            <div className="bg-[#F7F3EC] p-6 sm:p-7 rounded-sm border border-[#C9A45C]/35 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#C9A45C]/20">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#0E1A2B]">
                    10-Year Compounding Cash Flow Horizon
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Escalating rental inflows versus fixed mortgage servicing obligations
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#2E8B6E] bg-[#2E8B6E]/10 border border-[#2E8B6E]/30 px-2.5 py-1 rounded-xs font-mono">
                  +{annualEscalationPct}% Escalation
                </div>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.projectionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E8B6E" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#2E8B6E" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="emiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0E1A2B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0E1A2B" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#C9A45C" opacity={0.2} />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#0E1A2B', fontFamily: 'Manrope' }} axisLine={{ stroke: 'rgba(201, 164, 92, 0.3)' }} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#0E1A2B', fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val: any) => [formatCurrencyValue(Number(val), currency), '']}
                      contentStyle={{
                        backgroundColor: '#0E1A2B',
                        borderColor: 'rgba(201, 164, 92, 0.4)',
                        borderRadius: '2px',
                        color: '#F7F3EC',
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Area
                      type="monotone"
                      dataKey="annualRent"
                      name="Annual Rental Inflow"
                      stroke="#2E8B6E"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#rentGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="annualEmi"
                      name="Annual Loan Amortization (EMI)"
                      stroke="#0E1A2B"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#emiGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* 10-Yr Summary Table */}
              <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#C9A45C]/20 text-center text-xs font-sans">
                <div className="p-3 rounded-xs bg-[#0E1A2B]/4 border border-[#C9A45C]/20">
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">10-Yr Total Rent</span>
                  <strong className="text-[#2E8B6E] font-bold font-mono text-sm tabular-nums mt-0.5 block">
                    {formatCurrencyValue(
                      calculations.projectionData[9]?.cumulativeRent || 0,
                      currency
                    )}
                  </strong>
                </div>
                <div className="p-3 rounded-xs bg-[#0E1A2B]/4 border border-[#C9A45C]/20">
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">10-Yr Total EMI</span>
                  <strong className="text-[#0E1A2B] font-bold font-mono text-sm tabular-nums mt-0.5 block">
                    {formatCurrencyValue(calculations.emi * 120, currency)}
                  </strong>
                </div>
                <div className="p-3 rounded-xs bg-[#0E1A2B]/4 border border-[#C9A45C]/20">
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Estimated Asset Value</span>
                  <strong className="text-[#C9A45C] font-bold font-mono text-sm tabular-nums mt-0.5 block">
                    {formatCurrencyValue(
                      calculations.projectionData[9]?.propertyValue || 0,
                      currency
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {/* Note on NRE/NRO Bank Accounts */}
            <div className="p-4 rounded-sm bg-[#0E1A2B] text-[#F7F3EC] border border-[#C9A45C]/35 text-xs flex items-start gap-3 font-sans">
              <Sparkles className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#C9A45C]">NRI Mortgage Protocol:</strong> Major Indian institutional lenders (HDFC Bank, ICICI, SBI) sanction up to 75% LTV against pre-rented properties. Automated rental transfers directly to NRO accounts service mortgage covenants with complete tax compliance.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
