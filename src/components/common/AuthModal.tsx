import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginUser } = useApp();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: name || 'Adithi Udupa',
      phone: `${countryCode} ${phoneNumber}`,
      countryCode: countryCode,
      isNri: countryCode !== '+91',
      country: countryCode === '+91' ? 'India' : 'United States',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-[12px] border border-[#ECECE8] p-6 text-[#0E1A2B] space-y-5">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-serif font-semibold text-2xl text-[#0E1A2B]">
            Sign in
          </h2>
          <p className="text-[13px] text-[#6B7280] mt-1">
            Access your saved homes and membership features.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs text-[#6B7280] mb-1">
                Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-[#ECECE8] rounded-lg text-sm text-[#0E1A2B] focus:outline-none focus:border-[#0E1A2B]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#6B7280] mb-1">
                Phone number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-[#FAFAF8] border border-[#ECECE8] rounded-lg px-2.5 py-2 text-sm text-[#0E1A2B] focus:outline-none"
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+65">+65 (SG)</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="98765 43210"
                  className="flex-1 px-3 py-2 border border-[#ECECE8] rounded-lg text-sm text-[#0E1A2B] focus:outline-none focus:border-[#0E1A2B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0E1A2B] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs text-[#6B7280] mb-1">
                Enter code sent to {countryCode} {phoneNumber}
              </label>
              <input
                type="text"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit code (e.g. 1234)"
                className="w-full px-3 py-2 border border-[#ECECE8] rounded-lg text-sm text-[#0E1A2B] focus:outline-none focus:border-[#0E1A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0E1A2B] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#142338] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
