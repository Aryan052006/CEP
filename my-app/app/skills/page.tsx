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
  const [hasTakenTest, setHasTakenTest] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const taken = localStorage.getItem("hasTakenTest") === "true";
    setHasTakenTest(taken);

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
          { title: "Tailoring & Boutique Management", match: "95% Match", duration: "3 Months", videoUrl: "https://www.youtube.com/embed/videoseries?list=PL2e9WJ8aYQ0aEwYjX2N0zGf_rXv2Z-q-A" },
          { title: "Beauty & Wellness Training", match: "88% Match", duration: "2 Months", videoUrl: "https://www.youtube.com/embed/videoseries?list=PLB-Xy_0N7I19N_n_1O3-1rW1z-QhP-r9g" },
          { title: "Handicrafts & Local Arts", match: "82% Match", duration: "1 Month", videoUrl: "https://www.youtube.com/embed/videoseries?list=PL_Xy_0N7I19N_n_1O3-1rW1z-QhP-r9g" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const ICONS = ["✂️", "💄", "🎨", "📱", "🍳"];
  const CATEGORIES = ["All", "Digital Literacy", "Agriculture", "Food Processing", "Retail Sales"];

  const filteredSkills = recommendations.filter(skill => {
    if (activeCategory === "All") return true;
    // Simple mock category mapping for demo
    if (activeCategory === "Digital Literacy") return skill.title.includes("Digital");
    if (activeCategory === "Retail Sales") return skill.title.includes("Management");
    return true; 
  });

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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {hasTakenTest ? "Discover more skills" : "Not sure what to learn?"}
              </h1>
              <p className="text-sm text-gray-600 max-w-sm mb-6">Take our AI-powered readiness test to discover the best skills suited for your background.</p>
              <Link
                href="/skills/readiness"
                className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-brand-purple/20 hover:bg-purple-700 active:scale-95 transition-all"
              >
                {hasTakenTest ? "Retake Readiness Test" : "Take Readiness Test"} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* ML Recommended */}
        {hasTakenTest && (
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
                {filteredSkills.map((skill: any, index) => (
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
                    <p className="text-xs text-gray-500 mb-4">Est. duration: {skill.duration}</p>

                    {skill.videoUrl && (
                      <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                        <iframe 
                          src={skill.videoUrl} 
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        />
                      </div>
                    )}

                    <button className="mt-auto w-full py-2.5 bg-brand-pink text-white font-semibold text-sm rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-pink/10 active:scale-95">
                      <PlayCircle size={16} /> Resume Learning
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`p-4 rounded-xl border font-medium text-center text-sm active:scale-95 transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? "bg-brand-pink text-white border-brand-pink shadow-md shadow-brand-pink/20" 
                    : "bg-white text-gray-700 border-gray-100 shadow-sm hover:border-brand-pink/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
