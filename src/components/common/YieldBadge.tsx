import React from 'react';

interface YieldBadgeProps {
  grossYield: number;
  netYield?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const YieldBadge: React.FC<YieldBadgeProps> = ({
  grossYield,
  netYield,
  size = 'md',
  showLabel = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5 font-bold',
  };

  return (
    <div className="inline-flex items-baseline gap-1.5 font-mono">
      <span
        className={`inline-flex items-center font-bold rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 tabular-nums ${sizeClasses[size]}`}
      >
        <span>{grossYield.toFixed(1)}%</span>
        {showLabel && (
          <span className="text-[10px] uppercase font-sans font-semibold tracking-wider ml-1 opacity-80">
            Gross
          </span>
        )}
      </span>
      {netYield !== undefined && (
        <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          ({netYield.toFixed(1)}% net)
        </span>
      )}
    </div>
  );
};
