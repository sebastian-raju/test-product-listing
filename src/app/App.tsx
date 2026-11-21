import { type JSX } from 'react';

import { ProductsPage } from '@/features/products';

import { AppProviders } from './AppProviders';

export function App(): JSX.Element {
  return (
    <AppProviders>
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductsPage />
      </main>
    </AppProviders>
  );
}
