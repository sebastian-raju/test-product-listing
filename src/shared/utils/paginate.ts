export interface Page<T> {
  readonly items: readonly T[];
  /** 1-based page number, clamped to the valid range. */
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  /** Always at least 1, so an empty result still reads "page 1 of 1". */
  readonly totalPages: number;
}

export function paginate<T>(items: readonly T[], requestedPage: number, pageSize: number): Page<T> {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError(`pageSize must be a positive integer, received ${pageSize}`);
  }

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(1, Math.trunc(requestedPage)), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}
