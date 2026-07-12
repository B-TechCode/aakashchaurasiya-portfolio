import axios from "axios";
import { removeToken } from "../services/tokenService";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
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

// Response interceptor
axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            removeToken();

            window.location.href = "/admin/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;