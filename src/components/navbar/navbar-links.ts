// Internal links have static 'path' and language versions are handled automatically by NavbarLink
// External links have getter 'getPath' which may provide language versions or return default link

import type { DisplayLanguage } from '@/constants/display-languages';

export default {
  home: {
    path: '/',
  },
  'monograph-publishers': {
    path: '/monograph-publishers',
  },
  forms: {
    path: '/forms',
    'monograph-publishers': {
      path: '/forms/monograph-publishers',
    },
    'monograph-publications': {
      path: '/forms/monograph-publications',
    },
    'serial-publications': {
      path: '/forms/serial-publications',
    },
  },
  'other-identifiers': {
    isil: {
      getPath: (language: DisplayLanguage) => {
        const paths = {
          fi: 'https://isil.kansalliskirjasto.fi/',
          en: 'https://isil.kansalliskirjasto.fi/en/',
          sv: 'https://isil.kansalliskirjasto.fi/sv/',
        };

        return paths[language];
      },
      displayName: 'ISIL',
    },
    isni: {
      getPath: (language: DisplayLanguage) => {
        const paths = {
          fi: 'https://www.kiwi.fi/x/WQCOBQ',
          en: 'https://www.kansalliskirjasto.fi/en/services/isni',
          sv: 'https://www.kansalliskirjasto.fi/sv/tjanster/isni',
        };

        return paths[language];
      },
      displayName: 'ISNI',
    },
    urn: {
      getPath: (language: DisplayLanguage) => {
        const paths = {
          fi: 'https://www.kansalliskirjasto.fi/fi/palvelut/urn-tunnukset',
          en: 'https://www.kansalliskirjasto.fi/en/services/urn',
          sv: 'https://www.kansalliskirjasto.fi/sv/tjanster/urn',
        };

        return paths[language];
      },
      displayName: 'URN',
    },
  },
  'change-contact-details': {
    getPath: (language: DisplayLanguage) => {
      const paths = {
        fi: 'https://elomake.helsinki.fi/lomakkeet/67127/lomake.html',
        en: 'https://elomake.helsinki.fi/lomakkeet/67232/lomake.html',
        sv: 'https://elomake.helsinki.fi/lomakkeet/67276/lomake.html',
      };

      return paths[language];
    },
  },
};
