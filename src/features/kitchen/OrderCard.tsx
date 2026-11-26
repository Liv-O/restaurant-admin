import { differenceInMinutes } from 'date-fns';
import { Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatElapsed } from '@/lib/formatElapsed';
import type { Order } from '@/types';

type OrderCardProps = {
  order: Order;
  now: Date;
  onAction: () => void;
  actionLabel?: string;
  isUpdating?: boolean;
  barClass: string;
  actionVariant?: 'info' | 'primary';
};

export default function OrderCard({
  order,
  now,
  onAction,
  actionLabel,
  isUpdating = false,
  barClass,
  actionVariant,
}: OrderCardProps) {
  const minutes = differenceInMinutes(now, order.createdAt);
  const isLate = minutes > 20;

  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border-t-4 bg-surface p-4 shadow-sm ${barClass}`}
    >
      <header className="flex items-baseline justify-between gap-2">
        <p className="text-base font-bold text-ink">
          Table {order.table.number}
          <span className="ml-1 text-sm font-normal text-muted">· #{order.number}</span>
        </p>
        <span
          className={`flex shrink-0 items-center gap-1 text-sm font-semibold ${
            isLate ? 'text-tone-red-ink' : 'text-ink'
          }`}
        >
          <Clock className="size-3.5" aria-hidden="true" />
          {formatElapsed(minutes)}
        </span>
      </header>

      <ul className="flex flex-col gap-2">
        {order.items.map((item) => (
          <li key={item.id} className="flex gap-3 text-sm">
            <span className="w-5 shrink-0 font-semibold">{item.quantity}x</span>
            <div className="flex flex-col items-start gap-1">
              <span className="text-ink">{item.dishName}</span>
              {item.note && (
                <span className="rounded-md bg-tone-amber px-2 py-0.5 text-xs font-semibold text-tone-amber-ink">
                  {item.note}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <footer className="mt-1 flex items-center justify-between gap-2">
        <span className="text-xs text-muted">{order.waiter.name}</span>
        {actionLabel && (
          <Button size="sm" variant={actionVariant} onClick={onAction} disabled={isUpdating}>
            {isUpdating ? 'Updating…' : actionLabel}
          </Button>
        )}
      </footer>
    </article>
  );
}
