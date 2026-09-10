import React, { useState } from "react";
import {
  ShieldCheck,
  Recycle,
  Users,
  Target,
  Sparkles,
  Award,
  Globe,
  MapPin,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Heart,
  Scale,
  FileCheck2,
  Truck,
  Leaf,
  Building2,
  Clock,
  BookOpen
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function AboutUsPage() {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState("mission");

  const impactMetrics = [
    { label: "Verified Recyclables Diverted", value: "184.5+", unit: "Metric Tons", detail: "Tamper-evident tare & gross weighed" },
    { label: "Avoided Greenhouse Gas", value: "295.2+", unit: "MT CO₂e", detail: "Prevented open burning & landfill methane" },
    { label: "Active Participating Households", value: "4,200+", unit: "Families", detail: "Across 7 major Indian metro clusters" },
    { label: "Authorized Recycler Partners", value: "18+", unit: "State Facilities", detail: "Audited under CPCB & State PCB norms" }
  ];

  const cityHubs = [
    { city: "Delhi NCR", coverage: "Sector 62, 120, 137 Noida, Cyber City Gurugram, Dwarka", fleet: "14 EV Cargo Vans", partner: "EcoVidyut Hub (UPPCB Lic.)" },
    { city: "Bengaluru", coverage: "Electronic City Phase 1, Indiranagar, Whitefield, HSR Layout", fleet: "12 EV Cargo Vans", partner: "Bharat Circular Hub (KSPCB Lic.)" },
    { city: "Mumbai MMR & Pune", coverage: "Bandra, Andheri East, Thane West, Bhosari MIDC Pune", fleet: "16 EV Cargo Vans", partner: "Sahyadri EcoRecovery (MPCB Lic.)" },
    { city: "Hyderabad", coverage: "HITEC City Phase 2, Gachibowli, Jubilee Hills, Cherlapally", fleet: "8 EV Cargo Vans", partner: "Deccan Circular MRF (TSPCB Lic.)" },
    { city: "Chennai", coverage: "OMR IT Corridor, Adyar, Velachery, Guindy Industrial Zone", fleet: "8 EV Cargo Vans", partner: "Coromandel EcoWorks (TNPCB Lic.)" },
    { city: "Kolkata & Ahmedabad", coverage: "Salt Lake Sector V, New Town, SG Highway, Vatva GIDC", fleet: "10 EV Cargo Vans", partner: "Eastern Reclaim & Gujarat Circular" }
  ];

  const coreValues = [
    {
      title: "Radical Weighing Honesty",
      desc: "Zero estimates. Every transaction uses dual-stage tare (empty bin) and gross (full bin) digital scales right at your doorstep, certified by state legal metrology standards.",
      icon: Scale
    },
    {
      title: "Dignified Living Wages & Safety",
      desc: "Our EV drivers and material sorters receive fair guaranteed monthly compensation, health insurance, certified PPE masks and gloves, and formal recognition as green infrastructure heroes.",
      icon: Heart
    },
    {
      title: "Cryptographic Public Ledger",
      desc: "Every kilogram logged generates an immutable SHA-256 block hash linking weight receipts, GPS coordinates, and recycler gate entry certificates open for public inspection.",
      icon: FileCheck2
    },
    {
      title: "Zero Landfill Leakage",
      desc: "We exclusively partner with state-licensed pulping, pelletizing, and smelting plants that turn segregated dry waste directly into new domestic industrial raw materials.",
      icon: Recycle
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Arvind Swaminathan",
      role: "Co-Founder & Chief Sustainability Architect",
      background: "Ph.D. in Environmental Engineering (IIT Bombay). 14 years architecting municipal solid waste frameworks.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80"
    },
    {
      name: "Meera Sen",
      role: "Head of Operations & Logistics Fleet",
      background: "Former Logistics Director at electric commercial mobility networks; oversees our pan-India EV cargo fleet.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80"
    },
    {
      name: "Raghavendra Rao",
      role: "VP of Regulatory Compliance & EPR",
      background: "Ex-consultant to Central Pollution Control Board (CPCB); specialist in Plastic Waste & E-Waste Rules audit trails.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80"
    },
    {
      name: "Pooja Nandakumar",
      role: "Lead Platform & Cryptographic Engineer",
      background: "Distributed ledger researcher focused on tamper-evident supply chain traceability for environmental commodities.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div id="about-us-page" className="max-w-6xl mx-auto space-y-10">
      {/* Top Hero Section */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F1] border border-[#83c5be]/50 text-xs font-bold text-[#083833]">
            <Sparkles className="w-3.5 h-3.5 text-[#083833]" />
            <span>About SAKSHI Impact Ledger</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2522] tracking-tight font-display leading-tight">
            Restoring Public Trust in <span className="text-[#083833]">India’s Circular Economy.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#5C6A64] leading-relaxed max-w-2xl">
            SAKSHI was founded on a simple observation: millions of Indian families carefully rinse, fold, and separate their household dry waste, only to see it merged into landfill-bound municipal garbage trucks. We built India’s first tamper-evident doorstep recycling ledger to guarantee that your effort is weighed honestly and converted into verified circular products.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="about-schedule-cta"
              onClick={() => navigateTo("schedule")}
              className="px-5 py-2.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <span>Schedule a Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="about-ledger-cta"
              onClick={() => navigateTo("ledger")}
              className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] text-xs font-bold transition-all flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-[#083833]" />
              <span>Explore Cryptographic Ledger</span>
            </button>
          </div>
        </div>

        {/* Ambient Decorative Badge */}
        <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-1.5 opacity-90">
          <div className="px-3 py-1 rounded-lg bg-[#b8f2e6] border border-[#83c5be] text-[11px] font-extrabold text-[#083833]">
            CPCB EPR Compliant
          </div>
          <div className="text-[10px] text-[#788880] text-right font-medium">
            Standardized Tare Protocol ISO 14001:2015
          </div>
        </div>
      </section>

      {/* Real Verified Impact Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactMetrics.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs flex flex-col justify-between"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#788880]">
              {stat.label}
            </span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#083833] font-display">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-[#1E2522] ml-1">
                {stat.unit}
              </span>
            </div>
            <span className="text-[11px] text-[#5C6A64] border-t border-[#F0F4F2] pt-2">
              {stat.detail}
            </span>
          </div>
        ))}
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D7E3DC] pb-2">
        <button
          id="about-tab-mission"
          onClick={() => setActiveTab("mission")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "mission"
              ? "bg-[#083833] text-white shadow-xs"
              : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-white"
          }`}
        >
          Our Mission & Values
        </button>
        <button
          id="about-tab-network"
          onClick={() => setActiveTab("network")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "network"
              ? "bg-[#083833] text-white shadow-xs"
              : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-white"
          }`}
        >
          Pan-India Cluster Network
        </button>
        <button
          id="about-tab-team"
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "team"
              ? "bg-[#083833] text-white shadow-xs"
              : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-white"
          }`}
        >
          Leadership & Scientists
        </button>
      </div>

      {/* Tab 1: Mission & Pillars */}
      {activeTab === "mission" && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] border border-[#83c5be]/50 text-[#083833] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E2522]">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#5C6A64] mt-1.5 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How SAKSHI Works in the Community */}
          <div className="bg-[#FAF9F5] rounded-3xl border border-[#D7E3DC] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-[#1E2522]">
              Why We Call It SAKSHI (साक्षी)
            </h3>
            <p className="text-xs sm:text-sm text-[#3B4742] leading-relaxed max-w-3xl">
              In Sanskrit and Hindi, <strong>SAKSHI</strong> means <em>"The Witness"</em> or <em>"The Unbiased Observer"</em>. In our circularity ecosystem, the platform acts as the incorruptible witness to every gram of recyclable material handed over by citizens, transferred to EV cargo drivers, and processed at state-licensed hydropulping, polymer, and metallurgy plants. We remove speculation and replace it with mathematical, audited truth.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Pan-India Network */}
      {activeTab === "network" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs">
            <h3 className="text-base font-bold text-[#1E2522] mb-1">
              Active City Clusters & Registered Recovery Facilities
            </h3>
            <p className="text-xs text-[#5C6A64]">
              Our electric cargo fleet coordinates daily neighborhood sweeps to optimize route density and minimize carbon overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityHubs.map((hub) => (
              <div
                key={hub.city}
                className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1E2522] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#083833]" />
                      <span>{hub.city}</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F4F1] text-[#083833] border border-[#83c5be]/50">
                      {hub.fleet}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
                    <strong>Sectors:</strong> {hub.coverage}
                  </p>
                </div>

                <div className="border-t border-[#F0F4F2] pt-2 text-[11px] text-[#083833] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="truncate">{hub.partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Team */}
      {activeTab === "team" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs">
            <h3 className="text-base font-bold text-[#1E2522] mb-1">
              The People Stewarding India’s Clean Infrastructure
            </h3>
            <p className="text-xs text-[#5C6A64]">
              Combining hands-on environmental field engineering, legal metrology, and high-integrity software architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-[#D7E3DC] p-4 shadow-xs flex flex-col items-center text-center space-y-3"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D7E3DC]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1E2522]">
                    {member.name}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#083833] block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-[11px] text-[#5C6A64] leading-relaxed border-t border-[#F0F4F2] pt-2">
                  {member.background}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statutory & Regulatory Compliance Banner */}
      <section className="bg-white rounded-2xl border border-[#D7E3DC] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#b8f2e6] border border-[#83c5be] text-[#083833] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E2522]">
              Statutory EPR & Pollution Control Board Empanelled
            </h4>
            <p className="text-xs text-[#5C6A64] mt-0.5">
              Strict adherence to Plastic Waste Management Rules 2022/2024 and E-Waste Management Guidelines.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo("certified_recyclers")}
          className="px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-bold text-[#1E2522] whitespace-nowrap transition-all"
        >
          View Recycler Licenses
        </button>
      </section>
    </div>
  );
}
