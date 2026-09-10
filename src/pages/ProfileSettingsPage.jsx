import React from "react";
import {
  User,
  Settings,
  Globe,
  Volume2,
  Eye,
  RotateCcw,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { REGIONAL_LANGUAGES } from "../data/mockData.js";

export default function ProfileSettingsPage() {
  const {
    user,
    recyclerUser,
    currentRole,
    language,
    setLanguage,
    accessibility,
    toggleAccessibility,
    resetToInitialData,
    addToast
  } = useApp();

  const isGenerator = currentRole === "generator";

  return (
    <div id="profile-settings-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center font-bold text-xl">
            {isGenerator ? "AS" : "EV"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#1E2522]">
                {isGenerator ? user.name : recyclerUser.facilityName}
              </h1>
              <span className="text-xs bg-[#b8f2e6] text-[#083833] font-bold border border-[#83c5be]/40 px-2 py-0.5 rounded">
                {isGenerator ? "Verified Resident" : "Licensed Processor"}
              </span>
            </div>
            <p className="text-xs text-[#5C6A64] mt-0.5">
              {isGenerator ? user.area : recyclerUser.address} • Member since March 2026
            </p>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1E2522]">
          Registered Profile Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Residential / Facility Address
            </span>
            <span className="font-semibold text-[#1E2522] block mt-1">
              {isGenerator ? user.address : recyclerUser.address}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Direct Contact
            </span>
            <span className="font-semibold text-[#1E2522] block mt-1">
              {isGenerator ? user.phone : recyclerUser.contactPhone}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Regulatory ID / UID
            </span>
            <span className="font-mono font-bold text-[#083833] block mt-1">
              {isGenerator ? user.id : recyclerUser.registrationNumber}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Verified Housing Society / Cluster
            </span>
            <span className="font-semibold text-[#1E2522] block mt-1">
              {isGenerator ? user.society : "Noida Phase II Industrial MRF"}
            </span>
          </div>
        </div>
      </div>

      {/* Regional Language Selection */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#083833]" />
          <h3 className="text-base font-bold text-[#1E2522]">
            Regional Language Preference
          </h3>
        </div>
        <p className="text-xs text-[#5C6A64]">
          Localize terms, weighing instructions, and certificates into regional Indian languages.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REGIONAL_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  addToast({
                    type: "info",
                    title: "Language Updated",
                    message: `Switched language to ${lang.label} (${lang.native}).`
                  });
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-[#83c5be] bg-[#b8f2e6] ring-1 ring-[#83c5be]"
                    : "border-[#E2E8E5] hover:border-[#83c5be]/50 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1E2522] block">
                    {lang.native}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#083833]" />}
                </div>
                <span className="text-[11px] text-[#5C6A64] block mt-0.5">
                  {lang.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#083833]" />
          <h3 className="text-base font-bold text-[#1E2522]">
            Accessibility & Assistance Controls
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8E5] hover:bg-[#FAF9F5] cursor-pointer">
            <div>
              <span className="font-semibold text-[#1E2522] block">
                Audio & Screen Reader Guidance
              </span>
              <span className="text-[11px] text-[#5C6A64]">
                Provides auditory cues during scale capture and OTP verification steps.
              </span>
            </div>
            <input
              type="checkbox"
              checked={accessibility.voiceScreenReader}
              onChange={() => toggleAccessibility("voiceScreenReader")}
              className="w-4 h-4 accent-[#83c5be]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8E5] hover:bg-[#FAF9F5] cursor-pointer">
            <div>
              <span className="font-semibold text-[#1E2522] block">
                High Contrast Data Borders
              </span>
              <span className="text-[11px] text-[#5C6A64]">
                Enhances border contrast and focus states for outdoor daylight visibility.
              </span>
            </div>
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={() => toggleAccessibility("highContrast")}
              className="w-4 h-4 accent-[#83c5be]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8E5] hover:bg-[#FAF9F5] cursor-pointer">
            <div>
              <span className="font-semibold text-[#1E2522] block">
                Large Font Sizing Mode
              </span>
              <span className="text-[11px] text-[#5C6A64]">
                Enlarges scale metrics and OTP numeric characters.
              </span>
            </div>
            <input
              type="checkbox"
              checked={accessibility.largeText}
              onChange={() => toggleAccessibility("largeText")}
              className="w-4 h-4 accent-[#83c5be]"
            />
          </label>
        </div>
      </div>

      {/* State Reset Card */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#1E2522]">
            Data Storage & Demo Reset
          </h3>
          <p className="text-xs text-[#5C6A64] mt-0.5">
            Reset all scheduled pickups, credit balances, and minted ledger blocks to factory state.
          </p>
        </div>

        <button
          onClick={resetToInitialData}
          className="px-4 py-2 rounded-xl bg-white border border-[#D7E3DC] hover:border-red-500 text-red-600 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Mock Data</span>
        </button>
      </div>
    </div>
  );
}
