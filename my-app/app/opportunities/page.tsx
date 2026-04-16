"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { MapPin, Briefcase, ChevronRight, Search, Building } from "lucide-react";

export default function OpportunitiesPage() {
  const JOBS = [
    { title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Pune District", type: "Full Time", match: "High" },
    { title: "Retail Store Manager", company: "Reliance Smart", location: "Baner, Pune", type: "Full Time", match: "Medium" },
    { title: "Boutique Assistant", company: "Kala Creations", location: "Kothrud, Pune", type: "Part Time", match: "High" },
    { title: "Data Entry Operator", company: "Local Panchayat", location: "Shirur", type: "Contract", match: "Low" },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 px-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Briefcase size={24} className="text-orange-500" /> 
            Local Opportunities
          </h1>
          <p className="text-gray-500 text-sm">Find jobs and gig work near you.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for jobs..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide px-1 -mx-4 md:mx-0 sm:px-0">
          <div className="w-4 md:hidden" />
          {["All Jobs", "Govt Roles", "Part Time", "Work from Home", "Retail"].map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                i === 0 
                  ? "bg-gray-900 text-white border-gray-900" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-4 md:hidden" />
        </div>

        {/* Job List */}
        <div className="space-y-4 mt-2">
          {JOBS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-orange-500/30 transition-all active:scale-95"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 text-orange-500">
                <Building size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 truncate pr-4">{job.title}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md shrink-0 ${
                    job.match === 'High' ? 'bg-green-100 text-green-700' :
                    job.match === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {job.match} Match
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1 truncate">{job.company}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{job.type}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
