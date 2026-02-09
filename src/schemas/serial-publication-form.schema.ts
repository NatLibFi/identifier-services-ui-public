/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import * as z from 'zod';

import {
  LANG_CODES,
  PUBLICATION_LANGUAGE,
  SERIAL_PUBLICATION_FREQUENCY,
  SERIAL_PUBLICATION_FREQUENCY_VALUES,
  SERIAL_PUBLICATION_MEDIUMS,
  SERIAL_PUBLICATION_TYPE,
} from '@/constants';

const serialPublicationPublisher = z.object({
  publisher: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
  contactPerson: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
  email: z.email(),
  phone: z
    .string()
    .min(4, 'forms.errors.common.min-length')
    .max(30, 'forms.errors.common.max-length')
    .regex(/^[0-9+-\s]{4,30}$/, 'forms.errors.common.phone-format'),
  address: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
  zip: z
    .string()
    .min(5, 'forms.errors.common.min-length')
    .max(5, 'forms.errors.common.max-length')
    .regex(/^[0-9]{5}$/, 'forms.errors.common.zip-format'),
  city: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
  langCode: z.enum(LANG_CODES),
});

const serialPublicationBase = z.object({
  title: z.string().min(1, 'forms.errors.common.min-length').max(200, 'forms.errors.common.max-length'),
  subtitle: z.string().max(200, 'forms.errors.common.max-length').optional(),
  placeOfPublication: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
  printer: z.string().max(100, 'forms.errors.common.max-length').optional(),
  issuedFromYear: z
    .string()
    .min(1, 'forms.errors.common.min-length')
    .max(4, 'forms.errors.common.max-length')
    .regex(/^([123]{1}[0-9]{3})?$/, 'forms.errors.common.year-format'),
  issuedFromNumber: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
  language: z.enum(PUBLICATION_LANGUAGE, 'forms.errors.common.required'),
  additionalInfo: z.string().max(2000, 'forms.errors.common.max-length').optional(),
});

