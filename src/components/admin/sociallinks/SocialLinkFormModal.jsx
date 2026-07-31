import { useEffect, useState } from "react";

const initialState = {
  platform: "",
  url: "",
  displayOrder: 0,
};

export default function SocialLinkFormModal({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}) {
  const [form, setForm] = useState(initialState);

  // ===============================
  // Load Form Data
  // ===============================

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        platform: initialData.platform || "",
        url: initialData.url || "",
        displayOrder:
          initialData.displayOrder ?? 0,
      });
    } else {
      setForm(initialState);
    }
  }, [initialData, open]);

  if (!open) return null;

  // ===============================
  // Change
  // ===============================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  };

  // ===============================
  // Submit
  // ===============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    onSubmit(form);
  };

  // ===============================
  // Close
  // ===============================

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5">

      <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-start justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5">

          <div className="min-w-0">

            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              {initialData
                ? "Edit Social Link"
                : "Add Social Link"}
            </h2>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Add the platform and its profile URL.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close social link form"
          >
            ×
          </button>

        </div>

        {/* ================= Form ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-4 sm:p-6 md:p-8"
        >

          {/* Platform */}

          <div>

            <label
              htmlFor="social-platform"
              className="mb-2 block text-sm text-slate-300 sm:text-base"
            >
              Platform
            </label>

            <input
              id="social-platform"
              type="text"
              name="platform"
              value={form.platform}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="GitHub"
              disabled={loading}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>

          {/* URL */}

          <div>

            <label
              htmlFor="social-url"
              className="mb-2 block text-sm text-slate-300 sm:text-base"
            >
              URL
            </label>

            <input
              id="social-url"
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              required
              placeholder="https://github.com/username"
              disabled={loading}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              Enter the complete URL beginning with https:// or http://
            </p>

          </div>

          {/* Display Order */}

          <div>

            <label
              htmlFor="social-display-order"
              className="mb-2 block text-sm text-slate-300 sm:text-base"
            >
              Display Order
            </label>

            <input
              id="social-display-order"
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              min="0"
              disabled={loading}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Lower numbers can be displayed first.
            </p>

          </div>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end sm:pt-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="w-full rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update"
                : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
