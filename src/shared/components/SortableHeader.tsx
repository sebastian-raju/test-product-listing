import { type JSX } from 'react';

import { type SortOrder, type SortState } from '@/shared/types/sort';

interface SortableHeaderProps<TField extends string> {
  readonly label: string;
  readonly field: TField;
  readonly sort: SortState<TField> | null;
  readonly onSort: (field: TField) => void;
  readonly className?: string;
}

const ARIA_SORT: Record<SortOrder, 'ascending' | 'descending'> = {
  asc: 'ascending',
  desc: 'descending',
};

const NEXT_ACTION: Record<SortOrder | 'none', string> = {
  none: 'sort ascending',
  asc: 'sort descending',
  desc: 'remove sorting',
};

export function SortableHeader<TField extends string>({
  label,
  field,
  sort,
  onSort,
  className = '',
}: SortableHeaderProps<TField>): JSX.Element {
  const order = sort?.field === field ? sort.order : null;

  return (
    <th scope="col" aria-sort={order === null ? 'none' : ARIA_SORT[order]} className={className}>
      <button
        type="button"
        onClick={() => {
          onSort(field);
        }}
        aria-label={`${label}, ${NEXT_ACTION[order ?? 'none']}`}
        className="group inline-flex items-center gap-1.5 rounded font-semibold uppercase hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:hover:text-white"
      >
        {label}
        <SortIcon order={order} />
      </button>
    </th>
  );
}

function SortIcon({ order }: { readonly order: SortOrder | null }): JSX.Element {
  const upClass = order === 'asc' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-300';
  const downClass = order === 'desc' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-300';

  return (
    <svg aria-hidden="true" viewBox="0 0 12 16" className="h-4 w-3" fill="currentColor">
      <path d="M6 2 10 7H2z" className={upClass} />
      <path d="M6 14 2 9h8z" className={downClass} />
    </svg>
  );
}
