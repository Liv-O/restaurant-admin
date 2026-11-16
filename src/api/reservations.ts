import type { Reservation } from '@/types';
import { db } from './db';
import { delay } from './delay';

export async function getReservations(): Promise<Reservation[]> {
  await delay(400);
  return structuredClone(db.reservations);
}
