import { mockReservations } from '@/features/reservations/mockReservations';

// In-memory "database" for the fake API.
// Deep copies, so the original mocks are never mutated.
// Lives only until page reload — like a server that restarts.
export const db = {
  reservations: structuredClone(mockReservations),
};
