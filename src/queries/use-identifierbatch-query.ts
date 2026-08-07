import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';

import {
  readPublisherIdentifierPublicInfo,
  type PublisherIdentifierInformationHttpResponse,
} from '@/api/identifier-download';

export const publisherIdentifierQueries = {
  read: ['readPublisherIdentifierPublicInfo'],
};

export function useReadPublisherIdentifierPublicInfo<
  TData = PublisherIdentifierInformationHttpResponse,
  TError = Error,
>(
  publisherIdentifierType: 'isbn' | 'ismn',
  publisherIdentifierId: number,
  options?: Omit<UseQueryOptions<PublisherIdentifierInformationHttpResponse, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...publisherIdentifierQueries.read, { publisherIdentifierType, publisherIdentifierId }],
    queryFn: () => readPublisherIdentifierPublicInfo(publisherIdentifierType, publisherIdentifierId),
  });
}
