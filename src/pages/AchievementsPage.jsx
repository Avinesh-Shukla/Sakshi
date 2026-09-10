import React from "react";
import { Award, Sparkles, CheckCircle2, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import AchievementCard from "../components/AchievementCard.jsx";

export default function AchievementsPage() {
  const { achievements, user } = useApp();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div id="achievements-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#083833]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
                Operational Milestones
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
              Circularity Impact Badges
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Earned exclusively through verified weight diversion and certified collection handovers.
            </p>
          </div>

          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-4 sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-[#788880] block">
              Unlocked Badges
            </span>
            <span className="text-2xl font-mono font-extrabold text-[#083833]">
              {unlockedCount} / {achievements.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#EAEFEA] text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#083833]" />
            <span className="text-[#5C6A64]">Strict Weight Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#083833]" />
            <span className="text-[#5C6A64]">No Gamified Junk or Gimmicks</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#083833]" />
            <span className="text-[#5C6A64]">Backed by SAKSHI Ledger</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
