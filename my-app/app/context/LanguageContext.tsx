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
    ready_to_take_next_step: "Ready to take the next step today?",
    your_progress: "Your Progress",
    level_1_beginner: "Level 1: Beginner",
    explore_services: "Explore Services",
    action_needed: "Action Needed",
    complete_profile: "Complete Profile",
    add_missing_info: "Add missing info to get better scheme recommendations.",
    go: "Go",
    my_profile: "My Profile",
    edit_profile: "Edit Profile",
    saved_schemes: "Saved Schemes & Jobs",
    items_saved: "2 items saved",
    my_applications: "My Applications",
    pending_review: "1 pending review",
    logout: "Logout",
    nav_home: "Home",
    nav_schemes: "Schemes",
    nav_skills: "Skills",
    nav_connect: "Connect",
    nav_profile: "Profile",
    readiness_test: "Readiness Test",
    local_jobs: "Local Jobs",
    safety_legal: "Safety & Legal",
    impact_dashboard: "Impact Dashboard",
    find_schemes: "Find schemes for you",
    start_earning: "Start earning today",
    discover_strengths: "Discover your strengths",
    connect_grow: "Connect & grow",
    showcase_sell: "Showcase & sell",
    opportunities_near: "Opportunities near you",
    know_rights: "Know your rights",
    see_community_progress: "See community progress",
    recommended_for_you: "Recommended for You",
    based_on_profile: "Based on your profile",
    highly_eligible_msg: "you are highly eligible for micro-business loans up to ₹10 Lakhs.",
    discover_schemes: "Discover Schemes",
    search_schemes: "Search schemes or benefits...",
    opens_official_site: "Opens official website in new tab",
    no_schemes_found: "No schemes found",
    try_adjusting: "Try adjusting your search terms",
    go_to_home: "Go to Home",
    in: "in",
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
    ready_to_take_next_step: "क्या आप आज अगला कदम उठाने के लिए तैयार हैं?",
    your_progress: "आपकी प्रगति",
    level_1_beginner: "स्तर 1: शुरुआत",
    explore_services: "सेवाएं खोजें",
    action_needed: "कार्रवाई आवश्यक है",
    complete_profile: "प्रोफ़ाइल पूरी करें",
    add_missing_info: "बेहतर योजनाओं की सिफारिशों के लिए जानकारी जोड़ें।",
    go: "जाएं",
    my_profile: "मेरी प्रोफ़ाइल",
    edit_profile: "प्रोफ़ाइल संपादित करें",
    saved_schemes: "सहेजी गई योजनाएं और नौकरियां",
    items_saved: "2 आइटम सहेजे गए",
    my_applications: "मेरे आवेदन",
    pending_review: "1 समीक्षा लंबित",
    logout: "लॉग आउट करें",
    nav_home: "होम",
    nav_schemes: "योजनाएं",
    nav_skills: "कौशल",
    nav_connect: "जुड़ें",
    nav_profile: "प्रोफ़ाइल",
    readiness_test: "तैयारी परीक्षण",
    local_jobs: "स्थानीय नौकरियां",
    safety_legal: "सुरक्षा और कानूनी",
    impact_dashboard: "प्रभाव डैशबोर्ड",
    find_schemes: "अपने लिए योजनाएं खोजें",
    start_earning: "आज ही कमाना शुरू करें",
    discover_strengths: "अपनी ताकत खोजें",
    connect_grow: "जुड़ें और बढ़ें",
    showcase_sell: "दिखाएं और बेचें",
    opportunities_near: "आपके आस-पास के अवसर",
    know_rights: "अपने अधिकार जानें",
    see_community_progress: "सामुदायिक प्रगति देखें",
    recommended_for_you: "आपके लिए अनुशंसित",
    based_on_profile: "आपकी प्रोफ़ाइल के आधार पर",
    highly_eligible_msg: "आप ₹10 लाख तक के सूक्ष्म व्यवसाय ऋण के लिए अत्यधिक पात्र हैं।",
    discover_schemes: "योजनाएं खोजें",
    search_schemes: "योजनाएं या लाभ खोजें...",
    opens_official_site: "नए टैब में आधिकारिक सरकारी साइट खुलती है",
    no_schemes_found: "कोई योजना नहीं मिली",
    try_adjusting: "अपने खोज शब्दों को समायोजित करने का प्रयास करें",
    go_to_home: "होम पर जाएं",
    in: "में",
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
    ready_to_take_next_step: "आज पुढचे पाऊल टाकण्यास तयार आहात?",
    your_progress: "तुमची प्रगती",
    level_1_beginner: "स्तर १: नवशिक्या",
    explore_services: "सेवा एक्सप्लोर करा",
    action_needed: "कृती आवश्यक आहे",
    complete_profile: "प्रोफाइल पूर्ण करा",
    add_missing_info: "चांगल्या योजनांच्या शिफारसी मिळवण्यासाठी माहिती जोडा.",
    go: "जा",
    my_profile: "माझे प्रोफाईल",
    edit_profile: "प्रोफाइल संपादित करा",
    saved_schemes: "जतन केलेल्या योजना आणि नोकऱ्या",
    items_saved: "२ आयटम जतन केले",
    my_applications: "माझे अर्ज",
    pending_review: "१ पुनरावलोकन प्रलंबित",
    logout: "लॉग आउट करा",
    nav_home: "होम",
    nav_schemes: "योजना",
    nav_skills: "कौशल्ये",
    nav_connect: "कनेक्ट",
    nav_profile: "प्रोफाइल",
    readiness_test: "तयारी चाचणी",
    local_jobs: "स्थानिक नोकऱ्या",
    safety_legal: "सुरक्षा आणि कायदेशीर",
    impact_dashboard: "प्रभाव डॅशबोर्ड",
    find_schemes: "तुमच्यासाठी योजना शोधा",
    start_earning: "आजच कमाई सुरू करा",
    discover_strengths: "तुमची ताकद ओळखा",
    connect_grow: "कनेक्ट व्हा आणि वाढा",
    showcase_sell: "प्रदर्शित करा आणि विका",
    opportunities_near: "तुमच्या जवळील संधी",
    know_rights: "तुमचे अधिकार जाणून घ्या",
    see_community_progress: "समुदायाची प्रगती पहा",
    recommended_for_you: "तुमच्यासाठी शिफारस केलेले",
    based_on_profile: "तुमच्या प्रोफाईलवर आधारित",
    highly_eligible_msg: "तुम्ही ₹10 लाखांपर्यंतच्या सूक्ष्म-व्यवसाय कर्जासाठी अत्यंत पात्र आहात.",
    discover_schemes: "योजना शोधा",
    search_schemes: "योजना किंवा फायदे शोधा...",
    opens_official_site: "नवीन टॅबमध्ये अधिकृत वेबसाइट उघडते",
    no_schemes_found: "कोणत्याही योजना आढळल्या नाहीत",
    try_adjusting: "आपले शोध शब्द समायोजित करण्याचा प्रयत्न करा",
    go_to_home: "मुख्यपृष्ठावर जा",
    in: "मध्ये",
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
