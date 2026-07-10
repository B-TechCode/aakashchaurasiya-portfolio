import { useEffect, useState } from "react";

const initialState = {
  title: "",
  issuer: "",
  issuedDate: "",
  credentialUrl: "",
  imageUrl: "",
  displayOrder: 0,
};

export default function CertificateFormModal({
  open,
  initialData,
  loading,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        issuer: initialData.issuer || "",
        issuedDate: initialData.issuedDate || "",
        credentialUrl: initialData.credentialUrl || "",
        imageUrl: initialData.imageUrl || "",
        displayOrder: initialData.displayOrder || 0,
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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
            {initialData ? "Edit Certificate" : "Add Certificate"}
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
              Certificate Title
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
              Issuer
            </label>

            <input
              name="issuer"
              value={form.issuer}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
              Issued Date
            </label>

            <input
              type="date"
              name="issuedDate"
              value={form.issuedDate}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
              Credential URL
            </label>

            <input
              name="credentialUrl"
              value={form.credentialUrl}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="text-slate-300 block mb-2">
              Certificate Image URL
            </label>

            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

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

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 px-6 py-3 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg text-white font-semibold"
            >
              {loading ? "Saving..." : "Save Certificate"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}