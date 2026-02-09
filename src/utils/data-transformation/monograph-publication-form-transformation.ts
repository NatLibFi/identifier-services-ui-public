import { MONOGRAPH_PUBLICATION_FORMAT, MONOGRAPH_PUBLICATION_TYPE } from '@/constants';

import {
  type MonographPublicationFormV1,
  type MonographPublicationFormApiV1,
} from '@/schemas/monograph-publication-form.schema';

// Data transformation for APIv1
export function transforMonographPublicationFormDataV1(
  data: MonographPublicationFormV1,
  turnstileToken: string | undefined,
): MonographPublicationFormApiV1 {
  // Remove virtual attributes and prepare to remove undefined values
  const {
    numberOfAuthors: numberOfAuthorsText,
    publicationsPublic,
    publishedBefore,
    firstName2,
    firstName3,
    firstName4,
    lastName2,
    lastName3,
    lastName4,
    role2,
    role3,
    role4,
    ...formValues
  } = data;

  // Remove author data based on number of informed authors (i.e., those that are also displayed)
  // Remove type, typeOther, fileformat, fileformatOther based on publicationFormat
  const excludePrintInfo = formValues.publicationFormat === MONOGRAPH_PUBLICATION_FORMAT.ELECTRONICAL;
  const excludeElectrinicalInfo = formValues.publicationFormat === MONOGRAPH_PUBLICATION_FORMAT.PRINT;
  const isDissertation = formValues.publicationType === MONOGRAPH_PUBLICATION_TYPE.DISSERTATION;

  const numberOfAuthors = Number(numberOfAuthorsText);
  const formData: MonographPublicationFormApiV1 = {
    ...formValues,
    type: excludePrintInfo ? undefined : formValues.type,
    typeOther: excludePrintInfo ? undefined : formValues.typeOther,
    fileformat: excludeElectrinicalInfo ? undefined : formValues.fileformat,
    fileformatOther: excludeElectrinicalInfo ? undefined : formValues.fileformatOther,
    publicationsPublic: publicationsPublic === 'true',
    publishedBefore: isDissertation ? undefined : publishedBefore === 'true',
    firstName2: numberOfAuthors >= 2 ? firstName2 : undefined,
    firstName3: numberOfAuthors >= 3 ? firstName3 : undefined,
    firstName4: numberOfAuthors >= 4 ? firstName4 : undefined,
    lastName2: numberOfAuthors >= 2 ? lastName2 : undefined,
    lastName3: numberOfAuthors >= 3 ? lastName3 : undefined,
    lastName4: numberOfAuthors >= 4 ? lastName4 : undefined,
    role2: numberOfAuthors >= 2 ? role2 : undefined,
    role3: numberOfAuthors >= 3 ? role3 : undefined,
    role4: numberOfAuthors >= 4 ? role4 : undefined,
    turnstileToken,
  };

  // Remove empty strings and undefined data
  Object.keys(formData).forEach((key) => {
    const value = formData[key as keyof MonographPublicationFormApiV1];
    const isUndefined = value === undefined;
    const isEmptyString = value === '';

    if (isUndefined || isEmptyString) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete formData[key as keyof MonographPublicationFormApiV1];
    }
  });

  return formData;
}
