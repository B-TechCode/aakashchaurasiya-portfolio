import axiosInstance from "./axios";

// ===============================
// Service CRUD
// ===============================

export const getAllServices = () => {
  return axiosInstance.get("/admin/services");
};

export const getService = (id) => {
  return axiosInstance.get(`/admin/services/${id}`);
};

export const createService = (data) => {
  return axiosInstance.post("/admin/services", data);
};

export const updateService = (id, data) => {
  return axiosInstance.put(`/admin/services/${id}`, data);
};

export const deleteService = (id) => {
  return axiosInstance.delete(`/admin/services/${id}`);
};

// ===============================
// Public Services
// ===============================

export const getPublicServices = () => {
  return axiosInstance.get("/public/services");
};