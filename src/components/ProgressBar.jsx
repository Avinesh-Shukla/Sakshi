import React from "react";

export function ProgressBar({
  value = 0,
  max = 100,
  height = "h-2",
  color = "bg-[#83c5be]",
  bgColor = "bg-[#b8f2e6]/50",
  showLabel = false,
  labelPrefix = ""
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-[#5C6A64] mb-1.5 font-medium">
          <span>{labelPrefix}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${bgColor} rounded-full overflow-hidden ${height}`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 7,
  color = "#83c5be",
  trackColor = "#b8f2e6",
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
        {children || (
          <span className="text-xs font-semibold text-[#1E2522]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
