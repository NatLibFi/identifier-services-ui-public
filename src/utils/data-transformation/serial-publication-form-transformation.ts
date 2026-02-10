import {
  type SerialPublicationFormPublisher,
  type SerialPublicationFormApiV1,
  type SerialPublicationFormPublication,
  type SerialPublicationFormPublicationApiV1,
  type SerialPublicationFormV1,
} from '@/schemas/serial-publication-form.schema';

import { deepCopy } from '@/utils/generic-utils';
import { removeUndefinedOrEmptyString } from '@/utils/data-transformation/data-transformation-utils';

// Data transformation for APIv1
export function transformSerialPublicationFormDataV1(
  data: SerialPublicationFormV1,
  turnstileToken: string | undefined,
): SerialPublicationFormApiV1 {
  const form = removeUndefinedOrEmptyString<SerialPublicationFormPublisher>(data.form);

  // Remove publications empty values and virtual attributes
  const publications = data.publications.map(transformSerialPublicationV1);

  const formData: SerialPublicationFormApiV1 = {
    form,
    publications,
    turnstileToken,
  };

  return formData;
}

// Helper function for removing keys with empty values and virtual keys from publications
function transformSerialPublicationV1(
  publication: SerialPublicationFormPublication,
): SerialPublicationFormPublicationApiV1 {
  const { previous, mainSeries, subseries, anotherMedium, ...rest } = deepCopy(publication);

  const transformedPublication: SerialPublicationFormPublicationApiV1 = {
    ...rest,
  };

  const virtualKeys = ['hasPrevious', 'hasMainSeries', 'hasSubseries', 'hasAnotherMedium'];

  // Add APIv1 compliant version of linked series information if virtual attribute acknowledges its existence
  if (publication.hasPrevious) {
    transformedPublication.previous = {
      title: [previous.title],
      issn: previous.issn.length > 1 ? [previous.issn] : [],
      lastIssue: [previous.title],
    };
  }

  if (publication.hasMainSeries) {
    transformedPublication.mainSeries = {
      title: [mainSeries.title],
      issn: mainSeries.issn.length > 1 ? [mainSeries.issn] : [],
    };
  }

  if (publication.hasSubseries) {
    transformedPublication.subseries = {
      title: [subseries.title],
      issn: subseries.issn.length > 1 ? [subseries.issn] : [],
    };
  }

  if (publication.hasAnotherMedium) {
    transformedPublication.anotherMedium = {
      title: [anotherMedium.title],
      issn: anotherMedium.issn.length > 1 ? [anotherMedium.issn] : [],
    };
  }

  // Remove reduntant and virtual keys
  Object.keys(transformedPublication).forEach((key) => {
    const value = transformedPublication[key as keyof SerialPublicationFormPublicationApiV1];
    const isUndefined = value === undefined;
    const isEmptyString = value === '';
    const isVirtualKey = virtualKeys.includes(key); // Virtual keys are not sent to API

    if (isUndefined || isEmptyString || isVirtualKey) {
      delete transformedPublication[
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        key as keyof SerialPublicationFormPublicationApiV1
      ];
    }
  });

  return transformedPublication;
}
