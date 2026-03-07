import api from "@/config/api";
import useAuthStore from "@/store/useAuthStore";

export default function useAuth() {
  const {
    token,
    user,
    setToken,
    setUser,
    checkAuth,
    isCheckingAuth,
  } = useAuthStore();

  /* ======================
     REFRESH USER
  ====================== */
  const refreshUser = async () => {
    if (!token) return;

    try {
      const { data } = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.user);
    } catch {
      // ignore
    }
  };

  /* ======================
     REFRESH COINS
  ====================== */
  const refreshPoints = async () => {
    if (!token) return;

    try {
      const { data } = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (user) {
        setUser({
          ...user,
          coins: data.user.coins,
        });
      }
    } catch {}
  };

  /* ======================
     SIGNUP
  ====================== */
  const signup = async (
    fullName: string,
    email: string,
    password: string,
    referralCode?: string
  ) => {
    try {
      const { data } = await api.post("/auth/register", {
        fullName,
        email,
        password,
        referralCode,
      });

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  /* ======================
     LOGIN
  ====================== */
  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", {
        identifier: email,
        password,
      });

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Invalid credentials",
      };
    }
  };

  /* ======================
     LOGOUT
  ====================== */
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return {
    signup,
    login,
    logout,
    refreshUser,
    refreshPoints,
    checkAuth,
    user,
    token,
    isCheckingAuth,
  };
}