import React, { useState } from "react";
import Modal from "./Modal.jsx";
import { Camera, Scale, MapPin, Clock, Upload, Check, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function ProofSubmissionModal({ isOpen, onClose }) {
  const { activePickup, submitProofForPickup } = useApp();

  const [grossWeight, setGrossWeight] = useState(28.7);
  const [tareWeight, setTareWeight] = useState(4.2);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"
  );
  const [contaminationGrade, setContaminationGrade] = useState("A"); // A (<1%), B (1-3%), C (>3%)
  const [supervisorNotes, setSupervisorNotes] = useState(
    "Corrugated cardboard dry, bundled flat. PET bottles clean and crushed."
  );

  const netWeight = Math.max(0.1, parseFloat(((Number(grossWeight) || 0) - (Number(tareWeight) || 0)).toFixed(2)));

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProofForPickup({
      grossWeightKg: grossWeight,
      tareWeightKg: tareWeight,
      netWeightKg: netWeight,
      photoUrl,
      notes: supervisorNotes,
      contaminationGrade
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Calibrated Weight & Proof Capture"
      subtitle={`Collection #${activePickup?.id || "SK-8492"} • Sector 120 Noida Gate`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Scale Reading Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC]">
          <div>
            <label className="text-[10px] uppercase font-bold text-[#788880] block mb-1">
              Gross Scale (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={grossWeight}
              onChange={(e) => setGrossWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-white border border-[#D7E3DC] rounded-lg font-mono font-bold text-sm text-[#1E2522]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#788880] block mb-1">
              Tare Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={tareWeight}
              onChange={(e) => setTareWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-white border border-[#D7E3DC] rounded-lg font-mono font-bold text-sm text-[#5C6A64]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#083833] block mb-1">
              Audited Net (kg)
            </label>
            <div className="w-full p-2 bg-[#b8f2e6] border border-[#83c5be] rounded-lg font-mono font-bold text-sm text-[#083833]">
              {netWeight} kg
            </div>
          </div>
        </div>

        {/* Physical Photo Proof Preview */}
        <div>
          <label className="text-xs font-semibold text-[#1E2522] block mb-1.5 flex items-center justify-between">
            <span>Doorstep Material Scale Photo</span>
            <span className="text-[11px] text-[#083833] font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Geotagged Exif Verified
            </span>
          </label>

          <div className="relative h-44 w-full rounded-xl overflow-hidden border border-[#D7E3DC] bg-[#EAEFEA]">
            <img
              src={photoUrl}
              alt="Material collection proof"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white p-2 rounded-lg text-[10px] font-mono flex items-center justify-between">
              <span>GPS: 28.5921° N, 77.3820° E</span>
              <span>Today • {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Quality & Contamination Grade */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-[#1E2522] block mb-1">
              Contamination Grade
            </label>
            <select
              value={contaminationGrade}
              onChange={(e) => setContaminationGrade(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522]"
            >
              <option value="A">Grade A: Clean dry (&lt; 1% impurities)</option>
              <option value="B">Grade B: Moderate sorting (1-3% impurities)</option>
              <option value="C">Grade C: Heavy sorting required</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#1E2522] block mb-1">
              Calibration Certificate
            </label>
            <div className="p-2.5 bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl text-xs font-mono text-[#5C6A64]">
              UPPCB-CAL-2026-881
            </div>
          </div>
        </div>

        {/* Supervisor Observations */}
        <div>
          <label className="text-xs font-semibold text-[#1E2522] block mb-1">
            Auditor Notes
          </label>
          <input
            type="text"
            value={supervisorNotes}
            onChange={(e) => setSupervisorNotes(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[#D7E3DC] text-xs text-[#1E2522]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-[#EAEFEA] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5C6A64] hover:text-[#1E2522]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Record Physical Proof</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
