export type SubscriptionTier = 'free' | 'investor' | 'pro';

export type Currency = 'INR' | 'USD' | 'AED';

export type TenantCategory = 
  | 'IT Senior Executive'
  | 'IT / Tech Professional'
  | 'Corporate Leadership'
  | 'Consulting / Finance'
  | 'Doctor / Healthcare'
  | 'MNC Expatriate'
  | 'Startup Founder';

export type TenantFamilyType = 'Family' | 'Couple' | 'Company Lease' | 'Single Professional';

export interface YearRentRecord {
  year: string;
  monthlyRent: number;
  annualEscalationPct?: number;
  occupancyMonths: number; // e.g. 12
  vacancyGapsDays: number;
}

export interface TenantProfile {
  category: TenantCategory;
  familyType: TenantFamilyType;
  foodPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Flexible';
  hasPets: boolean;
  tenureStartFormatted: string; // e.g., "Mar 2022 (3+ yrs)"
  tenureMonths: number;
  leaseExpiryDate: string; // e.g., "Feb 2026"
  remainingMonths: number;
  lockInPeriodMonths: number;
  noticePeriodMonths: number;
  securityDeposit: number; // in rupees
  companySector?: string;
  paymentReliabilityPct: number; // e.g. 100% on-time record
}

export interface DueDiligenceItem {
  id: string;
  label: string;
  verified: boolean;
  verifier: string; // e.g., "Rentier Legal Desk", "BBMP Portal", "Audit Partner"
  verifiedDate: string;
  note: string;
}

export interface InvestmentScoreDrivers {
  builderTier: string; // "Tier-1 Prestige Group"
  builderTierScore: number; // out of 10
  locationCorridor: string; // "Whitefield IT Corridor"
  locationScore: number;
  tenantQuality: string; // "3+ Years High-Income IT Tenant"
  tenantScore: number;
  rentalLiquidity: string; // "<15 days average re-rental SLA"
  liquidityScore: number;
  overallScore: number; // e.g. 8.2
}

export interface PropertyExpenses {
  societyMaintenance: number; // monthly
  propertyTaxEstimate: number; // monthly share
  buildingInsurance: number; // monthly share
  managementProvision: number; // monthly share
  totalMonthlyExpenses: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  developer: string;
  developerTier: 'Tier-1' | 'Tier-2';
  corridor: string; // e.g., "Whitefield", "Sarjapur Road", "Hebbal"
  city: string; // "Bengaluru"
  microMarket: string; // e.g., "Channasandra Main Rd, Whitefield"
  bhk: number; // 2, 3, 4
  bhkLabel: string; // "2 BHK Luxury"
  superBuiltUpSqft: number;
  carpetAreaSqft: number;
  tower: string; // "Tower B"
  floor: number;
  totalFloors: number;
  buildingAgeYears: number;
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  facing: 'East' | 'North' | 'North-East' | 'West';
  carParking: number;
  
  // Financials
  price: number; // In Rupees (e.g. 11500000 = 1.15 Cr)
  priceInCrFormatted: string; // "₹1.15 Cr"
  monthlyRent: number; // In Rupees (e.g. 35000)
  grossYieldPct: number; // e.g. 3.7
  netYieldPct: number; // e.g. 3.1
  expenses: PropertyExpenses;
  netMonthlyCashFlow: number; // monthlyRent - totalMonthlyExpenses

  // Status & Badges
  status: 'Verified (3+ yrs)' | 'Active Lease' | 'Under Offer';
  isTenantOccupied: boolean;
  isVerifiedRent: boolean;
  yearsRentDocumented: number; // 3, 4, 5
  isExclusiveListing: boolean;

  // Tenant & History
  tenant: TenantProfile;
  rentalHistory: YearRentRecord[];

  // Audit & Score
  dueDiligence: DueDiligenceItem[];
  score: InvestmentScoreDrivers;

  // Media
  primaryImage: string;
  galleryImages: string[];
  amenities: string[];
  description: string;
  possessionYear: number;
  reranumber: string;
}

export interface FilterState {
  city: string;
  corridor: string;
  maxBudgetCr: number;
  minBudgetCr: number;
  bhk: string; // 'all', '2', '3', '4'
  minGrossYield: number; // 0, 3.5, 3.8, 4.0
  tenantType: string; // 'all', 'Family', 'Couple', 'Company Lease'
  vegOnly: boolean;
  minTenureYears: number; // 0, 1, 2, 3
  developerTier: string; // 'all', 'Tier-1', 'Tier-2'
  minScore: number; // 0, 7.5, 8.0, 8.5
  verifiedOnly: boolean;
  searchQuery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  isNri: boolean;
  country: string;
  tier: SubscriptionTier;
  avatar?: string;
}
