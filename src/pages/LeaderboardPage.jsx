import React, { useState } from "react";
import { Trophy, Users, MapPin, Sparkles, Filter, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import LeaderboardRow from "../components/LeaderboardRow.jsx";
import { LEADERBOARD_DATA } from "../data/mockData.js";

export default function LeaderboardPage() {
  const { user } = useApp();
  const [tab, setTab] = useState("area"); // 'area' | 'month' | 'allTime'

  const currentList = LEADERBOARD_DATA[tab] || LEADERBOARD_DATA.area;

  return (
    <div id="leaderboard-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#D96B27]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
                Community Circularity Standing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
              Regional Impact Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
              Rankings based strictly on verified kilograms logged to the SAKSHI ledger.
            </p>
          </div>

          {/* User Current Rank Snippet */}
          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-4 sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Your Current Standing
            </span>
            <div className="flex items-center sm:justify-end gap-2 mt-0.5">
              <span className="text-2xl font-mono font-extrabold text-[#083833]">
                {tab === "month" ? "Rank #2" : tab === "allTime" ? "Rank #12" : "Rank #4"}
              </span>
              <span className="text-xs font-semibold text-[#1E2522]">
                (Top 5%)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-[#EAEFEA]">
          <button
            onClick={() => setTab("area")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tab === "area"
                ? "bg-[#83c5be] text-[#062925] shadow-xs"
                : "bg-[#FAF9F5] text-[#5C6A64] hover:text-[#1E2522]"
            }`}
          >
            Noida Sector 120 Cluster
          </button>
          <button
            onClick={() => setTab("month")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tab === "month"
                ? "bg-[#83c5be] text-[#062925] shadow-xs"
                : "bg-[#FAF9F5] text-[#5C6A64] hover:text-[#1E2522]"
            }`}
          >
            September 2026
          </button>
          <button
            onClick={() => setTab("allTime")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tab === "allTime"
                ? "bg-[#83c5be] text-[#062925] shadow-xs"
                : "bg-[#FAF9F5] text-[#5C6A64] hover:text-[#1E2522]"
            }`}
          >
            All-Time Verified
          </button>
        </div>
      </div>

      {/* RWA Collective Impact Highlight */}
      <div className="p-4 rounded-2xl bg-[#b8f2e6] border border-[#83c5be]/50 flex items-center justify-between text-xs text-[#083833]">
        <div className="flex items-center gap-2.5">
          <Users className="w-5 h-5 shrink-0" />
          <span>
            <strong>Prateek Laurel RWA (Sec 120):</strong> 4,820 kg dry waste collectively diverted this quarter across 48 resident households.
          </span>
        </div>
        <span className="font-bold text-[#083833] shrink-0 hidden sm:inline">
          98.2% Sorting Accuracy
        </span>
      </div>

      {/* Leaderboard Table / Rows */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-4 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#788880] border-b border-[#EAEFEA]">
          <div className="flex items-center gap-3">
            <span className="w-8 text-center">Rank</span>
            <span>Participant</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="w-20 text-right">Diverted</span>
            <span className="w-24 text-right">Credits</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          {currentList.map((entry) => (
            <LeaderboardRow
              key={`${tab}-${entry.rank}-${entry.name}`}
              entry={entry}
              isCurrentUser={entry.isCurrentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
