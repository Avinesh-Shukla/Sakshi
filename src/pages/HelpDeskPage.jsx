import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Plus,
  Send,
  CheckCircle2,
  FileCheck2,
  AlertTriangle
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import Modal from "../components/Modal.jsx";

export default function HelpDeskPage() {
  const { addToast } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketTopic, setTicketTopic] = useState("calibration");
  const [ticketDesc, setTicketDesc] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: "TKT-9921",
      topic: "Tare scale tare calibration check",
      status: "Resolved",
      date: "Aug 29, 2026",
      response: "Field scale re-calibrated by UPPCB authorized inspector. 0.4 kg deviation compensated with +15 credits."
    }
  ]);

  const faqs = [
    {
      q: "How does SAKSHI guarantee accurate doorstep weighing?",
      a: "Every collector carries a UPPCB-certified digital hanging or platform scale. SAKSHI enforces a strict dual-weigh protocol: First, the empty container (tare weight) is recorded, followed by the full container (gross weight). Net weight is calculated in code, verified with geotagged photo proof, and stamped to the ledger."
    },
    {
      q: "What makes the SAKSHI ledger tamper-evident?",
      a: "Each verified pickup generates a cryptographic SHA-256 block hash incorporating the pickup ID, audited net weight, GPS coordinates, timestamp, and recycler digital signature. Changing any detail invalidates subsequent hashes in the chain."
    },
    {
      q: "What should I do if my collection is delayed?",
      a: "Our Tata Ace EV trucks operate in cluster sweeps across Noida sectors. You can track real-time telemetry on the Live Route page or contact the driver directly via the phone icon on your active pickup card."
    },
    {
      q: "How are Circularity Credits redeemed?",
      a: "Credits can be redeemed directly in our Eco-Marketplace for upcycled products, stationery, zero-waste items, and local eco-partner vouchers. There is no expiration on verified credits."
    },
    {
      q: "How can housing societies (RWAs) join SAKSHI?",
      a: "RWAs can register for consolidated cluster collection. Society members aggregate materials in designated basement segregation bays, earning collective credits for community solar or composting amenities."
    }
  ];

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!ticketDesc.trim()) return;

    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      topic: ticketTopic === "calibration" ? "Scale Calibration Dispute" : "Pickup Logistics Query",
      status: "In Review",
      date: "Today",
      response: "Ticket registered with Noida Sector 62 Resolution Desk. Field supervisor assigned."
    };

    setTickets([newTicket, ...tickets]);
    setIsTicketModalOpen(false);
    setTicketDesc("");
    addToast({
      type: "success",
      title: "Support Ticket Registered",
      message: `Ticket ${newTicket.id} created. Supervisor will audit within 4 business hours.`
    });
  };

  return (
    <div id="help-desk-page" className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#083833]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              24/7 Citizen & Recycler Support
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
            Help & Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
            Dedicated assistance for doorstep pickup queries, tare scale calibration audits, credits redemption, and ledger verifications.
          </p>
        </div>

        <button
          onClick={() => setIsTicketModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#083833] hover:bg-[#062925] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Support Ticket</span>
        </button>
      </div>

      {/* Support Hotlines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#D7E3DC] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#788880] block">Toll-Free Helpline</span>
            <span className="text-sm font-bold text-[#1E2522]">1800-266-7257</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#D7E3DC] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/50 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#788880] block">Central Audit Desk</span>
            <span className="text-sm font-bold text-[#1E2522]">support@sakshi-ledger.in</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#D7E3DC] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#788880] block">CPCB & SPCB Cell</span>
            <span className="text-sm font-bold text-[#1E2522]">Pan-India Regional Hubs</span>
          </div>
        </div>
      </div>

      {/* Active Support Tickets */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#1E2522]">
          Your Filed Audit Tickets
        </h3>

        <div className="space-y-3">
          {tickets.map((tkt) => (
            <div
              key={tkt.id}
              className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAEFEA] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#083833]">
                  #{tkt.id} • {tkt.topic}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b8f2e6] text-[#083833] border border-[#83c5be]/40">
                  {tkt.status}
                </span>
              </div>
              <p className="text-[#5C6A64]">{tkt.response}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-5 sm:p-6 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#1E2522] mb-2">
          Frequently Asked Questions
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#E2E8E5] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#1E2522] hover:bg-[#FAF9F5]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#788880] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#788880] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#5C6A64] leading-relaxed border-t border-[#EAEFEA] pt-3 bg-[#FAF9F5]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticket Modal */}
      <Modal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        title="Raise an Audit Dispute / Inquiry"
        subtitle="SAKSHI Quality Assurance Cell • Sector 62 Noida"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleRaiseTicket} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#1E2522] block mb-1">
              Dispute Category
            </label>
            <select
              value={ticketTopic}
              onChange={(e) => setTicketTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#D7E3DC] bg-white text-[#1E2522]"
            >
              <option value="calibration">Tare / Gross Weight Discrepancy</option>
              <option value="logistics">EV Pickup Delay or Reschedule</option>
              <option value="ledger">Ledger Hash Verification Inquiry</option>
              <option value="credits">Circularity Credits Calculation</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#1E2522] block mb-1">
              Pickup Reference ID (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. SK-8492"
              className="w-full p-2.5 rounded-xl border border-[#D7E3DC]"
            />
          </div>

          <div>
            <label className="font-semibold text-[#1E2522] block mb-1">
              Description of Issue
            </label>
            <textarea
              rows={4}
              required
              value={ticketDesc}
              onChange={(e) => setTicketDesc(e.target.value)}
              placeholder="Detail the issue (e.g. scale read 22 kg but receipt recorded 18 kg)..."
              className="w-full p-2.5 rounded-xl border border-[#D7E3DC]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsTicketModalOpen(false)}
              className="px-4 py-2 text-[#5C6A64]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] font-bold rounded-xl transition-colors shadow-xs"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
