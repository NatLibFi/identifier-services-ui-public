import { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from '@tanstack/react-table';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table';

import { Button } from '@/components/shadcn/button';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';

import useTranslation from '@/hooks/useTranslation';

import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}

function MonographPublisherDataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  rowCount,
}: DataTableProps<TData, TValue>) {
  // columnVisibility hides ID column by binding the state to table state
  // ID column is required in order to gain access to value for event handler of row onClick
  const [columnVisibility] = useState({ id: false });
  const { translate: t } = useTranslation();

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true, // Filter server-side for V1
    manualPagination: true, // Paginate server-side for V1
    state: {
      columnVisibility,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  // Fixes issues where page is displayed as 1 / 0 when there are no results
  const pageNumber = table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1;

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={cn(header.column.columnDef.meta?.className)}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(t(header.column.columnDef.header as string), header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.className)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t('data-tables.no-results')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between pt-4 w-full">
        <div className="flex gap-2">
          <Button
            aria-label={t('forms.aria-label.previous')}
            className="max-w-3xs"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            aria-label={t('forms.aria-label.next')}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <div className="flex self-center mr-[10px]">
          <NatlibfiBodyText>
            {t('data-tables.page')} {pageNumber} / {table.getPageCount()}
          </NatlibfiBodyText>
        </div>
      </div>
    </div>
  );
}

export default MonographPublisherDataTable;
