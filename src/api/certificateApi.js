import axiosInstance from "./axios";

// ==========================
// Certificate CRUD
// ==========================

export const getAllCertificates = () => {
  return axiosInstance.get("/admin/certificates");
};

export const getCertificate = (id) => {
  return axiosInstance.get(`/admin/certificates/${id}`);
};

export const createCertificate = (data) => {
  return axiosInstance.post("/admin/certificates", data);
};

export const updateCertificate = (id, data) => {
  return axiosInstance.put(`/admin/certificates/${id}`, data);
};

export const deleteCertificate = (id) => {
  return axiosInstance.delete(`/admin/certificates/${id}`);
};



// ==========================
// Public Certificates
// ==========================

export const getPublicCertificates = () => {
  return axiosInstance.get("/public/certificates");
};