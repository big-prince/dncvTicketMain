/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    // Add any auth tokens here if needed in the future
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data.message || "Bad request");
          break;
        case 401:
          toast.error("Unauthorized access");
          break;
        case 403:
          toast.error("Access forbidden");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(data.message || "An error occurred");
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your connection.");
    } else {
      // Other error
      toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default api;
