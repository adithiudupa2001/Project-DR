import React from 'react';
import { PropertyExpenses } from '../../types/property';
import { formatINR } from '../../utils/formatters';
import { ArrowDownRight, Wallet } from 'lucide-react';

interface CostBreakdownPanelProps {
  grossMonthlyRent: number;
  expenses: PropertyExpenses;
  netCashFlow: number;
}

export const CostBreakdownPanel: React.FC<CostBreakdownPanelProps> = ({
  grossMonthlyRent,
  expenses,
  netCashFlow,
}) => {
  return (
    <div className="bg-[#F7F3EC] border border-[#C9A45C]/35 rounded-sm p-6 sm:p-8 shadow-none">
      <div className="flex items-center justify-between pb-5 border-b border-[#C9A45C]/25">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C6D2F] font-sans">
            Cash Flow Audit
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0E1A2B]">
            Net Monthly Cash Flow Ledger
          </h3>
          <p className="text-[13px] text-[#4A5160] mt-0.5 font-sans">
            Real in-pocket surplus after all recurring maintenance and tax deductions
          </p>
        </div>
        <div className="w-10 h-10 rounded-sm bg-[#0E1A2B] text-[#C9A45C] border border-[#C9A45C]/30 flex items-center justify-center">
          <Wallet className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4 pt-5 text-xs font-sans">
        {/* Gross Rent Inflow */}
        <div className="flex items-center justify-between py-1 text-[#0E1A2B]">
          <span className="font-semibold text-sm">Contractual Monthly Rent (Gross Inflow)</span>
          <span className="font-mono font-bold text-[#2E8B6E] tabular-nums text-base">
            +{formatINR(grossMonthlyRent)}
          </span>
        </div>

        {/* Expenses List in Muted Brick #B4483C */}
        <div className="p-4 bg-[#B4483C]/6 rounded-xs border border-[#B4483C]/25 space-y-2.5">
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#B4483C] flex items-center gap-1.5">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Recurring Outflows & Amortised Reserves</span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#4A5160]">
            <span>Society Maintenance & Common Service Charges</span>
            <span className="font-mono text-[#B4483C] tabular-nums font-semibold">
              -{formatINR(expenses.societyMaintenance)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#4A5160]">
            <span>Municipal BBMP Property Tax Amortisation</span>
            <span className="font-mono text-[#B4483C] tabular-nums font-semibold">
              -{formatINR(expenses.propertyTaxEstimate)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#4A5160]">
            <span>Comprehensive Building Fire & Hazard Insurance</span>
            <span className="font-mono text-[#B4483C] tabular-nums font-semibold">
              -{formatINR(expenses.buildingInsurance)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#4A5160]">
            <span>Professional Asset Management Contingency Reserve</span>
            <span className="font-mono text-[#B4483C] tabular-nums font-semibold">
              -{formatINR(expenses.managementProvision)}
            </span>
          </div>

          <div className="pt-2 border-t border-[#B4483C]/20 flex items-center justify-between font-bold text-[#B4483C] text-[13px]">
            <span>Total Monthly Outflows</span>
            <span className="font-mono tabular-nums">
              -{formatINR(expenses.totalMonthlyExpenses)}
            </span>
          </div>
        </div>

        {/* Resulting Net Cash Flow */}
        <div className="p-4 bg-[#2E8B6E]/8 rounded-xs border border-[#2E8B6E]/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#2E8B6E]">
              Day-1 Net Passive Cash Flow
            </div>
            <div className="text-[13px] text-[#4A5160] mt-0.5">
              Net surplus credited directly to domestic or NRO account
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold text-lg sm:text-xl text-[#2E8B6E] tabular-nums">
              {formatINR(netCashFlow)}/mo
            </div>
            <div className="text-[12px] text-[#4A5160] font-mono">
              ₹{(netCashFlow * 12).toLocaleString('en-IN')}/year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
