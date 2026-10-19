import React, { useState } from 'react';
import {
  Sprout,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Droplet,
  Calendar,
  IndianRupee,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles,
  BookOpen,
  X,
  Layers,
  Info,
} from 'lucide-react';
import { CropRecommendation, FarmerProfile, Language, Season } from '../../types';
import { CROPS_CATALOG } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  profile: FarmerProfile;
  lang: Language;
  onSelectCropForPlanner: (crop: CropRecommendation) => void;
}

export const CropRecommendationView: React.FC<Props> = ({
  profile,
  lang,
  onSelectCropForPlanner,
}) => {
  const t = translations[lang];

  // Filters state
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [waterFilter, setWaterFilter] = useState<string>('All');
  const [activeGuideCrop, setActiveGuideCrop] = useState<CropRecommendation | null>(null);

  // Compare mode
  const [compareList, setCompareList] = useState<CropRecommendation[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const categories = ['All', 'Vegetable', 'Oilseed', 'Pulse', 'Cash Crop', 'Horticulture', 'Cereal'];
  const seasonOptions = ['All', 'Rabi (Winter)', 'Kharif (Monsoon)', 'Zaid (Summer)', 'Perennial / All Season'];

  // Filter crops
  const filteredCrops = CROPS_CATALOG.filter((crop) => {
    if (selectedCategory !== 'All' && crop.category !== selectedCategory) return false;
    if (selectedSeason !== 'All' && !crop.season.some((s) => s.includes(selectedSeason.split(' ')[0]))) {
      return false;
    }
    if (waterFilter !== 'All' && crop.waterNeed !== waterFilter) return false;
    return true;
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  const toggleCompare = (crop: CropRecommendation) => {
    if (compareList.some((c) => c.id === crop.id)) {
      setCompareList(compareList.filter((c) => c.id !== crop.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], crop]);
      } else {
        setCompareList([...compareList, crop]);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#202820]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge bg-[#DDEBD7] text-[#245638] text-[10px]">
              System Module 01 &bull; ML Classification
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Random Forest + XGBoost Multi-Criteria Model
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
            {t.cropRecommendation} &amp; Complete Crop Guide
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
            Ranked specifically for your <strong className="text-[#202820]">{profile.soilType}</strong> in{' '}
            <strong className="text-[#202820]">{profile.district}, {profile.state}</strong> with{' '}
            <strong className="text-[#202820]">{profile.waterAvailability.split(' ')[0]}</strong> water and{' '}
            <strong className="text-[#202820]">{profile.budgetRange.split(' ')[0]}</strong> capital.
          </p>
        </div>

        {/* Compare Floating Button */}
        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#E8B65C] text-[#202820] font-black text-xs rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#ffc966] transition-all"
          >
            <Scale className="w-4 h-4 text-[#245638]" />
            <span>Compare ({compareList.length}/2 Crops)</span>
          </button>
        )}
      </div>

      {/* Filter Strip */}
      <div className="neo-card p-4 rounded-xl bg-white space-y-3">
        <div className="flex items-center justify-between text-xs font-black uppercase text-[#245638]">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Multi-Factor Recommendation Filters</span>
          </span>
          <span className="text-[11px] font-bold text-neutral-500">
            Showing {filteredCrops.length} candidate crops
          </span>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#245638] text-white border-1.5 border-[#202820] shadow-[1.5px_1.5px_0px_#202820]'
                  : 'bg-[#F7F5EB] text-[#202820] border border-[#202820]/30 hover:bg-[#DDEBD7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Season & Water Need Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-600 whitespace-nowrap">Target Season:</span>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg focus:outline-none"
            >
              {seasonOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-600 whitespace-nowrap">Water Requirement:</span>
            <select
              value={waterFilter}
              onChange={(e) => setWaterFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg focus:outline-none"
            >
              <option value="All">All Water Levels</option>
              <option value="Low">Low (Drought-hardy / Rainfed)</option>
              <option value="Medium">Medium (Protective / Drip)</option>
              <option value="High">High (Perennial / Canal)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crops Recommendation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredCrops.map((crop, idx) => {
          const isComparing = compareList.some((c) => c.id === crop.id);
          const localName = crop.cropNameLocal[lang === 'mr' ? 'mr' : 'hi'] || crop.cropName;

          return (
            <div
              key={crop.id}
              className={`neo-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                idx === 0 ? 'border-3 border-[#245638] shadow-[5px_5px_0px_#245638]' : ''
              }`}
            >
              <div>
                {/* Image + Header Banner */}
                <div className="relative h-44 w-full bg-neutral-200 overflow-hidden">
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Rank Badge & Category */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="neo-badge bg-[#E8B65C] text-[#202820] text-xs font-black shadow-[1px_1px_0px_#202820]">
                      #{idx + 1} Best Match
                    </span>
                    <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      {crop.category}
                    </span>
                  </div>

                  {/* Suitability Score Pill */}
                  <div className="absolute top-3 right-3 bg-white text-[#245638] border-2 border-[#202820] px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_#202820] flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-neutral-500">Score</span>
                    <span className="text-sm font-black">{crop.suitabilityScore}%</span>
                  </div>

                  {/* Crop Names Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-black tracking-tight leading-tight">
                      {crop.cropName}
                    </h3>
                    <p className="text-xs font-medium text-[#DDEBD7] mt-0.5">
                      {localName} &bull; {crop.growthDurationDays} Days Cycle
                    </p>
                  </div>
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-3 bg-[#F7F5EB] border-b-2 border-[#202820] divide-x-2 divide-[#202820] text-center p-2.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Cost / Acre
                    </span>
                    <span className="text-xs font-black text-[#202820]">
                      ₹{crop.estimatedCostPerAcre.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Est. Return / Acre
                    </span>
                    <span className="text-xs font-black text-emerald-800">
                      ₹{crop.potentialReturnPerAcre.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Risk Rating
                    </span>
                    <span
                      className={`text-xs font-black ${
                        crop.riskLevel === 'Low'
                          ? 'text-emerald-700'
                          : crop.riskLevel === 'Moderate'
                          ? 'text-amber-700'
                          : 'text-red-700'
                      }`}
                    >
                      {crop.riskLevel} Risk
                    </span>
                  </div>
                </div>

                {/* Agronomic Match Details */}
                <div className="p-4 space-y-3 text-xs">
                  {/* Why Suitable */}
                  <div>
                    <h4 className="font-bold text-[#245638] uppercase text-[11px] flex items-center gap-1 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#245638]" />
                      <span>Why This Fits Your Farm</span>
                    </h4>
                    <ul className="space-y-1 text-neutral-700">
                      {crop.whySuitable.map((reason, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-[#245638] font-bold">&bull;</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risks */}
                  <div className="pt-2 border-t border-neutral-100">
                    <h4 className="font-bold text-amber-900 uppercase text-[11px] flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Uncertainty &amp; Risks</span>
                    </h4>
                    <p className="text-neutral-600 leading-snug">
                      {crop.keyRisks.join(' ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-white border-t-2 border-[#202820] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveGuideCrop(crop)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#DDEBD7] text-[#245638] font-bold text-xs rounded border border-[#245638] hover:bg-[#E8B65C] hover:text-[#202820] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Cultivation Guide</span>
                  </button>

                  <button
                    onClick={() => toggleCompare(crop)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded border-1.5 border-[#202820] transition-colors ${
                      isComparing
                        ? 'bg-[#202820] text-white'
                        : 'bg-white text-[#202820] hover:bg-neutral-100'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>
                </div>

                <button
                  onClick={() => onSelectCropForPlanner(crop)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#245638] text-white font-black text-xs rounded hover:bg-[#1b412a] border border-[#202820] shadow-[2px_2px_0px_#202820] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <IndianRupee className="w-3.5 h-3.5 text-[#E8B65C]" />
                  <span>Plan Profit for {crop.cropName.split(' ')[0]}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Cultivation Guide Drawer / Modal */}
      {activeGuideCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#F7F5EB] border-3 border-[#202820] shadow-[8px_8px_0px_#202820] rounded-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#245638] text-white p-4 sm:p-5 border-b-3 border-[#202820] flex items-center justify-between">
              <div>
                <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px] font-black">
                  Module 02 &bull; Crop Guide
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {activeGuideCrop.cropName} Cultivation Protocol
                </h3>
              </div>
              <button
                onClick={() => setActiveGuideCrop(null)}
                className="p-1 rounded bg-white text-[#202820] hover:bg-[#E8B65C] border border-[#202820]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-white p-3.5 rounded-lg border-2 border-[#202820] space-y-2">
                <h4 className="font-black text-xs uppercase text-[#245638]">
                  Recommended University High-Yielding Varieties
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeGuideCrop.suggestedVarieties.map((v) => (
                    <span
                      key={v}
                      className="px-2.5 py-1 bg-[#DDEBD7] text-[#245638] font-bold rounded border border-[#245638]/40"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-lg border-2 border-[#202820]">
                  <h4 className="font-black text-xs uppercase text-[#245638] mb-1">
                    Nutrient &amp; Fertilizer Schedule (NPK)
                  </h4>
                  <p className="text-neutral-700 leading-relaxed">
                    {activeGuideCrop.fertilizerNPK}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border-2 border-[#202820]">
                  <h4 className="font-black text-xs uppercase text-[#245638] mb-1">
                    Expected Yield Output
                  </h4>
                  <p className="text-neutral-700 leading-relaxed font-bold">
                    ~{activeGuideCrop.yieldQuintalPerAcre} Quintals / Acre with scheduled irrigation.
                  </p>
                </div>
              </div>

              <div className="bg-[#DDEBD7] p-3.5 rounded-lg border-2 border-[#245638]">
                <h4 className="font-black text-xs uppercase text-[#245638] mb-1">
                  Waste-to-Wealth &amp; Residue Monetization
                </h4>
                <p className="text-[#202820] leading-relaxed">
                  {activeGuideCrop.wasteToWealthPotential}
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border-t-2 border-[#202820] flex justify-end">
              <button
                onClick={() => {
                  const c = activeGuideCrop;
                  setActiveGuideCrop(null);
                  onSelectCropForPlanner(c);
                }}
                className="px-4 py-2 bg-[#245638] text-white font-black text-xs rounded hover:bg-[#1b412a] border border-[#202820] shadow-[2px_2px_0px_#202820]"
              >
                Send to Business Planner &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && compareList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#F7F5EB] border-3 border-[#202820] shadow-[8px_8px_0px_#202820] rounded-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#245638] text-white p-4 border-b-3 border-[#202820] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  Side-by-Side Candidate Crop Comparison
                </h3>
                <p className="text-xs text-[#DDEBD7]">
                  Comparing resource needs, financial returns, and risk levels
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded bg-white text-[#202820] hover:bg-[#E8B65C] border border-[#202820]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {compareList.map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white p-4 rounded-xl border-2 border-[#202820] shadow-[3px_3px_0px_#202820] space-y-3 text-xs"
                  >
                    <div>
                      <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px]">
                        {crop.suitabilityScore}% Match
                      </span>
                      <h4 className="text-base font-black text-[#202820] mt-1">{crop.cropName}</h4>
                      <p className="text-neutral-500 font-semibold">{crop.category}</p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Duration:</span>
                        <span className="font-bold">{crop.growthDurationDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Water Need:</span>
                        <span className="font-bold">{crop.waterNeed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Est. Cost / Acre:</span>
                        <span className="font-bold">₹{crop.estimatedCostPerAcre.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Est. Return / Acre:</span>
                        <span className="font-bold text-emerald-800">
                          ₹{crop.potentialReturnPerAcre.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Risk Profile:</span>
                        <span className="font-bold">{crop.riskLevel}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowCompareModal(false);
                        onSelectCropForPlanner(crop);
                      }}
                      className="w-full mt-3 py-2 bg-[#245638] text-white font-bold text-xs rounded hover:bg-[#1b412a] border border-[#202820]"
                    >
                      Select for Planner
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white border-t-2 border-[#202820] flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-1.5 bg-neutral-200 text-xs font-bold rounded border border-[#202820]"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
