import React, { useState } from 'react';
import {
  Sprout,
  Languages,
  User,
  Menu,
  X,
  FileSpreadsheet,
  Award,
  ChevronDown,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Recycle,
  Landmark,
  Building2,
  BotMessageSquare,
  Home,
  Check,
} from 'lucide-react';
import { FarmerProfile, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  profile: FarmerProfile;
  onOpenMethodology: () => void;
  onOpenProfileModal: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  profile,
  onOpenMethodology,
  onOpenProfileModal,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'recommendation', label: t.cropRecommendation, icon: Sprout },
    { id: 'disease', label: t.diseaseDetection, icon: ShieldAlert },
    { id: 'market', label: t.marketIntelligence, icon: TrendingUp },
    { id: 'planner', label: t.businessPlanner, icon: FileSpreadsheet },
    { id: 'waste', label: t.wasteToWealth, icon: Recycle },
    { id: 'schemes', label: t.govtSchemes, icon: Landmark },
    { id: 'buyers', label: t.buyersDirectory, icon: Building2 },
    { id: 'assistant', label: t.aiAssistant, icon: BotMessageSquare },
    { id: 'profile', label: t.savedPlans, icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EB] border-b-2 border-[#202820] shadow-[0_2px_0px_#202820]">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#245638] text-[#E8B65C] flex items-center justify-center border-2 border-[#202820] shadow-[2px_2px_0px_#202820] group-hover:bg-[#1b412a] transition-all">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-[#245638]">
                    FarmVerse<span className="text-[#E8B65C] ml-0.5">AI</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-black bg-[#E8B65C] text-[#202820] px-1.5 py-0.2 rounded border border-[#202820]">
                    v1.0
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-[#202820]/75 -mt-0.5 line-clamp-1">
                  {t.appTagline}
                </p>
              </div>
            </button>

            {/* System Architecture Badge */}
            <button
              onClick={onOpenMethodology}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#DDEBD7] text-[#245638] text-xs font-bold rounded border border-[#245638] hover:bg-[#E8B65C] hover:text-[#202820] transition-colors"
              title="Click to view System Architecture"
            >
              <Award className="w-3.5 h-3.5 text-[#245638]" />
              <span>System Architecture</span>
            </button>
          </div>

          {/* Right Controls: Language, Profile Quick Chip, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white text-xs font-bold text-[#202820] border-2 border-[#202820] rounded-lg shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7] transition-colors"
                aria-label="Select Language"
              >
                <Languages className="w-4 h-4 text-[#245638]" />
                <span className="uppercase">
                  {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border-2 border-[#202820] shadow-[4px_4px_0px_#202820] rounded-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-[#DDEBD7] ${
                      lang === 'en' ? 'bg-[#DDEBD7] text-[#245638]' : 'text-[#202820]'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('mr');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-[#DDEBD7] ${
                      lang === 'mr' ? 'bg-[#DDEBD7] text-[#245638]' : 'text-[#202820]'
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {lang === 'mr' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('hi');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-[#DDEBD7] ${
                      lang === 'hi' ? 'bg-[#DDEBD7] text-[#245638]' : 'text-[#202820]'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {lang === 'hi' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Farmer Profile Pill */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#DDEBD7] border-2 border-[#202820] rounded-lg shadow-[2px_2px_0px_#202820] hover:bg-[#E8B65C] transition-colors text-xs font-bold text-[#202820]"
              title="Edit Farm Profile"
            >
              <div className="w-6 h-6 rounded-full bg-[#245638] text-white flex items-center justify-center text-[10px]">
                {profile.name ? profile.name[0] : 'F'}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-xs font-bold text-[#202820] line-clamp-1">
                  {profile.name || 'Farmer'}
                </div>
                <div className="text-[10px] text-[#245638] font-semibold">
                  {profile.district} • {profile.landSize} {profile.landUnit}
                </div>
              </div>
            </button>

            {/* Login / Switch Account Button */}
            <button
              onClick={onOpenAuth}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-black text-[#245638] border-2 border-[#202820] rounded-lg shadow-[2px_2px_0px_#202820] hover:bg-[#E8B65C] hover:text-[#202820] transition-colors"
              title="Sign In or Register Farm"
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'लॉगिन' : lang === 'hi' ? 'लॉगिन' : 'Login / Sign Up'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white border-2 border-[#202820] shadow-[2px_2px_0px_#202820] text-[#202820]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Strip */}
        <nav className="hidden lg:flex items-center gap-1 py-1.5 overflow-x-auto border-t border-[#202820]/15 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#245638] text-white border-2 border-[#202820] shadow-[2px_2px_0px_#202820]'
                    : 'text-[#202820] hover:bg-[#DDEBD7] hover:text-[#245638]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E8B65C]' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5EB] border-b-2 border-[#202820] p-4 space-y-2">
          <div className="text-[11px] font-black uppercase text-neutral-500 mb-2 px-1">
            Agricultural Modules
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-left text-xs font-bold border-2 transition-all ${
                    isActive
                      ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                      : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E8B65C]' : 'text-[#245638]'}`} />
                  <span className="line-clamp-1">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#202820]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-[#E8B65C] text-[#202820] font-black text-xs rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'शेतकरी लॉगिन / नोंदणी' : lang === 'hi' ? 'किसान लॉगिन / पंजीकरण' : 'Farmer Login / Sign Up'}</span>
            </button>

            <button
              onClick={() => {
                onOpenMethodology();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#245638] underline flex items-center gap-1 justify-center py-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>System Architecture &amp; ML Pipeline</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
