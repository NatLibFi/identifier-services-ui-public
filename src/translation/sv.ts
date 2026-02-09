const sv = {
  // Errors
  'errors.unknown.title': 'Applikationen stötte på ett fel',
  'errors.unknown': 'Applikationen stötte på ett fel. Vänligen försök på nytt eller ta kontakt med vår kundservice.',
  'errors.api.generic': 'Applikationen stötte på ett fel. Försök igen om en stund.',
  'errors.api.turnstile': 'Fel vid laddning av bot-identifiering. Försök igen om en stund.',
  'errors.api.unknown':
    'Applikationen stötte på ett fel. Vänligen försök på nytt eller ta kontakt med vår kundservice.',

  'errors.turnstile-load-failed': 'Fel vid laddning av bot-identifiering. Försök igen om en stund.',

  'errors.instructions.generic': 'Om problemen fortsätter, vänligen ta kontakt med vår kundservice.',

  // Pages

  // Pages - Home
  'pages.home.titles.main': 'ISBN, ISMN och ISSN',
  'pages.home.infoboxes.box1-1':
    'De internationella standardnumren (ISBN, ISMN ja ISSN) är unika identifikatorer för publikationer.',
  'pages.home.infoboxes.box1-2': 'Numren används till exempel i distributionskedjor inom bokbranschen.',
  'pages.home.infoboxes.box2':
    'ISBN identifierar böcker, ISMN notpublikationer och ISSN seriella och fortlöpande publikationer.',
  'pages.home.infoboxes.box3-1': 'I Finland sker ansökan om dessa nummer via Finlands ISBN- och ISSN-centraler.',
  'pages.home.infoboxes.box3-2': 'Numren är avgiftsfria.',

  'pages.home.form-instructions.title': 'Instruktioner för att fylla i blanketten',
  'pages.home.form-instructions.text1':
    'Om ni har regelbunden förlagsverksamhet men inte ännu har anslutit er till ISBN-/ISMN-systemet, fyll då i den elektroniska anslutningsblanketten och ansökningsblanketten.',
  'pages.home.form-instructions.text2':
    'Om er förlagsverksamhet är tillfällig eller om ni redan har anslutit er till ISBN-systemet, ska ni fylla i ansökningsblankett för ISBN/ISMN för att beställa ett ISBN-nummer.',
  'pages.home.form-instructions.text3':
    "Förläggarens uppgifter publiceras i den internationella databasen Global Register of Publishers och /eller Music Publishers' International ISMN Database och de är sökbara på ISBN-centralens hemsida.", // eslint-disable-line quotes

  'pages.home.isbn-ismn-info.title': 'ISBN och ISMN',
  'pages.home.isbn-ismn-info.text1':
    'ISBN identifierar böcker och ISMN notpublikationer som är avsedda för offentligt bruk. Finlands nationella ISBN-central svarar för tilldelningen av ISBN- och ISMN i Finland. Centralen upprätthåller ett nationellt förlagsregister och förmedlar information om finländska förläggare för nationellt och internationellt bruk.',
  'pages.home.isbn-ismn-info.text2':
    'Identifikatorer som en del av metadata betjänar hela förlagsbranschen och bibliotekssektorn och gör det enklare att identifiera, hantera och hitta publikationer. Numren används bl.a. i beställnings- och distributionssystem inom förlagsbranschen för att påskynda identifieringen av publikationer samt i internationella och nationella samkataloger och bibliografier samt i lånesystem vid bibliotek och vid informationssökning.',
  'pages.home.isbn-ismn-info.text3':
    'Alla böcker och notpublikationer samt varje publikationsform (tryckt, audiovisuell, digital) och varje ändrad upplaga av dem tilldelas ett eget ISBN eller ISMN. Detta underlättar identifieringen av publikationer i förlagsbranschens distributionskedja och garanterar att kunden får önskad publikation. Publikationsformen kan vara tryckt bok, audiovisuell eller elektronisk publikation.',

  'pages.home.isbn-ismn-info.isbn-link': 'Mer om ISBN',
  'pages.home.isbn-ismn-info.ismn-link': 'Mer om ISMN',

  'pages.home.issn-info.title': 'ISSN',
  'pages.home.issn-info.text1':
    'ISSN är en identifikator för seriella och fortlöpande publikationer, som tidningar och serier. Finlands nationella ISSN-central tillhandahåller ISSN i Finland och sänder informationen om publikationer som tilldelats ISSN till databasen ISSN Portal.',
  'pages.home.issn-info.text2':
    'Identifikationsnumren som en del av metadata betjänar hela förlagsbranschen och bibliotekssektorn och gör det enklare att identifiera, hantera och hitta publikationer.',
  'pages.home.issn-info.text3':
    'ISSN används bl.a. för snabbidentifiering av publikationer i branschens prenumerations- och distributionssystem, i nationella och internationella samkataloger, i bibliografier, i bibliotekens lånesystem, i informationssökning. ISSN är bundet till publikationens titel – om titeln ändras måste också numret ändras. För olika publikationsformer (olika fysiska medier) ges separata ISSN.',
  'pages.home.issn-info.kk-issn-link': 'Mer om ISSN',
  'pages.home.issn-info.issn-portal-link': 'ISSN-portal databasen',

  // Pages - Monograph Publisher Search
  'pages.publisher-registry-search.title': 'Sök förlag med namn eller förlagsbeteckning',
  'pages.publisher-registry-search.input': 'Sök..',

  // Pages - Monograph Publisher
  'pages.monograph-publisher.heading': 'Förlaggare',

  'pages.monograph-publisher.previous-names': 'Tidigare namn',
  'pages.monograph-publisher.has-quitted': 'förläggaren har avslutat sin verksamhet',
  'pages.monograph-publisher.headings.isbn-publisher-ranges': 'Förlagsbeteckning (ISBN)',
  'pages.monograph-publisher.headings.ismn-publisher-ranges': 'Förlagsbeteckning (ISMN)',

  // Pages - Identifier Batch Download
  'pages.identifierbatch-download.title': 'Listor med identifikatorer',

  // Pages- Accessibility Statement
  'pages.accessibility-statement.title': 'Tillgänglighetsutlåtande',
  'pages.accessibility-statement.description.main':
    'Detta tillgänglighetsutlåtande gäller tjänsten Identifikatorservice och har upprättats 9.5.2023 (uppdaterat 11.12.2025). Tjänsten omfattas av lagen om tillhandahållande av digitala tjänster, som förutsätter att offentliga webbtjänster ska vara tillgängliga. En förteckning över de tillgänglighetskrav som anges i utlåtandet finns i riktlinjer för tillgängligt webbinnehåll.',
  'pages.accessibility-statement.description.main.link': 'Riktlinjer för tillgängligt webbinnehåll (WCAG) 2.1',
  'pages.accessibility-statement.description.secondary': 'Vi har själva granskat hur tillgänglig tjänsten är.',
  'pages.accessibility-statement.status.title': 'Tillgänglighetsstatus för den digitala tjänsten',
  'pages.accessibility-statement.status.description': 'Uppfyller delvis tillgänglighetskraven.',
  'pages.accessibility-statement.issues.title': 'Icke-tillgängligt innehåll',
  'pages.accessibility-statement.issues.disclaimer': 'Oproportionell börda',
  'pages.accessibility-statement.issues.disclaimer.description':
    'Arbetet med att förnya tjänsten har ännu inte slutförts inom alla delområden, vilket gör att det kan förekomma brister i användbarheten. Om användaren inte kan hämta önskad information ur det nuvarande användargränssnittet eller skicka en ansökan som gäller identifikatorer, går det att skicka en begäran om information eller en ansökan till adressen isbn-keskus@helsinki.fi.',
  'pages.accessibility-statement.issues.subTitle1': 'Innehåll som inte är tillgängligt och dess brister',
  'pages.accessibility-statement.issues.subTitle2': 'Tillgänglighetskrav som inte uppfylls',
  'pages.accessibility-statement.issues.list.title': 'Webbplatsen uppfyller ännu inte kraven till alla delar',
  'pages.accessibility-statement.issues.sitemap.title': 'Hanterbar: en sidkarta fattas',
  'pages.accessibility-statement.issues.sitemap.description':
    'För närvarande finns det bara ett sätt att lokalisera en enskild sida: navigeringsmenyn.',
  'pages.accessibility-statement.issues.sitemap.wcag': '2.4.5 Flera sätt',
  'pages.accessibility-statement.issues.batch.title':
    'Begripligt: Texten i infomeddelandet (popup) på sidan för listan över identifikatorer saknar lang-attribut.',
  'pages.accessibility-statement.issues.batch.description':
    'Infomeddelandet på sidan för en enskild lista över identifikatorer innehåller texter på tre olika språk. Var och en av dem bör vara separat märkt med sitt eget lang-attribut.',
  'pages.accessibility-statement.issues.batch.wcag': '3.1.2 Språk för del av sida',
  'pages.accessibility-statement.issues.required.title': 'Begripligt: Html required-attributen saknas',
  'pages.accessibility-statement.issues.required.description':
    'Obligatoriska fält kan anges genom att använda html required-attribut. Blanketterna ska också innehålla en förklaring, såsom * för obligatoriska fält.',
  'pages.accessibility-statement.issues.required.wcag': '3.3.2 Ledtexter/etiketter eller instruktioner',
  'pages.accessibility-statement.feedback.title': 'Har du upptäckt bristande tillgänglighet i vår digitala tjänst?',
  'pages.accessibility-statement.feedback.description': 'Berätta för oss så gör vi vårt bästa för att åtgärda bristen.',
  'pages.accessibility-statement.feedback.contact.title': 'Via e-post',
  'pages.accessibility-statement.feedback.contact.email': 'isbn-keskus@helsinki.fi',
  'pages.accessibility-statement.authority.title': 'Tillsynsmyndighet',
  'pages.accessibility-statement.authority.description':
    'Om du upptäcker tillgänglighetsproblem på webbplatsen, ge respons till oss som är webbansvariga. Det kan dröja 14 dagar innan du får ett svar. Om du inte är nöjd med det svar du har fått eller inte får något svar alls inom två veckor kan du lämna in en tillgänglighetsklagan till Traficoms enhet för övervakning. På Traficoms webbplats beskrivs i detalj hur du kan lämna in en anmälan och hur ärendet behandlas.',
  'pages.accessibility-statement.authority.description.link': 'Traficoms enhet för övervakning',
  'pages.accessibility-statement.authority.contact.title': 'Tillsynsmyndighetens kontaktuppgifter',
  'pages.accessibility-statement.authority.contact.organization': 'Transport- och kommunikationsverket Traficom',
  'pages.accessibility-statement.authority.contact.department': 'Enheten för tillsyn över digital tillgänglighet',
  'pages.accessibility-statement.authority.contact.website': 'www.saavutettavuusvaatimukset.fi',
  'pages.accessibility-statement.authority.contact.email': 'saavutettavuus(at)traficom.fi',
  'pages.accessibility-statement.authority.contact.phone': 'telefon (telefonväxeln) 029 534 5000',

  // Pages- Privacy Policy
  'pages.privacy-policy.title': 'Dataskydd',
  'pages.privacy-policy.1a.title': '1a. Personuppgiftsansvarig',
  'pages.privacy-policy.1a.content':
    'Nationalbiblioteket\nBiblioteksnättjänster\nPB 15 (Unionsgatan 36)\n00014 Helsingfors universitet\nTelefon 02941 911',
  'pages.privacy-policy.1b.title': '1b. Dataskyddsombud',
  'pages.privacy-policy.1b.content':
    'Nationalbiblioteket är en fristående institution vid Helsingfors universitet. Helsingfors universitets dataskyddsombud når du på e-postadressen tietosuoja(at)helsinki.fi.',
  'pages.privacy-policy.2.title': '2. Kontaktuppgifter vid frågor om behandlingen av uppgifter',
  'pages.privacy-policy.2.content': 'isbn-keskus(at)helsinki.fi',
  'pages.privacy-policy.3.title': '3. Registrets namn',
  'pages.privacy-policy.3.content': 'Identifikatorportalen',
  'pages.privacy-policy.4.title': '4. Ändamålet med behandlingen av personuppgifter och laglig grund för behandlingen',
  'pages.privacy-policy.4.content':
    'Personuppgifter behandlas för att upprätthålla en unik identifiering av kunderna och för att identifiera användare som loggar in i Identifikatorportalen. Personuppgifter behandlas också vid distributionsprocessen av ISBN-, ISMN-, och ISSN-numren för att upprätthålla en unik identifiering av förläggare samt förlags- och utgivarregister. Därutöver behandlas uppgifterna för att utreda eventuella fel och fall av missbruk. Administratörernas personuppgifter behandlas för verifiering av händelseinformation i systemet.\n\nEftersom förlagsbeteckningen som ingår i ISBN-numret anger vilken beteckning som tillhör vilket förlag, behövs nationella och internationella register för att upprätthålla dessa uppgifter. Förlagsregistret används i första hand som verktyg vid Finlands ISBN-central för att kontakta förlag eller för att utreda oklara fall angående vilket förlag som publicerat ett visst material. Uppgifterna finns även i det nationella ISBN- och ISMN-registret.\n\nNär en användare loggar in i webbtjänsten lagras uppgifter om händelsen (bl.a. ip-adress, url-adress) tillfälligt för behandling.\n\nGrunden för behandlingen är den personuppgiftsansvarigas berättigade intresse. En av ISBN-centralens skyldigheter som regional registermyndighet är att göra databasen, där de ISBN-nummer som beviljats och förlagsbeteckningarna är sökbara, öppet tillgänglig. Detta bidrar till att främja användningen av ISBN-standarden och gör det lättare att hitta förlag och de böcker som förlagen ger ut. Den internationella centralen ska även ha aktuella uppgifter om beviljade ISBN-nummer, för att det ska vara möjligt att följa och administrera ISBN-systemets kapacitet. Den internationella centralen får uppgifter om beviljade ISBN-nummer från de nationella centralerna.',

  'pages.privacy-policy.5.title': '5. Innehåll i registret',
  'pages.privacy-policy.5.prefix': 'Vi behandlar följande personuppgifter:',
  'pages.privacy-policy.5.publisher-information': 'Förlagets basuppgifter',
  'pages.privacy-policy.5.publisher-information.language': 'Användningsspråk',
  'pages.privacy-policy.5.publisher-information.name': 'Namn',
  'pages.privacy-policy.5.publisher-information.contact-person-info':
    'Kontaktpersonernas namn, telefonnummer och e-postadresser',
  'pages.privacy-policy.5.publisher-information.address': 'Adress',
  'pages.privacy-policy.5.publisher-information.other-names': 'Förlagets tidigare och övriga namn',
  'pages.privacy-policy.5.publisher-information.publisher-identifier': 'Förlagsbeteckning eller förlagsbeteckningar',
  'pages.privacy-policy.5.publisher-information.additionaI-information':
    'Uppgifter som användaren angett i fältet för tilläggsuppgifter',
  'pages.privacy-policy.5.publisher-information.publisher-classification': 'Förlagsverksamhetens ämnesområden',
  'pages.privacy-policy.5.publication-information': 'Publikationernas basuppgifter',
  'pages.privacy-policy.5.publication-information.publisher-name': 'Namnet på publikationens förlag',
  'pages.privacy-policy.5.publication-information.publisher-email': 'E-post till publikationens förlag',
  'pages.privacy-policy.5.publication-information.publisher-address': 'Adressuppgifter för publikationens förlag',
  'pages.privacy-policy.5.publication-information.publisher-contact-person':
    'Namn på kontaktpersonen vid publikationens förlag',
  'pages.privacy-policy.5.publication-information.publisher-phone': 'Telefonnummer till publikationens förlag',
  'pages.privacy-policy.5.publication-information.author-information':
    'Namnen på och rollerna för författarna till publikationen',
  'pages.privacy-policy.5.superuser-information': 'Administratörens basuppgifter',
  'pages.privacy-policy.5.superuser-information.name': 'Namn',
  'pages.privacy-policy.5.superuser-information.username': 'Användarnamn',
  'pages.privacy-policy.5.superuser-information.password': 'Lösenord',
  'pages.privacy-policy.5.superuser-information.personal-settings': 'Användarens personliga inställninga',
  'pages.privacy-policy.5.superuser-information.email': 'E-postadress',
  'pages.privacy-policy.5.personalization': 'Uppgifter som samlas in för personaliserade funktioner',
  'pages.privacy-policy.5.personalization.settings':
    'Användarens personliga inställningar (t.ex. språkval för användargränssnittet)',
  'pages.privacy-policy.5.other': 'Övriga uppgifter',
  'pages.privacy-policy.5.other.mandatoryInfo': 'Uppgifter som är nödvändiga för att kunna använda nättjänsten',
  'pages.privacy-policy.5.other.error-and-misconduct-info':
    'Uppgifter som är nödvändiga för att kunna utreda fel och missbruk',
  'pages.privacy-policy.5.suffix': 'Nationalbiblioteket samlar inte in uppgifter för marknadsföringsändamål.',

  'pages.privacy-policy.6.title': '6. Regelmässiga informationskällor',
  'pages.privacy-policy.6.content':
    'Uppgifterna som finns i registret sparas när förlag ansluter sig till ISBN- eller ISMN-systemet eller ansöker om ett ISBN- eller ISMN-nummer. Kontaktuppgifterna samlas in utifrån de uppgifter som förlagen anger.\n\nAnvändarna sparar själv uppgifterna i tjänsten Identifikatorportalen. Uppgifterna kan även sparas i registret av administratörer om användaren uträttar sina ärenden vid ISBN- eller ISSN-centralerna via e-post eller telefon. Uppgifterna om tidningsutgivare i ISSN-registret kompletteras regelbundet med uppgifter från offentliga informationskällor.\n\nUppgifterna om de systemfunktioner som utförs av en administratör sparas beroende på vilka funktioner som utförs.\n\nUppgifter om personifierade funktioner sparar användaren själv.',
  'pages.privacy-policy.7.title': '7. Behandling och skydd av känsliga personuppgifter',
  'pages.privacy-policy.7.content': 'Känsliga personuppgifter behandlas inte i tjänsten Identifikatorportalen.',
  'pages.privacy-policy.8.title': '8. Utlämnande av uppgifter',
  'pages.privacy-policy.8.content':
    "Uppgifter om förlag förmedlas regelbundet till den internationella ISBN-centralen, som årligen publicerar en förteckning över förläggarna, Global Register of Publishers. Uppgifterna om förlag som ger ut notpublikationer förmedlas årligen till International Music Publishers' Database, ett förlagsregister som drivs av Internationella ISMN-centralen. Begränsade förlagsuppgifter (förlagets officiella namn, gatuadress, postanstalt, postnummer, telefonnummer och webbadress) finns offentligt tillgängliga på nätet från det förlagsregister som Finlands ISBN-central upprätthåller.\n\nUppgifter om publikationerna (bl.a. verkets namn, publiceringstidpunkt, identifierare, förlag och upphovspersoner) förmedlas till metadataresursen Melinda och till Nationalbibliotekets bibliotekssystem. Efter att uppgifterna förmedlats är de offentligt tillgängliga. När det gäller ISSN-publikationer förmedlas metadata om publikationerna också separat till den internationella ISSN-centralen.\n\nDe tekniska logguppgifterna för datakommunikationen på webbplatsen lagras delvis i tjänster som tillhandahålls av Nationalbibliotekets avtalspartner Cloudflare Inc. Cloudflare behandlar data inom EES-området och i USA. Grunden för överföring av personuppgifter är standardavtalsklausuler som godkänts av Europeiska kommissionen.", // eslint-disable-line quotes
  'pages.privacy-policy.9.title': '9. Webbplatsens och datakommunikationens tekniska logguppgifter',
  'pages.privacy-policy.9.content':
    'För att producera tjänsten och sörja för datasäkerheten samlas tekniska logguppgifter in om tjänstens användare. Logguppgifterna innehåller uppgifter som exempelvis tidsstämpel, webbläsarversion, operativsystem och ip-adress med hjälp av vilken användaren kan länkas till en fysisk person. Ovan nämnda uppgifter används endast för att utreda fel eller datasäkerhetsincidenter. Tillfällig lagring av personuppgifter bland logguppgifterna är nödvändig för att tillhandahålla tjänsten.\n\nNationalbibliotekets avtalspartner Cloudflare Inc. samlar in logguppgifter om de Cloudflare-tjänster som de erbjuder och som används i Identifikatorportalen. Logguppgifterna innehåller uppgifter som exempelvis tidsstämpel och ip-adress med hjälp av vilken användaren kan länkas till en fysisk person.',
  'pages.privacy-policy.10.title': '10. Lagringstid och radering av obehövliga personuppgifter',
  'pages.privacy-policy.10.content':
    'De personuppgifter som behandlas vid distributionsprocessen av ISBN-, ISMN- och ISSN-nummer samt personuppgifterna i utgivar- och förlagsregistret förvaras enligt de bestämningar som finns i registerbeskrivningarna. Uppgifterna lagras varaktigt i registret. Kontaktuppgifter kan på begäran ändras eller raderas. Personuppgifterna för de anställda vid Nationalbiblioteket raderas ett år efter det att anställningsförhållandet har upphört.',
  'pages.privacy-policy.11.title': '11. Vilka rättigheter har du?',
  'pages.privacy-policy.11.part1.boldContent': 'Rätt att kontrollera och korrigera personuppgifter',
  'pages.privacy-policy.11.part1.content':
    'Du har rätt att få veta om Nationalbiblioteket behandlar personuppgifter om dig.\n\nDessutom har du rätt att få veta vilka av dina personuppgifter som behandlas.\n\nOm du vill veta mer om vilka personuppgifter vi behandlar, skicka e-post till adressen isbn-keskus(at)helsinki.fi\n\n',
  'pages.privacy-policy.11.part2.boldContent': 'Rätt att inge klagomål till tillsynsmyndigheten',
  'pages.privacy-policy.11.part2.content':
    'Du har rätt att få lagenligheten hos universitetets agerande prövad av Dataombudsmannen: tietosuoja(at)om.fi\n\n',
  'pages.privacy-policy.11.part3.boldContent': 'Rätt att få uppgifterna raderade',
  'pages.privacy-policy.11.part3.content':
    'Du har rätt att be att dina personuppgifter raderas genom att kontakta: isbn-keskus(at)helsinki.fi',
  'pages.privacy-policy.12.title': '12. Principer för skyddet av registret',
  'pages.privacy-policy.12.content':
    'Uppgifterna lagras enbart i elektronisk form. Skyddade uppgifter är tillgängliga endast för systemadministratörerna och administratörer, som identifieras med en personlig kod och ett lösenord. Offentliga uppgifter är tillgängliga via internet.',
  'pages.privacy-policy.13.title': '13. Överföring av uppgifter till länder utanför EU eller EES',
  'pages.privacy-policy.13.content':
    "Uppgifterna om förlag förmedlas regelbundet till den internationella ISBN-centralen som årligen publicerar en förteckning över förläggarna, Global Register of Publishers. Den internationella ISBN-centralen finns i London. Uppgifterna om förlag som ger ut notpublikationer förmedlas årligen till International Music Publishers' Database, som drivs av den internationella ISMN-centralen och är belägen i Berlin. Begränsade förlagsuppgifter (förlagets officiella namn, gatuadress, postanstalt, postnummer, telefonnummer, förlagsbeteckningar och webbadress) finns offentligt tillgängliga på internet från det förlagsregister som Finlands ISBN-central upprätthåller.\n\nDe uppgifter som är nödvändiga för de tjänster som Nationalbibliotekets avtalspartner Cloudflare Inc. tillhandahåller kan överföras utanför EU och EES-området enligt vad som definieras i punkt 9, Webbplatsens och datakommunikationens tekniska uppgifter.\n\nUtöver de tidigare nämnda undantagen överförs uppgifter inte utanför EU eller EES-området.", // eslint-disable-line quotes
  'pages.privacy-policy.14.title': '14. Automatisk profilering vid beslutsfattandet',
  'pages.privacy-policy.14.content':
    'Vid behandlingen förekommer ingen automatiserad profilering utifrån dina personuppgifter.',

  // Pages - Form success
  'pages.form-success.to-frontpage': 'Till förstasidan',

  'pages.form-success.forms.monograph-publisher.title':
    'Anslutningsblanketten för förlagsregistret skickades framgångsrikt',
  'pages.form-success.forms.monograph-publisher.description':
    'Det tar i genomsnitt några dagar att behandla blanketten. Vid behov ber vi dig om mer information per e-post eller per telefon.',

  'pages.form-success.forms.monograph-publication.title':
    'Ansökningsblanketten för ISBN-/ISMN-nummer skickades framgångsrikt',
  'pages.form-success.forms.monograph-publication.description':
    'Det tar i genomsnitt några dagar att behandla blanketten. Vid behov ber vi dig om mer information per e-post eller per telefon.',

  'pages.form-success.forms.serial-publication.title': 'Ansökningsblanketten för ISSN-nummer skickades framgångsrikt',
  'pages.form-success.forms.serial-publication.description':
    'Det tar i genomsnitt några dagar att behandla blanketten. Vid behov ber vi dig om mer information per e-post eller per telefon.',

  // Pages - Maintenance
  'pages.maintenance.ongoing-maintenance': 'Serviceavbrott på webbplatsen.',
  'pages.maintenance.try-again-later': 'Försök igen senare.',

  // Pages - Not Found
  'pages.not-found.not-found-title': 'Sidan finns inte (404)',
  'pages.not-found.not-found-message': 'Sidan som du söker finns inte eller har flyttats.',

  // Forms
  'forms.guide.star': 'Fält markerade med asterisk (*) är obligatoriska',
  'forms.submit-search': 'Sök',
  'forms.submit': 'Skicka',

  // Forms aria-label
  'forms.aria-label.next': 'Gå till nästa sida',
  'forms.aria-label.previous': 'Gå till föregående sida',
  'forms.aria-label.search': 'Sök',

  // Form errors
  'forms.errors.common.required': 'Krävs',
  'forms.errors.common.year-format': 'Ogiltigt år (t.ex. 2020)',
  'forms.errors.common.month-format': 'Ogiltigt månad (t.ex. 01)',
  'forms.errors.common.issn-format': 'Ogiltig ISSN (t.ex. 1234-4321)',
  'forms.errors.common.zip-format': 'Ogiltig postnummer (t.ex. 00014)',
  'forms.errors.common.www-format':
    'Ogiltig URL, använd http:// eller https:// (t.ex. https://www.kansalliskirjasto.fi)',
  'forms.errors.common.min-length': 'Det angivna värdet är för kort',
  'forms.errors.common.max-length': 'Det angivna värdet är för långt',
  'forms.errors.common.phone-format': 'Ogiltigt telefonnummer',
  'forms.errors.common.integer-only': 'Det angivna värdet måste vara en siffra (t.ex. 10)',
  'forms.errors.common.integer-dash-only':
    'Det angivna värdet måste vara en siffra eller ett bindestreck (t.ex. 10-20)',
  'forms.errors.twodigit-integer-only': 'Max. 2 tecken (t.ex. 10)',
  'forms.errors.monograph-publications.require-public':
    'För publikationer som är avsedda endast för internt bruk ges inget ISBN/ISMN-nummer alls.',
  'forms.errors.common.max-entries': 'För många värden',

  // Form errors - Monograph publication request
  'forms.errors.monograph-publications.publication-date':
    'En identifikator kan inte ansökas i efterhand, om en bok är redan tryckt eller om den redan publicerats på nätet.',
  'forms.errors.monograph-publications.publisher-identifier-format': 'Ogiltig förlagsbeteckning (t.ex. 978-952-12345)',
  'forms.errors.monograph-publications.already-published': 'En identifikator kan inte ansökas i efterhand',

  // Forms - terms and conditions (cloudflare)
  'components.form-terms-and-conditions.title': 'Viktig notering',
  'components.form-terms-and-conditions.common':
    'Genom att fylla i formuläret ger du samtycke till att en automatisk identifiering används för att skilja åt mänskliga användare från botanvändare. I samband med den automatiska identifieringen får tjänsteleverantören (Cloudflare) information om din IP-adress.',
  'components.form-terms-and-conditions.download':
    'Genom att ladda ner identifierna ger du samtycke till att en automatisk identifiering används för att skilja åt mänskliga användare från botanvändare. I samband med den automatiska identifieringen får tjänsteleverantören (Cloudflare) information om din IP-adress.',
  'components.form-terms-and-conditions.links.cf-privacy-policy': 'Cloudflare dataskyddsbeskrivning',
  'components.form-terms-and-conditions.links.cf-terms-of-use': 'Cloudflare villkor',
  'components.form-terms-and-conditions.accept': 'Acceptera och fortsätt',
  'components.form-terms-and-conditions.show': 'Tillbaka',

  // Forms - terms and conditions (monograph publisher)
  'components.form-terms-and-conditions.monograph-publishers.title':
    'Då förlaget anmäler sig till ISBN-systemet, bör den beakta följande:',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-1':
    'Förläggaren måste använda ISBN-nummer i alla sina publikationer.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-2':
    'ISBN-numret ska tryckas på publikationerna det sätt som anvisas på ISBN-centralens webbplats.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-3':
    'Förläggaren ska föra en lista över sina publikationer enligt ISBN-nummer.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-4':
    'Förläggaren ska omedelbart skicka ett exemplar av alla sina publikationer till Finlands ISBN-central.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-5':
    "Förlagsinformationen publiceras i den internationella databasen 'Global Register of Publishers' och/eller 'Music Publishers' International ISMN Database'. Uppgifterna används också i Finlands ISBN-centrals verksamhet och publiceras på deras webbsida.", // eslint-disable-line quotes

  // Forms - terms and conditions (monograph publication)
  'components.form-terms-and-conditions.monograph-publications.title1': 'Viktigt att notera gällande numren',
  'components.form-terms-and-conditions.monograph-publications.note1':
    'Om ni har regelbunden förlagsverksamhet (t.ex. en eller flera publikationer per år) men ännu inte har anslutit er till ISBN-/ISMN-systemet, fyll då i den elektroniska anslutningsblanketten och ansökningsblanketten för ISBN-/ISMN-nummer.',

  'components.form-terms-and-conditions.monograph-publications.title2':
    'Genom att ansöka om ISBN-/ISMN-nummer godkänner du följande villkor:',
  'components.form-terms-and-conditions.monograph-publications.responsibility-1':
    "Förlagsinformationen publiceras i den internationella databasen 'Global Register of Publishers' och/eller 'Music Publishers' International ISMN Database'.", // eslint-disable-line quotes
  'components.form-terms-and-conditions.monograph-publications.responsibility-2':
    'Uppgifterna används också av Finlands ISBN-central och/eller de kan sökas i förlagsregistret.',

  // Forms - terms and conditions (serial publication)
  'components.form-terms-and-conditions.serial-publications.title':
    'Vänligen observera följande när du gör din ansökan',
  'components.form-terms-and-conditions.serial-publications.subtitle1': 'Max antal publikationer',
  'components.form-terms-and-conditions.serial-publications.subtitle2': 'Publikationens övriga språkversioner',
  'components.form-terms-and-conditions.serial-publications.subtitle3': 'Publikationens övriga medier',

  'components.form-terms-and-conditions.serial-publications.paragraph1':
    'Med ett ISSN-formulär går det att ansöka om ISSN för högst fyra publikationer. Ifall du behöver ISSN för flera publikationer, ta kontakt med ISSN-centralen.',
  'components.form-terms-and-conditions.serial-publications.paragraph2':
    'Om samma publikation ges ut i sin helhet på flera olika språk, ska varje språkversion ha ett separat ISSN som skiljer den från de andra versionerna. Språkversionen måste ha en separat numrering. Fyll i uppgifter om varje språkversion separat.',
  'components.form-terms-and-conditions.serial-publications.paragraph3':
    'Om samma publikation ges ut regelbundet också i en annan publikationsform (tryckt, webbpublikation), ska den andra formen ha ett separat ISSN. Fyll i uppgifter om varje publikationsformat separat.',

  'components.form-terms-and-conditions.serial-publications.note':
    'Ansök om identifikator för webbversionen först då publikationen är färdig.',

  // Forms - common
  'forms.common.fields.boolean.true': 'Ja',
  'forms.common.fields.boolean.false': 'Nej',

  'forms.common.fields.language-code': 'Kontaktspråk',
  'forms.common.fields.language-code.fi-FI': 'Finska',
  'forms.common.fields.language-code.sv-SE': 'Svenska',
  'forms.common.fields.language-code.en-GB': 'Engelska',

  'forms.common.fields.contact-person': 'Kontaktperson',
  'forms.common.fields.contact-person.placeholder': 't.ex. Matti Meikäläinen',

  'forms.common.fields.official-name': 'Förlagets namn',
  'forms.common.fields.official-name.placeholder': 't.ex. Kustantamo Oy eller Matti Meikäläinen',

  'forms.common.fields.address': 'Adress',
  'forms.common.fields.address.placeholder': 't.ex. Esimerkkikatu 1',

  'forms.common.fields.zip': 'Postnummer',
  'forms.common.fields.zip.placeholder': 't.ex. 00014',

  'forms.common.fields.city': 'Postanstalt',
  'forms.common.fields.city.placeholder': 't.ex. Helsinki',

  'forms.common.fields.phone': 'Telefon',
  'forms.common.fields.phone.placeholder': 't.ex. 0401234567',

  'forms.common.fields.email': 'E-post',
  'forms.common.fields.email.placeholder': 't.ex. matti.meikalainen@example.com',

  'forms.common.fields.language': 'Publikationens språk',
  'forms.common.fields.language.placeholder': 'Välja språk',
  'forms.common.fields.language.FIN': 'finska',
  'forms.common.fields.language.SWE': 'svenska',
  'forms.common.fields.language.ENG': 'engelska',
  'forms.common.fields.language.SMI': 'samiska',
  'forms.common.fields.language.SPA': 'spanska',
  'forms.common.fields.language.FRE': 'franska',
  'forms.common.fields.language.GER': 'tyska',
  'forms.common.fields.language.RUS': 'ryska',
  'forms.common.fields.language.MUL': 'annan eller tvåspråkig',

  'forms.common.fields.series-name': 'Seriens titel',
  'forms.common.fields.series-name.placeholder': 't.ex. Tietolinja',
  'forms.common.fields.series-volume': 'Nummer i serien',
  'forms.common.fields.series-volume.placeholder': 't.ex. 1/2025',
  'forms.common.fields.issn': 'ISSN',
  'forms.common.fields.issn.placeholder': 't.ex. 1239-9132',

  'forms.common.fields.select.placeholder': 'Välja',

  // Forms - Monograph Publisher registration
  'forms.monograph-publishers.title': 'Anslutningsblankett för ISBN-/ISMN-systemet',
  'forms.monograph-publishers.headings.name': 'UPPGIFTER OM FÖRLAGETS NAMN',
  'forms.monograph-publishers.headings.basic-information': 'UPPGIFTER OM FÖRLAGSVERKSAMSHETEN',
  'forms.monograph-publishers.headings.contact-information': 'KONTAKTUPPGIFTER',
  'forms.monograph-publishers.headings.organization-information': 'UPPGIFTER OM FÖRLAGETS ORGANISATION',

  'forms.monograph-publishers.fields.other-name': 'Övriga namn',
  'forms.monograph-publishers.fields.other-name.placeholder': 't.ex. MM-kustantamo',
  'forms.monograph-publishers.fields.other-name.add-guide': 'Lägg till',

  'forms.monograph-publishers.fields.add-other-name': 'Lägg till',
  'forms.monograph-publishers.fields.max-other-name': 'Högst fyra andra namn tillåts',

  'forms.monograph-publishers.fields.www': 'Webbadress',
  'forms.monograph-publishers.fields.www.placeholder': 't.ex. https://example.com',

  'forms.monograph-publishers.fields.frequency-current': 'Hur många publikationer ger ni ut i år?',
  'forms.monograph-publishers.fields.frequency-current.placeholder': 't.ex. 10',

  'forms.monograph-publishers.fields.frequency-next': 'Kalkyl för nästa år',
  'forms.monograph-publishers.fields.frequency-next.placeholder': 't.ex. 10',

  'forms.monograph-publishers.fields.affiliate-of': 'Moderbolag',
  'forms.monograph-publishers.fields.affiliate-of.placeholder': 't.ex. Emo-Yhtiö Oy',

  'forms.monograph-publishers.fields.affiliates': 'Dotterbolag',
  'forms.monograph-publishers.fields.affiliates.placeholder': 't.ex. Tytär-yhtiö Oy',

  'forms.monograph-publishers.fields.distributors': 'Fungerar ni som distributör eller agent för andra företag?',
  'forms.monograph-publishers.fields.distributors.placeholder': 't.ex. Jakeluyritys ABCDE',

  'forms.monograph-publishers.fields.distributor-of':
    'Har ni någon annan leverantör eller ombud för era publikationer?',
  'forms.monograph-publishers.fields.distributor-of.placeholder': 't.ex. ABCDE-yhtiö',

  'forms.monograph-publishers.notes.affiliates':
    'Har ert förlag/institut moderbolag eller dotterbolag som sysslar med förlagsverksamhet i Finland eller utomlands? I detta fall ber vi er anmäla namnet och antalet publikationer som ges ut årligen.',
  'forms.monograph-publishers.notes.affiliate-of':
    'Är ni enda leverantör eller ombud för något bolag som sysslar med förlagsverksamhet utomlands eller i Finland? Ge namn och adress.',

  // Forms - Monograph Publication request
  'forms.monograph-publications.title': 'Ansökningsblankett för ISBN/ISMN',

  // Monograph Publication Request - headings
  'forms.monograph-publications.headings.basic-information': 'BASUPPGIFTER',
  'forms.monograph-publications.headings.publisher-information': 'UPPGIFTER OM FÖRLAGGAREN',
  'forms.monograph-publications.headings.publication-information': 'FÖRHANDSUPPGIFTER OM PUBLIKATIONEN',
  'forms.monograph-publications.headings.contact-information': 'KONTAKTUPPGIFTER',
  'forms.monograph-publications.headings.series-information': 'SERIENS UPPGIFTER',
  'forms.monograph-publications.headings.author-information': 'UPPGIFTER OM UPPHOV',
  'forms.monograph-publications.headings.other-information': 'TILLÄGGSUPPGIFTER',

  // Monograph Publication Request - descriptions
  'forms.monograph-publications.descriptions.series-information':
    'Fyll i följande uppgifter om publikationen ingår i en serie:',

  // Monograph Publication Request - notes
  'forms.monograph-publications.notes.dissertation-locality':
    'Kontrollera om du får ett ISBN-nummer från din institution/avdelning/universitetet. Om doktorsavhandlingen ingår i serien Dissertationes Universitatis Helsingiensis får du numret av Unigrafia. Om du disputerar någon annanstans än vid Helsingfors universitet ska du be institutionen/fakulteten om ett ISBN-nummer. Kontakta ISBN-centralen vid behov.',

  // Monograph Publication Request - Publisher / Publication basic information
  'forms.monograph-publications.fields.publications-public':
    'Publikationen är avsedd för allmän spridning (t.ex. för utlåning i bibliotek eller försäljning i bokhandel)',

  'forms.monograph-publications.fields.publication-type': 'Publikationen är',
  'forms.monograph-publications.fields.publication-type.placeholder': 'Välja',

  'forms.monograph-publications.fields.publication-type.BOOK': 'Bok',
  'forms.monograph-publications.fields.publication-type.DISSERTATION': 'Dissertation',
  'forms.monograph-publications.fields.publication-type.SHEET_MUSIC': 'Notpublikation',
  'forms.monograph-publications.fields.publication-type.MAP': 'Karta',
  'forms.monograph-publications.fields.publication-type.OTHER': 'Annan',

  'forms.monograph-publications.fields.type': 'Publikationsform',
  'forms.monograph-publications.fields.type.placeholder': 'Välj minst ett alternativ',
  'forms.monograph-publications.fields.type.PAPERBACK': 'Mjuka pärmar',
  'forms.monograph-publications.fields.type.HARDBACK': 'Hårda pärmar',
  'forms.monograph-publications.fields.type.SPIRAL_BINDING': 'Spiralrygg',
  'forms.monograph-publications.fields.type.OTHER_PRINT': 'Annan (tryckt)',

  'forms.monograph-publications.fields.type-other': 'Om annan, vilken?',
  'forms.monograph-publications.fields.type-other.placeholder': 'Precisera typen av pärm här',

  'forms.monograph-publications.fields.fileformat': 'Filformat',
  'forms.monograph-publications.fields.fileformat.placeholder': 'Välj minst ett alternativ',
  'forms.monograph-publications.fields.fileformat.PDF': 'PDF',
  'forms.monograph-publications.fields.fileformat.EPUB': 'EPUB',
  'forms.monograph-publications.fields.fileformat.CD_ROM': 'CD-ROM',
  'forms.monograph-publications.fields.fileformat.MP3': 'MP3',
  'forms.monograph-publications.fields.fileformat.OTHER': 'Annan (webpublikation)',

  'forms.monograph-publications.fields.fileformat-other': 'Om annan, vilken?',
  'forms.monograph-publications.fields.fileformat-other.placeholder': 'Precisera filformatet här',

  'forms.monograph-publications.fields.title': 'Titel',
  'forms.monograph-publications.fields.title.placeholder': 't.ex. Matti Meikäläisen seikkailut',

  'forms.monograph-publications.fields.subtitle': 'Undertitel',
  'forms.monograph-publications.fields.subtitle.placeholder': 't.ex. Romaani',

  'forms.monograph-publications.fields.locality': 'Universitetsstad',

  'forms.monograph-publications.fields.publication-format': 'Format',
  'forms.monograph-publications.fields.publication-format.placeholder': 'Välja',
  'forms.monograph-publications.fields.publication-format.PRINT': 'I tryckt form',
  'forms.monograph-publications.fields.publication-format.ELECTRONICAL': 'I elektronisk form',
  'forms.monograph-publications.fields.publication-format.PRINT_ELECTRONICAL': 'I både tryckt och elektronisk form',

  'forms.monograph-publications.fields.printing-house': 'Tryckeri',
  'forms.monograph-publications.fields.printing-house.placeholder': 't.ex. Esimerkkipaino Oy',

  'forms.monograph-publications.fields.printing-house-city': 'Tillverkarens hemort',
  'forms.monograph-publications.fields.printing-house-city.placeholder': 't.ex. Helsinki',

  'forms.monograph-publications.fields.edition': 'Upplagans nummer',
  'forms.monograph-publications.fields.edition.placeholder': 't.ex. 2',

  'forms.monograph-publications.fields.copies': 'Upplagans storlek',
  'forms.monograph-publications.fields.copies.placeholder': 't.ex. 300',

  'forms.monograph-publications.fields.year': 'Publikationsår',
  'forms.monograph-publications.fields.year.placeholder': 'Välja',
  'forms.monograph-publications.fields.month': 'Publikationsmånad',
  'forms.monograph-publications.fields.month.placeholder': 'Välja',

  'forms.monograph-publications.fields.month.01': 'januari',
  'forms.monograph-publications.fields.month.02': 'februari',
  'forms.monograph-publications.fields.month.03': 'mars',
  'forms.monograph-publications.fields.month.04': 'april',
  'forms.monograph-publications.fields.month.05': 'maj',
  'forms.monograph-publications.fields.month.06': 'juni',
  'forms.monograph-publications.fields.month.07': 'juli',
  'forms.monograph-publications.fields.month.08': 'augusti',
  'forms.monograph-publications.fields.month.09': 'september',
  'forms.monograph-publications.fields.month.10': 'oktober',
  'forms.monograph-publications.fields.month.11': 'november',
  'forms.monograph-publications.fields.month.12': 'december',

  'forms.monograph-publications.notifications.publication-time':
    'En identifikator kan inte ansökas i efterhand, om en bok är redan tryckt eller om den redan publicerats på nätet.',

  'forms.monograph-publications.fields.map-scale': 'Skala',
  'forms.monograph-publications.fields.map-scale.placeholder': 't.ex. 1:20000',

  // Monograph Publication Request - Publisher / Contact information card
  'forms.monograph-publications.fields.publications-public.placeholder': 'Välja',

  'forms.monograph-publications.fields.published-before': 'Jag har haft förlagsverksamhet förut',

  'forms.monograph-publications.fields.publisher-identifier-str': 'Förlagsbeteckning',
  'forms.monograph-publications.fields.publisher-identifier-str.placeholder': 't.ex. 978-952-84',
  'forms.monograph-publications.fields.publisher-identifier-str.description':
    'Om du inte har en förlagsbeteckning, lämna fältet tomt',

  'forms.monograph-publications.fields.publishing-activity': 'Verksamheten är',
  'forms.monograph-publications.fields.publishing-activity.placeholder': 'Välja',
  'forms.monograph-publications.fields.publishing-activity.OCCASIONAL': 'Tillfällig',
  'forms.monograph-publications.fields.publishing-activity.CONTINUOUS': 'Kontinuerlig',

  'forms.monograph-publications.fields.publishing-activity-amount':
    'Om verksamheten är kontinuerlig, hur många publikationer ger ni ut per år?',
  'forms.monograph-publications.fields.publishing-activity-amount.placeholder': 't.ex. 10',

  // Monograph Publication Request - Author card
  'forms.monograph-publications.fields.number-of-authors': 'Antalet författare',
  'forms.monograph-publications.fields.number-of-authors.description':
    'Du kan lägga till högst fyra författare (OBS! Endast en författare för doktorsavhandlingar). Resten av författarna beaktas när verket anländer till Nationalbiblioteket.',
  'forms.monograph-publications.fields.number-of-authors.1': 'Ett',
  'forms.monograph-publications.fields.number-of-authors.2': 'Två',
  'forms.monograph-publications.fields.number-of-authors.3': 'Tre',
  'forms.monograph-publications.fields.number-of-authors.4': 'Fyra',

  'forms.monograph-publications.fields.author.firstname': 'Förnamn',
  'forms.monograph-publications.fields.author.firstname.placeholder': 't.ex. Matti',
  'forms.monograph-publications.fields.author.lastname': 'Efternamn',
  'forms.monograph-publications.fields.author.lastname.placeholder': 't.ex. Meikäläinen',
  'forms.monograph-publications.fields.author.role': 'Roll',
  'forms.monograph-publications.fields.author.role.placeholder': 'Välja minst en roll',

  'forms.monograph-publications.fields.author.role.AUTHOR': 'författare',
  'forms.monograph-publications.fields.author.role.ILLUSTRATOR': 'illustratör',
  'forms.monograph-publications.fields.author.role.TRANSLATOR': 'översättare',
  'forms.monograph-publications.fields.author.role.EDITOR': 'redaktör',

  // Monograph Publication Request - Additional information
  'forms.monograph-publications.fields.comments': 'Tilläggsuppgifter',
  'forms.monograph-publications.fields.comments.placeholder': 'Ange tilläggsuppgift',

  // Forms - Serial Publication Request
  'forms.serial-publications.title': 'Ansökningsblankett för ISSN',

  // Serial Publication Request - Headings
  'forms.serial-publications.headings.number-of-publications': 'ANTALET PUBLIKATIONER',
  'forms.serial-publications.headings.publisher-information': 'UPPGIFTER OM UTGIVAREN',
  'forms.serial-publications.headings.publication-information': 'PUBLIKATION',

  // Serial Publication Request - Publisher information card
  'forms.serial-publications.fields.publisher': 'Utgivarens namn',
  'forms.serial-publications.fields.publisher.placeholder': 't.ex. Julkaisija Oy tai Matti Meikäläinen',

  // Serial Publication Request - Publications
  'forms.serial-publications.fields.add-publication': 'Lägg till',
  'forms.serial-publications.fields.add-publication-disabled': 'Du kan tillägga högst 4 publikationer',
  'forms.serial-publications.fields.delete-publication': 'Ta bort',

  'forms.serial-publications.fields.title': 'Publikationens titel',
  'forms.serial-publications.fields.title.placeholder': 't.ex. Report series',

  'forms.serial-publications.fields.subtitle': 'Undertitel',
  'forms.serial-publications.fields.subtitle.placeholder': 't.ex. kundtidningen',

  'forms.serial-publications.fields.place-of-publication': 'Utgivningsort',
  'forms.serial-publications.fields.place-of-publication.placeholder': 't.ex. Helsinki',

  'forms.serial-publications.fields.printer': 'Tryckeri',
  'forms.serial-publications.fields.printer.placeholder': 't.ex. Esimerkkipaino Oy',

  'forms.serial-publications.fields.issued-from-year': 'Startår',
  'forms.serial-publications.fields.issued-from-year.placeholder': 't.ex. 2025',

  'forms.serial-publications.fields.issued-from-number': 'Från nummer',
  'forms.serial-publications.fields.issued-from-number.placeholder': 't.ex. 1',

  'forms.serial-publications.fields.frequency': 'Utgivningsfrekvens',
  'forms.serial-publications.fields.frequency.a': 'En gång om året',
  'forms.serial-publications.fields.frequency.f': 'Två gånger per år',
  'forms.serial-publications.fields.frequency.q': 'Fyra gånger per år',
  'forms.serial-publications.fields.frequency.b': 'Sex gånger per år',
  'forms.serial-publications.fields.frequency.m': 'En gång i månaden',
  'forms.serial-publications.fields.frequency.w': 'En gång i veckan',
  'forms.serial-publications.fields.frequency.d': 'Dagligen',
  'forms.serial-publications.fields.frequency.k': 'Uppdateras kontinuerlig',
  'forms.serial-publications.fields.frequency.#': 'Irregular',
  'forms.serial-publications.fields.frequency.z': 'Annan',

  'forms.serial-publications.fields.frequency-other': 'Om annan, vilken?',
  'forms.serial-publications.fields.frequency-other.placeholder': 't.ex. en gång per två år',

  'forms.serial-publications.fields.publication-type': 'Publikationstyp',
  'forms.serial-publications.fields.publication-type.placeholder': 'Välja',
  'forms.serial-publications.fields.publication-type.JOURNAL': 'Tidskrift (avgiftsbelagd)',
  'forms.serial-publications.fields.publication-type.NEWSLETTER': 'Info- eller kundtidningen',
  'forms.serial-publications.fields.publication-type.STAFF_MAGAZINE': 'Personaltidskrift',
  'forms.serial-publications.fields.publication-type.MEMBERSHIP_BASED_MAGAZINE': 'Medlemstidskrift',
  'forms.serial-publications.fields.publication-type.CARTOON': 'Serietidning',
  'forms.serial-publications.fields.publication-type.NEWSPAPER': 'Tidning',
  'forms.serial-publications.fields.publication-type.FREE_PAPER': 'Gratistidning',
  'forms.serial-publications.fields.publication-type.MONOGRAPHY_SERIES': 'Monografieserie',
  'forms.serial-publications.fields.publication-type.OTHER_SERIAL':
    'Annan seriepublikation (t.ex. statistik, årsbok, rapport)',

  'forms.serial-publications.fields.publication-type-other': 'Om annan, vilken?',
  'forms.serial-publications.fields.publication-type-other.placeholder': 't.ex. rapport',

  'forms.serial-publications.fields.medium': 'Publikationsform',
  'forms.serial-publications.fields.medium.placeholder': 'Välja',
  'forms.serial-publications.fields.medium.PRINTED': 'Tryckt',
  'forms.serial-publications.fields.medium.ONLINE': 'Webbpublikation',
  'forms.serial-publications.fields.medium.CDROM': 'CD-ROM',
  'forms.serial-publications.fields.medium.OTHER': 'Annan',

  'forms.serial-publications.fields.medium-other': 'Om annan, vilken?',
  'forms.serial-publications.fields.medium-other.placeholder': 't.ex. en diskett',

  'forms.serial-publications.fields.url': 'Webbadress om publikationen ges ut online',
  'forms.serial-publications.fields.url.placeholder': 't.ex. https://example.com',

  'forms.serial-publications.fields.has-previous': 'Publikationen har utkommit tidigare under en annan titel',
  'forms.serial-publications.fields.previous.title': 'Publikationens tidigare titel',
  'forms.serial-publications.fields.previous.title.placeholder': 't.ex. Report series',
  'forms.serial-publications.fields.previous.issn': 'Publikationens tidigare ISSN',
  'forms.serial-publications.fields.previous.issn.placeholder': 't.ex. 1239-9132',
  'forms.serial-publications.fields.previous.last-issued': 'Det sista numret med denna titel (nummer/år)',
  'forms.serial-publications.fields.previous.last-issued.placeholder': 't.ex. 1/2025',

  'forms.serial-publications.fields.main-series.title': 'Huvudseriens titel',
  'forms.serial-publications.fields.main-series.title.placeholder': 't.ex. Report series',
  'forms.serial-publications.fields.main-series.issn': 'Huvudseriens ISSN',
  'forms.serial-publications.fields.main-series.issn.placeholder': 't.ex. 1239-9132',

  'forms.serial-publications.fields.subseries.title': 'Underseriens titel',
  'forms.serial-publications.fields.subseries.title.placeholder': 't.ex. Report series',
  'forms.serial-publications.fields.subseries.issn': 'Underseriens ISSN',
  'forms.serial-publications.fields.subseries.issn.placeholder': 't.ex. 1239-9132',

  'forms.serial-publications.fields.another-medium.title': 'Publikationens titel',
  'forms.serial-publications.fields.another-medium.title.placeholder': 't.ex. Report series',
  'forms.serial-publications.fields.another-medium.issn': 'Publikationens ISSN',
  'forms.serial-publications.fields.another-medium.issn.placeholder': 't.ex. 1239-9132',

  'forms.serial-publications.fields.has-main-series': 'Publikationen ingår i en huvudserie',
  'forms.serial-publications.fields.has-subseries': 'Publikationen har en underserie',
  'forms.serial-publications.fields.has-another-medium': 'Publikationen har redan getts ut i en annan publikationsform',

  'forms.serial-publications.fields.additional-info': 'Tilläggsuppgifter',
  'forms.serial-publications.fields.additional-info.placeholder': 'Ange tilläggsuppgift',

  // Monograph publisher classification
  'forms.monograph-publishers.fields.classification': 'Välj ämnesord enligt den bifogade ordlistan',

  'forms.monograph-publishers.fields.classification.options.general': 'Allmänt',
  'forms.monograph-publishers.fields.classification.options.book-business-lib': 'Bokväsen. Biblioteksväsen',
  'forms.monograph-publishers.fields.classification.options.text-books': 'Läroböcker',
  'forms.monograph-publishers.fields.classification.options.children-book': 'Barn och ungdomsböcker',
  'forms.monograph-publishers.fields.classification.options.official-publication': 'Offentliga publikationer',
  'forms.monograph-publishers.fields.classification.options.university-publication':
    'Högskolornas och universitetens publikationer',
  'forms.monograph-publishers.fields.classification.options.electronic-publication': 'Elektroniska publikationer',
  'forms.monograph-publishers.fields.classification.options.audiovisual': 'Audiovisuellt material. Videor',
  'forms.monograph-publishers.fields.classification.options.philosophy': 'Filosofi',
  'forms.monograph-publishers.fields.classification.options.psychology': 'Psykologi',
  'forms.monograph-publishers.fields.classification.options.paranormal': 'Paranormala fenomen. Okkultism. Astrologi',
  'forms.monograph-publishers.fields.classification.options.religion': 'Religion. Teologi',
  'forms.monograph-publishers.fields.classification.options.christianity': 'Kristendom',
  'forms.monograph-publishers.fields.classification.options.orthodox': 'Ortodoxa kyrkan',
  'forms.monograph-publishers.fields.classification.options.other-religions': 'Övriga religioner',
  'forms.monograph-publishers.fields.classification.options.social-science': 'Samhällsvetenskaper. Sosiologi',
  'forms.monograph-publishers.fields.classification.options.political-studies':
    'Politisk vetenskap. Internationell politik',
  'forms.monograph-publishers.fields.classification.options.military': 'Krigsvetenskap',
  'forms.monograph-publishers.fields.classification.options.sociology': 'Sociologi',
  'forms.monograph-publishers.fields.classification.options.economics': 'Ekonomi',
  'forms.monograph-publishers.fields.classification.options.law': 'Rättsvetenskap',
  'forms.monograph-publishers.fields.classification.options.public-administration': 'Offentlig förvaltning',
  'forms.monograph-publishers.fields.classification.options.education': 'Pedagogik. Undervisning',
  'forms.monograph-publishers.fields.classification.options.ethnography': 'Etnografi. Folklore',
  'forms.monograph-publishers.fields.classification.options.local-history': 'Hembygdsforskning',
  'forms.monograph-publishers.fields.classification.options.social-politics': 'Socialpolitik. Socialskydd',
  'forms.monograph-publishers.fields.classification.options.mass-media': 'Massmedier',
  'forms.monograph-publishers.fields.classification.options.literature': 'Litteraturvetenskap',
  'forms.monograph-publishers.fields.classification.options.fiction': 'Skönlitteratur',
  'forms.monograph-publishers.fields.classification.options.poetry': 'Lyrik',
  'forms.monograph-publishers.fields.classification.options.cartoons': 'Serier',
  'forms.monograph-publishers.fields.classification.options.science-fiction': 'Science Fiction',
  'forms.monograph-publishers.fields.classification.options.crime-fiction': 'Kriminalromaner',
  'forms.monograph-publishers.fields.classification.options.linguistic': 'Språkvetenskap',
  'forms.monograph-publishers.fields.classification.options.sexual-minorities': 'Sexuella minoriteter',
  'forms.monograph-publishers.fields.classification.options.minorities': 'Minoriteter',
  'forms.monograph-publishers.fields.classification.options.science': 'Naturvetenskaper',
  'forms.monograph-publishers.fields.classification.options.mathematics': 'Matematik. Statistik',
  'forms.monograph-publishers.fields.classification.options.astronomy': 'Astronomi',
  'forms.monograph-publishers.fields.classification.options.physics': 'Fysik',
  'forms.monograph-publishers.fields.classification.options.chemistry': 'Kemi',
  'forms.monograph-publishers.fields.classification.options.geology': 'Geologi',
  'forms.monograph-publishers.fields.classification.options.biology': 'Biologi',
  'forms.monograph-publishers.fields.classification.options.zoology': 'Zoologi',
  'forms.monograph-publishers.fields.classification.options.botany': 'Botanik',
  'forms.monograph-publishers.fields.classification.options.environmental-studies': 'Miljövetenskaper. Miljöskydd',
  'forms.monograph-publishers.fields.classification.options.technology': 'Teknologi',
  'forms.monograph-publishers.fields.classification.options.engineering': 'Ingenjörsvetenskap. Teknik',
  'forms.monograph-publishers.fields.classification.options.industry': 'Industri',
  'forms.monograph-publishers.fields.classification.options.construction': 'Byggnadsteknik',
  'forms.monograph-publishers.fields.classification.options.transport': 'Samfärdsel. Post',
  'forms.monograph-publishers.fields.classification.options.information-tech': 'Datateknik. Informationsteknik',
  'forms.monograph-publishers.fields.classification.options.medicine': 'Medicin. Psykiatri',
  'forms.monograph-publishers.fields.classification.options.odontology': 'Odontologi',
  'forms.monograph-publishers.fields.classification.options.veteriniry': 'Veterinärmedicin',
  'forms.monograph-publishers.fields.classification.options.pharmacology': 'Farmasi. Homeopati',
  'forms.monograph-publishers.fields.classification.options.forestry': 'Skogsbruk',
  'forms.monograph-publishers.fields.classification.options.agriculture': 'Lantbruk',
  'forms.monograph-publishers.fields.classification.options.handicraft': 'Hantverk och hemslöjd',
  'forms.monograph-publishers.fields.classification.options.art': 'Konst',
  'forms.monograph-publishers.fields.classification.options.performing-art': 'Föreställande konstarter',
  'forms.monograph-publishers.fields.classification.options.theatre': 'Teater. Film',
  'forms.monograph-publishers.fields.classification.options.dance': 'Dans',
  'forms.monograph-publishers.fields.classification.options.visual-art': 'Bildkonst',
  'forms.monograph-publishers.fields.classification.options.art-history': 'Konsthistoria',
  'forms.monograph-publishers.fields.classification.options.architecture': 'Arkitektur. Konstindustri',
  'forms.monograph-publishers.fields.classification.options.fashion': 'Mode',
  'forms.monograph-publishers.fields.classification.options.music': 'Musik',
  'forms.monograph-publishers.fields.classification.options.antique': 'Antik. Samlande',
  'forms.monograph-publishers.fields.classification.options.city-regional': 'Stads- och regionsplanering',
  'forms.monograph-publishers.fields.classification.options.leisure-hobbies': 'Nöjen och hobbies',
  'forms.monograph-publishers.fields.classification.options.sports': 'Sport',
  'forms.monograph-publishers.fields.classification.options.games': 'Spel',
  'forms.monograph-publishers.fields.classification.options.hunting-fishing': 'Jakt och fiske',
  'forms.monograph-publishers.fields.classification.options.gardening': 'Trädgårdsskötsel',
  'forms.monograph-publishers.fields.classification.options.home-economic': 'Huslig ekonomi',
  'forms.monograph-publishers.fields.classification.options.health-beauty': 'Skönhet och hälsa',
  'forms.monograph-publishers.fields.classification.options.photography': 'Fotografi',
  'forms.monograph-publishers.fields.classification.options.tourism': 'Resor. Turism',
  'forms.monograph-publishers.fields.classification.options.humour': 'Humor',
  'forms.monograph-publishers.fields.classification.options.history': 'Historia',
  'forms.monograph-publishers.fields.classification.options.geography': 'Geografi',
  'forms.monograph-publishers.fields.classification.options.map-atlases': 'Kartor och atlas',
  'forms.monograph-publishers.fields.classification.options.archeology': 'Arkeologi',
  'forms.monograph-publishers.fields.classification.options.genealogy': 'Släktforskning',
  'forms.monograph-publishers.fields.classification.options.numismatics': 'Numismatik',

  'forms.monograph-publishers.fields.classification-other': 'Annan ämnesord',
  'forms.monograph-publishers.fields.classification-other.placeholder': 't.ex. Programvaruutveckling',

  // Data tables
  'data-tables.no-results': 'Inga resultat',
  'data-tables.page': 'Sidan',

  // Data tables - Monograph Publisher Search Result
  'data-tables.monograph-publisher.headers.official-name': 'Namn',
  'data-tables.monograph-publisher.headers.other-names': 'Överiga namn',

  // Components

  // Header
  'components.header.title': 'Identifikatorservice',

  'components.header.options.languages.finnish': 'Suomeksi',
  'components.header.options.languages.swedish': 'På Svenska',
  'components.header.options.languages.english': 'In English',

  // Navbar
  'components.navbar.home': 'Hemsidan',
  'components.navbar.monograph-publishers': 'Förlagsregister',
  'components.navbar.forms': 'Blanketter',
  'components.navbar.other-identifiers': 'Nationalbibliotekets andra identifikatorer',
  'components.navbar.forms.monograph-publishers': 'Anslutningsblankett för ISBN-/ISMN-systemet',
  'components.navbar.forms.monograph-publications': 'Ansökningsblankett för ISBN/ISMN',
  'components.navbar.forms.serial-publications': 'Ansökningsblankett för ISSN',
  'components.navbar.forms.change-contact-details': 'Ändring av förlaggaruppfigterna (ISBN/ISMN)',
  'components.navbar.forms.change-contact-details-mobile': 'Ändring av förlaggaruppfigterna',
  'components.navbar.menu': 'Meny',
  'components.navbar.select-language.aria-label': 'Språk',

  // Toolbar
  'components.toolbar.back-button': 'Tillbaka',

  // Multiselect
  'components.multiselect.clear': 'Rensa',
  'components.multiselect.close': 'Stäng',
  'components.multiselect.help':
    'Du kan söka genom att skriva och använda piltangenterna samt enter och esc för att navigera.',
  'components.multiselect.search': 'Sök ...',

  // Identifier batch download

  // Identifier batch dialog
  'components.identifierbatches.dialog.title': 'Vahvistus / Bekräftelse / Confirmation',
  'components.identifierbatches.dialog.description-fi':
    'Vahvistan edustavani kustantajaa #PUBLISHER ja omistavani kustantajatunnuksen #PUBLISHER-IDENTIFIER',
  'components.identifierbatches.dialog.description-sv':
    'Jag bekräftar att jag representerar förlaget #PUBLISHER och äger förlagsbeteckningen #PUBLISHER-IDENTIFIER',
  'components.identifierbatches.dialog.description-en':
    'I confirm I represent #PUBLISHER (publisher ID #PUBLISHER-IDENTIFIER)',
  'components.identifierbatches.dialog.accept': 'Kyllä / Ja / Yes',
  'components.identifierbatches.dialog.decline': 'Ei / Nej / No',

  // Identifier batch card
  'components.identifierbatches.card.batch-type':
    'Du kan söka genom att skriva och använda piltangenterna samt enter och esc för att navigera.',
  'components.identifierbatches.card.batch-identifiers': 'Antal nummer',
  'components.identifierbatches.card.download': 'Ladda ned som textfi',

  // Footer
  'components.footer.headings.main': 'Uppgifter om tjänsten',
  'components.footer.headings.contact-information': 'Kontaktinformation',
  'components.footer.headings.service-name': 'Identifikatorservice',
  'components.footer.headings.links': 'Tilläggsuppgifter',
  'components.footer.headings.social-media': 'Följ oss',

  'components.footer.contact.address': 'PB 15 (Unionsgatan 36)',
  'components.footer.contact.zip': '00014 Helsingfors universitet',
  'components.footer.contact.email-isbn-ismn': 'isbn-keskus@helsinki.fi',
  'components.footer.contact.email-issn': 'issn-keskus@helsinki.fi',
  'components.footer.contact.phone': '+358 (0)2941 44386',

  'components.footer.service.description-1':
    'Finlands ISBN-central ansvarar för distributionen av ISBN- och ISMN-nummer i Finland medan Finlands ISSN-central ansvarar för distributionen av ISSN-nummer.',
  'components.footer.service.description-2':
    'Identifikationsnumren som en del av metadata betjänar hela förlagsbranschen och bibliotekssektorn och gör det enklare att identifiera, hantera och hitta publikationer.',
  'components.footer.service.description-3':
    'Numren används bl.a. i beställnings- och distributionssystem inom förlagsbranschen för att påskynda identifieringen av publikationer samt i internationella och nationella samkataloger och bibliografier samt i lånesystem vid bibliotek och vid informationssökning.',

  'components.footer.copyright': '© Nationalbiblioteket 2026',

  'components.footer.accessibility-statement': 'Webbtillgänglighet',
  'components.footer.privacy-policy': 'Dataskydd',
  'components.footer.licenses': 'Öppen källkod licenser',
};

export default sv;
