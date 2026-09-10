import React from "react";
import Modal from "./Modal.jsx";
import { AlertTriangle } from "lucide-react";

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" title={title}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FDF1E8] text-[#D96B27] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-sm text-[#5C6A64] leading-relaxed pt-1">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEFEA]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#5C6A64] hover:text-[#1E2522] rounded-lg hover:bg-[#F2F5F3] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors shadow-xs ${
              isDestructive
                ? "bg-red-700 hover:bg-red-800 text-white"
                : "bg-[#83c5be] hover:bg-[#6eb1a9] text-[#062925] font-bold"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-dashed border-[#83c5be]/50 p-8 sm:p-12 text-center flex flex-col items-center justify-center ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-[#b8f2e6] text-[#083833] flex items-center justify-center mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-base font-bold text-[#1E2522] mb-1">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-[#5C6A64] max-w-sm mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-bold text-[#062925] bg-[#83c5be] hover:bg-[#6eb1a9] rounded-lg transition-colors shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function SkeletonLoader({ type = "card", count = 1 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#E2E8E5] p-5 animate-pulse space-y-3"
          >
            <div className="h-3 w-24 bg-[#EAEFEA] rounded" />
            <div className="h-7 w-32 bg-[#EAEFEA] rounded" />
            <div className="h-2.5 w-40 bg-[#EAEFEA] rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {items.map((i) => (
        <div key={i} className="h-16 bg-white border border-[#E2E8E5] rounded-xl p-4" />
      ))}
    </div>
  );
}

export default ConfirmationDialog;
