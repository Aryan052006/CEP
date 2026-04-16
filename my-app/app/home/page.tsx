"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { AppLayout } from "../components/AppLayout";
import { 
  Landmark, BookOpen, UserPlus, Users, 
  Store, MapPin, ShieldAlert, BarChart3, ChevronRight 
} from "lucide-react";

export default function HomeDashboard() {
  const { t } = useLanguage();
  const userName = "Radhika"; // Mock user data

  const features = [
    { href: "/schemes", icon: <Landmark size={28} className="text-brand-pink" />, title: "Government Schemes", desc: "Find schemes for you" },
    { href: "/skills", icon: <BookOpen size={28} className="text-purple-500" />, title: "Learn Skills", desc: "Start earning today" },
    { href: "/skills/readiness", icon: <UserPlus size={28} className="text-brand-accent" />, title: "Readiness Test", desc: "Discover your strengths" },
    { href: "/mentors", icon: <Users size={28} className="text-teal-500" />, title: "Find a Mentor", desc: "Connect & grow" },
    { href: "/products", icon: <Store size={28} className="text-brand-pink" />, title: "My Products", desc: "Showcase & sell" },
    { href: "/opportunities", icon: <MapPin size={28} className="text-orange-500" />, title: "Local Jobs", desc: "Opportunities near you" },
    { href: "/safety", icon: <ShieldAlert size={28} className="text-red-500" />, title: "Safety & Legal", desc: "Know your rights" },
    { href: "/impact", icon: <BarChart3 size={28} className="text-brand-purple" />, title: "Impact Dashboard", desc: "See community progress" },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        {/* Greeting Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brand-pink to-brand-purple rounded-3xl p-6 md:p-8 text-white shadow-lg mb-8 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{t("home_title")}, {userName}! 👋</h1>
            <p className="text-pink-100 font-medium">Ready to take the next step today?</p>
            
            <div className="mt-6 flex bg-white/20 rounded-2xl p-4 backdrop-blur-md border border-white/20 max-w-sm">
              <div className="flex-1">
                <span className="text-xs text-pink-100 uppercase font-semibold tracking-wider block mb-1">Your Progress</span>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full" />
                </div>
                <span className="text-sm font-medium mt-1 block">Level 1: Beginner</span>
              </div>
            </div>
          </div>
        </motion.div>

        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Explore Services</h2>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={feature.href}
            >
              <Link 
                href={feature.href}
                className="bg-white rounded-2xl p-5 shadow-sm border border-brand-pink/5 hover:shadow-md hover:border-brand-pink/20 transition-all flex flex-col h-full active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-brand-background flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 mt-auto">{feature.desc}</p>
                <div className="flex justify-end mt-2">
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Recommended Actions */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="mt-8 mb-8"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Action Needed</h2>
          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-orange-600 shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm">Complete Profile</h4>
              <p className="text-xs text-gray-600">Add missing info to get better scheme recommendations.</p>
            </div>
            <Link href="/profile" className="px-4 py-2 bg-white text-sm font-semibold text-orange-600 rounded-full shadow-sm hover:bg-orange-50 transition-colors">
              Go
            </Link>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
