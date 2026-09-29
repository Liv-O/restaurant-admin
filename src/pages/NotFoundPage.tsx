import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-5xl font-semibold">404</h1>
      <p className="text-muted">Page not found</p>
      <Link to="/" className="text-primary font-semibold hover:underline">
        Back to dashboard
      </Link>
    </main>
  );
}
