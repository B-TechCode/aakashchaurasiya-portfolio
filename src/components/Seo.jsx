import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { fetchPublicSeo } from "../services/seoService";

export default function Seo() {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    try {
      const data = await fetchPublicSeo();
      setSeo(data);
    } catch (error) {
      console.error("Failed to load SEO settings", error);
    }
  };

  if (!seo) {
    return null;
  }

  const siteUrl = window.location.origin;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seo.siteTitle,
    url: siteUrl,
    image: seo.ogImageUrl,
    description: seo.metaDescription,
  };

  return (
    <Helmet>

      {/* ========================= */}
      {/* Basic SEO */}
      {/* ========================= */}

      <title>{seo.siteTitle}</title>

      <meta
        name="description"
        content={seo.metaDescription}
      />

      <meta
        name="keywords"
        content={seo.keywords}
      />

      <meta
        name="author"
        content={seo.siteTitle}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta
        name="theme-color"
        content="#0f172a"
      />

      {/* ========================= */}
      {/* Canonical */}
      {/* ========================= */}

      <link
        rel="canonical"
        href={siteUrl}
      />

      {/* ========================= */}
      {/* Favicon */}
      {/* ========================= */}

      <link
        rel="icon"
        href="/favicon.ico"
      />

      {/* ========================= */}
      {/* Open Graph */}
      {/* ========================= */}

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:url"
        content={siteUrl}
      />

      <meta
        property="og:site_name"
        content={seo.siteTitle}
      />

      <meta
        property="og:title"
        content={seo.ogTitle}
      />

      <meta
        property="og:description"
        content={seo.ogDescription}
      />

      <meta
        property="og:image"
        content={seo.ogImageUrl}
      />

      {/* ========================= */}
      {/* Twitter */}
      {/* ========================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seo.ogTitle}
      />

      <meta
        name="twitter:description"
        content={seo.ogDescription}
      />

      <meta
        name="twitter:image"
        content={seo.ogImageUrl}
      />

      {/* ========================= */}
      {/* Structured Data */}
      {/* ========================= */}

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

    </Helmet>
  );
}