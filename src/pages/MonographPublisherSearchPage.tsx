import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { type OnChangeFn, type PaginationState } from '@tanstack/react-table';

import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';

import ContentWrapper from '@/components/layout-utils/ContentWrapper';
import MonographPublisherDataTable from '@/components/data-tables/publisher-search-table/MonographPublisherDataTable';
import monographPublisherTableColumns from '@/components/data-tables/publisher-search-table/MonographPublisherTableColumns';
import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';

import { useSearchMonographPublishersQuery } from '@/queries/use-monograph-publisher-query';

import useTranslation from '@/hooks/useTranslation';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

function MonographPublisherSearchPage() {
  const { translate: t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const lng = searchParams.get('lng') ?? 'fi';
  const searchText = searchParams.get('search') ?? '';
  const page = searchParams.get('page') ?? '1';
  const pageIndex = isNaN(Number(page)) || Number(page) < 1 ? 0 : Number(page) - 1; // Disallow negative indexes

  const [input, setInput] = useState(searchText);
  const initialPaginationState = { pageIndex: pageIndex, pageSize: 10 };

  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);

  // Adjusts both URL and pagination state to allow returning to same page via back button
  const setUrlPagination: OnChangeFn<PaginationState> = (updaterOrValue) => {
    // typeof check workaround is done here as proposed by muuhoffman at
    // https://github.com/TanStack/table/discussions/5002#discussioncomment-9778436
    const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;

    // Set URL params to allow traversing back after selecting a row
    setSearchParams({
      lng,
      search: searchText,
      page: `${newPagination.pageIndex + 1}`,
    });

    // Set pagination state for re-render table with new pagination
    setPagination(newPagination);
  };

  // Sets new URL and re-initializes pagination to default state
  const setPaginatedSearch = (searchString: string) => {
    setSearchParams({
      lng,
      search: searchString,
      page: '1', // Always set
    });

    setPagination({ pageIndex: 0, pageSize: initialPaginationState.pageSize });
  };

  const { data, isPending, isFetching, isError } = useQuery(useSearchMonographPublishersQuery(searchText, pagination));

  return (
    <ContentWrapper>
      <NatlibfiHeading size={'l'}>{t('pages.publisher-registry-search.title')} (ISBN/ISMN)</NatlibfiHeading>

      <div className="flex flex-col md:flex-row max-w-sm md:max-w-md max-sm:self-center gap-2 pb-6">
        <Input
          aria-label={t('forms.aria-label.search')}
          name="publisher-registry-search"
          type="text"
          value={input}
          placeholder={t('pages.publisher-registry-search.input')}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setPaginatedSearch(input);
            }
          }}
          disabled={isFetching}
        />
        <Button type="submit" variant="outline" disabled={isFetching} onClick={() => setPaginatedSearch(input)}>
          {t('forms.submit-search')}
        </Button>
      </div>

      {isError && !isPending && (
        <NatlibfiBodyText className="max-sm:text-center">{t('errors.api.generic')}</NatlibfiBodyText>
      )}

      {!isError && !isPending && (
        <MonographPublisherDataTable
          data={data.results}
          rowCount={data.totalDoc}
          columns={monographPublisherTableColumns}
          pagination={pagination}
          setPagination={setUrlPagination}
        />
      )}
    </ContentWrapper>
  );
}

export default MonographPublisherSearchPage;
