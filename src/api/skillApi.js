import axiosInstance from "./axios";

// ===============================
// Skill CRUD
// ===============================

export const getAllSkills = () => {
  return axiosInstance.get("/admin/skills");
};

export const getSkill = (id) => {
  return axiosInstance.get(`/admin/skills/${id}`);
};

export const createSkill = (data) => {
  return axiosInstance.post("/admin/skills", data);
};

export const updateSkill = (id, data) => {
  return axiosInstance.put(`/admin/skills/${id}`, data);
};

export const deleteSkill = (id) => {
  return axiosInstance.delete(`/admin/skills/${id}`);
};


// ===============================
// Public Skills
// ===============================

export const getPublicSkills = () => {
  return axiosInstance.get("/public/skills");
};