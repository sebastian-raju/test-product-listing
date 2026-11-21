import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { productKeys } from '../api/productQueryKeys';
import { fetchProducts } from '../api/productsApi';
import { type ProductsResponse } from '../types/product';

/** Fetches the whole catalogue once; TanStack Query caches it for the session. */
export function useProductsQuery(): UseQueryResult<ProductsResponse> {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: ({ signal }) => fetchProducts(signal),
  });
}
