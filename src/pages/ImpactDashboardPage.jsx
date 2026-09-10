import React from "react";
import {
  BarChart3,
  Leaf,
  Droplets,
  Zap,
  TreeDeciduous,
  Scale,
  Calendar,
  Share2,
  FileCheck2,
  TrendingUp,
  Download
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import MetricCard from "../components/MetricCard.jsx";
import { ImpactBarChart, WasteCompositionChart } from "../components/ImpactChart.jsx";

export default function ImpactDashboardPage() {
  const { user, impactMonthly, wasteComposition, addToast } = useApp();

  const handleShareReport = () => {
    addToast({
      type: "info",
      title: "Impact Audit Report Ready",
      message: "Generated verified environmental audit certificate link."
    });
  };

  return (
    <div id="impact-dashboard-page" className="max-w-5xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Title & Date Filter Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#083833]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Physical Environmental Accounting
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
            Verified Ecological Footprint
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
            Based on 14 doorstep collections verified on calibrated scales across Noida Sector 120.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareReport}
            className="px-4 py-2 rounded-xl bg-white border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-semibold text-[#1E2522] flex items-center gap-2 shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Certificate</span>
          </button>
        </div>
      </div>

      {/* 4 Core Ecological Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="impact-metric-diverted"
          title="Total Landfill Diverted"
          value={user.totalWasteDivertedKg}
          unit="kg"
          changeText="100% physically audited"
          subtitle="Direct scale weighments"
          iconName="Scale"
          accent="green"
        />

        <MetricCard
          id="impact-metric-co2"
          title="Net Carbon Avoided"
          value={user.co2OffsetKg}
          unit="kg"
          changeText="GHG Protocol standard"
          subtitle="Equivalent to 1,220 km driving"
          iconName="Leaf"
          accent="green"
        />

        <MetricCard
          id="impact-metric-water"
          title="Freshwater Conserved"
          value={user.waterSavedLiters?.toLocaleString()}
          unit="L"
          changeText="Virgin pulp avoidance"
          subtitle="Paper & polymer recovery"
          iconName="Droplets"
          accent="neutral"
        />

        <MetricCard
          id="impact-metric-energy"
          title="Grid Energy Conserved"
          value={user.energySavedKwh}
          unit="kWh"
          changeText="Secondary smelting delta"
          subtitle="Powers household for 38 days"
          iconName="Zap"
          accent="orange"
        />
      </div>

      {/* Charts Section: Monthly Trend & Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend (2 Cols) */}
        <div className="lg:col-span-2">
          <ImpactBarChart data={impactMonthly} />
        </div>

        {/* Material Composition (1 Col) */}
        <div className="lg:col-span-1">
          <WasteCompositionChart data={wasteComposition} />
        </div>
      </div>

      {/* Real-World Equivalence Block */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5C6A64]">
          Real-World Equivalents for 184.5 kg Diverted
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
              <TreeDeciduous className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#1E2522] block font-mono">
                {user.treesEquivalent} Trees
              </span>
              <span className="text-xs text-[#5C6A64]">
                Seedlings nurtured for 10 years
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#1E2522] block font-mono">
                {user.waterSavedLiters} Liters
              </span>
              <span className="text-xs text-[#5C6A64]">
                Sufficient drinking water for 710 days
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#1E2522] block font-mono">
                {user.energySavedKwh} kWh
              </span>
              <span className="text-xs text-[#5C6A64]">
                Clean secondary reprocessing power
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
