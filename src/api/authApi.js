import axiosInstance from "./axios";

export const loginApi = async (credentials) => {

  console.log("Using authApi.js");

  console.log(axiosInstance.defaults.baseURL);

  const response = await axiosInstance.post("/auth/login", credentials);

  return response.data;
};