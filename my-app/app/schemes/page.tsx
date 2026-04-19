"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Search, ExternalLink, Sparkles, Filter } from "lucide-react";

interface Scheme {
  _id: string;
  name: string;
  category: string;
  benefits: string;
  eligibility: string;
  officialLink: string;
}

interface MLScheme {
  scheme_name: string;
  match_score: number;
  description: string;
  link: string;
  eligibility: string;
}

export default function SchemesPage() {
  const { apiFetch, user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [recommended, setRecommended] = useState<MLScheme[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all schemes from DB
        const schemesRes = await apiFetch("/content/schemes");
        const schemesData = await schemesRes.json();
        if (schemesData.success) setSchemes(schemesData.data);

        // Fetch ML recommendations
        if (user) {
          const mlRes = await apiFetch("/ml/predict-schemes", {
            method: "POST",
            body: JSON.stringify({
              age: user.age || 25,
              income: (user.income || 5000) * 12, // monthly to annual
              employmentStatus: user.employmentStatus || "Self-employed",
              state: user.state || "Maharashtra",
            }),
          });
          const mlData = await mlRes.json();
          if (mlData.success && mlData.data) {
            setRecommended(mlData.data.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Failed to fetch schemes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredSchemes = schemes.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.benefits.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading skeleton
  if (loading) {
    return (
      <AppLayout>
        <div className="w-full space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full">
        {/* ML Recommended Section */}
        {recommended.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Sparkles className="text-brand-accent" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Recommended for You</h2>
            </div>
            
            <div className="space-y-3">
              {recommended.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-r from-brand-pink/10 to-brand-purple/10 border border-brand-pink/20 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{rec.scheme_name}</h3>
                    <span className="bg-white text-brand-pink text-xs font-bold px-2 py-1 rounded-md shadow-sm border border-brand-pink/10">
                      {rec.match_score}% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{rec.description}</p>
                  <p className="text-xs text-gray-500 mb-3">{rec.eligibility}</p>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-pink text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-pink-600 transition-colors"
                  >
                    Apply Now <ExternalLink size={14} />
                  </a>
                  <p className="text-[10px] text-gray-400 mt-2 italic">Opens official government site in new tab</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="sticky top-16 z-30 bg-brand-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">All Schemes</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/30 shadow-sm"
              />
            </div>
            <button className="flex items-center justify-center p-3 w-12 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, i) => (
              <motion.div key={scheme._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col"
              >
                <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2 self-start">
                  {scheme.eligibility}
                </span>
                <h3 className="font-bold text-gray-900 text-[17px] leading-tight mb-2">{scheme.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">{scheme.benefits}</p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-brand-pink/5 text-brand-pink border border-brand-pink/20 font-semibold text-sm rounded-xl hover:bg-brand-pink hover:text-white transition-all group"
                  >
                    Apply Now <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Opens official website in new tab</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-gray-900 font-semibold mb-1">No schemes found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
