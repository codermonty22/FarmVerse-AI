import React from 'react';
import { AlertCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenMethodology: () => void;
  lang: 'en' | 'mr' | 'hi';
}

export const DemoNoticeBanner: React.FC<Props> = ({ onOpenMethodology, lang }) => {
  const text = {
    en: {
      tag: 'Interactive Demonstration',
      title: 'FarmVerse AI Prototype — Realistic Demo Data Active',
      desc: 'All crop models, APMC mandi rates, and disease diagnoses shown are illustrative simulations based on Maharashtra & India agricultural datasets.',
      cta: 'View System Architecture & ML Pipeline',
    },
    mr: {
      tag: 'प्रात्यक्षिक आवृत्ती',
      title: 'फार्मव्हर्स AI प्रोटोटाईप — प्रात्यक्षिक डेटा कार्यरत',
      desc: 'पिक शिफारस, मंडी भाव आणि रोग निदान हे भारतातील कृषी डेटावर आधारित प्रगत सिम्युलेशन आहे.',
      cta: 'प्रकल्प संरचना व ML पाईपलाईन पहा',
    },
    hi: {
      tag: 'प्रदर्शन संस्करण',
      title: 'फार्मवर्स AI प्रोटोटाइप — प्रात्यक्षिक डेटा सक्रिय',
      desc: 'फसल सिफारिश, मंडी भाव और रोग निदान भारतीय कृषि डेटा पर आधारित प्रगत सिमुलेशन हैं।',
      cta: 'प्रोजेक्ट आर्किटेक्चर व ML पाइपलाइन देखें',
    },
  }[lang];

  return (
    <div className="bg-[#245638] text-[#F7F5EB] border-b-2 border-[#202820] px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="neo-badge bg-[#E8B65C] text-[#202820] font-black text-[10px] px-2 py-0.5 border border-[#202820]">
            {text.tag}
          </span>
          <p className="leading-snug">
            <strong className="font-semibold">{text.title}:</strong>{' '}
            <span className="opacity-90">{text.desc}</span>
          </p>
        </div>
        <button
          onClick={onOpenMethodology}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDEBD7] text-[#245638] font-bold rounded hover:bg-[#E8B65C] hover:text-[#202820] transition-colors border border-[#202820] shadow-[1px_1px_0px_#202820]"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{text.cta}</span>
        </button>
      </div>
    </div>
  );
};
