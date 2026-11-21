import { type JSX } from 'react';

interface PaginationProps {
  /** 1-based. */
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

const buttonClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800';

export function Pagination({ page, totalPages, onPageChange }: PaginationProps): JSX.Element {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page <span className="font-medium text-slate-900 dark:text-white">{page}</span> of{' '}
        <span className="font-medium text-slate-900 dark:text-white">{totalPages}</span>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClass}
          disabled={isFirst}
          onClick={() => {
            onPageChange(page - 1);
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={isLast}
          onClick={() => {
            onPageChange(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
