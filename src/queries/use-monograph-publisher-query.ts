import { keepPreviousData, queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';

import {
  readMonographPublisher,
  searchMonographPublishers,
  type MonographPublisherQueryV1Response,
  type MonographPublisherReadV1Response,
} from '@/api/monograph-publishers';

export const monographPublisherQueries = {
  read: ['readMonographPublisher'],
  search: ['searchMonographPublishers'],
};

export function useReadMonographPublisher<TData = MonographPublisherReadV1Response, TError = Error>(
  monographPublisherId: string,
  options?: Omit<UseQueryOptions<MonographPublisherReadV1Response, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...monographPublisherQueries.read, monographPublisherId],
    queryFn: () => readMonographPublisher(monographPublisherId),
  });
}

export function useSearchMonographPublishersQuery<TData = MonographPublisherQueryV1Response, TError = Error>(
  queryString: string,
  pagination: PaginationState,
  options?: Omit<UseQueryOptions<MonographPublisherQueryV1Response, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...monographPublisherQueries.search, queryString, pagination],
    queryFn: () => searchMonographPublishers(queryString, pagination),
    placeholderData: keepPreviousData,
  });
}
