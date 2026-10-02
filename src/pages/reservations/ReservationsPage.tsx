import PageHeader from '@/components/PageHeader';
import DayPicker from '@/components/ui/DayPicker';
import { RESERVATION_STATUSES } from '@/features/reservations/constants';

import { addDays, compareAsc, format, isSameDay } from 'date-fns';
import { useState } from 'react';

import { mockReservations } from '@/features/reservations/mockReservations';
import { RESERVATION_STATUS_TONES } from '@/features/reservations/constants';
import FilterChip from '@/components/ui/FilterChip';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { Users } from 'lucide-react';
import Button from '@/components/ui/Button';

type StatusFilter = (typeof RESERVATION_STATUSES)[number] | 'All';

export default function ReservationsPage() {
  const today = new Date();

  const [chosenDate, setChosenDate] = useState(today);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('All');
  const [reservations, setReservations] = useState(mockReservations);

  const statusOptions: StatusFilter[] = ['All', ...RESERVATION_STATUSES];

  const chosenDateFormatted = format(chosenDate, 'd MMMM yyyy');

  const filteredReservations = (neededStatus: StatusFilter, date: Date) =>
    reservations.filter((r) => {
      const isSameDate = isSameDay(r.startsAt, date);
      const isSameStatus = neededStatus === 'All' || r.status === neededStatus;
      return isSameDate && isSameStatus;
    });

  const { bookingsCount, guestsCount } = filteredReservations('All', chosenDate).reduce(
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

  const tableReservations = filteredReservations(selectedStatus, chosenDate).toSorted((a, b) =>
    compareAsc(a.startsAt, b.startsAt),
  );

  function handleSeatReservation(reservationId: string) {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'seated' } : r)),
    );
  }

  return (
    <>
      <PageHeader
        title="Reservations"
        subtitle={`${chosenDateFormatted} · ${bookingsCount} ${bookingsCount === 1 ? 'booking' : 'bookings'} · ${guestsCount} guests expected`}
      />

      <div className="mt-6 grid grid-cols-7 gap-2.5">
        {dates.map((date) => {
          const bookingCount = filteredReservations('All', date).length;
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
                {bookingCount} {bookingCount === 1 ? 'booking' : 'bookings'}
              </span>
            </DayPicker>
          );
        })}
      </div>
      <div className="mt-6 flex justify-start gap-2.5">
        {statusOptions.map((status) => {
          const countOfBookings = filteredReservations(status, chosenDate).length;
          return (
            <FilterChip
              key={status}
              isActive={selectedStatus === status}
              onClick={() => setSelectedStatus(status)}
              className="capitalize"
            >
              {`${status} (${countOfBookings})`}
            </FilterChip>
          );
        })}
      </div>
      <Card className="mt-6">
        <Table columns={['Time', 'Guest', 'Party', 'Table', 'Notes', 'Status', '']}>
          <Table.Header />
          <Table.Body
            data={tableReservations}
            render={(reservation) => (
              <Table.Row key={reservation.id}>
                <Table.Cell className="font-semibold tabular-nums">
                  {format(reservation.startsAt, 'HH:mm')}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-ink">{reservation.guestName}</p>
                    <p className="text-xs text-muted">{reservation.phone}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="inline-flex items-center gap-1.5">
                    <Users size={16} className="text-muted" />
                    <span> {reservation.guests} </span>
                  </div>
                </Table.Cell>
                <Table.Cell>{reservation.tableId ? reservation.tableId : '-'}</Table.Cell>
                <Table.Cell className="max-w-56 truncate text-muted">
                  {reservation.note ? reservation.note : '-'}
                </Table.Cell>
                <Table.Cell>
                  <Badge tone={RESERVATION_STATUS_TONES[reservation.status]} className="capitalize">
                    {reservation.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSeatReservation(reservation.id)}
                    >
                      Seat
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          />
        </Table>
      </Card>
    </>
  );
}
