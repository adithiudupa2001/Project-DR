import React from 'react';
import { TenantProfile } from '../../types/property';
import { Clock } from 'lucide-react';

interface LeaseTimelineProps {
  tenant: TenantProfile;
}

export const LeaseTimeline: React.FC<LeaseTimelineProps> = ({ tenant }) => {
  return (
    <div className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-sm p-6 sm:p-8 shadow-none">
      <div className="flex items-center justify-between pb-5 border-b border-[#C9A45C]/25">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans">
            Continuity Horizon
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0E1A2B]">
            Lease Continuity & Lock-in Schedule
          </h3>
          <p className="text-[13px] text-[#4A5160] mt-0.5 font-sans">
            Current contractual term, lock-in covenant, and agreed escalation
          </p>
        </div>
        <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]/30 flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      <div className="py-5 font-sans">
        {/* Timeline Bar */}
        <div className="relative">
          <div className="h-2 bg-[#0E1A2B]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E8B6E] rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (tenant.tenureMonths / (tenant.tenureMonths + tenant.remainingMonths)) * 100
                )}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between items-start text-xs pt-3.5">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#8C6D2F] block">
                Inception
              </span>
              <span className="font-semibold text-[#0E1A2B] text-sm">
                {tenant.tenureStartFormatted.split('(')[0]}
              </span>
              <span className="text-[13px] text-[#2E8B6E] block font-medium">3+ Yrs Audited</span>
            </div>

            <div className="text-center">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#8C6D2F] block">
                Active Term
              </span>
              <span className="font-bold text-[#0E1A2B] bg-[#0E1A2B]/6 px-2.5 py-0.5 rounded-xs text-[12px] font-mono border border-[#C9A45C]/25 inline-block mt-0.5">
                {tenant.remainingMonths} Mo Remaining
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#8C6D2F] block">
                Term Maturity
              </span>
              <span className="font-semibold text-[#0E1A2B] text-sm">
                {tenant.leaseExpiryDate}
              </span>
              <span className="text-[13px] text-[#4A5160] block font-mono">
                +5% Escalation Covenants
              </span>
            </div>
          </div>
        </div>

        {/* Lock-in details cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-5 border-t border-[#C9A45C]/20 text-xs">
          <div className="p-3 bg-[#0E1A2B]/4 rounded-xs border border-[#C9A45C]/20">
            <div className="text-[#8C6D2F] text-[11px] font-semibold uppercase tracking-wider mb-1">
              Active Lock-in Clause
            </div>
            <div className="text-[13px] text-[#4A5160]">
              The tenant is under a <strong>{tenant.lockInPeriodMonths}-month binding lock-in period</strong> with forfeit of security deposit upon premature vacation.
            </div>
          </div>

          <div className="p-3 bg-[#0E1A2B]/4 rounded-xs border border-[#C9A45C]/20">
            <div className="text-[#8C6D2F] text-[11px] font-semibold uppercase tracking-wider mb-1">
              Notice & Reassignment Protocol
            </div>
            <div className="text-[13px] text-[#4A5160]">
              Mandatory <strong>{tenant.noticePeriodMonths}-month formal written notice</strong> allows Rentier to pre-market or execute renewal seamlessly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
