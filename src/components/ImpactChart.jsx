import React, { useState } from "react";
import { TrendingUp, Layers, Droplet, TreePine } from "lucide-react";

export function ImpactBarChart({ data }) {
  const chartData = data || [
    { month: "May", kg: 28.5, heightPct: 35 },
    { month: "Jun", kg: 34.0, heightPct: 45 },
    { month: "Jul", kg: 42.5, heightPct: 65 },
    { month: "Aug", kg: 48.0, heightPct: 85 },
    { month: "Sep (Current)", kg: 31.5, heightPct: 52, isCurrent: true }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6A64]">
            Monthly Verified Weight
          </span>
          <h3 className="text-base font-bold text-[#1E2522]">
            Diverted Kilograms Trend
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#093a34] bg-[#b8f2e6] border border-[#83c5be]/40 px-2 py-0.5 rounded">
          Total: 184.5 kg
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 sm:gap-6 h-52 pt-6 pb-2 px-2 border-b border-[#E2EAE5]">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
            <span className="text-[11px] font-bold text-[#1E2522] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">
              {item.kg} kg
            </span>
            <div
              className={`w-full max-w-[44px] rounded-t-lg transition-all duration-500 relative ${
                item.isCurrent
                  ? "bg-[#D96B27] hover:bg-[#C45E1E]"
                  : "bg-[#83c5be] hover:bg-[#6eb1a9]"
              }`}
              style={{ height: `${item.heightPct}%` }}
            >
              {item.isCurrent && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1E2522] text-white text-[9px] font-bold px-1.5 py-0.2 rounded whitespace-nowrap">
                  Current
                </div>
              )}
            </div>
            <span className="text-xs text-[#5C6A64] mt-2 font-medium truncate">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-[#5C6A64] pt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#83c5be]" />
          Audited Collections
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#D96B27]" />
          Month-to-Date
        </span>
      </div>
    </div>
  );
}

export function WasteCompositionChart({ data }) {
  const streams = data || [
    { label: "Paper & Cardboard", pct: 37, kg: 68.2, color: "#83c5be" },
    { label: "Plastics (Rigid/Film)", pct: 28, kg: 51.4, color: "#b8f2e6" },
    { label: "E-Waste & Scrap", pct: 13, kg: 24.6, color: "#D96B27" },
    { label: "Metals & Cans", pct: 12, kg: 22.1, color: "#4A6056" },
    { label: "Organic Compostable", pct: 10, kg: 18.2, color: "#788880" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-4">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#5C6A64]">
          Material Breakdown
        </span>
        <h3 className="text-base font-bold text-[#1E2522]">
          Stream Distribution
        </h3>
      </div>

      {/* Multi-segment bar */}
      <div className="h-4 w-full rounded-full overflow-hidden flex bg-[#EAEFEA]">
        {streams.map((stream, idx) => (
          <div
            key={idx}
            style={{ width: `${stream.pct}%`, backgroundColor: stream.color }}
            title={`${stream.label}: ${stream.kg} kg (${stream.pct}%)`}
            className="h-full hover:opacity-90 transition-opacity cursor-pointer"
          />
        ))}
      </div>

      {/* Legend list */}
      <div className="space-y-2 pt-1">
        {streams.map((stream, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F5] border border-[#EAEFEA] text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: stream.color }}
              />
              <span className="font-semibold text-[#1E2522] truncate">
                {stream.label}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-[#1E2522]">{stream.kg} kg</span>
              <span className="text-[10px] text-[#788880] ml-1">({stream.pct}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImpactChart({ totalKg = 184.5 }) {
  return (
    <div className="space-y-6">
      <ImpactBarChart />
      <WasteCompositionChart />
    </div>
  );
}

export default ImpactChart;
