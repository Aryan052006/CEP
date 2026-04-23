"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { ShieldAlert, Phone, Scale, BookHeart, AlertTriangle } from "lucide-react";

export default function SafetyPage() {
  const HELPLINES = [
    { number: "1091", title: "Women Helpline (All India)", icon: <Phone size={20} /> },
    { number: "181", title: "Domestic Abuse Helpline", icon: <AlertTriangle size={20} /> },
    { number: "112", title: "National Emergency", icon: <ShieldAlert size={20} /> },
  ];

  const RIGHTS = [
    { title: "Equal Pay", desc: "Right to equal remuneration for same work without discrimination." },
    { title: "Maternity Relief", desc: "Paid leave and job protection during and after pregnancy." },
    { title: "Protection from Harassment", desc: "Right to a safe workplace under the POSH Act." },
    { title: "Free Legal Aid", desc: "Right to demand free legal aid from the State." },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 px-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ShieldAlert className="text-red-500" size={24} /> Safety & Legal
          </h1>
          <p className="text-gray-500 text-sm">Know your rights and access immediate help.</p>
        </div>

        {/* SOS Button */}
        <motion.a 
          href="tel:112"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-2 border-red-500 rounded-3xl p-6 text-center shadow-lg shadow-red-500/10 mb-8 block hover:bg-red-50 transition-colors"
        >
          <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-[0_0_0_8px_rgba(239,68,68,0.2)]">
            <Phone size={36} fill="currentColor" />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Emergency SOS</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-xs mx-auto">Tap the button above to immediately call your local emergency services.</p>
        </motion.a>

        {/* Helplines */}
        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Quick Helplines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {HELPLINES.map((line) => (
            <a href={`tel:${line.number}`} key={line.number} className="bg-red-50 p-4 rounded-2xl flex items-center gap-4 border border-red-100 hover:bg-red-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shrink-0 shadow-sm">
                {line.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-red-600 font-bold uppercase mb-0.5">{line.title}</p>
                <p className="text-2xl font-black text-gray-900">{line.number}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Rights Info */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <Scale className="text-brand-purple" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Know Your Rights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RIGHTS.map((right, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookHeart size={18} className="text-brand-purple" />
                <h3 className="font-bold text-gray-900">{right.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{right.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
