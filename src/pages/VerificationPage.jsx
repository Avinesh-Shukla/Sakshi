import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Scale,
  Camera,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck2,
  AlertTriangle
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function VerificationPage() {
  const {
    activePickup,
    verifyAndCreditPickup,
    navigateTo,
    verifySuccessData,
    setVerifySuccessData
  } = useApp();

  const [checks, setChecks] = useState({
    scaleValid: true,
    photoMatches: true,
    contaminationSafe: true,
    geofenceVerified: true,
    otpMatched: true
  });

  const allChecked = Object.values(checks).every(Boolean);

  const toggleCheck = (key) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVerify = () => {
    if (!activePickup) return;
    verifyAndCreditPickup(activePickup.id);
  };

  const netWeight = activePickup?.actualWeightKg || activePickup?.estimatedWeightKg || 24.5;
  const projectedCredits = Math.round(netWeight * 11);

  return (
    <div id="verification-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#083833]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Audited Chain-of-Custody Verification
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E2522] mt-1">
            Material Proof Audit & Certification
          </h1>
          <p className="text-xs text-[#5C6A64] mt-0.5">
            Recycler facility supervisor verifies physical weighment prior to stamping the tamper-evident ledger.
          </p>
        </div>

        {activePickup && (
          <div className="shrink-0">
            <StatusBadge status={activePickup.status} />
          </div>
        )}
      </div>

      {/* Success Modal / Banner if just verified */}
      {verifySuccessData && (
        <div className="bg-[#b8f2e6] rounded-2xl border-2 border-[#83c5be] p-6 sm:p-8 text-center space-y-4 shadow-md animate-in fade-in zoom-in-95 duration-500">
          <div className="w-14 h-14 rounded-full bg-[#83c5be] text-[#062925] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Collection Officially Certified
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
              +{verifySuccessData.earnedCredits} Circularity Credits Minted
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] max-w-md mx-auto mt-1">
              Stamped to SAKSHI Honest Impact Ledger as <strong className="font-mono text-[#1E2522]">Block #{verifySuccessData.blockNumber}</strong>. Audited net weight: {verifySuccessData.netWeight} kg.
            </p>
          </div>

          <div className="p-3 bg-white/80 rounded-xl max-w-md mx-auto font-mono text-xs text-[#1E2522] border border-[#83c5be]/50 truncate">
            Hash: {verifySuccessData.txHash}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setVerifySuccessData(null);
                navigateTo("ledger");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold transition-colors shadow-xs"
            >
              View in Impact Ledger
            </button>
            <button
              onClick={() => {
                setVerifySuccessData(null);
                navigateTo("dashboard");
              }}
              className="px-4 py-2 rounded-xl bg-white border border-[#D7E3DC] text-[#1E2522] text-xs font-semibold hover:bg-[#FAF9F5]"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Audit Workspace */}
      {activePickup ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Submitted Physical Proof */}
          <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <h3 className="text-base font-bold text-[#1E2522]">
                Captured Field Evidence
              </h3>
              <span className="text-xs font-mono font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/50 px-2 py-0.5 rounded">
                #{activePickup.id}
              </span>
            </div>

            {/* Photo Preview */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#D7E3DC] bg-[#EAEFEA]">
              <img
                src={
                  activePickup.proofPhotoUrl ||
                  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"
                }
                alt="Audit proof"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs text-white p-2 rounded-lg text-[10px] font-mono flex items-center justify-between">
                <span>GPS: 28.5921° N, 77.3820° E (Noida Sec 120)</span>
                <span>Calibrated Sensor Exif</span>
              </div>
            </div>

            {/* Scale Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA] text-center text-xs">
              <div>
                <span className="text-[10px] text-[#788880] block uppercase">Gross Scale</span>
                <span className="text-sm font-bold font-mono text-[#1E2522]">
                  {activePickup.grossWeightKg || 28.7} kg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#788880] block uppercase">Tare Crate</span>
                <span className="text-sm font-bold font-mono text-[#5C6A64]">
                  {activePickup.tareWeightKg || 4.2} kg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#083833] block uppercase font-bold">Net Audited</span>
                <span className="text-sm font-bold font-mono text-[#083833]">
                  {netWeight} kg
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-[#5C6A64]">
              <p>• Material Stream: <strong className="text-[#1E2522]">{activePickup.wasteTypeNames}</strong></p>
              <p>• Collector / Driver: <strong className="text-[#1E2522]">{activePickup.driverName} ({activePickup.vehicleNumber})</strong></p>
              <p>• Pickup Location: <strong className="text-[#1E2522]">{activePickup.pickupAddress}</strong></p>
            </div>
          </div>

          {/* Right Column: Supervisor Verification Checklist */}
          <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E2522] pb-3 border-b border-[#EAEFEA]">
                Supervisor Regulatory Checklist
              </h3>
              <p className="text-xs text-[#5C6A64] mt-2 mb-4 leading-relaxed">
                UPPCB regulations require affirmative verification of all 5 physical criteria before token minting.
              </p>

              <div className="space-y-2.5">
                {[
                  { key: "scaleValid", label: "Gross weight matches digital scale photograph" },
                  { key: "photoMatches", label: "Standard 4.2 kg tare container subtracted" },
                  { key: "contaminationSafe", label: "Segregation Grade A (< 1% non-recyclable moisture)" },
                  { key: "geofenceVerified", label: "GPS geolocation matches Sector 120 corridor" },
                  { key: "otpMatched", label: "Generator 4-digit handover OTP validated on collection" }
                ].map((item) => (
                  <label
                    key={item.key}
                    onClick={() => toggleCheck(item.key)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checks[item.key]
                        ? "bg-[#b8f2e6]/50 border-[#83c5be]"
                        : "bg-white border-[#E2E8E5]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checks[item.key]}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-[#083833] focus:ring-[#83c5be] accent-[#83c5be]"
                    />
                    <span className="text-xs font-medium text-[#1E2522]">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certification Action */}
            <div className="pt-4 border-t border-[#EAEFEA] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#788880]">Credits to be Minted:</span>
                <span className="text-base font-bold font-mono text-[#083833]">
                  +{projectedCredits} Circularity Credits
                </span>
              </div>

              <button
                type="button"
                id="verify-pickup-button"
                disabled={!allChecked}
                onClick={handleVerify}
                className={`w-full py-3 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all ${
                  allChecked
                    ? "bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925]"
                    : "bg-stone-300 cursor-not-allowed text-stone-500"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Certify Pickup & Stamp Ledger</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-8 text-center space-y-3">
          <p className="text-sm text-[#5C6A64]">No collection currently awaiting audit verification.</p>
          <button
            onClick={() => navigateTo("schedule")}
            className="px-4 py-2 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold rounded-lg transition-colors"
          >
            Schedule New Collection
          </button>
        </div>
      )}
    </div>
  );
}
