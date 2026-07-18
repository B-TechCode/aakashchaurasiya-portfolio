import axiosInstance from "../api/axios";

export const fetchPublicSeo = async () => {
  const response = await axiosInstance.get("/public/seo");
  return response.data.data;
};