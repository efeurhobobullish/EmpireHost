import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

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

export default api;
