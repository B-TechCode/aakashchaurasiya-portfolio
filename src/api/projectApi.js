import axiosInstance from "./axios";

// ===============================
// Project CRUD
// ===============================

export const getAllProjects = () => {
  return axiosInstance.get("/admin/projects");
};

export const getProject = (id) => {
  return axiosInstance.get(`/admin/projects/${id}`);
};

export const createProject = (data) => {
  return axiosInstance.post("/admin/projects", data);
};

export const updateProject = (id, data) => {
  return axiosInstance.put(`/admin/projects/${id}`, data);
};

export const deleteProject = (id) => {
  return axiosInstance.delete(`/admin/projects/${id}`);
};

// ===============================
// Project Images
// ===============================

export const uploadProjectImage = (projectId, image, meta) => {
  const formData = new FormData();

  formData.append("image", image);

  formData.append(
    "meta",
    new Blob([JSON.stringify(meta)], {
      type: "application/json",
    })
  );

  return axiosInstance.post(
    `/admin/projects/${projectId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};


// ===============================
// Public Projects
// ===============================

export const getPublicProjects = () => {
  return axiosInstance.get("/public/projects");
};