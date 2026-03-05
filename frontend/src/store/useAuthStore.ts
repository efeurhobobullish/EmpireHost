import { persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  coins: number;
  referralCode: string;
  role: "user" | "admin" | "developer";
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string | null) => void;
  setUser: (user: Partial<AuthUser>) => void;
  updateUserCoins: (coins: number) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      /* =====================
         AUTH SET
      ===================== */
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      /* =====================
         USER MERGE UPDATE
      ===================== */
      setUser: (updatedUser) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updatedUser } });
      },

      /* =====================
         COINS UPDATE ONLY
      ===================== */
      updateUserCoins: (coins) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, coins } });
      },

      /* =====================
         LOGOUT
      ===================== */
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "empirehost-auth-store",
    }
  )
);

export default useAuthStore;