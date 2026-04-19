"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    age: "",
    income: "",
    employmentStatus: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await register({
        name: form.name,
        phone: form.phone,
        password: form.password,
        age: parseInt(form.age),
        income: parseInt(form.income) || 0,
        employmentStatus: form.employmentStatus,
        state: form.state,
      });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background flex flex-col pt-12 pb-20 px-4 items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink mb-6 transition-colors">
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
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange}
                placeholder="e.g. Radhika Sharma"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" name="age" required min={16} max={100} value={form.age} onChange={handleChange}
                  placeholder="e.g. 28"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Income (₹/mo)</label>
                <input type="number" name="income" value={form.income} onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
              <div className="relative">
                <select name="employmentStatus" required value={form.employmentStatus} onChange={handleChange}
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
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (State)</label>
              <div className="relative">
                <select name="state" required value={form.state} onChange={handleChange}
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
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-4 mt-6 rounded-xl bg-brand-pink text-white font-semibold text-lg shadow-lg shadow-brand-pink/30 hover:bg-pink-600 active:scale-95 transition-all flex items-center justify-center disabled:opacity-70"
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
