import React from "react";
import { UserCheck, Factory, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function RoleSelectionPage() {
  const { currentRole, switchRole, navigateTo } = useApp();

  return (
    <div id="role-selection-page" className="max-w-4xl mx-auto py-8 sm:py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
          Identity & Workspace Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522]">
          Choose Your Circularity Role
        </h1>
        <p className="text-sm text-[#5C6A64] max-w-lg mx-auto">
          Switch between the Waste Generator (household/commercial) and Certified Recycler (processing facility) perspectives at any point.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generator Card */}
        <div
          onClick={() => {
            switchRole("generator");
            navigateTo("dashboard");
          }}
          className={`bg-white rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all relative flex flex-col justify-between ${
            currentRole === "generator"
              ? "border-[#83c5be] shadow-md ring-1 ring-[#83c5be]"
              : "border-[#E2E8E5] hover:border-[#83c5be]/60"
          }`}
        >
          {currentRole === "generator" && (
            <div className="absolute top-4 right-4 bg-[#83c5be] text-[#062925] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[2.5]" />
              Active Role
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-[#1E2522] mb-1">
              Waste Generator
            </h3>
            <p className="text-xs text-[#083833] font-semibold mb-3">
              Persona: Aarav Sharma (Resident, Sector 120 Noida)
            </p>
            <p className="text-xs text-[#5C6A64] leading-relaxed mb-6">
              Responsible for household or commercial sorting, scheduling pickup slots with certified regional recyclers, tracking live EV dispatches, and earning Circularity Credits on verified kilograms.
            </p>

            <div className="space-y-2 text-xs text-[#1E2522] pt-4 border-t border-[#EAEFEA]">
              <div className="font-semibold text-[#5C6A64] text-[11px] uppercase tracking-wider mb-2">
                Accessible Capabilities
              </div>
              <p>• Multi-step waste submission & weight estimator</p>
              <p>• Live route map & handover OTP display</p>
              <p>• Verified physical tare/gross proof capture</p>
              <p>• Circularity credits & eco-marketplace redemption</p>
            </div>
          </div>

          <button
            className={`w-full mt-8 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              currentRole === "generator"
                ? "bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925]"
                : "bg-[#FAF9F5] border border-[#D7E3DC] text-[#1E2522] hover:bg-[#b8f2e6]/30"
            }`}
          >
            <span>Proceed as Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recycler Card */}
        <div
          onClick={() => {
            switchRole("recycler");
            navigateTo("recycler_dashboard");
          }}
          className={`bg-white rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all relative flex flex-col justify-between ${
            currentRole === "recycler"
              ? "border-[#D96B27] shadow-md ring-1 ring-[#D96B27]"
              : "border-[#E2E8E5] hover:border-[#B8CEC2]"
          }`}
        >
          {currentRole === "recycler" && (
            <div className="absolute top-4 right-4 bg-[#D96B27] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" />
              Active Role
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-xl bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center mb-4">
              <Factory className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-[#1E2522] mb-1">
              Certified Recycler
            </h3>
            <p className="text-xs text-[#D96B27] font-medium mb-3">
              Persona: EcoVidyut Recyclers Hub (Sector 63, Noida)
            </p>
            <p className="text-xs text-[#5C6A64] leading-relaxed mb-6">
              Industrial facility operations console for managing collection requests, dispatching electric cargo fleets, auditing photo and tare/gross weights, and signing cryptographic ledger blocks.
            </p>

            <div className="space-y-2 text-xs text-[#1E2522] pt-4 border-t border-[#EAEFEA]">
              <div className="font-semibold text-[#5C6A64] text-[11px] uppercase tracking-wider mb-2">
                Accessible Capabilities
              </div>
              <p>• Fleet operations, route assignment & scheduling</p>
              <p>• Dual-scale tare & gross weight verification</p>
              <p>• Digital supervisor signing & credit minting</p>
              <p>• Facility capacity meter (5,000 kg daily quota)</p>
            </div>
          </div>

          <button
            className={`w-full mt-8 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              currentRole === "recycler"
                ? "bg-[#D96B27] text-white"
                : "bg-[#FAF9F5] border border-[#D7E3DC] text-[#1E2522] hover:bg-[#FDF1E8]"
            }`}
          >
            <span>Proceed as Recycler</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
