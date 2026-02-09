import { getRequestHeaders, makeGetRequest } from '@/api';

export interface IdentifierBatchReadV1Response {
  id: number;
  identifierType: string;
  identifierCount: number;
  publisherId: number;
  publisherName: string;
  publisherIdentifier: string;
}

export interface IdentifierBatchDownloadBody {
  turnstileToken: string;
}

export async function readIdentifierBatch(identifierBatchId: string) {
  return makeGetRequest<IdentifierBatchReadV1Response>(
    `/api/public/isbn-registry/identifierbatches/${identifierBatchId}`,
  );
}

export async function downloadIdentifierBatch(identifierBatchId: string, turnstileToken: string | undefined) {
  const response = await fetch(`/api/public/isbn-registry/identifierbatches/${identifierBatchId}/download`, {
    method: 'POST',
    headers: getRequestHeaders(true),
    body: JSON.stringify({ turnstileToken }),
  });

  if (response.status === 200) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // as is a temporary link we use for downloading a file
    const a = document.createElement('a');

    a.href = url;
    // get filename from response header & format it
    const fileName =
      response.headers?.get('content-disposition')?.split('filename=')[1].slice(1, -1) ||
      `tunnuslista-${identifierBatchId}.txt`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }
}
