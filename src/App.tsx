import { useSearchParams } from 'react-router';

import * as z from 'zod';
import { fi, en, sv } from 'zod/locales';

import ApplicationRoutes from '@/ApplicationRoutes';

import { AlertProvider } from '@/context/AlertContext.tsx';
import LanguageContext from '@/context/LanguageContext.tsx';
import ApplicationConfigurationContext from '@/context/ApplicationConfigurationContext';

import { displayLanguages, getSupportedLanguage, type DisplayLanguage } from '@/constants/display-languages.ts';

export interface ApplicationConfiguration {
  environment: 'test' | 'development' | 'staging' | 'production';
  maintenance: boolean;
  turnstileSiteKey: string;
  notificationBanner?: {
    title?: {
      fi?: string;
      sv?: string;
      en?: string;
    };
    text?: {
      fi?: string;
      sv?: string;
      en?: string;
    };
  };
}

const App = (props: { runtimeConfig: ApplicationConfiguration }) => {
  const { runtimeConfig } = props;
  const [searchParams] = useSearchParams();

  const language = searchParams.get('lng') || 'fi';
  const selectedLanguage: DisplayLanguage | undefined = getSupportedLanguage(language);

  if (!selectedLanguage) {
    return <p>Ohjelmisto ei tue valittua kieltä "{language}"</p>;
  }

  // Init localized error messages and define use of jitless for CSP
  if (selectedLanguage === displayLanguages.fi) {
    z.config({ ...fi(), jitless: true });
  }
  if (selectedLanguage === displayLanguages.sv) {
    z.config({ ...sv(), jitless: true });
  }
  if (selectedLanguage === displayLanguages.en) {
    z.config({ ...en(), jitless: true });
  }

  document.documentElement.lang = selectedLanguage; // eslint-disable-line

  return (
    <LanguageContext.Provider value={selectedLanguage}>
      <ApplicationConfigurationContext.Provider value={runtimeConfig}>
        <AlertProvider>
          <ApplicationRoutes />
        </AlertProvider>
      </ApplicationConfigurationContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
