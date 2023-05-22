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

export const PUBLICATION_TYPES = {
  BOOK: 'BOOK',
  DISSERTATION: 'DISSERTATION',
  MAP: 'MAP',
  SHEET_MUSIC: 'SHEET_MUSIC',
  OTHER: 'OTHER'
};

export const ISSN_PUBLICATION_TYPES = {
  JOURNAL: 'JOURNAL',
  NEWSLETTER: 'NEWSLETTER',
  STAFFMAGAZINE: 'STAFF_MAGAZINE',
  MEMBERSHIPMAGAZINE: 'MEMBERSHIP_BASED_MAGAZINE',
  NEWSPAPER: 'NEWSPAPER',
  FREEPAPER: 'FREE_PAPER',
  MONOGRAPHY: 'MONOGRAPHY_SERIES',
  CARTOON: 'CARTOON',
  OTHER: 'OTHER_SERIAL'
};

export const ISSN_PUBLICATION_FREQUENCY = {
  YEARLY: 'a',
  BIYEARLY: 'f', // i.e. twice a year
  QUARTERLY: 'q',
  BIMONTHLY: 'b', // i.e. six times a year / every two months
  MONTHLY: 'm',
  WEEKLY: 'w',
  DAILY: 'd',
  CONTINUOUSLY: 'k',
  IRREGULAR: '#',
  OTHER: 'z'
};

export const FORMATS = {
  PRINT: 'PRINT',
  ELECTRONICAL: 'ELECTRONICAL',
  PRINT_ELECTRONICAL: 'PRINT_ELECTRONICAL'
};

export const MEDIUM = {
  PRINT: 'PRINTED',
  ELECTRONICAL: 'ONLINE',
  CD_ROM: 'CDROM',
  OTHER: 'OTHER'
};

export const PUBLISHING_ACTIVITIES_TYPE = {
  CONTINUOUS: 'CONTINUOUS',
  OCCASIONAL: 'OCCASIONAL'
};

export const ELECTRONICAL_FORMATS = {
  PDF: 'PDF',
  EPUB: 'EPUB',
  CD_ROM: 'CD_ROM',
  MP3: 'MP3',
  OTHER: 'OTHER'
};

export const PRINT_FORMATS = {
  PAPERBACK: 'PAPERBACK',
  HARDBACK: 'HARDBACK',
  SPIRAL_BINDING: 'SPIRAL_BINDING',
  OTHER_PRINT: 'OTHER_PRINT'
};

export const PUBLISHER_LANGUAGES = {
  fi: 'fi-FI',
  sv: 'sv-SE',
  en: 'en-GB'
};

export const publicationTypeOptions = [
  {label: 'common.BOOK', value: PUBLICATION_TYPES.BOOK},
  {label: 'common.DISSERTATION', value: PUBLICATION_TYPES.DISSERTATION},
  {label: 'common.MAP', value: PUBLICATION_TYPES.MAP},
  {label: 'common.SHEET_MUSIC', value: PUBLICATION_TYPES.SHEET_MUSIC},
  {label: 'common.OTHER', value: PUBLICATION_TYPES.OTHER}
];

export const issnPublicationTypeOptions = [
  {label: '', value: ''},
  {label: 'common.journal', value: ISSN_PUBLICATION_TYPES.JOURNAL},
  {label: 'common.newsletter', value: ISSN_PUBLICATION_TYPES.NEWSLETTER},
  {label: 'common.staff_magazine', value: ISSN_PUBLICATION_TYPES.STAFFMAGAZINE},
  {label: 'common.membership_based_magazine', value: ISSN_PUBLICATION_TYPES.MEMBERSHIPMAGAZINE},
  {label: 'common.newspaper', value: ISSN_PUBLICATION_TYPES.NEWSPAPER},
  {label: 'common.free_paper', value: ISSN_PUBLICATION_TYPES.FREEPAPER},
  {label: 'common.monography_series', value: ISSN_PUBLICATION_TYPES.MONOGRAPHY},
  {label: 'common.cartoon', value: ISSN_PUBLICATION_TYPES.CARTOON},
  {label: 'common.other_serial', value: ISSN_PUBLICATION_TYPES.OTHER}
];

