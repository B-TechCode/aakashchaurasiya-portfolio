import axiosInstance from "./axios";

// ==========================
// Experience CRUD
// ==========================

export const getAllExperiences = () => {
  return axiosInstance.get("/admin/experience");
};

export const getExperience = (id) => {
  return axiosInstance.get(`/admin/experience/${id}`);
};

export const createExperience = (data) => {
  return axiosInstance.post("/admin/experience", data);
};

export const updateExperience = (id, data) => {
  return axiosInstance.put(`/admin/experience/${id}`, data);
};

export const deleteExperience = (id) => {
  return axiosInstance.delete(`/admin/experience/${id}`);
};


// ==========================
// Public Experience
// ==========================

export const getPublicExperiences = () => {
  return axiosInstance.get("/public/experience");
};


// ==========================
// Public Certificates
// ==========================

export const getPublicCertificates = () => {
  return axiosInstance.get("/public/certificates");
};