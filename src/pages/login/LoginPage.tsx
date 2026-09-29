import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="p-10">
        <h1 className="font-display text-4xl font-semibold">Restaurant Admin</h1>
        <p className="text-muted mt-2">Staff console</p>
        <Button className="mt-6">Sign in</Button>
      </Card>
    </main>
  );
}
