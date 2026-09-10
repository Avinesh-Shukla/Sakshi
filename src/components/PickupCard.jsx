import React from "react";
import StatusBadge from "./StatusBadge.jsx";
import PickupTimeline from "./PickupTimeline.jsx";
import { Phone, Navigation, ShieldCheck, Camera, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function PickupCard({
  pickup,
  onTrack,
  onSubmitProof,
  onVerify
}) {
  const { advanceActivePickupStatus } = useApp();

  if (!pickup) return null;

  const isVerified = pickup.status === "verified";
  const isProofSubmitted = pickup.status === "proof_submitted";
  const isArrived = pickup.status === "arrived";
  const isInTransit = pickup.status === "in_transit";
  const isAssigned = pickup.status === "assigned";

  return (
    <div
      id={`pickup-card-${pickup.id}`}
      className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs relative overflow-hidden"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#5C6A64] uppercase tracking-wider">
              Collection ID
            </span>
            <span className="text-sm font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/50 px-2.5 py-0.5 rounded font-mono">
              #{pickup.id}
            </span>
            <StatusBadge status={pickup.status} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1E2522] mt-1.5">
            {pickup.wasteTypeNames}
          </h3>
        </div>

        {/* OTP Highlight */}
        {!isVerified && (
          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl px-4 py-2 flex items-center justify-between sm:justify-start gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#788880] block font-semibold">
                Pickup Handover OTP
              </span>
              <span className="text-xl font-bold font-mono tracking-widest text-[#083833]">
                {pickup.otp}
              </span>
            </div>
            <div className="text-right border-l border-[#D7E3DC] pl-3">
              <span className="text-[10px] text-[#788880] block">Verification QR</span>
              <span className="text-xs font-mono text-[#D96B27] font-semibold">Ready</span>
            </div>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b border-[#EAEFEA] text-xs">
        <div>
          <span className="text-[11px] text-[#788880] block font-medium">Scheduled Time</span>
          <span className="text-sm font-semibold text-[#1E2522]">{pickup.pickupDate}</span>
          <span className="text-[11px] text-[#5C6A64] block mt-0.5 truncate">{pickup.pickupAddress}</span>
        </div>

        <div>
          <span className="text-[11px] text-[#788880] block font-medium">Certified Recycler</span>
          <span className="text-sm font-semibold text-[#083833]">{pickup.recyclerName}</span>
          <span className="text-[11px] text-[#5C6A64] block mt-0.5">
            Driver: {pickup.driverName} ({pickup.vehicleType})
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#788880] block font-medium">Estimated Weight & Reward</span>
          <span className="text-sm font-semibold text-[#1E2522]">
            {pickup.actualWeightKg ? `${pickup.actualWeightKg} kg (Audited)` : `${pickup.estimatedWeightKg} kg (Est.)`}
          </span>
          <span className="text-[11px] text-[#083833] font-bold block mt-0.5">
            ~{pickup.estimatedCredits} Circularity Credits
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-4 pb-2">
        <PickupTimeline steps={pickup.routeSteps} currentStatus={pickup.status} />
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-[#EAEFEA] flex flex-wrap items-center justify-between gap-3">
        {/* Simulation Shortcuts for testing the full loop */}
        <div className="flex items-center gap-1.5 text-xs text-[#5C6A64] overflow-x-auto py-1">
          <span className="text-[11px] text-[#788880] font-medium shrink-0">Simulate:</span>
          {isAssigned && (
            <button
              onClick={() => advanceActivePickupStatus("in_transit")}
              className="px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-medium text-[#1E2522]"
            >
              Start Transit
            </button>
          )}
          {isInTransit && (
            <button
              onClick={() => advanceActivePickupStatus("arrived")}
              className="px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-medium text-[#1E2522]"
            >
              Collector Arrived
            </button>
          )}
          {(isArrived || isInTransit) && !isProofSubmitted && !isVerified && (
            <button
              onClick={onSubmitProof}
              className="px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-medium text-[#1E2522]"
            >
              Capture Weight & Photo
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {onTrack && (
            <button
              onClick={onTrack}
              className="px-3.5 py-2 rounded-lg border border-[#D7E3DC] hover:bg-[#b8f2e6]/20 text-xs font-semibold text-[#1E2522] flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#083833]" />
              Track Route
            </button>
          )}

          {!isVerified && !isProofSubmitted && onSubmitProof && (
            <button
              onClick={onSubmitProof}
              className="px-3.5 py-2 rounded-lg bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-semibold text-[#1E2522] flex items-center gap-1.5 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-[#D96B27]" />
              Upload Proof
            </button>
          )}

          {!isVerified && onVerify && (
            <button
              onClick={onVerify}
              className="px-4 py-2 rounded-lg bg-[#83c5be] hover:bg-[#6eb1a9] text-xs font-bold text-[#062925] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify & Mint Credits
            </button>
          )}

          {isVerified && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#083833] bg-[#b8f2e6] px-3 py-1.5 rounded-lg border border-[#83c5be]">
              <CheckCircle className="w-4 h-4" />
              Verified & Ledger Stamped
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
