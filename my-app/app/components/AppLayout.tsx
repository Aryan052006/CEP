"use client";

import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 sm:pb-0 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
