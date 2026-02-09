export function getHomePageLink(language: string, linkName: string): string {
  const homePageLinks: Record<string, Record<string, string>> = {
    'kk-isbn': {
      fi: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/isbn-tunnus',
      sv: 'https://www.kansalliskirjasto.fi/sv/tjanster/isbn-nummer',
      en: 'https://www.kansalliskirjasto.fi/en/services/isbn',
    },
    'kk-ismn': {
      fi: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/ismn-tunnus',
      sv: 'https://www.kansalliskirjasto.fi/sv/tjanster/ismn-nummer',
      en: 'https://www.kansalliskirjasto.fi/en/services/ismn',
    },
    'kk-issn': {
      fi: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/issn-tunnus',
      sv: 'https://www.kansalliskirjasto.fi/sv/tj%C3%A4nster/tjanster-organisationer/issn-nummer',
      en: 'https://www.kansalliskirjasto.fi/en/services/services-organizations/issn',
    },
  };

  const link = Object.keys(homePageLinks).find((k) => k === linkName);
  if (!link) {
    console.error(`Asked for link ${linkName} but it was not defined in configuration.`);
    return '#'; // In order to avoid undefined behavior
  }

  return homePageLinks[link][language];
}
