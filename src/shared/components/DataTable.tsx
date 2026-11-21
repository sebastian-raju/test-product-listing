import { type JSX, type ReactNode } from 'react';

import { type SortState } from '@/shared/types/sort';

import { SortableHeader } from './SortableHeader';

export interface DataTableColumn<TRow, TSortField extends string> {
  readonly id: string;
  readonly header: string;
  readonly cell: (row: TRow) => ReactNode;
  readonly align?: 'start' | 'end';
  /** Extra classes for this column's body cells. */
  readonly cellClassName?: string;
  /** When set, the header becomes a sort toggle for this field. */
  readonly sortField?: TSortField;
}

interface DataTableProps<TRow, TSortField extends string> {
  /** Accessible description of the table. */
  readonly caption: string;
  readonly columns: readonly DataTableColumn<TRow, TSortField>[];
  readonly rows: readonly TRow[];
  readonly getRowKey: (row: TRow) => string | number;
  readonly sort: SortState<TSortField> | null;
  readonly onSortChange: (field: TSortField) => void;
  /** Dims the rows while newer data loads. */
  readonly isBusy?: boolean;
}

const ALIGN_CLASS = { start: 'text-left', end: 'text-right' } as const;

export function DataTable<TRow, TSortField extends string>({
  caption,
  columns,
  rows,
  getRowKey,
  sort,
  onSortChange,
  isBusy = false,
}: DataTableProps<TRow, TSortField>): JSX.Element {
  const headerBase = 'px-4 py-3 text-xs tracking-wide text-slate-500 dark:text-slate-400';

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full border-collapse text-sm" aria-busy={isBusy}>
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
          <tr>
            {columns.map((column) => {
              const className = `${headerBase} ${ALIGN_CLASS[column.align ?? 'start']}`;
              return column.sortField === undefined ? (
                <th key={column.id} scope="col" className={`${className} font-semibold uppercase`}>
                  {column.header}
                </th>
              ) : (
                <SortableHeader
                  key={column.id}
                  label={column.header}
                  field={column.sortField}
                  sort={sort}
                  onSort={onSortChange}
                  className={className}
                />
              );
            })}
          </tr>
        </thead>
        <tbody
          className={`divide-y divide-slate-100 transition-opacity dark:divide-slate-800 ${isBusy ? 'opacity-60' : ''}`}
        >
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={`px-4 py-3 text-slate-700 dark:text-slate-300 ${ALIGN_CLASS[column.align ?? 'start']} ${column.cellClassName ?? ''}`}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
