import React from "react";
import {
  Sparkles,
  CalendarPlus,
  Navigation,
  FileCheck2,
  ShoppingBag,
  Award,
  ArrowRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  Phone,
  MessageSquare,
  Users,
  Building,
  Truck
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PickupCard from "../components/PickupCard.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";

export default function GeneratorDashboard() {
  const {
    user,
    activePickup,
    completedPickups,
    navigateTo,
    setProofModalOpen,
    verifyAndCreditPickup,
    t
  } = useApp();

  return (
    <div id="generator-dashboard" className="space-y-8 py-2">
      {/* Welcome & Circularity Level Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-[#5C6A64]">
                {t.greeting},
              </span>
              <span className="text-xs bg-[#b8f2e6] text-[#083833] font-bold border border-[#83c5be]/50 px-2 py-0.5 rounded">
                Verified Resident • Prateek Laurel, Sector 120 Noida
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] font-display">
              {user.name}
            </h1>
            <p className="iso-measure text-xs sm:text-sm text-[#4A5852] mt-1 leading-relaxed">
              Thank you for keeping Noida clean! You are{" "}
              <span className="font-bold text-[#16201B]">
                {user.creditsToNextLevel} credits
              </span>{" "}
              away from attaining Gold Circular Pioneer tier.
            </p>
          </div>

          {/* Tier Progress Badge */}
          <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-4 sm:w-80 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D96B27]" />
                <span className="text-xs font-bold text-[#16201B] font-display">
                  {user.level}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#083833]">
                {user.credits} / {user.nextLevelCredits}
              </span>
            </div>

            <ProgressBar
              value={user.credits}
              max={user.nextLevelCredits}
              color="bg-[#83c5be]"
              height="h-2"
            />

            <div className="flex justify-between text-[11px] text-[#788880] mt-2 font-medium">
              <span>Current Tier: Silver</span>
              <span>Target: Gold (1,500 pts)</span>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 mt-6 border-t border-[#EAEFEA]">
          <button
            id="dash-quick-schedule"
            onClick={() => navigateTo("schedule")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#b8f2e6] text-[#083833] flex items-center justify-center shrink-0 group-hover:bg-[#83c5be] group-hover:text-[#062925] transition-colors">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Schedule Pickup</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Doorstep EV van</span>
            </div>
          </button>

          <button
            id="dash-quick-track"
            onClick={() => navigateTo("tracking")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center shrink-0 group-hover:bg-[#D96B27] group-hover:text-white transition-colors">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Live Route</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Driver Rajesh Verma</span>
            </div>
          </button>

          <button
            id="dash-quick-ledger"
            onClick={() => navigateTo("ledger")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#b8f2e6] text-[#083833] flex items-center justify-center shrink-0 group-hover:bg-[#83c5be] group-hover:text-[#062925] transition-colors">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Impact Ledger</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Audit certificates</span>
            </div>
          </button>

          <button
            id="dash-quick-marketplace"
            onClick={() => navigateTo("marketplace")}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#b8f2e6] text-[#083833] flex items-center justify-center shrink-0 group-hover:bg-[#83c5be] group-hover:text-[#062925] transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1E2522] block truncate">Redeem Credits</span>
              <span className="text-[10px] text-[#5C6A64] block truncate">Eco goods catalog</span>
            </div>
          </button>
        </div>
      </div>

      {/* Humanized Route Driver Spotlight Card */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Driver Rajesh Verma"
              className="w-13 h-13 rounded-full object-cover border-2 border-[#83c5be] shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#083833] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  Your Route Driver Today
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                  ★ 4.98
                </span>
              </div>
              <h3 className="text-base font-bold text-[#16201B] mt-0.5 font-display">
                Rajesh Verma
              </h3>
              <p className="text-xs text-[#5C6A64]">
                Tata Ace Electric • Plate: <span className="font-mono text-[#1E2522]">UP-16-EC-4412</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo("tracking")}
              className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-bold text-[#083833] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#083833]" />
              <span>Track Live EV</span>
            </button>
            <a
              href="tel:+919871234567"
              className="px-3.5 py-2 rounded-xl bg-[#083833] hover:bg-[#062925] text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Call Rajesh</span>
            </a>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#EAEFEA] bg-[#FAF9F5] rounded-xl p-3 text-xs text-[#3B4742] flex items-start gap-2">
          <Heart className="w-4 h-4 text-[#D96B27] shrink-0 mt-0.5" />
          <p className="iso-measure">
            <span className="font-bold text-[#16201B]">A quick note from Rajesh:</span>{" "}
            "Namaste Aarav ji! I will reach Sector 120 around 5:30 PM. If your paper and cartons are tied with string, our digital tare and gross weigh-in will take less than 2 minutes."
          </p>
        </div>
      </div>

      {/* Metric Snapshot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="metric-total-diverted"
          title="Diverted Waste"
          value={user.totalWasteDivertedKg}
          unit="kg"
          changeText="↑ 24.5 kg"
          subtitle="verified this week"
          iconName="Scale"
          accent="green"
        />

        <MetricCard
          id="metric-credits-balance"
          title="Circularity Credits"
          value={user.credits?.toLocaleString()}
          unit="pts"
          changeText="+245 credits"
          subtitle="stamped on ledger"
          iconName="Sparkles"
          accent="orange"
        />

        <MetricCard
          id="metric-co2-offset"
          title="CO₂ Avoided"
          value={user.co2OffsetKg}
          unit="kg"
          changeText="100% verified"
          subtitle="EPA conversion factor"
          iconName="Leaf"
          accent="green"
        />

        <MetricCard
          id="metric-verified-pickups"
          title="Audited Collections"
          value={user.verifiedPickupsCount}
          unit="pickups"
          changeText="3-wk streak"
          subtitle="Sector 120 route"
          iconName="ShieldCheck"
          accent="neutral"
        />
      </div>

      {/* Society Community Pulse Card */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] text-[#083833] flex items-center justify-center shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#083833] uppercase tracking-wider">
                Neighborhood Society Pulse
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b8f2e6] text-[#083833]">
                Prateek Laurel Sec 120
              </span>
            </div>
            <h3 className="text-base font-bold text-[#16201B] mt-0.5 font-display">
              3,420 kg Diverted by Your Neighbors This Month
            </h3>
            <p className="text-xs text-[#5C6A64]">
              42 participating families • You are currently{" "}
              <span className="font-bold text-[#083833]">#4 on the society leaderboard</span>!
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo("leaderboard")}
          className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-bold text-[#083833] flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <Users className="w-3.5 h-3.5" />
          <span>View Society Standings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Pickup Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#16201B] font-display">
              Active Scheduled Collection
            </h2>
            <span className="text-xs bg-[#b8f2e6] text-[#083833] font-bold border border-[#83c5be]/40 px-2 py-0.5 rounded">
              Today
            </span>
          </div>
          <button
            onClick={() => navigateTo("tracking")}
            className="text-xs font-semibold text-[#083833] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Full Route View <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activePickup ? (
          <PickupCard
            pickup={activePickup}
            onTrack={() => navigateTo("tracking")}
            onSubmitProof={() => setProofModalOpen(true)}
            onVerify={() => verifyAndCreditPickup(activePickup.id)}
          />
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#D7E3DC]">
            <p className="text-sm text-[#5C6A64] mb-3">No active collection in progress.</p>
            <button
              onClick={() => navigateTo("schedule")}
              className="px-4 py-2 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              Schedule Pickup
            </button>
          </div>
        )}
      </div>

      {/* Recent Certified Pickups & Tamper-Evident Stamping */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#16201B] font-display">
              Recent Certified Collections
            </h3>
            <p className="iso-measure text-xs text-[#5C6A64]">
              Each entry backed by on-site photo proof, tare weight calibration, and cryptographic signature.
            </p>
          </div>

          <button
            onClick={() => navigateTo("ledger")}
            className="text-xs font-semibold text-[#083833] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            Inspect Ledger <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedPickups.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#D7E3DC] p-4 sm:p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/40 px-2 py-0.5 rounded">
                      #{item.id}
                    </span>
                    <h4 className="text-sm font-bold text-[#16201B] mt-1.5 font-display">
                      {item.wasteTypeNames}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#083833]">
                      +{item.creditsAwarded} Credits
                    </span>
                    <span className="text-[10px] text-[#788880] block">
                      Block #{item.blockIndex}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2 my-2 border-y border-[#EAEFEA] text-xs">
                  <div>
                    <span className="text-[10px] text-[#788880] block">Audited Net Weight</span>
                    <span className="font-semibold text-[#16201B]">{item.actualWeightKg} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#788880] block">Recycler Certified</span>
                    <span className="font-semibold text-[#16201B] truncate block">{item.recyclerName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-[#788880]">
                <span>{item.pickupDate}</span>
                <span className="font-mono text-[10px] text-[#083833]">
                  {item.blockHash}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
