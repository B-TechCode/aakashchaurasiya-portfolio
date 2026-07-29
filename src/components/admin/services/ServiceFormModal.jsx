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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            {initialData ? "Edit Service" : "Create Service"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-2xl text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close service form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-slate-300">
              Service Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={120}
              placeholder="Backend Development"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              maxLength={1000}
              rows={5}
              placeholder="Describe the service..."
              className="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="mb-2 block text-slate-300">
              Icon Name
            </label>

            <input
              type="text"
              name="iconName"
              value={form.iconName}
              onChange={handleChange}
              maxLength={120}
              placeholder="FiServer"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
            />

            <p className="mt-2 text-sm text-slate-500">
              Example: FiLayout, FiServer, FiMonitor, FiDatabase
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-slate-300">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              maxLength={500}
              placeholder="Java, Spring Boot, REST APIs"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
            />

            <p className="mt-2 text-sm text-slate-500">
              Separate multiple technologies with commas.
            </p>
          </div>

          {/* Display Order */}
          <div>
            <label className="mb-2 block text-slate-300">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Published */}
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="h-4 w-4"
            />

            Published
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Service"
                : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}