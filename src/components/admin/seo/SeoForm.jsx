import { useEffect, useState } from "react";

const initialState = {
  siteTitle: "",
  metaDescription: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
};

export default function SeoForm({
  initialData,
  loading,
  onSubmit,
}) {
  const [form, setForm] = useState(initialState);

  // ===============================
  // Load Initial Data
  // ===============================

  useEffect(() => {
    if (initialData) {
      setForm({
        siteTitle: initialData.siteTitle || "",
        metaDescription:
          initialData.metaDescription || "",
        keywords: initialData.keywords || "",
        ogTitle: initialData.ogTitle || "",
        ogDescription:
          initialData.ogDescription || "",
        ogImageUrl: initialData.ogImageUrl || "",
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

  // ===============================
  // Change
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-0 rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6 md:p-8 lg:p-10"
    >

      <div className="space-y-6">

        {/* =========================
            Basic SEO
        ========================= */}

        <div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Basic SEO
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Configure the information search engines use to understand your portfolio.
          </p>

        </div>

        {/* Site Title */}

        <div>

          <label
            htmlFor="seo-site-title"
            className="mb-2 block text-sm text-slate-300 sm:text-base"
          >
            Site Title
          </label>

          <input
            id="seo-site-title"
            type="text"
            name="siteTitle"
            value={form.siteTitle}
            onChange={handleChange}
            required
            maxLength={120}
            placeholder="Aakash Chaurasiya | Portfolio"
            disabled={loading}
            className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

        </div>

        {/* Meta Description */}

        <div>

          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

            <label
              htmlFor="seo-meta-description"
              className="text-sm text-slate-300 sm:text-base"
            >
              Meta Description
            </label>

            <span className="text-xs text-slate-500">
              {form.metaDescription.length} characters
            </span>

          </div>

          <textarea
            id="seo-meta-description"
            name="metaDescription"
            rows={4}
            value={form.metaDescription}
            onChange={handleChange}
            required
            maxLength={500}
            placeholder="Describe your portfolio for search engines..."
            disabled={loading}
            className="w-full min-w-0 resize-y rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

        </div>

        {/* Keywords */}

        <div>

          <label
            htmlFor="seo-keywords"
            className="mb-2 block text-sm text-slate-300 sm:text-base"
          >
            Keywords
          </label>

          <textarea
            id="seo-keywords"
            name="keywords"
            rows={3}
            value={form.keywords}
            onChange={handleChange}
            required
            placeholder="Java, Spring Boot, React, Full Stack Developer"
            disabled={loading}
            className="w-full min-w-0 resize-y rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
            Separate multiple keywords with commas.
          </p>

        </div>

        {/* =========================
            Social Sharing
        ========================= */}

        <div className="border-t border-slate-700 pt-6">

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Social Sharing
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Configure Open Graph information used when your portfolio is shared on supported platforms.
          </p>

        </div>

        {/* OG Title */}

        <div>

          <label
            htmlFor="seo-og-title"
            className="mb-2 block text-sm text-slate-300 sm:text-base"
          >
            OG Title
          </label>

          <input
            id="seo-og-title"
            type="text"
            name="ogTitle"
            value={form.ogTitle}
            onChange={handleChange}
            maxLength={120}
            placeholder="Aakash Chaurasiya | Portfolio"
            disabled={loading}
            className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

        </div>

        {/* OG Description */}

        <div>

          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

            <label
              htmlFor="seo-og-description"
              className="text-sm text-slate-300 sm:text-base"
            >
              OG Description
            </label>

            <span className="text-xs text-slate-500">
              {form.ogDescription.length} characters
            </span>

          </div>

          <textarea
            id="seo-og-description"
            name="ogDescription"
            rows={4}
            value={form.ogDescription}
            onChange={handleChange}
            maxLength={500}
            placeholder="Description shown when your portfolio is shared..."
            disabled={loading}
            className="w-full min-w-0 resize-y rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

        </div>

        {/* OG Image URL */}

        <div>

          <label
            htmlFor="seo-og-image"
            className="mb-2 block text-sm text-slate-300 sm:text-base"
          >
            OG Image URL
          </label>

          <input
            id="seo-og-image"
            type="url"
            name="ogImageUrl"
            value={form.ogImageUrl}
            onChange={handleChange}
            placeholder="https://example.com/portfolio-preview.jpg"
            disabled={loading}
            className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
            Use a complete public image URL beginning with https:// or http://
          </p>

        </div>

      </div>

      {/* ===============================
          Save
      =============================== */}

      <div className="mt-8 border-t border-slate-700 pt-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto sm:px-8"
          >
            {loading
              ? "Saving..."
              : "Save SEO Settings"}
          </button>

        </div>

      </div>

    </form>
  );
}
