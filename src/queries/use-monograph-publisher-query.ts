import { keepPreviousData, queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';

import {
  readMonographPublisher,
  searchMonographPublishers,
  type MonographPublisherSearchHttpResponse,
  type MonographPublisherPublicInfo,
} from '@/api/monograph-publishers';

export const monographPublisherQueries = {
  read: ['readMonographPublisher'],
  search: ['searchMonographPublishers'],
};

export function useReadMonographPublisher<TData = MonographPublisherPublicInfo, TError = Error>(
  monographPublisherId: string,
  options?: Omit<UseQueryOptions<MonographPublisherPublicInfo, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...monographPublisherQueries.read, monographPublisherId],
    queryFn: () => readMonographPublisher(monographPublisherId),
  });
}

export function useSearchMonographPublishersQuery<TData = MonographPublisherSearchHttpResponse, TError = Error>(
  queryString: string,
  pagination: PaginationState,
  options?: Omit<UseQueryOptions<MonographPublisherSearchHttpResponse, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...monographPublisherQueries.search, queryString, pagination],
    queryFn: () => searchMonographPublishers(queryString, pagination),
    placeholderData: keepPreviousData,
  });
}