const frequencySchema = z
  .object({
    frequency: z.enum(SERIAL_PUBLICATION_FREQUENCY_VALUES, 'forms.errors.common.required'),
    frequencyOther: z.string().max(50, 'forms.errors.common.max-length'),
  })
  .superRefine((data, ctx) => {
    const requireFrequencyOther = data.frequency === SERIAL_PUBLICATION_FREQUENCY.OTHER.value;

    if (requireFrequencyOther && data.frequencyOther.length === 0) {
      ctx.addIssue({
        path: ['frequencyOther'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const publicationTypeSchema = z
  .object({
    publicationType: z.enum([...Object.values(SERIAL_PUBLICATION_TYPE)], 'forms.errors.common.required'),
    publicationTypeOther: z.string().max(50, 'forms.errors.common.max-length'),
  })
  .superRefine((data, ctx) => {
    const requirePublicationTypeOther = data.publicationType === SERIAL_PUBLICATION_TYPE.OTHER_SERIAL;

    if (requirePublicationTypeOther && data.publicationTypeOther.length === 0) {
      ctx.addIssue({
        path: ['publicationTypeOther'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const mediumSchema = z
  .object({
    medium: z.enum([...Object.values(SERIAL_PUBLICATION_MEDIUMS)], 'forms.errors.common.required'),
    mediumOther: z.string().max(50, 'forms.errors.common.max-length'),
    url: z.url('forms.errors.common.www-format').or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const requireMediumOther = data.medium === SERIAL_PUBLICATION_MEDIUMS.OTHER;
    const requireUrl = data.medium === SERIAL_PUBLICATION_MEDIUMS.ONLINE;

    if (requireMediumOther && data.mediumOther.length === 0) {
      ctx.addIssue({
        path: ['mediumOther'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    if (requireUrl && data.url.length === 0) {
      ctx.addIssue({
        path: ['url'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const previousSchema = z
  .object({
    hasPrevious: z.boolean(), // Virtual attribute
    previous: z.object({
      title: z.string().max(100, 'forms.errors.common.max-length'),
      issn: z.string().regex(/^([0-9]{4}-[0-9]{3}[0-9X]{1})?$/, 'forms.errors.common.issn-format'),
      lastIssue: z.string().max(50, 'forms.errors.common.max-length'),
    }),
  })
  .superRefine((data, ctx) => {
    const requirePrevious = data.hasPrevious;
    if (requirePrevious && data.previous.title.length === 0) {
      ctx.addIssue({
        path: ['previous.title'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    if (requirePrevious && data.previous.lastIssue.length === 0) {
      ctx.addIssue({
        path: ['previous.lastIssue'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const mainSeriesSchema = z
  .object({
    hasMainSeries: z.boolean(), // Virtual attribute
    mainSeries: z.object({
      title: z.string().max(100, 'forms.errors.common.max-length'),
      issn: z.string().regex(/^([0-9]{4}-[0-9]{3}[0-9X]{1})?$/, 'forms.errors.common.issn-format'),
    }),
  })
  .superRefine((data, ctx) => {
    const requireMainSeries = data.hasMainSeries;
    if (requireMainSeries && data.mainSeries.title.length === 0) {
      ctx.addIssue({
        path: ['mainSeries.title'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const subseriesSchema = z
  .object({
    hasSubseries: z.boolean(), // Virtual attribute
    subseries: z.object({
      title: z.string().max(100, 'forms.errors.common.max-length'),
      issn: z.string().regex(/^([0-9]{4}-[0-9]{3}[0-9X]{1})?$/, 'forms.errors.common.issn-format'),
    }),
  })
  .superRefine((data, ctx) => {
    const requireSubseries = data.hasSubseries;
    if (requireSubseries && data.subseries.title.length === 0) {
      ctx.addIssue({
        path: ['subseries.title'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

const anotherMediumSchema = z
  .object({
    hasAnotherMedium: z.boolean(), // Virtual attribute
    anotherMedium: z.object({
      title: z.string().max(100, 'forms.errors.common.max-length'),
      issn: z.string().regex(/^([0-9]{4}-[0-9]{3}[0-9X]{1})?$/, 'forms.errors.common.issn-format'),
    }),
  })
  .superRefine((data, ctx) => {
    const requireAnotherMedium = data.hasAnotherMedium;
    if (requireAnotherMedium && data.anotherMedium.title.length === 0) {
      ctx.addIssue({
        path: ['anotherMedium.title'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

// Intersections are required for validation triggers to work properly
// see: https://github.com/colinhacks/zod/issues/479#issuecomment-853404300
// Because intersections accept only A & B union, the schema is constructed through multiple additive intersections
const serialPublicationWithFrequency = z.intersection(serialPublicationBase, frequencySchema);

const serialPublicationWithPublicationType = z.intersection(serialPublicationWithFrequency, publicationTypeSchema);

const serialPublicationWithMedium = z.intersection(serialPublicationWithPublicationType, mediumSchema);

const serialPublicationWithPrevious = z.intersection(serialPublicationWithMedium, previousSchema);
const serialPublicationWithMainSeries = z.intersection(serialPublicationWithPrevious, mainSeriesSchema);
const serialPublicationWithSubseries = z.intersection(serialPublicationWithMainSeries, subseriesSchema);
const serialPublication = z.intersection(serialPublicationWithSubseries, anotherMediumSchema);

export const serialPublicationFormV1Schema = z.object({
  form: serialPublicationPublisher,
  publications: z.array(serialPublication).min(1).max(4),
});

export type SerialPublicationFormPublisher = z.infer<typeof serialPublicationPublisher>;
export type SerialPublicationFormPublication = z.infer<typeof serialPublication>;

export type SerialPublicationFormV1 = z.infer<typeof serialPublicationFormV1Schema>;

export interface SerialPublicationFormPublicationApiV1 extends Omit<
  SerialPublicationFormPublication,
  | 'hasPrevious'
  | 'hasMainSeries'
  | 'hasSubseries'
  | 'hasAnotherMedium'
  | 'previous'
  | 'mainSeries'
  | 'subseries'
  | 'anotherMedium'
> {
  previous?: {
    title: string[];
    lastIssue: string[];
    issn?: string[];
  };
  mainSeries?: {
    title: string[];
    issn?: string[];
  };
  subseries?: {
    title: string[];
    issn?: string[];
  };
  anotherMedium?: {
    title: string[];
    issn?: string[];
  };
}

export interface SerialPublicationFormApiV1 {
  form: SerialPublicationFormPublisher;
  publications: SerialPublicationFormPublicationApiV1[];
  turnstileToken: string | undefined;
}
