
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ra' | 'bn';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    "app.title": "Mediseva",
    "app.slogan": "Healthcare Platform",
    
    // Navigation
    "nav.home": "Home",
    "nav.findDoctors": "Find Doctors",
    "nav.appointments": "Appointments",
    "nav.emergency": "Emergency",
    "nav.internships": "Internships",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.register": "Register",
    
    // Find Doctors Page
    "doctors.title": "Find the Right Doctor",
    "doctors.subtitle": "Search from our network of qualified healthcare professionals",
    "doctors.searchPlaceholder": "Search by doctor name, specialty, or hospital...",
    "doctors.selectSpecialty": "Select specialty",
    "doctors.selectState": "Select state",
    "doctors.selectCity": "Select city",
    "doctors.search": "Search Doctors",
    "doctors.found": "Doctors Found",
    "doctors.doctor": "Doctor",
    "doctors.doctors": "Doctors",
    "doctors.filters": "Filters",
    "doctors.viewProfile": "View Profile",
    "doctors.bookAppointment": "Book Appointment",
    "doctors.noResults": "No doctors found matching your criteria",
    "doctors.clearFilters": "Clear Filters",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  },
  hi: {
    // General
    "app.title": "मेडीसेवा",
    "app.slogan": "स्वास्थ्य सेवा प्लेटफार्म",
    
    // Navigation
    "nav.home": "होम",
    "nav.findDoctors": "डॉक्टर खोजें",
    "nav.appointments": "अपॉइंटमेंट",
    "nav.emergency": "आपातकाल",
    "nav.internships": "इंटर्नशिप",
    "nav.about": "हमारे बारे में",
    "nav.login": "लॉग इन",
    "nav.register": "रजिस्टर",
    
    // Find Doctors Page
    "doctors.title": "सही डॉक्टर खोजें",
    "doctors.subtitle": "योग्य स्वास्थ्य पेशेवरों के हमारे नेटवर्क से खोजें",
    "doctors.searchPlaceholder": "डॉक्टर के नाम, विशेषज्ञता या अस्पताल से खोजें...",
    "doctors.selectSpecialty": "विशेषज्ञता चुनें",
    "doctors.selectState": "राज्य चुनें",
    "doctors.selectCity": "शहर चुनें",
    "doctors.search": "डॉक्टर खोजें",
    "doctors.found": "डॉक्टर मिले",
    "doctors.doctor": "डॉक्टर",
    "doctors.doctors": "डॉक्टर्स",
    "doctors.filters": "फ़िल्टर्स",
    "doctors.viewProfile": "प्रोफ़ाइल देखें",
    "doctors.bookAppointment": "अपॉइंटमेंट बुक करें",
    "doctors.noResults": "आपके मापदंडों से मेल खाने वाले कोई डॉक्टर नहीं मिले",
    "doctors.clearFilters": "फ़िल्टर्स साफ़ करें",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  },
  mr: {
    // General
    "app.title": "मेडीसेवा",
    "app.slogan": "आरोग्य सेवा प्लॅटफॉर्म",
    
    // Navigation
    "nav.home": "मुख्यपृष्ठ",
    "nav.findDoctors": "डॉक्टर शोधा",
    "nav.appointments": "अपॉइंटमेंट",
    "nav.emergency": "आपत्कालीन",
    "nav.internships": "इंटर्नशिप",
    "nav.about": "आमच्याबद्दल",
    "nav.login": "लॉग इन",
    "nav.register": "नोंदणी करा",
    
    // Find Doctors Page
    "doctors.title": "योग्य डॉक्टर शोधा",
    "doctors.subtitle": "आमच्या प्रशिक्षित आरोग्य व्यावसायिकांच्या नेटवर्कमधून शोधा",
    "doctors.searchPlaceholder": "डॉक्टरचे नाव, विशेषज्ञता किंवा रुग्णालयानुसार शोधा...",
    "doctors.selectSpecialty": "विशेषज्ञता निवडा",
    "doctors.selectState": "राज्य निवडा",
    "doctors.selectCity": "शहर निवडा",
    "doctors.search": "डॉक्टर शोधा",
    "doctors.found": "डॉक्टर सापडले",
    "doctors.doctor": "डॉक्टर",
    "doctors.doctors": "डॉक्टर्स",
    "doctors.filters": "फिल्टर्स",
    "doctors.viewProfile": "प्रोफाईल पहा",
    "doctors.bookAppointment": "अपॉइंटमेंट बुक करा",
    "doctors.noResults": "तुमच्या निकषांशी जुळणारे कोणतेही डॉक्टर सापडले नाहीत",
    "doctors.clearFilters": "फिल्टर्स साफ करा",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  },
  gu: {
    // General
    "app.title": "મેડીસેવા",
    "app.slogan": "આરોગ્ય સેવા પ્લેટફોર્મ",
    
    // Navigation
    "nav.home": "હોમ",
    "nav.findDoctors": "ડોક્ટર શોધો",
    "nav.appointments": "એપોઇન્ટમેન્ટ",
    "nav.emergency": "ઇમરજન્સી",
    "nav.internships": "ઇન્ટર્નશીપ",
    "nav.about": "અમારા વિશે",
    "nav.login": "લોગિન",
    "nav.register": "રજિસ્ટર",
    
    // Find Doctors Page
    "doctors.title": "યોગ્ય ડોક્ટર શોધો",
    "doctors.subtitle": "અમારા કુશળ આરોગ્ય વ્યાવસાયિકોના નેટવર્કમાંથી શોધો",
    "doctors.searchPlaceholder": "ડોક્ટરનું નામ, વિશેષતા અથવા હોસ્પિટલ દ્વારા શોધો...",
    "doctors.selectSpecialty": "વિશેષતા પસંદ કરો",
    "doctors.selectState": "રાજ્ય પસંદ કરો",
    "doctors.selectCity": "શહેર પસંદ કરો",
    "doctors.search": "ડોક્ટર શોધો",
    "doctors.found": "ડોક્ટર મળ્યા",
    "doctors.doctor": "ડોક્ટર",
    "doctors.doctors": "ડોક્ટર્સ",
    "doctors.filters": "ફિલ્ટર્સ",
    "doctors.viewProfile": "પ્રોફાઇલ જુઓ",
    "doctors.bookAppointment": "એપોઇન્ટમેન્ટ બુક કરો",
    "doctors.noResults": "તમારા માપદંડોને અનુરૂપ કોઈ ડોક્ટર મળ્યા નથી",
    "doctors.clearFilters": "ફિલ્ટર્સ સાફ કરો",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  },
  ra: {
    // General
    "app.title": "मेडीसेवा",
    "app.slogan": "स्वास्थ्य सेवा प्लेटफॉर्म",
    
    // Navigation
    "nav.home": "होम",
    "nav.findDoctors": "डॉक्टर खोजो",
    "nav.appointments": "अपॉइंटमेंट",
    "nav.emergency": "इमरजेंसी",
    "nav.internships": "इंटर्नशिप",
    "nav.about": "म्हारे बारे में",
    "nav.login": "लॉग इन",
    "nav.register": "रजिस्टर",
    
    // Find Doctors Page
    "doctors.title": "सही डॉक्टर खोजो",
    "doctors.subtitle": "म्हारे योग्य स्वास्थ्य पेशेवरां रे नेटवर्क में से खोजो",
    "doctors.searchPlaceholder": "डॉक्टर रे नाम, विशेषज्ञता या अस्पताल से खोजो...",
    "doctors.selectSpecialty": "विशेषज्ञता चुणो",
    "doctors.selectState": "राज्य चुणो",
    "doctors.selectCity": "शहर चुणो",
    "doctors.search": "डॉक्टर खोजो",
    "doctors.found": "डॉक्टर मिल्या",
    "doctors.doctor": "डॉक्टर",
    "doctors.doctors": "डॉक्टर्स",
    "doctors.filters": "फ़िल्टर्स",
    "doctors.viewProfile": "प्रोफ़ाइल देखो",
    "doctors.bookAppointment": "अपॉइंटमेंट बुक करो",
    "doctors.noResults": "थांरे मापदंडां से मेल खाने वाला कोई डॉक्टर कोनी मिल्या",
    "doctors.clearFilters": "फ़िल्टर्स साफ़ करो",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  },
  bn: {
    // General
    "app.title": "মেডিসেবা",
    "app.slogan": "স্বাস্থ্যসেবা প্ল্যাটফর্ম",
    
    // Navigation
    "nav.home": "হোম",
    "nav.findDoctors": "ডাক্তার খুঁজুন",
    "nav.appointments": "অ্যাপয়েন্টমেন্ট",
    "nav.emergency": "জরুরি সেবা",
    "nav.internships": "ইন্টার্নশিপ",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.login": "লগইন",
    "nav.register": "রেজিস্টার",
    
    // Find Doctors Page
    "doctors.title": "সঠিক ডাক্তার খুঁজুন",
    "doctors.subtitle": "আমাদের যোগ্য স্বাস্থ্য পেশাদারদের নেটওয়ার্ক থেকে অনুসন্ধান করুন",
    "doctors.searchPlaceholder": "ডাক্তারের নাম, বিশেষজ্ঞতা বা হাসপাতাল দ্বারা অনুসন্ধান করুন...",
    "doctors.selectSpecialty": "বিশেষজ্ঞতা নির্বাচন করুন",
    "doctors.selectState": "রাজ্য নির্বাচন করুন",
    "doctors.selectCity": "শহর নির্বাচন করুন",
    "doctors.search": "ডাক্তার খুঁজুন",
    "doctors.found": "ডাক্তার পাওয়া গেছে",
    "doctors.doctor": "ডাক্তার",
    "doctors.doctors": "ডাক্তারগণ",
    "doctors.filters": "ফিল্টার",
    "doctors.viewProfile": "প্রোফাইল দেখুন",
    "doctors.bookAppointment": "অ্যাপয়েন্টমেন্ট বুক করুন",
    "doctors.noResults": "আপনার মানদণ্ড অনুযায়ী কোনো ডাক্তার পাওয়া যায়নি",
    "doctors.clearFilters": "ফিল্টার পরিষ্কার করুন",
    
    // Languages
    "language.en": "English",
    "language.hi": "हिन्दी (Hindi)",
    "language.mr": "मराठी (Marathi)",
    "language.gu": "ગુજરાતી (Gujarati)",
    "language.ra": "राजस्थानी (Rajasthani)",
    "language.bn": "বাংলা (Bengali)",
  }
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('mediseva_language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('mediseva_language', language);
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
