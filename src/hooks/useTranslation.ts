import { useContext } from 'react';

import LanguageContext from '@/context/LanguageContext';
import translations from '@/translation';
import type { DisplayLanguage } from '@/constants/display-languages';

// eslint-disable-next-line no-unused-vars
export type TranslateFunction = (key: string | null | undefined) => string;

function useTranslation() {
  const language: DisplayLanguage = useContext<DisplayLanguage>(LanguageContext);

  const translate = (key: string | null | undefined) => {
    if (key === null || key === undefined) {
      return '';
    }

    const translationLanguage = translations[language];
    if (!translationLanguage) {
      console.error(`Language "${language}" is supported by application but missing translation config!`);
      return key;
    }

    const translation = translationLanguage[key];
    return translation ?? key;
  };

  const getCurrentLanguage = (): DisplayLanguage => language;

  return { translate, getCurrentLanguage };
}

export default useTranslation;
