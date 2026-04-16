"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    q: "What type of work do you enjoy the most?",
    options: ["Working with my hands (crafts, sewing)", "Interacting with people (sales, teaching)", "Organizing things and data", "Cooking or Food Prep"]
  },
  {
    id: 2,
    q: "How much time can you dedicate daily to learning?",
    options: ["1-2 hours", "3-4 hours", "Full time", "Weekends only"]
  },
  {
    id: 3,
    q: "What is your main goal right now?",
    options: ["Earn a side income from home", "Find a local full-time job", "Start my own micro-business", "Gain digital literacy"]
  }
];

export default function ReadinessQuiz() {
  const [step, setStep] = useState(0); // 0-based for questions, QUESTIONS.length for results
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qIndex: number, option: string) => {
    setAnswers({ ...answers, [qIndex]: option });
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 300);
  };

  const progress = (step / QUESTIONS.length) * 100;
  const isFinished = step >= QUESTIONS.length;

  return (
    <div className="min-h-screen bg-brand-background flex flex-col pt-6 pb-20 px-4 md:px-8 max-w-3xl mx-auto w-full relative">
      <Link href="/skills" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink mb-6 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </Link>

      {!isFinished && (
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
            <span>Progress</span>
            <span>{step + 1} of {QUESTIONS.length}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-pink"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <span className="inline-block px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-bold rounded-lg mb-4">Question {step + 1}</span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">{QUESTIONS[step].q}</h2>
              
              <div className="space-y-3">
                {QUESTIONS[step].options.map((option, idx) => {
                  const isSelected = answers[step] === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(step, option)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                        isSelected 
                          ? "border-brand-pink bg-brand-pink/5 font-semibold text-brand-pink" 
                          : "border-gray-100 hover:border-brand-pink/30 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <CheckCircle2 size={18} className="text-brand-pink" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative">
                <Sparkles size={40} />
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-2 -right-2 bg-brand-accent text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs shadow-md"
                >
                  95%
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Based on your answers, you have high aptitude for creative and independent work.</p>

              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-left mb-8">
                <h3 className="font-bold text-gray-900 mb-4 px-1">Top Suggested Path</h3>
                <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-4xl">✂️</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Tailoring & Boutique</h4>
                    <p className="text-xs text-brand-pink font-semibold">Perfect for side-income goals</p>
                  </div>
                </div>
              </div>

              <Link 
                href="/skills"
                className="w-full py-4 rounded-xl bg-brand-pink text-white font-semibold text-lg shadow-lg shadow-brand-pink/30 hover:bg-pink-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                View Recommendations <ChevronRight size={20} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
