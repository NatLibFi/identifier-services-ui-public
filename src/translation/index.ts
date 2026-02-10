import fi from '@/translation/fi';
import sv from '@/translation/sv';
import en from '@/translation/en';

import type { DisplayLanguage } from '@/constants/display-languages';

type TranslationConfig = Record<string, Record<string, string>>;

const translations: TranslationConfig = {
  fi,
  sv,
  en,
};

// This pure function can be used within useEffect so that it does not
// cause infinite rendering like using the custom hook
export function pureTranslate(language: DisplayLanguage, key: string) {
  const translationLanguage = translations[language];
  if (!translationLanguage) {
    return key;
  }

  const translation = translationLanguage[key];
  return translation || key;
}

export default translations;
