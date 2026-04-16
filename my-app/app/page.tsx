"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";

export default function WelcomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-background flex flex-col selection:bg-brand-pink/20">
      <Navbar showProfile={false} />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 pt-24 pb-12 w-full max-w-5xl mx-auto relative overflow-hidden">
        {/* Soft Background Gradient Bubbles */}
        <div className="absolute top-[-10%] sm:left-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-brand-pink/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] sm:right-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-brand-purple/20 rounded-full blur-3xl -z-10" />

        <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col pt-8 md:pt-0 z-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-brand-pink/20 text-brand-pink text-sm font-semibold mb-6 shadow-sm self-start">
              Welcome to Saheli 🌸
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t("welcome_tagline")}
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
              A warm, trustworthy platform empowering rural and semi-urban women in India to discover government schemes, learn income-generating skills, and achieve financial independence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="flex items-center justify-center py-4 px-8 rounded-2xl bg-brand-pink text-white font-semibold text-lg shadow-lg shadow-brand-pink/30 hover:bg-pink-600 active:scale-95 transition-all"
              >
                {t("register")}
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center py-4 px-8 rounded-2xl border-2 border-brand-purple text-brand-purple font-semibold text-lg hover:bg-brand-purple/5 active:scale-95 transition-all"
              >
                {t("login")}
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full max-w-md md:max-w-none flex justify-center relative mt-10 md:mt-0 z-10"
          >
            {/* Image decorative border & shadow */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-purple/20 border-4 border-white">
              <Image 
                src="/hero.png" 
                alt="Confident Indian women" 
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            
            {/* Decorative float elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:top-4 md:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 flex gap-3 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                ✨
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">50,000+</span>
                <span className="text-xs text-gray-500 font-medium">Women Empowered</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
