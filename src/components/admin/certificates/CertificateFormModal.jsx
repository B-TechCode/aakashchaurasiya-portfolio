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
        displayOrder: initialData.displayOrder ?? 0,
      });
    } else {
      setForm(initialState);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
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
      issuer: form.issuer.trim(),
      credentialUrl: form.credentialUrl.trim(),
      imageUrl: form.imageUrl.trim(),
    };

    onSubmit(payload);
  };

  const handleCancel = () => {
    if (loading) return;

    setForm(initialState);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5">

      <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5">

          <h2 className="min-w-0 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {initialData
              ? "Edit Certificate"
              : "Add Certificate"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close certificate form"
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

            {/* Certificate Title */}

            <div>

              <label
                htmlFor="certificate-title"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Certificate Title
              </label>

              <input
                id="certificate-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="AWS Certified Cloud Practitioner"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

            </div>

            {/* Issuer */}

            <div>

              <label
                htmlFor="certificate-issuer"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Issuer
              </label>

              <input
                id="certificate-issuer"
                type="text"
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                required
                placeholder="Amazon Web Services"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

            </div>

            {/* Issued Date */}

            <div>

              <label
                htmlFor="certificate-issued-date"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Issued Date
              </label>

              <input
                id="certificate-issued-date"
                type="date"
                name="issuedDate"
                value={form.issuedDate}
                onChange={handleChange}
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-cyan-500"
              />

            </div>

            {/* Credential URL */}

            <div>

              <label
                htmlFor="certificate-credential-url"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Credential URL
              </label>

              <input
                id="certificate-credential-url"
                type="url"
                name="credentialUrl"
                value={form.credentialUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

              <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                Add the public verification or credential link for this certificate.
              </p>

            </div>

            {/* Certificate Image URL */}

            <div>

              <label
                htmlFor="certificate-image-url"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Certificate Image URL
              </label>

              <input
                id="certificate-image-url"
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />

              <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                Add the hosted image URL for the certificate.
              </p>

            </div>

            {/* Image Preview */}

            {form.imageUrl && (
              <div>

                <p className="mb-2 text-sm text-slate-300 sm:text-base">
                  Image Preview
                </p>

                <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">

                  <img
                    src={form.imageUrl}
                    alt="Certificate preview"
                    className="max-h-64 w-full object-contain"
                  />

                </div>

              </div>
            )}

            {/* Display Order */}

            <div>

              <label
                htmlFor="certificate-display-order"
                className="mb-2 block text-sm text-slate-300 sm:text-base"
              >
                Display Order
              </label>

              <input
                id="certificate-display-order"
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-cyan-500"
              />

            </div>

          </div>

          {/* ================= Actions ================= */}

          <div className="sticky bottom-0 border-t border-slate-700 bg-slate-900 px-4 py-4 sm:px-6 md:px-8">

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={handleCancel}
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
                  ? "Update Certificate"
                  : "Save Certificate"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
