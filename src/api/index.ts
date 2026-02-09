import { APIError } from '@/api/ApiError';

/**
 * This file contains all API request handlers. Each handler uses fetch with accept: application/json header.
 * Response body is parsed for all responses in all cases except following:
 *   - Response status was 500 -> for this we do not know whether the response error is from proxy or from API so throwing generic API error
 *   - Response status was 204 -> this indicates there is no content to be parsed and thus undefined will be returned
 *
 * No matter the case of error (API error, error during parsing JSON) an instance of APIError is thrown upwards with appropriate error message and description.
 */

export function getRequestHeaders(hasRequestBody = false) {
  const headers: Record<string, string> = { accept: 'application/json' };

  if (hasRequestBody) {
    headers['content-type'] = 'application/json';
  }

  return headers;
}

// Managed separately as return value of fetch call is not probable to contain problem JSON document
function handle500Response(response: Response, originalUrl: string) {
  if (response.status === 500) {
    throw new APIError({
      type: 'about:blank',
      status: 500,
      title: 'Unknown API error',
      detail: '',
      instance: originalUrl,
    });
  }
}

async function handleError(response: Response, originalUrl: string) {
  try {
    if (!response.ok) {
      const body = await response.json();
      throw new APIError(body);
    }
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new APIError({
      type: 'about:blank',
      status: response.status,
      title: 'Unknown API error',
      detail: 'Could not parse API error message',
      instance: originalUrl,
    });
  }
}

async function handleParseResponseBody<T>(response: Response, originalUrl: string): Promise<T> {
  try {
    const responseBody = await response.json();
    return responseBody;

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new APIError({
      type: 'about:blank',
      status: response.status,
      title: 'API response parsing error',
      detail: 'Could not parse API response body',
      instance: originalUrl,
    });
  }
}

async function handleResponse<T>(response: Response, originalUrl: string) {
  handle500Response(response, originalUrl);
  await handleError(response, originalUrl);
  return handleParseResponseBody<T>(response, originalUrl);
}

export async function makeGetRequest<ExpectedReturnType>(url: string) {
  const response = await fetch(url, { headers: getRequestHeaders() });
  return handleResponse<ExpectedReturnType>(response, url);
}

export async function makePostRequest<BodyType, ExpectedReturnType>(url: string, body: BodyType) {
  const response = await fetch(url, {
    method: 'POST',
    headers: getRequestHeaders(true),
    body: JSON.stringify(body),
  });

  return handleResponse<ExpectedReturnType>(response, url);
}

export async function makePutRequest<BodyType, ExpectedReturnType>(url: string, body: BodyType) {
  const response = await fetch(url, {
    method: 'POST',
    headers: getRequestHeaders(true),
    body: JSON.stringify(body),
  });

  return handleResponse<ExpectedReturnType>(response, url);
}

export async function makePatchRequest<BodyType, ExpectedReturnType>(url: string, body: BodyType) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getRequestHeaders(true),
    body: JSON.stringify(body),
  });

  return handleResponse<ExpectedReturnType>(response, url);
}
