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

  // ===============================
  // Load SEO Settings
  // ===============================

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    try {
      setLoading(true);

      const response = await getSeoSettings();

      setSeo(response.data.data);
    } catch (error) {
      console.error("Failed to load SEO settings:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load SEO settings."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Save SEO Settings
  // ===============================

  const handleSave = async (form) => {
    const siteTitle = form.siteTitle.trim();
    const metaDescription = form.metaDescription.trim();
    const keywords = form.keywords.trim();

    if (!siteTitle) {
      return toast.error("Site title is required.");
    }

    if (!metaDescription) {
      return toast.error("Meta description is required.");
    }

    if (!keywords) {
      return toast.error("Keywords are required.");
    }

    const payload = {
      ...form,
      siteTitle,
      metaDescription,
      keywords,
      ogTitle: form.ogTitle.trim(),
      ogDescription: form.ogDescription.trim(),
      ogImageUrl: form.ogImageUrl.trim(),
    };

    try {
      setSaving(true);

      await updateSeoSettings(payload);

      setSeo(payload);

      toast.success(
        "SEO settings updated successfully."
      );
    } catch (error) {
      console.error("Failed to update SEO settings:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update SEO settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <AdminLayout>
        <div className="w-full min-w-0">

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8">

            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Loading SEO Settings...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>

          </div>

        </div>
      </AdminLayout>
    );
  }

  // ===============================
  // Page
  // ===============================

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-5xl">

        {/* ================= Header ================= */}

        <div className="mb-6 sm:mb-8">

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            SEO Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Configure search engine and social sharing information.
          </p>

        </div>

        {/* ================= Form ================= */}

        <SeoForm
          initialData={seo}
          loading={saving}
          onSubmit={handleSave}
        />

      </div>
    </AdminLayout>
  );
}
