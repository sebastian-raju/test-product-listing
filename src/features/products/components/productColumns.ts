import { type DataTableColumn } from '@/shared/components/DataTable';
import { formatCurrency, formatSlug } from '@/shared/utils/format';

import { type Product, type ProductSortField } from '../types/product';

/** Column definitions. Add a column here; make it sortable via `sortField`. */
export const productColumns: readonly DataTableColumn<Product, ProductSortField>[] = [
  {
    id: 'id',
    header: 'ID',
    cell: (product) => product.id,
    cellClassName: 'w-16 tabular-nums text-slate-400 dark:text-slate-500',
  },
  {
    id: 'title',
    header: 'Name',
    cell: (product) => product.title,
    cellClassName: 'font-medium text-slate-900 dark:text-white',
  },
  {
    id: 'category',
    header: 'Category',
    cell: (product) => formatSlug(product.category),
  },
  {
    id: 'price',
    header: 'Price',
    cell: (product) => formatCurrency(product.price),
    align: 'end',
    sortField: 'price',
    cellClassName: 'tabular-nums',
  },
];
