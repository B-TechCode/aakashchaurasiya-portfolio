import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};