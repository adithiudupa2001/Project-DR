import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, Globe, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginUser } = useApp();

  const [authMode, setAuthMode] = useState<'nri' | 'indian' | 'google'>('nri');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const countryCodes = [
    { code: '+1', country: 'USA / Canada' },
    { code: '+971', country: 'United Arab Emirates' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+65', country: 'Singapore' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+91', country: 'India' },
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const isNriUser = authMode === 'nri' || countryCode !== '+91';
    loginUser({
      name: fullName || (isNriUser ? 'NRI Client' : 'Domestic Client'),
      phone: `${countryCode} ${phoneNumber}`,
      countryCode: countryCode,
      isNri: isNriUser,
      country: countryCodes.find((c) => c.code === countryCode)?.country || 'India',
    });
  };

  const handleGoogleSignIn = () => {
    loginUser({
      name: 'Adithi Udupa',
      email: 'adithiudupa2001@gmail.com',
      phone: '+1 408 555 0192',
      countryCode: '+1',
      isNri: true,
      country: 'United States',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0E1A2B] border border-[#C9A45C]/40 rounded-sm p-6 sm:p-8 text-[#F7F3EC] shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xs text-slate-400 hover:text-[#C9A45C] hover:bg-[#142338] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-[10px] font-semibold tracking-[0.2em] uppercase mb-2.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Private Client Portal</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F3EC] tracking-wide">
            Authenticate to Rentier
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Access confidential asset audit dossiers and verified rental ledgers.
          </p>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-3 gap-1 bg-[#09111D] p-1 rounded-xs border border-[#C9A45C]/25 mb-6">
          <button
            onClick={() => {
              setAuthMode('nri');
              setCountryCode('+1');
              setOtpSent(false);
            }}
            className={`py-2 text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-all tracking-wide ${
              authMode === 'nri' ? 'bg-[#142338] text-[#C9A45C]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>NRI Global</span>
          </button>
          <button
            onClick={() => {
              setAuthMode('indian');
              setCountryCode('+91');
              setOtpSent(false);
            }}
            className={`py-2 text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-all tracking-wide ${
              authMode === 'indian' ? 'bg-[#142338] text-[#C9A45C]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>India (+91)</span>
          </button>
          <button
            onClick={() => {
              setAuthMode('google');
            }}
            className={`py-2 text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-all tracking-wide ${
              authMode === 'google' ? 'bg-[#142338] text-[#C9A45C]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Google</span>
          </button>
        </div>

        {/* Google Direct Sign-In */}
        {authMode === 'google' ? (
          <div className="space-y-4 py-2">
            <p className="text-xs text-slate-300 text-center">
              Authenticate via Google Single Sign-On with private client credentials.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xs bg-[#F7F3EC] text-[#0E1A2B] font-semibold text-xs tracking-wide hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        ) : !otpSent ? (
          /* Phone Input Form */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                Client Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Vikramaditya Patel"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] placeholder-slate-500 focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                {authMode === 'nri' ? 'International Phone' : 'Indian Mobile Number'}
              </label>
              <div className="flex gap-2">
                {authMode === 'nri' ? (
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-2.5 py-2.5 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#C9A45C] font-mono"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3 py-2.5 text-xs text-slate-300 font-mono flex items-center">
                    +91
                  </div>
                )}
                <input
                  type="tel"
                  required
                  placeholder={authMode === 'nri' ? '408 555 0192' : '98450 12345'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#0A1422] border border-[#C9A45C]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F3EC] placeholder-slate-500 focus:outline-none focus:border-[#C9A45C] font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Transmit Verification Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#0A1422] p-3 rounded-xs border border-[#C9A45C]/25 text-xs text-slate-300 flex items-center justify-between">
              <span>Code dispatched to {countryCode} {phoneNumber}</span>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-[#C9A45C] hover:underline"
              >
                Revise
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#C9A45C] mb-1">
                Enter 4-Digit Passcode (Demo: 1234)
              </label>
              <input
                type="text"
                maxLength={4}
                required
                placeholder="1 2 3 4"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-[#0A1422] border border-[#C9A45C]/40 rounded-xs px-4 py-3 text-center text-lg font-mono tracking-widest text-[#C9A45C] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xs bg-[#C9A45C] hover:bg-[#D8B46C] text-[#0E1A2B] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0E1A2B]" />
              <span>Verify & Access Desk</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[#C9A45C]/15 text-[11px] text-slate-400 text-center font-sans">
          All client sessions are end-to-end encrypted under strict private banking confidentiality protocols.
        </div>
      </div>
    </div>
  );
};
