import { useEffect, useState } from "react";

const initialState = {
  name: "",
  category: "",
  proficiency: 80,
  iconName: "",
  displayOrder: 0,
  published: true,
};

export default function SkillFormModal({
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
        name: initialData.name || "",
        category: initialData.category || "",
        proficiency: initialData.proficiency ?? 80,
        iconName: initialData.iconName || "",
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

    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5">
      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="min-w-0 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {initialData ? "Edit Skill" : "Create Skill"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close skill form"
          >
            ✕
          </button>
        </div>

        {/* ================= Form ================= */}

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(100dvh-110px)] overflow-y-auto"
        >
          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-8">

            {/* Skill Name */}

            <div>
              <label
                htmlFor="skill-name"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Skill Name
              </label>

              <input
                id="skill-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Example: Spring Boot"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Category + Icon */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="min-w-0">
                <label
                  htmlFor="skill-category"
                  className="mb-2 block text-sm text-slate-300 sm:text-base"
                >
                  Category
                </label>

                <input
                  id="skill-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Example: Backend"
                  className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="skill-icon"
                  className="mb-2 block text-sm text-slate-300 sm:text-base"
                >
                  Icon Name
                </label>

                <input
                  id="skill-icon"
                  name="iconName"
                  value={form.iconName}
                  onChange={handleChange}
                  placeholder="FaJava"
                  className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Proficiency */}

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label
                  htmlFor="skill-proficiency"
                  className="text-sm text-slate-300 sm:text-base"
                >
                  Proficiency
                </label>

                <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
                  {form.proficiency}%
                </span>
              </div>

              <input
                id="skill-proficiency"
                type="range"
                min="0"
                max="100"
                name="proficiency"
                value={form.proficiency}
                onChange={handleChange}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Display Order */}

            <div>
              <label
                htmlFor="skill-order"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Display Order
              </label>

              <input
                id="skill-order"
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
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

                <p className="mt-1 text-xs text-slate-400">
                  Show this skill on your public portfolio.
                </p>
              </div>
            </label>
          </div>

          {/* ================= Footer ================= */}

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
                className="w-full rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading
                  ? "Saving..."
                  : initialData
                  ? "Update Skill"
                  : "Save Skill"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
