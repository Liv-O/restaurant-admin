import PageHeader from '@/components/PageHeader';
import DayPicker from '@/components/ui/DayPicker';
import { RESERVATION_STATUSES } from '@/features/reservations/constants';

import { addDays, compareAsc, format, isSameDay } from 'date-fns';
import { useState } from 'react';

import { RESERVATION_STATUS_TONES } from '@/features/reservations/constants';
import FilterChip from '@/components/ui/FilterChip';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { Ban, Pencil, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/Modal';
import NewReservationForm from '@/features/reservations/NewReservationForm';
import type { Reservation } from '@/types';

import ConfirmDialog from '@/components/ui/ConfirmDialog';
import useReservations from '@/features/reservations/useReservations';
import useUpdateReservation from '@/features/reservations/useUpdateReservation';
import useCreateReservation from '@/features/reservations/useCreateReservation';
import useTables from '@/features/floor/useTables';

type StatusFilter = (typeof RESERVATION_STATUSES)[number] | 'All';

type ReservationModal =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; reservation: Reservation }
  | { mode: 'cancel'; reservation: Reservation };

export default function ReservationsPage() {
  const today = new Date();

  const [chosenDate, setChosenDate] = useState(today);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('All');

  const { data: reservations = [], isPending: isReservationsPending } = useReservations();

  const { mutate: updateReservation, isPending: isUpdateReservationPending } =
    useUpdateReservation();
  const { mutate: createReservation, isPending: isCreateReservationPending } =
    useCreateReservation();
  const { data: tables = [] } = useTables();

  const [modal, setModal] = useState<ReservationModal>({ mode: 'closed' });

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
    updateReservation({ id: reservationId, reservationData: { status: 'seated' } });
  }

  function handleConfirmReservation(reservationId: string) {
    updateReservation({ id: reservationId, reservationData: { status: 'confirmed' } });
  }

  function handleOpenModalNewRes() {
    setModal({ mode: 'create' });
  }

  function handleOpenModalEdit(reservation: Reservation) {
    setModal({ mode: 'edit', reservation });
  }

  function handleOpenModalCancel(reservation: Reservation) {
    setModal({ mode: 'cancel', reservation });
  }

  function cancelReservation(reservation: Reservation) {
    updateReservation(
      { id: reservation.id, reservationData: { status: 'cancelled' } },
      {
        onSuccess: () => {
          setModal({ mode: 'closed' });
        },
      },
    );
  }

  function updateReservationsList(data: Omit<Reservation, 'id'>) {
    if (modal.mode === 'edit') {
      const { tableId, status, ...rest } = data;
      updateReservation(
        {
          id: modal.reservation.id,
          reservationData: {
            ...(status !== modal.reservation.status && { status: status }),
            ...(tableId !== modal.reservation.tableId && { tableId }),
            ...rest,
          },
        },
        {
          onSuccess: () => {
            setModal({ mode: 'closed' });
            setChosenDate(new Date(data.startsAt));
          },
        },
      );
    } else if (modal.mode === 'create') {
      createReservation(data, {
        onSuccess: () => {
          setModal({ mode: 'closed' });
          setChosenDate(new Date(data.startsAt));
        },
      });
    }
  }

  function getTableLabel(tableId: string | null) {
    const table = tables.find((t) => t.id === tableId);
    return table ? `T${table.number}` : '—';
  }

  return (
    <>
      <PageHeader
        title="Reservations"
        action={
          <Button variant="primary" size="sm" onClick={handleOpenModalNewRes}>
            <Users className="h-4 w-4" />
            New Reservation
          </Button>
        }
        subtitle={`${chosenDateFormatted} · ${bookingsCount} ${bookingsCount === 1 ? 'booking' : 'bookings'} · ${guestsCount} guests expected`}
      ></PageHeader>
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
        {isReservationsPending && (
          <p className="py-10 text-center text-muted">Loading reservations...</p>
        )}
        {!isReservationsPending && tableReservations.length === 0 && (
          <p className="py-10 text-center text-muted">No reservations found.</p>
        )}
        {!isReservationsPending && tableReservations.length > 0 && (
          <Table columns={['Time', 'Guest', 'Party', 'Table', 'Notes', 'Status', '']}>
            <Table.Header />
            <Table.Body
              data={tableReservations}
              render={(reservation) => (
                <Table.Row
                  key={reservation.id}
                  className={reservation.status === 'cancelled' ? 'opacity-50' : ''}
                >
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
                  <Table.Cell>{getTableLabel(reservation.tableId)}</Table.Cell>
                  <Table.Cell className="text-muted">
                    <p className="max-w-56 truncate">{reservation.note ?? '-'}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      tone={RESERVATION_STATUS_TONES[reservation.status]}
                      className="capitalize"
                    >
                      {reservation.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                      <div className="flex justify-end gap-1">
                        {reservation.status === 'confirmed' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="shrink-0"
                            onClick={() => handleSeatReservation(reservation.id)}
                          >
                            Seat
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="shrink-0"
                            onClick={() => handleConfirmReservation(reservation.id)}
                          >
                            Confirm
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="group shrink-0"
                          aria-label={`Edit reservation for ${reservation.guestName}`}
                          onClick={() => handleOpenModalEdit(reservation)}
                        >
                          <Pencil
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-muted transition-colors group-hover:text-ink"
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="group shrink-0"
                          aria-label={`Cancel reservation for ${reservation.guestName}`}
                          onClick={() => handleOpenModalCancel(reservation)}
                        >
                          <Ban
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-muted transition-colors group-hover:text-ink"
                          />
                        </Button>
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table>
        )}
      </Card>
      {modal.mode !== 'closed' && modal.mode !== 'cancel' && (
        <Modal
          onClose={() => setModal({ mode: 'closed' })}
          title={modal.mode === 'edit' ? 'Edit Reservation' : 'New Reservation'}
          description="Fields marked with * are required"
        >
          <NewReservationForm
            onClose={() => setModal({ mode: 'closed' })}
            chosenDate={chosenDate}
            onSave={updateReservationsList}
            isPending={
              modal.mode === 'edit' ? isUpdateReservationPending : isCreateReservationPending
            }

            reservationData={modal.mode === 'edit' ? modal.reservation : undefined}
          />
        </Modal>
      )}
      {modal.mode === 'cancel' && (
        <Modal onClose={() => setModal({ mode: 'closed' })} title={'Cancel reservation?'}>
          <ConfirmDialog
            message={`Cancel reservation for ${modal.reservation.guestName} at ${format(modal.reservation.startsAt, 'HH:mm')}? This can't be undone.`}
            confirmLabel="Cancel reservation"
            cancelLabel="Keep reservation"
            onConfirm={() => cancelReservation(modal.reservation)}
            onCancel={() => setModal({ mode: 'closed' })}
          ></ConfirmDialog>
        </Modal>
      )}
    </>
  );
}
