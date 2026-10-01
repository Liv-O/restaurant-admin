import type { Tone } from '@/components/ui/Badge';

export const RESERVATION_STATUSES = ['pending', 'confirmed', 'cancelled', 'seated'] as const;

export const RESERVATION_STATUS_COLORS: Record<(typeof RESERVATION_STATUSES)[number], Tone> = {
  pending: 'amber',
  confirmed: 'green',
  cancelled: 'red',
  seated: 'blue',
};
