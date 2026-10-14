import React from 'react';

interface StatCardProps {
  label: string;
  value: string | React.ReactNode;
  subValue?: string | React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'neutral' | 'red';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  variant = 'neutral',
  icon,
}) => {
  const borderStyles = {
    neutral: 'border-[#C9A45C]/25 bg-[#F7F3EC]',
    emerald: 'border-[#2E8B6E]/30 bg-[#2E8B6E]/6',
    blue: 'border-[#0E1A2B]/20 bg-[#0E1A2B]/4',
    amber: 'border-[#C9A45C]/40 bg-[#C9A45C]/8',
    red: 'border-[#B4483C]/30 bg-[#B4483C]/6',
  };

  const textStyles = {
    neutral: 'text-[#0E1A2B]',
    emerald: 'text-[#2E8B6E]',
    blue: 'text-[#0E1A2B]',
    amber: 'text-[#8C6D2F]',
    red: 'text-[#B4483C]',
  };

  return (
    <div className={`p-4 sm:p-5 rounded-sm border ${borderStyles[variant]} transition-all shadow-none`}>
      <div className="flex items-center justify-between gap-2 mb-2 font-sans">
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8C6D2F]">
          {label}
        </span>
        {icon && <span className="text-[#4A5160]">{icon}</span>}
      </div>
      <div className={`text-xl sm:text-2xl font-serif font-bold tracking-tight tabular-nums ${textStyles[variant]}`}>
        {value}
      </div>
      {subValue && (
        <div className="text-[13px] text-[#4A5160] mt-1 tabular-nums font-sans font-medium">
          {subValue}
        </div>
      )}
    </div>
  );
};
