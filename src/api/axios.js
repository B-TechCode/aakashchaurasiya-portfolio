import axios from "axios";


console.log(import.meta.env.VITE_API_BASE_URL);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;