/** A runtime check that narrows `unknown` to `T`. */
export type TypeGuard<T> = (value: unknown) => value is T;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isArrayOf<T>(value: unknown, guard: TypeGuard<T>): value is T[] {
  return Array.isArray(value) && value.every(guard);
}
