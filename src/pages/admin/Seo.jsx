import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import SeoForm from "../../components/admin/seo/SeoForm";
import {
  getSeoSettings,
  updateSeoSettings,
} from "../../api/seoApi";

export default function Seo() {

  const [seo, setSeo] = useState(null);

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

 const handleSave = async (form) => {

  if (!form.siteTitle.trim()) {
    return toast.error("Site title is required.");
  }

  if (!form.metaDescription.trim()) {
    return toast.error("Meta description is required.");
  }

  if (!form.keywords.trim()) {
    return toast.error("Keywords are required.");
  }

  try {

    setSaving(true);

    await updateSeoSettings(form);

    setSeo(form);

    toast.success(
      "SEO settings updated successfully."
    );

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update SEO settings."
    );

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

        <SeoForm
            initialData={seo}
            loading={saving}
            onSubmit={handleSave}
        />

    </div>

</AdminLayout>

  );

}