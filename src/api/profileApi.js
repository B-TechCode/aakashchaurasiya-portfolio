import axiosInstance from "./axios";

export const getProfile = async () => {
  const response = await axiosInstance.get("/admin/profile");
  return response.data;
};

export const updateProfile = async (profile) => {
  const response = await axiosInstance.put("/admin/profile", profile);
  return response.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axiosInstance.post(
    "/admin/profile/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};