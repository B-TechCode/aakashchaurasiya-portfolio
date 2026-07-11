import axiosInstance from "./axios";

// ==============================
// GET SEO SETTINGS
// ==============================

export const getSeoSettings = () => {
  return axiosInstance.get("/admin/seo");
};

// ==============================
// UPDATE SEO SETTINGS
// ==============================

export const updateSeoSettings = (data) => {
  return axiosInstance.put("/admin/seo", data);
};