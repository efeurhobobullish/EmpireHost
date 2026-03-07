import api from "@/config/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  coins: number;
  referralCode?: string;
  role?: "user" | "admin" | "developer";
}

interface AuthStore {
  token: string | null;
  user: User | null;
  isCheckingAuth: boolean;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isCheckingAuth: false,

      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),

      checkAuth: async () => {
        set({ isCheckingAuth: true });

        try {
          const response = await api.get("/auth/check");

          if (response.data.success) {
            set({
              user: response.data.user,
              token: response.data.token,
            });
          } else {
            set({
              user: null,
              token: null,
            });
          }
        } catch (error) {
          console.error(error);
          set({
            user: null,
            token: null,
          });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;