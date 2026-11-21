import { type SortState } from '@/shared/types/sort';

export type SortValue = string | number;

/**
 * Cycles a column's sort: unsorted → ascending → descending → unsorted.
 * Selecting a different column starts it at ascending.
 */
export function getNextSort<TField extends string>(
  current: SortState<TField> | null,
  field: TField,
): SortState<TField> | null {
  if (current?.field !== field) {
    return { field, order: 'asc' };
  }
  return current.order === 'asc' ? { field, order: 'desc' } : null;
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export function compareSortValues(a: SortValue, b: SortValue): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return collator.compare(String(a), String(b));
}

/**
 * Returns a new, stably sorted array (the input is never mutated).
 * `null` sort keeps the original order.
 */
export function sortItems<TItem, TField extends string>(
  items: readonly TItem[],
  sort: SortState<TField> | null,
  getValue: (item: TItem, field: TField) => SortValue,
): readonly TItem[] {
  if (sort === null) {
    return items;
  }
  const direction = sort.order === 'asc' ? 1 : -1;
  return items.toSorted(
    (a, b) => compareSortValues(getValue(a, sort.field), getValue(b, sort.field)) * direction,
  );
}
