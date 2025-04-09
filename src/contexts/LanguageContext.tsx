import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ra' | 'bn' | 'ta' | 'te';

// Create interface for context value
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
}

// Define translations structure
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create context with default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoaded: false,
});

// Define provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Common translations for all languages
const commonTranslations = {
  // Login related
  "login.title": "Sign In",
  "login.subtitle": "Welcome back to Mediseva",
  "login.email": "Email",
  "login.password": "Password",
  "login.forgotPassword": "Forgot password?",
  "login.signIn": "Sign In",
  "login.signingIn": "Signing In...",
  "login.noAccount": "Don't have an account?",
  "login.register": "Register",
  "login.backToHome": "Back to Home",
  "auth.loginSuccess": "Login successful",
  
  // Common elements
  "common.loading": "Loading",
  "common.pageLoading": "Loading page",
  "auth.checking": "Checking authentication",
};

// English translations
const enTranslations = {
  "app.title": "Mediseva",
  "nav.home": "Home",
  "nav.findDoctors": "Find Doctors",
  "nav.about": "About Us",
  "nav.appointments": "Appointments",
  "nav.emergency": "Emergency",
  "nav.clinicalExposure": "Clinical Exposure",
  "nav.login": "Login",
  "nav.register": "Register",
  "hero.tagline": "Healthcare at your fingertips",
  "hero.title": "Your Health, Our",
  "hero.titleHighlight": "Priority",
  "hero.subtitle": "Connect with verified doctors for consultations, appointments, and emergency services",
  "hero.easyBooking": "Easy Booking",
  "hero.fastConvenient": "Fast & Convenient",
  "hero.qualityDoctors": "Quality Doctors",
  "hero.verifiedSpecialists": "Verified Specialists",
  "hero.service24_7": "24/7 Service",
  "hero.alwaysAvailable": "Always Available",
  "hero.findDoctor": "Find a Doctor",
  "hero.selectSpecialty": "Select specialty",
  "hero.doctorNameOrLocation": "Doctor name or location",
  "hero.search": "Search",
  "hero.emergencyAssistance": "Emergency Assistance",
  "hero.trustedBy": "Trusted by",
  "hero.patients": "patients",
  "hero.availableDoctors": "Available Doctors",
  "doctors.title": "Find the Best Doctors",
  "doctors.subtitle": "Search for specialists in your area and book appointments instantly",
  "doctors.searchPlaceholder": "Search by doctor name or keyword",
  "doctors.selectSpecialty": "All Specialties",
  "doctors.selectState": "All States",
  "doctors.selectCity": "All Cities",
  "doctors.search": "Search",
  "doctors.doctor": "Doctor",
  "doctors.doctors": "Doctors",
  "doctors.found": "Found",
  "doctors.filters": "Filters",
  "doctors.noResults": "No doctors found matching your criteria",
  "doctors.clearFilters": "Clear Filters",
  "doctors.viewProfile": "View Profile",
  "doctors.bookAppointment": "Book Appointment",
  "doctors.about": "About",
  "doctors.education": "Education",
  "doctors.languages": "Languages",
  "doctors.languagesSpoken": "Languages Spoken",
  "doctors.profile": "Doctor Profile",
  "doctors.scheduleWith": "Schedule an appointment with",
  "doctors.selectDate": "Select Date",
  "doctors.selectTimeSlot": "Select Time Slot",
  "doctors.selectDateFirst": "Please select a date first",
  "common.cancel": "Cancel",
  "doctors.confirmBooking": "Confirm Booking",
  "doctors.bookingConfirmed": "Booking Confirmed!",
  "doctors.appointmentScheduled": "Your appointment with",
  "doctors.scheduledFor": "has been scheduled for",
  "doctors.at": "at",
  "common.close": "Close",
  "doctors.viewAllAppointments": "View All Appointments",
  ...commonTranslations,
  // Language names in native script
  "language.en": "English",
  "language.hi": "हिंदी",
  "language.mr": "मराठी",
  "language.gu": "ગુજરાતી",
  "language.ra": "राजस्थानी",
  "language.bn": "বাংলা",
  "language.ta": "தமிழ்",
  "language.te": "తెలుగు"
};

