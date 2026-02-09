import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';

import { readIdentifierBatch, type IdentifierBatchReadV1Response } from '@/api/identifier-batches';

export const identifierBatchQueries = {
  read: ['readIdentifierBatch'],
};

export function useReadIdentifierBatch<TData = IdentifierBatchReadV1Response, TError = Error>(
  identifierBatchId: string,
  options?: Omit<UseQueryOptions<IdentifierBatchReadV1Response, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    ...options,
    queryKey: [...identifierBatchQueries.read, identifierBatchId],
    queryFn: () => readIdentifierBatch(identifierBatchId),
  });
}
