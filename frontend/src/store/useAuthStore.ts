import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  coins: number;
  referralCode?: string;
  role?: "user" | "admin" | "developer";
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  setAuth: (user: User, token: string | null) => void;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      setUser: (updatedUser) => {
        const current = get().user;
        if (!current) return;

        set({
          user: { ...current, ...updatedUser },
        });
      },

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "empirehost-auth",

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hasHydrated: true });
      },
    }
  )
);

export default useAuthStore;
