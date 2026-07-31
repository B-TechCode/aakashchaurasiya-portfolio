import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteMessageModal({
  open,
  loading,
  message,
  onClose,
  onConfirm,
}) {
  // ===============================
  // Escape Key
  // ===============================

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, loading, onClose]);

  if (!open || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">

      <div className="max-h-[calc(100dvh-24px)] w-full min-w-0 max-w-md overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6 md:p-8">

        {/* ===============================
            Icon
        =============================== */}

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <FaExclamationTriangle size={20} />
        </div>

        {/* ===============================
            Heading
        =============================== */}

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Delete Message
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Are you sure you want to permanently delete this contact message?
        </p>

        {/* ===============================
            Message Information
        =============================== */}

        <div className="mt-5 min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-4">

          <p className="break-words font-semibold text-white">
            {message.name}
          </p>

          <p className="mt-1 break-all text-sm text-slate-400">
            {message.email}
          </p>

        </div>

        <p className="mt-5 text-sm leading-6 text-red-400">
          This action cannot be undone.
        </p>

        {/* ===============================
            Actions
        =============================== */}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading
              ? "Deleting..."
              : "Delete Message"}
          </button>

        </div>

      </div>

    </div>
  );
}
