"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authAPI, tokenAPI } from "@/lib/api";
import type { User, RegisterData } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  registerEmployer: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isEmployer: boolean;
  isJobSeeker: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── Restore session from localStorage ──────────────────── */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  /* ── Login ──────────────────────────────────────────────── */
  const login = useCallback(async (username: string, password: string) => {
    // Use our custom login endpoint which returns user info
    const { data } = await authAPI.login(username, password);
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    toast.success("Welcome back!");
  }, []);

  /* ── Register (job seeker) ──────────────────────────────── */
  const register = useCallback(
    async (userData: RegisterData) => {
      await authAPI.register(userData);
      await login(userData.username, userData.password);
      toast.success("Account created!");
    },
    [login]
  );

  /* ── Register (employer) ────────────────────────────────── */
  const registerEmployer = useCallback(
    async (userData: RegisterData) => {
      await authAPI.registerEmployer(userData);
      await login(userData.username, userData.password);
      toast.success("Employer account created!");
    },
    [login]
  );

  /* ── Logout ─────────────────────────────────────────────── */
  const logout = useCallback(() => {
    const refresh = localStorage.getItem("refresh_token");
    if (refresh) {
      authAPI.logout(refresh).catch(() => {});
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        registerEmployer,
        logout,
        isAuthenticated: !!user,
        isEmployer: user?.role === "employer",
        isJobSeeker: user?.role === "job_seeker",
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