export const publicationFormatOptions = [
  {label: 'form.isbnIsmn.format.option.print', value: FORMATS.PRINT},
  {label: 'form.isbnIsmn.format.option.electronical', value: FORMATS.ELECTRONICAL},
  {label: 'form.isbnIsmn.format.option.print_electronical', value: FORMATS.PRINT_ELECTRONICAL}
];

export const mediumOptions = [
  {label: '', value: ''},
  {label: 'form.issn.publicationMedium.printed', value: MEDIUM.PRINT},
  {label: 'form.issn.publicationMedium.electronical', value: MEDIUM.ELECTRONICAL},
  {label: 'form.issn.publicationMedium.cd_rom', value: MEDIUM.CD_ROM},
  {label: 'form.issn.publicationMedium.other', value: MEDIUM.OTHER}
];

export const issnPublicationFrequencyOptions = [
  {label: '', value: ''},
  {label: 'form.frequency.yearly', value: ISSN_PUBLICATION_FREQUENCY.YEARLY},
  {label: 'form.frequency.monthly', value: ISSN_PUBLICATION_FREQUENCY.MONTHLY},
  {label: 'form.frequency.weekly', value: ISSN_PUBLICATION_FREQUENCY.WEEKLY},
  {label: 'form.frequency.daily', value: ISSN_PUBLICATION_FREQUENCY.DAILY},
  {label: 'form.frequency.biyearly', value: ISSN_PUBLICATION_FREQUENCY.BIYEARLY},
  {label: 'form.frequency.quarterly', value: ISSN_PUBLICATION_FREQUENCY.QUARTERLY},
  {label: 'form.frequency.bimonthly', value: ISSN_PUBLICATION_FREQUENCY.BIMONTHLY},
  {label: 'form.frequency.irregular', value: ISSN_PUBLICATION_FREQUENCY.IRREGULAR},
  {label: 'form.frequency.continuously', value: ISSN_PUBLICATION_FREQUENCY.CONTINUOUSLY},
  {label: 'form.frequency.other', value: ISSN_PUBLICATION_FREQUENCY.OTHER}
];

export const publisherPublishingActivityOptions = [
  {label: 'form.isbnIsmn.publishingActivities.option.continuous', value: PUBLISHING_ACTIVITIES_TYPE.CONTINUOUS},
  {label: 'form.isbnIsmn.publishingActivities.option.occasional', value: PUBLISHING_ACTIVITIES_TYPE.OCCASIONAL}
];

export const electronicFormats = [
  {label: 'form.fileFormat.pdf', value: ELECTRONICAL_FORMATS.PDF},
  {label: 'form.fileFormat.epub', value: ELECTRONICAL_FORMATS.EPUB},
  {label: 'form.fileFormat.cd_rom', value: ELECTRONICAL_FORMATS.CD_ROM},
  {label: 'form.fileFormat.mp3', value: ELECTRONICAL_FORMATS.MP3},
  {label: 'form.fileFormat.other', value: ELECTRONICAL_FORMATS.OTHER}
];

export const printFormats = [
  {label: 'form.printFormat.paperback', value: PRINT_FORMATS.PAPERBACK},
  {label: 'form.printFormat.hardback', value: PRINT_FORMATS.HARDBACK},
  {label: 'form.printFormat.spiral_binding', value: PRINT_FORMATS.SPIRAL_BINDING},
  {label: 'form.printFormat.other_print', value: PRINT_FORMATS.OTHER_PRINT}
];

export const authorRoles = [
  {label: 'form.isbnIsmn.authors.role.option.author', value: 'AUTHOR'},
  {label: 'form.isbnIsmn.authors.role.option.illustrator', value: 'ILLUSTRATOR'},
  {label: 'form.isbnIsmn.authors.role.option.translator', value: 'TRANSLATOR'},
  {label: 'form.isbnIsmn.authors.role.option.editor', value: 'EDITOR'}
];

export const publishingLanguages = [
  {label: '', value: ''},
  {label: 'common.fin', value: 'FIN'},
  {label: 'common.swe', value: 'SWE'},
  {label: 'common.eng', value: 'ENG'},
  {label: 'common.smi', value: 'SMI'},
  {label: 'common.fre', value: 'FRE'},
  {label: 'common.ger', value: 'GER'},
  {label: 'common.rus', value: 'RUS'},
  {label: 'common.spa', value: 'SPA'},
  {label: 'common.mul', value: 'MUL'}
];

