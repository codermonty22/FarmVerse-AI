import React, { useState } from 'react';
import {
  Home,
  Sprout,
  ShieldAlert,
  TrendingUp,
  FileSpreadsheet,
  MoreHorizontal,
  Landmark,
  Recycle,
  Building2,
  BotMessageSquare,
  User,
  X,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
}

export const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab, lang }) => {
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const t = translations[lang];

  const primaryItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'recommendation', label: t.cropRecommendation.split(' ')[0], icon: Sprout },
    { id: 'disease', label: t.diseaseDetection.split(' ')[0], icon: ShieldAlert },
    { id: 'market', label: t.marketIntelligence.split(' ')[0], icon: TrendingUp },
    { id: 'planner', label: t.businessPlanner.split(' ')[0], icon: FileSpreadsheet },
  ];

  const secondaryItems = [
    { id: 'assistant', label: t.aiAssistant, icon: BotMessageSquare, color: 'bg-emerald-50 text-emerald-800' },
    { id: 'waste', label: t.wasteToWealth, icon: Recycle, color: 'bg-amber-50 text-amber-800' },
    { id: 'schemes', label: t.govtSchemes, icon: Landmark, color: 'bg-blue-50 text-blue-800' },
    { id: 'buyers', label: t.buyersDirectory, icon: Building2, color: 'bg-purple-50 text-purple-800' },
    { id: 'profile', label: t.savedPlans, icon: User, color: 'bg-stone-50 text-stone-800' },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMoreSheetOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* "More" Drawer for remaining modules on mobile */}
      {moreSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-[#F7F5EB] border-t-3 border-[#202820] rounded-t-2xl p-5 shadow-[0_-6px_0px_#202820] max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#202820]/15 mb-4">
              <h3 className="font-black text-sm text-[#245638] uppercase tracking-wider">
                Additional Agricultural Services
              </h3>
              <button
                onClick={() => setMoreSheetOpen(false)}
                className="p-1 rounded-lg bg-white border border-[#202820] shadow-[1px_1px_0px_#202820]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                      isSelected
                        ? 'bg-[#245638] text-white border-[#202820] shadow-[3px_3px_0px_#202820]'
                        : 'bg-white text-[#202820] border-[#202820] shadow-[2px_2px_0px_#202820]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-[#E8B65C]' : 'text-[#245638]'}`} />
                    <span className="line-clamp-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar on Small Screens */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F5EB] border-t-2 border-[#202820] shadow-[0_-2px_0px_#202820] px-2 py-1 safe-bottom">
        <div className="flex items-center justify-around">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all min-w-[54px] ${
                  isActive
                    ? 'text-[#245638] font-black'
                    : 'text-neutral-600 font-semibold hover:text-[#202820]'
                }`}
              >
                <div
                  className={`w-9 h-7 rounded-md flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#DDEBD7] border-1.5 border-[#202820] shadow-[1.5px_1.5px_0px_#202820]' : ''
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#245638]' : 'text-neutral-500'}`} />
                </div>
                <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
              </button>
            );
          })}

          {/* More trigger */}
          <button
            onClick={() => setMoreSheetOpen(!moreSheetOpen)}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all min-w-[54px] ${
              secondaryItems.some((s) => s.id === activeTab)
                ? 'text-[#245638] font-black'
                : 'text-neutral-600 font-semibold'
            }`}
          >
            <div
              className={`w-9 h-7 rounded-md flex items-center justify-center transition-all ${
                secondaryItems.some((s) => s.id === activeTab)
                  ? 'bg-[#E8B65C] border-1.5 border-[#202820] shadow-[1.5px_1.5px_0px_#202820]'
                  : 'bg-white/60'
              }`}
            >
              <MoreHorizontal className="w-4 h-4 text-[#202820]" />
            </div>
            <span className="text-[10px] mt-0.5 leading-tight">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
