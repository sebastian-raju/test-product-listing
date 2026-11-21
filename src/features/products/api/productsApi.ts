import { env } from '@/config/env';
import { getJson } from '@/lib/http/httpClient';

import { type Product, type ProductSort, type ProductsResponse } from '../types/product';

import { isProductsResponse } from './productGuards';

/** The API treats `limit=0` as "return every matching product". */
const ALL_RESULTS = 0;

/** Only request the fields the UI needs. */
const PRODUCT_FIELDS = [
  'id',
  'title',
  'price',
  'category',
] as const satisfies readonly (keyof Product)[];

export interface FetchProductsParams {
  /** Keyword search (the API matches title and description). */
  readonly search: string;
  readonly sort: ProductSort | null;
  /** Page size; omit to fetch all matching products. */
  readonly limit?: number;
  readonly skip?: number;
}

export function buildProductsUrl(params: FetchProductsParams): URL {
  const search = params.search.trim();
  const path = search === '' ? '/products' : '/products/search';
  const url = new URL(`${env.apiBaseUrl}${path}`);

  if (search !== '') {
    url.searchParams.set('q', search);
  }
  if (params.sort !== null) {
    url.searchParams.set('sortBy', params.sort.field);
    url.searchParams.set('order', params.sort.order);
  }
  url.searchParams.set('limit', String(params.limit ?? ALL_RESULTS));
  if (params.skip !== undefined) {
    url.searchParams.set('skip', String(params.skip));
  }
  url.searchParams.set('select', PRODUCT_FIELDS.join(','));

  return url;
}

export function fetchProducts(
  params: FetchProductsParams,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  return getJson(buildProductsUrl(params), { guard: isProductsResponse, signal });
}
