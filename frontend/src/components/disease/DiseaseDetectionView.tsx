import React, { useState, useRef } from 'react';
import {
  ShieldAlert,
  Upload,
  Camera,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Download,
  Trash2,
  ArrowRight,
  Leaf,
  Bug,
} from 'lucide-react';
import { DiseaseDetectionResult, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { SAMPLE_DISEASE_SCENARIOS } from '../../data/mockData';
import { analyzeLeafImage, saveDiseaseScan } from '../../services/apiService';

interface Props {
  lang: Language;
}

export const DiseaseDetectionView: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setValidationError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setValidationError('File size exceeds 8MB. Please upload a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUseSample = (scenario: DiseaseDetectionResult) => {
    setValidationError(null);
    setImagePreview(scenario.leafImageUrl);
    setSelectedCrop(scenario.cropName);
    setResult(null);
  };

  const handleStartAnalysis = async () => {
    if (!imagePreview) return;
    setIsScanning(true);
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    try {
      const res = await analyzeLeafImage(imagePreview, selectedCrop);
      clearInterval(interval);
      setScanProgress(100);
      setResult(res);
      saveDiseaseScan(res);
    } catch (err) {
      setValidationError('Simulation failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    setResult(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b-2 border-[#202820]/15 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="neo-badge bg-red-100 text-red-800 text-[10px] border border-red-400">
            System Module 09 &bull; CNN Deep Learning
          </span>
          <span className="text-xs font-semibold text-neutral-500">
            Convolutional Neural Network Simulation for Leaf Pathogens
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
          {t.diseaseDetection} &amp; Plant Doctor
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          Upload or capture a photo of an affected plant leaf. FarmVerse AI analyzes necrotic lesion patterns, chlorosis, and fungal enations to recommend university-verified organic and biological treatments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="neo-card p-5 rounded-2xl bg-white space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                Select Crop Being Diagnosed
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
              >
                <option value="Tomato">Tomato (Early Blight / Leaf Curl)</option>
                <option value="Cotton">Cotton / Kapas (CLCuV / Bollworm)</option>
                <option value="Pomegranate">Pomegranate / Dalimb (Bacterial Blight / Telya)</option>
                <option value="Soybean">Soybean (Rust / Yellow Mosaic)</option>
                <option value="Onion">Onion (Purple Blotch / Stemphylium)</option>
                <option value="Wheat">Wheat (Yellow Rust)</option>
              </select>
            </div>

            {/* Hidden native inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload Area */}
            {imagePreview ? (
              <div className="space-y-3">
                <div className="relative h-64 rounded-xl overflow-hidden border-2 border-[#202820] bg-neutral-900 shadow-[3px_3px_0px_#202820]">
                  <img
                    src={imagePreview}
                    alt="Leaf specimen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      onClick={handleClear}
                      className="p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-lg backdrop-blur-xs border border-white/40 transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    Specimen: {selectedCrop}
                  </div>
                </div>

                {/* Progress bar during scan */}
                {isScanning && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-[#245638]">
                      <span>Scanning leaf features...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-[#DDEBD7] h-2.5 rounded-full overflow-hidden border border-[#202820]">
                      <div
                        className="bg-[#245638] h-full transition-all duration-200"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Scan Action */}
                <button
                  onClick={handleStartAnalysis}
                  disabled={isScanning}
                  className="w-full py-3 bg-[#245638] text-white font-black text-xs rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#E8B65C]" />
                  <span>{isScanning ? 'Running CNN Inference...' : 'Analyze Leaf with AI Doctor'}</span>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#202820]/40 rounded-xl p-6 text-center bg-[#F7F5EB] space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#DDEBD7] text-[#245638] flex items-center justify-center border border-[#202820]">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#202820]">
                    Upload an infected or suspect leaf
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Clear natural lighting provides the highest diagnostic accuracy.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-xs font-bold text-[#202820] rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7]"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#245638]" />
                    <span>Upload Image</span>
                  </button>

                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#245638] text-xs font-bold text-white rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#1b412a]"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#E8B65C]" />
                    <span>Open Camera</span>
                  </button>
                </div>
              </div>
            )}

            {validationError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded-lg font-medium">
                {validationError}
              </div>
            )}
          </div>

          {/* Quick Demo Pre-loaded Samples for Evaluation */}
          <div className="neo-card p-4 rounded-xl bg-[#F7F5EB] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-black uppercase text-neutral-600">
              <span>Instant Academic Test Samples</span>
              <span className="text-[10px] font-bold text-[#245638]">Click to load</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_DISEASE_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => handleUseSample(scen)}
                  className="p-2 bg-white rounded-lg border border-[#202820] text-left hover:border-[#245638] transition-colors shadow-[1px_1px_0px_#202820] group"
                >
                  <img
                    src={scen.leafImageUrl}
                    alt={scen.cropName}
                    className="w-full h-14 object-cover rounded mb-1"
                  />
                  <div className="text-[11px] font-bold text-[#202820] truncate">
                    {scen.cropName}
                  </div>
                  <div className="text-[9px] text-neutral-500 truncate">{scen.suspectedIssue}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Report (7 Cols) */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="neo-card rounded-2xl bg-white overflow-hidden space-y-4">
              {/* Report Header */}
              <div
                className={`p-5 text-white border-b-3 border-[#202820] flex items-center justify-between ${
                  result.isHealthy
                    ? 'bg-[#245638]'
                    : result.severity === 'Severe'
                    ? 'bg-red-800'
                    : 'bg-amber-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="neo-badge bg-white text-[#202820] text-[10px] font-black">
                      Confidence: {result.confidence}%
                    </span>
                    <span className="bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Severity: {result.severity}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">{result.suspectedIssue}</h2>
                  <p className="text-xs opacity-90">Host Crop: {result.cropName}</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  {result.isHealthy ? (
                    <CheckCircle2 className="w-7 h-7 text-[#DDEBD7]" />
                  ) : (
                    <Bug className="w-7 h-7 text-[#E8B65C]" />
                  )}
                </div>
              </div>

              <div className="p-5 space-y-4 text-xs">
                {/* Visual Symptoms */}
                <div>
                  <h3 className="font-black text-xs uppercase text-[#202820] mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Identified Visual Symptoms</span>
                  </h3>
                  <ul className="space-y-1 bg-[#F7F5EB] p-3 rounded-lg border border-[#202820]/30 text-neutral-800">
                    {result.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#245638] font-bold">&bull;</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Immediate Cultural Actions */}
                <div>
                  <h3 className="font-black text-xs uppercase text-[#245638] mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#245638]" />
                    <span>Immediate Cultural &amp; Farm Sanitation Steps</span>
                  </h3>
                  <div className="space-y-1">
                    {result.immediateActions.map((act, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-white border border-[#202820] rounded-lg shadow-[1px_1px_0px_#202820] font-medium"
                      >
                        {act}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biological & Organic Treatments */}
                <div>
                  <h3 className="font-black text-xs uppercase text-[#245638] mb-1.5 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#245638]" />
                    <span>University-Verified Organic Remedies (Zero Chemical Residue)</span>
                  </h3>
                  <div className="space-y-1.5 bg-[#DDEBD7] p-3 rounded-lg border border-[#245638]">
                    {result.organicTreatments.map((tr, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#202820]">
                        <span className="w-4 h-4 rounded-full bg-[#245638] text-white flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{tr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chemical Options & Caution */}
                {result.chemicalTreatments.length > 0 && !result.isHealthy && (
                  <div>
                    <h3 className="font-black text-xs uppercase text-neutral-700 mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Chemical Intervention (Use Only if Infestation Exceeds ETL)</span>
                    </h3>
                    <div className="p-3 bg-neutral-100 rounded-lg border border-neutral-300 text-neutral-800 space-y-1">
                      {result.chemicalTreatments.map((chem, i) => (
                        <p key={i} className="font-semibold">
                          &bull; {chem}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert Advisory Disclaimer */}
                <div className="p-3 bg-amber-50 border-2 border-amber-500 rounded-lg text-amber-950 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="leading-snug text-[11px] font-medium">
                    <strong>KVK Advisory Protocol:</strong> {result.expertWarning}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-[#F7F5EB] border-t-2 border-[#202820] flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-semibold">
                  Saved to Farm History
                </span>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-white text-xs font-bold rounded-lg border border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7]"
                >
                  Scan Another Leaf
                </button>
              </div>
            </div>
          ) : (
            <div className="neo-card p-8 rounded-2xl bg-[#F7F5EB] text-center border-2 border-dashed border-[#202820]/40 flex flex-col items-center justify-center min-h-[400px] space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white text-neutral-400 flex items-center justify-center border-2 border-[#202820] shadow-[3px_3px_0px_#202820]">
                <ShieldAlert className="w-8 h-8 text-[#245638]" />
              </div>
              <div className="max-w-md">
                <h3 className="font-black text-base text-[#202820]">
                  Diagnosis Report Awaiting Specimen
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Upload an image from your device, capture a leaf in your field, or pick one of the sample test leaves on the left to see the AI diagnostic report in action.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
