import type { ReactNode } from 'react';

// Later: QueryClientProvider and other global providers
export default function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
