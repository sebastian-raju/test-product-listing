import { env } from '@/config/env';
import { getJson } from '@/lib/http/httpClient';

import { type Product, type ProductsResponse } from '../types/product';

import { isProductsResponse } from './productGuards';

/** The API treats `limit=0` as "return every product". */
const ALL_RESULTS = 0;

/** Only request the fields the UI needs. */
const PRODUCT_FIELDS = [
  'id',
  'title',
  'price',
  'category',
] as const satisfies readonly (keyof Product)[];

/**
 * The full catalogue is small (~200 rows × 4 fields), so it is fetched once and
 * searched, sorted and paginated on the client.
 */
export function buildProductsUrl(): URL {
  const url = new URL(`${env.apiBaseUrl}/products`);
  url.searchParams.set('limit', String(ALL_RESULTS));
  url.searchParams.set('select', PRODUCT_FIELDS.join(','));
  return url;
}

export function fetchProducts(signal?: AbortSignal): Promise<ProductsResponse> {
  return getJson(buildProductsUrl(), { guard: isProductsResponse, signal });
}
