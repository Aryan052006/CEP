"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome_tagline: "Empowering Women Through Skills & Opportunities",
    register: "Register",
    login: "Login",
    home_title: "Namaste",
    schemes: "Government Schemes",
    skills: "Skill Recommendations",
    mentors: "Connect with Mentors",
    products: "Showcase My Products",
    apply_now: "Apply Now",
    // Base keys to demonstrate i18n readiness
  },
  hi: {
    welcome_tagline: "कौशल और अवसरों के माध्यम से महिलाओं को सशक्त बनाना",
    register: "पंजीकरण करें",
    login: "लॉग इन करें",
    home_title: "नमस्ते",
    schemes: "सरकारी योजनाएं",
    skills: "कौशल सिफारिशें",
    mentors: "मेंटर से जुड़ें",
    products: "अपने उत्पाद दिखाएं",
    apply_now: "अभी आवेदन करें",
  },
  mr: {
    welcome_tagline: "कौशल्य आणि संधींद्वारे महिलांचे सक्षमीकरण",
    register: "नोंदणी करा",
    login: "लॉग इन करा",
    home_title: "नमस्ते",
    schemes: "सरकारी योजना",
    skills: "कौशल्य शिफारसी",
    mentors: "मार्गदर्शकांशी कनेक्ट व्हा",
    products: "उत्पादने प्रदर्शित करा",
    apply_now: "आता अर्ज करा",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("saheli-language") as Language;
    if (saved && ["en", "hi", "mr"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("saheli-language", lang);
  };

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
