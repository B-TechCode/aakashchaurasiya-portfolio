import axiosInstance from "./axios";

export const loginApi = async (credentials) => {

  const response = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const verifyOtpApi = async (data) => {

  const response = await axiosInstance.post(
    "/auth/verify-otp",
    data
  );

  return response.data;
};

