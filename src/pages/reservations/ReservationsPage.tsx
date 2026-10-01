import PageHeader from '@/components/PageHeader';
import DayPicker from '@/components/ui/DayPicker';

import { addDays, format, isSameDay } from 'date-fns';
import { useState } from 'react';

import { mockReservations } from '@/features/reservations/mockReservations';

export default function ReservationsPage() {
  const today = new Date();

  const [chosenDate, setChosenDate] = useState(today);

  const todayFormatted = format(today, 'd MMMM yyyy');
  const { bookingsCount, guestsCount } = mockReservations
    .filter((r) => isSameDay(r.startsAt, chosenDate))
    .reduce(
      (acc, r) => {
        if (r.status === 'cancelled') return acc;
        acc.bookingsCount += 1;
        acc.guestsCount += r.guests;
        return acc;
      },
      { bookingsCount: 0, guestsCount: 0 },
    );

  const dates = Array.from({ length: 7 }, (_, index) => {
    return addDays(today, index);
  });

  return (
    <>
      <PageHeader
        title="Reservations"
        subtitle={`${todayFormatted} · ${bookingsCount} ${bookingsCount > 1 ? 'bookings' : 'booking'} · ${guestsCount} guests expected`}
      />

      <div className="mt-6 grid grid-cols-7 gap-2.5">
        {dates.map((date) => {
          const bookingCount = mockReservations.filter((r) => isSameDay(r.startsAt, date)).length;
          return (
            <DayPicker
              key={date.toString()}
              aria-label={`Reservations for ${format(date, 'EEEE, d MMMM yyyy')}`}
              isActive={isSameDay(date, chosenDate)}
              onClick={() => setChosenDate(date)}
            >
              <span className="text-xs font-bold tracking-wider uppercase">
                {format(date, 'EEE')}
              </span>
              <span className="font-display text-2xl font-semibold">{format(date, 'dd')}</span>
              <span className="text-[11px] opacity-80">
                {bookingCount} {bookingCount > 1 ? 'bookings' : 'booking'}
              </span>
            </DayPicker>
          );
        })}
      </div>
    </>
  );
}
