import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

/* =========================
   AUTH USER TYPE
========================= */
interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  coins: number;
  referralCode: string;
  role: "user" | "admin" | "developer";
}

/* =========================
   STORE TYPE
========================= */
interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  setAuth: (user: AuthUser, token: string | null) => void;
  setUser: (user: Partial<AuthUser>) => void;
  updateUserCoins: (coins: number) => void;
  logout: () => void;
}

/* =========================
   CUSTOM ASYNC STORAGE
   (prevents redirect flicker)
========================= */
const createPersistStorage = (): PersistStorage<AuthStore> => ({
  getItem: (name) =>
    new Promise((resolve) => {
      setTimeout(() => {
        try {
          const item = localStorage.getItem(name);

          if (!item) {
            resolve(null);
            return;
          }

          resolve(JSON.parse(item) as StorageValue<AuthStore>);
        } catch {
          resolve(null);
        }
      }, 0);
    }),

  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {}
  },

  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {}
  },
});

/* =========================
   AUTH STORE
========================= */
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,

      /* =====================
         SET AUTH
      ===================== */
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      /* =====================
         UPDATE USER
      ===================== */
      setUser: (updatedUser) => {
        const current = get().user;

        if (!current) return;

        set({
          user: { ...current, ...updatedUser },
        });
      },

      /* =====================
         UPDATE COINS
      ===================== */
      updateUserCoins: (coins) => {
        const current = get().user;

        if (!current) return;

        set({
          user: { ...current, coins },
        });
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

      storage: createPersistStorage(),

      /* Only persist safe values */
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),

      /* Hydration flag */
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hasHydrated: true });
      },
    }
  )
);

export default useAuthStore;