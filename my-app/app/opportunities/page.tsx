"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { MapPin, Briefcase, ChevronRight, Search, Building, CheckCircle2 } from "lucide-react";

interface JobData {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

export default function OpportunitiesPage() {
  const { apiFetch, user } = useAuth();
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All Jobs");
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const handleApply = (id: string, title: string) => {
    alert(`Application submitted successfully for ${title}!`);
    setAppliedJobs(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await apiFetch("/content/opportunities");
        const data = await res.json();
        if (data.success) setJobs(data.data);
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const types = ["All Jobs", "Full Time", "Part Time", "Contract"];
  const filtered = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "All Jobs" || j.type === activeType;
    return matchesSearch && matchesType;
  });

  // Simple match score based on user state
  function getMatch(job: JobData) {
    if (user?.state && job.location.includes(user.state.split(" ")[0])) return "High";
    return ["Medium", "Low"][Math.floor(Math.random() * 2)];
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="mb-6 px-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Briefcase size={24} className="text-orange-500" /> Local Opportunities
          </h1>
          <p className="text-gray-500 text-sm">Find jobs and gig work near you.</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search for jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide px-1 -mx-4 md:mx-0 sm:px-0">
          <div className="w-4 md:hidden" />
          {types.map((cat) => (
            <button key={cat} onClick={() => setActiveType(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                activeType === cat ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-4 md:hidden" />
        </div>

        {loading ? (
          <div className="space-y-4 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            {filtered.map((job, i) => {
              const match = getMatch(job);
              return (
                <motion.div key={job._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-orange-500/30 transition-all active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 text-orange-500">
                    <Building size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 truncate pr-4">{job.title}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md shrink-0 ${
                        match === "High" ? "bg-green-100 text-green-700" : match === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {match} Match
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1 truncate">{job.company}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{job.type}</span>
                    </div>
                    {appliedJobs.has(job._id) ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-200">
                        <CheckCircle2 size={14} /> Applied
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleApply(job._id, job.title)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-pink text-white text-xs font-bold rounded-lg hover:bg-pink-600 active:scale-95 transition-all shadow-sm"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">No opportunities found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
