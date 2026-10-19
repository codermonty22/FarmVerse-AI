import React, { useState } from 'react';
import {
  Recycle,
  Search,
  Filter,
  Factory,
  Sparkles,
  Leaf,
  ArrowRight,
  TrendingUp,
  Building2,
  CheckCircle2,
  Wrench,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import { Language, WasteToWealthItem } from '../../types';
import { WASTE_TO_WEALTH_IDEAS } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  lang: Language;
  onNavigateToBuyers: () => void;
}

export const WasteToWealthView: React.FC<Props> = ({ lang, onNavigateToBuyers }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(WASTE_TO_WEALTH_IDEAS[0].id);

  const filteredItems = WASTE_TO_WEALTH_IDEAS.filter((item) => {
    const matchSearch =
      item.cropSource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productIdea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.residueType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiff =
      selectedDifficulty === 'All' || item.processingDifficulty.includes(selectedDifficulty);
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="border-b-2 border-[#202820]/15 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="neo-badge bg-emerald-100 text-emerald-800 text-[10px] border border-emerald-400">
            System Module 04 &bull; Circular Bio-Economy
          </span>
          <span className="text-xs font-semibold text-neutral-500">
            Residue Valorization &amp; By-Product Commercialization
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
          {t.wasteToWealth} &amp; By-Product Commercializer
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          Convert post-harvest agricultural stubble, stalks, and bagasse into high-margin revenue streams. Stop open field burning, cut greenhouse gases, and link with certified industrial bio-purchasers.
        </p>
      </div>

      {/* Search and Difficulty Filter */}
      <div className="neo-card p-4 rounded-xl bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by crop (e.g. Cotton, Sugarcane, Paddy, Banana)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            >
              <option value="All">All Processing Scales</option>
              <option value="Farm-level">Simple (Farm-level Shed)</option>
              <option value="Village unit">Medium (Village / FPO Unit)</option>
              <option value="Industrial">Advanced (Industrial Plant)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`neo-card rounded-2xl p-5 bg-white flex flex-col justify-between transition-all ${
                isExpanded ? 'border-3 border-[#245638] shadow-[5px_5px_0px_#245638]' : ''
              }`}
            >
              <div>
                {/* Header Tag and Crop Source */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="neo-badge bg-[#DDEBD7] text-[#245638] text-[10px] font-black">
                    {item.cropSource}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500 bg-[#F7F5EB] px-2 py-0.5 rounded border border-[#202820]/30">
                    {item.processingDifficulty.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#202820] leading-snug">
                  {item.productIdea}
                </h3>
                <p className="text-xs text-neutral-600 font-medium mt-1">
                  Residue: <strong>{item.residueType}</strong>
                </p>

                {/* Key Numbers Banner */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-[#F7F5EB] rounded-xl border border-[#202820]/30 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Estimated Market Value
                    </span>
                    <span className="text-xs font-black text-[#245638]">{item.marketValueEst}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Required Capital
                    </span>
                    <span className="text-xs font-black text-[#202820] truncate block">
                      {item.indicativeInvestment.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Buyer Categories */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-black uppercase text-neutral-600 flex items-center gap-1">
                    <Factory className="w-3 h-3 text-[#245638]" />
                    <span>Prospective Industrial Off-Takers</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.potentialBuyersCategories.map((buyer, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700 rounded text-[11px] font-semibold"
                      >
                        {buyer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Environmental Benefit */}
                <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-start gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug text-[11px] font-medium">{item.co2Benefit}</span>
                </div>

                {/* Execution Details if expanded */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-neutral-200 space-y-3 text-xs">
                    <div>
                      <h4 className="font-bold text-[#202820] uppercase text-[11px] flex items-center gap-1 mb-1">
                        <Wrench className="w-3 h-3 text-[#245638]" />
                        <span>Core Machinery Needed</span>
                      </h4>
                      <p className="text-neutral-700 font-medium">{item.keyEquipment.join(' • ')}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#202820] uppercase text-[11px] flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-[#245638]" />
                        <span>Practical Farm-to-Market Steps</span>
                      </h4>
                      <ol className="space-y-1 text-neutral-700 list-decimal pl-4">
                        {item.practicalSteps.map((step, idx) => (
                          <li key={idx} className="leading-snug">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="text-xs font-bold text-[#245638] hover:underline"
                >
                  {isExpanded ? 'Hide Implementation Steps' : 'View Implementation Steps &rarr;'}
                </button>

                <button
                  onClick={onNavigateToBuyers}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#245638] text-white font-black text-xs rounded hover:bg-[#1b412a] border border-[#202820] shadow-[1.5px_1.5px_0px_#202820]"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#E8B65C]" />
                  <span>Find Buyers</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
