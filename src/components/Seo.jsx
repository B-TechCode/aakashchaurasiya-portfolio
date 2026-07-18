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

  return (
    <Helmet>

      {/* Title */}

      <title>{seo.siteTitle}</title>

      {/* Basic SEO */}

      <meta
        name="description"
        content={seo.metaDescription}
      />

      <meta
        name="keywords"
        content={seo.keywords}
      />

      {/* Open Graph */}

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

      <meta
        property="og:type"
        content="website"
      />

      {/* Twitter */}

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

    </Helmet>
  );
}