import React from "react";
import * as LucideIcons from "lucide-react";

export default function MetricCard({
  id,
  title,
  value,
  unit = "",
  changeText,
  changePositive = true,
  iconName = "Activity",
  subtitle,
  accent = "green", // 'green' | 'orange' | 'neutral'
  className = ""
}) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Activity;

  const accentStyles = {
    green: {
      border: "border-[#83c5be]/40 hover:border-[#83c5be]",
      iconBg: "bg-[#b8f2e6]",
      iconColor: "text-[#0b3b36]",
      valueColor: "text-[#0b3b36]"
    },
    orange: {
      border: "border-[#F5D8C4]",
      iconBg: "bg-[#FDF1E8]",
      iconColor: "text-[#D96B27]",
      valueColor: "text-[#D96B27]"
    },
    neutral: {
      border: "border-[#E2E8E5]",
      iconBg: "bg-[#F0F3F1]",
      iconColor: "text-[#3D4D46]",
      valueColor: "text-[#1E2522]"
    }
  };

  const style = accentStyles[accent] || accentStyles.neutral;

  return (
    <div
      id={id || `metric-card-${title?.toLowerCase().replace(/\s+/g, "-")}`}
      className={`bg-white rounded-xl border ${style.border} p-5 shadow-xs transition-all hover:border-[#B8CEC2] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-medium text-[#5C6A64] tracking-wide uppercase">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-lg ${style.iconBg} ${style.iconColor} flex items-center justify-center shrink-0`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E2522]">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-[#5C6A64]">
            {unit}
          </span>
        )}
      </div>

      {(changeText || subtitle) && (
        <div className="flex items-center gap-1.5 text-xs">
          {changeText && (
            <span
              className={`font-medium ${
                changePositive ? "text-[#083833] font-bold" : "text-stone-500"
              }`}
            >
              {changeText}
            </span>
          )}
          {subtitle && (
            <span className="text-[#6D7D76]">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
