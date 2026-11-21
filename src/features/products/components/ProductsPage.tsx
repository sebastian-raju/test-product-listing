import { type JSX } from 'react';

import { toUserMessage } from '@/lib/http/errors';
import { Pagination } from '@/shared/components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/StatusMessage';

import { useProductsTable, type ProductsTableViewModel } from '../hooks/useProductsTable';

import { ProductsTable } from './ProductsTable';
import { ProductsToolbar } from './ProductsToolbar';

export function ProductsPage(): JSX.Element {
  const table = useProductsTable();

  return (
    <section aria-labelledby="products-heading" className="flex flex-col gap-6">
      <header>
        <h1
          id="products-heading"
          className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          Products
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search by name and sort by price.
        </p>
      </header>

      <ProductsToolbar
        searchTerm={table.searchTerm}
        onSearchChange={table.setSearchTerm}
        resultCount={table.status === 'success' ? table.page.totalItems : undefined}
      />

      <ProductsContent table={table} />
    </section>
  );
}

function ProductsContent({ table }: { readonly table: ProductsTableViewModel }): JSX.Element {
  switch (table.status) {
    case 'pending':
      return <LoadingState label="Loading products…" />;
    case 'error':
      return <ErrorState message={toUserMessage(table.error)} onRetry={table.retry} />;
    case 'success':
      break;
  }

  const { page } = table;
  if (page.totalItems === 0) {
    return (
      <EmptyState
        title="No products found"
        description={`Nothing matches “${table.searchTerm.trim()}”. Try a different name.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductsTable
        products={page.items}
        sort={table.sort}
        onSortChange={table.toggleSort}
        isUpdating={table.isUpdating}
      />
      <Pagination page={page.page} totalPages={page.totalPages} onPageChange={table.setPage} />
    </div>
  );
}
