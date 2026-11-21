import { type SortState } from '@/shared/types/sort';

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
