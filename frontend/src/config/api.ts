import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

/* =========================
   BACKEND URL (ENV ONLY)
========================= */
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const { setUser, setToken } = useAuthStore.getState();

      setUser(null);
      setToken(null);
    }

    return Promise.reject(error);
  }
);

export default api;