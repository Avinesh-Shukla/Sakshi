import React from "react";
import { Sparkles, ShoppingBag, Check, ArrowRight } from "lucide-react";

export default function MarketplaceCard({ item, userCredits, onRedeem }) {
  const canAfford = userCredits >= item.costCredits;
  const creditsNeeded = item.costCredits - userCredits;

  return (
    <div
      id={`marketplace-item-${item.id}`}
      className="bg-white rounded-2xl border border-[#D7E3DC] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#83c5be] transition-all group"
    >
      <div>
        {/* Product Image */}
        <div className="relative h-44 w-full bg-[#EAEFEA] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-[#b8f2e6]/95 backdrop-blur-xs text-[#083833] px-2.5 py-0.5 rounded-full border border-[#83c5be]/50">
            {item.inStock ? (item.stockLocation || "Pan-India Delivery") : "Out of Stock"}
          </span>
        </div>

        {/* Details */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#788880]">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-[#083833] font-mono font-bold text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{item.costCredits} Credits</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[#1E2522] line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          disabled={!canAfford || !item.inStock}
          onClick={() => onRedeem(item)}
          className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            canAfford && item.inStock
              ? "bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] shadow-xs"
              : "bg-[#FAF9F5] border border-[#E2E8E5] text-[#788880] cursor-not-allowed"
          }`}
        >
          {canAfford ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Redeem with Credits</span>
            </>
          ) : (
            <span>Need {creditsNeeded} more credits</span>
          )}
        </button>
      </div>
    </div>
  );
}
