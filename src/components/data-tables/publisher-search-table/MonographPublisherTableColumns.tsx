import { type ColumnDef } from '@tanstack/react-table';

import type { MonographPublisherSearchResultV1 } from '@/api/monograph-publishers';
import OfficialNameRow from '@/components/data-tables/publisher-search-table/rows/OfficialNameRow';

// Define column display
const monographPublisherTableColumns: ColumnDef<MonographPublisherSearchResultV1>[] = [
  {
    accessorKey: 'id', // Hidden but required to access data for onClick event handler
  },
  {
    accessorKey: 'officialName',
    header: 'data-tables.monograph-publisher.headers.official-name',
    meta: {
      className: 'w-full md:w-1/2',
    },
    cell: ({ row }) => {
      return <OfficialNameRow row={row} />;
    },
  },
  {
    accessorKey: 'otherNames',
    header: 'data-tables.monograph-publisher.headers.other-names',
    meta: {
      className: 'hidden sm:table-cell md:w-1/2 overflow-hidden overflow-ellipsis',
    },
  },
];

export default monographPublisherTableColumns;
