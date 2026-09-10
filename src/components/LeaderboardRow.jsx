import React from "react";
import { Trophy, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function LeaderboardRow({ entry, isCurrentUser }) {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="w-6 h-6 rounded-full bg-[#D96B27] text-white flex items-center justify-center font-extrabold text-xs">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-6 h-6 rounded-full bg-[#788880] text-white flex items-center justify-center font-extrabold text-xs">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-6 h-6 rounded-full bg-[#B87333] text-white flex items-center justify-center font-extrabold text-xs">
          3
        </span>
      );
    }
    return (
      <span className="w-6 h-6 font-mono font-bold text-xs text-[#5C6A64] flex items-center justify-center">
        {rank}
      </span>
    );
  };

  const initials =
    entry.avatarInitials ||
    (entry.name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const kg = entry.kgDiverted !== undefined ? entry.kgDiverted : entry.divertedKg || 0;
  const sector = entry.sector || entry.society || "Noida Sector";

  return (
    <div
      id={`leaderboard-row-${entry.rank}`}
      className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
        isCurrentUser
          ? "bg-[#b8f2e6]/40 border-[#83c5be] shadow-xs"
          : "bg-white border-[#E2E8E5] hover:bg-[#FAF9F5]"
      }`}
    >
      {/* Left: Rank & User Details */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 flex justify-center shrink-0">
          {getRankBadge(entry.rank)}
        </div>

        <div className="w-9 h-9 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center font-bold text-xs shrink-0">
          {initials}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E2522] truncate">
              {entry.name}
            </h4>
            {isCurrentUser && (
              <span className="text-[10px] bg-[#83c5be] text-[#062925] font-bold px-1.5 py-0.2 rounded shrink-0">
                You
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#5C6A64] truncate">
            {sector}
          </p>
        </div>
      </div>

      {/* Right: Metrics */}
      <div className="flex items-center gap-4 sm:gap-8 shrink-0 text-xs">
        <div className="w-20 text-right">
          <span className="font-mono font-bold text-[#1E2522] block sm:text-sm">
            {kg} kg
          </span>
          <span className="text-[10px] text-[#788880] block sm:hidden">diverted</span>
        </div>

        <div className="w-24 text-right">
          <span className="font-mono font-bold text-[#083833] block sm:text-sm">
            {entry.credits?.toLocaleString()} pts
          </span>
        </div>
      </div>
    </div>
  );
}
