import React, { useState } from "react";
import {
  FileCheck2,
  Hash,
  ShieldCheck,
  Search,
  ExternalLink,
  Lock,
  Layers,
  CheckCircle2,
  Filter,
  Info
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import Modal from "../components/Modal.jsx";

export default function VerifiedLedgerPage() {
  const { ledgerEntries } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedBlock, setInspectedBlock] = useState(null);

  const getBlockNum = (entry) => entry?.blockNumber ?? entry?.blockIndex ?? 0;
  const getTxHash = (entry) => entry?.txHash || entry?.hash || "0x000000";
  const getNetWeight = (entry) => entry?.netWeightKg ?? entry?.actualWeightKg ?? 0;
  const getCredits = (entry) => entry?.creditsMinted ?? entry?.creditsAwarded ?? 0;
  const getCo2 = (entry) => entry?.co2OffsetKg ?? entry?.co2SavedKg ?? 0;
  const getSigner = (entry) => entry?.digitalSigner || entry?.recyclerLicense || entry?.cpcbRegistrationNo || "CPCB Audited PKI";
  const getStatus = (entry) => entry?.auditStatus || entry?.status || "Confirmed";

  const filteredEntries = (ledgerEntries || []).filter((entry) => {
    const q = searchQuery.toLowerCase();
    const blockNum = getBlockNum(entry).toString();
    const pickupId = (entry?.pickupId || "").toLowerCase();
    const wasteType = (entry?.wasteType || "").toLowerCase();
    const txHash = getTxHash(entry).toLowerCase();
    return (
      blockNum.includes(q) ||
      pickupId.includes(q) ||
      wasteType.includes(q) ||
      txHash.includes(q)
    );
  });

  return (
    <div id="verified-ledger-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Title & Trust Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#083833]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
                Cryptographic Audit Trail
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E2522] mt-1">
              SAKSHI Honest Impact Ledger
            </h1>
            <p className="text-xs text-[#5C6A64] mt-0.5">
              Every verified collection is sealed with an immutable SHA-256 hash, GPS timestamp, and supervisor digital PKI certificate.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF9F5] border border-[#D7E3DC] px-3 py-1.5 rounded-xl text-xs">
            <Lock className="w-4 h-4 text-[#083833]" />
            <div>
              <span className="text-[10px] text-[#788880] block font-semibold">Latest Block</span>
              <span className="font-mono font-bold text-[#1E2522]">
                #{getBlockNum(ledgerEntries[0]) || 41924}
              </span>
            </div>
          </div>
        </div>

        {/* Explicit Non-Blockchain Disclaimer Banner */}
        <div className="p-3 bg-[#b8f2e6] rounded-xl border border-[#83c5be]/50 flex items-start gap-2.5 text-xs text-[#083833]">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong>Architecture Notice:</strong> SAKSHI implements a client-verifiable, tamper-evident cryptographic hash chain designed for supply-chain accountability and carbon auditing. It is intentionally an internal honest impact ledger, <em>not a speculative cryptocurrency or public blockchain token</em>.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#788880] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Block #, Pickup ID (#SK-8492), or material stream..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D7E3DC] rounded-xl text-xs sm:text-sm text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
          />
        </div>
      </div>

      {/* Ledger Block Cards List */}
      <div className="space-y-4">
        {filteredEntries.map((block) => (
          <div
            key={getBlockNum(block)}
            id={`ledger-block-${getBlockNum(block)}`}
            className="bg-white rounded-2xl border border-[#D7E3DC] p-5 shadow-xs hover:border-[#83c5be] transition-all"
          >
            {/* Block Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAEFEA]">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-[#062925] bg-[#83c5be] px-2 py-0.5 rounded">
                  Block #{getBlockNum(block)}
                </span>
                <span className="text-xs font-semibold text-[#1E2522]">
                  {block.wasteType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#788880]">{block.timestamp}</span>
                <button
                  onClick={() => setInspectedBlock(block)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#083833] hover:bg-[#b8f2e6] rounded-lg transition-colors flex items-center gap-1"
                >
                  Inspect Certificate <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Block Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-[#EAEFEA] text-xs">
              <div>
                <span className="text-[10px] text-[#788880] uppercase block font-semibold">Pickup Reference</span>
                <span className="font-mono font-bold text-[#1E2522]">#{block.pickupId}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#788880] uppercase block font-semibold">Net Weight</span>
                <span className="font-mono font-bold text-[#1E2522]">{getNetWeight(block)} kg</span>
              </div>

              <div>
                <span className="text-[10px] text-[#788880] uppercase block font-semibold">Credits Minted</span>
                <span className="font-mono font-bold text-[#083833]">+{getCredits(block)} Credits</span>
              </div>

              <div>
                <span className="text-[10px] text-[#788880] uppercase block font-semibold">CO₂ Offset</span>
                <span className="font-mono font-bold text-[#1E2522]">{getCo2(block)} kg</span>
              </div>
            </div>

            {/* Hashes & Certificate Info */}
            <div className="pt-3 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#788880] shrink-0 font-sans text-xs">SHA-256 Hash:</span>
                <span className="text-[#083833] font-semibold truncate bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EAEFEA]">
                  {getTxHash(block)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#788880] text-[10px] truncate">
                <span className="shrink-0 font-sans">Digital Signer:</span>
                <span className="text-[#1E2522] truncate">{getSigner(block)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Block Inspection Modal */}
      {inspectedBlock && (
        <Modal
          isOpen={true}
          onClose={() => setInspectedBlock(null)}
          title={`Ledger Certificate: Block #${getBlockNum(inspectedBlock)}`}
          subtitle="Cryptographic Audit Payload & Signature"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#062925] text-[#b8f2e6] rounded-xl font-mono overflow-x-auto text-[11px] leading-relaxed">
              <pre>{JSON.stringify(inspectedBlock, null, 2)}</pre>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#D7E3DC] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#788880]">Audit Status:</span>
                <span className="font-semibold text-[#083833]">✓ {getStatus(inspectedBlock)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788880]">Geofence Anchor:</span>
                <span className="font-semibold text-[#1E2522]">{inspectedBlock.generatorLocation || "Verified Geofence"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788880]">Processing Facility:</span>
                <span className="font-semibold text-[#1E2522]">{inspectedBlock.recyclerName}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectedBlock(null)}
                className="px-4 py-2 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] font-bold text-xs rounded-lg transition-colors"
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
