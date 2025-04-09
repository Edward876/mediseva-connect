
import { enTranslations } from './english';
import { languageNames } from './common';

// Function to create base translations for other languages
// Using English as fallback with native language names
const createBaseTranslation = () => {
  return {
    ...enTranslations,
    ...languageNames
  };
};

// Create base translations for each language
export const mrTranslations = createBaseTranslation(); // Marathi
export const guTranslations = createBaseTranslation(); // Gujarati
export const raTranslations = createBaseTranslation(); // Rajasthani
export const bnTranslations = createBaseTranslation(); // Bengali
export const taTranslations = createBaseTranslation(); // Tamil
export const teTranslations = createBaseTranslation(); // Telugu
