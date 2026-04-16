"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { fetchAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "", // In a real app we'd add this to UI, let's mock it for now since UI didn't have it initially, or I will update the form
    age: "",
    employmentStatus: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Mocking password since UI only asked for demographic initially, 
      // but backend requires password. I'm injecting a default one or adding field.
      // Better to just add the phone/password fields to UI.
      const payload = {
        ...formData,
        age: Number(formData.age),
      };

      const res = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.success) {
        login(res.token, res.user);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background flex flex-col pt-12 pb-20 px-4 items-center justify-center relative overflow-hidden">
      {/* Soft background decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Welcome</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-purple/5 border border-brand-pink/10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join Saheli and unlock your potential.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="e.g. Radhika Sharma"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required 
                placeholder="10-digit number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required 
                  min={16}
                  max={100}
                  placeholder="e.g. 28"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Income (₹/mo)</label>
                <input 
                  type="number" 
                  // Name wasn't in backend reqs, keeping it for UI or mapping it out
                  required 
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
              <div className="relative">
                <select 
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors appearance-none"
                >
                  <option value="" disabled>Select status</option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Student">Student</option>
                  <option value="Part-time">Part-time worker</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (State)</label>
              <div className="relative">
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors appearance-none"
                >
                  <option value="" disabled>Select state</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-6 rounded-xl bg-brand-pink text-white font-semibold text-lg shadow-lg shadow-brand-pink/30 hover:bg-pink-600 active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Join Saheli"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-brand-pink font-semibold hover:underline">Log In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
