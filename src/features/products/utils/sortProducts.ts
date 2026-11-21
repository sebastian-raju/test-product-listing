import { sortItems, type SortValue } from '@/shared/utils/sort';

import { type Product, type ProductSort, type ProductSortField } from '../types/product';

/** Adding a field to `ProductSortField` makes it sortable here automatically. */
const getProductSortValue = (product: Product, field: ProductSortField): SortValue =>
  product[field];

export function sortProducts(
  products: readonly Product[],
  sort: ProductSort | null,
): readonly Product[] {
  return sortItems(products, sort, getProductSortValue);
}
