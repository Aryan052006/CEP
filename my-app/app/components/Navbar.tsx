"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "../context/AuthContext";

export function Navbar({ showProfile = true }: { showProfile?: boolean }) {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-brand-pink/10 shadow-sm z-40 flex items-center px-4 md:px-8 justify-between">
      <Link href="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-white font-bold text-xl shadow-md">
          S
        </div>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple tracking-tight">Saheli</span>
      </Link>
      
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        {showProfile && (
          <Link href="/profile" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink hover:bg-brand-pink/20 transition-colors">
              <User size={18} />
            </div>
            {user && (
              <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                {user.name.split(" ")[0]}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
