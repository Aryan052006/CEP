"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface User {
  id: string;
  name: string;
  phone: string;
  age: number;
  income: number;
  employmentStatus: string;
  state: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  apiFetch: (path: string, options?: RequestInit) => Promise<Response>;
}

interface RegisterData {
  name: string;
  phone: string;
  password: string;
  age: number;
  income: number;
  employmentStatus: string;
  state: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("saheli-token");
    const savedUser = localStorage.getItem("saheli-user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }
    localStorage.setItem("saheli-token", data.token);
    localStorage.setItem("saheli-user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    router.push("/home");
  };

  const register = async (regData: RegisterData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Registration failed");
    }
    localStorage.setItem("saheli-token", data.token);
    localStorage.setItem("saheli-user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    router.push("/home");
  };

  const logout = () => {
    localStorage.removeItem("saheli-token");
    localStorage.removeItem("saheli-user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  // Authenticated fetch helper
  const apiFetch = async (path: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(`${API_BASE}${path}`, { ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
