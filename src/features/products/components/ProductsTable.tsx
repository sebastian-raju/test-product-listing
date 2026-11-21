import { type JSX } from 'react';

import { DataTable } from '@/shared/components/DataTable';

import { type Product, type ProductSort, type ProductSortField } from '../types/product';

import { productColumns } from './productColumns';

interface ProductsTableProps {
  readonly products: readonly Product[];
  readonly sort: ProductSort | null;
  readonly onSortChange: (field: ProductSortField) => void;
}

const getProductKey = (product: Product): number => product.id;

function describeSort(sort: ProductSort | null): string {
  if (sort === null) {
    return 'Products';
  }
  const direction = sort.order === 'asc' ? 'low to high' : 'high to low';
  return `Products, sorted by ${sort.field} ${direction}`;
}

export function ProductsTable({ products, sort, onSortChange }: ProductsTableProps): JSX.Element {
  return (
    <DataTable
      caption={describeSort(sort)}
      columns={productColumns}
      rows={products}
      getRowKey={getProductKey}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
