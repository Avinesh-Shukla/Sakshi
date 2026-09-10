import React, { useState, useEffect } from "react";
import {
  WasteTypeSelector,
  RecyclerCard
} from "../components/WasteTypeSelector.jsx";
import { RECYCLER_PARTNERS, WASTE_CATEGORIES } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Truck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Search
} from "lucide-react";

export default function WasteSubmissionPage() {
  const { user, scheduleNewPickup, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(["paper", "plastic"]);
  const [weightKg, setWeightKg] = useState(18.5);
  const [address, setAddress] = useState(user.address || "Flat 402, Prateek Laurel, Sector 120, Noida");
  const [selectedCity, setSelectedCity] = useState(user.city || "Delhi NCR");
  const [selectedSector, setSelectedSector] = useState(user.area || "Sector 120, Noida");
  const [timeSlot, setTimeSlot] = useState("Tomorrow, 10:00 AM");
  const [notes, setNotes] = useState("Corrugated boxes flattened and tied with jute twine. Kept near tower lobby.");
  
  // Recycler matching simulation
  const [matchingState, setMatchingState] = useState("idle"); // 'idle' | 'matching' | 'matched'
  const [matchingChecks, setMatchingChecks] = useState([
    { label: "Validating material compliance with State PCB & CPCB EPR guidelines", done: false },
    { label: "Calculating route density in local neighborhood cluster", done: false },
    { label: "Checking EV cargo vehicle availability (Zero Emission)", done: false },
    { label: "Auditing recycler daily processing capacity (<5,000 kg)", done: false }
  ]);
  const [selectedRecyclerId, setSelectedRecyclerId] = useState("rcy_ecovidyut");

  const PAN_INDIA_REGIONS = [
    {
      city: "Delhi NCR",
      sectors: [
        "Sector 120, Noida",
        "Sector 62, Noida",
        "Sector 50, Noida",
        "Cyber City, Gurugram",
        "Dwarka, New Delhi",
        "Indirapuram, Ghaziabad",
        "Greater Noida West"
      ]
    },
    {
      city: "Bengaluru (Karnataka)",
      sectors: [
        "Electronic City Phase 1",
        "Indiranagar",
        "Whitefield",
        "Koramangala 4th Block",
        "HSR Layout Sector 2",
        "Hebbal Ring Road"
      ]
    },
    {
      city: "Mumbai MMR & Pune (Maharashtra)",
      sectors: [
        "Bandra West, Mumbai",
        "Andheri East, Mumbai",
        "Powai Lake, Mumbai",
        "Thane West, MMR",
        "Bhosari MIDC, Pune",
        "Kothrud, Pune"
      ]
    },
    {
      city: "Hyderabad (Telangana)",
      sectors: [
        "HITEC City Phase 2",
        "Gachibowli Financial Dist",
        "Jubilee Hills",
        "Madhapur",
        "Cherlapally Hub"
      ]
    },
    {
      city: "Chennai (Tamil Nadu)",
      sectors: [
        "Adyar",
        "OMR IT Corridor",
        "Velachery",
        "T. Nagar",
        "Guindy Industrial Zone"
      ]
    },
    {
      city: "Kolkata (West Bengal)",
      sectors: [
        "Salt Lake Sector V",
        "New Town Action Area 1",
        "Ballygunge",
        "Alipore"
      ]
    },
    {
      city: "Ahmedabad & Surat (Gujarat)",
      sectors: [
        "SG Highway, Ahmedabad",
        "Vatva GIDC, Ahmedabad",
        "Bodakdev, Ahmedabad",
        "Vesu, Surat"
      ]
    }
  ];

  const currentRegionSectors = PAN_INDIA_REGIONS.find((r) => r.city === selectedCity)?.sectors || PAN_INDIA_REGIONS[0].sectors;

  const timeSlots = [
    "Today, 5:30 PM",
    "Tomorrow, 10:00 AM",
    "Tomorrow, 2:30 PM",
    "Tomorrow, 5:00 PM",
    "Day after tomorrow, 11:00 AM"
  ];

  // Calculate estimated credits based on selected categories & weight
  const selectedCatsInfo = WASTE_CATEGORIES.filter((c) => selectedCategories.includes(c.id));
  const avgCreditsPerKg = selectedCatsInfo.length > 0
    ? Math.round(selectedCatsInfo.reduce((acc, c) => acc + c.creditsPerKg, 0) / selectedCatsInfo.length)
    : 12;
  const estimatedCredits = Math.round((Number(weightKg) || 0) * avgCreditsPerKg);
  const estimatedCo2Saved = parseFloat(((Number(weightKg) || 0) * 1.4).toFixed(1));

  // Run matching animation when entering Step 5
  useEffect(() => {
    if (currentStep === 5 && matchingState === "idle") {
      setMatchingState("matching");
      setMatchingChecks([
        { label: "Validating material compliance with State PCB & CPCB EPR guidelines", done: false },
        { label: `Calculating route density in ${selectedSector} cluster`, done: false },
        { label: "Checking EV cargo vehicle availability (Zero Emission)", done: false },
        { label: "Auditing recycler daily processing capacity (<5,000 kg)", done: false }
      ]);

      const t1 = setTimeout(() => {
        setMatchingChecks((prev) => [{ ...prev[0], done: true }, prev[1], prev[2], prev[3]]);
      }, 500);

      const t2 = setTimeout(() => {
        setMatchingChecks((prev) => [prev[0], { ...prev[1], done: true }, prev[2], prev[3]]);
      }, 1000);

      const t3 = setTimeout(() => {
        setMatchingChecks((prev) => [prev[0], prev[1], { ...prev[2], done: true }, prev[3]]);
      }, 1500);

      const t4 = setTimeout(() => {
        setMatchingChecks((prev) => [prev[0], prev[1], prev[2], { ...prev[3], done: true }]);
        setMatchingState("matched");
      }, 2000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [currentStep, matchingState]);

  const handleNext = () => {
    if (currentStep === 4) {
      setMatchingState("idle"); // reset matching animation
      setCurrentStep(5);
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigateTo("dashboard");
    }
  };

  const handleConfirmSchedule = () => {
    const chosenRecycler = RECYCLER_PARTNERS.find((r) => r.id === selectedRecyclerId) || RECYCLER_PARTNERS[0];
    const categoryNames = selectedCatsInfo.map((c) => c.name).join(" + ");

    scheduleNewPickup({
      wasteTypeNames: categoryNames,
      wasteCategories: selectedCategories,
      estimatedWeightKg: weightKg,
      pickupDate: timeSlot,
      pickupAddress: `${address}, ${selectedSector}`,
      recyclerId: chosenRecycler.id,
      recyclerName: chosenRecycler.name
    });
  };

  return (
    <div id="waste-submission-wizard" className="max-w-3xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Wizard Header & Stepper */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={handleBack}
            className="p-1.5 rounded-lg text-[#5C6A64] hover:text-[#1E2522] hover:bg-[#F2F5F3] flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? "Cancel" : "Back"}</span>
          </button>

          <div className="text-right">
            <span className="text-xs font-bold font-mono text-[#083833]">
              Step {currentStep} of 6
            </span>
            <span className="text-xs text-[#5C6A64] block">
              {currentStep === 1 && "Material Selection"}
              {currentStep === 2 && "Estimated Quantity"}
              {currentStep === 3 && "Pickup Location"}
              {currentStep === 4 && "Time Slot"}
              {currentStep === 5 && "Recycler Matching"}
              {currentStep === 6 && "Audit & Confirmation"}
            </span>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <div
              key={st}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                st <= currentStep ? "bg-[#83c5be]" : "bg-[#E2EAE5]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Select Waste Types */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Select Material Stream(s)
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Select one or more segregated streams for collection. Segregated materials receive highest credit multiplier.
            </p>
          </div>

          <WasteTypeSelector
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#083833]" />
              <span className="text-[#5C6A64]">
                Selected Streams: <strong className="text-[#1E2522]">{selectedCatsInfo.map((c) => c.name).join(", ")}</strong>
              </span>
            </div>
            <span className="font-semibold text-[#083833]">
              ~{avgCreditsPerKg} credits / kg rate
            </span>
          </div>
        </div>
      )}

      {/* STEP 2: Quantity & Weight Estimator */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Estimate Total Batch Weight
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Final credits are certified using the collector’s calibrated tare/gross scale at your doorstep.
            </p>
          </div>

          {/* Big Weight Display */}
          <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#D7E3DC] text-center space-y-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold font-mono text-[#083833]">
                {weightKg}
              </span>
              <span className="text-xl font-bold text-[#5C6A64]">kg</span>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <input
                type="range"
                min="2"
                max="100"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#E2EAE5] rounded-lg appearance-none cursor-pointer accent-[#83c5be]"
              />
              <div className="flex justify-between text-[11px] text-[#788880]">
                <span>2 kg (Min threshold)</span>
                <span>50 kg</span>
                <span>100 kg (Bulk)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {[5, 12, 18.5, 30, 60].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setWeightKg(preset)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    weightKg === preset
                      ? "bg-[#83c5be] text-[#062925] font-bold shadow-xs"
                      : "bg-white border border-[#D7E3DC] text-[#1E2522] hover:bg-[#F2F5F3]"
                  }`}
                >
                  {preset} kg
                </button>
              ))}
            </div>
          </div>

          {/* Expected Rewards Projection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#b8f2e6] border border-[#83c5be]/50">
              <span className="text-[11px] text-[#083833] font-bold block uppercase">
                Projected Reward
              </span>
              <span className="text-2xl font-bold font-mono text-[#083833]">
                ~{estimatedCredits}
              </span>
              <span className="text-xs text-[#5C6A64] block mt-0.5">
                Circularity Credits
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA]">
              <span className="text-[11px] text-[#788880] font-semibold block uppercase">
                Carbon Offset
              </span>
              <span className="text-2xl font-bold font-mono text-[#1E2522]">
                ~{estimatedCo2Saved}
              </span>
              <span className="text-xs text-[#5C6A64] block mt-0.5">
                kg CO₂ Avoided
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Location Details (Mock Map) */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Pickup Address & Service Cluster
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Select your city and neighborhood cluster for optimal electric cargo routing across India.
            </p>
          </div>

          {/* City / State Region Selector */}
          <div>
            <label className="text-xs font-semibold text-[#1E2522] block mb-1.5">
              Select City / Metropolitan Region
            </label>
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl">
              {PAN_INDIA_REGIONS.map((reg) => (
                <button
                  key={reg.city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(reg.city);
                    setSelectedSector(reg.sectors[0]);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCity === reg.city
                      ? "bg-[#083833] text-white shadow-xs"
                      : "text-[#5C6A64] hover:text-[#1E2522] hover:bg-white"
                  }`}
                >
                  {reg.city}
                </button>
              ))}
            </div>
          </div>

          {/* Sector Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1E2522]">
                Neighborhood Cluster ({selectedCity})
              </label>
              <span className="text-[10px] text-[#788880]">Active EV Cargo Hubs</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currentRegionSectors.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setSelectedSector(sector)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                    selectedSector === sector
                      ? "border-[#83c5be] bg-[#b8f2e6] text-[#083833] font-bold ring-1 ring-[#83c5be]"
                      : "border-[#E2E8E5] text-[#1E2522] hover:bg-[#FAF9F5]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#083833]" />
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Address details */}
          <div>
            <label className="text-xs font-semibold text-[#1E2522] block mb-1.5">
              Building, Tower & Flat No.
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#D7E3DC] text-xs sm:text-sm text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
              placeholder="e.g. Flat 402, Prateek Laurel, Sector 120"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="text-xs font-semibold text-[#1E2522] block mb-1.5">
              Handover Access Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#D7E3DC] text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
              placeholder="e.g. Elevator access available, gate security informed..."
            />
          </div>
        </div>
      )}

      {/* STEP 4: Time Slot Selection */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Choose Preferred Collection Slot
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Electric vehicles run dedicated sector sweeps to maintain zero dead mileage.
            </p>
          </div>

          <div className="space-y-2.5">
            {timeSlots.map((slot) => (
              <label
                key={slot}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  timeSlot === slot
                    ? "border-[#83c5be] bg-[#b8f2e6]/40 ring-1 ring-[#83c5be]"
                    : "border-[#E2E8E5] hover:border-[#83c5be]/50 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="timeslot"
                    checked={timeSlot === slot}
                    onChange={() => setTimeSlot(slot)}
                    className="accent-[#83c5be] w-4 h-4"
                  />
                  <div>
                    <span className="text-sm font-bold text-[#1E2522] block">{slot}</span>
                    <span className="text-xs text-[#5C6A64]">
                      Standard residential EV batch window
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#083833] bg-[#b8f2e6] border border-[#83c5be]/50 px-2.5 py-1 rounded-md">
                  Guaranteed Slot
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Recycler Matching Screen / Animation */}
      {currentStep === 5 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Recycler Allocation Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Matching your material volume and location with licensed recovery plants.
            </p>
          </div>

          {/* Animated Checklist */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#D7E3DC] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6A64] block">
              Supply-Chain Routing Checklist
            </span>

            {matchingChecks.map((check, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    check.done
                      ? "bg-[#83c5be] text-[#062925]"
                      : "border border-stone-300 text-transparent"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span
                  className={`${
                    check.done ? "text-[#1E2522] font-semibold" : "text-[#788880]"
                  }`}
                >
                  {check.label}
                </span>
              </div>
            ))}
          </div>

          {/* Best Match Reveal */}
          {matchingState === "matched" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#83c5be]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#083833]">
                  Recommended Processing Partner
                </h3>
              </div>

              <div className="space-y-3">
                {RECYCLER_PARTNERS.map((partner) => (
                  <RecyclerCard
                    key={partner.id}
                    recycler={partner}
                    selected={selectedRecyclerId === partner.id}
                    onSelect={() => setSelectedRecyclerId(partner.id)}
                    showAvailableSlots={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 6: Final Review & Confirmation */}
      {currentStep === 6 && (
        <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#1E2522]">
              Review & Schedule Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              Review your pickup specifications before submitting to the SAKSHI logistics ledger.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#D7E3DC] space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-[#EAEFEA]">
              <span className="text-[#788880]">Material Stream</span>
              <span className="font-bold text-[#1E2522] text-right">
                {selectedCatsInfo.map((c) => c.name).join(" + ")}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#EAEFEA]">
              <span className="text-[#788880]">Estimated Net Weight</span>
              <span className="font-bold font-mono text-[#1E2522]">
                {weightKg} kg
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#EAEFEA]">
              <span className="text-[#788880]">Estimated Reward</span>
              <span className="font-bold font-mono text-[#083833]">
                ~{estimatedCredits} Circularity Credits
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#EAEFEA]">
              <span className="text-[#788880]">Pickup Destination</span>
              <span className="font-medium text-[#1E2522] text-right max-w-xs">
                {address}, {selectedSector}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#EAEFEA]">
              <span className="text-[#788880]">Time Slot</span>
              <span className="font-bold text-[#1E2522]">
                {timeSlot}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#788880]">Assigned Recycler</span>
              <span className="font-bold text-[#083833]">
                {RECYCLER_PARTNERS.find((r) => r.id === selectedRecyclerId)?.name}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#b8f2e6] border border-[#83c5be]/50 flex items-center gap-3 text-xs text-[#083833]">
            <Truck className="w-5 h-5 shrink-0" />
            <span>
              Zero-Emission Tata Ace EV will be dispatched upon confirmation. You will receive a unique 4-digit handover OTP.
            </span>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 text-xs font-semibold text-[#5C6A64] hover:text-[#1E2522] rounded-lg transition-colors"
        >
          {currentStep === 1 ? "Dashboard" : "Previous Step"}
        </button>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === 5 && matchingState !== "matched"}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs ${
              currentStep === 5 && matchingState !== "matched"
                ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                : "bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925]"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            id="confirm-schedule-pickup-btn"
            onClick={handleConfirmSchedule}
            className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#D96B27] hover:bg-[#C45E1E] text-white flex items-center gap-2 shadow-xs transition-all"
          >
            <span>Confirm & Dispatch EV Cargo</span>
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
