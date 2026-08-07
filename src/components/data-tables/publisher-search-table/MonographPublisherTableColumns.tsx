import { type ColumnDef } from '@tanstack/react-table';

import type { MonographPublisherPublicInfo } from '@/api/monograph-publishers';
import OfficialNameRow from '@/components/data-tables/publisher-search-table/rows/OfficialNameRow';

// Define column display
const monographPublisherTableColumns: ColumnDef<MonographPublisherPublicInfo>[] = [
  {
    accessorKey: 'id', // Hidden but required to access data for onClick event handler
  },
  {
    accessorKey: 'official_name',
    header: 'data-tables.monograph-publisher.headers.official-name',
    meta: {
      className: 'w-full md:w-1/2',
    },
    cell: ({ row }) => {
      return <OfficialNameRow row={row} />;
    },
  },
  {
    accessorKey: 'other_names',
    header: 'data-tables.monograph-publisher.headers.other-names',
    meta: {
      className: 'hidden sm:table-cell md:w-1/2 overflow-hidden overflow-ellipsis',
    },
    cell: ({ row }) => {
      return row.original.other_names.join(', ');
    },
  },
];

export default monographPublisherTableColumns;
