"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Landmark, BookOpen, Users, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", label: "Home", icon: <Home size={22} /> },
    { href: "/schemes", label: "Schemes", icon: <Landmark size={22} /> },
    { href: "/skills", label: "Skills", icon: <BookOpen size={22} /> },
    { href: "/mentors", label: "Connect", icon: <Users size={22} /> },
    { href: "/profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-brand-pink/10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-40 pb-safe sm:hidden">
      <div className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? "text-brand-pink" : "text-gray-400 hover:text-brand-purple"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
