export type DisplayLanguage = 'fi' | 'sv' | 'en';

export const displayLanguages: Record<DisplayLanguage, DisplayLanguage> = {
  fi: 'fi',
  sv: 'sv',
  en: 'en',
};

export const displayLanguageToLangCode = (displayLanguage: DisplayLanguage) => {
  if (displayLanguage === 'sv') {
    return 'sv-SE';
  }

  if (displayLanguage === 'en') {
    return 'en-GB';
  }

  return 'fi-FI';
};

export function getSupportedLanguage(language: string): DisplayLanguage | undefined {
  return Object.values(displayLanguages).find((displayLanguage: DisplayLanguage) => displayLanguage === language);
}
