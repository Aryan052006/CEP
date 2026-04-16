"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ showProfile = true }: { showProfile?: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-brand-pink/10 shadow-sm z-40 flex items-center px-4 md:px-8 justify-between">
      <Link href="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
          S
        </div>
        <span className="text-xl font-bold text-gradient-primary tracking-tight">Saheli</span>
      </Link>
      
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        {showProfile && (
          <Link href="/profile" className="w-9 h-9 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink hover:bg-brand-pink/20 transition-colors">
            <User size={18} />
          </Link>
        )}
      </div>
    </header>
  );
}
