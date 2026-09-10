import React from "react";
import { WASTE_CATEGORIES } from "../data/mockData.js";
import { FileText, Boxes, Cpu, Wrench, Leaf, Wine, Check } from "lucide-react";

export function WasteTypeSelector({
  selectedCategories = [],
  onChange,
  multiSelect = true
}) {
  const iconMap = {
    FileText,
    Boxes,
    Cpu,
    Wrench,
    Leaf,
    Wine
  };

  const handleToggle = (categoryId) => {
    if (multiSelect) {
      if (selectedCategories.includes(categoryId)) {
        if (selectedCategories.length > 1) {
          onChange(selectedCategories.filter((id) => id !== categoryId));
        }
      } else {
        onChange([...selectedCategories, categoryId]);
      }
    } else {
      onChange([categoryId]);
    }
  };

  return (
    <div id="waste-type-selector" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {WASTE_CATEGORIES.map((cat) => {
        const isSelected = selectedCategories.includes(cat.id);
        const Icon = iconMap[cat.icon] || Boxes;

        return (
          <button
            key={cat.id}
            type="button"
            id={`waste-cat-${cat.id}`}
            onClick={() => handleToggle(cat.id)}
            className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
              isSelected
                ? "bg-[#b8f2e6]/25 border-[#83c5be] ring-1 ring-[#83c5be] shadow-xs"
                : "bg-white border-[#E2E8E5] hover:border-[#83c5be]"
            }`}
          >
            {/* Selection Checkmark */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#83c5be] text-[#062925] font-bold flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cat.bgColor, color: cat.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E2522]">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-[#5C6A64]">
                    {cat.hindiName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed mb-3">
                {cat.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#EAEFEA] flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#093a34] bg-[#b8f2e6] border border-[#83c5be]/50 px-2 py-0.5 rounded">
                +{cat.creditsPerKg} credits/kg
              </span>
              <span className="text-[#6D7D76]">
                ~{cat.co2PerKg} kg CO₂ saved
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function RecyclerCard({
  recycler,
  selected = false,
  onSelect,
  showAvailableSlots = true
}) {
  return (
    <div
      id={`recycler-card-${recycler.id}`}
      onClick={onSelect}
      className={`bg-white rounded-xl border p-4 sm:p-5 transition-all cursor-pointer relative ${
        selected
          ? "border-[#83c5be] ring-2 ring-[#83c5be] bg-[#b8f2e6]/20"
          : "border-[#E2E8E5] hover:border-[#83c5be]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-[#1E2522]">
              {recycler.name}
            </h4>
            {recycler.badge && (
              <span className="text-[10px] bg-[#b8f2e6] text-[#093a34] border border-[#83c5be] px-2 py-0.5 rounded-full font-medium">
                {recycler.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#5C6A64] mt-0.5">
            {recycler.address} • <span className="font-medium text-[#1E2522]">{recycler.distanceKm} km away</span>
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#093a34] bg-[#b8f2e6] border border-[#83c5be]/40 px-2 py-0.5 rounded">
            ★ {recycler.rating}
          </span>
          <p className="text-[10px] text-[#788880] mt-0.5">
            {recycler.reviewsCount} audits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2.5 my-2 border-y border-[#EAEFEA] text-xs">
        <div>
          <span className="text-[10px] text-[#788880] uppercase block">Govt License</span>
          <span className="font-semibold text-[#1E2522]">{recycler.verifiedGovtLicense}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#788880] uppercase block">Fleet Vehicle</span>
          <span className="font-semibold text-[#093a34]">{recycler.pickupVehicle}</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#788880] uppercase block">Verification Speed</span>
          <span className="font-medium text-[#1E2522]">{recycler.averageVerificationSpeed}</span>
        </div>
      </div>

      {showAvailableSlots && recycler.availableSlots && (
        <div className="mt-3">
          <span className="text-[11px] text-[#5C6A64] font-medium block mb-1.5">
            Earliest Collection Slots:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {recycler.availableSlots.map((slot, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#FAF9F5] border border-[#D7E3DC] text-[#1E2522] px-2.5 py-1 rounded-md"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
