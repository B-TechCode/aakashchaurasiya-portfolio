import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteAnalyticsModal({
  open,
  loading,
  event,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, loading, onClose]);

  if (!open || !event) return null;

  const formattedDate = event.createdAt
    ? new Date(event.createdAt).toLocaleString()
    : "-";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">

      <div className="max-h-[calc(100dvh-24px)] w-full min-w-0 max-w-md overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6 md:p-8">

        {/* Warning Icon */}

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <FaExclamationTriangle size={20} />
        </div>

        {/* Heading */}

        <h2 className="break-words text-xl font-bold text-white sm:text-2xl">
          Delete Analytics Event
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Are you sure you want to permanently delete this analytics event?
        </p>

        {/* Event Information */}

        <div className="mt-5 min-w-0 space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4">

          {/* Event Type */}

          <div className="min-w-0">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Event Type
            </p>

            <p className="mt-1 break-words font-semibold text-white">
              {event.eventType || "-"}
            </p>

          </div>

          {/* Entity */}

          <div className="min-w-0">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Entity
            </p>

            <p className="mt-1 break-words text-white">
              {event.entityType || "-"}
            </p>

          </div>

          {/* Date */}

          <div className="min-w-0">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Date
            </p>

            <p className="mt-1 break-words text-sm text-white sm:text-base">
              {formattedDate}
            </p>

          </div>

        </div>

        <p className="mt-5 text-sm leading-6 text-red-400">
          This action cannot be undone.
        </p>

        {/* Buttons */}

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
              : "Delete Event"}
          </button>

        </div>

      </div>

    </div>
  );
}
