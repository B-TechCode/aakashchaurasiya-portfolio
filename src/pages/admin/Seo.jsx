import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getSeoSettings,
  updateSeoSettings,
} from "../../api/seoApi";

export default function Seo() {

  const [seo, setSeo] = useState({
    siteTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {

    try {

      const response = await getSeoSettings();

      setSeo(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateSeoSettings(seo);

      alert("SEO settings updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to update SEO settings.");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-white text-xl">
          Loading SEO Settings...
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            SEO Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Configure search engine and social sharing information.
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10">

          <div className="space-y-6">

            <div>

              <label className="text-slate-300 block mb-2">
                Site Title
              </label>

              <input
                value={seo.siteTitle || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    siteTitle:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                Meta Description
              </label>

              <textarea
                rows="4"
                value={seo.metaDescription || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    metaDescription:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                Keywords
              </label>

              <textarea
                rows="3"
                value={seo.keywords || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    keywords:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                OG Title
              </label>

              <input
                value={seo.ogTitle || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    ogTitle:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                OG Description
              </label>

              <textarea
                rows="4"
                value={seo.ogDescription || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    ogDescription:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

            <div>

              <label className="text-slate-300 block mb-2">
                OG Image URL
              </label>

              <input
                value={seo.ogImageUrl || ""}
                onChange={(e)=>
                  setSeo({
                    ...seo,
                    ogImageUrl:e.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>

          <div className="flex justify-end mt-8">

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 px-8 py-3 rounded-lg text-white font-semibold"
            >
              {saving ? "Saving..." : "Save SEO Settings"}
            </button>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}