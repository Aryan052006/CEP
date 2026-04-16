"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "../utils/api";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  phone: string;
  employmentStatus: string;
  state: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetchAPI("/auth/me");
          if (res.success) {
            setUser(res.user);
          }
        } catch (error) {
          console.error("Token invalid", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
    router.push("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
