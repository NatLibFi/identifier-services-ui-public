// This type extension allows passing Tailwind classes to Tanstack Table headers
// Solution from: https://github.com/TanStack/table/discussions/3259#discussioncomment-8115162

// Using meta tag documented also in Tanstack Table docs:
// https://tanstack.com/table/latest/docs/api/core/column-def#meta

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}
