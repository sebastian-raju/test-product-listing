import { useMemo } from 'react';

import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { paginate, type Page } from '@/shared/utils/paginate';

import { PRODUCTS_PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '../constants';
import { type Product, type ProductSort, type ProductSortField } from '../types/product';
import { filterByTitle } from '../utils/filterByTitle';
import { sortProducts } from '../utils/sortProducts';

import { useProductsQuery } from './useProductsQuery';
import { useProductsTableState } from './useProductsTableState';

const EMPTY_PRODUCTS: readonly Product[] = [];

export interface ProductsTableViewModel {
  /** The live input value (not debounced). */
  readonly searchTerm: string;
  readonly sort: ProductSort | null;
  readonly page: Page<Product>;
  readonly status: 'pending' | 'error' | 'success';
  readonly error: Error | null;
  readonly setSearchTerm: (searchTerm: string) => void;
  readonly toggleSort: (field: ProductSortField) => void;
  readonly setPage: (page: number) => void;
  readonly retry: () => void;
}

/**
 * Orchestrates the products table: fetches the catalogue once, then
 * filters (debounced) → sorts → paginates entirely on the client.
 */
export function useProductsTable(): ProductsTableViewModel {
  const { state, setSearchTerm, toggleSort, setPage } = useProductsTableState();
  const debouncedSearch = useDebouncedValue(state.searchTerm, SEARCH_DEBOUNCE_MS);

  const query = useProductsQuery();
  const products = query.data?.products ?? EMPTY_PRODUCTS;

  // Separate memos so changing page never re-filters or re-sorts.
  const visibleProducts = useMemo(
    () => sortProducts(filterByTitle(products, debouncedSearch), state.sort),
    [products, debouncedSearch, state.sort],
  );
  const page = useMemo(
    () => paginate(visibleProducts, state.page, PRODUCTS_PAGE_SIZE),
    [visibleProducts, state.page],
  );

  return {
    searchTerm: state.searchTerm,
    sort: state.sort,
    page,
    status: query.status,
    error: query.error,
    setSearchTerm,
    toggleSort,
    setPage,
    retry: () => {
      void query.refetch();
    },
  };
}
