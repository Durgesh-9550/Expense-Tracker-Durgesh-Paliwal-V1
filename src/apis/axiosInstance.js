import axios from "axios";

// Create an instance of Axios with a base URL
const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-durgesh-paliwal-v1.onrender.com/v1", // Base URL for API requests
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
