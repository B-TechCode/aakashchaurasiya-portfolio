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

        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        // Redirect only when an ADMIN API request
        // fails because the admin is unauthorized.
        if (
            status === 401 &&
            requestUrl.startsWith("/admin/")
        ) {

            removeToken();

            window.location.href = "/admin/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;