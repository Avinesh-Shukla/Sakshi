import React from "react";
import {
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  Scale,
  ShieldCheck,
  Flame,
  Leaf,
  Users
} from "lucide-react";
import { ProgressBar } from "./ProgressBar.jsx";

const iconMap = {
  Award: Award,
  Flame: Flame,
  Layers: Layers,
  Scale: Scale,
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Users: Users
};

export default function AchievementCard({ achievement }) {
  const Icon = iconMap[achievement.iconName] || Award;
  const isUnlocked = achievement.unlocked;

  return (
    <div
      id={`achievement-${achievement.id}`}
      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
        isUnlocked
          ? "bg-white border-[#D7E3DC] shadow-xs"
          : "bg-[#FAF9F5] border-[#E2E8E5] opacity-80"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Geometric Badge Frame */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isUnlocked
              ? "bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50"
              : "bg-stone-200 text-stone-500 border border-stone-300"
          }`}
        >
          {isUnlocked ? (
            <Icon className="w-6 h-6" />
          ) : (
            <Lock className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-[#1E2522] truncate">
              {achievement.title}
            </h4>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isUnlocked
                  ? "bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/40"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {isUnlocked ? "Achieved" : "In Progress"}
            </span>
          </div>

          <p className="text-xs text-[#5C6A64] leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Progress or Unlocked Timestamp */}
      <div className="mt-4 pt-4 border-t border-[#EAEFEA]">
        {isUnlocked ? (
          <div className="flex items-center justify-between text-[11px] text-[#083833] font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified & Certified
            </span>
            <span className="text-[#788880]">{achievement.unlockedDate}</span>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#788880]">
              <span>Progress toward milestone</span>
              <span className="font-mono font-bold text-[#1E2522]">
                {achievement.currentProgress} / {achievement.targetProgress} {achievement.unit}
              </span>
            </div>
            <ProgressBar
              value={achievement.currentProgress}
              max={achievement.targetProgress}
              color="bg-[#83c5be]"
              height="h-1.5"
            />
          </div>
        )}
      </div>
    </div>
  );
}
