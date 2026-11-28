import type { ListResponse, Reservation } from '@/types';
import { api } from './client';

export async function getReservations(): Promise<Reservation[]> {
  const response = await api.get<ListResponse<Reservation>>('/reservations');
  return response.data.data;
}

export async function createReservation(
  reservation: Omit<Reservation, 'id'>,
): Promise<Reservation> {
  const body = {
    guestName: reservation.guestName,
    phone: reservation.phone,
    guests: reservation.guests,
    startsAt: reservation.startsAt,
    ...(reservation.note && { note: reservation.note }),
    ...(reservation.tableId && { tableId: reservation.tableId }),
  };
  const response = await api.post<Reservation>('/reservations', body);
  return response.data;
}

export async function updateReservation(
  id: string,
  changes: Partial<Omit<Reservation, 'id'>>,
): Promise<Reservation> {
  const response = await api.patch<Reservation>(`/reservations/${id}`, changes);
  return response.data;
}

export async function seatReservation(
  _reservationId: string,
  _waiter: { waiter: string },
): Promise<Reservation> {
  // await delay(400);
  // const reservationIndex = db.reservations.findIndex((r) => r.id === reservationId);
  // if (reservationIndex === -1) throw new Error('Reservation not found');
  // const reservation = db.reservations[reservationIndex];
  // if (reservation.status !== 'pending' && reservation.status !== 'confirmed') {
  //   throw new Error('Reservation is not in a state that can be seated');
  // }
  // const table = db.tables.find((t) => t.id === reservation.tableId);
  // if (!table) throw new Error('Table not found');
  // if (table.status === 'busy') {
  //   // if (table.status === 'busy' || table.status === 'bill') {
  //   throw new Error('Table is not free or reserved');
  // }
  // const newReservationData: Reservation = {
  //   ...reservation,
  //   status: 'seated',
  // };
  // db.reservations[reservationIndex] = newReservationData;
  // const tableIndex = db.tables.findIndex((t) => t.id === table.id);
  // db.tables[tableIndex] = {
  //   ...table,
  //   status: 'busy',
  //   guests: reservation.guests,
  //   seatedAt: new Date().toISOString(),
  //   waiter,
  // };
  // return structuredClone(newReservationData);
  throw new Error('Not implemented yet');
}
