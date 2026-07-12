import { loginApi } from "../api/authApi";

export const login = async (credentials) => {
  return await loginApi(credentials);
};