import React from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  BarChart3,
  Coins,
  User,
  Activity,
  Truck,
  ShieldCheck,
  Scale
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function MobileNav() {
  const { currentRole, currentPage, navigateTo } = useApp();

  const isGenerator = currentRole === "generator";

  const generatorTabs = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "certified_recyclers", label: "Recyclers", icon: ShieldCheck },
    { id: "schedule", label: "Pickup", icon: CalendarPlus },
    { id: "ledger", label: "Ledger", icon: Coins },
    { id: "profile", label: "Profile", icon: User }
  ];

  const recyclerTabs = [
    { id: "recycler_dashboard", label: "Console", icon: Activity },
    { id: "certified_recyclers", label: "Recyclers", icon: ShieldCheck },
    { id: "tracking", label: "Fleet", icon: Truck },
    { id: "verification", label: "Audit", icon: Scale },
    { id: "profile", label: "Facility", icon: User }
  ];

  const tabs = isGenerator ? generatorTabs : recyclerTabs;

  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#083833]/15 px-2 py-1.5 flex items-center justify-around shadow-md"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id;

        return (
          <button
            key={tab.id}
            id={`mobile-tab-${tab.id}`}
            onClick={() => {
              navigateTo(tab.id);
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl min-w-[58px] active:scale-95 transition-all duration-200 ${
              isActive
                ? "text-[#083833] font-bold bg-[#b8f2e6]/50"
                : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-black/5"
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-[#083833] stroke-[2.2] scale-105" : ""}`} />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#083833]" />
              )}
            </div>
            <span className="text-[10px] mt-1 font-semibold tracking-tight whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
