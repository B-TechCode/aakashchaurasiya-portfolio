import { FaTrashAlt } from "react-icons/fa";

export default function DeleteResumeModal({
  open,
  loading,
  resumeName,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6 md:p-8">

        {/* ================= Icon ================= */}

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
          <FaTrashAlt size={20} />
        </div>

        {/* ================= Title ================= */}

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Delete Resume
        </h2>

        {/* ================= Message ================= */}

        <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
          Are you sure you want to delete this resume?
        </p>

        {resumeName && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">

            <p className="break-all text-sm font-semibold text-red-400">
              {resumeName}
            </p>

          </div>
        )}

        <p className="mt-4 text-sm leading-6 text-slate-500">
          This action cannot be undone.
        </p>

        {/* ================= Actions ================= */}

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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <FaTrashAlt />

            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}
