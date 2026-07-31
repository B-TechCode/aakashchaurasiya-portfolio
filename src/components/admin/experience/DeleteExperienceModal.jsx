export default function DeleteExperienceModal({
  open,
  loading,
  experienceTitle,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6 md:p-8">

        {/* Title */}

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Delete Experience
        </h2>

        {/* Message */}

        <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
          Are you sure you want to delete
        </p>

        <p className="mt-2 break-words font-semibold text-red-400">
          {experienceTitle}
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          This action cannot be undone.
        </p>

        {/* Actions */}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}