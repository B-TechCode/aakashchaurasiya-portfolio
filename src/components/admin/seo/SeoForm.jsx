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

  useEffect(() => {

    if (initialData) {

      setForm({
        siteTitle: initialData.siteTitle || "",
        metaDescription: initialData.metaDescription || "",
        keywords: initialData.keywords || "",
        ogTitle: initialData.ogTitle || "",
        ogDescription: initialData.ogDescription || "",
        ogImageUrl: initialData.ogImageUrl || "",
      });

    }

  }, [initialData]);

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-2xl border border-slate-700 p-10"
    >

      <div className="space-y-6">

        <div>

          <label className="block text-slate-300 mb-2">
            Site Title
          </label>

          <input
            value={form.siteTitle}
            onChange={(e) =>
              setForm({
                ...form,
                siteTitle: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            Meta Description
          </label>

          <textarea
            rows={4}
            value={form.metaDescription}
            onChange={(e) =>
              setForm({
                ...form,
                metaDescription: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            Keywords
          </label>

          <textarea
            rows={3}
            value={form.keywords}
            onChange={(e) =>
              setForm({
                ...form,
                keywords: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            OG Title
          </label>

          <input
            value={form.ogTitle}
            onChange={(e) =>
              setForm({
                ...form,
                ogTitle: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            OG Description
          </label>

          <textarea
            rows={4}
            value={form.ogDescription}
            onChange={(e) =>
              setForm({
                ...form,
                ogDescription: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            OG Image URL
          </label>

          <input
            value={form.ogImageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                ogImageUrl: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

        </div>

      </div>

      <div className="flex justify-end mt-8">

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 px-8 py-3 rounded-lg text-white font-semibold"
        >
          {loading ? "Saving..." : "Save SEO Settings"}
        </button>

      </div>

    </form>

  );

}