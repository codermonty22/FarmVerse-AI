import {
  AssistantMessage,
  CropRecommendation,
  DiseaseDetectionResult,
  FarmBusinessPlan,
  FarmerProfile,
  Language,
} from '../types';
import {
  CROPS_CATALOG,
  DEFAULT_FARMER_PROFILE,
  SAMPLE_DISEASE_SCENARIOS,
} from '../data/mockData';

const STORAGE_KEYS = {
  PROFILE: 'farmverse_profile_v1',
  SAVED_PLANS: 'farmverse_saved_plans_v1',
  DISEASE_HISTORY: 'farmverse_disease_history_v1',
  LANGUAGE: 'farmverse_language_v1',
  CHAT_HISTORY: 'farmverse_chat_history_v1',
};

// --- Profile Storage ---
export function getStoredProfile(): FarmerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading profile from localStorage', err);
  }
  return DEFAULT_FARMER_PROFILE;
}

export function saveStoredProfile(profile: FarmerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving profile to localStorage', err);
  }
}

// --- Language Storage ---
export function getStoredLanguage(): Language {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
    if (raw === 'en' || raw === 'mr' || raw === 'hi') {
      return raw;
    }
  } catch (e) {
    // fallback
  }
  return 'en';
}

export function saveStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {}
}

// --- Business Plans Storage & Math ---
export function getSavedBusinessPlans(): FarmBusinessPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_PLANS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {}
  
  // Return preloaded sample plan for immediate value
  return [
    {
      id: 'plan-default-onion',
      planName: 'Rabi Red Onion 4.5 Acres Strategy',
      cropName: 'Red Onion (Kanda)',
      landSize: 4.5,
      landUnit: 'Acres',
      seedCost: 27000,
      fertilizerCost: 36000,
      laborCost: 48000,
      irrigationCost: 15000,
      machineryCost: 22000,
      transportCost: 18000,
      contingencyPercent: 10,
      expectedYieldQuintals: 380,
      sellingPricePerQuintal: 1850,
      totalCost: 182600,
      grossRevenue: 703000,
      netProfit: 520400,
      roiPercent: 285,
      breakEvenPricePerQuintal: 480.53,
      scenarioAlternatives: [
        {
          scenario: 'Conservative (-20% yield)',
          yieldQtl: 304,
          pricePerQtl: 1850,
          profit: 379800,
        },
        {
          scenario: 'Expected',
          yieldQtl: 380,
          pricePerQtl: 1850,
          profit: 520400,
        },
        {
          scenario: 'Optimistic (+20% price)',
          yieldQtl: 380,
          pricePerQtl: 2220,
          profit: 661000,
        },
      ],
      createdAt: '2026-10-15',
    },
  ];
}

export function saveBusinessPlan(plan: FarmBusinessPlan): void {
  try {
    const existing = getSavedBusinessPlans();
    const updated = [plan, ...existing.filter((p) => p.id !== plan.id)];
    localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(updated));
  } catch (err) {}
}

export function deleteBusinessPlan(id: string): void {
  try {
    const existing = getSavedBusinessPlans();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(filtered));
  } catch (err) {}
}

