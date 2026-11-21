const DEFAULT_API_BASE_URL = 'https://dummyjson.com';

function readApiBaseUrl(): string {
  const value = import.meta.env.VITE_API_BASE_URL?.trim();
  if (value === undefined || value === '') {
    return DEFAULT_API_BASE_URL;
  }
  return value.replace(/\/+$/, '');
}

/** Typed, validated runtime configuration. Read env vars only through this module. */
export const env = {
  apiBaseUrl: readApiBaseUrl(),
} as const;
