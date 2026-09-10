import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_GENERATOR_USER,
  INITIAL_RECYCLER_USER,
  INITIAL_ACTIVE_PICKUP,
  INITIAL_COMPLETED_PICKUPS,
  INITIAL_CREDIT_TRANSACTIONS,
  INITIAL_LEDGER_ENTRIES,
  MARKETPLACE_ITEMS,
  SUPPORT_TICKETS,
  ACHIEVEMENTS_LIST,
  UI_TRANSLATIONS
} from "../data/mockData.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current view and role
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("sakshi_role") || "generator";
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("sakshi_auth") === "true";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const isAuth = localStorage.getItem("sakshi_auth") === "true";
    const saved = localStorage.getItem("sakshi_page");
    if (!isAuth) {
      const publicViews = ["landing", "about", "services", "certified_recyclers", "ledger", "help", "login"];
      return publicViews.includes(saved) ? saved : "landing";
    }
    return saved || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("sakshi_auth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const [pageParams, setPageParams] = useState({});

  // Central User and Operations State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sakshi_generator_user");
      return saved ? { ...INITIAL_GENERATOR_USER, ...JSON.parse(saved) } : INITIAL_GENERATOR_USER;
    } catch {
      return INITIAL_GENERATOR_USER;
    }
  });

  const [recyclerUser, setRecyclerUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sakshi_recycler_user");
      return saved ? { ...INITIAL_RECYCLER_USER, ...JSON.parse(saved) } : INITIAL_RECYCLER_USER;
    } catch {
      return INITIAL_RECYCLER_USER;
    }
  });

  const [activePickup, setActivePickup] = useState(() => {
    const saved = localStorage.getItem("sakshi_active_pickup");
    return saved ? JSON.parse(saved) : INITIAL_ACTIVE_PICKUP;
  });

  const [completedPickups, setCompletedPickups] = useState(() => {
    const saved = localStorage.getItem("sakshi_completed_pickups");
    return saved ? JSON.parse(saved) : INITIAL_COMPLETED_PICKUPS;
  });

  const [creditTransactions, setCreditTransactions] = useState(() => {
    const saved = localStorage.getItem("sakshi_credit_txs");
    return saved ? JSON.parse(saved) : INITIAL_CREDIT_TRANSACTIONS;
  });

  const [ledgerEntries, setLedgerEntries] = useState(() => {
    const saved = localStorage.getItem("sakshi_ledger_entries");
    return saved ? JSON.parse(saved) : INITIAL_LEDGER_ENTRIES;
  });

  const [marketplaceList, setMarketplaceList] = useState(() => {
    const saved = localStorage.getItem("sakshi_marketplace");
    return saved ? JSON.parse(saved) : MARKETPLACE_ITEMS;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("sakshi_tickets");
    return saved ? JSON.parse(saved) : SUPPORT_TICKETS;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("sakshi_achievements");
    return saved ? JSON.parse(saved) : ACHIEVEMENTS_LIST;
  });

  const [pendingRedirect, setPendingRedirect] = useState(null);

  // Settings & Localization
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("sakshi_lang") || "en";
  });

  const [accessibility, setAccessibility] = useState(() => {
    const saved = localStorage.getItem("sakshi_accessibility");
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      largeText: false,
      voiceScreenReader: false,
      reducedMotion: false
    };
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modal states for global wizards
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [verifySuccessData, setVerifySuccessData] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("sakshi_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem("sakshi_page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("sakshi_generator_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("sakshi_active_pickup", JSON.stringify(activePickup));
  }, [activePickup]);

  useEffect(() => {
    localStorage.setItem("sakshi_completed_pickups", JSON.stringify(completedPickups));
  }, [completedPickups]);

  useEffect(() => {
    localStorage.setItem("sakshi_credit_txs", JSON.stringify(creditTransactions));
  }, [creditTransactions]);

  useEffect(() => {
    localStorage.setItem("sakshi_ledger_entries", JSON.stringify(ledgerEntries));
  }, [ledgerEntries]);

  useEffect(() => {
    localStorage.setItem("sakshi_marketplace", JSON.stringify(marketplaceList));
  }, [marketplaceList]);

  useEffect(() => {
    localStorage.setItem("sakshi_tickets", JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem("sakshi_achievements", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem("sakshi_lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("sakshi_accessibility", JSON.stringify(accessibility));
  }, [accessibility]);

  // Toast dispatch
  const addToast = (toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, duration: 4000, ...toast };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation
  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === "recycler") {
      setCurrentPage("recycler_dashboard");
    } else {
      setCurrentPage("dashboard");
    }
    addToast({
      type: "info",
      title: `Switched View`,
      message: `Now viewing as ${role === "generator" ? "Waste Generator (Aarav Sharma)" : "Certified Recycler (EcoVidyut Hub)"}.`
    });
  };

  // Schedule a verified pickup
  const scheduleNewPickup = (pickupDetails) => {
    const newId = `SK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPickup = {
      id: newId,
      status: "assigned",
      wasteTypeNames: pickupDetails.wasteTypeNames || "Segregated Dry Recyclables",
      wasteCategories: pickupDetails.wasteCategories || ["paper", "plastic"],
      estimatedWeightKg: parseFloat(pickupDetails.estimatedWeightKg || 15.0),
      actualWeightKg: null,
      pickupDate: pickupDetails.pickupDate || "Tomorrow, 10:00 AM",
      pickupAddress: pickupDetails.pickupAddress || user.address,
      recyclerId: pickupDetails.recyclerId || "rcy_ecovidyut",
      recyclerName: pickupDetails.recyclerName || "EcoVidyut Recyclers Hub",
      driverName: "Rajesh Verma",
      driverPhone: "+91 98712 34567",
      vehicleNumber: "UP-16-EC-4412",
      vehicleType: "Tata Ace Electric Cargo",
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      qrVerificationCode: `SAKSHI-VFY-${newId}-NOIDA`,
      estimatedCredits: Math.round(parseFloat(pickupDetails.estimatedWeightKg || 15.0) * 12),
      createdAt: "Just now",
      estimatedArrivalMin: 22,
      routeSteps: [
        { label: "Request Placed", time: "Just now", completed: true },
        { label: "Recycler Assigned", time: "Just now", completed: true },
        { label: "Vehicle En Route", time: "Pending", completed: false },
        { label: "Weight & Proof Capture", time: "Pending", completed: false },
        { label: "Ledger Stamped & Credited", time: "Pending", completed: false }
      ]
    };

    setActivePickup(newPickup);
    setScheduleModalOpen(false);
    addToast({
      type: "success",
      title: "Pickup Scheduled",
      message: `Pickup #${newId} assigned to ${newPickup.recyclerName}. OTP: ${newPickup.otp}`
    });
    navigateTo("tracking");
  };

  // Advance active pickup status simulation
  const advanceActivePickupStatus = (nextStatus) => {
    if (!activePickup) return;
    
    let updatedSteps = [...(activePickup.routeSteps || [])];
    if (nextStatus === "in_transit") {
      updatedSteps[2] = { ...updatedSteps[2], time: "En route (5 mins)", completed: true };
      addToast({
        type: "info",
        title: "Vehicle En Route",
        message: "Driver Rajesh Verma is 1.2 km away in Tata Ace EV."
      });
    } else if (nextStatus === "arrived") {
      updatedSteps[2] = { ...updatedSteps[2], completed: true };
      updatedSteps[3] = { ...updatedSteps[3], time: "Vehicle arrived at gate", completed: false };
      addToast({
        type: "info",
        title: "Collector Arrived",
        message: "Collector is at your gate. Please present OTP or scan QR."
      });
    } else if (nextStatus === "proof_submitted") {
      updatedSteps[3] = { ...updatedSteps[3], time: "Proof uploaded", completed: true };
      addToast({
        type: "success",
        title: "Proof Captured",
        message: "Tare/gross weight recorded and photo uploaded for recycler audit."
      });
    }

    setActivePickup((prev) => ({
      ...prev,
      status: nextStatus,
      routeSteps: updatedSteps
    }));
  };

  // Submit proof for active pickup
  const submitProofForPickup = (proofData) => {
    if (!activePickup) return;

    const netWeight = Math.max(0.1, ((Number(proofData?.grossWeightKg) || 0) - (Number(proofData?.tareWeightKg) || 0)));
    setActivePickup((prev) => ({
      ...prev,
      status: "proof_submitted",
      actualWeightKg: parseFloat((Number(netWeight) || 0.1).toFixed(2)),
      proofPhotoUrl: proofData.photoUrl || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
      tareWeightKg: proofData.tareWeightKg,
      grossWeightKg: proofData.grossWeightKg,
      proofTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      routeSteps: prev.routeSteps.map((step, idx) => {
        if (idx <= 3) return { ...step, completed: true };
        return step;
      })
    }));

    setProofModalOpen(false);
    addToast({
      type: "success",
      title: "Physical Proof Recorded",
      message: `Gross: ${proofData?.grossWeightKg ?? 0}kg, Tare: ${proofData?.tareWeightKg ?? 0}kg -> Net: ${(Number(netWeight) || 0.1).toFixed(1)}kg.`
    });
  };

  // Verify pickup (Recycler or Generator Verification view)
  const verifyAndCreditPickup = (pickupId = activePickup?.id) => {
    const pickupToVerify = activePickup && activePickup.id === pickupId ? activePickup : null;
    if (!pickupToVerify) return;

    const netWeight = Number(pickupToVerify.actualWeightKg || pickupToVerify.estimatedWeightKg || 24.5) || 24.5;
    // Calculate credits (e.g. 11-13 credits per kg average)
    const earnedCredits = Math.round(netWeight * 11);
    const co2Saved = parseFloat(((Number(netWeight) || 0) * 1.35).toFixed(1));
    const waterSaved = Math.round(netWeight * 7.5);
    const nowTimestamp = new Date();
    const formattedDate = `${nowTimestamp.getDate()} ${nowTimestamp.toLocaleString('default', { month: 'short' })} ${nowTimestamp.getFullYear()}, ${nowTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // Generate tamper-evident mock block
    const blockNum = (ledgerEntries[0]?.blockNumber || 41924) + 1;
    const randomHash = "0x" + Array.from({ length: 56 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    
    const newLedgerBlock = {
      blockNumber: blockNum,
      txHash: randomHash,
      previousHash: ledgerEntries[0]?.txHash || "0x7e29b10499e4f20817c91adbf30a5c814e49ac4091e98da871b6",
      timestamp: nowTimestamp.toISOString(),
      pickupId: pickupToVerify.id,
      generatorId: user.id,
      generatorLocation: "28.5921° N, 77.3820° E (Noida Sector 120)",
      recyclerId: pickupToVerify.recyclerId,
      recyclerName: pickupToVerify.recyclerName,
      wasteType: pickupToVerify.wasteTypeNames,
      tareWeightKg: pickupToVerify.tareWeightKg || 4.20,
      grossWeightKg: pickupToVerify.grossWeightKg || (netWeight + 4.20),
      netWeightKg: netWeight,
      creditsMinted: earnedCredits,
      co2OffsetKg: co2Saved,
      digitalSigner: "Vikas Singhania (Supervisor Certificate: UP-PKI-7741)",
      auditStatus: "Tamper-Evident Immutable Stamp Verified"
    };

    // Update User Balance & Diverted Stats
    const newCreditBalance = (Number(user?.credits) || 0) + earnedCredits;
    const newTotalWaste = parseFloat(((Number(user?.totalWasteDivertedKg) || 0) + netWeight).toFixed(1));
    const newCo2 = parseFloat(((Number(user?.co2OffsetKg) || 0) + co2Saved).toFixed(1));
    const newWater = (Number(user?.waterSavedLiters) || 0) + waterSaved;
    const newVerifiedCount = (Number(user?.verifiedPickupsCount) || 0) + 1;

    setUser((prev) => ({
      ...prev,
      credits: newCreditBalance,
      totalWasteDivertedKg: newTotalWaste,
      co2OffsetKg: newCo2,
      waterSavedLiters: newWater,
      verifiedPickupsCount: newVerifiedCount,
      creditsToNextLevel: Math.max(0, (prev?.nextLevelCredits || 1000) - newCreditBalance),
      levelProgressPct: Math.min(100, parseFloat((((newCreditBalance / (prev?.nextLevelCredits || 1000))) * 100).toFixed(1)))
    }));

    // Add Credit Transaction
    const newTx = {
      id: `tx_${Date.now()}`,
      type: "credit",
      amount: earnedCredits,
      title: `Pickup #${pickupToVerify.id} Verified`,
      description: `${netWeight} kg ${pickupToVerify.wasteTypeNames} certified by ${pickupToVerify.recyclerName}`,
      date: formattedDate,
      referenceId: pickupToVerify.id,
      balanceAfter: newCreditBalance
    };

    setCreditTransactions((prev) => [newTx, ...prev]);

    // Prepend to verified ledger
    setLedgerEntries((prev) => [newLedgerBlock, ...prev]);

    // Add to completed pickups
    const completedRecord = {
      ...pickupToVerify,
      status: "verified",
      actualWeightKg: netWeight,
      creditsAwarded: earnedCredits,
      co2SavedKg: co2Saved,
      blockIndex: blockNum,
      blockHash: randomHash.substring(0, 10) + "..." + randomHash.substring(50),
      verifiedDate: formattedDate
    };

    setCompletedPickups((prev) => [completedRecord, ...prev]);

    // Mark active pickup verified
    setActivePickup((prev) => ({
      ...prev,
      status: "verified",
      actualWeightKg: netWeight,
      routeSteps: prev.routeSteps.map((step) => ({ ...step, completed: true }))
    }));

    // Trigger celebration dialog data
    setVerifySuccessData({
      pickupId: pickupToVerify.id,
      earnedCredits,
      netWeight,
      blockNumber: blockNum,
      txHash: randomHash,
      co2Saved,
      recyclerName: pickupToVerify.recyclerName
    });

    addToast({
      type: "success",
      title: "Circularity Proof Verified",
      message: `+${earnedCredits} Circularity Credits added to your balance. Block #${blockNum} stamped.`
    });
  };

  // Redeem marketplace reward
  const redeemReward = (item) => {
    if (user.credits < item.creditsCost) {
      addToast({
        type: "warning",
        title: "Insufficient Credits",
        message: `You need ${item.creditsCost - user.credits} more credits for ${item.title}.`
      });
      return false;
    }

    const updatedCredits = (Number(user?.credits) || 0) - item.creditsCost;
    setUser((prev) => ({
      ...prev,
      credits: updatedCredits,
      creditsToNextLevel: Math.max(0, (prev?.nextLevelCredits || 1000) - updatedCredits),
      levelProgressPct: Math.min(100, parseFloat((((updatedCredits / (prev?.nextLevelCredits || 1000))) * 100).toFixed(1)))
    }));

    // Record debit transaction
    const newTx = {
      id: `tx_${Date.now()}`,
      type: "debit",
      amount: item.creditsCost,
      title: "Marketplace Redemption",
      description: `${item.title} (Order #MKT-${Math.floor(1000 + Math.random() * 9000)})`,
      date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      referenceId: `MKT-${Math.floor(1000 + Math.random() * 9000)}`,
      balanceAfter: updatedCredits
    };

    setCreditTransactions((prev) => [newTx, ...prev]);

    // Update stock in marketplace list
    setMarketplaceList((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, inStock: Math.max(0, m.inStock - 1) } : m))
    );

    addToast({
      type: "success",
      title: "Reward Redeemed",
      message: `Redeemed ${item.title}. -${item.creditsCost} Circularity Credits.`
    });

    return true;
  };

  // Create Support Ticket
  const createTicket = (category, subject, messageText) => {
    const newTicketId = `TCK-${Math.floor(4100 + Math.random() * 900)}`;
    const newTicket = {
      id: newTicketId,
      category,
      subject,
      status: "open",
      updatedAt: "Just now",
      messages: [
        {
          sender: user.name,
          time: "Just now",
          text: messageText
        },
        {
          sender: "SAKSHI NCR Care Desk",
          time: "Just now",
          text: "We have registered your ticket. A certified logistics agent from the Noida cluster will review the audit log within 2 hours."
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    addToast({
      type: "success",
      title: "Ticket Raised",
      message: `Ticket #${newTicketId} logged with SAKSHI Help Desk.`
    });
  };

  // Toggle Accessibility
  const toggleAccessibility = (key) => {
    setAccessibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "voiceScreenReader") {
        if (!prev[key]) {
          addToast({
            type: "info",
            title: "Voice Assistance Enabled",
            message: "Screen reading synthesis is active. Auditory alerts will confirm critical transactions."
          });
          if ('speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
            const utterance = new SpeechSynthesisUtterance("SAKSHI accessibility voice assistance is now enabled.");
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
          }
        }
      }
      return next;
    });
  };

  // Authentication
  const login = (role = "generator", userData = null) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    if (role === "recycler") {
      if (userData) setRecyclerUser((prev) => ({ ...prev, ...userData }));
      setCurrentPage("recycler_dashboard");
    } else {
      if (userData) setUser((prev) => ({ ...prev, ...userData }));
      setCurrentPage("dashboard");
    }
    addToast({
      type: "success",
      title: "Authenticated Successfully",
      message: `Signed in as ${role === "recycler" ? "Certified Recycler Partner" : "Waste Generator"}.`
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("sakshi_auth", "false");
    addToast({
      type: "info",
      title: "Signed Out",
      message: "You have securely exited your session."
    });
    setCurrentPage("landing");
  };

  // Reset to initial clean state
  const resetAllData = () => {
    localStorage.clear();
    setUser(INITIAL_GENERATOR_USER);
    setRecyclerUser(INITIAL_RECYCLER_USER);
    setActivePickup(INITIAL_ACTIVE_PICKUP);
    setCompletedPickups(INITIAL_COMPLETED_PICKUPS);
    setCreditTransactions(INITIAL_CREDIT_TRANSACTIONS);
    setLedgerEntries(INITIAL_LEDGER_ENTRIES);
    setMarketplaceList(MARKETPLACE_ITEMS);
    setTickets(SUPPORT_TICKETS);
    setAchievements(ACHIEVEMENTS_LIST);
    setPendingRedirect(null);
    setCurrentRole("generator");
    setCurrentPage("dashboard");
    addToast({
      type: "info",
      title: "State Reset",
      message: "Data has been restored to factory mock specifications."
    });
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentPage,
        isAuthenticated,
        setIsAuthenticated,
        pageParams,
        user,
        recyclerUser,
        activePickup,
        completedPickups,
        creditTransactions,
        ledgerEntries,
        marketplaceList,
        marketplaceItems: marketplaceList,
        setMarketplaceList,
        setMarketplaceItems: setMarketplaceList,
        tickets,
        achievements,
        setAchievements,
        pendingRedirect,
        setPendingRedirect,
        login,
        logout,
        language,
        accessibility,
        toasts,
        scheduleModalOpen,
        isScheduleModalOpen: scheduleModalOpen,
        proofModalOpen,
        isProofModalOpen: proofModalOpen,
        verifySuccessData,
        t,
        setScheduleModalOpen,
        setProofModalOpen,
        setVerifySuccessData,
        setCurrentRole,
        setCurrentPage,
        setLanguage,
        navigateTo,
        switchRole,
        addToast,
        removeToast,
        scheduleNewPickup,
        advanceActivePickupStatus,
        submitProofForPickup,
        verifyAndCreditPickup,
        redeemReward,
        redeemMarketplaceItem: redeemReward,
        createTicket,
        toggleAccessibility,
        resetAllData,
        resetToInitialData: resetAllData,
        impactMonthly: [
          { month: "May", kg: 28.5, heightPct: 35 },
          { month: "Jun", kg: 34.0, heightPct: 45 },
          { month: "Jul", kg: 42.5, heightPct: 65 },
          { month: "Aug", kg: 48.0, heightPct: 85 },
          { month: "Sep (Current)", kg: 31.5, heightPct: 52, isCurrent: true }
        ],
        wasteComposition: [
          { label: "Paper & Cardboard", pct: 37, kg: 68.2, color: "#83c5be" },
          { label: "Plastics (Rigid/Film)", pct: 28, kg: 51.4, color: "#b8f2e6" },
          { label: "E-Waste & Scrap", pct: 13, kg: 24.6, color: "#D96B27" },
          { label: "Metals & Cans", pct: 12, kg: 22.1, color: "#4A6056" },
          { label: "Organic Compostable", pct: 10, kg: 18.2, color: "#788880" }
        ]
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
