import type { Tone } from '@/components/ui/Badge';

export const RESERVATION_STATUSES = ['pending', 'confirmed', 'cancelled', 'seated'] as const;

export const RESERVATION_STATUS_TONES: Record<(typeof RESERVATION_STATUSES)[number], Tone> = {
  pending: 'amber',
  confirmed: 'green',
  cancelled: 'red',
  seated: 'blue',
};

const OPENING_TIME = 12 * 60; // 12:00 у хвилинах
const CLOSING_TIME = 22 * 60 + 30; // 22:30
const SLOT_STEP = 30; // хвилин

export const TIME_SLOTS = Array.from(
  { length: (CLOSING_TIME - OPENING_TIME) / SLOT_STEP + 1 },
  (_, i) => {
    const total = OPENING_TIME + i * SLOT_STEP;
    const hours = String(Math.floor(total / 60)).padStart(2, '0');
    const minutes = String(total % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  },
);
// ['12:00', '12:30', ..., '22:30']

export const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1); // [1, 2, ..., 20]
