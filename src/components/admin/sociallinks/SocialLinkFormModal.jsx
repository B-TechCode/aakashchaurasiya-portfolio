import { useEffect, useState } from "react";

export default function SocialLinkFormModal({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}) {

  const [form, setForm] = useState({
    platform: "",
    url: "",
    displayOrder: 0,
  });

  useEffect(() => {

    if (initialData) {

      setForm({
        platform: initialData.platform,
        url: initialData.url,
        displayOrder: initialData.displayOrder,
      });

    } else {

      setForm({
        platform: "",
        url: "",
        displayOrder: 0,
      });

    }

  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">

            {initialData
              ? "Edit Social Link"
              : "Add Social Link"}

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
          className="space-y-5"
        >

          <div>

            <label className="block text-slate-300 mb-2">
              Platform
            </label>

            <input
              type="text"
              value={form.platform}
              onChange={(e) =>
                setForm({
                  ...form,
                  platform: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              URL
            </label>

            <input
              type="text"
              value={form.url}
              onChange={(e) =>
                setForm({
                  ...form,
                  url: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Display Order
            </label>

            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  displayOrder: Number(e.target.value),
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
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