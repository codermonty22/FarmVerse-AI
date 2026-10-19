import React, { useState } from 'react';
import {
  User,
  FileSpreadsheet,
  ShieldAlert,
  Trash2,
  RotateCcw,
  Languages,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Printer,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  DiseaseDetectionResult,
  FarmBusinessPlan,
  FarmerProfile,
  Language,
} from '../../types';
import {
  deleteBusinessPlan,
  getSavedBusinessPlans,
  getSavedDiseaseScans,
  resetAllDemoData,
} from '../../services/apiService';
import { translations } from '../../i18n/translations';

interface Props {
  profile: FarmerProfile;
  lang: Language;
  setLang: (l: Language) => void;
  onEditProfile: () => void;
  onSelectPlanToView: (plan: FarmBusinessPlan) => void;
  onResetComplete: () => void;
  onOpenAuth?: () => void;
}

export const ProfileSettingsView: React.FC<Props> = ({
  profile,
  lang,
  setLang,
  onEditProfile,
  onSelectPlanToView,
  onResetComplete,
  onOpenAuth,
}) => {
  const t = translations[lang];

  const [savedPlans, setSavedPlans] = useState<FarmBusinessPlan[]>(getSavedBusinessPlans());
  const [savedScans, setSavedScans] = useState<DiseaseDetectionResult[]>(getSavedDiseaseScans());
  const [activeTab, setActiveTab] = useState<'plans' | 'scans' | 'preferences'>('plans');

  const handleDeletePlan = (id: string) => {
    deleteBusinessPlan(id);
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Reset all saved farm plans, disease history, and profile back to initial defaults?')) {
      resetAllDemoData();
      onResetComplete();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#202820]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge bg-[#DDEBD7] text-[#245638] text-[10px] font-black">
              Farmer Records &bull; Local Storage Persistence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
            {t.savedPlans} &amp; Farm Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
            Access your saved financial budgets, past leaf health scans, and interface preferences. Stored locally on this device.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg border border-red-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="neo-card p-5 rounded-2xl bg-white border-2 border-[#202820] shadow-[4px_4px_0px_#202820] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#245638] text-[#E8B65C] flex items-center justify-center font-black text-xl border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
            {profile.name ? profile.name[0] : 'F'}
          </div>
          <div>
            <h2 className="text-lg font-black text-[#202820]">{profile.name}</h2>
            <p className="text-xs text-neutral-600 font-semibold">
              {profile.village}, {profile.district}, {profile.state} &bull; {profile.phone || 'No phone'}
            </p>
            <div className="flex flex-wrap gap-2 mt-1.5 text-[11px] font-bold">
              <span className="bg-[#DDEBD7] text-[#245638] px-2 py-0.5 rounded">
                {profile.landSize} {profile.landUnit}
              </span>
              <span className="bg-[#F7F5EB] border border-[#202820]/30 px-2 py-0.5 rounded">
                {profile.soilType}
              </span>
              <span className="bg-[#F7F5EB] border border-[#202820]/30 px-2 py-0.5 rounded">
                {profile.waterAvailability.split('(')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-white text-[#202820] font-bold text-xs rounded-lg hover:bg-[#E8B65C] border border-[#202820] shadow-[2px_2px_0px_#202820]"
            >
              Switch Account / Login
            </button>
          )}

          <button
            onClick={onEditProfile}
            className="px-4 py-2 bg-[#245638] text-white font-bold text-xs rounded-lg hover:bg-[#1b412a] border border-[#202820] shadow-[2px_2px_0px_#202820]"
          >
            Edit Farm Parameters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-neutral-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'plans'
              ? 'border-[#245638] text-[#245638] font-black'
              : 'border-transparent text-neutral-500 hover:text-[#202820]'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Saved Profit Plans ({savedPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'scans'
              ? 'border-[#245638] text-[#245638] font-black'
              : 'border-transparent text-neutral-500 hover:text-[#202820]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Past Plant Doctor Scans ({savedScans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'preferences'
              ? 'border-[#245638] text-[#245638] font-black'
              : 'border-transparent text-neutral-500 hover:text-[#202820]'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Language &amp; Units</span>
        </button>
      </div>

      {/* Tab 1: Saved Business Plans */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          {savedPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="neo-card p-5 rounded-2xl bg-white flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px] font-black">
                        {plan.cropName}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-semibold">
                        {plan.createdAt}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-[#202820]">{plan.planName}</h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      Area: {plan.landSize} {plan.landUnit} &bull; Yield: {plan.expectedYieldQuintals} Qtl
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#F7F5EB] rounded-xl border border-[#202820]/30 text-center text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                          Total Cost
                        </span>
                        <span className="font-bold text-[#202820]">
                          ₹{plan.totalCost.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                          Gross Revenue
                        </span>
                        <span className="font-bold text-[#202820]">
                          ₹{plan.grossRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                          Net Profit
                        </span>
                        <span className="font-black text-[#245638]">
                          ₹{plan.netProfit.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectPlanToView(plan)}
                      className="text-xs font-black text-[#245638] hover:underline"
                    >
                      Open in Profit Calculator &rarr;
                    </button>

                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-[#202820]/30">
              <FileSpreadsheet className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-600 font-semibold">
                No saved plans yet. Create one in the Profit Planner module!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Scans */}
      {activeTab === 'scans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedScans.map((scan) => (
            <div
              key={scan.id}
              className="neo-card p-4 rounded-xl bg-white flex flex-col justify-between space-y-3"
            >
              <div>
                <img
                  src={scan.leafImageUrl}
                  alt={scan.cropName}
                  className="w-full h-36 object-cover rounded-lg border border-[#202820] mb-2"
                />
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-500">
                    {scan.cropName}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                      scan.isHealthy
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {scan.severity}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#202820]">{scan.suspectedIssue}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                  {scan.symptoms[0]}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                {scan.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Language & Units */}
      {activeTab === 'preferences' && (
        <div className="neo-card p-6 rounded-2xl bg-white space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-black uppercase text-[#202820] mb-2">
              Display Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setLang('en')}
                className={`p-3 rounded-lg text-xs font-bold border-2 text-center transition-all ${
                  lang === 'en'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`p-3 rounded-lg text-xs font-bold border-2 text-center transition-all ${
                  lang === 'mr'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                मराठी (Marathi)
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`p-3 rounded-lg text-xs font-bold border-2 text-center transition-all ${
                  lang === 'hi'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#F7F5EB] rounded-lg border border-[#202820]/30 text-xs text-neutral-600">
            <span className="font-bold text-[#202820] block mb-0.5">Local Storage Architecture</span>
            <p>
              Your farm preferences, saved sensitivity budgets, and leaf diagnoses are cached strictly within this browser session and survive page reloads without external tracking.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
