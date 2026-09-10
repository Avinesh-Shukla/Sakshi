import React from "react";
import { Check, Clock, Truck, ShieldCheck, Camera } from "lucide-react";

export default function PickupTimeline({ steps, currentStatus }) {
  const defaultSteps = steps || [
    { label: "Request Placed", time: "2:15 PM", completed: true },
    { label: "Recycler Assigned", time: "2:18 PM", completed: true },
    { label: "Vehicle En Route", time: "5:12 PM", completed: false },
    { label: "Weight & Proof Capture", time: "Pending", completed: false },
    { label: "Ledger Stamped & Credited", time: "Pending", completed: false }
  ];

  const icons = [Clock, ShieldCheck, Truck, Camera, Check];

  return (
    <div id="pickup-timeline" className="relative py-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
        {/* Horizontal connector line on desktop */}
        <div className="hidden sm:block absolute top-4.5 left-6 right-6 h-0.5 bg-[#b8f2e6] -z-0" />

        {defaultSteps.map((step, idx) => {
          const isCompleted = step.completed;
          const isCurrent = !isCompleted && (idx === 0 || defaultSteps[idx - 1]?.completed);
          const StepIcon = icons[idx] || Check;

          return (
            <div
              key={idx}
              className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 relative z-10 w-full sm:w-auto"
            >
              {/* Icon Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all ${
                  isCompleted
                    ? "bg-[#83c5be] text-[#062925] font-bold shadow-xs"
                    : isCurrent
                    ? "bg-[#FDF1E8] text-[#D96B27] border-2 border-[#D96B27] animate-pulse"
                    : "bg-white text-stone-400 border border-[#D7E3DC]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : <StepIcon className="w-4 h-4" />}
              </div>

              {/* Text info */}
              <div className="text-left sm:text-center">
                <p
                  className={`text-xs font-semibold ${
                    isCompleted
                      ? "text-[#083833] font-bold"
                      : isCurrent
                      ? "text-[#D96B27]"
                      : "text-[#5C6A64]"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-[#788880] mt-0.5">
                  {step.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
