import { type Product } from '../types/product';

/** Case-insensitive "title contains term". An empty term returns all products. */
export function filterByTitle(products: readonly Product[], term: string): readonly Product[] {
  const normalizedTerm = term.trim().toLocaleLowerCase();
  if (normalizedTerm === '') {
    return products;
  }
  return products.filter((product) => product.title.toLocaleLowerCase().includes(normalizedTerm));
}
