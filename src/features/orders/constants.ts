import type { OrderStatus } from '@/types';

export const ORDER_STATUS_STYLES: Record<OrderStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-tone-blue text-tone-blue-ink' },
  cooking: { label: 'Cooking', className: 'bg-tone-amber text-tone-amber-ink' },
  ready: { label: 'Ready to serve', className: 'bg-tone-green text-tone-green-ink' },
  served: { label: 'Served', className: 'bg-tone-gray text-tone-gray-ink' },
  paid: { label: 'Paid', className: 'bg-tone-gray text-muted' },
  cancelled: { label: 'Cancelled', className: 'bg-tone-red text-tone-red-ink' },
};

export const ORDER_NEXT_ACTION: Partial<
  Record<OrderStatus, { label: string; nextStatus: OrderStatus }>
> = {
  ready: { label: 'Mark served', nextStatus: 'served' },
  served: { label: 'Close table', nextStatus: 'paid' },
};
