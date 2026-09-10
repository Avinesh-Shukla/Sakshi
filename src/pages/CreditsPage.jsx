import React, { useState } from "react";
import {
  Coins,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Download,
  ShoppingBag,
  Award,
  Info,
  Layers,
  FileCheck2
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import CreditTransaction from "../components/CreditTransaction.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";
import { WASTE_CATEGORIES } from "../data/mockData.js";

export default function CreditsPage() {
  const { user, creditTransactions, navigateTo, addToast } = useApp();
  const [filter, setFilter] = useState("all"); // 'all' | 'credit' | 'debit'

  const filteredTxs = creditTransactions.filter((tx) => {
    if (filter === "credit") return tx.type === "credit";
    if (filter === "debit") return tx.type === "debit";
    return true;
  });

  const exportStatement = () => {
    addToast({
      type: "success",
      title: "Ledger Statement Generated",
      message: "Circularity Credit statement (Q3-2026.csv) downloaded successfully."
    });
  };

  return (
    <div id="credits-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Top Banner: Balance & Tier */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#083833]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
                Verified Asset Balance
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1E2522]">
                {user.credits?.toLocaleString()}
              </h1>
              <span className="text-sm font-bold text-[#5C6A64]">
                Circularity Credits
              </span>
            </div>
            <p className="text-xs text-[#5C6A64] mt-1">
              Backed by verified physical diverted kilograms on the SAKSHI ledger.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo("marketplace")}
              className="px-5 py-2.5 rounded-xl bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Redeem in Marketplace</span>
            </button>

            <button
              onClick={exportStatement}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit CSV</span>
            </button>
          </div>
        </div>

        {/* Tier Milestones */}
        <div className="mt-8 pt-6 border-t border-[#EAEFEA] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D96B27]" />
              <span className="font-bold text-[#1E2522]">Current Tier: {user.level}</span>
            </div>
            <span className="font-semibold text-[#083833]">
              {user.creditsToNextLevel} credits to Gold Tier (1,500 credits)
            </span>
          </div>

          <ProgressBar
            value={user.credits}
            max={user.nextLevelCredits}
            color="bg-[#83c5be]"
            height="h-2.5"
          />

          <div className="flex justify-between text-[11px] text-[#788880]">
            <span>Bronze (0)</span>
            <span>Silver (500)</span>
            <span>Gold (1,500)</span>
            <span>Platinum (3,000)</span>
          </div>
        </div>
      </div>

      {/* Credit Multipliers Reference Table */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5C6A64] mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#083833]" />
          <span>Standard Credit Rates per Kilogram (Delhi NCR Cluster)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {WASTE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] text-center"
            >
              <span className="text-xs font-semibold text-[#1E2522] block truncate">
                {cat.name}
              </span>
              <span className="text-base font-extrabold font-mono text-[#083833] block mt-1">
                {cat.creditsPerKg} pts
              </span>
              <span className="text-[10px] text-[#788880] block">per net kg</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filterable Transaction History */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-[#1E2522]">
            Audited Credit Ledger History
          </h3>

          <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F5] rounded-xl border border-[#E2E8E5]">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === "all"
                  ? "bg-white text-[#083833] shadow-xs font-bold"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter("credit")}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === "credit"
                  ? "bg-white text-[#083833] shadow-xs font-bold"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              Earned (+)
            </button>
            <button
              onClick={() => setFilter("debit")}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === "debit"
                  ? "bg-white text-[#083833] shadow-xs font-bold"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              Redeemed (-)
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#EAEFEA]">
          {filteredTxs.map((tx) => (
            <CreditTransaction key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}
