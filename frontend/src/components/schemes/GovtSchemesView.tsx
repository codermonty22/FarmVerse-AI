import React, { useState } from 'react';
import {
  Landmark,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  FileText,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GovtScheme, Language } from '../../types';
import { GOVT_SCHEMES_DATA } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  lang: Language;
}

export const GovtSchemesView: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(
    GOVT_SCHEMES_DATA[2].id // default expand Drip Irrigation
  );

  const categories = [
    'All',
    'Financial Grant',
    'Crop Insurance',
    'Irrigation Subsidy',
    'Solar & Machinery',
  ];

  const filteredSchemes = GOVT_SCHEMES_DATA.filter((scheme) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      scheme.title.toLowerCase().includes(term) ||
      scheme.benefits.toLowerCase().includes(term) ||
      scheme.authority.toLowerCase().includes(term);
    const matchCat = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b-2 border-[#202820]/15 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="neo-badge bg-stone-200 text-stone-800 text-[10px] border border-stone-400">
            System Module 11 &bull; Direct Citizen Welfare
          </span>
          <span className="text-xs font-semibold text-neutral-500">
            Subsidies, Low-Interest Credit &amp; Crop Insurance Portals
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
          {t.govtSchemes} &amp; Subsidy Navigator
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          Discover verified central and state agriculture programs. Check documentation requirements, calculate subsidy shares, and navigate directly to official government portals without middleman costs.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="neo-card p-4 rounded-xl bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search subsidies (e.g. Drip, PM-Kisan, Insurance, Solar Pump)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Scheme Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          const localTitle =
            scheme.titleLocal[lang === 'mr' ? 'mr' : 'hi'] || scheme.title;

          return (
            <div
              key={scheme.id}
              className={`neo-card rounded-2xl bg-white overflow-hidden transition-all ${
                isExpanded ? 'border-3 border-[#245638] shadow-[5px_5px_0px_#245638]' : ''
              }`}
            >
              {/* Header Strip */}
              <div
                onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F5EB]/60 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="neo-badge bg-[#DDEBD7] text-[#245638] text-[10px] font-black">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-500">
                      Verified {scheme.lastVerifiedDate}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded">
                      {scheme.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#202820]">{scheme.title}</h3>
                  <p className="text-xs text-[#245638] font-bold mt-0.5">{localTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Administering Body
                    </span>
                    <span className="text-xs font-semibold text-neutral-700 line-clamp-1">
                      {scheme.authority}
                    </span>
                  </div>
                  <div className="p-1 rounded bg-[#F7F5EB] border border-[#202820]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="p-5 border-t-2 border-neutral-100 bg-[#F7F5EB]/40 space-y-4 text-xs">
                  {/* Financial Benefit Highlight */}
                  <div className="p-3.5 bg-[#DDEBD7] rounded-xl border-2 border-[#245638] text-[#202820]">
                    <span className="text-[10px] font-black uppercase text-[#245638] block mb-0.5">
                      Direct Financial Benefit &amp; Subsidy Rate
                    </span>
                    <p className="font-bold text-sm leading-snug">{scheme.benefits}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Eligibility Criteria */}
                    <div className="bg-white p-3.5 rounded-xl border border-[#202820] shadow-[2px_2px_0px_#202820]">
                      <h4 className="font-black text-xs uppercase text-[#245638] mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-[#245638]" />
                        <span>Who Is Eligible?</span>
                      </h4>
                      <ul className="space-y-1.5 text-neutral-700">
                        {scheme.eligibility.map((el, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#245638] font-bold">&bull;</span>
                            <span>{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-white p-3.5 rounded-xl border border-[#202820] shadow-[2px_2px_0px_#202820]">
                      <h4 className="font-black text-xs uppercase text-[#202820] mb-2 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#202820]" />
                        <span>Mandatory Documentation Checklist</span>
                      </h4>
                      <ul className="space-y-1.5 text-neutral-700">
                        {scheme.requiredDocuments.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#E8B65C] font-black">&bull;</span>
                            <span className="font-medium">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Steps */}
                  <div className="bg-white p-4 rounded-xl border border-[#202820]">
                    <h4 className="font-black text-xs uppercase text-[#202820] mb-2">
                      Official Application Roadmap
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      {scheme.applicationSteps.map((step, idx) => (
                        <div key={idx} className="p-2.5 bg-[#F7F5EB] rounded-lg border border-neutral-300">
                          <span className="w-5 h-5 rounded-full bg-[#245638] text-white flex items-center justify-center text-[10px] font-black mb-1">
                            {idx + 1}
                          </span>
                          <p className="text-[11px] font-semibold text-neutral-800 leading-snug">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External Portal Link */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-neutral-500 font-semibold">
                      Portal: {scheme.officialPortalUrl}
                    </span>

                    <a
                      href={scheme.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#245638] text-white font-black text-xs rounded-lg hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820]"
                    >
                      <span>Visit Government Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E8B65C]" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
