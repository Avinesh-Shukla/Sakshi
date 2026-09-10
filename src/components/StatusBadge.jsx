import React from "react";

export default function StatusBadge({ status, size = "md", customLabel }) {
  const configs = {
    assigned: {
      label: "Assigned to Recycler",
      bg: "bg-[#b8f2e6]",
      text: "text-[#0b3b36]",
      border: "border-[#83c5be]",
      dot: "bg-[#83c5be]"
    },
    in_transit: {
      label: "Vehicle In Transit",
      bg: "bg-[#FDF1E8]",
      text: "text-[#D96B27]",
      border: "border-[#F8D2B9]",
      dot: "bg-[#D96B27] animate-pulse"
    },
    arrived: {
      label: "Collector Arrived",
      bg: "bg-[#b8f2e6]/70",
      text: "text-[#0b3b36]",
      border: "border-[#83c5be]",
      dot: "bg-[#83c5be]"
    },
    proof_submitted: {
      label: "Proof Captured (Pending Audit)",
      bg: "bg-[#FDF6E3]",
      text: "text-[#B58900]",
      border: "border-[#EEDFA6]",
      dot: "bg-[#B58900]"
    },
    verified: {
      label: "Verified & Ledger Stamped",
      bg: "bg-[#b8f2e6]",
      text: "text-[#0b3b36]",
      border: "border-[#83c5be]",
      dot: "bg-[#83c5be]"
    },
    pending_acceptance: {
      label: "Pending Recycler Acceptance",
      bg: "bg-[#FAF1E6]",
      text: "text-[#C46A25]",
      border: "border-[#F2D7BF]",
      dot: "bg-[#C46A25]"
    },
    open: {
      label: "In Progress",
      bg: "bg-[#FDF1E8]",
      text: "text-[#D96B27]",
      border: "border-[#F8D2B9]",
      dot: "bg-[#D96B27]"
    },
    resolved: {
      label: "Resolved",
      bg: "bg-[#b8f2e6]",
      text: "text-[#0b3b36]",
      border: "border-[#83c5be]",
      dot: "bg-[#83c5be]"
    },
    closed: {
      label: "Closed",
      bg: "bg-stone-100",
      text: "text-stone-600",
      border: "border-stone-200",
      dot: "bg-stone-400"
    }
  };

  const config = configs[status] || {
    label: status,
    bg: "bg-stone-100",
    text: "text-stone-700",
    border: "border-stone-200",
    dot: "bg-stone-400"
  };

  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs" 
    : "px-2.5 py-1 text-xs font-medium";

  return (
    <span
      id={`status-badge-${status}`}
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} whitespace-nowrap tracking-wide`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {customLabel || config.label}
    </span>
  );
}
