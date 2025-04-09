
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { getTranslation } from '@/translations';

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

// Create provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language;
      // Validate that the stored language is one of our supported languages
      if (storedLanguage && ['en', 'hi', 'bn'].includes(storedLanguage)) {
        return storedLanguage;
      }
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

  // Translation function using the utility
  const t = (key: string): string => {
    return getTranslation(key, language);
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
