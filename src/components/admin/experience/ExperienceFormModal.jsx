import { useEffect, useState } from "react";

const initialState = {
  title: "",
  organization: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  displayOrder: 0,
};

export default function ExperienceFormModal({
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
        organization: initialData.organization || "",
        location: initialData.location || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        currentlyWorking:
          initialData.currentlyWorking || false,
        description: initialData.description || "",
        displayOrder:
          initialData.displayOrder ?? 0,
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

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">

            {initialData
              ? "Edit Experience"
              : "Create Experience"}

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
              Position
            </label>

            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <label className="block text-slate-300 mb-2">
                Organization
              </label>

              <input
                name="organization"
                required
                value={form.organization}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="block text-slate-300 mb-2">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <label className="block text-slate-300 mb-2">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="block text-slate-300 mb-2">
                End Date
              </label>

              <input
                type="date"
                disabled={form.currentlyWorking}
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>

          <label className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              name="currentlyWorking"
              checked={form.currentlyWorking}
              onChange={handleChange}
            />

            Currently Working Here

          </label>

          <div>

            <label className="block text-slate-300 mb-2">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
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

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-slate-700 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              {loading
                ? "Saving..."
                : "Save Experience"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

