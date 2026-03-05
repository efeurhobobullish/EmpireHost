import axios from "axios";
import { useAuthStore } from "@/store";

/* =========================
   BACKEND URL (single source of truth)
   Set VITE_BASE_URL in .env for production (e.g. https://your-api.herokuapp.com)
========================= */
function getBackendBaseUrl(): string {
  const raw = import.meta.env.VITE_BASE_URL;
  const url =
    typeof raw === "string" && raw.trim()
      ? raw.trim().replace(/\/+$/, "")
      : "";
  if (url) return url;
  if (import.meta.env.DEV) return "http://localhost:4001";
  return "";
}

const BACKEND_BASE_URL = getBackendBaseUrl();
const API_BASE_URL = BACKEND_BASE_URL ? `${BACKEND_BASE_URL}/api` : "/api";

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
api.interceptors.request.use(
  (config: import("axios").InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response: import("axios").AxiosResponse) => response,
  (error: unknown) => {
    const err = error as { response?: { status?: number } };
    if (err?.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
export { BACKEND_BASE_URL, API_BASE_URL };