import type { PaginationState } from '@tanstack/react-table';

import { makeGetRequest, makePostRequest } from '@/api';

interface PublisherRange {
  publisher_identifier: string;
}

export interface MonographPublisherPublicInfo {
  id: number;
  official_name: string;
  other_names: string[];
  previous_names: string[];
  address: string | null;
  zip: string | null;
  city: string | null;
  phone: string | null;
  has_quitted: boolean;
  www: string | null;
  isbn_publisher_ranges: PublisherRange[];
  ismn_publisher_ranges: PublisherRange[];
}

export interface MonographPublisherSearchHttpResponse {
  total_doc: number;
  results: MonographPublisherPublicInfo[];
}

export interface MonographPublisherSearchHttpBody {
  search_text: string;
  offset: number;
  limit: number;
}

export async function searchMonographPublishers(searchText: string, pagination: PaginationState) {
  const body = {
    search_text: searchText,
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  };

  return makePostRequest<MonographPublisherSearchHttpBody, MonographPublisherSearchHttpResponse>(
    '/api/monograph/publishers/search',
    body,
  );
}

export async function readMonographPublisher(monographPublisherId: string) {
  return makeGetRequest<MonographPublisherPublicInfo>(`/api/monograph/publishers/${monographPublisherId}`);
}
