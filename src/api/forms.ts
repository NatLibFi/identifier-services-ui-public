import { makePostRequest } from '@/api';

import type { MonographPublicationFormApiV1 } from '@/schemas/monograph-publication-form.schema';
import type { MonographPublisherFormApiV1 } from '@/schemas/monograph-publisher-form.schema';
import type { SerialPublicationFormApiV1 } from '@/schemas/serial-publication-form.schema';

interface CreatedResponse {
  id: number;
}

export async function createMonographPublisherRequestV1(formData: MonographPublisherFormApiV1) {
  const body = { ...formData };

  return makePostRequest<MonographPublisherFormApiV1, CreatedResponse>(
    '/api/public/isbn-registry/requests/publishers',
    body,
  );
}

export async function createMonographPublicationRequestV1(formData: MonographPublicationFormApiV1) {
  const body = { ...formData };

  return makePostRequest<MonographPublicationFormApiV1, CreatedResponse>(
    '/api/public/isbn-registry/requests/publications',
    body,
  );
}

export async function createSerialPublicationRequestV1(formData: SerialPublicationFormApiV1) {
  const body = { ...formData };

  return makePostRequest<SerialPublicationFormApiV1, CreatedResponse>('/api/public/issn-registry/requests', body);
}
