import React, { useState } from "react";
import {
  Truck,
  Building2,
  Briefcase,
  Recycle,
  Scale,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  Coins,
  FileCheck2,
  Layers,
  Leaf
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import Modal from "../components/Modal.jsx";

export default function ServicesPage() {
  const { navigateTo, addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    orgType: "housing_society",
    city: "Delhi NCR",
    unitsCount: "150",
    notes: ""
  });

  const services = [
    {
      id: "doorstep_pickup",
      category: "residential",
      title: "Doorstep Recyclable Pickup (EV Fleet)",
      subtitle: "For individual apartments, independent homes, and residential floors",
      description:
        "Daily cluster electric cargo pickup across residential sectors. Every parcel is weighed with a certified digital tare scale right in front of you, generating an instant SMS/web cryptographic receipt.",
      features: [
        "100% Zero-emission electric vans (Tata Ace EV & Treo)",
        "Dual-stage tare and gross digital weighing protocol",
        "Instant credit disbursement upon doorstep handover",
        "Accepted: Cardboard, Paper, PET/HDPE Plastic, Metals, Glass"
      ],
      turnaround: "Scheduled within 24 Hours",
      footprint: "Pan-India Metropolitan Clusters",
      actionText: "Schedule Pickup Now",
      actionTarget: "schedule",
      badge: "Most Popular",
      icon: Truck
    },
    {
      id: "society_rwa",
      category: "society",
      title: "Housing Society (RWA) Zero-Waste Program",
      subtitle: "Consolidated dry waste segregation and collection for gated communities",
      description:
        "End-to-end partnership for resident welfare associations. We install standardized dry waste aggregation bays, train society maintenance staff, and conduct weekly bulk weighing sweeps.",
      features: [
        "Bulk collection with industrial mobile platform scales",
        "Society RWA Admin Dashboard for monthly diversion tracking",
        "Collective Circularity Credits convertible into solar lights or rooftop gardens",
        "Resident awareness workshops & color-coded segregation bins"
      ],
      turnaround: "Custom 2x or 3x Weekly Schedule",
      footprint: "50+ Gated Societies Active",
      actionText: "Request Society Onboarding",
      actionTarget: "inquiry",
      badge: "Community",
      icon: Building2
    },
    {
      id: "corporate_epr",
      category: "commercial",
      title: "Corporate & Tech Park EPR Compliance",
      subtitle: "Statutory Extended Producer Responsibility fulfillment and audit manifests",
      description:
        "Designed for brand owners, commercial IT parks, and FMCG manufacturers. SAKSHI issues CPCB-recognized plastic and electronic waste EPR credit fulfillment backed by immutable ledger proofs.",
      features: [
        "CPCB portal-aligned digital audit trails & serial certificates",
        "Cryptographically hashed manifest linked to state-licensed MRFs",
        "B2B bulk paper destruction and certified electronic equipment scrappage",
        "Quarterly & Annual ESG sustainability disclosure reports"
      ],
      turnaround: "Continuous Contractual Logistics",
      footprint: "Compliant with CPCB EPR Portal",
      actionText: "Inquire for Corporate EPR",
      actionTarget: "inquiry",
      badge: "Statutory",
      icon: Briefcase
    },
    {
      id: "industrial_recovery",
      category: "industrial",
      title: "Certified Material Recovery Facilities (MRF)",
      subtitle: "State-licensed hydropulping, polymer pelletizing, and cullet refining",
      description:
        "Empanelled industrial hubs operating in strict accordance with State Pollution Control Boards (UPPCB, KSPCB, MPCB, DPCC, TSPCB). Converting post-consumer bales directly into clean manufacturing inputs.",
      features: [
        "Hydropulping kraft paper into 100% recycled packaging carton",
        "Washed hot-flake optical sorting for food-grade PET preforms",
        "Closed-loop non-ferrous and ferrous metal scrap smelting",
        "Double-blind weighbridge entry and moisture-sensor audits"
      ],
      turnaround: "Same-day facility gate in-take",
      footprint: "18+ Empanelled State Hubs",
      actionText: "Browse Certified Recyclers",
      actionTarget: "certified_recyclers",
      badge: "CPCB Licensed",
      icon: Recycle
    },
    {
      id: "ewaste_refining",
      category: "industrial",
      title: "Authorized E-Waste & Toxic Hardware Refinement",
      subtitle: "Scientific extraction of precious metals with zero groundwater contamination",
      description:
        "Safe disposal of discarded motherboards, mobile phones, chargers, and IT infrastructure. Certified hydrometallurgical recovery that prevents heavy metals (lead, mercury, cadmium) from leaching into Indian soil.",
      features: [
        "Authorized hydrometallurgical processing (zero toxic burning)",
        "Certified destruction of proprietary hard disks and memory chips",
        "Green recycling disposal certificates provided for every device batch",
        "High-density credit reward structure for high-grade silicon waste"
      ],
      turnaround: "Specialized Secure Cargo Dispatch",
      footprint: "Authorized Hazardous Waste Lic.",
      actionText: "Schedule E-Waste Pickup",
      actionTarget: "schedule",
      badge: "Hazardous Safe",
      icon: Layers
    },
    {
      id: "marketplace_exchange",
      category: "residential",
      title: "Circularity Credits & Green Reward Exchange",
      subtitle: "Convert verified waste kilograms into sustainable everyday living items",
      description:
        "Every honest kilogram handed over to SAKSHI earns Circularity Credits stamped on the public ledger. Redeem your balance for upcycled lifestyle products, metro vouchers, or native tree saplings.",
      features: [
        "Instant credit crediting upon driver receipt confirmation",
        "Curated catalog of zero-waste personal and home products",
        "Delhi, Bengaluru, Mumbai, and Hyderabad Metro transit recharges",
        "GPS-tagged native urban tree planting certificates"
      ],
      turnaround: "Instant Digital Redemption",
      footprint: "Pan-India Free Shipping",
      actionText: "Explore Eco Marketplace",
      actionTarget: "marketplace",
      badge: "Zero Waste",
      icon: ShoppingBag
    }
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const handleAction = (service) => {
    if (service.actionTarget === "inquiry") {
      setSelectedServiceForInquiry(service);
      setInquiryModalOpen(true);
    } else {
      navigateTo(service.actionTarget);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      addToast({
        type: "error",
        title: "Required Fields Missing",
        message: "Please enter your full name and contact phone number."
      });
      return;
    }

    addToast({
      type: "success",
      title: "Partnership Request Registered",
      message: `Thank you, ${inquiryForm.name}! A SAKSHI regional cluster manager for ${inquiryForm.city} will contact you at ${inquiryForm.phone} within 4 hours.`
    });

    setInquiryModalOpen(false);
    setInquiryForm({
      name: "",
      phone: "",
      orgType: "housing_society",
      city: "Delhi NCR",
      unitsCount: "150",
      notes: ""
    });
  };

  return (
    <div id="services-page" className="max-w-6xl mx-auto space-y-10">
      {/* Hero Header */}
      <section className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F1] border border-[#83c5be]/50 text-xs font-bold text-[#083833]">
            <Sparkles className="w-3.5 h-3.5 text-[#083833]" />
            <span>Comprehensive Circular Solutions Across India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2522] tracking-tight font-display leading-tight">
            Our <span className="text-[#083833]">Services & Circular Solutions</span>
          </h1>

          <p className="text-sm sm:text-base text-[#5C6A64] leading-relaxed max-w-2xl">
            From household doorstep collections with zero-emission electric cargo vans, to housing society aggregation bays and corporate Extended Producer Responsibility (EPR) compliance—SAKSHI provides verified, transparent waste recovery at every scale.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="services-book-pickup"
              onClick={() => navigateTo("schedule")}
              className="px-5 py-2.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <span>Book Doorstep Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="services-help-support"
              onClick={() => navigateTo("help")}
              className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] text-xs font-bold transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#083833]" />
              <span>Contact Support Desk</span>
            </button>
          </div>
        </div>

        {/* Ambient Badge */}
        <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-1.5 opacity-90">
          <div className="px-3 py-1 rounded-lg bg-[#b8f2e6] border border-[#83c5be] text-[11px] font-extrabold text-[#083833]">
            Zero Landfill Protocol
          </div>
          <div className="text-[10px] text-[#788880] text-right font-medium">
            Certified Electric Fleet & Audited MRFs
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Services" },
          { id: "residential", label: "Residential & Doorstep" },
          { id: "society", label: "Housing Societies & RWAs" },
          { id: "commercial", label: "Corporate EPR & B2B" },
          { id: "industrial", label: "Industrial MRFs & E-Waste" }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`services-filter-${tab.id}`}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? "bg-[#083833] text-white shadow-xs"
                : "bg-white border border-[#D7E3DC] text-[#5C6A64] hover:text-[#1E2522] hover:bg-[#FAF9F5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl border border-[#D7E3DC] p-6 sm:p-7 shadow-xs hover:border-[#83c5be] transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#b8f2e6] border border-[#83c5be]/50 text-[#083833] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#D7E3DC] text-[#083833]">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1E2522]">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-[#083833] mt-0.5">
                  {service.subtitle}
                </p>

                <p className="text-xs text-[#5C6A64] mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Features Checklist */}
                <div className="mt-4 pt-4 border-t border-[#F0F4F2] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#788880] block">
                    Service Highlights
                  </span>
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#1E2522]">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Footer & Action */}
              <div className="pt-4 border-t border-[#F0F4F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-[#788880]">
                  <span className="font-semibold block text-[#1E2522]">
                    {service.turnaround}
                  </span>
                  <span>{service.footprint}</span>
                </div>

                <button
                  onClick={() => handleAction(service)}
                  className="px-4 py-2.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{service.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* RWA & Corporate Partnership Inquiries Modal */}
      {inquiryModalOpen && (
        <Modal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          title={selectedServiceForInquiry?.title || "Program Inquiry"}
        >
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <p className="text-xs text-[#5C6A64]">
              Connect with our zero-waste operations engineers for custom community or corporate proposals.
            </p>

            <div>
              <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                Full Name / Representative
              </label>
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                placeholder="e.g. Ramesh Chandra (RWA President)"
                className="w-full h-10 px-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 px-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                  City / Metropolitan Region
                </label>
                <select
                  value={inquiryForm.city}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833] bg-white"
                >
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai MMR">Mumbai MMR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                  Organization Type
                </label>
                <select
                  value={inquiryForm.orgType}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, orgType: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833] bg-white"
                >
                  <option value="housing_society">Gated Housing Society / RWA</option>
                  <option value="corporate_office">Corporate Tech Park / Office</option>
                  <option value="educational_institute">School / College Campus</option>
                  <option value="commercial_brand">Brand / FMCG (EPR Compliance)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                  Approx. Size (Flats / Employees)
                </label>
                <input
                  type="text"
                  value={inquiryForm.unitsCount}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, unitsCount: e.target.value })}
                  placeholder="e.g. 250 flats or 500 staff"
                  className="w-full h-10 px-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1E2522] block mb-1">
                Specific Notes or Requirement
              </label>
              <textarea
                rows={3}
                value={inquiryForm.notes}
                onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                placeholder="Describe your current waste collection setup or desired start date..."
                className="w-full p-3 rounded-xl border border-[#D7E3DC] text-xs focus:outline-none focus:border-[#083833]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F0F4F2]">
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#5C6A64] hover:bg-[#FAF9F5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold shadow-xs"
              >
                Submit Partnership Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
