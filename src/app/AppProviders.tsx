import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type JSX, type ReactNode } from 'react';

import { createQueryClient } from '@/lib/queryClient';

interface AppProvidersProps {
  readonly children: ReactNode;
}

/** All app-wide providers live here (router, theme, auth… can be added later). */
export function AppProviders({ children }: AppProvidersProps): JSX.Element {
  const [queryClient] = useState(createQueryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
