import type { Table } from '@/types';

// Temporary mock data. Will be replaced by a Supabase query.
// ids match tableId in mockReservations, so reservations can be linked to tables.
export const mockTables: Table[] = [
  { id: '1', number: 1, seats: 2, status: 'occupied', zone: 'main' },
  { id: '2', number: 2, seats: 2, status: 'reserved', zone: 'main' },
  { id: '3', number: 3, seats: 2, status: 'free', zone: 'main' },
  { id: '4', number: 4, seats: 4, status: 'free', zone: 'main' },
  { id: '5', number: 5, seats: 6, status: 'reserved', zone: 'main' },
  { id: '6', number: 6, seats: 2, status: 'free', zone: 'main' },
  { id: '7', number: 7, seats: 4, status: 'occupied', zone: 'main' },
  { id: '8', number: 8, seats: 4, status: 'bill', zone: 'main' },
  { id: '9', number: 9, seats: 4, status: 'free', zone: 'main' },
  { id: '10', number: 10, seats: 6, status: 'occupied', zone: 'main' },
  { id: '11', number: 11, seats: 8, status: 'free', zone: 'terrace' },
  { id: '12', number: 12, seats: 2, status: 'bill', zone: 'terrace' },
  { id: '13', number: 13, seats: 4, status: 'free', zone: 'terrace' },
  { id: '14', number: 14, seats: 8, status: 'occupied', zone: 'terrace' },
];
