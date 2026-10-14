import React, { useState } from 'react';
import { InvestmentScoreDrivers } from '../../types/property';
import { Award, HelpCircle, X, ChevronRight, Building, MapPin, Users, Zap } from 'lucide-react';

interface InvestmentScoreBannerProps {
  score: InvestmentScoreDrivers;
}

export const InvestmentScoreBanner: React.FC<InvestmentScoreBannerProps> = ({ score }) => {
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);

  return (
    <>
      <div className="bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-8 text-[#F7F3EC] shadow-none">
        {/* Top bar with score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#C9A45C]/25">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-[#09111D] border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#C9A45C]">
                  Rentier Underwriting Score
                </span>
                <button
                  onClick={() => setShowMethodologyModal(true)}
                  className="text-slate-400 hover:text-[#C9A45C] transition-colors"
                  title="How this score is formulated"
                  aria-label="How this score works"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-base sm:text-lg font-serif font-semibold text-[#F7F3EC] tracking-wide mt-0.5">
                Composite Passive Yield & Liquidity Rating
              </h4>
            </div>
          </div>

          <div className="flex items-baseline gap-2 bg-[#09111D] px-5 py-2.5 rounded-xs border border-[#C9A45C]/30 self-start sm:self-auto font-mono">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A45C] tabular-nums">
              {score.overallScore.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-400">/ 10</span>
          </div>
        </div>

        {/* Breakdown of 4 core drivers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Driver 1 */}
          <div className="p-4 bg-[#09111D]/80 rounded-xs border border-[#C9A45C]/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Building className="w-3.5 h-3.5 text-[#C9A45C]" /> Developer Grade
              </span>
              <span className="font-bold text-[#F7F3EC] font-mono tabular-nums">{score.builderTierScore}/10</span>
            </div>
            <div className="text-xs font-semibold text-[#F7F3EC] mt-0.5">
              {score.builderTier}
            </div>
            <div className="w-full bg-[#142338] h-1 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-[#C9A45C] h-full"
                style={{ width: `${score.builderTierScore * 10}%` }}
              ></div>
            </div>
          </div>

          {/* Driver 2 */}
          <div className="p-4 bg-[#09111D]/80 rounded-xs border border-[#C9A45C]/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#2E8B6E]" /> Corridor Demand
              </span>
              <span className="font-bold text-[#F7F3EC] font-mono tabular-nums">{score.locationScore}/10</span>
            </div>
            <div className="text-xs font-semibold text-[#F7F3EC] mt-0.5 truncate">
              {score.locationCorridor}
            </div>
            <div className="w-full bg-[#142338] h-1 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-[#2E8B6E] h-full"
                style={{ width: `${score.locationScore * 10}%` }}
              ></div>
            </div>
          </div>

          {/* Driver 3 */}
          <div className="p-4 bg-[#09111D]/80 rounded-xs border border-[#C9A45C]/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Users className="w-3.5 h-3.5 text-[#C9A45C]" /> Tenant Stability
              </span>
              <span className="font-bold text-[#F7F3EC] font-mono tabular-nums">{score.tenantScore}/10</span>
            </div>
            <div className="text-xs font-semibold text-[#F7F3EC] mt-0.5 truncate">
              {score.tenantQuality}
            </div>
            <div className="w-full bg-[#142338] h-1 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-[#C9A45C] h-full"
                style={{ width: `${score.tenantScore * 10}%` }}
              ></div>
            </div>
          </div>

          {/* Driver 4 */}
          <div className="p-4 bg-[#09111D]/80 rounded-xs border border-[#C9A45C]/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Zap className="w-3.5 h-3.5 text-[#2E8B6E]" /> Re-Rental SLA
              </span>
              <span className="font-bold text-[#F7F3EC] font-mono tabular-nums">{score.liquidityScore}/10</span>
            </div>
            <div className="text-xs font-semibold text-[#F7F3EC] mt-0.5 truncate">
              {score.rentalLiquidity}
            </div>
            <div className="w-full bg-[#142338] h-1 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-[#2E8B6E] h-full"
                style={{ width: `${score.liquidityScore * 10}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Disclaimer strip */}
        <div className="mt-5 pt-4 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-sans">
          <span>
            *Indicative algorithmic benchmark synthesized from audited Sub-Registrar lease filings, tenant bank history, and corridor vacancy absorption.
          </span>
          <button
            onClick={() => setShowMethodologyModal(true)}
            className="text-[#C9A45C] hover:underline flex items-center gap-1"
          >
            <span>Underwriting Methodology</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Methodology Modal */}
      {showMethodologyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-8 text-[#F7F3EC] shadow-2xl">
            <button
              onClick={() => setShowMethodologyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xs text-slate-400 hover:text-[#C9A45C] hover:bg-[#142338] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-sm bg-[#09111D] border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#F7F3EC]">Underwriting Methodology</h3>
                <span className="text-xs text-[#C9A45C] font-mono">4-Pillar Algorithmic Framework</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3 bg-[#09111D] rounded-xs border border-[#C9A45C]/20">
                <strong className="text-[#F7F3EC] block mb-0.5">1. Builder Pedigree & Construction Quality (25%)</strong>
                Assesses execution reputation, Occupancy Certificate compliance, and durability of mechanical/civil infrastructure.
              </div>

              <div className="p-3 bg-[#09111D] rounded-xs border border-[#C9A45C]/20">
                <strong className="text-[#F7F3EC] block mb-0.5">2. Corridor Tech Density & Connectivity (25%)</strong>
                Evaluates pedestrian/short commute to tech business districts (ITPL, ETV, Manyata, Ecospace) and arterial metro lines.
              </div>

              <div className="p-3 bg-[#09111D] rounded-xs border border-[#C9A45C]/20">
                <strong className="text-[#F7F3EC] block mb-0.5">3. Tenant Solvency & Bank Ledger Audit (30%)</strong>
                Verifies past continuous tenure length, corporate employer capitalization, security deposit coverage, and 100% on-time bank debits.
              </div>

              <div className="p-3 bg-[#09111D] rounded-xs border border-[#C9A45C]/20">
                <strong className="text-[#F7F3EC] block mb-0.5">4. Re-Rental Liquidity SLA (20%)</strong>
                Calculates absorption velocity in the event of tenant relocation based on prevailing micro-market inventory churn.
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-400 italic">
              Disclaimers: The Rentier Underwriting Score is an analytical benchmark for comparative assessment and does not guarantee financial returns.
            </p>

            <button
              onClick={() => setShowMethodologyModal(false)}
              className="mt-6 w-full py-2.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs tracking-wide"
            >
              Acknowledged
            </button>
          </div>
        </div>
      )}
    </>
  );
};
