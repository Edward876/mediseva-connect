
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
    
    // Auth
    "auth.profile": "Profile",
    "auth.myAppointments": "My Appointments",
    "auth.settings": "Settings",
    "auth.logout": "Log out",
    "auth.logoutSuccess": "You have been successfully logged out.",
    "auth.loginSuccess": "Welcome back",
    
    // Login Page
    "login.title": "Patient Login",
    "login.subtitle": "Welcome back! Please sign in to your account",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot password?",
    "login.signIn": "Sign in",
    "login.signingIn": "Signing in...",
    "login.noAccount": "Don't have an account?",
    "login.register": "Register now",
    "login.backToHome": "Back to Home",
    
    // Register Page
    "register.title": "Create Patient Account",
    "register.subtitle": "Join Mediseva to access quality healthcare services",
    "register.fullName": "Full Name",
    "register.email": "Email",
    "register.phone": "Phone Number",
    "register.password": "Password",
    "register.confirmPassword": "Confirm Password",
    "register.terms": "I agree to the",
    "register.termsLink": "Terms of Service",
    "register.and": "and",
    "register.privacyLink": "Privacy Policy",
    "register.createAccount": "Create Account",
    "register.creatingAccount": "Creating Account...",
    "register.haveAccount": "Already have an account?",
    "register.signIn": "Sign in",
    "register.backToHome": "Back to Home",
    
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
    
    // Auth
    "auth.profile": "प्रोफाइल",
    "auth.myAppointments": "मेरे अपॉइंटमेंट",
    "auth.settings": "सेटिंग्स",
    "auth.logout": "लॉग आउट",
    "auth.logoutSuccess": "आप सफलतापूर्वक लॉग आउट हो गए हैं।",
    "auth.loginSuccess": "वापसी पर स्वागत है",
    
    // Login Page
    "login.title": "रोगी लॉगिन",
    "login.subtitle": "वापसी पर स्वागत है! कृपया अपने खाते में साइन इन करें",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.forgotPassword": "पासवर्ड भूल गए?",
    "login.signIn": "साइन इन",
    "login.signingIn": "साइन इन हो रहा है...",
    "login.noAccount": "खाता नहीं है?",
    "login.register": "अभी रजिस्टर करें",
    "login.backToHome": "होम पेज पर वापस जाएँ",
    
    // Register Page
    "register.title": "रोगी खाता बनाएँ",
    "register.subtitle": "गुणवत्तापूर्ण स्वास्थ्य सेवाओं का उपयोग करने के लिए मेडीसेवा से जुड़ें",
    "register.fullName": "पूरा नाम",
    "register.email": "ईमेल",
    "register.phone": "फोन नंबर",
    "register.password": "पासवर्ड",
    "register.confirmPassword": "पासवर्ड की पुष्टि",
    "register.terms": "मैं सहमत हूँ",
    "register.termsLink": "सेवा की शर्तें",
    "register.and": "और",
    "register.privacyLink": "गोपनीयता नीति",
    "register.createAccount": "खाता बनाएँ",
    "register.creatingAccount": "खाता बना रहा है...",
    "register.haveAccount": "पहले से ही खाता है?",
    "register.signIn": "साइन इन",
    "register.backToHome": "होम पेज पर वापस जाएँ",
    
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
    
    // Auth
    "auth.profile": "प्रोफाईल",
    "auth.myAppointments": "माझ्या अपॉइंटमेंट",
    "auth.settings": "सेटिंग्ज",
    "auth.logout": "लॉग आउट",
    "auth.logoutSuccess": "आपण यशस्वीरित्या लॉग आउट केले आहे.",
    "auth.loginSuccess": "पुन्हा स्वागत आहे",
    
    // Login Page
    "login.title": "रुग्ण लॉगिन",
    "login.subtitle": "पुन्हा स्वागत आहे! कृपया आपल्या खात्यात साइन इन करा",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.forgotPassword": "पासवर्ड विसरलात?",
    "login.signIn": "साइन इन",
    "login.signingIn": "साइन इन होत आहे...",
    "login.noAccount": "खाते नाही?",
    "login.register": "आता नोंदणी करा",
    "login.backToHome": "मुख्यपृष्ठावर परत जा",
    
    // Register Page
    "register.title": "रुग्ण खाते तयार करा",
    "register.subtitle": "दर्जेदार आरोग्य सेवा मिळवण्यासाठी मेडीसेवामध्ये सामील व्हा",
    "register.fullName": "पूर्ण नाव",
    "register.email": "ईमेल",
    "register.phone": "फोन नंबर",
    "register.password": "पासवर्ड",
    "register.confirmPassword": "पासवर्डची पुष्टी करा",
    "register.terms": "मी सहमत आहे",
    "register.termsLink": "सेवा अटी",
    "register.and": "आणि",
    "register.privacyLink": "गोपनीयता धोरण",
    "register.createAccount": "खाते तयार करा",
    "register.creatingAccount": "खाते तयार करत आहे...",
    "register.haveAccount": "आधीपासून खाते आहे?",
    "register.signIn": "साइन इन",
    "register.backToHome": "मुख्यपृष्ठावर परत जा",
    
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
    
    // Auth
    "auth.profile": "પ્રોફાઇલ",
    "auth.myAppointments": "મારી એપોઇન્ટમેન્ટ",
    "auth.settings": "સેટિંગ્સ",
    "auth.logout": "લોગ આઉટ",
    "auth.logoutSuccess": "તમે સફળતાપૂર્વક લોગ આઉટ થયા છો.",
    "auth.loginSuccess": "પાછા આવ્યા તે માટે આપનું સ્વાગત છે",
    
    // Login Page
    "login.title": "દર્દી લોગિન",
    "login.subtitle": "પાછા આવ્યા તે માટે આપનું સ્વાગત છે! કૃપા કરીને તમારા એકાઉન્ટમાં સાઇન ઇન કરો",
    "login.email": "ઈમેલ",
    "login.password": "પાસવર્ડ",
    "login.forgotPassword": "પાસવર્ડ ભૂલી ગયા?",
    "login.signIn": "સાઇન ઇન",
    "login.signingIn": "સાઇન ઇન થઈ રહ્યું છે...",
    "login.noAccount": "એકાઉન્ટ નથી?",
    "login.register": "અત્યારે રજિસ્ટર કરો",
    "login.backToHome": "હોમ પેજ પર પાછા જાઓ",
    
    // Register Page
    "register.title": "દર્દી એકાઉન્ટ બનાવો",
    "register.subtitle": "ગુણવત્તાપૂર્ણ આરોગ્ય સેવાઓનો ઉપયોગ કરવા માટે મેડીસેવામાં જોડાઓ",
    "register.fullName": "પૂરું નામ",
    "register.email": "ઈમેલ",
    "register.phone": "ફોન નંબર",
    "register.password": "પાસવર્ડ",
    "register.confirmPassword": "પાસવર્ડની પુષ્ટિ કરો",
    "register.terms": "હું સંમત છું",
    "register.termsLink": "સેવાની શરતો",
    "register.and": "અને",
    "register.privacyLink": "ગોપનીયતા નીતિ",
    "register.createAccount": "એકાઉન્ટ બનાવો",
    "register.creatingAccount": "એકાઉન્ટ બની રહ્યું છે...",
    "register.haveAccount": "પહેલાથી જ એકાઉન્ટ છે?",
    "register.signIn": "સાઇન ઇન",
    "register.backToHome": "હોમ પેજ પર પાછા જાઓ",
    
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
    
    // Auth
    "auth.profile": "प्रोफाइल",
    "auth.myAppointments": "म्हारा अपॉइंटमेंट",
    "auth.settings": "सेटिंग",
    "auth.logout": "लॉग आउट",
    "auth.logoutSuccess": "थे सफलतापूर्वक लॉग आउट हो गया हो।",
    "auth.loginSuccess": "वापसी पर स्वागत है",
    
    // Login Page
    "login.title": "मरीज लॉगिन",
    "login.subtitle": "वापसी पर स्वागत है! कृपया थांरे खाते में साइन इन करो",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.forgotPassword": "पासवर्ड भूल गया?",
    "login.signIn": "साइन इन",
    "login.signingIn": "साइन इन हो रिया है...",
    "login.noAccount": "खातो नहीं है?",
    "login.register": "अभी रजिस्टर करो",
    "login.backToHome": "होम पेज पर पाछा जावो",
    
    // Register Page
    "register.title": "मरीज खातो बणावो",
    "register.subtitle": "बढ़िया स्वास्थ्य सेवावां को उपयोग करबा सारू मेडीसेवा से जुड़ो",
    "register.fullName": "पूरो नाम",
    "register.email": "ईमेल",
    "register.phone": "फोन नंबर",
    "register.password": "पासवर्ड",
    "register.confirmPassword": "पासवर्ड की पुष्टि",
    "register.terms": "मैं सहमत हूं",
    "register.termsLink": "सेवा की शर्तां",
    "register.and": "और",
    "register.privacyLink": "गोपनीयता नीति",
    "register.createAccount": "खातो बणावो",
    "register.creatingAccount": "खातो बण रियो है...",
    "register.haveAccount": "पहले से ही खातो है?",
    "register.signIn": "साइन इन",
    "register.backToHome": "होम पेज पर पाछा जावो",
    
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
    
    // Auth
    "auth.profile": "প্রোফাইল",
    "auth.myAppointments": "আমার অ্যাপয়েন্টমেন্ট",
    "auth.settings": "সেটিংস",
    "auth.logout": "লগ আউট",
    "auth.logoutSuccess": "আপনি সফলভাবে লগ আউট হয়েছেন।",
    "auth.loginSuccess": "ফিরে আসার জন্য স্বাগতম",
    
    // Login Page
    "login.title": "রোগী লগইন",
    "login.subtitle": "ফিরে আসার জন্য স্বাগতম! অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন",
    "login.email": "ইমেইল",
    "login.password": "পাসওয়ার্ড",
    "login.forgotPassword": "পাসওয়ার্ড ভুলে গেছেন?",
    "login.signIn": "সাইন ইন",
    "login.signingIn": "সাইন ইন হচ্ছে...",
    "login.noAccount": "অ্যাকাউন্ট নেই?",
    "login.register": "এখনই রেজিস্টার করুন",
    "login.backToHome": "হোম পেজে ফিরে যান",
    
    // Register Page
    "register.title": "রোগী অ্যাকাউন্ট তৈরি করুন",
    "register.subtitle": "মানসম্পন্ন স্বাস্থ্যসেবা পাওয়ার জন্য মেডিসেবাতে যোগ দিন",
    "register.fullName": "পুরো নাম",
    "register.email": "ইমেইল",
    "register.phone": "ফোন নম্বর",
    "register.password": "পাসওয়ার্ড",
    "register.confirmPassword": "পাসওয়ার্ড নিশ্চিত করুন",
    "register.terms": "আমি সম্মত",
    "register.termsLink": "পরিষেবার শর্তাবলী",
    "register.and": "এবং",
    "register.privacyLink": "গোপনীয়তা নীতি",
    "register.createAccount": "অ্যাকাউন্ট তৈরি করুন",
    "register.creatingAccount": "অ্যাকাউন্ট তৈরি হচ্ছে...",
    "register.haveAccount": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    "register.signIn": "সাইন ইন",
    "register.backToHome": "হোম পেজে ফিরে যান",
    
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
