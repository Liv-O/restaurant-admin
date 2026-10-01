import type { Reservation } from '@/types';

// Builds an ISO string relative to today, e.g. at(0, 19, 30) → today at 19:30,
// at(1, 20) → tomorrow at 20:00. Keeps mock dates fresh no matter when the app runs.
const at = (dayOffset: number, hours: number, minutes = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Temporary mock data. Will be replaced by a Supabase query.
export const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    tableId: 'table-3',
    guestName: 'Olena Kovalenko',
    phone: '+380 67 123 4567',
    guests: 2,
    startsAt: at(-1, 19, 0),
    status: 'seated',
  },
  {
    id: 'res-2',
    guestName: 'Mark Davies',
    phone: '+44 7700 900123',
    guests: 4,
    startsAt: at(-1, 20, 30),
    status: 'cancelled',
    note: 'Called to cancel — flight delayed',
  },
  {
    id: 'res-3',
    tableId: 'table-1',
    guestName: 'Iryna Shevchenko',
    phone: '+380 50 987 6543',
    guests: 2,
    startsAt: at(0, 13, 0),
    status: 'seated',
  },
  {
    id: 'res-4',
    tableId: 'table-5',
    guestName: 'Andrii Melnyk',
    phone: '+380 93 555 1122',
    guests: 6,
    startsAt: at(0, 18, 0),
    status: 'confirmed',
    note: 'Birthday — bring a candle with dessert',
  },
  {
    id: 'res-5',
    tableId: 'table-2',
    guestName: 'Sofia Rossi',
    phone: '+39 333 123 4567',
    guests: 2,
    startsAt: at(0, 19, 30),
    status: 'confirmed',
    note: 'Window seat if possible',
  },
  {
    id: 'res-6',
    guestName: 'Taras Bondarenko',
    phone: '+380 66 444 7788',
    guests: 3,
    startsAt: at(0, 21, 0),
    status: 'pending',
  },
  {
    id: 'res-7',
    tableId: 'table-4',
    guestName: 'Emma Schneider',
    phone: '+49 151 2345 6789',
    guests: 4,
    startsAt: at(1, 19, 0),
    status: 'confirmed',
  },
  {
    id: 'res-8',
    guestName: 'Dmytro Hnatiuk',
    phone: '+380 97 321 0099',
    guests: 2,
    startsAt: at(1, 20, 0),
    status: 'pending',
    note: 'Vegetarian menu',
  },
  {
    id: 'res-9',
    guestName: 'Kateryna Lysenko',
    phone: '+380 63 777 2233',
    guests: 8,
    startsAt: at(2, 18, 30),
    status: 'pending',
    note: 'Corporate dinner, needs an invoice',
  },
  {
    id: 'res-10',
    tableId: 'table-6',
    guestName: 'Lucas Martin',
    phone: '+33 6 12 34 56 78',
    guests: 2,
    startsAt: at(3, 20, 0),
    status: 'confirmed',
  },
  {
    id: 'res-11',
    guestName: 'Natalia Kravets',
    phone: '+380 68 888 4455',
    guests: 5,
    startsAt: at(5, 19, 30),
    status: 'cancelled',
  },
  {
    id: 'res-12',
    guestName: 'James Wilson',
    phone: '+1 212 555 0147',
    guests: 3,
    startsAt: at(7, 13, 30),
    status: 'pending',
    note: 'Allergic to nuts',
  },
];
