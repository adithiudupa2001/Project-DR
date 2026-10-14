import { Currency } from '../types/property';

export const USD_EXCHANGE_RATE = 86.5; // 1 USD = 86.5 INR
export const AED_EXCHANGE_RATE = 23.55; // 1 AED = 23.55 INR

/**
 * Format an amount in INR with Indian comma groupings (e.g. 1,40,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  const parts = Math.round(amount).toString();
  // Standard Indian formatting: last 3 digits, then groups of 2
  const lastThree = parts.substring(parts.length - 3);
  const otherNumbers = parts.substring(0, parts.length - 3);
  const formatted = otherNumbers !== '' ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree : lastThree;
  return `₹${formatted}`;
}

/**
 * Format property price into Crores / Lakhs
 * e.g. 11500000 -> "₹1.15 Cr", 8500000 -> "₹85 L"
 */
export function formatPriceINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  }
  const lakh = (amount / 100000).toFixed(1).replace(/\.0$/, '');
  return `₹${lakh} L`;
}

/**
 * Convert and format according to selected currency
 */
export function formatCurrencyValue(amountInINR: number, currency: Currency): string {
  if (currency === 'USD') {
    const usd = Math.round(amountInINR / USD_EXCHANGE_RATE);
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(2)}M`;
    }
    return `$${usd.toLocaleString('en-US')}`;
  }
  if (currency === 'AED') {
    const aed = Math.round(amountInINR / AED_EXCHANGE_RATE);
    if (aed >= 1000000) {
      return `AED ${(aed / 1000000).toFixed(2)}M`;
    }
    return `AED ${aed.toLocaleString('en-US')}`;
  }
  return formatPriceINR(amountInINR);
}

/**
 * Format monthly rent with currency
 */
export function formatRent(amountInINR: number, currency: Currency = 'INR'): string {
  if (currency === 'USD') {
    const usd = Math.round(amountInINR / USD_EXCHANGE_RATE);
    return `$${usd.toLocaleString('en-US')}/mo`;
  }
  if (currency === 'AED') {
    const aed = Math.round(amountInINR / AED_EXCHANGE_RATE);
    return `AED ${aed.toLocaleString('en-US')}/mo`;
  }
  return `${formatINR(amountInINR)}/mo`;
}

/**
 * Yield percentage formatter
 */
export function formatYield(pct: number): string {
  return `${pct.toFixed(1)}%`;
}

/**
 * Gross yield calculation footnote
 */
export const GROSS_YIELD_FOOTNOTE =
  'Gross yield = annual rent ÷ price, before property tax and maintenance.';

export const DISCLAIMER_NOTE =
  'Sample data for demonstration. All scores, yield metrics, and liquidity projections are indicative estimates based on past tenancies and verified market benchmarks.';
