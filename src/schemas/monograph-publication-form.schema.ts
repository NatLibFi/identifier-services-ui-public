/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import {
  LANG_CODES,
  MONOGRAPH_PUBLISHING_ACTIVITY,
  MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE,
  MONOGRAPH_PUBLICATION_FORMAT,
  PUBLICATION_LANGUAGE,
  MONOGRAPH_PUBLICATION_PRINT_TYPE,
  MONOGRAPH_PUBLICATION_TYPE,
} from '@/constants';
import * as z from 'zod';

// Arrays cannot be directly stored as strings due to useFieldArray in react-hook-form
// See: https://github.com/orgs/react-hook-form/discussions/7586

export const monographPublicationFormV1Schema = z
  .object({
    officialName: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
    publisherIdentifierStr: z
      .string()
      .max(20, 'forms.errors.common.max-length')
      .regex(/^(97[89]-95[12]-[0-9]{1,7})?$/, 'forms.errors.monograph-publications.publisher-identifier-format')
      .optional(),
    locality: z.enum(['', 'Helsinki']).optional(),
    contactPerson: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
    address: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
    zip: z
      .string()
      .min(5, 'forms.errors.common.min-length')
      .max(5, 'forms.errors.common.max-length')
      .regex(/^[0-9]{5}$/, 'forms.errors.common.zip-format'),
    city: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
    phone: z
      .string()
      .min(4, 'forms.errors.common.min-length')
      .max(30, 'forms.errors.common.max-length')
      .regex(/^[0-9+-\s]{4,30}$/, 'forms.errors.common.phone-format'),
    email: z.email(),
    langCode: z.enum(LANG_CODES, 'forms.errors.common.required'),
    publishedBefore: z.enum(['true', 'false']).optional(), // Optional for dissertations
    publicationsPublic: z.enum(['true', ''], 'forms.errors.monograph-publications.require-public'), // Note: empty accepted here because typing won't play along if it's not. Empty value is not allowed in final form validation.
    publishingActivity: z.enum(MONOGRAPH_PUBLISHING_ACTIVITY, 'forms.errors.common.required').optional(), // Must be optional for dissertations logic to work
    publishingActivityAmount: z
      .string()
      .max(5, 'forms.errors.common.max-length')
      .regex(/^([0-9-]+)?$/, 'forms.errors.common.integer-dash-only'),
    publicationType: z.enum(MONOGRAPH_PUBLICATION_TYPE, 'forms.errors.common.required'),
    publicationFormat: z.enum(MONOGRAPH_PUBLICATION_FORMAT, 'forms.errors.common.required'),
    numberOfAuthors: z.enum(['1', '2', '3', '4']), // Virtual attribute
    firstName1: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
    lastName1: z.string().min(1, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
    role1: z.array(z.string()).min(1, 'forms.errors.common.required').max(4, 'forms.errors.common.max-entries'),
    firstName2: z.string().max(50, 'forms.errors.common.max-length').optional(),
    lastName2: z.string().max(50, 'forms.errors.common.max-length').optional(),
    role2: z.array(z.string()).max(4).optional(),
    firstName3: z.string().max(50, 'forms.errors.common.max-length').optional(),
    lastName3: z.string().max(50, 'forms.errors.common.max-length').optional(),
    role3: z.array(z.string()).max(4).optional(),
    firstName4: z.string().max(50, 'forms.errors.common.max-length').optional(),
    lastName4: z.string().max(50, 'forms.errors.common.max-length').optional(),
    role4: z.array(z.string()).max(4).optional(),
    title: z.string().min(1, 'forms.errors.common.min-length').max(200, 'forms.errors.common.max-length'),
    subtitle: z.string().max(200, 'forms.errors.common.max-length').optional(),
    mapScale: z.string().max(50, 'forms.errors.common.max-length').optional(),
    language: z.enum(PUBLICATION_LANGUAGE, 'forms.errors.common.required'),
    year: z
      .string()
      .min(4, 'forms.errors.common.required')
      .max(4)
      .regex(/^[12][09][0-9][0-9]$/, 'forms.errors.common.year-format'),
    month: z
      .string()
      .min(2, 'forms.errors.common.required')
      .max(2)
      .regex(/^[01][0-9]$/, 'forms.errors.common.month-format'),
    series: z.string().max(200).optional(),
    issn: z
      .string()
      .regex(/^([0-9]{4}-[0-9]{3}[0-9X]{1})?$/, 'forms.errors.common.issn-format')
      .optional(),
    volume: z.string().max(20, 'forms.errors.common.max-length').optional(),
    printingHouse: z.string().max(100, 'forms.errors.common.max-length').optional(),
    printingHouseCity: z.string().max(50, 'forms.errors.common.max-length').optional(),
    copies: z
      .string()
      .max(10, 'forms.errors.common.max-length')
      .regex(/^([0-9]+)?$/, 'forms.errors.common.integer-only')
      .optional(),
    edition: z
      .string()
      .regex(/^([0-9]{1}$|^[1-9]{1}[0-9]{1})?$/, 'forms.errors.common.twodigit-integer-format')
      .optional(),
    type: z.array(z.enum([...Object.values(MONOGRAPH_PUBLICATION_PRINT_TYPE)])).max(4),
    typeOther: z.string().max(100, 'forms.errors.common.max-length').optional(),
    comments: z.string().max(2000, 'forms.errors.common.max-length'),
    fileformat: z.array(z.enum([...Object.values(MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE)])).max(4),
    fileformatOther: z.string().max(100, 'forms.errors.common.max-length').optional(),
  })
  .superRefine((data, ctx) => {
    // Locality validation for dissertations
    const isDissertation = data.publicationType === MONOGRAPH_PUBLICATION_TYPE.DISSERTATION;

    // This is a backup sanity check as the situation should not happen ever based on form rendering logic
    if (isDissertation && !data.locality) {
      ctx.addIssue({
        path: ['locality'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    // publishedBefore is mandatory for non-dissertations
    if (!isDissertation && (!data.publishedBefore || !['true', 'false'].includes(data.publishedBefore))) {
      ctx.addIssue({
        path: ['publishedBefore'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    // Publishing date validation
    const currentDate = new Date();
    const publishedDuringCurrentYear = data.year === String(currentDate.getFullYear());
    const publicationMonth = Number(data.month.replace(/^0/, '')); // Transform zero-padded string to number

    const publishedInPreviousYear = Number(data.year) < currentDate.getFullYear();
    const publishedInPreviousMonthCurrentYear =
      publishedDuringCurrentYear && publicationMonth < currentDate.getMonth() + 1;

    // This is a backup sanity check as the situation should not happen ever based on form rendering logic
    if (publishedInPreviousYear) {
      ctx.addIssue({
        path: ['year'],
        code: 'custom',
        message: 'forms.errors.monograph-publications.already-published',
      });
    }

    if (publishedInPreviousMonthCurrentYear) {
      ctx.addIssue({
        path: ['month'],
        code: 'custom',
        message: 'forms.errors.monograph-publications.already-published',
      });
    }

    // typeOther validation if PRINT_OTHER selected as type
    const hasPrintOther = data.type.includes(MONOGRAPH_PUBLICATION_PRINT_TYPE.OTHER_PRINT);
    if (hasPrintOther && !data.typeOther) {
      ctx.addIssue({
        path: ['typeOther'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    // fileformatOther validation if OTHER selected as fileformat
    const hasFileformatOther = data.fileformat.includes(MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.OTHER);
    if (hasFileformatOther && !data.fileformatOther) {
      ctx.addIssue({
        path: ['fileformatOther'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    // This is a backup sanity check as the situation should not happen unless customer leaves publicationsPublic in its default state
    if (data.publicationsPublic !== 'true') {
      ctx.addIssue({
        path: ['publicationsPublic'],
        code: 'custom',
        message: 'forms.errors.monograph-publications.require-public',
      });
    }

    // If publication format is PRINT (or PRINT_ELECTRONICAL), field 'type' is required
    const isPrint = [MONOGRAPH_PUBLICATION_FORMAT.PRINT, MONOGRAPH_PUBLICATION_FORMAT.PRINT_ELECTRONICAL].includes(
      data.publicationFormat,
    );
    const typeNotDefined = !data.type || !Array.isArray(data.type) || data.type.length === 0;
    if (isPrint && typeNotDefined) {
      ctx.addIssue({
        path: ['type'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }

    // If publication format is ELECTRONICAL (or PRINT_ELECTRONICAL), field 'fileformat' is required
    const isElectronical = [
      MONOGRAPH_PUBLICATION_FORMAT.ELECTRONICAL,
      MONOGRAPH_PUBLICATION_FORMAT.PRINT_ELECTRONICAL,
    ].includes(data.publicationFormat);
    const fileformatNotDefined = !data.fileformat || !Array.isArray(data.fileformat) || data.fileformat.length === 0;
    if (isElectronical && fileformatNotDefined) {
      ctx.addIssue({
        path: ['fileformat'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

export type MonographPublicationFormV1 = z.infer<typeof monographPublicationFormV1Schema>;

export interface MonographPublicationFormApiV1 extends Omit<
  MonographPublicationFormV1,
  'numberOfAuthors' | 'publicationsPublic' | 'type' | 'fileformat' | 'publishedBefore'
> {
  publicationsPublic: boolean;
  publishedBefore: boolean | undefined;
  type: string[] | undefined;
  fileformat: string[] | undefined;
  turnstileToken: string | undefined;
}
