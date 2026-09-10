import React, { useState } from "react";
import {
  Recycle,
  Sparkles,
  Globe,
  Volume2,
  ChevronDown,
  User,
  Plus,
  ShieldCheck,
  FileCheck2,
  ShoppingBag,
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  ArrowRight,
  Layers,
  Users,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { REGIONAL_LANGUAGES } from "../data/mockData.js";

export default function Header() {
  const {
    currentRole,
    isAuthenticated,
    user,
    recyclerUser,
    currentPage,
    navigateTo,
    logout,
    language,
    setLanguage,
    accessibility,
    toggleAccessibility
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGenerator = currentRole === "generator";
  const isLandingView = currentPage === "landing";

  // Navigation items when authenticated
  const authenticatedLinks = isGenerator
    ? [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "services", label: "Services", icon: Layers },
        { id: "certified_recyclers", label: "Certified Recyclers", icon: ShieldCheck, badge: "CPCB" },
        { id: "schedule", label: "Schedule Pickup", icon: Plus },
        { id: "ledger", label: "Impact Ledger", icon: FileCheck2 },
        { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
        { id: "about", label: "About Us", icon: Users },
        { id: "help", label: "Help & Support", icon: HelpCircle }
      ]
    : [
        { id: "recycler_dashboard", label: "Operations Console", icon: LayoutDashboard },
        { id: "services", label: "Services", icon: Layers },
        { id: "certified_recyclers", label: "Recycler Directory", icon: ShieldCheck, badge: "Audited" },
        { id: "tracking", label: "Fleet & Routes", icon: Plus },
        { id: "verification", label: "Audit Scale", icon: FileCheck2 },
        { id: "ledger", label: "Ledger", icon: FileCheck2 },
        { id: "about", label: "About Us", icon: Users },
        { id: "help", label: "Help & Support", icon: HelpCircle }
      ];

  // Navigation items when on landing page or public visitor
  const publicLinks = [
    { id: "landing", label: "Circularity Model", icon: Recycle },
    { id: "services", label: "Services", icon: Layers },
    { id: "certified_recyclers", label: "Certified Recyclers", icon: ShieldCheck, badge: "CPCB" },
    { id: "ledger", label: "Public Impact Ledger", icon: FileCheck2, badge: "Verified" },
    { id: "about", label: "About Us", icon: Users },
    { id: "help", label: "Help & Support", icon: HelpCircle }
  ];

  const activeLinks = isAuthenticated && !isLandingView ? authenticatedLinks : publicLinks;

  const handleBrandClick = () => {
    if (isAuthenticated) {
      navigateTo(isGenerator ? "dashboard" : "recycler_dashboard");
    } else {
      navigateTo("landing");
    }
  };

  const handleLinkClick = (id) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#083833]/10 shadow-xs select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            title="SAKSHI Impact Ledger Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#083833] text-[#10B981] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Recycle className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base font-extrabold tracking-tight text-[#1E2522]">
                  SAKSHI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/60">
                  Ledger
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Top Navigation Bar (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-0.5 bg-[#FAF9F5] border border-[#D7E3DC] p-1 rounded-2xl shadow-2xs overflow-x-auto"
        >
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                id={`header-nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#083833] text-white shadow-xs font-bold"
                    : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-[#b8f2e6]/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#10B981]" : "text-[#788880]"}`} />
                <span>{link.label}</span>
                {link.badge && !isActive && (
                  <span className="text-[9px] font-extrabold px-1 rounded bg-[#b8f2e6] text-[#083833]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions & User Session */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile / Tablet Menu Button */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#083833] transition-colors"
            title="Toggle Navigation Menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* If NOT Authenticated / on Landing: Display Sign In CTA */}
          {(!isAuthenticated || isLandingView) ? (
            <button
              id="header-signin-cta"
              onClick={() => navigateTo("login")}
              className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold shadow-xs transition-all duration-200 whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Portal</span>
            </button>
          ) : (
            /* If Authenticated: Display Workspace Controls & Profile */
            <>
              {/* Credits Balance (Generator) */}
              {isGenerator && (
                <button
                  onClick={() => navigateTo("credits")}
                  className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#b8f2e6] border border-[#83c5be] hover:bg-[#a3eedf] text-xs font-bold text-[#083833] transition-all shadow-2xs whitespace-nowrap"
                  title="Circularity Credits Balance"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#083833]" />
                  <span className="font-bold">{user.credits?.toLocaleString()}</span>
                  <span className="text-[10px] text-[#0d4a43]">CR</span>
                </button>
              )}

              {/* Schedule Pickup (Generator) or Console (Recycler) */}
              {isGenerator ? (
                <button
                  id="header-schedule-btn"
                  onClick={() => navigateTo("schedule")}
                  className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold shadow-xs transition-all duration-200 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">Schedule Pickup</span>
                  <span className="sm:hidden">Pickup</span>
                </button>
              ) : (
                <button
                  onClick={() => navigateTo("recycler_dashboard")}
                  className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-[#D96B27] hover:bg-[#C45E1E] text-white text-xs font-bold shadow-xs transition-all duration-200 whitespace-nowrap"
                >
                  <span>Console</span>
                </button>
              )}

              {/* User Identity & Profile Menu */}
              <div className="relative">
                <button
                  id="user-profile-menu-button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 h-9 px-2.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] text-xs font-semibold shadow-2xs transition-all"
                  title="Account Settings"
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${
                      isGenerator
                        ? "bg-[#083833] text-white"
                        : "bg-[#D96B27] text-white"
                    }`}
                  >
                    {isGenerator ? "G" : "R"}
                  </div>
                  <span className="hidden md:inline font-bold text-xs truncate max-w-[110px]">
                    {isGenerator ? user.name.split(" ")[0] : "EcoVidyut"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#788880]" />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border border-[#D7E3DC] shadow-xl p-2.5 z-50 animate-fade-in space-y-2">
                    <div className="px-2 py-1 border-b border-[#EAEFEA] pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isGenerator ? "bg-[#083833]" : "bg-[#D96B27]"}`} />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#788880]">
                          {isGenerator ? "Waste Generator" : "Certified Recycler"}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#1E2522] mt-0.5 truncate">
                        {isGenerator ? user.name : recyclerUser.facilityName}
                      </p>
                      <p className="text-[10px] text-[#5C6A64] truncate">
                        {isGenerator ? user.area : recyclerUser.registrationNumber}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigateTo("profile");
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1E2522] hover:bg-[#FAF9F5] flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#788880]" />
                      <span>Profile & Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigateTo("login");
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#083833] hover:bg-[#b8f2e6]/30 flex items-center gap-2 transition-colors"
                    >
                      <LogIn className="w-3.5 h-3.5 text-[#083833]" />
                      <span>Switch Account / Sign In</span>
                    </button>

                    <div className="border-t border-[#EAEFEA] pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button
              id="language-menu-button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-[#5C6A64] hover:text-[#1E2522] bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] transition-colors"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#083833]" />
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl border border-[#D7E3DC] shadow-xl p-1.5 z-50 animate-fade-in">
                {REGIONAL_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                      language === lang.code
                        ? "bg-[#b8f2e6] text-[#083833] font-bold"
                        : "text-[#1E2522] hover:bg-[#FAF9F5]"
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] text-[#788880] uppercase">
                      {lang.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Voice Guidance */}
          <button
            onClick={() => toggleAccessibility("voiceScreenReader")}
            className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-xl text-xs transition-colors ${
              accessibility.voiceScreenReader
                ? "bg-[#083833] text-white shadow-xs"
                : "text-[#5C6A64] hover:text-[#1E2522] bg-[#FAF9F5] border border-[#D7E3DC]"
            }`}
            title="Toggle Accessibility Screen Reader Guidance"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-header-drawer"
          className="lg:hidden bg-white border-b border-[#D7E3DC] px-4 py-3 shadow-lg animate-fade-in space-y-1.5"
        >
          <div className="text-[10px] uppercase font-bold text-[#788880] px-2 mb-1">
            Navigation
          </div>
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#083833] text-white font-bold"
                    : "text-[#1E2522] hover:bg-[#FAF9F5]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#10B981]" : "text-[#788880]"}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && !isActive && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#b8f2e6] text-[#083833]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#F0F4F2] flex items-center justify-between gap-2">
            <button
              onClick={() => handleLinkClick("services")}
              className="flex-1 py-2 text-center rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] text-xs font-bold text-[#083833]"
            >
              Services
            </button>
            <button
              onClick={() => handleLinkClick("about")}
              className="flex-1 py-2 text-center rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] text-xs font-bold text-[#083833]"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick("help")}
              className="flex-1 py-2 text-center rounded-xl bg-[#083833] text-xs font-bold text-white shadow-xs"
            >
              Help & Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
