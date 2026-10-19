import React from 'react';
import {
  X,
  Database,
  Cpu,
  Layers,
  Server,
  Cloud,
  CheckCircle,
  ExternalLink,
  Code2,
  BrainCircuit,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F7F5EB] border-3 border-[#202820] shadow-[8px_8px_0px_#202820] rounded-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#245638] text-white p-4 sm:p-6 border-b-3 border-[#202820] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#E8B65C] text-[#202820] text-xs font-black px-2.5 py-0.5 rounded border border-[#202820]">
                Engineering Architecture
              </span>
              <span className="text-xs text-[#DDEBD7] font-semibold">
                Full-Stack ML Agricultural Intelligence Pipeline
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#F7F5EB]">
              System Methodology &amp; Engineering Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[#DDEBD7] opacity-90 mt-0.5">
              FarmVerse AI – The Farmer's Complete Wealth Guide
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F7F5EB] text-[#202820] hover:bg-[#E8B65C] transition-colors border-2 border-[#202820] shadow-[2px_2px_0px_#202820]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-[#202820]">
          {/* 5-Stage Pipeline Overview */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#245638] mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#245638]"></span>
              End-to-End System Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white p-3 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#245638] mb-1.5">
                  <Database className="w-3.5 h-3.5 text-[#245638]" />
                  <span>1. Data Collection</span>
                </div>
                <ul className="text-[11px] space-y-1 text-neutral-600">
                  <li>• Farmer &amp; Farm Data</li>
                  <li>• Soil &amp; Climate Datasets</li>
                  <li>• Mandi Price Feeds</li>
                  <li>• Disease Leaf Images</li>
                  <li>• Govt Schemes Repository</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#245638] mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#245638]" />
                  <span>2. Preprocessing</span>
                </div>
                <ul className="text-[11px] space-y-1 text-neutral-600">
                  <li>• Outlier Cleaning</li>
                  <li>• Missing Value Imputation</li>
                  <li>• Feature Normalization</li>
                  <li>• Image Augmentation</li>
                  <li>• Metric Unit Standardizing</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#245638] mb-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 text-[#245638]" />
                  <span>3. AI/ML Models</span>
                </div>
                <ul className="text-[11px] space-y-1 text-neutral-600">
                  <li>• Random Forest / XGBoost</li>
                  <li>• CNN / MobileNet (Disease)</li>
                  <li>• ARIMA / Prophet (Prices)</li>
                  <li>• Linear Regression (Profit)</li>
                  <li>• Regional RAG LLM</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#245638] mb-1.5">
                  <Server className="w-3.5 h-3.5 text-[#245638]" />
                  <span>4. Development</span>
                </div>
                <ul className="text-[11px] space-y-1 text-neutral-600">
                  <li>• Java Spring Boot Backend</li>
                  <li>• Python FastAPI AI Service</li>
                  <li>• React.js + TypeScript</li>
                  <li>• PostgreSQL Database</li>
                  <li>• Secure REST Endpoints</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#245638] mb-1.5">
                  <Cloud className="w-3.5 h-3.5 text-[#245638]" />
                  <span>5. Deployment</span>
                </div>
                <ul className="text-[11px] space-y-1 text-neutral-600">
                  <li>• Docker Containers</li>
                  <li>• Cloud Run / AWS hosting</li>
                  <li>• PWA Offline caching</li>
                  <li>• Health checks &amp; logs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 12 System Modules Checklist */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#245638] mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8B65C]"></span>
              The 12 Core System Modules Implemented in this Frontend
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {[
                { no: '1', title: 'AI Crop Recommendation', sub: 'ML Classification on soil, season, water, budget' },
                { no: '2', title: 'Crop Guide', sub: 'Comprehensive cultivation, sowing, pests, yield' },
                { no: '3', title: 'Value Chain Explorer', sub: 'Crop parts, industrial uses, by-product streams' },
                { no: '4', title: 'Waste to Wealth', sub: 'Profitable products from residue & biomass' },
                { no: '5', title: 'Business Planner', sub: 'Target income strategy, capital, timeline & risk' },
                { no: '6', title: 'Market Intelligence', sub: 'APMC mandi trends, demand forecasts, seasonality' },
                { no: '7', title: 'Industry & Buyer Finder', sub: 'Direct link with FPOs, startups & food processors' },
                { no: '8', title: 'AI Farming Assistant', sub: 'Voice & text assistant in EN, Marathi, Hindi' },
                { no: '9', title: 'Disease Detection', sub: 'Leaf photo scanner with organic treatments' },
                { no: '10', title: 'Smart Farm Calendar', sub: 'Irrigation, spraying & harvest reminders' },
                { no: '11', title: 'Govt Schemes & Subsidies', sub: 'PM-Kisan, PMKSY Drip, PMFBY, AIF finder' },
                { no: '12', title: 'Profit Calculator', sub: 'Break-even analysis, costs, revenue & 3 scenarios' },
              ].map((m) => (
                <div
                  key={m.no}
                  className="p-2.5 bg-white rounded border border-[#202820] shadow-[1.5px_1.5px_0px_#202820] flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded bg-[#245638] text-white text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {m.no}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight text-[#202820]">{m.title}</h4>
                    <p className="text-[10px] text-neutral-600 leading-tight mt-0.5">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Truth in Data Notice */}
          <div className="p-3.5 bg-[#DDEBD7] border-2 border-[#245638] rounded-lg text-xs leading-relaxed">
            <h4 className="font-bold text-[#245638] flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-4 h-4 text-[#245638]" />
              Engineering Integrity &amp; Design Boundary
            </h4>
            <p className="text-[#202820]/90">
              This prototype strictly follows truth-in-data guidelines: live market rates, AI predictions, and diagnosis confidence scores are explicitly marked as illustrative demo datasets. Calculations (Direct Costs, Net Profit, ROI %, Break-Even) are computed through deterministic TypeScript math.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-[#202820] flex items-center justify-between">
          <span className="text-xs text-neutral-600 font-medium">
            FarmVerse AI • Independent Agricultural Intelligence Platform
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#245638] text-white font-bold text-xs rounded hover:bg-[#1b412a] border border-[#202820] shadow-[2px_2px_0px_#202820]"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
