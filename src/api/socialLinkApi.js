import axiosInstance from "./axios";

// ==============================
// GET ALL
// ==============================

export const getAllSocialLinks = () => {
  return axiosInstance.get("/admin/social-links");
};

// ==============================
// GET BY ID
// ==============================

export const getSocialLink = (id) => {
  return axiosInstance.get(`/admin/social-links/${id}`);
};

// ==============================
// CREATE
// ==============================

export const createSocialLink = (data) => {
  return axiosInstance.post("/admin/social-links", data);
};

// ==============================
// UPDATE
// ==============================

export const updateSocialLink = (id, data) => {
  return axiosInstance.put(`/admin/social-links/${id}`, data);
};

// ==============================
// DELETE
// ==============================

export const deleteSocialLink = (id) => {
  return axiosInstance.delete(`/admin/social-links/${id}`);
};