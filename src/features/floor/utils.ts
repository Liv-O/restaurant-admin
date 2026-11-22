import type { Table } from '@/types';
import { differenceInMinutes, format } from 'date-fns';

export function getTableShape(seats: number) {
  if (seats < 4) return 'rounded-[48px]';
  else if (seats === 4) return 'rounded-xl';
  else return 'rounded-xl col-span-2';
}

// export function getUpcomingReservation(tableId: string, reservations: Reservation[]) {
//   return reservations
//     .filter(
//       (res) =>
//         res.tableId === tableId &&
//         isToday(res.startsAt) &&
//         (res.status === 'pending' || res.status === 'confirmed'),
//     )
//     .reduce<Reservation | undefined>((closest, current) => {
//       if (!closest) return current;
//       return isBefore(current.startsAt, closest.startsAt) ? current : closest;
//     }, undefined);
// }

export function getTableDetails(table: Table, now: Date) {
  switch (table.status) {
    case 'free':
      return `Up to ${table.seats} guests`;
    case 'busy':
      // case 'bill':
      return `${table.activeOrder.guests} guests · ${differenceInMinutes(now, table.activeOrder.createdAt)} min`;
    case 'reserved': {
      return `${table.nextReservation.guestName} · ${format(table.nextReservation.startsAt, 'HH:mm')}`;
    }
  }
}
