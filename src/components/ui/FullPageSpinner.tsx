import { LoaderCircle } from 'lucide-react';

export default function FullPageSpinner() {
  return (
    <div role="status" className="flex min-h-screen items-center justify-center bg-bg">
      <LoaderCircle className="size-8 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
