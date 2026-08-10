import { getRequestHeaders, makeGetRequest } from '@/api';

export interface PublisherIdentifierInformationHttpResponse {
  publisher_name: string;
  publisher_identifier: string;
}

export async function readPublisherIdentifierPublicInfo(
  publisherIdentifierType: 'isbn' | 'ismn',
  publisherIdentifierId: number,
) {
  return makeGetRequest<PublisherIdentifierInformationHttpResponse>(
    `/api/monograph/${publisherIdentifierType}-publisher-ranges/${publisherIdentifierId}`,
  );
}

export async function downloadIdentifiers(
  publisherIdentifierType: 'isbn' | 'ismn',
  publisherIdentifierId: number,
  turnstileToken: string | undefined,
) {
  const response = await fetch(
    `/api/monograph/${publisherIdentifierType}-publisher-ranges/${publisherIdentifierId}/get-identifiers`,
    {
      method: 'POST',
      headers: getRequestHeaders(true),
      body: JSON.stringify({ download: true, turnstile_token: turnstileToken }),
    },
  );

  if (response.status === 200) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // as is a temporary link we use for downloading a file
    const a = document.createElement('a');

    a.href = url;
    // get filename from response header & format it
    const fileName =
      response.headers?.get('content-disposition')?.split('filename=')[1].slice(1, -1) ||
      `${publisherIdentifierType}-tunnuslista-${publisherIdentifierId}.txt`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }
}
