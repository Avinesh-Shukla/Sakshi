import React, { useState } from "react";
import {
  Recycle,
  ShieldCheck,
  Scale,
  FileCheck2,
  Coins,
  ArrowRight,
  CheckCircle2,
  Truck,
  MapPin,
  TrendingUp,
  Cpu,
  Layers,
  Leaf,
  LogIn,
  Building2,
  Sparkles,
  QrCode,
  Heart,
  Users,
  Quote,
  Clock,
  ChevronDown,
  ChevronUp,
  Phone,
  HelpCircle,
  Award,
  SunMedium
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function LandingPage() {
  const { navigateTo } = useApp();
  const [activeWasteTab, setActiveWasteTab] = useState("cardboard");
  const [openFaq, setOpenFaq] = useState(0);

  // Real human stories powering SAKSHI across India
  const humanStories = [
    {
      name: "Rajesh Verma",
      role: "EV Collection Driver",
      cluster: "Delhi NCR Cluster (Sector 62, 120 & Gurugram)",
      vehicle: "Tata Ace EV (UP-16-EC-4412)",
      experience: "2.5 Years with SAKSHI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      quote:
        "Every morning I take my electric van across residential clusters. When families hand me clean, sorted paper and dry plastics with a smile, I know we're doing honest work. We weigh together on certified tare scales, provide a real-time ledger receipt, and ensure zero unscientific dumping.",
      tag: "842+ Verified Collections",
      highlight: "Zero-Emission Fleet"
    },
    {
      name: "Kavitha R.",
      role: "Material Recovery Specialist",
      cluster: "Bengaluru Circular Hub (Electronic City & Indiranagar)",
      vehicle: "Facility Badge #BCR-KA-09",
      experience: "3 Years in Resource Circularity",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      quote:
        "At SAKSHI hubs across Karnataka, Maharashtra, and NCR, we work with clean airflow ventilation, protective safety gear, state pollution board audit compliance, and dignified compensation. Waste management is finally treated as a high-integrity clean technology discipline.",
      tag: "Certified Material Grader",
      highlight: "Fair Wage Guaranteed"
    }
  ];

  // Interactive Waste Journey
  const wasteJourneys = {
    cardboard: {
      title: "Corrugated Cardboard & Newsprint",
      hindi: "अखबार और गत्ता",
      collector: "Driver Rajesh Verma (EV Cargo Van)",
      inspector: "Sunita Devi (Digital Tare Scale Audit)",
      destination: "State-Licensed Hydropulping Facilities (Pan-India)",
      outcome: "100% Recycled Kraft Paper & School Notebooks",
      humanImpact: "Saves 17 trees per ton and keeps 1.2 kg CO₂ out of city air per kg.",
      timeToProduct: "48 to 72 Hours from Doorstep",
      tip: "Flatten cartons and remove plastic tape to make weighing smooth."
    },
    plastic: {
      title: "Rigid Polymers & Clean Milk Jugs",
      hindi: "प्लास्टिक (पीईटी/एचडीपीई)",
      collector: "Driver Amit Singh (Mahindra Electric Treo)",
      inspector: "Vikas Singhania (NIR Polymer Sensor & Wash)",
      destination: "Certified Pelletizing & Flake Hubs (Pan-India)",
      outcome: "Sturdy Primary School Benches & Eco Planters",
      humanImpact: "Zero ocean or landfill runoff; saves 6 liters of water per kg processed.",
      timeToProduct: "5 to 7 Days Circular Cycle",
      tip: "Rinse milk pouches once to prevent odor for our sorting team."
    },
    ewaste: {
      title: "Old Smartphones, Cables & Appliances",
      hindi: "ई-कचरा व उपकरण",
      collector: "Specialized Secure Cargo Team",
      inspector: "Dr. Ananya Ray (Materials Scientist, GreenCore)",
      destination: "Sector 8 Hazardous-Free Refining Unit",
      outcome: "Recovered Copper, Rare Earths & Circuit Alloys",
      humanImpact: "Prevents toxic lead and mercury leaching into Yamuna groundwater.",
      timeToProduct: "Audited Certificate in 24 Hours",
      tip: "Please remove swollen phone batteries before handing over."
    }
  };

  // Ethical Commitments
  const humanPledges = [
    {
      title: "Fair Living Wages",
      desc: "Every collection driver and facility technician is paid above regional minimums with provident fund and health cover.",
      icon: Heart
    },
    {
      title: "Safety & Dignity First",
      desc: "Zero manual scavenging. Industrial protective gear, dust filtration, and sanitized working conditions across all hubs.",
      icon: ShieldCheck
    },
    {
      title: "Calibrated Scale in Front of You",
      desc: "No guessing or hidden deductions. Both tare and gross weight are digitally verified in your presence.",
      icon: Scale
    },
    {
      title: "Open, Public Proof",
      desc: "Every pickup generates an open ledger block. We show you the exact processing facility—not vague offset promises.",
      icon: FileCheck2
    }
  ];

  // FAQs with empathetic human answers
  const faqs = [
    {
      q: "Does my sorted plastic really get recycled, or does it end up in a landfill?",
      a: "This is the most critical question conscious citizens ask across India, and it's the exact reason SAKSHI exists. Every single pickup is weighed twice: once at your doorstep on our calibrated hanging scale, and once at our state-registered facility weighbridge. Photos of the scale, tare calibration, and vehicle entry logs are cryptographically stamped into our public ledger. You can inspect the exact licensed facility in your state (such as KSPCB, MPCB, UPPCB, or DPCC authorized hubs) that processed your batch."
    },
    {
      q: "How are the drivers and sorting staff treated and paid?",
      a: "With dignity and care. Our drivers operate clean, zero-emission electric cargo vehicles, work standard 8-hour daytime shifts, and receive comprehensive healthcare coverage. Our processing teams across national hubs work in ventilated facilities with high-grade protective gloves, respirators, and mandatory health check-ups."
    },
    {
      q: "I only have 3 or 4 kg of newspaper and a few bottles. Is that too small for a pickup?",
      a: "Not at all! We organize daily cluster routes across residential and tech corridors in Indian cities (e.g., scheduled morning and afternoon sector sweeps). Because our electric cargo fleet is already in your neighborhood cluster, picking up even a single bundle fits seamlessly into their scheduled route."
    },
    {
      q: "Why do I receive a 4-digit OTP during pickup?",
      a: "The OTP protects you and the driver. It ensures that the driver at your door is indeed the assigned SAKSHI partner for your slot, prevents unauthorized collectors, and unlocks the digital weigh-in receipt immediately on your screen."
    }
  ];

  return (
    <div id="landing-page" className="space-y-12 sm:space-y-16 py-4 sm:py-8 animate-fade-in">
      {/* Hero Section - Warm, Human & ISO-Compliant */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          {/* Empathetic Community Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#83c5be]/50 text-xs font-bold text-[#083833] mb-6">
            <Heart className="w-3.5 h-3.5 text-[#083833] fill-[#083833]/20" />
            <span>Dedicated to Zero-Landfill Living Across India</span>
          </div>

          {/* Headline complying with ISO heading scale */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#16201B] leading-[1.18] mb-5 font-display">
            Recycling That’s <span className="text-[#083833]">Actually Honest.</span>{" "}
            Weighed at Your Door, Verified Across India.
          </h1>

          {/* Body Paragraph complying with ISO 9241-161 65ch Line Measure */}
          <p className="iso-measure text-base sm:text-[17px] text-[#3B4742] leading-relaxed mb-8">
            Behind every kilogram you sort is an EV cargo driver from your city cluster, a certified recovery technician working in safe dignified conditions, and a tamper-evident receipt proving your recyclables never end up in Indian landfills or municipal dumps.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-primary-login-cta"
              onClick={() => navigateTo("login")}
              className="px-6 py-3.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#10B981]" />
              <span>Sign In / Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-recycler-directory-cta"
              onClick={() => navigateTo("certified_recyclers")}
              className="px-5 py-3.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#083833] text-sm sm:text-base font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#083833]" />
              <span>Certified Facilities</span>
            </button>

            <button
              id="hero-ledger-cta"
              onClick={() => navigateTo("ledger")}
              className="px-5 py-3.5 rounded-xl bg-white border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] text-sm sm:text-base font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-[#788880]" />
              <span>Public Impact Ledger</span>
            </button>
          </div>

          {/* Human Trust Notes */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-8 pt-6 border-t border-[#EAEFEA] text-xs text-[#5C6A64]">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#083833]" />
              Tare & Gross weight verified on-site
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#083833]" />
              Zero-emission EV cargo vans
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#083833]" />
              Fair living wages for all sorters
            </span>
          </div>
        </div>

        {/* Decorative soft gradient circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#b8f2e6]/25 pointer-events-none -z-0" />
      </section>

      {/* Human Spotlight: The Real People Behind SAKSHI */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#083833] bg-[#E6F4F1] px-3 py-1 rounded-full border border-[#83c5be]/40 inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#083833]" />
            <span>Community Champions</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] mt-2 font-display">
            Meet the Humans Powering Clean Streets in NCR
          </h2>
          <p className="iso-measure mx-auto text-sm text-[#5C6A64] mt-2 leading-relaxed">
            Waste collection isn't an algorithm. It's dedicated drivers, trained facility sorters, and proud resident societies working with mutual respect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {humanStories.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#83c5be] transition-colors"
            >
              <div>
                {/* Header with Photo & Role */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#83c5be] shadow-xs shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#16201B] font-display">
                        {person.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b8f2e6] text-[#083833]">
                        {person.highlight}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#083833]">
                      {person.role}
                    </p>
                    <p className="text-[11px] text-[#788880] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#5C6A64]" />
                      <span>{person.cluster}</span>
                    </p>
                  </div>
                </div>

                {/* Human Quote */}
                <div className="relative bg-[#FAF9F5] rounded-xl p-4 border border-[#EAEFEA] mb-4">
                  <Quote className="w-4 h-4 text-[#83c5be] mb-1.5 opacity-80" />
                  <p className="text-xs sm:text-[13px] text-[#2D3732] italic leading-relaxed">
                    "{person.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 border-t border-[#EAEFEA] flex items-center justify-between text-xs text-[#5C6A64]">
                <span className="font-semibold text-[#083833] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {person.tag}
                </span>
                <span className="text-[11px] font-mono text-[#788880]">
                  {person.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Human Journey: Follow Your Recyclables */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
            Complete Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] mt-1 font-display">
            Where Does Your Waste Actually Go?
          </h2>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
            Follow the journey of everyday household items from your doorstep to certified local repurposing facilities across India.
          </p>

          {/* Waste Selector Tabs */}
          <div className="inline-flex p-1 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl mt-6 gap-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveWasteTab("cardboard")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWasteTab === "cardboard"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              📦 Cardboard & Newsprint
            </button>
            <button
              onClick={() => setActiveWasteTab("plastic")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWasteTab === "plastic"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              🧴 Milk Jugs & Plastics
            </button>
            <button
              onClick={() => setActiveWasteTab("ewaste")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWasteTab === "ewaste"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              📱 Phones & E-Scrap
            </button>
          </div>
        </div>

        {/* Selected Journey Details */}
        {wasteJourneys[activeWasteTab] && (
          <div className="bg-[#FAF9F5] rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#EAEFEA]">
              <div>
                <span className="text-[11px] font-bold text-[#D96B27] uppercase tracking-wider">
                  {wasteJourneys[activeWasteTab].hindi}
                </span>
                <h3 className="text-xl font-extrabold text-[#16201B] font-display">
                  {wasteJourneys[activeWasteTab].title}
                </h3>
              </div>
              <div className="text-xs bg-[#E6F4F1] text-[#083833] border border-[#83c5be]/50 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{wasteJourneys[activeWasteTab].timeToProduct}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <div className="bg-white p-4 rounded-xl border border-[#D7E3DC]">
                <span className="text-[10px] uppercase font-bold text-[#788880] block">
                  1. Doorstep Pickup
                </span>
                <p className="text-xs font-bold text-[#1E2522] mt-1">
                  {wasteJourneys[activeWasteTab].collector}
                </p>
                <span className="text-[11px] text-[#5C6A64] block mt-0.5">
                  Weighed with resident present
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#D7E3DC]">
                <span className="text-[10px] uppercase font-bold text-[#788880] block">
                  2. Facility Audit
                </span>
                <p className="text-xs font-bold text-[#1E2522] mt-1">
                  {wasteJourneys[activeWasteTab].inspector}
                </p>
                <span className="text-[11px] text-[#5C6A64] block mt-0.5">
                  Double-blind tare calibration
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#D7E3DC]">
                <span className="text-[10px] uppercase font-bold text-[#788880] block">
                  3. Processing Hub
                </span>
                <p className="text-xs font-bold text-[#1E2522] mt-1">
                  {wasteJourneys[activeWasteTab].destination}
                </p>
                <span className="text-[11px] text-[#5C6A64] block mt-0.5">
                  UPPCB authorized facility
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#D7E3DC]">
                <span className="text-[10px] uppercase font-bold text-[#788880] block">
                  4. Real Useful Product
                </span>
                <p className="text-xs font-bold text-[#083833] mt-1">
                  {wasteJourneys[activeWasteTab].outcome}
                </p>
                <span className="text-[11px] text-[#5C6A64] block mt-0.5">
                  Given back to local community
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#D7E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#083833] font-semibold">
                <Leaf className="w-4 h-4 shrink-0 text-[#10B981]" />
                <span>{wasteJourneys[activeWasteTab].humanImpact}</span>
              </div>
              <div className="text-[#5C6A64] italic">
                💡 {wasteJourneys[activeWasteTab].tip}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Role Showcase - Generator vs Recycler */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
            Two Dedicated Portals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] mt-1 font-display">
            How Would You Like to Participate?
          </h2>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
            Whether you are a resident managing your household recyclables or an authorized facility managing regional intake, SAKSHI gives you transparent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Generator Role Card */}
          <div className="bg-[#FAF9F5] rounded-2xl border border-[#D7E3DC] hover:border-[#83c5be] p-6 sm:p-8 flex flex-col justify-between transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center mb-4">
                <Recycle className="w-6 h-6 text-[#083833]" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#16201B] font-display">
                  Waste Generator
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#b8f2e6] text-[#083833]">
                  Resident & RWA
                </span>
              </div>
              <p className="iso-measure text-xs text-[#5C6A64] leading-relaxed mb-4">
                For households, housing societies, and corporate tech parks across Indian cities and residential clusters.
              </p>
              <ul className="space-y-2 text-xs text-[#2D3732] font-medium mb-6">
                <li className="flex items-center gap-2">✓ Doorstep pickup booking with zero-emission EV trucks</li>
                <li className="flex items-center gap-2">✓ Assigned driver photo, direct contact & 4-digit OTP</li>
                <li className="flex items-center gap-2">✓ Calibrated tare & net weight receipts credited in real-time</li>
                <li className="flex items-center gap-2">✓ Redeem Circularity Credits for eco goods and school kits</li>
              </ul>
            </div>
            <button
              id="landing-role-generator-btn"
              onClick={() => navigateTo("login", { initialRole: "generator" })}
              className="w-full py-3 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login as Waste Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recycler Role Card */}
          <div className="bg-[#FAF9F5] rounded-2xl border border-[#D7E3DC] hover:border-[#D96B27] p-6 sm:p-8 flex flex-col justify-between transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FDF1E8] text-[#D96B27] border border-[#D96B27]/30 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-[#D96B27]" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#16201B] font-display">
                  Certified Recycler
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#FDF1E8] text-[#D96B27] border border-[#D96B27]/30">
                  Registered Hub
                </span>
              </div>
              <p className="iso-measure text-xs text-[#5C6A64] leading-relaxed mb-4">
                For state-registered recovery facilities, material recovery plants (MRFs), and refineries in Sector 63 & Okhla.
              </p>
              <ul className="space-y-2 text-xs text-[#2D3732] font-medium mb-6">
                <li className="flex items-center gap-2">✓ Regional dispatch console and waste intake management</li>
                <li className="flex items-center gap-2">✓ Digital weighbridge scale audit with gross/tare calculation</li>
                <li className="flex items-center gap-2">✓ Automatic cryptographic stamping on the public impact ledger</li>
                <li className="flex items-center gap-2">✓ CPCB Rule 16 & SPCB EPR compliance certification receipts</li>
              </ul>
            </div>
            <button
              id="landing-role-recycler-btn"
              onClick={() => navigateTo("login", { initialRole: "recycler" })}
              className="w-full py-3 rounded-xl bg-[#D96B27] hover:bg-[#C45E1E] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login as Certified Recycler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Human Dignity & Ethics Pledge */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
            Our Social Contract
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] mt-1 font-display">
            The SAKSHI Human Dignity Pledge
          </h2>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
            True environmental circularity is impossible if the workers collecting and sorting materials are exploited. We guarantee four strict moral standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {humanPledges.map((pledge, idx) => {
            const Icon = pledge.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#D7E3DC] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#083833] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#16201B] mb-1.5 font-display">
                    {pledge.title}
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    {pledge.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#EAEFEA] flex items-center gap-1.5 text-[11px] font-semibold text-[#083833]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audited Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* A Personal Letter from the Team (Empathetic Manifesto) */}
      <section className="bg-[#FAF9F5] rounded-3xl border border-[#D7E3DC] p-6 sm:p-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#083833]">
            <Heart className="w-4 h-4 text-[#083833] fill-[#083833]/20" />
            <span>A Personal Note from the Community Founders</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] font-display">
            Why We Built SAKSHI for All of India
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-[#3B4742] leading-relaxed iso-measure">
            <p>
              Across India—from the NCR belt and Mumbai to Bengaluru, Hyderabad, and Chennai—we’ve all witnessed the heartbreaking sight of overflow dumps, toxic winter smog, and contaminated waterways. We’ve felt that sinking feeling when watching a municipal compactor mix carefully segregated home recyclables into a single dirty landfill load.
            </p>
            <p>
              We realized that Indian citizens don't lack goodwill—they lack **verifiable trust**. When you spend time rinsing containers, flattening corrugated boxes, and bundling paper, you deserve indisputable proof that your effort actually counts.
            </p>
            <p>
              SAKSHI was created to restore that trust nationwide. When our EV driver arrives with a certified digital scale, when state-registered recyclers confirm gross weight on our blockchain-grade ledger, and when your cryptographic receipt is minted instantly, we prove that India's circular economy can thrive with radical honesty.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#083833] text-white flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div>
              <span className="text-xs font-bold text-[#16201B] block">
                The SAKSHI Community & Field Network
              </span>
              <span className="text-[11px] text-[#788880]">
                National Network • Delhi NCR, Bengaluru, Mumbai MMR, Hyderabad, Chennai, Kolkata & Pune
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Questions, Human Answers (FAQ) */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
            Real Conversations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16201B] mt-1 font-display">
            Honest Questions, Straightforward Answers
          </h2>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
            No marketing spin or technical jargon. Here is how SAKSHI handles the real questions of citizens across India.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#D7E3DC] bg-[#FAF9F5] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F0F4F1] transition-colors"
                >
                  <span className="text-sm font-bold text-[#16201B] flex items-center gap-2.5 font-display">
                    <HelpCircle className="w-4 h-4 text-[#083833] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#5C6A64] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#5C6A64] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3B4742] leading-relaxed border-t border-[#EAEFEA] bg-white">
                    <p className="iso-measure">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Warm Community Invitation Banner */}
      <section className="bg-[#083833] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
            Join the Clean Revolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display">
            Ready to Verify Your Circularity Impact?
          </h2>
          <p className="iso-measure mx-auto text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Join hundreds of conscious residents, housing societies, and authorized recyclers across India on the national tamper-evident circular economy ledger.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigateTo("login")}
              className="px-6 py-3.5 rounded-xl bg-white text-[#083833] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Go to Sign In Panel</span>
            </button>
            <button
              onClick={() => navigateTo("certified_recyclers")}
              className="px-5 py-3.5 rounded-xl bg-[#083833] border border-white/30 text-white hover:bg-[#0b4841] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Explore Certified Hubs</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
