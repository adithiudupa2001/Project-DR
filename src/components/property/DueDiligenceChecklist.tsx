import React from 'react';
import { DueDiligenceItem } from '../../types/property';
import { ShieldCheck, CheckCircle2, FileText, Check } from 'lucide-react';

interface DueDiligenceChecklistProps {
  items: DueDiligenceItem[];
  reranumber?: string;
}

export const DueDiligenceChecklist: React.FC<DueDiligenceChecklistProps> = ({
  items,
  reranumber,
}) => {
  return (
    <div className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-sm p-6 sm:p-8 shadow-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#C9A45C]/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans">
              Forensic Diligence
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0E1A2B]">
              Rentier 5-Tier Title & Tenancy Audit
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#2E8B6E] bg-[#2E8B6E]/8 px-3 py-1 rounded-xs border border-[#2E8B6E]/30 font-sans">
          <Check className="w-3.5 h-3.5" />
          <span>All 5 Verification Pillars Cleared</span>
        </div>
      </div>

      {/* Items list */}
      <div className="divide-y divide-[#C9A45C]/15 pt-2 font-sans">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-start gap-3.5">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-[#2E8B6E]/12 text-[#2E8B6E] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#0E1A2B]">
                  {item.label}
                </span>
                <span className="text-[12px] font-mono text-[#4A5160] bg-[#0E1A2B]/5 px-2 py-0.5 rounded-xs border border-[#C9A45C]/20">
                  {item.verifier} · {item.verifiedDate}
                </span>
              </div>
              <p className="text-[13px] text-[#4A5160] mt-1 leading-relaxed">
                {item.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RERA and Encumbrance Note */}
      {reranumber && (
        <div className="mt-5 pt-4 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between text-[13px] text-[#4A5160] font-sans gap-2">
          <span className="flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5 text-[#8C6D2F]" />
            <span>Karnataka RERA Registration: <strong>{reranumber}</strong></span>
          </span>
          <span className="text-[13px] text-[#2E8B6E] font-medium">Encumbrance Form 15: Clean 30-yr Search</span>
        </div>
      )}
    </div>
  );
};
