/** Thrown when the server responds with a non-2xx status. */
export class HttpError extends Error {
  override readonly name = 'HttpError';
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string) {
    super(`Request to ${url} failed with status ${status}`);
    this.status = status;
    this.url = url;
  }
}

/** Thrown when a response body does not match the expected shape. */
export class ResponseValidationError extends Error {
  override readonly name = 'ResponseValidationError';
  readonly url: string;

  constructor(url: string) {
    super(`Response from ${url} did not match the expected shape`);
    this.url = url;
  }
}

/** Maps any thrown value to a message that is safe to show to users. */
export function toUserMessage(error: unknown): string {
  if (error instanceof HttpError) {
    return `The server responded with an error (${error.status}). Please try again.`;
  }
  if (error instanceof ResponseValidationError) {
    return 'We received unexpected data from the server.';
  }
  if (error instanceof TypeError) {
    return 'Network error. Check your connection and try again.';
  }
  return 'Something went wrong. Please try again.';
}
