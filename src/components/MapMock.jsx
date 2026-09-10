import React, { useState } from "react";
import { Navigation, MapPin, Truck, Compass, Layers, ShieldCheck } from "lucide-react";

export default function MapMock({
  origin = "EcoVidyut Hub, Sector 63, Noida",
  destination = "Flat 402, Prateek Laurel, Sector 120, Noida",
  vehicleNo = "UP-16-EC-4412",
  driverName = "Rajesh Verma",
  etaMinutes = 18,
  progress = 65, // 0 - 100
  onRefresh
}) {
  const [mapType, setMapType] = useState("vector"); // 'vector' | 'satellite'

  return (
    <div
      id="mock-map-container"
      className="relative w-full rounded-2xl overflow-hidden border border-[#D7E3DC] bg-[#E9EFEA] select-none h-80 sm:h-96"
    >
      {/* Map Graphic Canvas (SVG Vector Grid) */}
      <div className={`w-full h-full relative transition-colors duration-500 ${
        mapType === "satellite" ? "bg-[#25362E]" : "bg-[#EDF2EE]"
      }`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Sector Roads / Grid lines */}
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={mapType === "satellite" ? "#31453B" : "#DDE6E0"}
                strokeWidth="1.5"
              />
            </pattern>
            {/* Gradient for Route */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#83c5be" />
              <stop offset="65%" stopColor="#D96B27" />
              <stop offset="100%" stopColor="#83c5be" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Urban Greenbelt & Metro Line features */}
          <path
            d="M 10 180 Q 200 120 400 240 T 800 210"
            fill="none"
            stroke={mapType === "satellite" ? "#1E4032" : "#b8f2e6"}
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.6"
          />
          <text x="320" y="245" fill="#759384" fontSize="11" fontWeight="bold" letterSpacing="1">
            NOIDA SECTOR 62 GREENBELT CORRIDOR
          </text>

          {/* Metro Blue Line Line representation */}
          <path
            d="M -20 80 L 850 320"
            fill="none"
            stroke="#1976D2"
            strokeWidth="2.5"
            strokeDasharray="8,6"
            opacity="0.45"
          />
          <text x="50" y="95" fill="#1976D2" fontSize="9" opacity="0.8">
            DMRC Blue Line (Noida Electronic City to Dwarka)
          </text>

          {/* Secondary Arterial Roads (FNG Expressway, Vikas Marg) */}
          <path d="M 140 -20 L 190 420" stroke={mapType === "satellite" ? "#44594E" : "#CCD8D1"} strokeWidth="10" />
          <text x="200" y="380" fill="#697B72" fontSize="10">Vikas Marg (Sec 63 → Sec 120)</text>

          <path d="M -20 280 L 850 150" stroke={mapType === "satellite" ? "#44594E" : "#CCD8D1"} strokeWidth="12" />
          <text x="450" y="170" fill="#697B72" fontSize="10">FNG Expressway Connector</text>

          {/* The Active Logistics Collection Route Path */}
          <path
            id="activeRoutePath"
            d="M 120 60 C 220 70, 240 180, 360 190 S 520 240, 680 290"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Route Direction Arrows / Pulse */}
          <path
            d="M 120 60 C 220 70, 240 180, 360 190 S 520 240, 680 290"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="6,12"
            strokeDashoffset="18"
            className="animate-pulse"
          />

          {/* ORIGIN (Sector 63 Recycler Hub) */}
          <g transform="translate(120, 60)">
            <circle r="14" fill="#83c5be" opacity="0.3" />
            <circle r="8" fill="#83c5be" />
            <circle r="3" fill="#FFFFFF" />
            <rect x="14" y="-12" width="130" height="24" rx="6" fill="#FFFFFF" stroke="#83c5be" />
            <text x="24" y="4" fill="#083833" fontSize="10" fontWeight="bold">
              Hub (Sector 63)
            </text>
          </g>

          {/* CURRENT VEHICLE POSITION (Along the curve, ~65% progress) */}
          <g transform="translate(420, 210)">
            <circle r="20" fill="#D96B27" opacity="0.2" className="animate-ping" />
            <circle r="12" fill="#D96B27" />
            <circle r="6" fill="#FFFFFF" />
            <rect x="-65" y="-38" width="130" height="26" rx="6" fill="#1E2522" />
            <text x="0" y="-22" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              {vehicleNo} (En Route)
            </text>
          </g>

          {/* DESTINATION (Sector 120 Prateek Laurel) */}
          <g transform="translate(680, 290)">
            <circle r="18" fill="#D96B27" opacity="0.2" />
            <circle r="10" fill="#83c5be" />
            <circle r="4" fill="#FFFFFF" />
            <rect x="-140" y="8" width="150" height="26" rx="6" fill="#FFFFFF" stroke="#D7E3DC" />
            <text x="-65" y="24" fill="#1E2522" fontSize="10" fontWeight="bold" textAnchor="middle">
              Your Gate (Sector 120)
            </text>
          </g>
        </svg>

        {/* Real-time Status Overlay Badge (Top Left) */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs rounded-xl border border-[#D7E3DC] p-3 shadow-md max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D96B27] animate-pulse" />
            <span className="text-xs font-bold text-[#1E2522] uppercase tracking-wider">
              Live Fleet Telemetry
            </span>
            <span className="text-[10px] bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/40 px-1.5 py-0.5 rounded font-bold">
              Zero Emission EV
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#083833]">{etaMinutes} mins</span>
            <span className="text-xs text-[#5C6A64]">ETA (3.4 km away)</span>
          </div>
          <p className="text-xs text-[#5C6A64] mt-1 truncate">
            Driver: <span className="font-semibold text-[#1E2522]">{driverName}</span> • {vehicleNo}
          </p>
        </div>

        {/* Controls Overlay (Top Right) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setMapType(mapType === "vector" ? "satellite" : "vector")}
            className="p-2 bg-white rounded-lg border border-[#D7E3DC] shadow-xs text-[#1E2522] hover:bg-[#b8f2e6]/20 text-xs flex items-center gap-1.5 font-medium transition-colors"
            title="Toggle Map Style"
          >
            <Layers className="w-4 h-4 text-[#083833]" />
            <span className="hidden sm:inline">{mapType === "vector" ? "Satellite" : "Clean Grid"}</span>
          </button>
        </div>

        {/* Bottom Banner with Route Checkpoints */}
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-xs rounded-xl border border-[#D7E3DC] px-4 py-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#083833] shrink-0" />
            <span className="text-xs text-[#5C6A64] truncate">
              Route: <span className="text-[#1E2522] font-medium">Sector 63 Hub → Mamura Chowk → Sector 120</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#083833]">
            <ShieldCheck className="w-4 h-4" />
            <span>Tamper-Safe Route</span>
          </div>
        </div>
      </div>
    </div>
  );
}
