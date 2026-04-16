"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { Search, ExternalLink, Sparkles, Filter, ChevronDown } from "lucide-react";

// Mock Data from Requirements
const SCHEMES = [
  { id: 1, name: "Beti Bachao Beti Padhao", benefits: "Financial assistance for girl child's education and welfare.", eligibility: "Girl Child", link: "https://wcd.nic.in/bbbp-schemes" },
  { id: 2, name: "STEP", benefits: "Provides skills that give employability to women in agriculture, retail, etc.", eligibility: "Women 16+", link: "https://wcd.nic.in/step" },
  { id: 3, name: "Working Women Hostel", benefits: "Safe and affordable accommodation for working women.", eligibility: "Working Women", link: "https://wcd.nic.in/schemes/working-women-hostel" },
  { id: 4, name: "Mahila E-Haat", benefits: "Online marketing platform to support women entrepreneurs.", eligibility: "Women Entrepreneurs", link: "http://mahilaehaat-rmk.gov.in/" },
  { id: 5, name: "Pradhan Mantri Mudra Yojana", benefits: "Loans up to ₹10 Lakhs for non-corporate, non-farm businesses.", eligibility: "Micro Businesses", link: "https://www.mudra.org.in/" },
  { id: 6, name: "Stand Up India", benefits: "Bank loans between ₹10 Lakhs to ₹1 Crore for setting up enterprises.", eligibility: "SC/ST/Women", link: "https://www.standupmitra.in/" },
  { id: 7, name: "PMEGP", benefits: "Credit-linked subsidy program for generating employment.", eligibility: "Any individual above 18", link: "https://www.kviconline.gov.in/" },
  { id: 8, name: "Deendayal Antyodaya Yojana (NRLM)", benefits: "Organizing rural poor women into Self Help Groups (SHGs).", eligibility: "Rural Poor Women", link: "https://aajeevika.gov.in/" },
  { id: 9, name: "PMKVY", benefits: "Skill certification scheme to enable youth to take up industry-relevant training.", eligibility: "Unemployed Youth", link: "https://www.pmkvyofficial.org/" },
  { id: 10, name: "Skill India", benefits: "Various courses to enhance employability.", eligibility: "Anyone", link: "https://www.skillindia.gov.in/" },
  { id: 11, name: "PMGDISHA", benefits: "Making rural households digitally literate.", eligibility: "Rural Households", link: "https://www.pmgdisha.in/" },
  { id: 12, name: "DDU-GKY", benefits: "Adding diversity to incomes of rural poor families.", eligibility: "Rural Youth (15-35 yrs)", link: "http://ddugky.gov.in/" }
];

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSchemes = SCHEMES.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    scheme.benefits.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="w-full">
        {/* ML Recommended Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Sparkles className="text-brand-accent" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Recommended for You</h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-brand-pink/10 to-brand-purple/10 border border-brand-pink/20 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">Pradhan Mantri Mudra Yojana</h3>
              <span className="bg-white text-brand-pink text-xs font-bold px-2 py-1 rounded-md shadow-sm border border-brand-pink/10">98% Match</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">Based on your profile "Self-employed in Maharashtra", you are highly eligible for micro-business loans up to ₹10 Lakhs.</p>
            <a href="https://www.mudra.org.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-pink text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-pink-600 transition-colors">
              Apply Now <ExternalLink size={14} />
            </a>
            <p className="text-[10px] text-gray-400 mt-2 italic">Opens official government site in new tab</p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="sticky top-16 z-30 bg-brand-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">Discover Schemes</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search schemes or benefits..."
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
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col"
              >
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                    {scheme.eligibility}
                  </span>
                  <h3 className="font-bold text-gray-900 text-[17px] leading-tight mb-2">{scheme.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{scheme.benefits}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <a 
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
