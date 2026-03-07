import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

/* =========================
   BACKEND URL
========================= */
function getBackendBaseUrl(): string {
  const raw = import.meta.env.VITE_BASE_URL;

  const url =
    typeof raw === "string" && raw.trim()
      ? raw.trim().replace(/\/+$/, "")
      : "";

  if (url) return url;

  if (import.meta.env.DEV) {
    return "https://empirehost-backend-d563ca7f1bbc.herokuapp.com";
  }

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
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  console.log("TOKEN FROM STORE:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error("NO TOKEN WAS FOUND IN ZUSTAND STORE!");
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

      // logout user if token expired
      setUser(null);
      setToken(null);
    }

    return Promise.reject(error);
  }
);

export default api;
export { BACKEND_BASE_URL, API_BASE_URL };