export function calculateFarmBusinessPlan(input: {
  planName: string;
  cropName: string;
  landSize: number;
  landUnit: 'Acres' | 'Hectares' | 'Guntha';
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  irrigationCost: number;
  machineryCost: number;
  transportCost: number;
  contingencyPercent: number;
  expectedYieldQuintals: number;
  sellingPricePerQuintal: number;
}): FarmBusinessPlan {
  const directCosts =
    Math.max(0, input.seedCost) +
    Math.max(0, input.fertilizerCost) +
    Math.max(0, input.laborCost) +
    Math.max(0, input.irrigationCost) +
    Math.max(0, input.machineryCost) +
    Math.max(0, input.transportCost);

  const contingency = (directCosts * Math.max(0, input.contingencyPercent)) / 100;
  const totalCost = Math.round(directCosts + contingency);

  const yieldQtl = Math.max(0, input.expectedYieldQuintals);
  const priceQtl = Math.max(0, input.sellingPricePerQuintal);
  const grossRevenue = Math.round(yieldQtl * priceQtl);
  const netProfit = grossRevenue - totalCost;

  const roiPercent = totalCost > 0 ? Math.round((netProfit / totalCost) * 100) : 0;
  const breakEvenPricePerQuintal = yieldQtl > 0 ? Number((totalCost / yieldQtl).toFixed(2)) : 0;

  // Scenarios
  const conservativeYield = Math.round(yieldQtl * 0.8);
  const conservativeRevenue = Math.round(conservativeYield * priceQtl);
  const conservativeProfit = conservativeRevenue - totalCost;

  const optimisticPrice = Math.round(priceQtl * 1.2);
  const optimisticRevenue = Math.round(yieldQtl * optimisticPrice);
  const optimisticProfit = optimisticRevenue - totalCost;

  return {
    id: 'plan-' + Date.now(),
    planName: input.planName.trim() || `${input.cropName} Financial Plan`,
    cropName: input.cropName,
    landSize: input.landSize,
    landUnit: input.landUnit,
    seedCost: input.seedCost,
    fertilizerCost: input.fertilizerCost,
    laborCost: input.laborCost,
    irrigationCost: input.irrigationCost,
    machineryCost: input.machineryCost,
    transportCost: input.transportCost,
    contingencyPercent: input.contingencyPercent,
    expectedYieldQuintals: yieldQtl,
    sellingPricePerQuintal: priceQtl,
    totalCost,
    grossRevenue,
    netProfit,
    roiPercent,
    breakEvenPricePerQuintal,
    scenarioAlternatives: [
      {
        scenario: 'Conservative (-20% yield)',
        yieldQtl: conservativeYield,
        pricePerQtl: priceQtl,
        profit: conservativeProfit,
      },
      {
        scenario: 'Expected',
        yieldQtl,
        pricePerQtl: priceQtl,
        profit: netProfit,
      },
      {
        scenario: 'Optimistic (+20% price)',
        yieldQtl,
        pricePerQtl: optimisticPrice,
        profit: optimisticProfit,
      },
    ],
    createdAt: new Date().toISOString().split('T')[0],
  };
}

// --- Disease Scan History ---
export function getSavedDiseaseScans(): DiseaseDetectionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISEASE_HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {}
  return SAMPLE_DISEASE_SCENARIOS;
}

export function saveDiseaseScan(result: DiseaseDetectionResult): void {
  try {
    const existing = getSavedDiseaseScans();
    const updated = [result, ...existing.filter((s) => s.id !== result.id)];
    localStorage.setItem(STORAGE_KEYS.DISEASE_HISTORY, JSON.stringify(updated));
  } catch (err) {}
}

// --- Reset Demo Data ---
export function resetAllDemoData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PLANS);
    localStorage.removeItem(STORAGE_KEYS.DISEASE_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  } catch (err) {}
}

// --- Crop Recommendation Query Service ---
export async function queryCropRecommendations(criteria: {
  season?: string;
  soilType?: string;
  waterAvailability?: string;
  category?: string;
}): Promise<CropRecommendation[]> {
  // Simulate network roundtrip to Python FastAPI ML service
  await new Promise((res) => setTimeout(res, 450));

  let results = [...CROPS_CATALOG];

  if (criteria.category && criteria.category !== 'All') {
    results = results.filter((c) => c.category === criteria.category);
  }

  // Rank / sort by suitability
  results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  return results;
}

