import React from "react";
import MapMock from "../components/MapMock.jsx";
import PickupTimeline from "../components/PickupTimeline.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useApp } from "../context/AppContext.jsx";
import {
  Phone,
  ShieldCheck,
  QrCode,
  Copy,
  Clock,
  Truck,
  CheckCircle2,
  Camera,
  Calendar,
  AlertTriangle,
  Heart,
  BatteryCharging,
  Info
} from "lucide-react";

export default function PickupTrackingPage() {
  const {
    activePickup,
    advanceActivePickupStatus,
    setProofModalOpen,
    verifyAndCreditPickup,
    addToast,
    navigateTo
  } = useApp();

  if (!activePickup) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center bg-white rounded-2xl border border-[#D7E3DC] p-8 space-y-4">
        <Truck className="w-10 h-10 text-[#5C6A64] mx-auto" />
        <h3 className="text-lg font-bold text-[#16201B] font-display">No Active Pickup in Progress</h3>
        <p className="iso-measure mx-auto text-xs text-[#5C6A64]">
          Schedule a verified material collection to monitor real-time EV telemetry and proof stamping.
        </p>
        <button
          onClick={() => navigateTo("schedule")}
          className="px-4 py-2 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          Schedule New Pickup
        </button>
      </div>
    );
  }

  const isVerified = activePickup.status === "verified";
  const isProofSubmitted = activePickup.status === "proof_submitted";
  const isArrived = activePickup.status === "arrived";
  const isInTransit = activePickup.status === "in_transit";
  const isAssigned = activePickup.status === "assigned";

  const copyOTP = () => {
    navigator.clipboard?.writeText(activePickup.otp);
    addToast({
      type: "info",
      title: "OTP Copied",
      message: `Handover OTP ${activePickup.otp} copied to clipboard.`
    });
  };

  return (
    <div id="pickup-tracking-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/50 px-2 py-0.5 rounded">
              #{activePickup.id}
            </span>
            <StatusBadge status={activePickup.status} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#16201B] mt-1.5 font-display">
            {activePickup.wasteTypeNames}
          </h1>
          <p className="text-xs text-[#5C6A64]">
            {activePickup.recyclerName} • Sector 120 Noida Route
          </p>
        </div>

        {/* Handover OTP Badge */}
        {!isVerified && (
          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-3 sm:text-right flex items-center justify-between sm:justify-end gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#788880] block">
                Handover OTP
              </span>
              <span className="text-2xl font-extrabold font-mono text-[#083833] tracking-wider">
                {activePickup.otp}
              </span>
            </div>
            <button
              onClick={copyOTP}
              className="p-2 text-[#5C6A64] hover:text-[#083833] hover:bg-[#b8f2e6] rounded-lg transition-colors cursor-pointer"
              title="Copy OTP"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Simulated Live Route Map */}
      <MapMock
        vehicleNo={activePickup.vehicleNumber}
        driverName={activePickup.driverName}
        etaMinutes={activePickup.estimatedArrivalMin || 18}
      />

      {/* Live Timeline Component */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5C6A64] mb-4">
          Chain-of-Custody Timeline
        </h3>
        <PickupTimeline steps={activePickup.routeSteps} currentStatus={activePickup.status} />

        {/* Simulation Buttons */}
        <div className="mt-6 pt-4 border-t border-[#EAEFEA] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#788880]">Simulation Controls:</span>
            {isAssigned && (
              <button
                onClick={() => advanceActivePickupStatus("in_transit")}
                className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-semibold text-[#1E2522] cursor-pointer"
              >
                1. Start Transit
              </button>
            )}
            {isInTransit && (
              <button
                onClick={() => advanceActivePickupStatus("arrived")}
                className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-semibold text-[#1E2522] cursor-pointer"
              >
                2. Vehicle Arrived
              </button>
            )}
            {(isInTransit || isArrived) && !isProofSubmitted && !isVerified && (
              <button
                onClick={() => setProofModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-semibold text-[#D96B27] cursor-pointer"
              >
                3. Capture Weight & Photo
              </button>
            )}
            {isProofSubmitted && !isVerified && (
              <button
                onClick={() => verifyAndCreditPickup(activePickup.id)}
                className="px-3 py-1.5 rounded-lg bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold transition-colors cursor-pointer"
              >
                4. Recycler Audit & Verify
              </button>
            )}
          </div>

          {isVerified && (
            <button
              onClick={() => navigateTo("ledger")}
              className="px-4 py-2 bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              View Stamped Ledger Entry
            </button>
          )}
        </div>
      </div>

      {/* Humanized Driver & Operational Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Driver Card with Photo & Warmth */}
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Rajesh Verma"
              className="w-13 h-13 rounded-full object-cover border-2 border-[#83c5be] shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-[#083833] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  Assigned Driver
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  ★ 4.98
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#16201B] mt-1 font-display">
                {activePickup.driverName}
              </h4>
              <p className="text-xs text-[#5C6A64]">
                {activePickup.vehicleType} • Plate: <span className="font-mono text-[#16201B] font-bold">{activePickup.vehicleNumber}</span>
              </p>
            </div>
          </div>

          <a
            href={`tel:${activePickup.driverPhone}`}
            className="p-3 bg-[#E6F4F1] hover:bg-[#83c5be]/40 text-[#083833] rounded-xl transition-colors cursor-pointer"
            title="Call Rajesh"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Verification QR Card */}
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Driver Handover Token
            </span>
            <div className="text-sm font-mono font-bold text-[#16201B]">
              {activePickup.qrVerificationCode}
            </div>
            <p className="text-xs text-[#5C6A64] mt-0.5">
              Show this to Rajesh when digital weighing begins.
            </p>
          </div>

          <div className="p-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl">
            <QrCode className="w-7 h-7 text-[#083833]" />
          </div>
        </div>
      </div>

      {/* Helpful Human Checklist for Resident */}
      <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-2xl p-4 sm:p-5 text-xs text-[#3B4742]">
        <div className="flex items-center gap-2 font-bold text-[#16201B] mb-2 text-sm font-display">
          <Heart className="w-4 h-4 text-[#D96B27]" />
          <span>3 Friendly Tips to Help Rajesh Today</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#EAEFEA]">
            <span className="font-bold text-[#16201B] block mb-0.5">1. Keep Boxes Flat</span>
            <span className="text-[#5C6A64]">Flattened cardboard hooks easily onto the digital hanging hook.</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#EAEFEA]">
            <span className="font-bold text-[#16201B] block mb-0.5">2. Keep Recyclables Dry</span>
            <span className="text-[#5C6A64]">Dry paper ensures fair tare calculations and prevents spoilage.</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#EAEFEA]">
            <span className="font-bold text-[#16201B] block mb-0.5">3. Keep OTP Ready</span>
            <span className="text-[#5C6A64]">Handover OTP ({activePickup.otp}) verifies your slot without waiting.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
