import React, { useState } from 'react';
import {
  X,
  User,
  MapPin,
  Trees,
  Droplet,
  IndianRupee,
  Wrench,
  Check,
  Save,
  RotateCcw,
} from 'lucide-react';
import { FarmerProfile, Language, LandUnit, SoilType, WaterAvailability } from '../../types';
import { INDIAN_STATES } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  onSaveProfile: (updated: FarmerProfile) => void;
  lang: Language;
}

export const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  lang,
}) => {
  if (!isOpen) return null;
  const t = translations[lang];

  const [formData, setFormData] = useState<FarmerProfile>({ ...profile });
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  const availableDistricts = INDIAN_STATES[formData.state] || [
    'Nashik',
    'Pune',
    'Indore',
    'Rajkot',
  ];

  const soilOptions: SoilType[] = [
    'Black Soil (Regur)',
    'Alluvial Soil',
    'Red & Laterite Soil',
    'Sandy Loam',
    'Clayey Loam',
    'Saline / Alkaline',
  ];

  const waterOptions: WaterAvailability[] = [
    'Abundant (Canal/Well 24x7)',
    'Moderate (Borewell/Drip)',
    'Limited (Rainfed / Seasonal)',
    'Critical / Drought Prone',
  ];

  const machineryList = [
    'Tractor (45+ HP)',
    'Power Tiller',
    'Drip Irrigation Kit',
    'Sprinkler System',
    'Knapsack Sprayer',
    'Combine Harvester Access',
    'Solar Water Pump',
    'Rotavator',
  ];

  const handleMachineryToggle = (item: string) => {
    const current = formData.machineryAvailable || [];
    if (current.includes(item)) {
      setFormData({
        ...formData,
        machineryAvailable: current.filter((m) => m !== item),
      });
    } else {
      setFormData({
        ...formData,
        machineryAvailable: [...current, item],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...formData,
      isOnboarded: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F7F5EB] border-3 border-[#202820] shadow-[8px_8px_0px_#202820] rounded-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#245638] text-white p-4 sm:p-5 border-b-3 border-[#202820] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8B65C] text-[#202820] flex items-center justify-center font-black">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {t.setupFarmProfile}
              </h2>
              <p className="text-xs text-[#DDEBD7] opacity-90">{t.onboardingSubtext}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white text-[#202820] hover:bg-[#E8B65C] transition-colors border border-[#202820] shadow-[1px_1px_0px_#202820]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step progress tab */}
        <div className="bg-white border-b-2 border-[#202820] px-6 py-2.5 flex items-center justify-between text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-2 pb-1 transition-all ${
              activeStep === 1
                ? 'text-[#245638] border-b-2 border-[#245638] font-black'
                : 'text-neutral-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#DDEBD7] text-[#245638] flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Location &amp; Farmer Basics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-2 pb-1 transition-all ${
              activeStep === 2
                ? 'text-[#245638] border-b-2 border-[#245638] font-black'
                : 'text-neutral-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#DDEBD7] text-[#245638] flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Soil, Water &amp; Assets</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeStep === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Patil"
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#245638] shadow-[2px_2px_0px_#202820]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9822012345"
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#245638] shadow-[2px_2px_0px_#202820]"
                  />
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.state}
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => {
                      const newState = e.target.value;
                      const dists = INDIAN_STATES[newState] || [];
                      setFormData({
                        ...formData,
                        state: newState,
                        district: dists[0] || '',
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-xs font-bold focus:outline-none shadow-[2px_2px_0px_#202820]"
                  >
                    {Object.keys(INDIAN_STATES).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.district}
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-xs font-bold focus:outline-none shadow-[2px_2px_0px_#202820]"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.village}
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Niphad"
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-xs font-bold focus:outline-none shadow-[2px_2px_0px_#202820]"
                  />
                </div>
              </div>

              {/* Land Size & Unit */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.landSize}
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    value={formData.landSize}
                    onChange={(e) =>
                      setFormData({ ...formData, landSize: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-sm font-bold focus:outline-none shadow-[2px_2px_0px_#202820]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                    {t.landUnit}
                  </label>
                  <select
                    value={formData.landUnit}
                    onChange={(e) =>
                      setFormData({ ...formData, landUnit: e.target.value as LandUnit })
                    }
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg text-sm font-bold focus:outline-none shadow-[2px_2px_0px_#202820]"
                  >
                    <option value="Acres">Acres (एकर)</option>
                    <option value="Hectares">Hectares (हेक्टर)</option>
                    <option value="Guntha">Guntha (गुंठे)</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-black uppercase text-[#202820] mb-1.5">
                  {t.farmingExperience}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner (< 3 yrs)', 'Intermediate (3-10 yrs)', 'Expert (> 10 yrs)'] as const).map(
                    (exp) => (
                      <button
                        type="button"
                        key={exp}
                        onClick={() => setFormData({ ...formData, farmingExperience: exp })}
                        className={`p-2 rounded-lg text-xs font-bold border-2 text-center transition-all ${
                          formData.farmingExperience === exp
                            ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                            : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                        }`}
                      >
                        {exp}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 bg-[#245638] text-white font-bold text-xs rounded-lg hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820]"
                >
                  Next: Soil &amp; Water Details &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Soil Type */}
              <div>
                <label className="block text-xs font-black uppercase text-[#202820] mb-1.5 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-[#245638]" />
                  <span>{t.soilType}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {soilOptions.map((soil) => (
                    <button
                      type="button"
                      key={soil}
                      onClick={() => setFormData({ ...formData, soilType: soil })}
                      className={`p-2 text-left rounded-lg text-xs font-bold border-2 transition-all ${
                        formData.soilType === soil
                          ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                          : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                      }`}
                    >
                      {soil}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Availability */}
              <div>
                <label className="block text-xs font-black uppercase text-[#202820] mb-1.5 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.waterSource}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {waterOptions.map((w) => (
                    <button
                      type="button"
                      key={w}
                      onClick={() => setFormData({ ...formData, waterAvailability: w })}
                      className={`p-2.5 text-left rounded-lg text-xs font-bold border-2 transition-all ${
                        formData.waterAvailability === w
                          ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                          : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-black uppercase text-[#202820] mb-1.5 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#E8B65C]" />
                  <span>{t.budgetRange}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      'Low (< ₹25k/acre)',
                      'Medium (₹25k - ₹60k/acre)',
                      'High (> ₹60k/acre)',
                    ] as const
                  ).map((bg) => (
                    <button
                      type="button"
                      key={bg}
                      onClick={() => setFormData({ ...formData, budgetRange: bg })}
                      className={`p-2 text-center rounded-lg text-xs font-bold border-2 transition-all ${
                        formData.budgetRange === bg
                          ? 'bg-[#245638] text-white border-[#202820] shadow-[2px_2px_0px_#202820]'
                          : 'bg-white text-[#202820] border-[#202820] hover:bg-[#DDEBD7]'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Machinery */}
              <div>
                <label className="block text-xs font-black uppercase text-[#202820] mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#245638]" />
                  <span>Available Farm Machinery &amp; Equipment</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {machineryList.map((item) => {
                    const selected = formData.machineryAvailable?.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleMachineryToggle(item)}
                        className={`p-2 text-xs font-bold rounded-lg border-2 text-left flex items-center justify-between transition-all ${
                          selected
                            ? 'bg-[#DDEBD7] text-[#245638] border-[#245638] shadow-[1.5px_1.5px_0px_#245638]'
                            : 'bg-white text-neutral-600 border-[#202820]/40'
                        }`}
                      >
                        <span className="line-clamp-1">{item}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#245638] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[#202820]/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-3 py-1.5 bg-white text-xs font-bold rounded border border-[#202820] shadow-[1px_1px_0px_#202820]"
                >
                  &larr; Back
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#245638] text-white font-black text-xs rounded-lg hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820]"
                >
                  <Save className="w-4 h-4 text-[#E8B65C]" />
                  <span>{t.saveProfile}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
