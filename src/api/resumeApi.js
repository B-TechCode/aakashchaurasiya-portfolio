import axiosInstance from "./axios";

// ==============================
// Get all resumes
// ==============================

export const getAllResumes = () => {
  return axiosInstance.get("/admin/resumes");
};

// ==============================
// Upload Resume PDF
// ==============================

export const uploadResume = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return axiosInstance.post(
    "/admin/resumes/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ==============================
// Delete Resume
// ==============================

export const deleteResume = (id) => {
  return axiosInstance.delete(`/admin/resumes/${id}`);
};