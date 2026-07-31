import { useEffect } from "react";

export default function ViewMessageModal({
  open,
  message,
  onClose,
}) {
  // ===============================
  // Escape Key
  // ===============================

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
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
  }, [open, onClose]);

  if (!open || !message) return null;

  const receivedAt = message.createdAt
    ? new Date(message.createdAt).toLocaleString()
    : "-";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">

      <div className="flex max-h-[calc(100dvh-24px)] w-full min-w-0 max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:max-h-[90vh]">

        {/* ===============================
            Header
        =============================== */}

        <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5 md:px-8">

          <h2 className="min-w-0 break-words text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Contact Message
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close message"
          >
            ×
          </button>

        </div>

        {/* ===============================
            Scrollable Content
        =============================== */}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 md:px-8">

          {/* Name */}

          <div className="mb-5">

            <label className="mb-2 block text-sm text-slate-400">
              Name
            </label>

            <div className="min-w-0 break-words rounded-lg border border-slate-700 bg-slate-800 p-3 text-white">
              {message.name || "-"}
            </div>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <div className="min-w-0 break-all rounded-lg border border-slate-700 bg-slate-800 p-3 text-white">
              {message.email || "-"}
            </div>

          </div>

          {/* Status + Received */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Status
              </label>

              <div className="flex min-h-[50px] items-center rounded-lg border border-slate-700 bg-slate-800 p-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    message.status === "NEW"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {message.status}
                </span>

              </div>

            </div>

            {/* Received */}

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Received
              </label>

              <div className="min-h-[50px] break-words rounded-lg border border-slate-700 bg-slate-800 p-3 text-sm text-white sm:text-base">
                {receivedAt}
              </div>

            </div>

          </div>

          {/* Message */}

          <div className="mt-5">

            <label className="mb-2 block text-sm text-slate-400">
              Message
            </label>

            <div className="min-h-[160px] min-w-0 whitespace-pre-wrap break-words rounded-lg border border-slate-700 bg-slate-800 p-4 text-sm leading-7 text-white sm:min-h-[180px] sm:text-base">
              {message.message || "No message content."}
            </div>

          </div>

        </div>

        {/* ===============================
            Footer
        =============================== */}

        <div className="flex flex-shrink-0 border-t border-slate-700 p-4 sm:justify-end sm:px-6 md:px-8">

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-8"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
