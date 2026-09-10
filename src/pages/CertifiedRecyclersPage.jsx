import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Truck,
  Scale,
  MapPin,
  Phone,
  Mail,
  Download,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Boxes,
  Wrench,
  Leaf,
  Wine
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { RECYCLER_PARTNERS, WASTE_CATEGORIES } from "../data/mockData.js";
import Modal from "../components/Modal.jsx";

export default function CertifiedRecyclersPage() {
  const { navigateTo, addToast, currentRole } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [activeTab, setActiveTab] = useState("directory"); // directory | apply | standards
  const [inspectedCertificate, setInspectedCertificate] = useState(null);

  // Application form state
  const [applyForm, setApplyForm] = useState({
    facilityName: "",
    applicantName: "",
    email: "",
    phone: "",
    spcbLicenseNo: "",
    cluster: "Noida Industrial Phase-III",
    acceptedMaterials: ["plastic", "paper"],
    dailyCapacityKg: "3000",
    hasCalibratedScale: true,
    hasCpcbEpr: true,
    hasWorkerSafetyKit: true
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Filter facilities
  const filteredRecyclers = RECYCLER_PARTNERS.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.verifiedGovtLicense.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.cluster?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      partner.acceptedCategories.includes(selectedCategory);

    const matchesCluster =
      selectedCluster === "all" ||
      (partner.cluster && partner.cluster.toLowerCase().includes(selectedCluster.toLowerCase()));

    return matchesSearch && matchesCategory && matchesCluster;
  });

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case "paper":
        return FileText;
      case "plastic":
        return Boxes;
      case "ewaste":
        return Cpu;
      case "metal":
        return Wrench;
      case "organic":
        return Leaf;
      case "glass":
        return Wine;
      default:
        return Layers;
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.facilityName || !applyForm.spcbLicenseNo) {
      addToast({
        type: "error",
        title: "Incomplete Application",
        message: "Please specify facility name and active SPCB Consent License."
      });
      return;
    }

    setApplicationSubmitted(true);
    addToast({
      type: "success",
      title: "Accreditation Application Logged",
      message: `Provisional File #SAKSHI-ACCR-${Math.floor(1000 + Math.random() * 9000)} generated. SAKSHI Field Auditor will schedule digital weighbridge calibration.`
    });
  };

  return (
    <div id="certified-recyclers-page" className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-[#083833]/15 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b8f2e6] border border-[#83c5be]/60 text-xs font-bold text-[#083833]">
              <ShieldCheck className="w-4 h-4 text-[#083833]" />
              <span>Government Registered Processing Facilities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522]">
              Certified Recycler Network & Audit Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
              Every facility listed under SAKSHI holds an active State Pollution Control Board (SPCB) Consent to Operate and Central CPCB EPR authorization. All processed tonnage is cryptographically anchored to prevent double-counting or illegal dumping.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0 items-center">
            <button
              onClick={() => setActiveTab("directory")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === "directory"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] hover:bg-[#b8f2e6]/30"
              }`}
            >
              Verified Facilities ({RECYCLER_PARTNERS.length})
            </button>
            <button
              onClick={() => setActiveTab("standards")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === "standards"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] text-[#1E2522] hover:bg-[#b8f2e6]/30"
              }`}
            >
              Auditing Standards
            </button>
            <button
              onClick={() => setActiveTab("apply")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === "apply"
                  ? "bg-[#083833] text-white shadow-xs"
                  : "bg-[#083833] text-white hover:bg-[#062925] border border-[#083833]"
              }`}
            >
              Apply for Certification
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#EAEFEA]">
          <div className="p-3 bg-[#f3fcfa] rounded-2xl border border-[#b8f2e6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#083833] block">
              100% SPCB Authorized
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#1E2522] block mt-0.5">
              5 Active Hubs
            </span>
            <span className="text-[11px] text-[#5C6A64]">Zero unauthorized recyclers</span>
          </div>

          <div className="p-3 bg-[#f3fcfa] rounded-2xl border border-[#b8f2e6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#083833] block">
              Total Daily Quota
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#1E2522] block mt-0.5">
              32,500 kg/day
            </span>
            <span className="text-[11px] text-[#5C6A64]">Noida & Delhi NCR Region</span>
          </div>

          <div className="p-3 bg-[#f3fcfa] rounded-2xl border border-[#b8f2e6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#083833] block">
              Average Audit Rating
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#1E2522] block mt-0.5">
              99.1%
            </span>
            <span className="text-[11px] text-[#5C6A64]">Based on tare/gross verification</span>
          </div>

          <div className="p-3 bg-[#f3fcfa] rounded-2xl border border-[#b8f2e6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#083833] block">
              Clean EV Fleet
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#1E2522] block mt-0.5">
              18 Vehicles
            </span>
            <span className="text-[11px] text-[#5C6A64]">Electric cargo dispatch</span>
          </div>
        </div>
      </div>

      {/* VIEW: DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-[#083833]/15 p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#788880]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by facility name, SPCB license number (UPPCB / DPCC), or area..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs sm:text-sm text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCluster}
                  onChange={(e) => setSelectedCluster(e.target.value)}
                  className="px-3 py-2 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs font-semibold text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                >
                  <option value="all">All Regional Clusters</option>
                  <option value="noida">Noida Industrial (Sec 63 / Sec 8)</option>
                  <option value="okhla">Delhi Okhla Manufacturing Phase-I</option>
                  <option value="greater noida">Greater Noida & Techzone</option>
                  <option value="sahibabad">Sahibabad & Ghaziabad</option>
                </select>
              </div>
            </div>

            {/* Waste Stream Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-[#5C6A64] shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Waste Stream:
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#083833] text-white"
                    : "bg-[#FAF9F5] border border-[#D7E3DC] text-[#5C6A64] hover:text-[#1E2522]"
                }`}
              >
                All Streams
              </button>
              {WASTE_CATEGORIES.map((cat) => {
                const Icon = getCategoryIcon(cat.id);
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#083833] text-white"
                        : "bg-[#FAF9F5] border border-[#D7E3DC] text-[#5C6A64] hover:text-[#1E2522]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recyclers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecyclers.map((facility) => {
              const capacityRatio = facility.capacityPct || Math.round((facility.currentDailyLoadKg / facility.capacityDailyKg) * 100);
              return (
                <div
                  key={facility.id}
                  id={`facility-card-${facility.id}`}
                  className="bg-white rounded-3xl border border-[#083833]/15 p-6 shadow-xs smooth-card flex flex-col justify-between space-y-5"
                >
                  {/* Top Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50">
                            {facility.verifiedGovtLicense}
                          </span>
                          <span className="text-[10px] font-bold text-[#083833] flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#083833]" /> SPCB Licensed
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-[#1E2522] mt-1.5">
                          {facility.name}
                        </h3>
                        <p className="text-xs text-[#5C6A64] font-medium">
                          {facility.facilityType}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end font-bold text-sm text-[#1E2522]">
                          <span className="text-amber-500">★</span> {facility.rating}
                          <span className="text-[11px] text-[#788880]">({facility.reviewsCount})</span>
                        </div>
                        <span className="text-[11px] text-[#083833] font-semibold flex items-center gap-1 justify-end mt-0.5">
                          <MapPin className="w-3 h-3" /> {facility.distanceKm} km away
                        </span>
                      </div>
                    </div>

                    {/* Address & Cluster */}
                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAEFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#788880] uppercase font-bold block">Facility Location</span>
                        <span className="font-semibold text-[#1E2522]">{facility.address}</span>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-[10px] text-[#788880] uppercase font-bold block">Cluster</span>
                        <span className="font-semibold text-[#083833]">{facility.cluster}</span>
                      </div>
                    </div>

                    {/* Live Processing Capacity Gauge */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#5C6A64] font-semibold flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-[#083833]" /> Live Daily Quota Utilization:
                        </span>
                        <span className="font-mono font-bold text-[#1E2522]">
                          {facility.currentDailyLoadKg?.toLocaleString()} / {facility.capacityDailyKg?.toLocaleString()} kg ({capacityRatio}%)
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-[#EAEFEA] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            capacityRatio > 85
                              ? "bg-amber-500"
                              : "bg-[#083833]"
                          }`}
                          style={{ width: `${capacityRatio}%` }}
                        />
                      </div>
                    </div>

                    {/* Accepted Categories */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#788880] block">
                        Authorized Waste Streams Processed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {facility.acceptedCategories.map((catId) => {
                          const catObj = WASTE_CATEGORIES.find((c) => c.id === catId);
                          const Icon = getCategoryIcon(catId);
                          return (
                            <span
                              key={catId}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#b8f2e6]/50 border border-[#83c5be]/40 text-[#083833]"
                            >
                              <Icon className="w-3 h-3 text-[#083833]" />
                              {catObj ? catObj.name : catId}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Processing Technologies */}
                    {facility.techStack && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#788880] block">
                          Certified Industrial Recovery Tech
                        </span>
                        <div className="space-y-0.5">
                          {facility.techStack.map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-[#5C6A64]">
                              <CheckCircle2 className="w-3 h-3 text-[#083833] shrink-0" />
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & Cert Details */}
                  <div className="pt-4 border-t border-[#EAEFEA] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#788880] flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#083833]" /> {facility.pickupVehicle}
                      </span>
                      <span className="font-mono text-[#083833] font-bold">
                        Audit Score: {facility.auditScore || "99.4%"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setInspectedCertificate(facility)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] hover:border-[#83c5be] hover:bg-[#b8f2e6]/30 text-[#1E2522] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-[#083833]" />
                        <span>Inspect Certificate</span>
                      </button>

                      <button
                        onClick={() => {
                          addToast({
                            type: "info",
                            title: "Recycler Selected",
                            message: `Proceeding to schedule collection with ${facility.name}.`
                          });
                          navigateTo("schedule");
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Schedule Pickup</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: STANDARDS & AUDIT FRAMEWORK */}
      {activeTab === "standards" && (
        <div className="bg-white rounded-3xl border border-[#083833]/15 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Regulatory Integrity & Anti-Fraud
            </span>
            <h2 className="text-2xl font-black text-[#1E2522] mt-1">
              SAKSHI Certified Recycler Framework
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
              In conventional waste management, certificates of destruction and EPR tokens are frequently fabricated or double-claimed. SAKSHI implements a 4-layer hardware and software verification pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#f3fcfa] border border-[#b8f2e6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E2522]">
                1. Dual-Scale Calibration Standard
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                All partnered facilities utilize digital load cells calibrated under Legal Metrology Act standards. Drivers carry handheld certified electronic scales for residential pickups, cross-validated by gross weighbridge logs upon arrival at the processing plant.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f3fcfa] border border-[#b8f2e6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E2522]">
                2. Mandatory SPCB & CPCB Licensing
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                No facility can participate without active Consent to Operate (CTO) issued by UPPCB (Uttar Pradesh Pollution Control Board) or DPCC (Delhi Pollution Control Committee), plus Central EPR registration on the official CPCB portal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f3fcfa] border border-[#b8f2e6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E2522]">
                3. Geofenced Electric Fleet Telemetry
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                Collection vehicles (Tata Ace EV, Mahindra Treo) broadcast timestamped GPS coordinates. The handover OTP can only be validated within 150 meters of the scheduled generator address.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f3fcfa] border border-[#b8f2e6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E2522]">
                4. Cryptographic Proof-of-Recovery Stamping
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                Every verified kilogram generates a deterministic SHA-256 hash containing tare weight, gross weight, time, and inspector signature, permanently anchored to prevent duplicate tax or credit generation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: ACCREDITATION APPLICATION */}
      {activeTab === "apply" && (
        <div className="bg-white rounded-3xl border border-[#083833]/15 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Industrial Facility Onboarding
            </span>
            <h2 className="text-2xl font-black text-[#1E2522] mt-1">
              Apply to Become a SAKSHI Certified Recycler
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-2 leading-relaxed">
              Connect your recovery facility directly with high-volume residential societies, commercial tech parks, and institutions across Noida and Delhi NCR. Receive daily routed EV collections and automated ledger stamping.
            </p>
          </div>

          {applicationSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#f3fcfa] border-2 border-[#83c5be] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#083833] text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#4ecdc4]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E2522]">
                  Accreditation File Logged Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6A64] max-w-md mx-auto mt-1">
                  File Reference: <span className="font-mono font-bold text-[#083833]">SAKSHI-ACCR-2026-9082</span>
                </p>
                <p className="text-xs text-[#5C6A64] max-w-lg mx-auto mt-2">
                  Our regional compliance officer will contact <strong>{applyForm.applicantName || "your representative"}</strong> within 2 business days to schedule an on-site dual-scale calibration audit at your facility.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setApplicationSubmitted(false);
                    setActiveTab("directory");
                  }}
                  className="px-6 py-2.5 bg-[#083833] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#062925] transition-colors"
                >
                  Return to Certified Directory
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    Facility / Processing Unit Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.facilityName}
                    onChange={(e) => setApplyForm({ ...applyForm, facilityName: e.target.value })}
                    placeholder="e.g. Apex Polymer Granulation Works"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    SPCB Consent License No. (UPPCB / DPCC) *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.spcbLicenseNo}
                    onChange={(e) => setApplyForm({ ...applyForm, spcbLicenseNo: e.target.value })}
                    placeholder="e.g. UPPCB-NOC-2024-819"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    Lead Compliance Officer / Applicant Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.applicantName}
                    onChange={(e) => setApplyForm({ ...applyForm, applicantName: e.target.value })}
                    placeholder="e.g. Rajesh Khurana"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    placeholder="compliance@apex-recycling.in"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    Facility Cluster Location
                  </label>
                  <select
                    value={applyForm.cluster}
                    onChange={(e) => setApplyForm({ ...applyForm, cluster: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  >
                    <option value="Noida Industrial Phase-III">Noida Sector 63 & Industrial Zone</option>
                    <option value="Noida Sector 8 & 10">Noida Sector 8 / 10 Light Industrial</option>
                    <option value="Greater Noida Techzone">Greater Noida Techzone & Surajpur</option>
                    <option value="Delhi Okhla Phase-I">Delhi Okhla Industrial Area</option>
                    <option value="Ghaziabad Sahibabad Site-IV">Ghaziabad & Sahibabad Site-IV</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2522]">
                    Daily Processing Capacity (kg/day)
                  </label>
                  <input
                    type="number"
                    value={applyForm.dailyCapacityKg}
                    onChange={(e) => setApplyForm({ ...applyForm, dailyCapacityKg: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
                  />
                </div>
              </div>

              {/* Compliance Checkboxes */}
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAEFEA] space-y-3">
                <span className="text-xs font-bold text-[#1E2522] block">
                  Mandatory Operational Prerequisite Declarations
                </span>

                <label className="flex items-start gap-3 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={applyForm.hasCalibratedScale}
                    onChange={(e) => setApplyForm({ ...applyForm, hasCalibratedScale: e.target.checked })}
                    className="mt-0.5 rounded accent-[#083833] w-4 h-4"
                  />
                  <span className="text-[#5C6A64]">
                    Facility operates electronic weighbridge / digital scales calibrated annually with Legal Metrology stamped seal.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={applyForm.hasCpcbEpr}
                    onChange={(e) => setApplyForm({ ...applyForm, hasCpcbEpr: e.target.checked })}
                    className="mt-0.5 rounded accent-[#083833] w-4 h-4"
                  />
                  <span className="text-[#5C6A64]">
                    Registered on Central Pollution Control Board (CPCB) EPR Portal for Plastic / E-Waste processing certificates.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={applyForm.hasWorkerSafetyKit}
                    onChange={(e) => setApplyForm({ ...applyForm, hasWorkerSafetyKit: e.target.checked })}
                    className="mt-0.5 rounded accent-[#083833] w-4 h-4"
                  />
                  <span className="text-[#5C6A64]">
                    Facility guarantees compliance with statutory Minimum Wages and full Personal Protective Equipment (PPE) for all line workers.
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Accreditation Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* INSPECT OFFICIAL CERTIFICATE MODAL */}
      {inspectedCertificate && (
        <Modal
          isOpen={!!inspectedCertificate}
          onClose={() => setInspectedCertificate(null)}
          title={`Accreditation Certificate: ${inspectedCertificate.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Certificate Header Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#f3fcfa] to-white border-2 border-[#83c5be] text-center space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-[#083833] text-white flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-6 h-6 text-[#4ecdc4]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#083833] block">
                  National Circular Economy Verification Registry
                </span>
                <h3 className="text-xl font-extrabold text-[#1E2522] mt-1">
                  Certificate of Authorized Processing Compliance
                </h3>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  Pursuant to E-Waste & Plastic Waste Management Statutory Guidelines
                </p>
              </div>

              <div className="pt-2 border-t border-[#b8f2e6] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-left">
                <div>
                  <span className="text-[#788880] block">License No:</span>
                  <span className="font-mono font-bold text-[#083833]">{inspectedCertificate.verifiedGovtLicense}</span>
                </div>
                <div>
                  <span className="text-[#788880] block">CPCB Reg No:</span>
                  <span className="font-mono font-bold text-[#1E2522]">{inspectedCertificate.cpcbRegistrationNo || "CPCB/EPR/2024"}</span>
                </div>
                <div>
                  <span className="text-[#788880] block">Audit Score:</span>
                  <span className="font-mono font-bold text-[#083833]">{inspectedCertificate.auditScore || "99.4%"}</span>
                </div>
                <div>
                  <span className="text-[#788880] block">Valid Till:</span>
                  <span className="font-mono font-bold text-[#1E2522]">{inspectedCertificate.validTill || "31 Dec 2028"}</span>
                </div>
              </div>
            </div>

            {/* Certificate Specifications */}
            <div className="space-y-2.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
              <div className="flex justify-between py-1 border-b border-[#EAEFEA]">
                <span className="text-[#5C6A64]">Accredited Facility:</span>
                <span className="font-bold text-[#1E2522]">{inspectedCertificate.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAEFEA]">
                <span className="text-[#5C6A64]">Registered Address:</span>
                <span className="font-medium text-[#1E2522] text-right max-w-xs">{inspectedCertificate.address}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAEFEA]">
                <span className="text-[#5C6A64]">Accreditation Tier:</span>
                <span className="font-bold text-[#083833]">{inspectedCertificate.isoAccreditation || "ISO 14001:2015"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAEFEA]">
                <span className="text-[#5C6A64]">Authorized Daily Quota:</span>
                <span className="font-mono font-bold text-[#1E2522]">{inspectedCertificate.capacityDailyKg?.toLocaleString()} kg/day</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#5C6A64]">Lead Compliance Officer:</span>
                <span className="font-medium text-[#1E2522]">{inspectedCertificate.contactPerson}</span>
              </div>
            </div>

            {/* Cryptographic Proof Stamp */}
            <div className="p-3.5 bg-[#062925] text-[#b8f2e6] rounded-xl font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#83c5be]">IMMUTABLE AUDIT ROOT HASH:</span>
                <span className="text-[#4ecdc4] font-bold">VERIFIED VALID</span>
              </div>
              <p className="truncate text-[10px] text-[#e0f7f3]">
                {inspectedCertificate.certificateHash || "0x7a8e2b419c8f903e192f114ba5ce930129fca8410294"}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Certificate Downloaded",
                    message: `Official accreditation PDF for ${inspectedCertificate.name} saved to downloads.`
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#D7E3DC] hover:border-[#83c5be] text-xs font-bold text-[#1E2522] flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#083833]" />
                <span>Download Compliance Seal (PDF)</span>
              </button>

              <button
                onClick={() => setInspectedCertificate(null)}
                className="px-5 py-2.5 bg-[#083833] text-white rounded-xl text-xs font-bold hover:bg-[#062925] transition-colors"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
