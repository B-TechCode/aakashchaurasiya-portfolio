export default function DeleteAnalyticsModal({
  open,
  loading,
  event,
  onClose,
  onConfirm,
}) {
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          Delete Analytics Event
        </h2>

        <p className="text-slate-400">
          Are you sure you want to permanently delete this analytics event?
        </p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mt-6 space-y-2">

          <div>

            <p className="text-slate-400 text-sm">
              Event Type
            </p>

            <p className="text-white font-semibold">
              {event.eventType}
            </p>

          </div>

          <div>

            <p className="text-slate-400 text-sm">
              Entity
            </p>

            <p className="text-white">
              {event.entityType || "-"}
            </p>

          </div>

          <div>

            <p className="text-slate-400 text-sm">
              Date
            </p>

            <p className="text-white">
              {new Date(event.createdAt).toLocaleString()}
            </p>

          </div>

        </div>

        <p className="text-red-400 text-sm mt-5">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

