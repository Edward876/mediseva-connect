
import { Translations } from '@/types/language';
import { enTranslations } from './english';
import { hiTranslations } from './hindi';
import { bnTranslations } from './bengali';

// Compile all translations
export const translations: Translations = {
  en: enTranslations,
  hi: hiTranslations,
  bn: bnTranslations
};

// Translation utility function
export const getTranslation = (key: string, language: string): string => {
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
