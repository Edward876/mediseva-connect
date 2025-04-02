
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("mediseva_language");
    return savedLang || "en";
  });

  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({
    en: {},
    hi: {},
    mr: {},
    gu: {},
    ra: {},
    bn: {},
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("mediseva_language", language);
  }, [language]);

  // Basic translations
  useEffect(() => {
    setTranslations({
      en: {
        // App general
        "app.title": "MediSeva",
        "common.loading": "Loading",
        "common.error": "Error",
        "common.success": "Success",

        // Navigation
        "nav.home": "Home",
        "nav.findDoctors": "Find Doctors",
        "nav.appointments": "Appointments",
        "nav.emergency": "Emergency",
        "nav.clinicalExposure": "Clinical Exposure",
        "nav.about": "About",
        "nav.login": "Login",
        "nav.register": "Register",
        "nav.profile": "Profile",
        "nav.settings": "Settings",

        // Auth
        "auth.logout": "Logout",
        "auth.logoutSuccess": "You have been logged out successfully",
        "auth.profile": "Profile",
        "auth.myAppointments": "My Appointments",
        "auth.settings": "Settings",
        "auth.checking": "Checking authentication status",
        "auth.requiresLogin": "This page requires you to be logged in",
        "auth.redirecting": "Redirecting to login page",
        "auth.loginSuccess": "Login successful",

        // Login page
        "login.title": "Log In",
        "login.subtitle": "Welcome back! Please enter your details.",
        "login.email": "Email",
        "login.password": "Password",
        "login.forgotPassword": "Forgot password?",
        "login.signIn": "Sign In",
        "login.signingIn": "Signing In...",
        "login.noAccount": "Don't have an account?",
        "login.register": "Register",
        "login.backToHome": "Back to Home",

        // Hero section
        "hero.tagline": "Your Health, Our Priority",
        "hero.title": "Find the Right Doctor,",
        "hero.titleHighlight": "Right Now",
        "hero.subtitle": "Connect with specialized doctors, book appointments effortlessly, and receive quality healthcare tailored to your needs.",
        "hero.easyBooking": "Easy Booking",
        "hero.fastConvenient": "Fast & convenient",
        "hero.qualityDoctors": "Quality Doctors",
        "hero.verifiedSpecialists": "Verified specialists",
        "hero.service24_7": "24/7 Service",
        "hero.alwaysAvailable": "Always available",
        "hero.findDoctor": "Find Your Doctor Now",
        "hero.selectSpecialty": "Select specialty",
        "hero.doctorNameOrLocation": "Doctor name or location",
        "hero.search": "Search",
        "hero.emergencyAssistance": "Need Emergency Assistance?",
        "hero.trustedBy": "Trusted by",
        "hero.patients": "patients",
        "hero.availableDoctors": "Available doctors",

        // Clinical exposure section
        "clinicalExposure.title": "Clinical Exposure",
        "clinicalExposure.heading": "Launch Your Medical Career with Valuable Clinical Experience",
        "clinicalExposure.description": "Mediseva connects medical students with experienced doctors for clinical exposure opportunities. Gain practical experience, build your network, and advance your healthcare career.",
        "clinicalExposure.handsOnLearning": "Hands-on Learning",
        "clinicalExposure.handsOnDescription": "Gain practical experience working alongside experienced medical professionals.",
        "clinicalExposure.flexibleSchedules": "Flexible Schedules",
        "clinicalExposure.flexibleDescription": "Clinical exposure opportunities with schedules that accommodate your academic commitments.",
        "clinicalExposure.certification": "Certification",
        "clinicalExposure.certificationDescription": "Receive official certification upon completion to enhance your medical career.",
        "clinicalExposure.browsePrograms": "Browse Programs",
        "clinicalExposure.applyViaEmail": "Apply via Email",
        "clinicalExposure.availablePrograms": "Available Programs",
        "clinicalExposure.specialties": "Specialties",

        // Profile page
        "profile.title": "User Profile",
        "profile.patient": "Patient",
        "profile.doctor": "Doctor",
        "profile.editProfile": "Edit Profile",
        "profile.appointments": "Appointments",
        "profile.history": "History",
        "profile.upcomingAppointments": "Upcoming Appointments",
        "profile.manageAppointments": "View and manage your scheduled appointments",
        "profile.noUpcomingAppointments": "You don't have any upcoming appointments",
        "profile.findDoctors": "Find Doctors",
        "profile.medicalHistory": "Medical History",
        "profile.pastAppointments": "Your past appointments and medical records",
        "profile.noAppointmentHistory": "No appointment history found",
        "profile.notLoggedIn": "You are not logged in",
        "profile.loginNow": "Login Now",

        // Settings page
        "settings.title": "Settings",
        "settings.profile": "Profile",
        "settings.account": "Account",
        "settings.appearance": "Appearance",
        "settings.profileSettings": "Profile Settings",
        "settings.updateProfileInfo": "Update your profile information",
        "settings.fullName": "Full Name",
        "settings.email": "Email",
        "settings.phone": "Phone Number",
        "settings.updateProfile": "Update Profile",
        "settings.accountSettings": "Account Settings",
        "settings.manageAccount": "Manage your account settings",
        "settings.changePassword": "Change Password",
        "settings.passwordDescription": "Update your password for enhanced security",
        "settings.dangerZone": "Danger Zone",
        "settings.deleteAccountWarning": "Once you delete your account, there is no going back. Please be certain.",
        "settings.deleteAccount": "Delete Account",
        "settings.profileUpdated": "Profile Updated",
        "settings.profileUpdateSuccess": "Your profile has been updated successfully",
        "settings.language": "Language",
        "settings.languageDescription": "Choose your preferred language for the application",
        "settings.theme": "Theme",
        "settings.themeDescription": "Choose between light and dark mode",
      },
      hi: {
        // App general
        "app.title": "मेडिसेवा",
        "common.loading": "लोड हो रहा है",
        "common.error": "त्रुटि",
        "common.success": "सफलता",

        // Navigation
        "nav.home": "होम",
        "nav.findDoctors": "डॉक्टर खोजें",
        "nav.appointments": "अपॉइंटमेंट",
        "nav.emergency": "आपातकालीन",
        "nav.clinicalExposure": "क्लिनिकल एक्सपोजर",
        "nav.about": "हमारे बारे में",
        "nav.login": "लॉगिन",
        "nav.register": "रजिस्टर",
        "nav.profile": "प्रोफाइल",
        "nav.settings": "सेटिंग्स",

        // Auth
        "auth.logout": "लॉगआउट",
        "auth.logoutSuccess": "आप सफलतापूर्वक लॉग आउट हो गए हैं",
        "auth.profile": "प्रोफाइल",
        "auth.myAppointments": "मेरे अपॉइंटमेंट",
        "auth.settings": "सेटिंग्स",
        "auth.checking": "प्रमाणीकरण की स्थिति की जांच",
        "auth.requiresLogin": "इस पेज के लिए आपको लॉग इन करना होगा",
        "auth.redirecting": "लॉगिन पेज पर रीडायरेक्ट किया जा रहा है",
        "auth.loginSuccess": "लॉगिन सफल",

        // Login page
        "login.title": "लॉग इन",
        "login.subtitle": "वापस आने पर स्वागत है! कृपया अपना विवरण दर्ज करें।",
        "login.email": "ईमेल",
        "login.password": "पासवर्ड",
        "login.forgotPassword": "पासवर्ड भूल गए?",
        "login.signIn": "साइन इन",
        "login.signingIn": "साइन इन हो रहा है...",
        "login.noAccount": "अकाउंट नहीं है?",
        "login.register": "रजिस्टर",
        "login.backToHome": "होम पेज पर वापस",

        // Hero section
        "hero.tagline": "आपका स्वास्थ्य, हमारी प्राथमिकता",
        "hero.title": "सही डॉक्टर खोजें,",
        "hero.titleHighlight": "अभी",
        "hero.subtitle": "विशेषज्ञ डॉक्टरों से जुड़ें, आसानी से अपॉइंटमेंट बुक करें, और अपनी आवश्यकताओं के अनुसार गुणवत्तापूर्ण स्वास्थ्य देखभाल प्राप्त करें।",
        "hero.easyBooking": "आसान बुकिंग",
        "hero.fastConvenient": "तेज और सुविधाजनक",
        "hero.qualityDoctors": "गुणवत्तापूर्ण डॉक्टर",
        "hero.verifiedSpecialists": "सत्यापित विशेषज्ञ",
        "hero.service24_7": "24/7 सेवा",
        "hero.alwaysAvailable": "हमेशा उपलब्ध",
        "hero.findDoctor": "अपना डॉक्टर अभी खोजें",
        "hero.selectSpecialty": "विशेषज्ञता चुनें",
        "hero.doctorNameOrLocation": "डॉक्टर का नाम या स्थान",
        "hero.search": "खोजें",
        "hero.emergencyAssistance": "आपातकालीन सहायता चाहिए?",
        "hero.trustedBy": "इनका विश्वास",
        "hero.patients": "रोगी",
        "hero.availableDoctors": "उपलब्ध डॉक्टर",

        // Clinical exposure section
        "clinicalExposure.title": "क्लिनिकल एक्सपोजर",
        "clinicalExposure.heading": "मूल्यवान क्लिनिकल अनुभव के साथ अपना चिकित्सा करियर शुरू करें",
        "clinicalExposure.description": "मेडिसेवा मेडिकल छात्रों को अनुभवी डॉक्टरों के साथ क्लिनिकल एक्सपोजर के अवसर प्रदान करता है। व्यावहारिक अनुभव प्राप्त करें, अपना नेटवर्क बनाएं, और अपने स्वास्थ्य देखभाल करियर को आगे बढ़ाएं।",
        "clinicalExposure.handsOnLearning": "व्यावहारिक सीखना",
        "clinicalExposure.handsOnDescription": "अनुभवी चिकित्सा पेशेवरों के साथ काम करके व्यावहारिक अनुभव प्राप्त करें।",
        "clinicalExposure.flexibleSchedules": "लचीली समय-सारणी",
        "clinicalExposure.flexibleDescription": "आपकी शैक्षणिक प्रतिबद्धताओं के अनुकूल क्लिनिकल एक्सपोजर के अवसर।",
        "clinicalExposure.certification": "प्रमाणन",
        "clinicalExposure.certificationDescription": "पूरा होने पर आधिकारिक प्रमाणपत्र प्राप्त करें जो आपके चिकित्सा करियर को बढ़ावा देगा।",
        "clinicalExposure.browsePrograms": "प्रोग्राम ब्राउज़ करें",
        "clinicalExposure.applyViaEmail": "ईमेल के माध्यम से आवेदन करें",
        "clinicalExposure.availablePrograms": "उपलब्ध प्रोग्राम",
        "clinicalExposure.specialties": "विशेषज्ञताएं",

        // Profile page
        "profile.title": "उपयोगकर्ता प्रोफाइल",
        "profile.patient": "मरीज़",
        "profile.doctor": "डॉक्टर",
        "profile.editProfile": "प्रोफाइल संपादित करें",
        "profile.appointments": "अपॉइंटमेंट",
        "profile.history": "इतिहास",
        "profile.upcomingAppointments": "आगामी अपॉइंटमेंट",
        "profile.manageAppointments": "अपने निर्धारित अपॉइंटमेंट देखें और प्रबंधित करें",
        "profile.noUpcomingAppointments": "आपके पास कोई आगामी अपॉइंटमेंट नहीं है",
        "profile.findDoctors": "डॉक्टर खोजें",
        "profile.medicalHistory": "चिकित्सा इतिहास",
        "profile.pastAppointments": "आपके पिछले अपॉइंटमेंट और चिकित्सा रिकॉर्ड",
        "profile.noAppointmentHistory": "कोई अपॉइंटमेंट इतिहास नहीं मिला",
        "profile.notLoggedIn": "आप लॉग इन नहीं हैं",
        "profile.loginNow": "अभी लॉगिन करें",

        // Settings page
        "settings.title": "सेटिंग्स",
        "settings.profile": "प्रोफाइल",
        "settings.account": "अकाउंट",
        "settings.appearance": "दिखावट",
        "settings.profileSettings": "प्रोफाइल सेटिंग्स",
        "settings.updateProfileInfo": "अपनी प्रोफाइल जानकारी अपडेट करें",
        "settings.fullName": "पूरा नाम",
        "settings.email": "ईमेल",
        "settings.phone": "फोन नंबर",
        "settings.updateProfile": "प्रोफाइल अपडेट करें",
        "settings.accountSettings": "अकाउंट सेटिंग्स",
        "settings.manageAccount": "अपने अकाउंट सेटिंग्स प्रबंधित करें",
        "settings.changePassword": "पासवर्ड बदलें",
        "settings.passwordDescription": "बेहतर सुरक्षा के लिए अपना पासवर्ड अपडेट करें",
        "settings.dangerZone": "खतरे का क्षेत्र",
        "settings.deleteAccountWarning": "एक बार जब आप अपना अकाउंट हटा देते हैं, तो वापस जाने का कोई रास्ता नहीं है। कृपया सुनिश्चित करें।",
        "settings.deleteAccount": "अकाउंट हटाएं",
        "settings.profileUpdated": "प्रोफाइल अपडेट की गई",
        "settings.profileUpdateSuccess": "आपका प्रोफाइल सफलतापूर्वक अपडेट किया गया है",
        "settings.language": "भाषा",
        "settings.languageDescription": "एप्लिकेशन के लिए अपनी पसंदीदा भाषा चुनें",
        "settings.theme": "थीम",
        "settings.themeDescription": "लाइट और डार्क मोड के बीच चयन करें",
      },
      mr: {
        "app.title": "मेडिसेवा",
        // ... similar translations for Marathi
        "nav.home": "मुख्यपृष्ठ",
        "nav.findDoctors": "डॉक्टर शोधा",
        "nav.appointments": "अपॉइंटमेंट",
        "nav.emergency": "आपत्कालीन",
        "nav.clinicalExposure": "क्लिनिकल एक्सपोजर",
        "nav.about": "आमच्याबद्दल",
        "nav.login": "लॉगिन",
        "nav.register": "नोंदणी",
      },
      gu: {
        "app.title": "મેડિસેવા",
        // ... similar translations for Gujarati
        "nav.home": "હોમ",
        "nav.findDoctors": "ડૉક્ટર શોધો",
        "nav.appointments": "એપોઇન્ટમેન્ટ",
        "nav.emergency": "ઇમરજન્સી",
        "nav.clinicalExposure": "ક્લિનિકલ એક્સપોઝર",
        "nav.about": "અમારા વિશે",
        "nav.login": "લૉગિન",
        "nav.register": "રજિસ્ટર",
      },
      ra: {
        "app.title": "मेडिसेवा",
        // ... similar translations for Rajasthani
        "nav.home": "घर",
        "nav.findDoctors": "डॉक्टर खोजो",
        "nav.appointments": "अपॉइंटमेंट",
        "nav.emergency": "आपातकाल",
        "nav.clinicalExposure": "क्लिनिकल एक्सपोजर",
        "nav.about": "हमारे बारे में",
        "nav.login": "लॉगिन",
        "nav.register": "रजिस्टर",
      },
      bn: {
        "app.title": "মেডিসেবা",
        // ... similar translations for Bengali
        "nav.home": "হোম",
        "nav.findDoctors": "ডাক্তার খুঁজুন",
        "nav.appointments": "অ্যাপয়েন্টমেন্ট",
        "nav.emergency": "জরুরী",
        "nav.clinicalExposure": "ক্লিনিকাল এক্সপোজার",
        "nav.about": "আমাদের সম্পর্কে",
        "nav.login": "লগইন",
        "nav.register": "নিবন্ধন",
      },
    });
  }, []);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value = "";

    try {
      // First try to get the translation in the current language
      value = keys.reduce((obj, k) => obj[k], translations[language] as any);
      
      // If translation doesn't exist, fall back to English
      if (!value && language !== "en") {
        value = keys.reduce((obj, k) => obj[k], translations["en"] as any);
      }
      
      // If still no translation, return the key itself
      return value || key;
    } catch (error) {
      // If any error in accessing nested keys, return the key itself
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
