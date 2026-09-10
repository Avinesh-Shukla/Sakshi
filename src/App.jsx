import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MobileNav from "./components/MobileNav.jsx";
import { ToastContainer } from "./components/Toast.jsx";
import ProofSubmissionModal from "./components/ProofSubmissionModal.jsx";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import RoleSelectionPage from "./pages/RoleSelectionPage.jsx";
import GeneratorDashboard from "./pages/GeneratorDashboard.jsx";
import WasteSubmissionPage from "./pages/WasteSubmissionPage.jsx";
import PickupTrackingPage from "./pages/PickupTrackingPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import VerifiedLedgerPage from "./pages/VerifiedLedgerPage.jsx";
import CreditsPage from "./pages/CreditsPage.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import ImpactDashboardPage from "./pages/ImpactDashboardPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import RecyclerDashboardPage from "./pages/RecyclerDashboardPage.jsx";
import HelpDeskPage from "./pages/HelpDeskPage.jsx";
import ProfileSettingsPage from "./pages/ProfileSettingsPage.jsx";
import CertifiedRecyclersPage from "./pages/CertifiedRecyclersPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

import { Recycle, ShieldCheck, Leaf, Heart } from "lucide-react";

function AppContent() {
  const {
    currentPage,
    currentRole,
    isAuthenticated,
    navigateTo,
    toasts,
    removeToast,
    isProofModalOpen,
    setProofModalOpen,
    accessibility
  } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage />;
      case "role_selection":
      case "login":
        return <LoginPage />;
      case "certified_recyclers":
        return <CertifiedRecyclersPage />;
      case "dashboard":
        return <GeneratorDashboard />;
      case "schedule":
        return <WasteSubmissionPage />;
      case "tracking":
        return <PickupTrackingPage />;
      case "verification":
        return <VerificationPage />;
      case "ledger":
        return <VerifiedLedgerPage />;
      case "credits":
        return <CreditsPage />;
      case "achievements":
        return <AchievementsPage />;
      case "impact":
        return <ImpactDashboardPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "marketplace":
        return <MarketplacePage />;
      case "recycler_dashboard":
        return <RecyclerDashboardPage />;
      case "services":
        return <ServicesPage />;
      case "about":
        return <AboutUsPage />;
      case "help":
        return <HelpDeskPage />;
      case "profile":
        return <ProfileSettingsPage />;
      default:
        return currentRole === "recycler" ? <RecyclerDashboardPage /> : <GeneratorDashboard />;
    }
  };

  const isLandingOrAuth =
    currentPage === "landing" ||
    currentPage === "login" ||
    currentPage === "about" ||
    currentPage === "services" ||
    !isAuthenticated;

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#EEF2F6] text-[#1E2522] ${
        accessibility.highContrast ? "font-medium" : ""
      }`}
    >
      {/* Universal Top Header */}
      <Header />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Left Sidebar (visible on non-landing/auth views on desktop) */}
        {!isLandingOrAuth && <Sidebar />}

        {/* Dynamic Page Container with Smooth Transitions */}
        <main
          id="main-content"
          className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 ${
            !isLandingOrAuth ? "pb-24 lg:pb-12" : "pb-12"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#083833]/10 bg-white/95 backdrop-blur text-xs text-[#5C6A64] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#083833] text-[#10B981] flex items-center justify-center">
              <Recycle className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-[#1E2522]">SAKSHI Impact Ledger</span>
            <span>• Noida & Delhi NCR Regional Cluster</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => navigateTo("services")}
              className="hover:text-[#083833] font-semibold transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => navigateTo("about")}
              className="hover:text-[#083833] font-semibold transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo("certified_recyclers")}
              className="hover:text-[#083833] font-semibold transition-colors"
            >
              Certified Recyclers
            </button>
            <button
              onClick={() => navigateTo("ledger")}
              className="hover:text-[#083833] transition-colors"
            >
              Cryptographic Audit
            </button>
            <button
              onClick={() => navigateTo("help")}
              className="hover:text-[#083833] transition-colors"
            >
              Help & Support
            </button>
            <button
              onClick={() => navigateTo("login")}
              className="hover:text-[#083833] font-semibold transition-colors"
            >
              Sign In / Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      {!isLandingOrAuth && <MobileNav />}

      {/* Modals & Floating Notifications */}
      <ProofSubmissionModal
        isOpen={isProofModalOpen}
        onClose={() => setProofModalOpen(false)}
      />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
