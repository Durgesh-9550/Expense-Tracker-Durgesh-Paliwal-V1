import axios from "axios";

// Create an instance of Axios with a base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1/api", // Base URL for API requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
