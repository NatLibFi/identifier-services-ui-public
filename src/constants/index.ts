/* These constants are based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

export const LANG_CODES = {
  'fi-FI': 'fi-FI',
  'en-GB': 'en-GB',
  'sv-SE': 'sv-SE',
};

export const PUBLISHER_CLASSIFICATIONS = [
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.general',
    value: '000',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.book-business-lib',
    value: '015',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.text-books',
    value: '030',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.children-book',
    value: '035',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.official-publication',
    value: '040',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.university-publication',
    value: '045',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.electronic-publication',
    value: '050',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.audiovisual',
    value: '055',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.philosophy',
    value: '100',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.psychology',
    value: '120',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.paranormal',
    value: '130',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.religion',
    value: '200',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.christianity',
    value: '210',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.orthodox',
    value: '211',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.other-religions',
    value: '270',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.social-science',
    value: '300',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.political-studies',
    value: '310',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.military',
    value: '315',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.sociology',
    value: '316',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.economics',
    value: '320',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.law',
    value: '330',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.public-administration',
    value: '340',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.education',
    value: '350',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.ethnography',
    value: '370',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.local-history',
    value: '375',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.social-politics',
    value: '380',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.mass-media',
    value: '390',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.literature',
    value: '400',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.fiction',
    value: '410',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.poetry',
    value: '420',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.cartoons',
    value: '440',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.science-fiction',
    value: '450',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.crime-fiction',
    value: '460',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.linguistic',
    value: '470',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.sexual-minorities',
    value: '480',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.minorities',
    value: '490',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.science',
    value: '500',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.mathematics',
    value: '510',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.astronomy',
    value: '520',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.physics',
    value: '530',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.chemistry',
    value: '540',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.geology',
    value: '550',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.biology',
    value: '560',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.zoology',
    value: '570',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.botany',
    value: '580',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.environmental-studies',
    value: '590',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.technology',
    value: '600',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.engineering',
    value: '610',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.industry',
    value: '620',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.construction',
    value: '621',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.transport',
    value: '622',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.information-tech',
    value: '630',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.medicine',
    value: '640',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.odontology',
    value: '650',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.veteriniry',
    value: '660',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.pharmacology',
    value: '670',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.forestry',
    value: '672',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.agriculture',
    value: '680',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.handicraft',
    value: '690',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.art',
    value: '700',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.performing-art',
    value: '710',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.theatre',
    value: '720',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.dance',
    value: '730',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.visual-art',
    value: '740',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.art-history',
    value: '750',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.architecture',
    value: '760',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.fashion',
    value: '765',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.music',
    value: '770',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.antique',
    value: '780',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.city-regional',
    value: '790',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.leisure-hobbies',
    value: '800',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.sports',
    value: '810',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.games',
    value: '820',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.hunting-fishing',
    value: '830',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.gardening',
    value: '840',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.home-economic',
    value: '850',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.health-beauty',
    value: '860',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.photography',
    value: '870',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.tourism',
    value: '880',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.humour',
    value: '890',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.history',
    value: '900',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.geography',
    value: '910',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.map-atlases',
    value: '920',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.archeology',
    value: '930',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.genealogy',
    value: '940',
  },
  {
    translationId: 'forms.monograph-publishers.fields.classification.options.numismatics',
    value: '950',
  },
];

export const MONOGRAPH_PUBLISHING_ACTIVITY = {
  CONTINUOUS: 'CONTINUOUS',
  OCCASIONAL: 'OCCASIONAL',
};

export const MONOGRAPH_PUBLICATION_TYPE = {
  BOOK: 'BOOK',
  DISSERTATION: 'DISSERTATION',
  SHEET_MUSIC: 'SHEET_MUSIC',
  MAP: 'MAP',
  OTHER: 'OTHER',
};

export const MONOGRAPH_PUBLICATION_FORMAT = {
  PRINT: 'PRINT',
  ELECTRONICAL: 'ELECTRONICAL',
  PRINT_ELECTRONICAL: 'PRINT_ELECTRONICAL',
};

export const PUBLICATION_LANGUAGE = {
  FIN: 'FIN',
  SWE: 'SWE',
  ENG: 'ENG',
  SMI: 'SMI',
  SPA: 'SPA',
  FRE: 'FRE',
  GER: 'GER',
  RUS: 'RUS',
  MUL: 'MUL',
};

export const MONOGRAPH_PUBLICATION_PRINT_TYPE = {
  PAPERBACK: 'PAPERBACK',
  HARDBACK: 'HARDBACK',
  SPIRAL_BINDING: 'SPIRAL_BINDING',
  OTHER_PRINT: 'OTHER_PRINT',
};

export const MONOGRAPH_PUBLICATION_PRINT_TYPE_MULTISELECT = [
  {
    translationId: 'forms.monograph-publications.fields.type.PAPERBACK',
    value: MONOGRAPH_PUBLICATION_PRINT_TYPE.PAPERBACK,
  },
  {
    translationId: 'forms.monograph-publications.fields.type.HARDBACK',
    value: MONOGRAPH_PUBLICATION_PRINT_TYPE.HARDBACK,
  },
  {
    translationId: 'forms.monograph-publications.fields.type.SPIRAL_BINDING',
    value: MONOGRAPH_PUBLICATION_PRINT_TYPE.SPIRAL_BINDING,
  },
  {
    translationId: 'forms.monograph-publications.fields.type.OTHER_PRINT',
    value: MONOGRAPH_PUBLICATION_PRINT_TYPE.OTHER_PRINT,
  },
];

export const MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE = {
  PDF: 'PDF',
  EPUB: 'EPUB',
  CD_ROM: 'CD_ROM',
  MP3: 'MP3',
  OTHER: 'OTHER',
};

export const MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE_MULTISELECT = [
  {
    translationId: 'forms.monograph-publications.fields.fileformat.PDF',
    value: MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.PDF,
  },
  {
    translationId: 'forms.monograph-publications.fields.fileformat.EPUB',
    value: MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.EPUB,
  },
  {
    translationId: 'forms.monograph-publications.fields.fileformat.CD_ROM',
    value: MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.CD_ROM,
  },
  {
    translationId: 'forms.monograph-publications.fields.fileformat.MP3',
    value: MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.MP3,
  },
  {
    translationId: 'forms.monograph-publications.fields.fileformat.OTHER',
    value: MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.OTHER,
  },
];

export const MONOGRAPH_PUBLICATION_AUTHOR_ROLE = {
  AUTHOR: 'AUTHOR',
  ILLUSTRATOR: 'ILLUSTRATOR',
  TRANSLATOR: 'TRANSLATOR',
  EDITOR: 'EDITOR',
};

export const MONOGRAPH_PUBLICATION_AUTHOR_ROLE_MULTISELECT = [
  {
    translationId: 'forms.monograph-publications.fields.author.role.AUTHOR',
    value: MONOGRAPH_PUBLICATION_AUTHOR_ROLE.AUTHOR,
  },
  {
    translationId: 'forms.monograph-publications.fields.author.role.ILLUSTRATOR',
    value: MONOGRAPH_PUBLICATION_AUTHOR_ROLE.ILLUSTRATOR,
  },
  {
    translationId: 'forms.monograph-publications.fields.author.role.TRANSLATOR',
    value: MONOGRAPH_PUBLICATION_AUTHOR_ROLE.TRANSLATOR,
  },
  {
    translationId: 'forms.monograph-publications.fields.author.role.EDITOR',
    value: MONOGRAPH_PUBLICATION_AUTHOR_ROLE.EDITOR,
  },
];

export const SERIAL_PUBLICATION_FREQUENCY = {
  YEARLY: {
    value: 'a',
    translationId: 'forms.serial-publications.fields.frequency.YEARLY',
  },
  BIYEARLY: {
    value: 'f',
    translationId: 'forms.serial-publications.fields.frequency.BIYEARLY',
  },
  QUARTERLY: {
    value: 'q',
    translationId: 'forms.serial-publications.fields.frequency.QUARTERLY',
  },
  BIMONTHLY: {
    value: 'b',
    translationId: 'forms.serial-publications.fields.frequency.BIMONTHLY',
  },
  MONTHLY: {
    value: 'm',
    translationId: 'forms.serial-publications.fields.frequency.MONTHLY',
  },
  WEEKLY: {
    value: 'w',
    translationId: 'forms.serial-publications.fields.frequency.WEEKLY',
  },
  DAILY: {
    value: 'd',
    translationId: 'forms.serial-publications.fields.frequency.DAILY',
  },
  CONTINUOUSLY: {
    value: 'k',
    translationId: 'forms.serial-publications.fields.frequency.CONTINUOUSLY',
  },
  IRREGULAR: {
    value: '#',
    translationId: 'forms.serial-publications.fields.frequency.IRREGULAR',
  },
  OTHER: {
    value: 'z',
    translationId: 'forms.serial-publications.fields.frequency.OTHER',
  },
};

export const SERIAL_PUBLICATION_FREQUENCY_VALUES = Object.values(SERIAL_PUBLICATION_FREQUENCY).map(
  ({ value }) => value,
);

export const SERIAL_PUBLICATION_TYPE = {
  JOURNAL: 'JOURNAL',
  NEWSLETTER: 'NEWSLETTER',
  STAFF_MAGAZINE: 'STAFF_MAGAZINE',
  MEMBERSHIP_BASED_MAGAZINE: 'MEMBERSHIP_BASED_MAGAZINE',
  CARTOON: 'CARTOON',
  NEWSPAPER: 'NEWSPAPER',
  FREE_PAPER: 'FREE_PAPER',
  MONOGRAPHY_SERIES: 'MONOGRAPHY_SERIES',
  OTHER_SERIAL: 'OTHER_SERIAL',
};

export const SERIAL_PUBLICATION_MEDIUMS = {
  PRINTED: 'PRINTED',
  ONLINE: 'ONLINE',
  CDROM: 'CDROM',
  OTHER: 'OTHER',
};
