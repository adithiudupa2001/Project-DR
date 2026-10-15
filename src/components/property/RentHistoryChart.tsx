import React from 'react';
import { YearRentRecord } from '../../types/property';
import { formatINR } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

interface RentHistoryChartProps {
  rentalHistory: YearRentRecord[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomRentTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const rawVal = payload[0].value;
    return (
      <div
        className="font-sans"
        style={{
          backgroundColor: '#0E1A2B',
          border: '1px solid rgba(201,164,92,0.4)',
          borderRadius: '8px',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            color: '#C9A45C',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: '#F7F3EC',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: '14px',
            fontVariantNumeric: 'tabular-nums',
            fontWeight: 500,
          }}
        >
          Contractual rent: {formatINR(Number(rawVal))}/month
        </div>
      </div>
    );
  }
  return null;
};

export const RentHistoryChart: React.FC<RentHistoryChartProps> = ({ rentalHistory }) => {
  const chartData = rentalHistory.map((item) => ({
    year: item.year,
    monthlyRent: item.monthlyRent,
  }));

  const initialRent = rentalHistory[0]?.monthlyRent || 0;
  const currentRent = rentalHistory[rentalHistory.length - 1]?.monthlyRent || 0;
  const growthPct =
    initialRent > 0 ? Math.round(((currentRent - initialRent) / initialRent) * 100) : 0;
  const startYear = rentalHistory[0]?.year?.slice(0, 4) || '2022';

  return (
    <div className="bg-white border border-[#ECECE8] rounded-[12px] p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif font-semibold text-xl text-[#0E1A2B]">Rent history</h3>
        <span className="text-[14px] text-[#2E8B6E] font-medium">
          Up {growthPct}% since {startYear}
        </span>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECECE8" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
              axisLine={{ stroke: '#ECECE8' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 'auto']}
              tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomRentTooltip />}
              cursor={{ fill: 'rgba(201, 164, 92, 0.08)' }}
            />
            <Bar dataKey="monthlyRent" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === chartData.length - 1 ? '#2E8B6E' : '#0E1A2B'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
