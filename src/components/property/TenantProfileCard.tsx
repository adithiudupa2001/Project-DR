import React from 'react';
import { TenantProfile } from '../../types/property';
import { formatINR } from '../../utils/formatters';
import { UserCheck, Shield, Calendar, Clock, DollarSign, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface TenantProfileCardProps {
  tenant: TenantProfile;
}

export const TenantProfileCard: React.FC<TenantProfileCardProps> = ({ tenant }) => {
  return (
    <div className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-sm p-6 sm:p-8 shadow-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#C9A45C]/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]/30 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans">
              Institutional Vetting
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0E1A2B]">
              Tenant Integrity & Solvency Profile
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#2E8B6E] bg-[#2E8B6E]/8 border border-[#2E8B6E]/30 px-3 py-1 rounded-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active Day-1 Contract Verified</span>
        </div>
      </div>

      {/* Primary Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 py-5 border-b border-[#C9A45C]/20 text-xs font-sans">
        <div>
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#8C6D2F] block mb-1 font-semibold">
            Profession & Industry
          </span>
          <strong className="text-[#0E1A2B] font-semibold block text-sm">
            {tenant.category}
          </strong>
          {tenant.companySector && (
            <span className="text-[13px] text-[#4A5160] truncate block mt-0.5">
              {tenant.companySector}
            </span>
          )}
        </div>

        <div>
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#8C6D2F] block mb-1 font-semibold">
            Household Structure
          </span>
          <strong className="text-[#0E1A2B] font-semibold block text-sm">
            {tenant.familyType}
          </strong>
          <span className="text-[13px] text-[#4A5160] mt-0.5 block">
            {tenant.foodPreference} · {tenant.hasPets ? 'Has pets' : 'No pets'}
          </span>
        </div>

        <div>
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#8C6D2F] block mb-1 font-semibold">
            Continuous Residency
          </span>
          <strong className="text-[#2E8B6E] font-semibold block text-sm">
            {tenant.tenureStartFormatted}
          </strong>
          <span className="text-[13px] text-[#4A5160] mt-0.5 block">
            {tenant.tenureMonths} uninterrupted billing cycles
          </span>
        </div>
      </div>

      {/* Lease Terms & Security Deposit */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 text-xs">
        <div className="p-3.5 bg-[#0E1A2B]/4 border border-[#C9A45C]/20 rounded-xs">
          <div className="flex items-center gap-1.5 text-[#4A5160] mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#8C6D2F]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Lease Expiry</span>
          </div>
          <div className="font-semibold text-[#0E1A2B] text-sm">
            {tenant.leaseExpiryDate}
          </div>
          <span className="text-[13px] text-[#4A5160]">{tenant.remainingMonths} mo term horizon</span>
        </div>

        <div className="p-3.5 bg-[#0E1A2B]/4 border border-[#C9A45C]/20 rounded-xs">
          <div className="flex items-center gap-1.5 text-[#4A5160] mb-1">
            <Clock className="w-3.5 h-3.5 text-[#8C6D2F]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Lock-in Clause</span>
          </div>
          <div className="font-semibold text-[#0E1A2B] text-sm">
            {tenant.lockInPeriodMonths} Months
          </div>
          <span className="text-[13px] text-[#4A5160]">Legal forfeiture covenant</span>
        </div>

        <div className="p-3.5 bg-[#0E1A2B]/4 border border-[#C9A45C]/20 rounded-xs">
          <div className="flex items-center gap-1.5 text-[#4A5160] mb-1">
            <HeartHandshake className="w-3.5 h-3.5 text-[#8C6D2F]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Notice Window</span>
          </div>
          <div className="font-semibold text-[#0E1A2B] text-sm">
            {tenant.noticePeriodMonths} Months
          </div>
          <span className="text-[13px] text-[#4A5160]">Structured replacement period</span>
        </div>

        <div className="p-3.5 bg-[#0E1A2B]/4 border border-[#C9A45C]/20 rounded-xs">
          <div className="flex items-center gap-1.5 text-[#4A5160] mb-1">
            <DollarSign className="w-3.5 h-3.5 text-[#8C6D2F]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Escrow Deposit</span>
          </div>
          <div className="font-bold text-[#0E1A2B] tabular-nums text-sm font-mono">
            {formatINR(tenant.securityDeposit)}
          </div>
          <span className="text-[13px] text-[#2E8B6E] font-medium">Reassigned at conveyance</span>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="mt-5 pt-4 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between text-[13px] text-[#4A5160] font-sans gap-2">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#2E8B6E]" />
          <span>Payment Performance: <strong className="text-[#0E1A2B] font-mono">{tenant.paymentReliabilityPct}% on-time automated bank debits</strong></span>
        </span>
        <span className="italic text-[#4A5160]">Anonymised under Rentier Confidentiality Framework</span>
      </div>
    </div>
  );
};
