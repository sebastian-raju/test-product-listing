import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query';

import { productKeys } from '../api/productQueryKeys';
import { fetchProducts, type FetchProductsParams } from '../api/productsApi';
import { type ProductsResponse } from '../types/product';

export function useProductsQuery(params: FetchProductsParams): UseQueryResult<ProductsResponse> {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ signal }) => fetchProducts(params, signal),
    // Keep showing the current rows while a new search or sort loads.
    placeholderData: keepPreviousData,
  });
}
