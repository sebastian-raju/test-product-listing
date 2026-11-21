import { type TypeGuard } from '@/lib/validation/guards';

import { HttpError, ResponseValidationError } from './errors';

export interface GetJsonOptions<T> {
  /** Validates the parsed body so callers receive a truly typed value. */
  readonly guard: TypeGuard<T>;
  readonly signal?: AbortSignal | undefined;
}

/**
 * Performs a GET request and returns the validated JSON body.
 * `response.json()` is typed `any`, so the body is treated as `unknown`
 * until the guard has narrowed it.
 */
export async function getJson<T>(url: URL | string, options: GetJsonOptions<T>): Promise<T> {
  const href = url.toString();
  const response = await fetch(href, {
    headers: { Accept: 'application/json' },
    signal: options.signal ?? null,
  });

  if (!response.ok) {
    throw new HttpError(response.status, href);
  }

  const body: unknown = await response.json();
  if (!options.guard(body)) {
    throw new ResponseValidationError(href);
  }
  return body;
}
