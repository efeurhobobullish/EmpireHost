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
    (set, get) => ({
      token: null,
      user: null,
      isCheckingAuth: false,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      checkAuth: async () => {
        const token = get().token;

        // no token → nothing to check
        if (!token) return;

        set({ isCheckingAuth: true });

        try {
          const res = await api.get("/auth/check");

          if (res.data?.success) {
            set({ user: res.data.user });
          }
        } catch (err) {
          console.error("checkAuth failed:", err);
          // DO NOT clear token here
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