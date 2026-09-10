import React from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  Navigation,
  ShieldCheck,
  FileCheck2,
  Coins,
  BarChart3,
  Award,
  ShoppingBag,
  Trophy,
  HelpCircle,
  Settings,
  Activity,
  Truck,
  Scale,
  ExternalLink,
  ChevronRight,
  Info,
  Building2,
  LogIn,
  Layers,
  Users
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Sidebar() {
  const { currentRole, currentPage, navigateTo, user, recyclerUser, activePickup } = useApp();

  const isGenerator = currentRole === "generator";

  const generatorLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "services", label: "Our Services", icon: Layers, badge: "New" },
    { id: "certified_recyclers", label: "Certified Recyclers", icon: ShieldCheck, badge: "CPCB" },
    { id: "schedule", label: "Schedule Pickup", icon: CalendarPlus, badge: "Book" },
    { id: "tracking", label: "Live Route", icon: Navigation, pulse: activePickup?.status === "in_transit" },
    { id: "verification", label: "Verify Proof", icon: Scale },
    { id: "ledger", label: "Impact Ledger", icon: FileCheck2 },
    { id: "credits", label: "Circularity Credits", icon: Coins, count: user.credits },
    { id: "impact", label: "Impact Analytics", icon: BarChart3 },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "marketplace", label: "Eco Marketplace", icon: ShoppingBag },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "about", label: "About Us", icon: Users },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "profile", label: "Profile & Settings", icon: Settings }
  ];

  const recyclerLinks = [
    { id: "recycler_dashboard", label: "Operations Console", icon: Activity },
    { id: "services", label: "Recycling Services", icon: Layers },
    { id: "certified_recyclers", label: "Certified Recyclers", icon: ShieldCheck, badge: "Hubs" },
    { id: "tracking", label: "Fleet & Routes", icon: Truck },
    { id: "verification", label: "Audit & Verify Proof", icon: Scale },
    { id: "ledger", label: "Tamper-Evident Ledger", icon: FileCheck2 },
    { id: "impact", label: "Cluster Impact", icon: BarChart3 },
    { id: "about", label: "About Us", icon: Users },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "profile", label: "Facility Profile", icon: Settings }
  ];

  const links = isGenerator ? generatorLinks : recyclerLinks;

  return (
    <aside
      id="app-sidebar"
      className="hidden lg:flex flex-col w-64 bg-white/95 backdrop-blur-md rounded-3xl border border-[#083833]/15 my-4 mr-2 shrink-0 min-h-[calc(100vh-100px)] sticky top-[73px] p-4 select-none shadow-sm"
    >
      {/* Current Active Mode / User Mini Card */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-[#D7E3DC] p-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              isGenerator
                ? "bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50"
                : "bg-[#FDF1E8] text-[#D96B27]"
            }`}
          >
            {isGenerator ? "WG" : "RC"}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-[#1E2522] truncate">
              {isGenerator ? user.name : recyclerUser.facilityName}
            </h4>
            <p className="text-[10px] text-[#5C6A64] truncate">
              {isGenerator ? user.area : "Noida Hub (UPPCB Lic.)"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        <div className="text-[10px] uppercase font-bold tracking-wider text-[#788880] px-3 mb-2">
          {isGenerator ? "Circularity Management" : "Industrial Recovery Ops"}
        </div>

        {links.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              id={`sidebar-link-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#083833] text-white font-bold shadow-xs translate-x-1"
                  : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-[#b8f2e6]/40 hover:translate-x-0.5"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-[#4ecdc4] stroke-[2.2]" : "text-[#5C6A64]"}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.pulse && (
                <span className="w-2 h-2 rounded-full bg-[#D96B27] animate-ping shrink-0" />
              )}

              {item.badge && !isActive && (
                <span className="text-[9px] bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 font-bold px-1.5 py-0.5 rounded-md shrink-0">
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && !isActive && (
                <span className="text-[10px] font-bold text-[#788880] shrink-0">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Bottom Links */}
      <div className="pt-3 mt-auto border-t border-[#E2EAE5] space-y-1">
        <button
          onClick={() => navigateTo("login")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#083833] font-bold hover:bg-[#b8f2e6]/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <LogIn className="w-3.5 h-3.5 text-[#083833]" />
            <span>Sign In / Switch</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        </button>

        <button
          onClick={() => navigateTo("landing")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#5C6A64] hover:text-[#1E2522] hover:bg-[#b8f2e6]/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#083833]" />
            <span>How SAKSHI Works</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>
    </aside>
  );
}
