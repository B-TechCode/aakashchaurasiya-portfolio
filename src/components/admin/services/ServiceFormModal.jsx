import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  iconName: "",
  tags: "",
  displayOrder: 0,
  published: true,
};

export default function ServiceFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        iconName: initialData.iconName || "",
        tags: initialData.tags || "",
        displayOrder: initialData.displayOrder ?? 0,
        published: initialData.published ?? true,
      });
    } else {
      setForm(initialState);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      iconName: form.iconName.trim(),
      tags: form.tags.trim(),
    };

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5">

      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="min-w-0 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {initialData ? "Edit Service" : "Create Service"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close service form"
          >
            ×
          </button>
        </div>

        {/* ================= Form ================= */}

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(100dvh-110px)] overflow-y-auto"
        >

          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-8">

            {/* Title */}

            <div>
              <label
                htmlFor="service-title"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Service Title
              </label>

              <input
                id="service-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={120}
                placeholder="Backend Development"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Description */}

            <div>
              <label
                htmlFor="service-description"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Description
              </label>

              <textarea
                id="service-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                maxLength={1000}
                rows={5}
                placeholder="Describe the service..."
                className="w-full min-w-0 resize-y rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-slate-500">
                  {form.description.length}/1000
                </span>
              </div>
            </div>

            {/* Icon */}

            <div>
              <label
                htmlFor="service-icon"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Icon Name
              </label>

              <input
                id="service-icon"
                type="text"
                name="iconName"
                value={form.iconName}
                onChange={handleChange}
                maxLength={120}
                placeholder="FiServer"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

              <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                Example: FiLayout, FiServer, FiMonitor, FiDatabase
              </p>
            </div>

            {/* Tags */}

            <div>
              <label
                htmlFor="service-tags"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Tags
              </label>

              <input
                id="service-tags"
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                maxLength={500}
                placeholder="Java, Spring Boot, REST APIs"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                Separate multiple technologies with commas.
              </p>
            </div>

            {/* Display Order */}

            <div>
              <label
                htmlFor="service-display-order"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Display Order
              </label>

              <input
                id="service-display-order"
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* Published */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="h-4 w-4 shrink-0 accent-cyan-500"
              />

              <div className="min-w-0">
                <p className="font-medium">
                  Published
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Show this service on your public portfolio.
                </p>
              </div>
            </label>

          </div>

          {/* ================= Actions ================= */}

          <div className="sticky bottom-0 border-t border-slate-700 bg-slate-900 px-4 py-4 sm:px-6 md:px-8">

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-full rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading
                  ? "Saving..."
                  : initialData
                  ? "Update Service"
                  : "Save Service"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
