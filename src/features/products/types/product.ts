import { type SortState } from '@/shared/types/sort';

export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly category: string;
}

export interface ProductsResponse {
  readonly products: readonly Product[];
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}

/** Columns the API can sort by. Extend this union to make more columns sortable. */
export type ProductSortField = 'price';

export type ProductSort = SortState<ProductSortField>;
