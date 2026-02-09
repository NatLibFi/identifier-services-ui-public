import { useSearchParams } from 'react-router';

import { type Row } from '@tanstack/react-table';

import type { MonographPublisherSearchResultV1 } from '@/api/monograph-publishers';
import InternalLink from '@/components/links/InternalLink';
import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

import { getParameterizedLink } from '@/utils/link-utils';

function OfficialNameRow({ row }: { row: Row<MonographPublisherSearchResultV1> }) {
  const [searchParams] = useSearchParams();
  const useLink = (href: string) => getParameterizedLink(href, searchParams);

  return (
    <InternalLink
      to={useLink(`/monograph-publishers/${row.getValue('id')}`)}
      state={{
        backlink: `${window.location.pathname}${window.location.search}`,
      }}
    >
      <NatlibfiLinkText className="overflow-hidden overflow-ellipsis">{row.getValue('officialName')}</NatlibfiLinkText>
    </InternalLink>
  );
}

export default OfficialNameRow;
