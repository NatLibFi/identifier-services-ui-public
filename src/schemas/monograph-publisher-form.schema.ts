/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import { LANG_CODES } from '@/constants';
import * as z from 'zod';

// Arrays cannot be directly stored as strings due to useFieldArray in react-hook-form
// See: https://github.com/orgs/react-hook-form/discussions/7586

export const monographPublisherFormV1Schema = z
  .object({
    officialName: z.string().min(1, 'forms.errors.common.min-length').max(100, 'forms.errors.common.max-length'),
    otherNames: z
      .array(
        z.object({
          value: z.string().min(3, 'forms.errors.common.min-length').max(50, 'forms.errors.common.max-length'),
        }),
      )
      .max(4)
      .optional(),
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
    www: z.url('forms.errors.common.www-format').optional().or(z.literal('')),
    langCode: z.enum(LANG_CODES),
    frequencyCurrent: z
      .string()
      .min(1, 'forms.errors.common.min-length')
      .max(50, 'forms.errors.common.max-length')
      .regex(/^[0-9-]+$/, 'forms.errors.common.integer-dash-only'),
    frequencyNext: z
      .string()
      .min(1, 'forms.errors.common.min-length')
      .max(50, 'forms.errors.common.max-length')
      .regex(/^[0-9-]+$/, 'forms.errors.common.integer-dash-only'),
    affiliateOf: z.string().max(50, 'forms.errors.common.max-length').optional(),
    affiliates: z.string().max(200, 'forms.errors.common.max-length').optional(),
    distributorOf: z.string().max(200, 'forms.errors.common.max-length').optional(),
    distributors: z.string().max(50, 'forms.errors.common.max-length').optional(),
    classification: z.array(z.string()).max(5).optional(),
    classificationOther: z.string().max(50, 'forms.errors.common.max-length').optional(),
  })
  .superRefine((data, ctx) => {
    const hasClassification =
      data.classification && Array.isArray(data.classification) && data.classification.length > 0;
    const hasCustomClassification = !!data.classificationOther;

    if (!hasClassification && !hasCustomClassification) {
      ctx.addIssue({
        path: ['classification'],
        code: 'custom',
        message: 'forms.errors.common.required',
      });
    }
  });

export type MonographPublisherFormV1 = z.infer<typeof monographPublisherFormV1Schema>;

export interface MonographPublisherFormApiV1 extends Omit<MonographPublisherFormV1, 'otherNames'> {
  otherNames: string | undefined;
  turnstileToken: string | undefined;
}
