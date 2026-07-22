export default function DeleteMessageModal({
  open,
  loading,
  message,
  onClose,
  onConfirm,
}) {
  if (!open || !message) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          Delete Message
        </h2>

        <p className="text-slate-400">
          Are you sure you want to permanently delete this contact message?
        </p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mt-5">

          <p className="text-white font-semibold">
            {message.name}
          </p>

          <p className="text-slate-400 text-sm break-all mt-1">
            {message.email}
          </p>

        </div>

        <p className="text-red-400 text-sm mt-5">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}