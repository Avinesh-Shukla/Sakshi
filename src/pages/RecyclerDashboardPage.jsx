import React from "react";
import {
  Activity,
  Truck,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  FileCheck2,
  Layers
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import MetricCard from "../components/MetricCard.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function RecyclerDashboardPage() {
  const {
    recyclerUser,
    activePickup,
    completedPickups,
    navigateTo,
    setProofModalOpen,
    verifyAndCreditPickup
  } = useApp();

  const capacityPct = Math.round(
    ((recyclerUser?.processedTodayKg || 0) / (recyclerUser?.dailyCapacityKg || 5000)) * 100
  );

  return (
    <div id="recycler-dashboard" className="max-w-5xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Facility Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
                Certified Material Recovery Facility
              </span>
              <span className="text-xs bg-[#FDF1E8] text-[#D96B27] font-semibold px-2 py-0.5 rounded">
                UPPCB Authorized Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522]">
              {recyclerUser.facilityName}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
              {recyclerUser.address} • License: <span className="font-mono text-[#1E2522]">{recyclerUser.registrationNumber}</span>
            </p>
          </div>

          {/* Daily Capacity Meter */}
          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-4 sm:w-80 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#1E2522]">Daily Processing Load</span>
              <span className="text-xs font-mono font-bold text-[#083833]">
                {recyclerUser.processedTodayKg} / {recyclerUser.dailyCapacityKg} kg
              </span>
            </div>

            <ProgressBar
              value={recyclerUser.processedTodayKg}
              max={recyclerUser.dailyCapacityKg}
              color={capacityPct > 90 ? "bg-[#D96B27]" : "bg-[#83c5be]"}
              height="h-2.5"
            />

            <div className="flex justify-between text-[11px] text-[#788880] mt-2">
              <span>{capacityPct}% Capacity Utilized</span>
              <span>Remaining: 900 kg</span>
            </div>
          </div>
        </div>

        {/* Quick Recycler Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 mt-6 border-t border-[#EAEFEA]">
          <button
            onClick={() => navigateTo("verification")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Audit Field Proof</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Review scales & photos</span>
            </div>
          </button>

          <button
            onClick={() => navigateTo("tracking")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">EV Fleet Dispatch</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Sector 120 Route</span>
            </div>
          </button>

          <button
            onClick={() => navigateTo("ledger")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Issued Certificates</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">SHA-256 signatures</span>
            </div>
          </button>

          <button
            onClick={() => navigateTo("impact")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] text-[#083833] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Cluster Analytics</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Noida recovery rate</span>
            </div>
          </button>
        </div>
      </div>

      {/* Recycler Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="rec-daily-inflow"
          title="Daily Recovery Volume"
          value={recyclerUser?.processedTodayKg ?? 4100}
          unit="kg"
          changeText="↑ 12% vs yesterday"
          subtitle="Processed at Sector 63"
          iconName="Scale"
          accent="green"
        />

        <MetricCard
          id="rec-active-pickups"
          title="Active EV Dispatches"
          value={recyclerUser?.activePickupsCount ?? recyclerUser?.activeFleetCount ?? 6}
          unit="trucks"
          changeText="Zero fuel emissions"
          subtitle="Tata Ace EV Fleet"
          iconName="Truck"
          accent="orange"
        />

        <MetricCard
          id="rec-pending-verifications"
          title="Pending Audit Scale"
          value={recyclerUser?.pendingVerificationsCount ?? recyclerUser?.pendingVerificationCount ?? 3}
          unit="batches"
          changeText="Requires review"
          subtitle="Dual tare/gross checks"
          iconName="ShieldCheck"
          accent="neutral"
        />

        <MetricCard
          id="rec-total-diverted"
          title="Cluster Total Diverted"
          value={(Number(recyclerUser?.totalDivertedMetricTons ?? (recyclerUser?.monthlyProcessedKg ? recyclerUser.monthlyProcessedKg / 1000 : 148.2))).toFixed(1)}
          unit="Tons"
          changeText="All-Time Verified"
          subtitle="UPPCB certified tally"
          iconName="CheckCircle2"
          accent="green"
        />
      </div>

      {/* Active Pickup Requiring Audit */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E2522]">
              Incoming Handover & Calibration Queue
            </h3>
            <p className="text-xs text-[#5C6A64]">
              Collections currently running in the Noida Sector 120 corridor.
            </p>
          </div>

          <button
            onClick={() => navigateTo("verification")}
            className="text-xs font-semibold text-[#083833] hover:underline flex items-center gap-1"
          >
            Audit Console <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activePickup ? (
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/50 px-2 py-0.5 rounded">
                  #{activePickup.id}
                </span>
                <StatusBadge status={activePickup.status} />
              </div>
              <h4 className="text-sm font-bold text-[#1E2522]">
                {activePickup.wasteTypeNames} • ~{activePickup.estimatedWeightKg} kg
              </h4>
              <p className="text-xs text-[#5C6A64]">
                Generator: Aarav Sharma • Flat 402, Prateek Laurel, Sector 120
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setProofModalOpen(true)}
                className="px-3.5 py-2 bg-white border border-[#D7E3DC] hover:border-[#83c5be] rounded-lg text-xs font-semibold text-[#1E2522]"
              >
                Record Weight Scale
              </button>
              <button
                onClick={() => navigateTo("verification")}
                className="px-3.5 py-2 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] rounded-lg text-xs font-bold transition-colors"
              >
                Inspect & Certify
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#5C6A64]">No active pickups awaiting verification.</p>
        )}
      </div>

      {/* Recycler Material Streams Table */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#1E2522] mb-3">
          Facility Processing Streams (Sector 63 Plant)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">Dry Paper / OCC</span>
            <span className="text-base font-extrabold font-mono text-[#1E2522] block mt-1">1,840 kg</span>
            <span className="text-[11px] text-[#083833]">High density baling line</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">Rigid Polymers / PET</span>
            <span className="text-base font-extrabold font-mono text-[#1E2522] block mt-1">1,120 kg</span>
            <span className="text-[11px] text-[#083833]">Flake granulation optical sorter</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">E-Scrap & PCBs</span>
            <span className="text-base font-extrabold font-mono text-[#1E2522] block mt-1">680 kg</span>
            <span className="text-[11px] text-[#083833]">Precious metal recovery</span>
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA]">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">Metals (Al & Fe)</span>
            <span className="text-base font-extrabold font-mono text-[#1E2522] block mt-1">460 kg</span>
            <span className="text-[11px] text-[#083833]">Hydraulic shear compaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