// --- Disease Analysis Service ---
export async function analyzeLeafImage(
  imageDataUrl: string,
  cropHint: string = 'Tomato'
): Promise<DiseaseDetectionResult> {
  // Simulate CNN inference (e.g. ResNet50 / MobileNetV3)
  await new Promise((res) => setTimeout(res, 900));

  // If crop hint matches cotton, return cotton leaf curl scenario
  if (cropHint.toLowerCase().includes('cotton')) {
    const base = SAMPLE_DISEASE_SCENARIOS[1];
    return {
      ...base,
      id: 'scan-' + Date.now(),
      leafImageUrl: imageDataUrl || base.leafImageUrl,
      timestamp: new Date().toLocaleString(),
    };
  }

  if (cropHint.toLowerCase().includes('pomegranate') || cropHint.toLowerCase().includes('healthy')) {
    const base = SAMPLE_DISEASE_SCENARIOS[2];
    return {
      ...base,
      id: 'scan-' + Date.now(),
      leafImageUrl: imageDataUrl || base.leafImageUrl,
      timestamp: new Date().toLocaleString(),
    };
  }

  // Default to tomato early blight
  const base = SAMPLE_DISEASE_SCENARIOS[0];
  return {
    ...base,
    id: 'scan-' + Date.now(),
    cropName: cropHint || 'Tomato',
    leafImageUrl: imageDataUrl || base.leafImageUrl,
    timestamp: new Date().toLocaleString(),
  };
}

