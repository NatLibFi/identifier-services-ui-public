/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * Public UI service of Identifier Services system
 *
 * Copyright (C) 2023 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui-public
 *
 * identifier-services-ui-public program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * identifier-services-ui-public is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */

const sv = {
  // Common translations - used in multiple components
  'common.isbn': 'ISBN',
  'common.ismn': 'ISMN',
  'common.isbn-ismn': 'ISBN och ISMN',
  'common.issn': 'ISSN',
  'common.user': '', //User
  'common.users': '', //Users
  'common.publisher.isbn': 'Förläggare',
  'common.publishers.isbn': '', //Publishers
  'common.publisherDetails.isbn': 'Basuppgifter av förläggarem',
  'common.publisher.issn': '', //Publisher
  'common.publishers.issn': '', //Publishers
  'common.publisherDetails.issn': '', //Publisher details
  'common.request': '', //Request
  'common.requests': '', //Requests
  'common.requestDetails': '', //Request details
  'common.publication': 'Publikation',
  'common.publications': '', //Publications
  'common.publicationDetails': 'Uppgifter om publikation',
  'common.batch': '', //Identifier Batch
  'common.batches': '', //Identifier Batches
  'common.batchDetails': '', //Batch Details
  'common.yes': 'Ja',
  'common.no': 'Nej',
  'common.true': 'Ja',
  'common.false': 'Nej',
  'common.noData': 'Inga matchande resultat',
  'common.blank': '', //Blank
  'common.search.inputPlaceholder': 'Sök...',
  'common.search.searchById': '', //Search by ID...
  'common.search.searchByPublisherName': '', //Search by publisher name or email...
  'common.noValue': '-',
  'common.name': '', //Name
  'common.undefined': '', //Not defined
  'common.link': '', //Link
  'common.identifier': '', //Identifier
  'common.identifiers': 'Identifierare',
  'common.identifiersPrinted': 'Identifierare (tryct)',
  'common.identifiersElectronical': 'Identifierare (webpublikation)',
  'common.amount': '', //Amount
  'common.status': 'Läge',
  'common.id': 'ID',
  'common.contactDetails': 'Kontaktuppgifter',
  'common.noLink': '', //Not generated
  'common.important.info': 'Viktig information',
  'common.datePicker.helperText': '', //E.g. 06/2023
  'common.privacypolicy.title': 'Sekretesspolicy',
  'common.other': 'annan',
  'common.errorPage': '', //Error page
  'common.skipLink': '', //Skip to main content
  'common.inLibrary': '', //In National Library
  'common.free': '', //free of charge
  // Numbers
  'common.one': 'Ett',
  'common.two': 'Två',
  'common.three': 'Tre',
  'common.four': 'Fyra',
  // Publication languages
  'common.fin': 'finska',
  'common.swe': 'svenska',
  'common.eng': 'engelska',
  'common.smi': 'samiska',
  'common.fre': 'franska',
  'common.ger': 'tyska',
  'common.rus': 'ryska',
  'common.spa': 'spanska',
  'common.mul': 'annan eller tvåspråkig',
  // Publisher's preferred languages
  'common.fi-FI': 'finska',
  'common.en-GB': 'engelska',
  'common.sv-SE': 'svenska',
  // ISBN/ISMN publication types
  'common.BOOK': 'Bok',
  'common.DISSERTATION': 'Dissertation',
  'common.MUSIC': 'Notpublikation',
  'common.SHEET_MUSIC': 'Notpublikation',
  'common.MAP': 'Karta',
  'common.OTHER': 'Annan',
  // ISSN publication types
  'common.journal': 'Tidskrift (avgiftsbelagd)',
  'common.newsletter': 'Info- eller kundtidningen',
  'common.staff_magazine': 'Personaltidskrift',
  'common.membership_based_magazine': 'Medlemstidskrift',
  'common.newspaper': 'Tidning',
  'common.free_paper': 'Gratistidning',
  'common.monography_series': 'Monografieserie',
  'common.cartoon': 'Serietidning',
  'common.other_serial': 'Annan seriepublikation (t.ex. statistik, årsbok, rapport)',
  // ISSN publication frequency options
  'common.a': 'En gång om året',
  'common.f': 'Två gånger per år',
  'common.q': 'Fyra gånger per år',
  'common.b': 'Sex gånger per år',
  'common.m': 'En gång i månaden',
  'common.w': 'En gång i veckan',
  'common.d': 'Dagligen',
  'common.k': 'Uppdateras kontinuerlig',
  'common.#': 'Irregular',
  'common.z': 'Annan',
  // ISSN publication medium
  'common.printed': 'tryct',
  'common.online': 'webpublikation',
  'common.cdrom': 'CD-ROM',

  // Home page
  'homePage.title': 'Identifikatorservice',
  'homePage.description.part1': 'De internationella standardnumren (ISBN, ISMN ja ISSN) är unika identifikatorer för publikationer.',
  'homePage.description.part2': 'ISBN identifierar böcker, ISMN notpublikationer och ISSN seriella och fortlöpande publikationer.',
  'homePage.description.part3': 'I Finland sker ansökan om dessa nummer via Finlands ISBN- och ISSN-centraler. Numren är avgiftsfria.',
  'homePage.link': '', //More about {link}
  'homePage.instructions.title': 'Instruktioner för att fylla i blanketterna',
  'homePage.instructions.main.text': 'Om ni har regelbunden förlagsverksamhet men inte ännu har anslutit er till ISBN-/ISMN-systemet, fyll då i den elektroniska anslutningsblanketten och ansökningsblanketten.{lineBreak}{lineBreak} Om er förlagsverksamhet är tillfällig eller om ni redan har anslutit er till ISBN-systemet, ska ni fylla i denna blankett för att beställa ett ISBN-nummer.{lineBreak}{lineBreak} Förläggarens uppgifter publiceras i den internationella databasen Global Register of Publishers och /eller Music Publishers\' International ISMN Database och de är sökbara på ISBN-centralens hemsida.',
  'homePage.instructions.isbn-ismn.text': 'ISBN identifierar böcker och ISMN notpublikationer som är avsedda för offentligt bruk. Finlands nationella ISBN-central svarar för tilldelningen av ISBN- och ISMN i Finland. Centralen upprätthåller ett nationellt förlagsregister och förmedlar information om finländska förläggare för nationellt och internationellt bruk.{lineBreak}{lineBreak}Identifikatorer som en del av metadata betjänar hela förlagsbranschen och bibliotekssektorn och gör det enklare att identifiera, hantera och hitta publikationer. Numren används bl.a. i beställnings- och distributionssystem inom förlagsbranschen för att påskynda identifieringen av publikationer samt i internationella och nationella samkataloger och bibliografier samt i lånesystem vid bibliotek och vid informationssökning.{lineBreak}{lineBreak}Alla böcker och notpublikationer samt varje publikationsform (tryckt, audiovisuell, digital) och varje ändrad upplaga av dem tilldelas ett eget ISBN eller ISMN. Detta underlättar identifieringen av publikationer i förlagsbranschens distributionskedja och garanterar att kunden får önskad publikation. Publikationsformen kan vara tryckt bok, audiovisuell eller elektronisk publikation.',
  'homePage.instructions.issn.text': 'ISSN är en identifikator för seriella och fortlöpande publikationer, som tidningar och serier. Finlands nationella ISSN-central tillhandahåller ISSN i Finland och sänder informationen om publikationer som tilldelats ISSN till databasen {link}.{lineBreak}{lineBreak}Identifikationsnumren som en del av metadata betjänar hela förlagsbranschen och bibliotekssektorn och gör det enklare att identifiera, hantera och hitta publikationer.{lineBreak}{lineBreak}ISSN används bl.a. för snabbidentifiering av publikationer i branschens prenumerations- och distributionssystem, i nationella och internationella samkataloger, i bibliografier, i bibliotekens lånesystem, i informationssökning. ISSN är bundet till publikationens titel – om titeln ändras måste också numret ändras. För olika publikationsformer (olika fysiska medier) ges separata ISSN.',

  // Menu bar
  'menu.home': 'Framsida',
  'menu.publisherRegistry': 'Förlagsregister',
  'menu.forms': 'Blanketter',
  'menu.forms.publisherRegistration': 'Anslutningsblankett för ISBN-/ISMN-systemet',
  'menu.forms.publicationRegistration': '', //ISBN-/ISMN-forms
  'menu.forms.issnPublicationRegistration': '', //ISSN-form
  'menu.forms.publicationRegistration.isbn-ismn': 'Ansökningsblankett för ISBN/ISMN',
  'menu.forms.publicationRegistration.issn': 'Ansökningsblankett för ISSN',
  'menu.forms.contactInformationChange': 'Ändring av förläggaruppgifterna (ISBN/ISMN)',

  // Footer
  'footer.privacyPolicy': '', //Privacy policy
  'footer.library': 'Nationalbiblioteket',
  'footer.address': 'PL 15 (Unioninkatu 36)',
  'footer.zip': '00014 Helsingfors universitet',
  'footer.contact': 'Kontaktinformation',
  'footer.copyright': '© Nationalbiblioteket 2023',
  'footer.socials': '', //Follow on social media

  // Alt texts (Kuvatekstit)
  'altText.logo.library': 'Nationalbibliotekets officiella logotyp',

  // Ranges (Tunnistelohkot)
  'ranges.identifierType': '', //Identifier type

  // Error messages
  'error.field.required': '', //Required
  'error.format.issn': '', //Invalid ISSN-identifier
  'error.format.phone': '', //Invalid phone number
  'error.format.city': '', //Invalid city
  'error.format.publishingActivityAmount': '', //Max. 5 characters
  'error.format.copies': '', //Max. 10 characters
  'error.format.maxLength': '', //Given value is too long
  'error.format.minLength': '', //Given value is too short
  'error.format.integer': '', //Given value must be a number
  'error.format.integer.twoDigits': '', //Given value must be a number with two digits (e.g. 39)
  'error.format.year': '', //Invalid year
  'error.format.email': '', //Invalid email address
  'error.format.www': '', //Invalid URL, please use http:// or https://
  'error.format.edition': '', //Max 2 characters
  'error.postalAddress.zip.format': '', //Invalid postal address
  'error.postalAddress.city.format': '', //Invalid city
  'error.publicationRegistrationIsbnIsmn.form.availability': 'För publikationen som är endast för internt bruk ges inget ISBN-nummer alls.',
  'error.publicationRegistrationIsbnIsmn.form.otherUniversitites': '', //The National Library grant ISBN identifiers only for dissertations made at the University of Helsinki
  'error.date.invalid': '', //Invalid date
  'error.date.min': '', //The date to be entered must be after current date
  'error.identifierBatch.invalid': '', //Loading of identifier batch failed. Please try again or contact customer service
  'error.formEdit': '', //There are errors in the form, please check the fields marked in red:

  // Error page texts
  'errorPage.header': '', //Sorry, something went wrong
  'errorPage.message.serviceDown': '', //The service is down. Please try again later. If the problem persists, please contact customer service
  'errorPage.message.serviceUnderMaintenance': '', //The service is under maintenance. Please try again later. If the problem persists, please contact customer service
  'errorPage.message.defaultError': '', //Unknown error. Please try again or contact customer service
  'errorPage.message.generatingMessageFailed': '', //Viestipohjan hakeminen epäonnistui. Yrittäkää uudelleen tai ottakaa yhteyttä asiakaspalveluun
  'errorPage.grantingIdsMessageError': '', //Jos päädyitte tälle sivulle tunnuksen myöntämisen yhteydessä, ottakaa yhteyttä järjestelmäylläpitöön valittömästi ja ilmoittakaa virheestä (loadTemplate failed after generating new identifierBatch).
  'errorPage.publicationRequestError': '', //The page could not be loaded. Please check the address and try again. If the problem persists, please contact customer service
  'errorPage.accessdenied.heading': '', //Access denied
  'errorPage.accessdenied.message': '', //You do not have permission to access this page
  'errorPage.admin.genericError': '', //System error. Please contact system administrator for assistance

  // Common form translations - used in multiple forms
  'form.common.name': 'Förlagets namn',
  'form.common.otherNames': 'Övriga namn',
  'form.common.previousNames': 'Tidigare namn',
  'form.common.phone': 'Telefon',
  'form.common.email': 'E-post',
  'form.common.contactPerson': 'Personen som ansvarar för ISBN-numrering',
  'form.common.website': 'WWW-adress',
  'form.common.address': 'Adress',
  'form.common.addressLine1': '', //Lisäosoiterivi
  'form.common.zip': 'Postnummer',
  'form.common.city': 'Postanstalt',
  'form.common.affiliates': 'Dotterbolag',
  'form.common.affiliateOf': 'Moderbolag',
  'form.common.distributors': 'Distributors',
  'form.common.distributorOf': 'Företag vars distributör',
  'form.common.currentYear': 'Hur många publikationer ger ni ut i år?',
  'form.common.nextYear': 'Kalkyl för nästa år',
  'form.common.classification': 'Klassifikationssystem',
  'form.common.classificationOther': 'Annan klassificering',
  'form.common.classificationCodes': '', //Classification codes
  'form.common.publisherIdentifier': 'Förlagsbeteckning',
  'form.common.publisherIdentifiers': 'Förlagsnummer',
  'form.common.title': 'Titel',
  'form.common.subtitle': 'Undertitel',
  'form.common.authorName': '', //Author name
  'form.common.selectFormat': '', //Select format
  'form.common.publicationMonth': 'Publikationsmånad',
  'form.common.publicationYear': 'Publikationsår',
  'form.common.language': 'Publikationens språk',
  'form.common.identifier': '', //Identifier
  'form.common.volume': '', //Volume
  'form.common.type': 'Typ',
  'form.common.publishingActivities': 'Publikationsverksamheten',
  'form.common.instruction.multipleSelect': '', //Select one or more options from the list
  'form.common.instruction.createableSelect': '', //To add a new option, type the name of the option and press Enter
  'form.common.basicInfo': '', //Basic information
  'form.common.postalAddress': 'Postadress',
  'form.common.activeIdentifier': '', //Aktiivinen {type}-kustantajatunnus
  'form.common.organizationDetails': '', //Organisaation lisätiedot
  'form.common.frequency': '', //Kustannusaktiivisuus
  'form.common.activity': '', //Aktiivisuus
  'form.common.additionalDetails': '', //Lisätiedot
  'form.common.noAdditionalDetails': '', //Ei lisätietoja
  'form.common.createdAndUpdated': '', //Luotu ja päivitetty
  'form.common.created': '', //Luotu
  'form.common.createdBy': '', //Luonut
  'form.common.modified': '', //Viimeksi päivitetty
  'form.common.modifiedBy': '', //Päivittänyt
  'form.common.printFormat': 'Publikationsform',
  'form.common.fileFormat': 'Filformat',
  'form.common.subRangeType': '', //Kustantajatunnuksen tyyppi
  'form.common.otherInfo': '', //Muut tiedot
  'form.common.format': 'Format',
  'form.common.publicationCity': 'Utgivningsort',
  'form.common.updated': '', //Päivitetty
  'form.common.confirmation': '', //Vahvistustieto (vanha järjestelmä)
  'form.common.scale': '', //Mittakaava
  'form.common.archiveRecord': '', //Arkistotietue
  'form.common.url': 'WWW-adress',

  // Form edition translations (Painos)
  'form.edition.first': 'Första',
  'form.edition.second': 'Andra',
  'form.edition.third': 'Tredje',
  'form.edition.fourth': 'Fjärde',
  'form.edition.fifth': 'Femte',
  'form.edition.sixth': 'Sjätte',
  'form.edition.seventh': 'Sjunde',
  'form.edition.eighth': 'Åttonde',
  'form.edition.ninth': 'Nionde',
  'form.edition.tenth': 'Tionde',
  'form.edition.eleventh': 'Elfte',
  'form.edition.twelfth': 'Tolfte',
  'form.edition.thirteenth': 'Trettonde',
  'form.edition.fourteenth': 'Fjortonde',
  'form.edition.fifteenth': 'Femtonde',

  // Printed publication format (Kansityyppi)
  'form.printFormat.paperback': 'Mjuka pärmar',
  'form.printFormat.hardback': 'Hårda pärmar',
  'form.printFormat.spiral_binding': 'Spiralrygg',
  'form.printFormat.other_print': 'Annan (tryckt)',

  // File format (Tiedostomuoto)
  'form.fileFormat.pdf': 'PDF',
  'form.fileFormat.epub': 'EPUB',
  'form.fileFormat.cd_rom': 'CD-ROM',
  'form.fileFormat.mp3': 'MP3',
  'form.fileFormat.other': 'Annan (webpublikation)',

  // Frequency (Julkaisutiheys)
  'form.frequency.yearly': 'En gång om året',
  'form.frequency.monthly': 'En gång i månaden',
  'form.frequency.weekly': 'En gång i veckan',
  'form.frequency.daily': 'Dagligen',
  'form.frequency.biyearly': 'Två gånger per år',
  'form.frequency.quarterly': 'Fyra gånger per år',
  'form.frequency.bimonthly': 'Sex gånger per år',
  'form.frequency.irregular': 'Irregular',
  'form.frequency.continuously': 'Uppdateras kontinuerlig',
  'form.frequency.other': 'Annan',

  // Button labels
  'form.button.label.back': 'Tillbaka',
  'form.button.label.next': 'Fortsätt',
  'form.button.label.submit': 'Skicka',
  'form.button.label.proceed': 'Fortsätt',
  'form.button.label.add': '', //Add
  'form.button.label.addPublication': '', //Add publication
  'form.button.label.delete': 'Radera',
  'form.button.label.downloadAsTextfile': '', //Download
  'form.button.label.showIdentifiers': '', //Show Identifiers

  // Publisher registration form (Kustantajan liittymislomake)
  'form.publisherRegistration.instructions.title': 'När förläggaren anmäler sig till ISBN-systemet, åtar denne sig att iaktta följande:',
  'form.publisherRegistration.instructions.note0': 'Förläggaren måste använda ISBN-nummer i alla sina publikationer.',
  'form.publisherRegistration.instructions.note1.part1': 'ISBN-numret ska tryckas på publikationerna på sätt som anvisas på ',
  'form.publisherRegistration.instructions.note1.link': 'ISBN-centralens webbplats',
  'form.publisherRegistration.instructions.note1.part2': '.',
  'form.publisherRegistration.instructions.note2': 'Förläggaren ska föra en lista över sina publikationer enligt ISBN-nummer.',
  'form.publisherRegistration.instructions.note3': 'Förläggaren ska omedelbart skicka ett exemplar av alla sina publikationer till Finlands ISBN-central.',
  'form.publisherRegistration.instructions.note4': 'Förlagsinformationen publiceras i den internationella databasen \'Global Register of Publishers\' och/eller \'Music Publishers\' International ISMN Database\'. Uppgifterna används också i Finlands ISBN-centrals verksamhet och publiceras på dess webbplats.',
  'form.publisherRegistration.title': 'Anslutningsblankett för ISBN-/ISMN-systemet',
  'form.publisherRegistration.stepper.label.basicInformation': 'Basuppgifter',
  'form.publisherRegistration.stepper.label.publishingActivities': 'Publikationsverksamheten',
  'form.publisherRegistration.stepper.label.organizationDetails': 'Tillägsuppgifter',
  'form.publisherRegistration.stepper.label.preview': 'Granskning av uppgifterna',
  'form.publisherRegistration.basicInformation.name': 'Förlagets namn*',
  'form.publisherRegistration.basicInformation.address': 'Adress*',
  'form.publisherRegistration.basicInformation.city': 'Postanstalt*',
  'form.publisherRegistration.basicInformation.zip': 'Postnummer*',
  'form.publisherRegistration.basicInformation.phone': 'Telefon*',
  'form.publisherRegistration.basicInformation.publisherEmail': 'E-post*',
  'form.publisherRegistration.basicInformation.website': 'WWW-adress',
  'form.publisherRegistration.basicInformation.contactPerson': 'Personen som ansvarar för ISBN-numrering*',
  'form.publisherRegistration.basicInformation.email': 'E-post*',
  'form.publisherRegistration.basicInformation.otherNames': 'Övriga former av namnet',
  'form.publisherRegistration.publishingActivities.currentYear': 'Hur många publikationer ger ni ut i år?*',
  'form.publisherRegistration.publishingActivities.nextYear': 'Kalkyl för nästa år*',
  'form.publisherRegistration.publishingActivities.classification': 'Klassificeringsnummer*',
  'form.publisherRegistration.publishingActivities.classification.placeholder': 'Välj klassificeringsnummer enligt det bifogat klassifikationssystemet.',
  'form.publisherRegistration.publishingActivities.classification.instruction': '', //Klikatkaa alla olevaan kenttään oheisen luokituskaavion mukaisesti 1-4 luokitustunnusta, jotka parhaiten kuvaavat julkaisujenne aihealueita. Jos aihealueita on enemmän tai ette löydä oheisesta kaaviosta sopivaa aihealuetta, niin käyttäkää luokkaa 000 Yleistä.
  'form.publisherRegistration.publishingActivities.classificationOther': 'Om ni inte hittar ett lämpligt ämnesområde i tabellen, kan ni beskriva innehållet med några korta ord.',
  'form.publisherRegistration.organization.affiliates': 'Dotterbolag',
  'form.publisherRegistration.organization.affiliateOf': 'Moderbolag',
  'form.publisherRegistration.organization.distributors': 'Företag vars distributor eller agent',
  'form.publisherRegistration.organization.distributorOf': 'Har ni någon annan enda leverantör eller ombud för era publikationer?',
  'form.publisherRegistration.classification.general': 'Allmänt',
  'form.publisherRegistration.classification.book-business-lib': 'Bokväsen. Biblioteksväsen',
  'form.publisherRegistration.classification.text-books': 'Läroböcker',
  'form.publisherRegistration.classification.children-book': 'Barn och ungdomsböcker',
  'form.publisherRegistration.classification.official-publication': 'Offentliga publikationer',
  'form.publisherRegistration.classification.university-publication': 'Högskolornas och universitetens publikationer',
  'form.publisherRegistration.classification.electronic-publication': 'Elektroniska publikationer',
  'form.publisherRegistration.classification.audiovisual': 'Audiovisuellt material. Videor',
  'form.publisherRegistration.classification.philosophy': 'Filosofi',
  'form.publisherRegistration.classification.psychology': 'Psykologi',
  'form.publisherRegistration.classification.paranormal': 'Paranormala fenomen. Okkultism. Astrologi',
  'form.publisherRegistration.classification.religion': 'Religion. Teologi',
  'form.publisherRegistration.classification.christianity': 'Kristendom',
  'form.publisherRegistration.classification.orthodox': 'Ortodoxa kyrkan',
  'form.publisherRegistration.classification.other-religions': 'Övriga religioner',
  'form.publisherRegistration.classification.social-science': 'Samhällsvetenskaper. Sosiologi',
  'form.publisherRegistration.classification.political-studies': 'Politisk vetenskap. Internationell politik',
  'form.publisherRegistration.classification.military': 'Krigsvetenskap',
  'form.publisherRegistration.classification.sociology': 'Sociologi',
  'form.publisherRegistration.classification.economics': 'Ekonomi',
  'form.publisherRegistration.classification.law': 'Rättsvetenskap',
  'form.publisherRegistration.classification.public-administration': 'Offentlig förvaltning',
  'form.publisherRegistration.classification.education': 'Pedagogik. Undervisning',
  'form.publisherRegistration.classification.ethnography': 'Etnografi. Folklore',
  'form.publisherRegistration.classification.local-history': 'Hembygdsforskning',
  'form.publisherRegistration.classification.social-politics': 'Socialpolitik. Socialskydd',
  'form.publisherRegistration.classification.mass-media': 'Massmedier',
  'form.publisherRegistration.classification.literature': 'Litteraturvetenskap',
  'form.publisherRegistration.classification.fiction': 'Skönlitteratur',
  'form.publisherRegistration.classification.poetry': 'Lyrik',
  'form.publisherRegistration.classification.cartoons': 'Serier',
  'form.publisherRegistration.classification.science-fiction': 'Science Fiction',
  'form.publisherRegistration.classification.crime-fiction': 'Kriminalromaner',
  'form.publisherRegistration.classification.linguistic': 'Språkvetenskap',
  'form.publisherRegistration.classification.sexual-minorities': 'Sexuella minoriteter',
  'form.publisherRegistration.classification.minorities': 'Minoriteter',
  'form.publisherRegistration.classification.science': 'Naturvetenskaper',
  'form.publisherRegistration.classification.mathematics': 'Matematik. Statistik',
  'form.publisherRegistration.classification.astronomy': 'Astronomi',
  'form.publisherRegistration.classification.physics': 'Fysik',
  'form.publisherRegistration.classification.chemistry': 'Kemi',
  'form.publisherRegistration.classification.geology': 'Geologi',
  'form.publisherRegistration.classification.biology': 'Biologi',
  'form.publisherRegistration.classification.zoology': 'Zoologi',
  'form.publisherRegistration.classification.botany': 'Botanik',
  'form.publisherRegistration.classification.environmental-studies': 'Miljövetenskaper. Miljöskydd',
  'form.publisherRegistration.classification.technology': 'Teknologi',
  'form.publisherRegistration.classification.engineering': 'Ingenjörsvetenskap. Teknik',
  'form.publisherRegistration.classification.industry': 'Industri',
  'form.publisherRegistration.classification.construction': 'Byggnadsteknik',
  'form.publisherRegistration.classification.transport': 'Samfärdsel. Post',
  'form.publisherRegistration.classification.information-tech': 'Datateknik. Informationsteknik',
  'form.publisherRegistration.classification.medicine': 'Medicin. Psykiatri',
  'form.publisherRegistration.classification.odontology': 'Odontologi',
  'form.publisherRegistration.classification.veteriniry': 'Veterinärmedicin',
  'form.publisherRegistration.classification.pharmacology': 'Farmasi. Homeopati',
  'form.publisherRegistration.classification.forestry': 'Skogsbruk',
  'form.publisherRegistration.classification.agriculture': 'Lantbruk',
  'form.publisherRegistration.classification.handicraft': 'Hantverk och hemslöjd',
  'form.publisherRegistration.classification.art': 'Konst',
  'form.publisherRegistration.classification.performing-art': 'Föreställande konstarter',
  'form.publisherRegistration.classification.theatre': 'Teater. Film',
  'form.publisherRegistration.classification.dance': 'Dans',
  'form.publisherRegistration.classification.visual-art': 'Bildkonst',
  'form.publisherRegistration.classification.art-history': 'Konsthistoria',
  'form.publisherRegistration.classification.architecture': 'Arkitektur. Konstindustri',
  'form.publisherRegistration.classification.fashion': 'Mode',
  'form.publisherRegistration.classification.music': 'Musik',
  'form.publisherRegistration.classification.antique': 'Antik. Samlande',
  'form.publisherRegistration.classification.city-regional': 'Stads- och regionsplanering',
  'form.publisherRegistration.classification.leisure-hobbies': 'Nöjen och hobbies',
  'form.publisherRegistration.classification.sports': 'Sport',
  'form.publisherRegistration.classification.games': 'Spel',
  'form.publisherRegistration.classification.hunting-fishing': 'Jakt och fiske',
  'form.publisherRegistration.classification.gardening': 'Trädgårdsskötsel',
  'form.publisherRegistration.classification.home-economic': 'Huslig ekonomi',
  'form.publisherRegistration.classification.health-beauty': 'Skönhet och hälsa',
  'form.publisherRegistration.classification.photography': 'Fotografi',
  'form.publisherRegistration.classification.tourism': 'Resor. Turism',
  'form.publisherRegistration.classification.humour': 'Humor',
  'form.publisherRegistration.classification.history': 'Historia',
  'form.publisherRegistration.classification.geography': 'Geografi',
  'form.publisherRegistration.classification.map-atlases': 'Kartor och atlas',
  'form.publisherRegistration.classification.archeology': 'Arkeologi',
  'form.publisherRegistration.classification.genealogy': 'Släktforskning',
  'form.publisherRegistration.classification.numismatics': 'Numismatik',
  'form.publisherRegistration.preview.publishingFrequency': 'Publikationsverksamheten',
  'form.publisherRegistration.preview.organizationDetails': 'Tilläggsinformation av organisationen',
  'form.publisherRegistration.preview.postalAddress': 'Postadress',
  'form.publisherRegistration.preview.publisherInformation': 'Basuppgifter',
  'form.publisherRegistration.card.affiliates': 'Har ert förlag/institut avdelningar eller dotterbolag som sysslar med förlagsverksamhet i Finland eller utomlands? I detta fall ber vi er anmäla namnet och antalet publikationer som ges ut årligen.',
  'form.publisherRegistration.card.distributors': 'Är ni enda leverantör eller ombud för något bolag som sysslar med förlagsverksamhet utomlands eller i Finland? Ge namn och adress.',

  // ISBN/ISMN-form
  'form.isbnIsmn.title': 'Ansökningsblankett för ISBN/ISMN',
  'form.isbnIsmn.stepper.label.availabilityInformation': 'Basuppgifter',
  'form.isbnIsmn.stepper.label.publisherBasicInfo': 'Uppgifter om förläggaren',
  'form.isbnIsmn.stepper.label.publishingActivities': 'Publikationsverksamheten',
  'form.isbnIsmn.stepper.label.basicInformation': 'Förhandsuppgifter om publikationen',
  'form.isbnIsmn.stepper.label.authorInformation': 'Uppgifter om upphovsmän ',
  'form.isbnIsmn.stepper.label.seriesInformation': 'Seriens uppgifter',
  'form.isbnIsmn.stepper.label.formatBasic': 'Publikationsform',
  'form.isbnIsmn.stepper.label.additionalDetails': 'Tilläggsuppgifter',
  'form.isbnIsmn.stepper.label.dissertationFormat': '', //Dissertation format
  'form.isbnIsmn.stepper.label.contactInfo': 'Kontaktuppgifter',
  'form.isbnIsmn.stepper.label.universityInformation': '', //University information
  'form.isbnIsmn.stepper.label.preview': 'Granskning av uppgifterna',
  'form.isbnIsmn.availability.publicationsPublic': 'Är er publikation avsedd för allmän distribution, t.ex. för utlåning i bibliotek eller försäljning i bokhandel? Om publikationen är en elektronisk publikation är den fritt på nätet eller till salu?',
  'form.isbnIsmn.availability.type': 'Publikationen är*',
  'form.isbnIsmn.availability.type.option.book': 'Bok, häfte',
  'form.isbnIsmn.availability.type.option.dissertation': 'Dissertation',
  'form.isbnIsmn.availability.type.option.sheet_music': 'Notpublikation',
  'form.isbnIsmn.availability.type.option.map': 'Karta',
  'form.isbnIsmn.availability.type.option.other': 'Annan',
  'form.isbnIsmn.availability.publicationsPublic.label': 'Är er publikation utgiven för allmän spridning?',
  'form.isbnIsmn.availability.type.label': 'Publikationen är',
  'form.isbnIsmn.publisherInfo.name': 'Förlagets officiella namn*',
  'form.isbnIsmn.publisherInfo.publisherIdentifierStr': 'Förlagsbeteckning',
  'form.isbnIsmn.publisherInfo.address': 'Adress*',
  'form.isbnIsmn.publisherInfo.zip': 'Postnummer*',
  'form.isbnIsmn.publisherInfo.city': 'Postanstalt*',
  'form.isbnIsmn.publisherInfo.phone': 'Telefon*',
  'form.isbnIsmn.publisherInfo.contactPerson': 'Kontaktperson*',
  'form.isbnIsmn.publisherInfo.email': 'E-post*',
  'form.isbnIsmn.publishingActivities.hasPublishedBefore': 'Har ni gett ut publikationer tidigare?',
  'form.isbnIsmn.publishingActivities.occasionalOrContinuous': 'Är er förlagsverksamhet?*',
  'form.isbnIsmn.publishingActivities.thisYear': 'Om verksamheten är kontinuerlig, hur många publikationer ger ni ut per år?*',
  'form.isbnIsmn.publishingActivities.option.occasional': 'Tillfällig',
  'form.isbnIsmn.publishingActivities.option.continuous': 'Kontinuerlig',
  'form.isbnIsmn.university.isHelsinki': '', //Is the dissertation made for the University of Helsinki?
  'form.isbnIsmn.university.contactInfo.contactPerson': 'Kontaktperson*',
  'form.isbnIsmn.university.contactInfo.address': 'Adress*',
  'form.isbnIsmn.university.contactInfo.zip': 'Postnummer*',
  'form.isbnIsmn.university.contactInfo.city': 'Postanstalt*',
  'form.isbnIsmn.university.contactInfo.phone': 'Telefon*',
  'form.isbnIsmn.university.contactInfo.email': 'E-post*',
  'form.isbnIsmn.publicationInfo.title': 'Titel*',
  'form.isbnIsmn.publicationInfo.subtitle': 'Undertitel',
  'form.isbnIsmn.publicationInfo.language': 'Publikationens språk*',
  'form.isbnIsmn.publicationInfo.scale': '', //Scale
  'form.isbnIsmn.publicationInfo.publicationMonth': 'Publikationsmånad*',
  'form.isbnIsmn.publicationInfo.publicationYear': 'Publikationsår*',
  'form.isbnIsmn.authors.givenName': 'Förnamn*',
  'form.isbnIsmn.authors.familyName': 'Efternamn*',
  'form.isbnIsmn.authors.role': 'Roll*',
  'form.isbnIsmn.authors.role.option.author': 'Författare',
  'form.isbnIsmn.authors.role.option.illustrator': 'Illustratör',
  'form.isbnIsmn.authors.role.option.translator': 'Översättare',
  'form.isbnIsmn.authors.role.option.editor': 'Redaktör',
  'form.isbnIsmn.authors.card.name': 'Namn:',
  'form.isbnIsmn.authors.card.roles': 'Roll:',
  'form.isbnIsmn.authors.card.noAuthors': 'Upphovsuppgifter har inte ännu tillagts, tillägg upphovsperson genom att fylla i uppgifterna och tryck sedan på ’Lägg till’ -funktionen',
  'form.isbnIsmn.authors.card.addMoreAuthors': 'Lägg till övriga upphovspersoner genom att fylla i uppgifterna och tryck på ’Lägg till’ -funktionen. Det går att tillägga fyra upphovspersoner. De övriga upphovspersonerna beaktas då publikationen hanteras på Nationalbiblioteket.',
  'form.isbnIsmn.authors.card.maxAuthors': '', //You have added maximum amount of authors. Other authors will be considered when the publications request arrives to the National Library.
  'form.isbnIsmn.series.title': 'Seriens titel',
  'form.isbnIsmn.series.volume': 'Nummer i serien',
  'form.isbnIsmn.format.label': 'Publikationen utkommer*',
  'form.isbnIsmn.format.option.print': 'I tryct form',
  'form.isbnIsmn.format.option.electronical': 'I elektronisk form',
  'form.isbnIsmn.format.option.print_electronical': 'I både tryct och elektronisk form',
  'form.isbnIsmn.format.dissertation.option.printed': 'Tryckt (mjuka pärmar)',
  'form.isbnIsmn.format.dissertation.option.electronic': 'Webpublikation (PDF)',
  'form.isbnIsmn.format.dissertation.option.both': 'I både tryct (mjuka pärmar) och elektronisk (PDF) form',
  'form.isbnIsmn.format.dissertation.option.printed.edition': '', //Edition
  'form.isbnIsmn.format.dissertation.option.printed.manufacturer': 'Tryckeri',
  'form.isbnIsmn.format.dissertation.option.printed.city': 'Utgivningsort',
  'form.isbnIsmn.format.printFormat': 'Publikationsform*',
  'form.isbnIsmn.format.printFormat.other': 'Om annan, vilken?',
  'form.isbnIsmn.format.printFormat.printed.manufacturer': 'Tryckeri eller annan tillverkare',
  'form.isbnIsmn.format.printFormat.printed.city': 'Tillverkarens hemort',
  'form.isbnIsmn.format.printFormat.printed.edition': 'Upplagans nummer',
  'form.isbnIsmn.format.printFormat.printed.copies': 'Upplagans storlek',
  'form.isbnIsmn.format.fileFormat': 'Filformat*',
  'form.isbnIsmn.format.fileFormat.other': 'Annat',
  'form.isbnIsmn.additionalDetails': 'Tilläggsuppgifter',
  'form.isbnIsmn.preview.publisherDetails': 'Uppgifter om förläggaren',
  'form.isbnIsmn.preview.publicationInfo': 'Förhandsuppgifter om publikationen',
  'form.isbnIsmn.preview.universityName': 'Universitet',
  'form.isbnIsmn.preview.helsinki': 'Helsingfors universitet',
  'form.isbnIsmn.preview.previouslyPublished': 'Har ni ger ut publikationer tidigare?',
  'form.isbnIsmn.preview.thisYear': 'Hur många publikationer ger ni ut per år?',
  'form.isbnIsmn.preview.format': 'Publikationen utkommer',
  'form.isbnIsmn.preview.formatDetails': 'Publiceringsformat',
  'form.isbnIsmn.preview.printFormat': 'Publikationsform',
  'form.isbnIsmn.preview.printFormatOther': '', //Other cover format
  'form.isbnIsmn.preview.fileFormat': 'Filformat',
  'form.isbnIsmn.preview.fileformatOther': '', //Other file format
  'form.isbnIsmn.preview.authors': 'Uppgifter om upphovsmän',
  'form.isbnIsmn.preview.additionalDetails': 'Tilläggsuppgifter',
  'form.isbnIsmn.preview.manufacturer': 'Tryckeri',
  'form.isbnIsmn.preview.city': 'Utgivningsort',
  'form.isbnIsmn.preview.edition': '', //Edition
  'form.isbnIsmn.preview.run': '', //Copies
  'form.isbnIsmn.preview.seriesDetails': '', //Series details
  'form.isbnIsmn.preview.publicationDetails': 'Tilläggsuppgifter',
  'form.isbnIsmn.preview.isPublic': '', //Public
  'form.isbnIsmn.card.universityOfHelsinki': '', //Before you fill in this ISBN request form, please check at your department/faculty if you get an ISBN from your university.
  'form.isbnIsmn.card.otherUniversity': '', //Before you fill in this ISBN request form, please check at your department/faculty if you get an ISBN from your university. Please, contact customer service if needed
  'form.isbnIsmn.card.publicationIsPublic': 'Observera att ISBN-nummer tilldelas enbart för publikationer som är utgivna för allmän spridning. Ansök inte om ett ISBN om publikationen är enbart ägnad för en sluten krets, t.ex. vänner, släktingar eller för ett samfunds eget bruk.',
  'form.isbnIsmn.card.editionInfo': 'Om du ansöker ett standardnummer för en ny upplaga.',
  'form.isbnIsmn.card.publicationInfo': 'En identifikator kan inte ansökas i efterhand, om en bok är redan tryckt eller om den redan publicerats på nätet.',
  'form.isbnIsmn.card.seriesInfo': 'Fyll i uppgifterna om serien, ifall publikationen ingår i en serie.',

  // ISSN-form
  'form.issn.title': 'Ansökningsblankett för ISSN',
  'form.issn.stepper.label.publisherInformation': 'Uppgifter om förläggaren',
  'form.issn.stepper.label.publicationInformation_1': 'Uppgifter om publikation 1',
  'form.issn.stepper.label.publicationInformation_2': 'Uppgifter om publikation 2',
  'form.issn.stepper.label.publicationInformation_3': 'Uppgifter om publikation 3',
  'form.issn.stepper.label.publicationInformation_4': 'Uppgifter om publikation 4',
  'form.issn.stepper.label.publicationVersions': 'Antalet publikationer',
  'form.issn.stepper.label.publicationVersionsCheck': '', //Muut versiot (tarkistus)
  'form.issn.stepper.label.preview': 'Granskning',
  'form.issn.versionInfo.number_of_versions': 'Antalet publikationer',
  'form.issn.publisherInfo.name': 'Utgivarens namn*',
  'form.issn.publisherInfo.contact_person': 'Kontaktperson*',
  'form.issn.publisherInfo.email': 'E-post*',
  'form.issn.publisherInfo.phone': 'Telefon*',
  'form.issn.publisherInfo.address': 'Gatuadress*',
  'form.issn.publisherInfo.zip': 'Postnummer*',
  'form.issn.publisherInfo.city': 'Postanstalt*',
  'form.issn.publicationInfo.title': 'Publikationens titel*',
  'form.issn.publicationInfo.title.instructions': 'ISSN är bundet till publikationens titel. Titeln ska vara permanent och den måste tryckas synligt till publikationen.',
  'form.issn.publicationInfo.subtitle': 'Undertitel',
  'form.issn.publicationInfo.place_of_publication': 'Utgivningsort*',
  'form.issn.publicationInfo.printer': 'Tryckeri',
  'form.issn.publicationInfo.issued_from_year': 'Startår*',
  'form.issn.publicationInfo.issued_from_number': 'Från nummer*',
  'form.issn.publicationInfo.frequency': 'Utgivningsfrekvens*',
  'form.issn.publicationInfo.language': 'Publikationens språk*',
  'form.issn.publicationInfo.publication_type': 'Publikationstyp*',
  'form.issn.publicationInfo.other': 'annan, vilken?*',
  'form.issn.publicationInfo.medium': 'Publikationsform*',
  'form.issn.publicationInfo.url': 'Webbadress om publikationen ges ut online*',
  'form.issn.publicationInfo.previous': 'Publikationens tidigare titel*',
  'form.issn.publicationInfo.issn': 'Publikationens tidigare ISSN',
  'form.issn.publicationInfo.last_issue': 'Det sista numret med denna titel (nummer/år)',
  'form.issn.publicationInfo.main_series': 'Huvudseriens titel*',
  'form.issn.publicationInfo.main_series_issn': 'Huvudseriens ISSN',
  'form.issn.publicationInfo.subseries': 'Underseriens titel*',
  'form.issn.publicationInfo.subseries_issn': 'Underseriens ISSN',
  'form.issn.publicationInfo.another_medium': 'Publikationens titel*',
  'form.issn.publicationInfo.another_medium_issn': 'Publikationens ISSN',
  'form.issn.publicationInfo.additional_info': 'Tilläggsuppgifter',
  'form.issn.publicationInfo.publication_was_issued': 'Om publikationen har utkommit tidigare under en annan titel?',
  'form.issn.publicationInfo.publication_has_main_series': 'Om publikationen ingår i en huvudserie?',
  'form.issn.publicationInfo.publication_has_subseries': 'Om publikationen har en underserie?',
  'form.issn.publicationInfo.publication_has_another_medium': 'Om publikationen har en annan publikationsform?',
  'form.issn.publicationInfo.publication_has_another_medium.instructions': 'Om samma publikation har tidigare getts ut i olika utgåvor, ange uppgifterna om dem här.',
  'form.issn.publicationInfo.instructions.part1': 'Publikationens övriga medier',
  'form.issn.publicationInfo.instructions.part2': 'Om samma publikation ges ut regelbundet också i en annan publikationsform (tryckt, webbpublikation), ska den andra formen ha ett separat ISSN. Fyll i delen uppgifter om publikation separat för varje publikationsform.',
  'form.issn.publicationInfo.instructions.part3': 'Publikationens övriga språkversioner',
  'form.issn.publicationInfo.instructions.part4': 'Om samma publikation ges ut i sin helhet på flera olika språk, ska varje språkversion ha ett separat ISSN som skiljer den från de andra versionerna. Språkversionen måste ha en separat numrering. Fyll i delen uppgifter om publikationen separat för varje språkversion.',
  'form.issn.publicationInfo.instructions.part5': '', //Julkaisujen enimmäismäärä
  'form.issn.publicationInfo.instructions.part6': 'Med ett ISSN-formulär går det att ansöka om ISSN för högst fyra publikationer. Ifall du behöver ISSN för flera publikationer, ta kontakt med ISSN-centralen issn-keskus@helsinki.fi.',
  'form.issn.publicationInfo.instructions.part7': '{icon} Ansök om identifikator för webbversionen först då publikationen är färdig.',
  'form.issn.publicationMedium.printed': 'Tryct',
  'form.issn.publicationMedium.electronical': 'Webpublikation',
  'form.issn.publicationMedium.online': 'Webpublikation',
  'form.issn.publicationMedium.cd_rom': 'CD-ROM',
  'form.issn.publicationMedium.cdrom': 'CD-ROM',
  'form.issn.publicationMedium.other': 'Annan',
  'form.issn.publicationCard.city': 'Utgivningsort',
  'form.issn.publicationCard.firstYear': 'Startår',
  'form.issn.publicationCard.issued_from_number': 'Från nummer',
  'form.issn.publicationCard.frequency': 'Utgivningsfrekvens',
  'form.issn.publicationCard.other': 'annan, vilken?',
  'form.issn.publicationCard.publicationType': 'Publikationstyp',
  'form.issn.publicationCard.publicationMedium': 'Publikationsform',
  'form.issn.publicationCard.url': 'Www-adress',
  'form.issn.preview.publisherInfo': 'Uppgifter om förläggaren',
  'form.issn.preview.name': 'Utgivarens namn',
  'form.issn.relatedPublications': '', //Liittyvät julkaisut
  'form.issn.preview.publicationDetails': 'Uppgifter om publikation',
  'form.issn.preview.versions': '', //Julkaisun versiot
  'form.issn.preview.info': '', //HUOM! Julkaisupyynnön lähettämisen yhteydessä julkaisulle luodaan automaattisesti seuraavat versiot (jokainen versio saa oman tunnuksen):

  // ISSN request
  'request.issn.preview.title': '{index}. Publikation - {title}',

  // TableComponent
  'table.rowsPerPage': '', //Rows per page
  'table.total': '', //Total
  'table.forms': '', //Displaying
  'table.formsOnOnePage': '', //Total
  'table.headRows.active': 'Aktiva',
  'table.headRows.id': 'ID',
  'table.headRows.block': '', //Lohko
  'table.headRows.publicationType': '', //Julkaisutyyppi
  'table.headRows.identifier': '', //Identifier

  // Publisher registry (Kustantajarekisteri)
  'publisherRegistry.title': 'Sök utgivare',
  'publisherRegistry.headRows.activeIdentifiers': 'Förlagsnummer',
  'publisherRegistry.publisher.otherNameForms': 'Övriga former av namnet',
  'publisherRegistry.publisher.previousNameForms': 'Publikationens tidigare titel',
  'publisherRegistry.publisher.publisherHasQuitted': 'Förläggaren har avslutat sin verksamhet',
  'publisherRegistry.publisher.noOtherNames': '', //Ei muita nimimuotoja
  'publisherRegistry.publisher.noPreviousNames': '', //Ei aiempia nimiä
  'publisherRegistry.publisher.typeOther': '', //Muut kansityypit
  'publisherRegistry.publisher.fileFormatOther': '', //Muut tiedostomuodot
  'publisherRegistry.publisher.manufacturer': '', //Kirjapaino
  'publisherRegistry.publisher.run': '', //Painoksen suuruus
  'publisherRegistry.publisher.edition': '', //Painos
  'publisherRegistry.publisher.role': '', //Rooli
  'publisherRegistry.popover.isbn': '', //ISBN - Kirjat
  'publisherRegistry.popover.ismn': '', //ISMN - Nuottijulkaisut

  // ISSN publication
  'publication.issn.title': '', //Search ISSN publication by title
  'publication.issn.additionalDetails': 'Tilläggsuppgifter',
  'publication.issn.manufacturer': 'Tryckeri',
  'publication.issn.frequency': 'Utgivningsfrekvens',
  'publication.issn.other': 'Annan, vilken?',
  'publication.issn.firstYear': 'Startår',
  'publication.issn.issued_from_number': 'Från nummer',
  'publication.issn.type': 'Publikationstyp',
  'publication.issn.anotherFormat': 'Annan publikationsform',
  'publication.issn.mainSeries': 'Huvudserie',
  'publication.issn.subSeries': 'Underserie',
  'publication.issn.previousNameForms': 'Publikationens tidigare titel',
  'publication.issn.lastIssue': 'Det sista numret med denna titel (nummer/år)',

  // Modals - used in multiple places in modal components
  'modal.publicBatch.confirmation': '', //Confirmation
  'modal.publicBatch.confirmation.text.part1': '', //I confirm that I represent the publisher
  'modal.publicBatch.confirmation.text.part2': '', // and I am the owner of the publisher identifier

  // Service messages - used in action dispatchers (store/actions)
  'serviceMessage.registration.success': 'Formuläret har skickats',
  'serviceMessage.registration.error': '', //Registration request failed
  'serviceMessage.requestCreate.successfull': '', //Request sent successfully
  'serviceMessage.requestCreate.unsuccessfull': '', //Request sending failed
  'serviceMessage.requestQuery.unsuccessfull': '', //Pyyntöjen haku epäonnistui
  'serviceMessage.requestRead.unsuccessfull': '', //Pyynnön haku epäonnistui
  'serviceMessage.publisherRead.unsuccessfull': '', //Publisher read failed
  'serviceMessage.publisherSearch.unsuccessfull': '', //Publisher search failed
  'serviceMessage.batchRead.unsuccessfull': '', //Batch read failed
  'serviceMessage.batchQuery.unsuccessfull': '', //Batches query failed
  'serviceMessage.batchDownload.successfull': '', //Downloaded successfully
  'serviceMessage.batchDownload.unsuccessfull': '' //Tunnuksien lataus epäonnistui
};

export default sv;
