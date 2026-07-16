import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  displayOrder: 0,
  featured: false,
  published: true,
};

export default function ProjectFormModal({
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
        slug: initialData.slug || "",
        summary: initialData.summary || "",
        description: initialData.description || "",
        githubUrl: initialData.githubUrl || "",
        liveUrl: initialData.liveUrl || "",
        displayOrder: initialData.displayOrder || 0,
        featured: initialData.featured || false,
        published: initialData.published ?? true,
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (name === "title") {

        setForm((prev) => ({
            ...prev,
            title: value,
            slug: value
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, ""),
        }));

        return;

    }

    setForm((prev) => ({
        ...prev,
        [name]:
            type === "checkbox"
                ? checked
                : value,
    }));

};

 const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.title.trim()) {
        return toast.error("Project title is required.");
    }

    if (!form.slug.trim()) {
        return toast.error("Project slug is required.");
    }

    if (!form.summary.trim()) {
        return toast.error("Project summary is required.");
    }

    if (!form.description.trim()) {
        return toast.error("Project description is required.");
    }

    if (
        form.githubUrl &&
        !form.githubUrl.startsWith("https://")
    ) {
        return toast.error(
            "GitHub URL must start with https://"
        );
    }

    if (
        form.liveUrl &&
        !form.liveUrl.startsWith("https://")
    ) {
        return toast.error(
            "Live URL must start with https://"
        );
    }

    onSubmit(form);

};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            {initialData ? "Edit Project" : "Create Project"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>

            <label className="text-slate-300 block mb-2">
              Project Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
              Slug
            </label>

            <input
              name="slug"
              readOnly
              value={form.slug}
              onChange={handleChange}
              required
             
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-300 cursor-not-allowed"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
              Summary
            </label>

            <textarea
              rows={3}
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
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

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-slate-300 block mb-2">
                GitHub URL
              </label>

              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                Live URL
              </label>

              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
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

          <div className="flex gap-10">

            <label className="flex items-center gap-3 text-white">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured

            </label>

            <label className="flex items-center gap-3 text-white">

              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
              />

              Published

            </label>

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
            type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}