// --- Multilingual AI Assistant Service ---
export async function askKisanAssistant(
  query: string,
  lang: Language,
  profile?: FarmerProfile
): Promise<AssistantMessage> {
  // Simulate LLM / RAG response
  await new Promise((res) => setTimeout(res, 600));

  const lower = query.toLowerCase();

  if (lower.includes('profit') || lower.includes('nfa') || lower.includes('लाभा') || lower.includes('नफा')) {
    const text =
      lang === 'mr'
        ? `तुमच्या ${profile?.district || 'नाशिक'} भागातील कांदा आणि हरभरा हे पिके सध्या चांगला नफा देतात. जर तुम्ही ४.५ एकरावर कांदा लावला, तर अंदाजे ₹५,२०,००० निव्वळ नफा होऊ शकतो. अचूक गणित पाहण्यासाठी 'नफा नियोजन' (Profit Planner) टॅब वापरा.`
        : lang === 'hi'
        ? `आपके ${profile?.district || 'नासिक'} क्षेत्र में लाल प्याज (कांदा) और चना अच्छा लाभ दे सकते हैं। ४.५ एकड़ में प्याज से लगभग ₹५,२०,००० का शुद्ध लाभ संभावित है। सटीक गणना के लिए 'लाभ योजना' (Profit Planner) मॉड्यूल देखें।`
        : `Based on your ${profile?.district || 'Nashik'} region and ${profile?.soilType || 'Black soil'}, Red Onion and Chickpea show the highest profit potential. An estimated net profit of ~₹5,20,400 is achievable on a 4.5-acre plot. Open the 'Profit Planner' module for a live breakdown.`;

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      suggestions: [
        'How can I lower my fertilizer costs?',
        'What is the mandi price for onion today?',
        'Tell me about drip irrigation subsidy.',
      ],
      moduleShortcut: {
        tabId: 'planner',
        label: lang === 'mr' ? 'नफा नियोजन उघडा' : lang === 'hi' ? 'लाभ योजना खोलें' : 'Open Profit Planner',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lower.includes('blight') || lower.includes('disease') || lower.includes('रोग') || lower.includes('कीड')) {
    const text =
      lang === 'mr'
        ? `पानांवरील करपा किंवा डागांसाठी ५% निंबोळी अर्क (Neem Seed Kernel Extract) किंवा ट्रायकोडर्मा हरजिआनम ५ ग्रॅम/लिटर फवारा. अधिक माहितीसाठी 'रोग निदान' (Disease Detection) मध्ये पानाचा फोटो अपलोड करा.`
        : lang === 'hi'
        ? `पत्तियों पर झुलसा या धब्बे के लिए ५% नीम अर्क या ट्राइकोडर्मा ५ ग्राम/लीटर का छिड़काव करें। सटीक जांच के लिए 'रोग पहचान' (Disease Detection) में फोटो अपलोड करें।`
        : `For fungal blight lesions, spray cold-pressed 5% Neem Seed Kernel Extract (NSKE) or Trichoderma harzianum @ 5g/L water. Upload a leaf photo in our 'Disease Detection' module for an instant scan.`;

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      suggestions: [
        'How to prepare Dashparni Ark at home?',
        'Is Mancozeb safe for tomatoes during flowering?',
        'How to prevent whiteflies on cotton?',
      ],
      moduleShortcut: {
        tabId: 'disease',
        label: lang === 'mr' ? 'रोग निदान उघडा' : lang === 'hi' ? 'रोग पहचान खोलें' : 'Open Disease Detection',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lower.includes('scheme') || lower.includes('subsidy') || lower.includes('योजना') || lower.includes('अनुदान')) {
    const text =
      lang === 'mr'
        ? `तुम्ही 'पीएम कृषी सिंचन योजना' (ठिबक सिंचनासाठी ५५-८०% अनुदान) आणि 'पीएम किसान' (दरवर्षी ₹६,०००) साठी पात्र आहात. संपूर्ण माहिती आणि कागदपत्रांची यादी 'सरकारी योजना' टॅबमध्ये उपलब्ध आहे.`
        : lang === 'hi'
        ? `आप 'पीएम कृषि सिंचाई योजना' (ड्रिप पर ५५-८०% सब्सिडी) और 'पीएम-किसान' (वार्षिक ₹६,०००) के पात्र हैं। आवश्यक दस्तावेजों की सूची 'सरकारी योजनाएं' मॉड्यूल में देखें।`
        : `You are eligible for the Per Drop More Crop (PMKSY) micro-irrigation subsidy (55% to 80% on drip equipment) and PM-KISAN. View required documents in our 'Govt Schemes' tab.`;

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      suggestions: [
        'What documents are needed for PM-KUSUM solar pump?',
        'How to claim PMFBY crop insurance after hail?',
        'Check Agri Infrastructure Fund 3% loan scheme.',
      ],
      moduleShortcut: {
        tabId: 'schemes',
        label: lang === 'mr' ? 'सरकारी योजना पहा' : lang === 'hi' ? 'सरकारी योजनाएं देखें' : 'View Govt Schemes',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  // Default general farming advisory
  const text =
    lang === 'mr'
      ? `नमस्कार! फार्मव्हर्स AI मध्ये आपले स्वागत आहे. मी तुमच्या ${profile?.soilType || 'काळ्या मातीसाठी'} योग्य पिके, बाजार भाव, खतांचे प्रमाण, आणि पिकांच्या अवशेषातून नफा कसा कमवावा याबद्दल मार्गदर्शन करू शकतो. खालीलपैकी एखादा प्रश्न निवडा किंवा नवीन प्रश्न विचारा.`
      : lang === 'hi'
      ? `नमस्ते! फार्मवर्स AI में आपका स्वागत है। मैं आपकी ${profile?.soilType || 'काली मिट्टी'} के लिए उपयुक्त फसलें, मंडी भाव, खाद प्रबंधन और फसल अवशेषों से अतिरिक्त आय के बारे में मदद कर सकता हूँ। कोई प्रश्न चुनें या नया पूछें।`
      : `Hello! I am your FarmVerse AI Assistant. I can help optimize your farm decisions for your ${profile?.soilType || 'Black soil'}, current APMC mandi prices, bio-fertilizer recipes, and crop waste monetization. Ask any question or tap a suggestion below.`;

  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    text,
    suggestions: [
      'Which crop gives maximum profit this season?',
      'How do I treat Early Blight organically?',
      'What is today\'s Onion price in Lasalgaon?',
      'Tell me about drip irrigation subsidy.',
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
