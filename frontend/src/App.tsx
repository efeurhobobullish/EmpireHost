import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

import { ScrollToTop } from "@/components/ui";

import { Home, NotFound } from "@/pages";
import {
  Login,
  Register,
  Verify,
  ForgotPassword,
  ResetPassword,
} from "@/pages/auth";

import {
  Dashboard,
  Profile,
  Referral,
  Store,
  Community,
  Coins,
  Withdraw,
  Bots,
  Deploy,
  Developers,
  Templates,
  BotLogs,
} from "@/pages/main";

import Protect from "@/pages/protect";
import useAuth from "@/hooks/useAuth";

export default function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />

      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========== PROTECTED ROUTES ========== */}
        <Route element={<Protect />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/bots" element={<Bots />} />
          <Route path="/dashboard/templates" element={<Templates />} />
          <Route path="/dashboard/deploy" element={<Deploy />} />
          <Route path="/dashboard/coins" element={<Coins />} />
          <Route path="/dashboard/store" element={<Store />} />
          <Route path="/dashboard/referral" element={<Referral />} />
          <Route path="/dashboard/community" element={<Community />} />
          <Route path="/dashboard/developers" element={<Developers />} />

          <Route path="/dashboard/bots/:botId/logs" element={<BotLogs />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Route>

        {/* ========== 404 ========== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}