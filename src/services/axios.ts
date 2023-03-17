import { useAuthStore } from "@/stores/auth";
import { SecureStorage } from "@/utils/storage";
import axios from "axios";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const mlAtName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const mlAtExpiresAtName = import.meta.env.VITE_ACCESS_TOKEN_EXPIRES_AT_NAME;

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const accessToken = SecureStorage.instance().getItem(mlAtName);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      toast("Your session has expired. Please login again.", {
        icon: "👋",
      });

      SecureStorage.instance().removeItem(mlAtName);
      SecureStorage.instance().removeItem(mlAtExpiresAtName);

      useAuthStore.getState().logout();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export { http };
