import React, { useState } from "react";
import {
  ShoppingBag,
  Coins,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import MarketplaceCard from "../components/MarketplaceCard.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";

export default function MarketplacePage() {
  const { user, marketplaceItems, redeemMarketplaceItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemToRedeem, setSelectedItemToRedeem] = useState(null);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "stationery", label: "Recycled Stationery" },
    { id: "home", label: "Home & Kitchen" },
    { id: "kits", label: "Zero-Waste Kits" },
    { id: "vouchers", label: "Vouchers & Experiences" }
  ];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleConfirmRedeem = () => {
    if (!selectedItemToRedeem) return;
    redeemMarketplaceItem(selectedItemToRedeem);
    setSelectedItemToRedeem(null);
  };

  return (
    <div id="marketplace-page" className="max-w-5xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Header & Balance Pill */}
      <div className="bg-white rounded-2xl border border-[#D7E3DC] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#083833]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#083833]">
              Circular Rewards Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2522] mt-1">
            Eco-Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
            Exchange your verified Circularity Credits for upcycled home products, seed paper notebooks, and zero-waste essentials.
          </p>
        </div>

        {/* Live Balance Card */}
        <div className="bg-[#FAF9F5] border border-[#D7E3DC] rounded-xl p-4 sm:text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-[#788880] block">
            Available Balance
          </span>
          <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
            <Coins className="w-5 h-5 text-[#083833]" />
            <span className="text-2xl font-mono font-extrabold text-[#083833]">
              {user.credits?.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-[#5C6A64]">Credits</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === c.id
                  ? "bg-[#83c5be] text-[#062925] shadow-xs font-bold"
                  : "bg-white border border-[#D7E3DC] text-[#5C6A64] hover:text-[#1E2522]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#788880] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search eco rewards..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#D7E3DC] rounded-xl text-xs text-[#1E2522] focus:outline-none focus:ring-2 focus:ring-[#83c5be]"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <MarketplaceCard
            key={item.id}
            item={item}
            userCredits={user.credits}
            onRedeem={setSelectedItemToRedeem}
          />
        ))}
      </div>

      {/* Redemption Confirmation Dialog */}
      {selectedItemToRedeem && (
        <ConfirmationDialog
          isOpen={true}
          onClose={() => setSelectedItemToRedeem(null)}
          onConfirm={handleConfirmRedeem}
          title="Confirm Reward Redemption"
          message={`Are you sure you want to redeem "${selectedItemToRedeem.title}" for ${selectedItemToRedeem.costCredits} Circularity Credits? This will be delivered to your registered address (${user?.city || "Pan-India"}).`}
          confirmText={`Redeem for ${selectedItemToRedeem.costCredits} Credits`}
          cancelText="Cancel"
          danger={false}
        />
      )}
    </div>
  );
}
