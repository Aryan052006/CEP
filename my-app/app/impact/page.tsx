"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { BarChart3, Users, BookOpen, Store } from "lucide-react";

export default function ImpactPage() {
  const STATS = [
    { title: "Women Registered", value: "54,230", icon: <Users className="text-blue-500" /> },
    { title: "Skills Learned", value: "12,450", icon: <BookOpen className="text-purple-500" /> },
    { title: "Products Listed", value: "8,920", icon: <Store className="text-orange-500" /> },
    { title: "Connections Made", value: "32,100", icon: <BarChart3 className="text-brand-pink" /> },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        <div className="mb-8 px-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Impact Dashboard</h1>
          <p className="text-gray-500 text-sm">See how Saheli is empowering women across India.</p>
        </div>

        {/* Big numbers Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-pink to-brand-purple p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute opacity-20 -right-10 -top-10 w-40 h-40">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0L60.5485 36.9552H100L68.2132 59.8519L80.1283 95.918L50 73.1973L19.8717 95.918L31.7868 59.8519L0 36.9552H39.4515L50 0Z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Our Goal by 2027</h2>
            <p className="text-pink-100 mb-6 max-w-sm">Empowering 1 Million women to be financially independent and self-sufficient.</p>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "5%" }} 
                className="h-full bg-white rounded-full relative"
              />
            </div>
            <p className="text-right text-xs mt-2 font-bold opacity-80">5.4% Achieved</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
