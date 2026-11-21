import { useCallback, useReducer } from 'react';

import { getNextSort } from '@/shared/utils/sort';

import { type ProductSort, type ProductSortField } from '../types/product';

export interface ProductsTableState {
  readonly searchTerm: string;
  readonly sort: ProductSort | null;
  /** 1-based. */
  readonly page: number;
}

export type ProductsTableAction =
  | { readonly type: 'searchChanged'; readonly searchTerm: string }
  | { readonly type: 'sortToggled'; readonly field: ProductSortField }
  | { readonly type: 'pageChanged'; readonly page: number };

export const initialProductsTableState: ProductsTableState = {
  searchTerm: '',
  sort: null,
  page: 1,
};

/** Changing the search or sort always returns to the first page. */
export function productsTableReducer(
  state: ProductsTableState,
  action: ProductsTableAction,
): ProductsTableState {
  switch (action.type) {
    case 'searchChanged':
      return { ...state, searchTerm: action.searchTerm, page: 1 };
    case 'sortToggled':
      return { ...state, sort: getNextSort(state.sort, action.field), page: 1 };
    case 'pageChanged':
      return { ...state, page: action.page };
  }
}

export interface ProductsTableStateApi {
  readonly state: ProductsTableState;
  readonly setSearchTerm: (searchTerm: string) => void;
  readonly toggleSort: (field: ProductSortField) => void;
  readonly setPage: (page: number) => void;
}

export function useProductsTableState(): ProductsTableStateApi {
  const [state, dispatch] = useReducer(productsTableReducer, initialProductsTableState);

  const setSearchTerm = useCallback((searchTerm: string) => {
    dispatch({ type: 'searchChanged', searchTerm });
  }, []);
  const toggleSort = useCallback((field: ProductSortField) => {
    dispatch({ type: 'sortToggled', field });
  }, []);
  const setPage = useCallback((page: number) => {
    dispatch({ type: 'pageChanged', page });
  }, []);

  return { state, setSearchTerm, toggleSort, setPage };
}
