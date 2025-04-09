
// Define available languages
export type Language = 'hi' | 'bn';

// Define translations structure
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
}
