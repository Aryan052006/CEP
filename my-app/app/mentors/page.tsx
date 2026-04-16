"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { Star, MapPin, MessageCircle, UserPlus, X } from "lucide-react";

// Mock Data
const MENTORS = [
  { id: 1, name: "Anita Desai", role: "Tailoring Expert", experience: "15 yrs", location: "Pune, MH", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 2, name: "Sneha Patil", role: "Small Business Coach", experience: "8 yrs", location: "Nagpur, MH", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 3, name: "Geeta Verma", role: "Handicraft Artisan", experience: "20 yrs", location: "Jaipur, RJ", rating: 5.0, available: false, image: "https://images.unsplash.com/photo-1610216705422-caa3bbb6d51e?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 4, name: "Kiran Rao", role: "Digital Marketing", experience: "5 yrs", location: "Mumbai, MH", rating: 4.7, available: true, image: "https://images.unsplash.com/photo-1531123897727-8f129e1b4dce?auto=format&fit=crop&q=80&w=200&h=200" },
];

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<typeof MENTORS[0] | null>(null);

  return (
    <AppLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 px-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Find a Mentor</h1>
          <p className="text-gray-500 text-sm">Connect with experienced women who can guide your journey.</p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MENTORS.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
            >
              {mentor.available && (
                <span className="absolute top-4 left-4 bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available
                </span>
              )}

              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-pink/10 mb-4 mt-2">
                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg">{mentor.name}</h3>
              <p className="text-brand-purple text-sm font-medium mb-1">{mentor.role}</p>
              
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-5">
                <span className="flex items-center gap-1"><MapPin size={12} /> {mentor.location}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1 text-orange-500 font-semibold"><Star size={12} fill="currentColor" /> {mentor.rating}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{mentor.experience}</span>
              </div>

              <div className="flex w-full gap-2 mt-auto">
                <button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex-1 py-2.5 bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={16} /> Message
                </button>
                <button 
                  className={`flex-1 py-2.5 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                    mentor.available ? "bg-brand-pink hover:bg-pink-600 active:scale-95 shadow-brand-pink/20" : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!mentor.available}
                >
                  <UserPlus size={16} /> Connect
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Preview */}
        <AnimatePresence>
          {selectedMentor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                onClick={() => setSelectedMentor(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-sm rounded-[2rem] p-6 relative z-10 shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="flex gap-4 items-center mb-6">
                  <img src={selectedMentor.image} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedMentor.name}</h3>
                    <p className="text-sm text-gray-500">Replies within 2 hours</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl mb-6">
                  <textarea 
                    autoFocus
                    placeholder={`Write a message to ${selectedMentor.name}...`}
                    className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm text-gray-700 placeholder:text-gray-400"
                    rows={4}
                  />
                </div>

                <button className="w-full py-4 bg-brand-pink text-white font-semibold rounded-xl shadow-lg shadow-brand-pink/20 hover:bg-pink-600 active:scale-95 transition-all">
                  Send Message
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
