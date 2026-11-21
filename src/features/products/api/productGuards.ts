import { isArrayOf, isFiniteNumber, isRecord, isString } from '@/lib/validation/guards';

import { type Product, type ProductsResponse } from '../types/product';

export function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    isFiniteNumber(value.id) &&
    isString(value.title) &&
    isFiniteNumber(value.price) &&
    isString(value.category)
  );
}

export function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    isRecord(value) &&
    isArrayOf(value.products, isProduct) &&
    isFiniteNumber(value.total) &&
    isFiniteNumber(value.skip) &&
    isFiniteNumber(value.limit)
  );
}
