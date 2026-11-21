import { type FetchProductsParams } from './productsApi';

/** Hierarchical query keys so related queries can be invalidated together. */
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: FetchProductsParams) => [...productKeys.lists(), params] as const,
};
