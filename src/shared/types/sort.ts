export type SortOrder = 'asc' | 'desc';

export interface SortState<TField extends string> {
  readonly field: TField;
  readonly order: SortOrder;
}
