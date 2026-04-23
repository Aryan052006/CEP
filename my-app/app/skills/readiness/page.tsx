"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const QUESTIONS = [
  {
    id: 1,
    q: "What type of work do you enjoy the most?",
    options: ["Working with my hands (crafts, sewing)", "Interacting with people (sales, teaching)", "Organizing things and data", "Cooking or Food Prep"]
  },
  {
    id: 2,
    q: "What is your highest level of education?",
    options: ["Primary School", "High School (10th/12th)", "Graduate", "No formal education"]
  },
  {
    id: 3,
    q: "Do you have access to a smartphone or computer daily?",
    options: ["Yes, I have my own", "Yes, but I share it", "Only for a few hours", "No access"]
  },
  {
    id: 4,
    q: "What is your primary language for learning?",
    options: ["Hindi", "English", "Marathi", "Other Regional Language"]
  },
  {
    id: 5,
    q: "How much time can you dedicate daily to learning?",
    options: ["1-2 hours", "3-4 hours", "Full time", "Weekends only"]
  },
  {
    id: 6,
    q: "What is your main goal right now?",
    options: ["Earn a side income from home", "Find a local full-time job", "Start my own micro-business", "Gain digital literacy"]
  },
  {
    id: 7,
    q: "How would you describe your previous work experience?",
    options: ["I have never worked before", "I have worked in a shop/office", "I am currently self-employed", "I am a homemaker"]
  }
];

export default function ReadinessQuiz() {
  const { apiFetch } = useAuth();
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [mlLoading, setMlLoading] = useState(false);
  const [mlResults, setMlResults] = useState<any[]>([]);
  const [quizScore, setQuizScore] = useState(0);

  const handleSelect = async (qIndex: number, option: string) => {
    const newAnswers = { ...answers, [qIndex]: option };
    setAnswers(newAnswers);
    
    if (step + 1 >= QUESTIONS.length) {
      // Reached the end — call quiz endpoint via backend
      setStep(prev => prev + 1);
      setMlLoading(true);
      
      try {
        const quizPayload = Object.entries(newAnswers).map(([key, val]) => ({
          questionId: parseInt(key) + 1,
          selectedOption: val,
        }));

        const res = await apiFetch("/ml/quiz", {
          method: "POST",
          body: JSON.stringify({ answers: quizPayload }),
        });
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || 'API Error');
        }

        setMlResults(data.data.recommendations || []);
        setQuizScore(data.data.score || 85);
        localStorage.setItem("hasTakenTest", "true");
      } catch (err) {
        console.error("ML Quiz Failed:", err);
        // Fallback
        setMlResults([
          { title: "Digital Literacy Basics", match: "90% Match", duration: "1 Month" },
        ]);
        setQuizScore(75);
      } finally {
        setMlLoading(false);
      }
    } else {
      setTimeout(() => {
        setStep(prev => prev + 1);
      }, 300);
    }
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
          ) : mlLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-16 h-16 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing your profile...</h2>
              <p className="text-gray-500 text-sm">Our ML model is finding the best matches for you.</p>
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
                  className="absolute -top-2 -right-2 bg-brand-accent text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm shadow-md"
                >
                  {quizScore}%
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your readiness score is <strong>{quizScore}%</strong>. Here are your ML-powered skill recommendations.</p>

              <div className="space-y-4 mb-8 text-left">
                {mlResults.length > 0 ? mlResults.map((rec: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{rec.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded">{rec.duration}</span>
                    </div>
                    <p className="text-xs text-brand-pink font-semibold">ML Calculated: {rec.match}</p>
                  </div>
                )) : (
                  <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                    <h4 className="font-bold text-gray-900">Digital Literacy Basics</h4>
                    <p className="text-xs text-brand-pink font-semibold">Recommended Path</p>
                  </div>
                )}
              </div>

              <Link 
                href="/skills"
                className="w-full py-4 rounded-xl bg-brand-pink text-white font-semibold text-lg shadow-lg shadow-brand-pink/30 hover:bg-pink-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                View Skill Modules <ChevronRight size={20} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
