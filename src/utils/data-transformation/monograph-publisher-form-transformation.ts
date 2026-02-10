import {
  type MonographPublisherFormApiV1,
  type MonographPublisherFormV1,
} from '@/schemas/monograph-publisher-form.schema';

export function transformMonographPublisherFormDataV1(
  data: MonographPublisherFormV1,
  turnstileToken: string | undefined,
): MonographPublisherFormApiV1 {
  const otherNamesApiV1 = data.otherNames ? data.otherNames.map(({ value }) => value).join(', ') : undefined;

  return {
    ...data,
    otherNames: otherNamesApiV1,
    turnstileToken,
  };
}
