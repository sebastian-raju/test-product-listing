import { type JSX } from 'react';

import { SearchInput } from '@/shared/components/SearchInput';

interface ProductsToolbarProps {
  readonly searchTerm: string;
  readonly onSearchChange: (searchTerm: string) => void;
  /** Undefined until the first response arrives. */
  readonly resultCount: number | undefined;
}

export function ProductsToolbar({
  searchTerm,
  onSearchChange,
  resultCount,
}: ProductsToolbarProps): JSX.Element {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        id="product-search"
        label="Search products by name"
        placeholder="Search by name…"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <p aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">
        {resultCount === undefined
          ? ' '
          : `${resultCount} ${resultCount === 1 ? 'product' : 'products'}`}
      </p>
    </div>
  );
}
