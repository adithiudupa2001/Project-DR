import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check } from 'lucide-react';

export const UpgradeModal: React.FC = () => {
  const {
    isUpgradeModalOpen,
    closeUpgradeModal,
    upgradeReason,
    tier,
    setTier,
    showToast,
  } = useApp();

  if (!isUpgradeModalOpen) return null;

  const handleJoin = () => {
    setTier('investor');
    closeUpgradeModal();
    showToast('Welcome to Rentier Membership');
  };

  const handleSwitchFree = () => {
    setTier('free');
    closeUpgradeModal();
    showToast('Switched to Free plan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-[12px] border border-[#ECECE8] p-6 text-[#0E1A2B] space-y-6">
        {/* Close Button */}
        <button
          onClick={closeUpgradeModal}
          className="absolute top-5 right-5 text-[#6B7280] hover:text-[#0E1A2B] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#0E1A2B]">
            Membership
          </h2>
          <p className="text-[14px] text-[#6B7280] mt-1">
            {upgradeReason || 'Unlock full property histories and tenant records.'}
          </p>
        </div>

        {/* Plan card */}
        <div className="bg-[#FAFAF8] rounded-[10px] border border-[#ECECE8] p-5 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-[#6B7280]">Member access</span>
            <span className="text-2xl font-semibold text-[#0E1A2B] tabular-nums">
              ₹999/mo
            </span>
          </div>

          <ul className="space-y-2.5 text-[14px] text-[#0E1A2B]">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
              <span>Full rent payment histories</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
              <span>Tenant profile and lease terms</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
              <span>Compare properties side by side</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#2E8B6E] shrink-0" />
              <span>Download property reports</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleJoin}
            className="w-full bg-[#0E1A2B] text-white py-3 rounded-[12px] font-medium text-[15px] hover:bg-[#142338] transition-colors cursor-pointer"
          >
            {tier === 'free' ? 'Join membership' : 'Keep membership'}
          </button>

          {tier !== 'free' && (
            <button
              onClick={handleSwitchFree}
              className="w-full text-xs text-[#6B7280] hover:text-[#0E1A2B] py-1 cursor-pointer"
            >
              Switch to free browsing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
