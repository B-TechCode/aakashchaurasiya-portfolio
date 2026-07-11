import axiosInstance from "./axios";

// ==============================
// GET PROFILE
// ==============================

export const getProfile = () => {
  return axiosInstance.get("/admin/profile");
};

// ==============================
// UPDATE PROFILE
// ==============================

export const updateProfile = (data) => {
  return axiosInstance.put("/admin/profile", data);
};

// ==============================
// UPLOAD PROFILE IMAGE
// ==============================

export const uploadProfileImage = (image) => {
  const formData = new FormData();

  formData.append("image", image);

  return axiosInstance.post(
    "/admin/profile/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};