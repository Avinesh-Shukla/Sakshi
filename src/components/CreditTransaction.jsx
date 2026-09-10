import React from "react";
import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar.jsx";
import * as LucideIcons from "lucide-react";

export function CreditTransaction({ transaction }) {
  const isCredit = transaction.type === "credit";

  return (
    <div
      id={`credit-tx-${transaction.id}`}
      className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E2E8E5] hover:border-[#B8CEC2] transition-colors"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isCredit
              ? "bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50"
              : "bg-[#FDF1E8] text-[#D96B27]"
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft className="w-4 h-4 stroke-[2.2]" />
          ) : (
            <ArrowUpRight className="w-4 h-4" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-[#1E2522] truncate">
              {transaction.title}
            </h4>
            {transaction.referenceId && (
              <span className="text-[10px] font-mono bg-[#F2F5F3] text-[#5C6A64] px-1.5 py-0.5 rounded">
                #{transaction.referenceId}
              </span>
            )}
          </div>
          <p className="text-xs text-[#5C6A64] truncate mt-0.5">
            {transaction.description}
          </p>
          <span className="text-[11px] text-[#788880] mt-1 block">
            {transaction.date}
          </span>
        </div>
      </div>

      <div className="text-right shrink-0 ml-4">
        <span
          className={`text-base font-bold font-mono ${
            isCredit ? "text-[#083833]" : "text-[#D96B27]"
          }`}
        >
          {isCredit ? `+${transaction.amount}` : `-${transaction.amount}`}
        </span>
        <span className="text-[11px] text-[#788880] block mt-0.5">
          Bal: {transaction.balanceAfter?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export function AchievementCard({ achievement }) {
  const Icon = LucideIcons[achievement.icon] || LucideIcons.Award;
  const isUnlocked = achievement.unlocked;

  return (
    <div
      id={`ach-card-${achievement.id}`}
      className={`bg-white rounded-xl border p-5 transition-all relative overflow-hidden ${
        isUnlocked
          ? "border-[#D7E3DC] shadow-xs"
          : "border-[#E2E8E5] opacity-75 bg-[#FAF9F5]"
      }`}
    >
      <div className="flex items-start gap-3.5 mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isUnlocked
              ? "bg-[#b8f2e6] text-[#083833] border-[#83c5be]/50"
              : "bg-stone-100 text-stone-400 border-stone-200"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#788880]">
              {achievement.category}
            </span>
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#083833]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Unlocked {achievement.unlockedDate}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-stone-500">
                In Progress
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-[#1E2522] mt-0.5">
            {achievement.title}
          </h4>
        </div>
      </div>

      <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
        {achievement.description}
      </p>

      {/* Progress */}
      <div className="pt-2 border-t border-[#EAEFEA]">
        <div className="flex justify-between text-xs font-medium text-[#5C6A64] mb-1.5">
          <span>Milestone Progress</span>
          <span className="font-semibold text-[#1E2522]">
            {achievement.progressCurrent} / {achievement.progressTotal} {achievement.metricUnit || ""}
          </span>
        </div>
        <ProgressBar
          value={achievement.progressCurrent}
          max={achievement.progressTotal}
          color={isUnlocked ? "bg-[#83c5be]" : "bg-[#D96B27]"}
          height="h-1.5"
        />
      </div>
    </div>
  );
}

export default CreditTransaction;
