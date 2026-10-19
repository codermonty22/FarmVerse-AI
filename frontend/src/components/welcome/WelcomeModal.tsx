import React from 'react';
import {
  Sprout,
  ShieldAlert,
  TrendingUp,
  FileSpreadsheet,
  Recycle,
  Landmark,
  Languages,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { Language } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onStartOnboarding: () => void;
  onExploreDemo: () => void;
  onOpenMethodology: () => void;
}

export const WelcomeModal: React.FC<Props> = ({
  isOpen,
  lang,
  setLang,
  onStartOnboarding,
  onExploreDemo,
  onOpenMethodology,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#F7F5EB] border-3 border-[#202820] shadow-[10px_10px_0px_#202820] rounded-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Banner */}
        <div className="bg-[#245638] text-white p-6 sm:p-8 border-b-3 border-[#202820] relative">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="neo-badge bg-[#E8B65C] text-[#202820] font-black text-xs">
              AI Agricultural Intelligence
            </span>
            <span className="text-xs text-[#DDEBD7] font-semibold">
              Next-Gen Agribusiness Decision Cockpit
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#F7F5EB] tracking-tight">
                FarmVerse<span className="text-[#E8B65C]"> AI</span>
              </h1>
              <p className="text-sm sm:text-base font-bold text-[#DDEBD7] mt-1">
                The Farmer's Complete Wealth Guide &amp; Agribusiness Cockpit
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#E8B65C] text-[#245638] flex items-center justify-center border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex-shrink-0">
              <Sprout className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#202820]">
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#245638]" />
              <span>Select Your Preferred Language / भाषा निवडा / भाषा चुनें</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`p-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all ${
                  lang === 'en'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[3px_3px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`p-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all ${
                  lang === 'mr'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[3px_3px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                मराठी (Marathi)
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`p-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all ${
                  lang === 'hi'
                    ? 'bg-[#245638] text-white border-[#202820] shadow-[3px_3px_0px_#202820]'
                    : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#202820] shadow-[2px_2px_0px_#202820]">
              <Sprout className="w-5 h-5 text-[#245638] mb-1.5" />
              <h4 className="font-black text-[#202820]">Smart Recommendations</h4>
              <p className="text-neutral-600 text-[11px] mt-0.5 leading-snug">
                ML classification matching soil, season, and budget with high-yield crops.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#202820] shadow-[2px_2px_0px_#202820]">
              <FileSpreadsheet className="w-5 h-5 text-[#245638] mb-1.5" />
              <h4 className="font-black text-[#202820]">Deterministic Profit Math</h4>
              <p className="text-neutral-600 text-[11px] mt-0.5 leading-snug">
                Exact break-even price, net margins, and 3 sensitivity risk scenarios.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#202820] shadow-[2px_2px_0px_#202820]">
              <Recycle className="w-5 h-5 text-[#245638] mb-1.5" />
              <h4 className="font-black text-[#202820]">Waste-to-Wealth</h4>
              <p className="text-neutral-600 text-[11px] mt-0.5 leading-snug">
                Monetize cotton stalks, bagasse, and crop stubble with verified buyers.
              </p>
            </div>
          </div>

          {/* Transparency Note */}
          <div className="p-3.5 bg-[#DDEBD7] border-2 border-[#245638] rounded-xl text-xs text-[#202820] leading-relaxed">
            <p>
              <strong>Interactive Demonstration:</strong> This platform is pre-loaded with authentic Maharashtra &amp; Indian agricultural data. You can enter your own farm parameters or explore the preconfigured demo farm immediately.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-white border-t-2 border-[#202820] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="text-xs font-bold text-[#245638] hover:underline flex items-center gap-1"
          >
            <Award className="w-4 h-4" />
            <span>View System Architecture &amp; ML Pipeline</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreDemo}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#F7F5EB] text-[#202820] font-bold text-xs rounded-xl border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7]"
            >
              Explore with Demo Farm
            </button>

            <button
              type="button"
              onClick={onStartOnboarding}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#245638] text-white font-black text-xs rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center justify-center gap-2"
            >
              <span>Setup My Farm</span>
              <ArrowRight className="w-4 h-4 text-[#E8B65C]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
