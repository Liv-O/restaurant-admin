import type { Reservation } from '@/types';
import { db } from './db';
import { delay } from './delay';

export async function getReservations(): Promise<Reservation[]> {
  await delay(400);
  return structuredClone(db.reservations);
}

export async function createReservation(
  reservation: Omit<Reservation, 'id'>,
): Promise<Reservation> {
  await delay(400);
  const newReservation: Reservation = { ...reservation, id: crypto.randomUUID() };
  db.reservations.push(newReservation);
  return structuredClone(newReservation);
}

export async function updateReservation(
  id: string,
  changes: Partial<Omit<Reservation, 'id'>>,
): Promise<Reservation> {
  await delay(400);
  const reservation = db.reservations.find((r) => r.id === id);
  if (!reservation) throw new Error('Reservation not found');
  Object.assign(reservation, changes);
  return structuredClone(reservation);
}
