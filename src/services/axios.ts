import { SecureStorage } from "@/utils/storage";
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const mlAtName = import.meta.env.VITE_ACCESS_TOKEN_NAME;

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
    return Promise.reject(error);
  }
);

export { http };
