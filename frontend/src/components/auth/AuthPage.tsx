import React, { useState } from 'react';
import {
  Sprout,
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Languages,
  Eye,
  EyeOff,
  MapPin,
  Trees,
} from 'lucide-react';
import { FarmerProfile, Language, LandUnit, SoilType } from '../../types';
import { INDIAN_STATES } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  onLoginSuccess: (profile: FarmerProfile) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenMethodology: () => void;
  onBackToApp?: () => void;
}

export const AuthPage: React.FC<Props> = ({
  onLoginSuccess,
  lang,
  setLang,
  onOpenMethodology,
  onBackToApp,
}) => {
  const t = translations[lang];

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');

  // Sign In States
  const [phoneOrEmail, setPhoneOrEmail] = useState('9822012345');
  const [password, setPassword] = useState('kisan123');
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState<'input_phone' | 'input_otp'>('input_phone');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Sign Up States
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpState, setSignUpState] = useState('Maharashtra');
  const [signUpDistrict, setSignUpDistrict] = useState('Nashik');
  const [signUpVillage, setSignUpVillage] = useState('');
  const [signUpLandSize, setSignUpLandSize] = useState<number>(3.0);
  const [signUpLandUnit, setSignUpLandUnit] = useState<LandUnit>('Acres');
  const [signUpSoilType, setSignUpSoilType] = useState<SoilType>('Black Soil (Regur)');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableDistricts = INDIAN_STATES[signUpState] || ['Nashik', 'Pune', 'Akola'];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!phoneOrEmail || phoneOrEmail.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep('input_otp');
      setOtpSent(true);
      setCountdown(30);
    }, 600);
  };

  const handleVerifyOtpAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 4-digit verification code.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Demo farmer profile
      const loggedProfile: FarmerProfile = {
        name: 'Anand Patil',
        phone: phoneOrEmail,
        state: 'Maharashtra',
        district: 'Nashik',
        village: 'Niphad',
        landSize: 4.5,
        landUnit: 'Acres',
        soilType: 'Black Soil (Regur)',
        waterAvailability: 'Moderate (Borewell/Drip)',
        budgetRange: 'Medium (₹25k - ₹60k/acre)',
        farmingExperience: 'Intermediate (3-10 yrs)',
        machineryAvailable: ['Tractor (45 HP)', 'Drip Irrigation Kit', 'Knapsack Sprayer'],
        preferredLanguage: lang,
        cropsGrown: ['Onion', 'Soybean', 'Wheat'],
        isOnboarded: true,
      };
      onLoginSuccess(loggedProfile);
    }, 700);
  };

  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!phoneOrEmail || !password) {
      setErrorMessage('Please fill in your credentials.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const loggedProfile: FarmerProfile = {
        name: 'Anand Patil',
        phone: phoneOrEmail.includes('@') ? '9822012345' : phoneOrEmail,
        state: 'Maharashtra',
        district: 'Nashik',
        village: 'Niphad',
        landSize: 4.5,
        landUnit: 'Acres',
        soilType: 'Black Soil (Regur)',
        waterAvailability: 'Moderate (Borewell/Drip)',
        budgetRange: 'Medium (₹25k - ₹60k/acre)',
        farmingExperience: 'Intermediate (3-10 yrs)',
        machineryAvailable: ['Tractor (45 HP)', 'Drip Irrigation Kit', 'Knapsack Sprayer'],
        preferredLanguage: lang,
        cropsGrown: ['Onion', 'Soybean'],
        isOnboarded: true,
      };
      onLoginSuccess(loggedProfile);
    }, 600);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!signUpName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newFarmer: FarmerProfile = {
        name: signUpName.trim(),
        phone: signUpPhone || '9876543210',
        state: signUpState,
        district: signUpDistrict,
        village: signUpVillage || 'Adgaon',
        landSize: signUpLandSize || 2.5,
        landUnit: signUpLandUnit,
        soilType: signUpSoilType,
        waterAvailability: 'Moderate (Borewell/Drip)',
        budgetRange: 'Medium (₹25k - ₹60k/acre)',
        farmingExperience: 'Intermediate (3-10 yrs)',
        machineryAvailable: ['Tractor (45 HP)', 'Drip Irrigation Kit'],
        preferredLanguage: lang,
        cropsGrown: ['Onion', 'Soybean'],
        isOnboarded: true,
      };
      onLoginSuccess(newFarmer);
    }, 750);
  };

  const handleQuickDemoLogin = () => {
    const demoProfile: FarmerProfile = {
      name: 'Anand Patil',
      phone: '9822012345',
      state: 'Maharashtra',
      district: 'Nashik',
      village: 'Niphad',
      landSize: 4.5,
      landUnit: 'Acres',
      soilType: 'Black Soil (Regur)',
      waterAvailability: 'Moderate (Borewell/Drip)',
      budgetRange: 'Medium (₹25k - ₹60k/acre)',
      farmingExperience: 'Intermediate (3-10 yrs)',
      machineryAvailable: ['Tractor (45 HP)', 'Drip Irrigation Kit', 'Knapsack Sprayer'],
      preferredLanguage: lang,
      cropsGrown: ['Onion', 'Soybean', 'Wheat'],
      isOnboarded: true,
    };
    onLoginSuccess(demoProfile);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F5EB] flex flex-col justify-center items-center p-4 sm:p-6 overflow-hidden">
      {/* Dynamic Background Organic Blurs for Glassmorphic Refraction */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#245638]/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#E8B65C]/35 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[#DDEBD7]/80 blur-[100px] pointer-events-none" />
      
      {/* Subtle Agricultural Grid/Contour Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#202820 1.5px, transparent 1.5px), radial-gradient(#245638 1.5px, #F7F5EB 1.5px)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* Top Floating Academic & Language Bar */}
      <header className="relative z-10 w-full max-w-xl flex items-center justify-between mb-4">
        <button
          onClick={onOpenMethodology}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/75 backdrop-blur-md text-[#245638] text-xs font-bold rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#E8B65C] transition-all"
        >
          <Award className="w-4 h-4 text-[#245638]" />
          <span>System Architecture &amp; Pipeline</span>
        </button>

        {/* Language Quick Switcher */}
        <div className="flex items-center gap-1 bg-white/75 backdrop-blur-md p-1 rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
          {(['en', 'mr', 'hi'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 text-xs font-black rounded uppercase transition-colors ${
                lang === l
                  ? 'bg-[#245638] text-white'
                  : 'text-[#202820] hover:bg-[#DDEBD7]'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'mr' ? 'मराठी' : 'हिंदी'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Glassmorphic Auth Card */}
      <div className="relative z-10 w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-200">
        {/* Brand Banner */}
        <div className="flex items-center justify-between border-b-2 border-[#202820]/15 pb-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#245638] text-[#E8B65C] flex items-center justify-center border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex-shrink-0">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-[#245638]">
                  FarmVerse<span className="text-[#E8B65C]"> AI</span>
                </span>
                <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[9px] font-black px-1.5 py-0">
                  PORTAL
                </span>
              </div>
              <p className="text-xs font-bold text-neutral-600">
                {t.appTagline}
              </p>
            </div>
          </div>

          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="text-xs font-bold text-[#245638] hover:underline"
            >
              Back to App &rarr;
            </button>
          )}
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 gap-2 bg-[#202820]/5 p-1.5 rounded-xl border-2 border-[#202820] mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs sm:text-sm font-black rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-[#245638] text-white shadow-[2px_2px_0px_#202820] border-2 border-[#202820]'
                : 'text-[#202820] hover:bg-white/40'
            }`}
          >
            {lang === 'mr' ? 'लॉगिन करा' : lang === 'hi' ? 'लॉगिन करें' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs sm:text-sm font-black rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-[#245638] text-white shadow-[2px_2px_0px_#202820] border-2 border-[#202820]'
                : 'text-[#202820] hover:bg-white/40'
            }`}
          >
            {lang === 'mr' ? 'नवीन शेतकरी नोंदणी' : lang === 'hi' ? 'नया किसान खाता' : 'Create Account'}
          </button>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100/90 backdrop-blur-sm border-2 border-red-500 rounded-xl text-red-900 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {/* MODE 1: SIGN IN */}
        {mode === 'signin' && (
          <div className="space-y-4">
            {/* Toggle between Mobile OTP & Password */}
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-neutral-600 mb-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="authMethod"
                  checked={authMethod === 'otp'}
                  onChange={() => {
                    setAuthMethod('otp');
                    setOtpStep('input_phone');
                  }}
                  className="accent-[#245638]"
                />
                <span>Mobile OTP (मोबाइल OTP)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="authMethod"
                  checked={authMethod === 'password'}
                  onChange={() => setAuthMethod('password')}
                  className="accent-[#245638]"
                />
                <span>Password (पासवर्ड)</span>
              </label>
            </div>

            {authMethod === 'otp' ? (
              otpStep === 'input_phone' ? (
                /* Step 1: Phone input */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-[#202820] mb-1.5">
                      10-Digit Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value.replace(/\D/g, ''))}
                        placeholder="9822012345"
                        className="w-full pl-12 pr-4 py-2.5 text-sm font-bold glass-input rounded-xl focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      A 4-digit verification code will be sent to this number.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#245638] text-white font-black text-xs sm:text-sm rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Sending SMS OTP...' : 'Send Verification OTP'}</span>
                    <ArrowRight className="w-4 h-4 text-[#E8B65C]" />
                  </button>
                </form>
              ) : (
                /* Step 2: OTP input */
                <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4">
                  <div className="p-3 bg-[#DDEBD7]/80 rounded-xl border border-[#245638] text-xs">
                    <p className="font-bold text-[#245638]">
                      OTP sent to +91 {phoneOrEmail}
                    </p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      Enter the 4-digit code. (Demo Test Code: <strong>4826</strong>)
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-black uppercase text-[#202820]">
                        Enter 4-Digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpCode('4826')}
                        className="text-[10px] font-black text-[#245638] underline hover:text-[#1b412a]"
                      >
                        Autofill Demo Code (4826)
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={4}
                      autoFocus
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full px-4 py-2.5 text-center tracking-widest text-xl font-black glass-input rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <button
                      type="button"
                      onClick={() => setOtpStep('input_phone')}
                      className="hover:underline text-[11px]"
                    >
                      Change Mobile Number
                    </button>
                    <span className="text-[11px] font-medium">
                      Resend in {countdown}s
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#245638] text-white font-black text-xs sm:text-sm rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Verifying...' : 'Verify OTP & Enter Cockpit'}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#E8B65C]" />
                  </button>
                </form>
              )
            ) : (
              /* Password login form */
              <form onSubmit={handlePasswordSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#202820] mb-1.5">
                    Mobile or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="9822012345 or farmer@farmverse.ai"
                    className="w-full px-3.5 py-2.5 text-sm font-bold glass-input rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase text-[#202820]">
                      Password
                    </label>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      Demo password: kisan123
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 text-sm font-bold glass-input rounded-xl focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-[#202820]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#245638] text-white font-black text-xs sm:text-sm rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
                >
                  <span>{isLoading ? 'Signing In...' : 'Sign In to Farm Cockpit'}</span>
                  <ArrowRight className="w-4 h-4 text-[#E8B65C]" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODE 2: SIGN UP (CREATE FARMER ACCOUNT) */}
        {mode === 'signup' && (
          <form onSubmit={handleCreateAccount} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-xs font-black uppercase text-[#202820] mb-1">
                Farmer Full Name
              </label>
              <input
                type="text"
                required
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="e.g. Rameshwar Sharma"
                className="w-full px-3.5 py-2 text-sm font-bold glass-input rounded-xl focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 font-bold glass-input rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  Village / Tehsil
                </label>
                <input
                  type="text"
                  value={signUpVillage}
                  onChange={(e) => setSignUpVillage(e.target.value)}
                  placeholder="e.g. Niphad"
                  className="w-full px-3 py-2 font-bold glass-input rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  State
                </label>
                <select
                  value={signUpState}
                  onChange={(e) => {
                    const st = e.target.value;
                    setSignUpState(st);
                    setSignUpDistrict(INDIAN_STATES[st]?.[0] || '');
                  }}
                  className="w-full px-2.5 py-2 font-bold glass-input rounded-xl focus:outline-none"
                >
                  {Object.keys(INDIAN_STATES).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  District
                </label>
                <select
                  value={signUpDistrict}
                  onChange={(e) => setSignUpDistrict(e.target.value)}
                  className="w-full px-2.5 py-2 font-bold glass-input rounded-xl focus:outline-none"
                >
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  Land Size
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    value={signUpLandSize}
                    onChange={(e) => setSignUpLandSize(parseFloat(e.target.value) || 0)}
                    className="w-2/3 px-3 py-2 font-bold glass-input rounded-xl focus:outline-none"
                  />
                  <select
                    value={signUpLandUnit}
                    onChange={(e) => setSignUpLandUnit(e.target.value as LandUnit)}
                    className="w-1/3 px-1 py-2 font-bold glass-input rounded-xl text-[11px]"
                  >
                    <option value="Acres">Acres</option>
                    <option value="Hectares">Ha</option>
                    <option value="Guntha">Guntha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-[#202820] mb-1">
                  Soil Type
                </label>
                <select
                  value={signUpSoilType}
                  onChange={(e) => setSignUpSoilType(e.target.value as SoilType)}
                  className="w-full px-2 py-2 font-bold glass-input rounded-xl focus:outline-none text-[11px]"
                >
                  <option value="Black Soil (Regur)">Black Soil (काळी माती)</option>
                  <option value="Alluvial Soil">Alluvial Soil (गाळाची)</option>
                  <option value="Red & Laterite Soil">Red / Laterite (तांबडी)</option>
                  <option value="Sandy Loam">Sandy Loam (वाळूमिश्रित)</option>
                  <option value="Clayey Loam">Clayey Loam (चिकणमाती)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-[#245638] text-white font-black text-xs sm:text-sm rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[3px_3px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register Farm & Open Cockpit'}</span>
              <ArrowRight className="w-4 h-4 text-[#E8B65C]" />
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#202820]/20" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-neutral-500">
            <span className="bg-white/80 backdrop-blur-sm px-2">Instant Evaluator Entry</span>
          </div>
        </div>

        {/* 1-Click Demo Farmer Bypass */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 bg-[#E8B65C] hover:bg-[#ffc966] text-[#202820] font-black text-xs rounded-xl border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#245638]" />
            <span>Continue as Preconfigured Demo Farmer (Anand Patil, Nashik)</span>
          </button>
        </div>

        {/* Security & Academic Note */}
        <div className="mt-5 pt-3 border-t border-[#202820]/15 flex items-center justify-between text-[11px] text-neutral-600 font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#245638]" />
            <span>Encrypted local session</span>
          </span>
          <span>FarmVerse AI Platform</span>
        </div>
      </div>
    </div>
  );
};
