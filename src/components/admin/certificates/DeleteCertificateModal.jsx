export default function DeleteCertificateModal({
  open,
  loading,
  certificateTitle,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Delete Certificate
        </h2>

        <p className="text-slate-400">
          Are you sure you want to delete
        </p>

        <p className="text-red-400 font-semibold mt-2 break-words">
          {certificateTitle}
        </p>

        <p className="text-slate-500 mt-4 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-slate-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}