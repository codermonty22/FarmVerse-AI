/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CropRecommendation,
  FarmBusinessPlan,
  FarmerProfile,
  Language,
} from './types';
import {
  getStoredLanguage,
  getStoredProfile,
  saveStoredLanguage,
  saveStoredProfile,
} from './services/apiService';
import { DemoNoticeBanner } from './components/common/DemoNoticeBanner';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { MethodologyModal } from './components/layout/MethodologyModal';
import { ProfileModal } from './components/profile/ProfileModal';
import { WelcomeModal } from './components/welcome/WelcomeModal';
import { FarmerDashboard } from './components/dashboard/FarmerDashboard';
import { CropRecommendationView } from './components/recommendation/CropRecommendationView';
import { DiseaseDetectionView } from './components/disease/DiseaseDetectionView';
import { MarketIntelligenceView } from './components/market/MarketIntelligenceView';
import { BusinessPlannerView } from './components/planner/BusinessPlannerView';
import { WasteToWealthView } from './components/waste/WasteToWealthView';
import { GovtSchemesView } from './components/schemes/GovtSchemesView';
import { IndustryBuyersView } from './components/buyers/IndustryBuyersView';
import { KisanAssistantView } from './components/assistant/KisanAssistantView';
import { ProfileSettingsView } from './components/profile/ProfileSettingsView';
import { AuthPage } from './components/auth/AuthPage';

export default function App() {
  const [lang, setLangState] = useState<Language>(getStoredLanguage());
  const [profile, setProfileState] = useState<FarmerProfile>(getStoredProfile());
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [isAuthPageOpen, setIsAuthPageOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const [preselectedCropForPlanner, setPreselectedCropForPlanner] =
    useState<CropRecommendation | null>(null);

  // Sync language
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveStoredLanguage(newLang);
    setProfileState((prev) => {
      const updated = { ...prev, preferredLanguage: newLang };
      saveStoredProfile(updated);
      return updated;
    });
  };

  // Sync profile
  const handleSaveProfile = (updated: FarmerProfile) => {
    setProfileState(updated);
    saveStoredProfile(updated);
  };

  const handleSelectCropForPlanner = (crop: CropRecommendation) => {
    setPreselectedCropForPlanner(crop);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlanToView = (plan: FarmBusinessPlan) => {
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetComplete = () => {
    const refreshed = getStoredProfile();
    setProfileState(refreshed);
    setActiveTab('dashboard');
  };

  if (isAuthPageOpen) {
    return (
      <div className="min-h-screen bg-[#F7F5EB]">
        <AuthPage
          lang={lang}
          setLang={setLang}
          onLoginSuccess={(newProfile) => {
            handleSaveProfile(newProfile);
            setIsAuthPageOpen(false);
            setActiveTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenMethodology={() => setIsMethodologyOpen(true)}
          onBackToApp={() => setIsAuthPageOpen(false)}
        />
        <MethodologyModal
          isOpen={isMethodologyOpen}
          onClose={() => setIsMethodologyOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EB] text-[#202820] flex flex-col font-sans selection:bg-[#E8B65C]/40">
      {/* Academic Demonstration & Methodology Notice Banner */}
      <DemoNoticeBanner
        lang={lang}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* Main Responsive Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        profile={profile}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthPageOpen(true)}
      />

      {/* Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 lg:pb-12">
        {activeTab === 'dashboard' && (
          <FarmerDashboard
            profile={profile}
            lang={lang}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        )}

        {activeTab === 'recommendation' && (
          <CropRecommendationView
            profile={profile}
            lang={lang}
            onSelectCropForPlanner={handleSelectCropForPlanner}
          />
        )}

        {activeTab === 'disease' && <DiseaseDetectionView lang={lang} />}

        {activeTab === 'market' && <MarketIntelligenceView lang={lang} />}

        {activeTab === 'planner' && (
          <BusinessPlannerView
            profile={profile}
            lang={lang}
            preselectedCrop={preselectedCropForPlanner}
            onSavedPlanSuccess={() => {}}
          />
        )}

        {activeTab === 'waste' && (
          <WasteToWealthView
            lang={lang}
            onNavigateToBuyers={() => {
              setActiveTab('buyers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'schemes' && <GovtSchemesView lang={lang} />}

        {activeTab === 'buyers' && <IndustryBuyersView lang={lang} />}

        {activeTab === 'assistant' && (
          <KisanAssistantView
            profile={profile}
            lang={lang}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSettingsView
            profile={profile}
            lang={lang}
            setLang={setLang}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onSelectPlanToView={handleSelectPlanToView}
            onResetComplete={handleResetComplete}
            onOpenAuth={() => setIsAuthPageOpen(true)}
          />
        )}
      </main>

      {/* Persistent Mobile Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

      {/* Global Modals */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        lang={lang}
      />

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        lang={lang}
        setLang={setLang}
        onStartOnboarding={() => {
          setIsWelcomeModalOpen(false);
          setIsProfileModalOpen(true);
        }}
        onExploreDemo={() => setIsWelcomeModalOpen(false)}
        onOpenMethodology={() => {
          setIsWelcomeModalOpen(false);
          setIsMethodologyOpen(true);
        }}
      />
    </div>
  );
}