export const publicationTypes = [
  {label: '', value: ''},
  {label: 'form.isbnIsmn.availability.type.option.book', value: PUBLICATION_TYPES.BOOK},
  {label: 'form.isbnIsmn.availability.type.option.dissertation', value: PUBLICATION_TYPES.DISSERTATION},
  {label: 'form.isbnIsmn.availability.type.option.sheet_music', value: PUBLICATION_TYPES.SHEET_MUSIC},
  {label: 'form.isbnIsmn.availability.type.option.map', value: PUBLICATION_TYPES.MAP},
  {label: 'form.isbnIsmn.availability.type.option.other', value: PUBLICATION_TYPES.OTHER}
];

export const classificationCodes = [
  {label: 'form.publisherRegistration.classification.general', value: '000'},
  {label: 'form.publisherRegistration.classification.book-business-lib', value: '015'},
  {label: 'form.publisherRegistration.classification.text-books', value: '030'},
  {label: 'form.publisherRegistration.classification.children-book', value: '035'},
  {label: 'form.publisherRegistration.classification.official-publication', value: '040'},
  {label: 'form.publisherRegistration.classification.university-publication', value: '045'},
  {label: 'form.publisherRegistration.classification.electronic-publication', value: '050'},
  {label: 'form.publisherRegistration.classification.audiovisual', value: '055'},
  {label: 'form.publisherRegistration.classification.philosophy', value: '100'},
  {label: 'form.publisherRegistration.classification.psychology', value: '120'},
  {label: 'form.publisherRegistration.classification.paranormal', value: '130'},
  {label: 'form.publisherRegistration.classification.religion', value: '200'},
  {label: 'form.publisherRegistration.classification.christianity', value: '210'},
  {label: 'form.publisherRegistration.classification.orthodox', value: '211'},
  {label: 'form.publisherRegistration.classification.other-religions', value: '270'},
  {label: 'form.publisherRegistration.classification.social-science', value: '300'},
  {label: 'form.publisherRegistration.classification.political-studies', value: '310'},
  {label: 'form.publisherRegistration.classification.military', value: '315'},
  {label: 'form.publisherRegistration.classification.sociology', value: '316'},
  {label: 'form.publisherRegistration.classification.economics', value: '320'},
  {label: 'form.publisherRegistration.classification.law', value: '330'},
  {label: 'form.publisherRegistration.classification.public-administration', value: '340'},
  {label: 'form.publisherRegistration.classification.education', value: '350'},
  {label: 'form.publisherRegistration.classification.ethnography', value: '370'},
  {label: 'form.publisherRegistration.classification.local-history', value: '375'},
  {label: 'form.publisherRegistration.classification.social-politics', value: '380'},
  {label: 'form.publisherRegistration.classification.mass-media', value: '390'},
  {label: 'form.publisherRegistration.classification.literature', value: '400'},
  {label: 'form.publisherRegistration.classification.fiction', value: '410'},
  {label: 'form.publisherRegistration.classification.poetry', value: '420'},
  {label: 'form.publisherRegistration.classification.cartoons', value: '440'},
  {label: 'form.publisherRegistration.classification.science-fiction', value: '450'},
  {label: 'form.publisherRegistration.classification.crime-fiction', value: '460'},
  {label: 'form.publisherRegistration.classification.linguistic', value: '470'},
  {label: 'form.publisherRegistration.classification.sexual-minorities', value: '480'},
  {label: 'form.publisherRegistration.classification.minorities', value: '490'},
  {label: 'form.publisherRegistration.classification.science', value: '500'},
  {label: 'form.publisherRegistration.classification.mathematics', value: '510'},
  {label: 'form.publisherRegistration.classification.astronomy', value: '520'},
  {label: 'form.publisherRegistration.classification.physics', value: '530'},
  {label: 'form.publisherRegistration.classification.chemistry', value: '540'},
  {label: 'form.publisherRegistration.classification.geology', value: '550'},
  {label: 'form.publisherRegistration.classification.biology', value: '560'},
  {label: 'form.publisherRegistration.classification.zoology', value: '570'},
  {label: 'form.publisherRegistration.classification.botany', value: '580'},
  {label: 'form.publisherRegistration.classification.environmental-studies', value: '590'},
  {label: 'form.publisherRegistration.classification.technology', value: '600'},
  {label: 'form.publisherRegistration.classification.engineering', value: '610'},
  {label: 'form.publisherRegistration.classification.industry', value: '620'},
  {label: 'form.publisherRegistration.classification.construction', value: '621'},
  {label: 'form.publisherRegistration.classification.transport', value: '622'},
  {label: 'form.publisherRegistration.classification.information-tech', value: '630'},
  {label: 'form.publisherRegistration.classification.medicine', value: '640'},
  {label: 'form.publisherRegistration.classification.odontology', value: '650'},
  {label: 'form.publisherRegistration.classification.veteriniry', value: '660'},
  {label: 'form.publisherRegistration.classification.pharmacology', value: '670'},
  {label: 'form.publisherRegistration.classification.forestry', value: '672'},
  {label: 'form.publisherRegistration.classification.agriculture', value: '680'},
  {label: 'form.publisherRegistration.classification.handicraft', value: '690'},
  {label: 'form.publisherRegistration.classification.art', value: '700'},
  {label: 'form.publisherRegistration.classification.performing-art', value: '710'},
  {label: 'form.publisherRegistration.classification.theatre', value: '720'},
  {label: 'form.publisherRegistration.classification.dance', value: '730'},
  {label: 'form.publisherRegistration.classification.visual-art', value: '740'},
  {label: 'form.publisherRegistration.classification.art-history', value: '750'},
  {label: 'form.publisherRegistration.classification.architecture', value: '760'},
  {label: 'form.publisherRegistration.classification.fashion', value: '765'},
  {label: 'form.publisherRegistration.classification.music', value: '770'},
  {label: 'form.publisherRegistration.classification.antique', value: '780'},
  {label: 'form.publisherRegistration.classification.city-regional', value: '790'},
  {label: 'form.publisherRegistration.classification.leisure-hobbies', value: '800'},
  {label: 'form.publisherRegistration.classification.sports', value: '810'},
  {label: 'form.publisherRegistration.classification.games', value: '820'},
  {label: 'form.publisherRegistration.classification.hunting-fishing', value: '830'},
  {label: 'form.publisherRegistration.classification.gardening', value: '840'},
  {label: 'form.publisherRegistration.classification.home-economic', value: '850'},
  {label: 'form.publisherRegistration.classification.health-beauty', value: '860'},
  {label: 'form.publisherRegistration.classification.photography', value: '870'},
  {label: 'form.publisherRegistration.classification.tourism', value: '880'},
  {label: 'form.publisherRegistration.classification.humour', value: '890'},
  {label: 'form.publisherRegistration.classification.history', value: '900'},
  {label: 'form.publisherRegistration.classification.geography', value: '910'},
  {label: 'form.publisherRegistration.classification.map-atlases', value: '920'},
  {label: 'form.publisherRegistration.classification.archeology', value: '930'},
  {label: 'form.publisherRegistration.classification.genealogy', value: '940'},
  {label: 'form.publisherRegistration.classification.numismatics', value: '950'}
];

export const booleanOptions = [
  {label: '', value: ''},
  {label: 'common.yes', value: true},
  {label: 'common.no', value: false}
];

export const editionOptions = [
  {label: '', value: ''},
  {label: 'form.edition.first', value: '1'},
  {label: 'form.edition.second', value: '2'},
  {label: 'form.edition.third', value: '3'},
  {label: 'form.edition.fourth', value: '4'},
  {label: 'form.edition.fifth', value: '5'},
  {label: 'form.edition.sixth', value: '6'},
  {label: 'form.edition.seventh', value: '7'},
  {label: 'form.edition.eighth', value: '8'},
  {label: 'form.edition.ninth', value: '9'},
  {label: 'form.edition.tenth', value: '10'},
  {label: 'form.edition.eleventh', value: '11'},
  {label: 'form.edition.twelfth', value: '12'},
  {label: 'form.edition.thirteenth', value: '13'},
  {label: 'form.edition.fourteenth', value: '14'},
  {label: 'form.edition.fifteenth', value: '15'}
];

export const issnFormPublicationsVersionOptions = [
  {label: 'common.one', value: '1'},
  {label: 'common.two', value: '2'},
  {label: 'common.three', value: '3'},
  {label: 'common.four', value: '4'}
];
