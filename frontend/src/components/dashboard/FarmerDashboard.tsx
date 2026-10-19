import React from 'react';
import {
  Sprout,
  ShieldAlert,
  TrendingUp,
  FileSpreadsheet,
  Recycle,
  Landmark,
  Building2,
  BotMessageSquare,
  ArrowRight,
  Droplet,
  MapPin,
  Calendar,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Layers,
  Wrench,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { FarmerProfile, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { CROPS_CATALOG, MANDI_PRICES } from '../../data/mockData';

interface Props {
  profile: FarmerProfile;
  lang: Language;
  onNavigate: (tabId: string) => void;
  onEditProfile: () => void;
  onOpenMethodology: () => void;
}

export const FarmerDashboard: React.FC<Props> = ({
  profile,
  lang,
  onNavigate,
  onEditProfile,
  onOpenMethodology,
}) => {
  const t = translations[lang];

  const topCrop = CROPS_CATALOG[0]; // Red Onion
  const topMandi = MANDI_PRICES[0]; // Lasalgaon Onion

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section: Personalized Greeting & Farm Context Card */}
      <div className="neo-card bg-[#245638] text-white p-5 sm:p-7 rounded-2xl relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-6">
          <Sprout className="w-56 h-56 text-[#E8B65C]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="neo-badge bg-[#E8B65C] text-[#202820] font-black text-xs">
                Active Farm Context
              </span>
              <span className="text-xs text-[#DDEBD7] font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.village}, {profile.district}, {profile.state}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#F7F5EB] tracking-tight">
              {t.welcomeBack}, {profile.name || 'Farmer'}
            </h1>

            <p className="text-xs sm:text-sm text-[#DDEBD7] leading-relaxed">
              Your FarmVerse AI decision cockpit is configured for{' '}
              <strong className="text-white">{profile.landSize} {profile.landUnit}</strong> of{' '}
              <strong className="text-white">{profile.soilType}</strong> with{' '}
              <strong className="text-white">{profile.waterAvailability.split(' ')[0]}</strong> water.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('recommendation')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#E8B65C] text-[#202820] font-black text-sm rounded-xl hover:bg-[#ffc966] transition-all border-2 border-[#202820] shadow-[3px_3px_0px_#202820] active:translate-x-0.5 active:translate-y-0.5"
            >
              <Sprout className="w-5 h-5 text-[#245638]" />
              <span>{t.getRecommendationCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onEditProfile}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-[#F7F5EB] font-bold text-xs rounded-xl border border-white/30 transition-colors"
            >
              <span>Edit Farm Context</span>
            </button>
          </div>
        </div>

        {/* Tactile Farm At-a-Glance Badges */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20">
          <div className="bg-black/20 p-2.5 rounded-lg border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#DDEBD7] block">
              {t.landContext}
            </span>
            <span className="text-sm font-black text-white">
              {profile.landSize} {profile.landUnit}
            </span>
          </div>

          <div className="bg-black/20 p-2.5 rounded-lg border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#DDEBD7] block">
              {t.soilContext}
            </span>
            <span className="text-sm font-black text-white truncate block">
              {profile.soilType.split(' ')[0]}
            </span>
          </div>

          <div className="bg-black/20 p-2.5 rounded-lg border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#DDEBD7] block">
              {t.waterContext}
            </span>
            <span className="text-sm font-black text-white truncate block">
              {profile.waterAvailability.split('(')[0]}
            </span>
          </div>

          <div className="bg-black/20 p-2.5 rounded-lg border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#DDEBD7] block">
              Capital Budget
            </span>
            <span className="text-sm font-black text-white truncate block">
              {profile.budgetRange.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Context Highlights (Mandi Price + Seasonal Alert) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mandi Rate Flash Card */}
        <div className="neo-card p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-[#245638] bg-[#DDEBD7] px-2 py-0.5 rounded border border-[#245638]/40">
              Nearby Mandi Snapshot
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold">
              {topMandi.lastUpdated}
            </span>
          </div>

          <div>
            <h3 className="font-black text-base text-[#202820] flex items-center justify-between">
              <span>{topMandi.commodity}</span>
              <span className="text-[#245638] font-black">₹{topMandi.modalPrice}/Qtl</span>
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              {topMandi.mandi} ({topMandi.district})
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              +{topMandi.changePercent}% today
            </span>
            <button
              onClick={() => onNavigate('market')}
              className="text-[#245638] font-black hover:underline flex items-center gap-1"
            >
              <span>View Mandi Trends</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Seasonal Agronomic Advisory */}
        <div className="neo-card p-4 rounded-xl flex flex-col justify-between bg-[#F7F5EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-amber-900 bg-[#E8B65C]/30 px-2 py-0.5 rounded border border-amber-600/40">
              Rabi Sowing Advisory
            </span>
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
          </div>

          <div>
            <h3 className="font-black text-sm text-[#202820]">
              Optimal Time for Onion &amp; Gram Sowing
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-snug">
              Soil moisture is primed. Treat seeds with Trichoderma @ 5g/kg to prevent root rot.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-xs text-neutral-600 font-medium">KVK Nashik Guidelines</span>
            <button
              onClick={() => onNavigate('recommendation')}
              className="text-[#245638] font-black hover:underline flex items-center gap-1"
            >
              <span>Explore Varieties</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rapid Plant Health Check Alert */}
        <div className="neo-card p-4 rounded-xl flex flex-col justify-between border-2 border-[#202820]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-300">
              Crop Doctor AI
            </span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>

          <div>
            <h3 className="font-black text-sm text-[#202820]">
              Noticed Leaf Spots or Yellowing?
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-snug">
              Upload a clear leaf photo for instant simulated disease diagnosis and organic remedies.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-xs text-neutral-500">Camera or Gallery</span>
            <button
              onClick={() => onNavigate('disease')}
              className="text-[#245638] font-black hover:underline flex items-center gap-1"
            >
              <span>Scan Leaf Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of the Core System Modules */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg font-black text-[#202820] tracking-tight">
              {t.quickActions}
            </h2>
            <p className="text-xs text-neutral-600">
              Explore data-driven tools designed to increase farm profitability and reduce waste.
            </p>
          </div>
          <button
            onClick={onOpenMethodology}
            className="text-xs font-bold text-[#245638] hover:underline flex items-center gap-1"
          >
            <span>View 12 Modules Architecture</span>
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. Crop Recommendation */}
          <div
            onClick={() => onNavigate('recommendation')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#DDEBD7] text-[#245638] flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-[#245638] group-hover:text-white transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 01 &bull; ML
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-[#245638] transition-colors">
                  {t.cropRecommendation}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  Random Forest multi-parameter matching on soil, water &amp; budget.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[#245638] font-bold">
              <span>Find Best Crop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Disease Detection */}
          <div
            onClick={() => onNavigate('disease')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 09 &bull; CNN
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-red-700 transition-colors">
                  {t.diseaseDetection}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  Leaf image diagnostics with university-verified organic solutions.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-red-700 font-bold">
              <span>Upload / Diagnose</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Market Intelligence */}
          <div
            onClick={() => onNavigate('market')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 06 &bull; Time-Series
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-blue-700 transition-colors">
                  {t.marketIntelligence}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  Daily APMC mandi prices, arrivals, price trends &amp; market outlook.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-blue-700 font-bold">
              <span>Explore Mandis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Business Planner & Profit Calculator */}
          <div
            onClick={() => onNavigate('planner')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8B65C]/30 text-[#202820] flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-[#E8B65C] transition-colors">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 05 &bull; 12
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-[#245638] transition-colors">
                  {t.businessPlanner}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  Deterministic profit calculator, break-even cost, and risk scenarios.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[#245638] font-bold">
              <span>Calculate Profits</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. Waste to Wealth */}
          <div
            onClick={() => onNavigate('waste')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 04 &bull; Circular
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-emerald-800 transition-colors">
                  {t.wasteToWealth}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  Monetize crop residues: cotton stalks, bagasse, paddy stubble.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-emerald-800 font-bold">
              <span>Monetize Residues</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Government Schemes */}
          <div
            onClick={() => onNavigate('schemes')}
            className="neo-card neo-card-hover p-4 rounded-xl cursor-pointer bg-white group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center border-2 border-[#202820] flex-shrink-0 group-hover:bg-[#245638] group-hover:text-white transition-colors">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  Module 11 &bull; Subsidies
                </span>
                <h3 className="font-bold text-sm text-[#202820] group-hover:text-[#245638] transition-colors">
                  {t.govtSchemes}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                  PM-KISAN, Drip Subsidy (55-80%), Solar Pump &amp; AIF Low-Interest Loans.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[#245638] font-bold">
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Assistant Teaser Card */}
      <div className="neo-card bg-[#DDEBD7] border-2 border-[#245638] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#245638] text-[#E8B65C] flex items-center justify-center border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex-shrink-0">
            <BotMessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-base text-[#202820]">
              {t.talkToAiCta} (मराठी, हिन्दी, English)
            </h3>
            <p className="text-xs text-[#245638] font-medium leading-relaxed">
              Ask questions about fertilizer application schedules, organic pest recipes, or mandi trends.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('assistant')}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#245638] text-white font-black text-xs rounded-lg hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>Chat with Assistant</span>
          <ArrowRight className="w-4 h-4 text-[#E8B65C]" />
        </button>
      </div>
    </div>
  );
};
