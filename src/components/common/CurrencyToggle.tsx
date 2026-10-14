import React from 'react';
import { useApp } from '../../context/AppContext';
import { Currency } from '../../types/property';

export const CurrencyToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currency, setCurrency } = useApp();

  const currencies: { id: Currency; symbol: string; label: string }[] = [
    { id: 'INR', symbol: '₹', label: 'INR' },
    { id: 'USD', symbol: '$', label: 'USD' },
    { id: 'AED', symbol: 'AED', label: 'AED' },
  ];

  return (
    <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      {currencies.map((c) => {
        const isActive = currency === c.id;
        return (
          <button
            key={c.id}
            onClick={() => setCurrency(c.id)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              isActive
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {compact ? c.symbol : `${c.symbol} ${c.label}`}
          </button>
        );
      })}
    </div>
  );
};