// Hindi translations
const hiTranslations = {
  "app.title": "मेडिसेवा",
  "nav.home": "होम",
  "nav.findDoctors": "डॉक्टर खोजें",
  "nav.about": "हमारे बारे में",
  "nav.appointments": "अपॉइंटमेंट",
  "nav.emergency": "आपातकालीन",
  "nav.clinicalExposure": "क्लिनिकल एक्सपोज़र",
  "nav.login": "लॉगिन",
  "nav.register": "रजिस्टर",
  "hero.tagline": "आपकी उंगलियों पर स्वास्थ्य सेवा",
  "hero.title": "आपका स्वास्थ्य, हमारी",
  "hero.titleHighlight": "प्राथमिकता",
  "hero.subtitle": "परामर्श, अपॉइंटमेंट और आपातकालीन सेवाओं के लिए प्रमाणित डॉक्टरों से जुड़ें",
  "hero.easyBooking": "आसान बुकिंग",
  "hero.fastConvenient": "तेज़ और सुविधाजनक",
  "hero.qualityDoctors": "गुणवत्तापूर्ण डॉक्टर",
  "hero.verifiedSpecialists": "सत्यापित विशेषज्ञ",
  "hero.service24_7": "24/7 सेवा",
  "hero.alwaysAvailable": "हमेशा उपलब्ध",
  "hero.findDoctor": "डॉक्टर खोजें",
  "hero.selectSpecialty": "विशेषज्ञता चुनें",
  "hero.doctorNameOrLocation": "डॉक्टर का नाम या स्थान",
  "hero.search": "खोजें",
  "hero.emergencyAssistance": "आपातकालीन सहायता",
  "hero.trustedBy": "इन पर विश्वास",
  "hero.patients": "मरीज़",
  "hero.availableDoctors": "उपलब्ध डॉक्टर",
  "doctors.title": "सर्वश्रेष्ठ डॉक्टरों को खोजें",
  "doctors.subtitle": "अपने क्षेत्र में विशेषज्ञों की खोज करें और तुरंत अपॉइंटमेंट बुक करें",
  "doctors.searchPlaceholder": "डॉक्टर के नाम या कीवर्ड से खोजें",
  "doctors.selectSpecialty": "सभी विशेषज्ञताएँ",
  "doctors.selectState": "सभी राज्य",
  "doctors.selectCity": "सभी शहर",
  "doctors.search": "खोजें",
  "doctors.doctor": "डॉक्टर",
  "doctors.doctors": "डॉक्टर",
  "doctors.found": "मिले",
  "doctors.filters": "फिल्टर",
  "doctors.noResults": "आपके मापदंडों से मेल खाने वाले कोई डॉक्टर नहीं मिले",
  "doctors.clearFilters": "फिल्टर साफ़ करें",
  "doctors.viewProfile": "प्रोफाइल देखें",
  "doctors.bookAppointment": "अपॉइंटमेंट बुक करें",
  "login.title": "साइन इन",
  "login.subtitle": "मेडिसेवा में आपका स्वागत है",
  "login.email": "ईमेल",
  "login.password": "पासवर्ड",
  "login.forgotPassword": "पासवर्ड भूल गए?",
  "login.signIn": "साइन इन",
  "login.signingIn": "साइन इन हो रहा है...",
  "login.noAccount": "खाता नहीं है?",
  "login.register": "रजिस्टर",
  "login.backToHome": "होम पेज पर वापस जाएं",
  "auth.loginSuccess": "लॉगिन सफल",
  "common.loading": "लोड हो रहा है",
  "common.pageLoading": "पेज लोड हो रहा है",
  "auth.checking": "प्रमाणीकरण की जांच हो रही है",
  // Language names in native script - reuse these across translations
  "language.en": "English",
  "language.hi": "हिंदी",
  "language.mr": "मराठी",
  "language.gu": "ગુજરાતી",
  "language.ra": "राजस्थानी",
  "language.bn": "বাংলা",
  "language.ta": "தமிழ்",
  "language.te": "తెలుగు"
};

// Base for other Indic language translations (using English as fallback with native language names)
const createBaseTranslation = () => {
  return {
    ...enTranslations,
    // Keep language names in native script the same across all translations
    "language.en": "English",
    "language.hi": "हिंदी",
    "language.mr": "मराठी",
    "language.gu": "ગુજરાતી",
    "language.ra": "राजस्थानी",
    "language.bn": "বাংলা",
    "language.ta": "தமிழ்",
    "language.te": "తెలుగు"
  };
};

// Create base translations for each language
const mrTranslations = createBaseTranslation(); // Marathi
const guTranslations = createBaseTranslation(); // Gujarati
const raTranslations = createBaseTranslation(); // Rajasthani
const bnTranslations = createBaseTranslation(); // Bengali
const taTranslations = createBaseTranslation(); // Tamil
const teTranslations = createBaseTranslation(); // Telugu

// All translations
const translations: Translations = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
  gu: guTranslations,
  ra: raTranslations,
  bn: bnTranslations,
  ta: taTranslations,
  te: teTranslations
};

// Create provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language;
      return storedLanguage || 'en';
    }
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isLoaded, setIsLoaded] = useState(false);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Short timeout to simulate language loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Dispatch storage event for other components to detect language change
      window.dispatchEvent(new Event('storage'));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    try {
      // First try to get the translation for the current language
      const translation = translations[language][key];
      if (translation) return translation;
      
      // If not found, fall back to English
      if (language !== 'en') {
        const fallback = translations['en'][key];
        if (fallback) return fallback;
      }
      
      // If still not found, return the key itself
      return key;
    } catch (error) {
      console.error(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
