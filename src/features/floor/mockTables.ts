import type { Table } from '@/types';

// Builds an ISO string N minutes before now, e.g. minutesAgo(42) → 42 minutes ago.
// Keeps "seated for" times realistic no matter when the app runs.
const minutesAgo = (minutes: number): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
};

// Temporary mock data. Will be replaced by a Supabase query.
// ids match tableId in mockReservations, so reservations can be linked to tables.
export const mockTables: Table[] = [
  {
    id: '1',
    number: 1,
    seats: 2,
    status: 'occupied',
    zone: 'main',
    guests: 2,
    seatedAt: minutesAgo(42),
    waiter: 'Anna',
  },
  { id: '2', number: 2, seats: 2, status: 'reserved', zone: 'main' },
  { id: '3', number: 3, seats: 2, status: 'free', zone: 'main' },
  { id: '4', number: 4, seats: 4, status: 'free', zone: 'main' },
  { id: '5', number: 5, seats: 6, status: 'reserved', zone: 'main' },
  { id: '6', number: 6, seats: 2, status: 'free', zone: 'main' },
  {
    id: '7',
    number: 7,
    seats: 4,
    status: 'occupied',
    zone: 'main',
    guests: 3,
    seatedAt: minutesAgo(15),
    waiter: 'Max',
  },
  {
    id: '8',
    number: 8,
    seats: 4,
    status: 'bill',
    zone: 'main',
    guests: 4,
    seatedAt: minutesAgo(95),
    waiter: 'Anna',
  },
  { id: '9', number: 9, seats: 4, status: 'free', zone: 'main' },
  {
    id: '10',
    number: 10,
    seats: 6,
    status: 'occupied',
    zone: 'main',
    guests: 5,
    seatedAt: minutesAgo(68),
    waiter: 'Max',
  },
  { id: '11', number: 11, seats: 8, status: 'free', zone: 'terrace' },
  {
    id: '12',
    number: 12,
    seats: 2,
    status: 'bill',
    zone: 'terrace',
    guests: 2,
    seatedAt: minutesAgo(80),
    waiter: 'Sofia',
  },
  { id: '13', number: 13, seats: 4, status: 'free', zone: 'terrace' },
  {
    id: '14',
    number: 14,
    seats: 8,
    status: 'occupied',
    zone: 'terrace',
    guests: 7,
    seatedAt: minutesAgo(27),
    waiter: 'Sofia',
  },
];
