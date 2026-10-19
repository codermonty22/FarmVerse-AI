export type Language = 'en' | 'mr' | 'hi';

export type LandUnit = 'Acres' | 'Hectares' | 'Guntha';

export type SoilType =
  | 'Black Soil (Regur)'
  | 'Alluvial Soil'
  | 'Red & Laterite Soil'
  | 'Sandy Loam'
  | 'Clayey Loam'
  | 'Saline / Alkaline';

export type WaterAvailability =
  | 'Abundant (Canal/Well 24x7)'
  | 'Moderate (Borewell/Drip)'
  | 'Limited (Rainfed / Seasonal)'
  | 'Critical / Drought Prone';

export type Season = 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)' | 'Perennial / All Season';

export interface FarmerProfile {
  name: string;
  phone?: string;
  state: string;
  district: string;
  village: string;
  landSize: number;
  landUnit: LandUnit;
  soilType: SoilType;
  waterAvailability: WaterAvailability;
  budgetRange: 'Low (< ₹25k/acre)' | 'Medium (₹25k - ₹60k/acre)' | 'High (> ₹60k/acre)';
  farmingExperience: 'Beginner (< 3 yrs)' | 'Intermediate (3-10 yrs)' | 'Expert (> 10 yrs)';
  machineryAvailable: string[];
  preferredLanguage: Language;
  cropsGrown: string[];
  isOnboarded: boolean;
}

export interface CropRecommendation {
  id: string;
  cropName: string;
  cropNameLocal: { mr: string; hi: string };
  category: 'Cereal' | 'Pulse' | 'Cash Crop' | 'Oilseed' | 'Horticulture' | 'Vegetable';
  suitabilityScore: number; // e.g. 96
  season: Season[];
  soilMatch: string;
  waterNeed: 'Low' | 'Medium' | 'High';
  estimatedCostPerAcre: number;
  potentialReturnPerAcre: number;
  growthDurationDays: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  whySuitable: string[];
  keyRisks: string[];
  marketDemand: 'High' | 'Very High' | 'Moderate';
  yieldQuintalPerAcre: number;
  suggestedVarieties: string[];
  fertilizerNPK: string;
  wasteToWealthPotential: string;
  imageUrl: string;
}

export interface DiseaseDetectionResult {
  id: string;
  cropName: string;
  leafImageUrl: string;
  suspectedIssue: string;
  isHealthy: boolean;
  confidence: number; // e.g. 94.2
  severity: 'Mild' | 'Moderate' | 'Severe' | 'None';
  symptoms: string[];
  immediateActions: string[];
  organicTreatments: string[];
  chemicalTreatments: string[];
  preventiveMeasures: string[];
  expertWarning: string;
  timestamp: string;
}

export interface MarketPriceItem {
  id: string;
  commodity: string;
  commodityLocal: { mr: string; hi: string };
  category: string;
  mandi: string;
  district: string;
  state: string;
  modalPrice: number; // Rs per Quintal
  minPrice: number;
  maxPrice: number;
  mspPrice?: number; // Minimum Support Price if applicable
  unit: string;
  changePercent: number; // e.g. +3.4% or -1.2%
  trend: 'up' | 'down' | 'stable';
  dailyArrivalTonnes: number;
  historicalPrices: { date: string; price: number }[];
  marketOutlook: 'Bullish' | 'Stable' | 'Bearish';
  lastUpdated: string;
}

export interface FarmBusinessPlan {
  id: string;
  planName: string;
  cropName: string;
  landSize: number;
  landUnit: LandUnit;
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  irrigationCost: number;
  machineryCost: number;
  transportCost: number;
  contingencyPercent: number;
  expectedYieldQuintals: number;
  sellingPricePerQuintal: number;
  totalCost: number;
  grossRevenue: number;
  netProfit: number;
  roiPercent: number;
  breakEvenPricePerQuintal: number;
  scenarioAlternatives: {
    scenario: 'Conservative (-20% yield)' | 'Expected' | 'Optimistic (+20% price)';
    yieldQtl: number;
    pricePerQtl: number;
    profit: number;
  }[];
  createdAt: string;
}

export interface WasteToWealthItem {
  id: string;
  cropSource: string;
  residueType: string;
  productIdea: string;
  processingDifficulty: 'Simple (Farm-level)' | 'Medium (Village unit)' | 'Advanced (Industrial)';
  indicativeInvestment: string;
  potentialBuyersCategories: string[];
  marketValueEst: string;
  keyEquipment: string[];
  practicalSteps: string[];
  co2Benefit: string;
  tags: string[];
}

export interface GovtScheme {
  id: string;
  title: string;
  titleLocal: { mr: string; hi: string };
  category: 'Financial Grant' | 'Crop Insurance' | 'Irrigation Subsidy' | 'Organic Farming' | 'Solar & Machinery';
  authority: string;
  eligibility: string[];
  benefits: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  officialPortalUrl: string;
  lastVerifiedDate: string;
  status: 'Active' | 'Upcoming' | 'Ongoing';
}

export interface IndustryBuyer {
  id: string;
  companyName: string;
  type: 'Agri-Processing Startup' | 'Biofuel Plant' | 'Farmer Producer Co (FPO)' | 'Organic Exporter' | 'Textile Manufacturer';
  commoditiesWanted: string[];
  state: string;
  district: string;
  minVolume: string;
  pricingTerm: 'Spot Cash' | 'Contract Farming' | 'Mandi Linked';
  contactPerson: string;
  phonePlaceholder: string;
  verifiedFPO: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  moduleShortcut?: {
    tabId: string;
    label: string;
  };
}
