import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  IndianRupee,
  Calculator,
  Save,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Share2,
  Sparkles,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CropRecommendation, FarmBusinessPlan, FarmerProfile, Language, LandUnit } from '../../types';
import { CROPS_CATALOG } from '../../data/mockData';
import { calculateFarmBusinessPlan, saveBusinessPlan } from '../../services/apiService';
import { translations } from '../../i18n/translations';

interface Props {
  profile: FarmerProfile;
  lang: Language;
  preselectedCrop?: CropRecommendation | null;
  onSavedPlanSuccess?: () => void;
}

export const BusinessPlannerView: React.FC<Props> = ({
  profile,
  lang,
  preselectedCrop,
  onSavedPlanSuccess,
}) => {
  const t = translations[lang];

  // Form State
  const [cropName, setCropName] = useState<string>(
    preselectedCrop?.cropName || CROPS_CATALOG[0].cropName
  );
  const [planName, setPlanName] = useState<string>(
    `${preselectedCrop?.cropName || CROPS_CATALOG[0].cropName} Season Plan`
  );
  const [landSize, setLandSize] = useState<number>(profile.landSize || 4.5);
  const [landUnit, setLandUnit] = useState<LandUnit>(profile.landUnit || 'Acres');

  // Costs
  const [seedCost, setSeedCost] = useState<number>(27000);
  const [fertilizerCost, setFertilizerCost] = useState<number>(36000);
  const [laborCost, setLaborCost] = useState<number>(48000);
  const [irrigationCost, setIrrigationCost] = useState<number>(15000);
  const [machineryCost, setMachineryCost] = useState<number>(22000);
  const [transportCost, setTransportCost] = useState<number>(18000);
  const [contingencyPercent, setContingencyPercent] = useState<number>(10);

  // Revenue parameters
  const [expectedYieldQuintals, setExpectedYieldQuintals] = useState<number>(380);
  const [sellingPricePerQuintal, setSellingPricePerQuintal] = useState<number>(1850);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pre-fill if crop selected from recommendation module
  useEffect(() => {
    if (preselectedCrop) {
      setCropName(preselectedCrop.cropName);
      setPlanName(`${preselectedCrop.cropName} Strategy`);
      const totalEstimated = preselectedCrop.estimatedCostPerAcre * (profile.landSize || 1);
      setSeedCost(Math.round(totalEstimated * 0.18));
      setFertilizerCost(Math.round(totalEstimated * 0.22));
      setLaborCost(Math.round(totalEstimated * 0.28));
      setIrrigationCost(Math.round(totalEstimated * 0.1));
      setMachineryCost(Math.round(totalEstimated * 0.12));
      setTransportCost(Math.round(totalEstimated * 0.1));

      const totalYield = preselectedCrop.yieldQuintalPerAcre * (profile.landSize || 1);
      setExpectedYieldQuintals(Math.round(totalYield));

      const pricePerQtl = Math.round(
        preselectedCrop.potentialReturnPerAcre / (preselectedCrop.yieldQuintalPerAcre || 1)
      );
      setSellingPricePerQuintal(pricePerQtl);
    }
  }, [preselectedCrop, profile.landSize]);

  // Recalculate plan deterministically
  const plan: FarmBusinessPlan = calculateFarmBusinessPlan({
    planName,
    cropName,
    landSize,
    landUnit,
    seedCost,
    fertilizerCost,
    laborCost,
    irrigationCost,
    machineryCost,
    transportCost,
    contingencyPercent,
    expectedYieldQuintals,
    sellingPricePerQuintal,
  });

  const handleSave = () => {
    saveBusinessPlan(plan);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
    setToastMessage('Farm business plan saved to your device!');
    setTimeout(() => setToastMessage(null), 3500);
    if (onSavedPlanSuccess) onSavedPlanSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  const totalDirect =
    seedCost + fertilizerCost + laborCost + irrigationCost + machineryCost + transportCost || 1;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#202820]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px] font-black">
              System Modules 05 &bull; 12 &bull; Financial Intelligence
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Deterministic Profit, ROI &amp; Break-Even Economics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
            {t.businessPlanner} &amp; Profit Calculator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
            Input production inputs, labor, and anticipated crop yields. Instant mathematical projections reveal total cost, break-even selling rate, net margins, and alternative risk scenarios.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-xs font-bold text-[#202820] rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7]"
          >
            <Printer className="w-4 h-4 text-[#245638]" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#245638] text-xs font-black text-white rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#1b412a] active:translate-x-0.5 active:translate-y-0.5"
          >
            <Save className="w-4 h-4 text-[#E8B65C]" />
            <span>Save Business Plan</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-100 border-2 border-emerald-700 text-emerald-900 text-xs font-bold rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Form Inputs (5 cols) + Financial Cockpit (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Editable Financial Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="neo-card p-5 rounded-2xl bg-white space-y-4">
            <h2 className="text-xs font-black uppercase text-[#245638] flex items-center gap-1.5 border-b-2 border-neutral-100 pb-2">
              <Calculator className="w-4 h-4" />
              <span>Production &amp; Cost Inputs</span>
            </h2>

            {/* Plan Name & Crop Selection */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                    Target Crop
                  </label>
                  <select
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none"
                  >
                    {CROPS_CATALOG.map((c) => (
                      <option key={c.id} value={c.cropName}>
                        {c.cropName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                    Land Area ({landUnit})
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={landSize}
                    onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Direct Cost Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-100">
              <span className="text-[11px] font-black uppercase text-neutral-500 block">
                Cost Breakdown (₹ Total for {landSize} {landUnit})
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    1. Seeds / Saplings
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={seedCost}
                    onChange={(e) => setSeedCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    2. Fertilizers &amp; Bio-Inputs
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    3. Labor (Weeding &amp; Harvest)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    4. Irrigation &amp; Electricity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={irrigationCost}
                    onChange={(e) => setIrrigationCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    5. Tractor, Diesel &amp; Tillage
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={machineryCost}
                    onChange={(e) => setMachineryCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    6. Transport &amp; Mandi Bagging
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={transportCost}
                    onChange={(e) => setTransportCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-[#F7F5EB] border border-[#202820]/40 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-600 mb-0.5 flex justify-between">
                  <span>Emergency Contingency Reserve</span>
                  <span className="text-[#245638] font-black">{contingencyPercent}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="5"
                  value={contingencyPercent}
                  onChange={(e) => setContingencyPercent(parseInt(e.target.value) || 0)}
                  className="w-full accent-[#245638]"
                />
              </div>
            </div>

            {/* Yield & Mandi Price Inputs */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <span className="text-[11px] font-black uppercase text-[#245638] block">
                Anticipated Harvest &amp; Market Price
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    Total Expected Yield (Qtl)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={expectedYieldQuintals}
                    onChange={(e) => setExpectedYieldQuintals(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg"
                  />
                  <span className="text-[10px] text-neutral-500">
                    ≈ {(expectedYieldQuintals / (landSize || 1)).toFixed(1)} Qtl/Acre
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 mb-0.5">
                    Selling Price (₹ / Qtl)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={sellingPricePerQuintal}
                    onChange={(e) => setSellingPricePerQuintal(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg"
                  />
                  <span className="text-[10px] text-neutral-500">Mandi auction target</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Computed Financial Cockpit (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Big Profit Hero Metric Box */}
          <div
            className={`neo-card rounded-2xl p-6 text-white border-3 border-[#202820] shadow-[6px_6px_0px_#202820] ${
              plan.netProfit >= 0 ? 'bg-[#245638]' : 'bg-red-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="neo-badge bg-[#E8B65C] text-[#202820] text-xs font-black">
                Financial Summary
              </span>
              <span className="text-xs text-[#DDEBD7] font-semibold">
                ROI: <strong className="text-white text-sm font-black">{plan.roiPercent}%</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#DDEBD7] block">
                  Total Direct &amp; Overhead Cost
                </span>
                <span className="text-2xl font-black text-[#F7F5EB]">
                  ₹{plan.totalCost.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#DDEBD7] block mt-0.5">
                  ₹{Math.round(plan.totalCost / (landSize || 1)).toLocaleString()} / {landUnit}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#DDEBD7] block">
                  Gross Harvest Revenue
                </span>
                <span className="text-2xl font-black text-[#E8B65C]">
                  ₹{plan.grossRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#DDEBD7] block mt-0.5">
                  {expectedYieldQuintals} Qtl &times; ₹{sellingPricePerQuintal}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#DDEBD7] block">
                  Net Realizable Profit
                </span>
                <span className="text-2xl font-black text-white">
                  ₹{plan.netProfit.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#DDEBD7] block mt-0.5">
                  ₹{Math.round(plan.netProfit / (landSize || 1)).toLocaleString()} / {landUnit}
                </span>
              </div>
            </div>

            {/* Break-Even Callout */}
            <div className="mt-5 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">
                  Break-Even Threshold
                </span>
                <span className="text-[#DDEBD7]">
                  You break even at <strong className="text-white font-black">₹{plan.breakEvenPricePerQuintal} / Qtl</strong>
                </span>
              </div>
              <span className="text-[11px] text-[#DDEBD7]">
                Safety Margin: ₹{(sellingPricePerQuintal - plan.breakEvenPricePerQuintal).toFixed(0)}/Qtl
              </span>
            </div>
          </div>

          {/* Cost Allocation Visual Bar */}
          <div className="neo-card p-4 rounded-xl bg-white space-y-2 text-xs">
            <h3 className="font-bold text-[#202820] text-xs uppercase flex items-center justify-between">
              <span>Cost Allocation Breakdown</span>
              <span className="text-neutral-500 font-medium">Direct Total: ₹{totalDirect.toLocaleString()}</span>
            </h3>

            <div className="w-full h-4 rounded-lg overflow-hidden flex border border-[#202820]">
              <div
                style={{ width: `${(seedCost / totalDirect) * 100}%` }}
                className="bg-amber-500"
                title={`Seeds: ${Math.round((seedCost / totalDirect) * 100)}%`}
              ></div>
              <div
                style={{ width: `${(fertilizerCost / totalDirect) * 100}%` }}
                className="bg-emerald-600"
                title={`Fertilizers: ${Math.round((fertilizerCost / totalDirect) * 100)}%`}
              ></div>
              <div
                style={{ width: `${(laborCost / totalDirect) * 100}%` }}
                className="bg-blue-600"
                title={`Labor: ${Math.round((laborCost / totalDirect) * 100)}%`}
              ></div>
              <div
                style={{ width: `${(machineryCost / totalDirect) * 100}%` }}
                className="bg-purple-600"
                title={`Machinery: ${Math.round((machineryCost / totalDirect) * 100)}%`}
              ></div>
              <div
                style={{ width: `${(irrigationCost / totalDirect) * 100}%` }}
                className="bg-sky-400"
                title={`Irrigation: ${Math.round((irrigationCost / totalDirect) * 100)}%`}
              ></div>
              <div
                style={{ width: `${(transportCost / totalDirect) * 100}%` }}
                className="bg-stone-500"
                title={`Transport: ${Math.round((transportCost / totalDirect) * 100)}%`}
              ></div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-neutral-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Seeds (
                {Math.round((seedCost / totalDirect) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Fert (
                {Math.round((fertilizerCost / totalDirect) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Labor (
                {Math.round((laborCost / totalDirect) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span> Machinery (
                {Math.round((machineryCost / totalDirect) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> Irrigation (
                {Math.round((irrigationCost / totalDirect) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-stone-500"></span> Transport (
                {Math.round((transportCost / totalDirect) * 100)}%)
              </span>
            </div>
          </div>

          {/* 3 Sensitivity Scenarios */}
          <div>
            <h3 className="text-xs font-black uppercase text-[#202820] mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#245638]" />
              <span>Sensitivity Analysis &amp; Scenario Comparison</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plan.scenarioAlternatives.map((sc, idx) => (
                <div
                  key={idx}
                  className={`neo-card p-3.5 rounded-xl border-2 text-xs flex flex-col justify-between ${
                    idx === 1
                      ? 'bg-[#DDEBD7]/40 border-[#245638] shadow-[3px_3px_0px_#245638]'
                      : 'bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">
                      {sc.scenario}
                    </span>
                    <div className="mt-1 space-y-0.5 text-neutral-600">
                      <div>Yield: <strong>{sc.yieldQtl} Qtl</strong></div>
                      <div>Price: <strong>₹{sc.pricePerQtl}/Qtl</strong></div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Net Profit
                    </span>
                    <span
                      className={`text-sm font-black ${
                        sc.profit >= 0 ? 'text-[#245638]' : 'text-red-700'
                      }`}
                    >
                      ₹{sc.profit.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Transparency Disclaimer */}
          <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-600 text-[11px] leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Academic Model Note:</strong> Projections are calculated using exact deterministic formulas based on entered unit costs and yield expectations. Spot market variations and climate anomalies can alter final margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
