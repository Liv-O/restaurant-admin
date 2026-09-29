import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <Button variant="primary" size="md" className="mt-4">
        Primary Button
      </Button>
      <Button variant="secondary" size="md" className="mt-4">
        Secondary Button
      </Button>
      <Button variant="ghost" size="md" className="mt-4">
        Ghost Button
      </Button>
      <Button variant="outline" size="md" className="mt-4">
        Outline Button
      </Button>
      <Badge tone="green">Free Badge</Badge>
      <Badge tone="amber">Busy Badge</Badge>
      <Badge tone="blue">Reserved Pending Badge</Badge>
      <Badge tone="red">Bill Badge</Badge>
      <Badge tone="neutral">Neutral Badge</Badge>
    </>
  );
}
