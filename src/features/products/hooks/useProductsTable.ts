import { useMemo } from 'react';

import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { paginate, type Page } from '@/shared/utils/paginate';

import { type FetchProductsParams } from '../api/productsApi';
import { PRODUCTS_PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '../constants';
import { type Product, type ProductSort, type ProductSortField } from '../types/product';
import { filterByTitle } from '../utils/filterByTitle';

import { useProductsQuery } from './useProductsQuery';
import { useProductsTableState } from './useProductsTableState';

const EMPTY_PRODUCTS: readonly Product[] = [];

export interface ProductsTableViewModel {
  /** The live input value (not debounced). */
  readonly searchTerm: string;
  readonly sort: ProductSort | null;
  readonly page: Page<Product>;
  readonly status: 'pending' | 'error' | 'success';
  /** True while new results load and the previous ones are still shown. */
  readonly isUpdating: boolean;
  readonly error: Error | null;
  readonly setSearchTerm: (searchTerm: string) => void;
  readonly toggleSort: (field: ProductSortField) => void;
  readonly setPage: (page: number) => void;
  readonly retry: () => void;
}

/**
 * Orchestrates the products table. The server handles keyword search and sort;
 * the client narrows results to title matches and splits them into pages.
 */
export function useProductsTable(): ProductsTableViewModel {
  const { state, setSearchTerm, toggleSort, setPage } = useProductsTableState();
  const debouncedSearch = useDebouncedValue(state.searchTerm.trim(), SEARCH_DEBOUNCE_MS);

  const params = useMemo<FetchProductsParams>(
    () => ({ search: debouncedSearch, sort: state.sort }),
    [debouncedSearch, state.sort],
  );
  const query = useProductsQuery(params);
  const products = query.data?.products ?? EMPTY_PRODUCTS;

  const page = useMemo(
    () => paginate(filterByTitle(products, debouncedSearch), state.page, PRODUCTS_PAGE_SIZE),
    [products, debouncedSearch, state.page],
  );

  return {
    searchTerm: state.searchTerm,
    sort: state.sort,
    page,
    status: query.status,
    isUpdating: query.isPlaceholderData || debouncedSearch !== state.searchTerm.trim(),
    error: query.error,
    setSearchTerm,
    toggleSort,
    setPage,
    retry: () => {
      void query.refetch();
    },
  };
}
