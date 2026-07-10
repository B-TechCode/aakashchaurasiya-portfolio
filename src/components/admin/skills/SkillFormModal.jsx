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
  }, [initialData]);

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
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            {initialData ? "Edit Skill" : "Create Skill"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block text-slate-300 mb-2">
              Skill Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <label className="block text-slate-300 mb-2">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="block text-slate-300 mb-2">
                Icon Name
              </label>

              <input
                name="iconName"
                value={form.iconName}
                onChange={handleChange}
                placeholder="FaJava"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Proficiency ({form.proficiency}%)
            </label>

            <input
              type="range"
              min="0"
              max="100"
              name="proficiency"
              value={form.proficiency}
              onChange={handleChange}
              className="w-full"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <label className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />

            Published

          </label>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-slate-700 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              {loading ? "Saving..." : "Save Skill"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}