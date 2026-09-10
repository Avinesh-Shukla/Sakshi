import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isInfo = toast.type === "info";

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto bg-white rounded-xl border border-[#83c5be]/40 shadow-lg p-4 flex items-start gap-3 transition-all transform duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#83c5be]" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-[#D96B27]" />}
              {isInfo && <Info className="w-5 h-5 text-[#83c5be]" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1E2522]">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-[#5C6A64] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-[#5C6A64] hover:text-[#1E2522] rounded-md hover:bg-[#F2F5F3] transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export { ToastContainer };
