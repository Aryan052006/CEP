"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Sparkles, ArrowRight, PlayCircle, Star, Target } from "lucide-react";

interface SkillRec {
  title: string;
  match: string;
  duration: string;
}

export default function SkillsPage() {
  const { apiFetch } = useAuth();
  const [recommendations, setRecommendations] = useState<SkillRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await apiFetch("/ml/predict-skills", {
          method: "POST",
          body: JSON.stringify({
            interest: "Working with hands",
            time: "3-4 hours",
            goal: "Earn a side income from home",
          }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setRecommendations(data.data);
        }
      } catch (err) {
        // Fallback
        setRecommendations([
          { title: "Tailoring & Boutique Management", match: "95% Match", duration: "3 Months" },
          { title: "Beauty & Wellness Training", match: "88% Match", duration: "2 Months" },
          { title: "Handicrafts & Local Arts", match: "82% Match", duration: "1 Month" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const ICONS = ["✂️", "💄", "🎨", "📱", "🍳"];

  return (
    <AppLayout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="bg-purple-50 border border-purple-100 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl -z-0" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-purple">
              <Target size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Not sure what to learn?</h1>
              <p className="text-sm text-gray-600 max-w-sm mb-6">Take our AI-powered readiness test to discover the best skills suited for your background.</p>
              <Link
                href="/skills/readiness"
                className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-brand-purple/20 hover:bg-purple-700 active:scale-95 transition-all"
              >
                Take Readiness Test <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* ML Recommended */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Sparkles className="text-brand-accent" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Your Recommended Skills</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse">
                  <div className="h-8 w-8 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/3 mb-6" />
                  <div className="h-10 bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">{ICONS[index % ICONS.length]}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                      <Star size={12} fill="currentColor" /> {skill.match}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{skill.title}</h3>
                  <p className="text-xs text-gray-500 mb-6">Est. duration: {skill.duration}</p>

                  <button className="mt-auto w-full py-2.5 bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl hover:bg-brand-pink hover:text-white transition-colors flex items-center justify-center gap-2">
                    <PlayCircle size={16} /> Start Learning
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {["Digital Literacy", "Agriculture", "Food Processing", "Retail Sales"].map((cat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm font-medium text-gray-700 text-center text-sm active:scale-95 transition-transform cursor-pointer">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
