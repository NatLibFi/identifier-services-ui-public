import type { PaginationState } from '@tanstack/react-table';

import { makeGetRequest, makePostRequest } from '@/api';

export interface MonographPublisherSearchResultV1 {
  id: number;
  officialName: string;
  otherNames: string | null;
  hasQuitted: boolean;
  activeIdentifierIsbn: string | null;
  activeIdentifierIsmn: string | null;
}

export interface MonographPublisherQueryV1Response {
  totalDoc: number;
  results: MonographPublisherSearchResultV1[];
}

interface MonographPublisherSubrange {
  id: number;
  publisherIdentifier: string;
}

export interface MonographPublisherReadV1Response {
  id: number;
  officialName: string;
  previousNames: string[];
  otherNames: string | null;
  address: string;
  hasQuitted: boolean;
  city: string;
  zip: string;
  phone: string | null;
  www: string | null;
  isbnSubRanges: MonographPublisherSubrange[];
  ismnSubRanges: MonographPublisherSubrange[];
  activeIdentifierIsbn: string | null;
  activeIdentifierIsmn: string | null;
}

export interface MonographPublisherQueryV1Body {
  searchText: string;
  offset: number;
  limit: number;
}

export async function searchMonographPublishers(searchText: string, pagination: PaginationState) {
  const body = {
    searchText,
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  };

  return makePostRequest<MonographPublisherQueryV1Body, MonographPublisherQueryV1Response>(
    '/api/public/isbn-registry/publishers/query',
    body,
  );
}

export async function readMonographPublisher(monographPublisherId: string) {
  return makeGetRequest<MonographPublisherReadV1Response>(
    `/api/public/isbn-registry/publishers/${monographPublisherId}`,
  );
}
