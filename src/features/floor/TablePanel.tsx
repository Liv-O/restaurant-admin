import type { Table } from '@/types';
import { Armchair, MousePointerClickIcon } from 'lucide-react';
import { TABLE_STATUS_STYLES } from './constants';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';
import { useState, type FormEvent } from 'react';
import { WAITERS } from './constants';
import type { SeatTableData } from './useSeatTable';
import type { SeatReservationData } from './useSeatReservation';

type TableActions = {
  onCloseTable: (id: string) => void;
  isClosingTable: boolean;
  onSeatWalkIn: (data: SeatTableData) => void;
  isSeating: boolean;
  onSeatReservation: (data: SeatReservationData) => void;
  isSeatingReservation: boolean;
};

type TablePanelProps = {
  table: Table | undefined;
  actions: TableActions;
};

function renderStatusContent(
  table: Table,
  {
    onCloseTable,
    isClosingTable,
    onSeatWalkIn,
    isSeating,
    onSeatReservation,
    isSeatingReservation,
  }: TableActions,
) {
  switch (table.status) {
    case 'free':
      return (
        <FreeTableInfo
          key={table.id}
          table={table}
          onSeatWalkIn={onSeatWalkIn}
          isSeating={isSeating}
        />
      );
    case 'busy':
      // case 'bill':
      return (
        <OccupiedTableInfo
          table={table}
          onCloseTable={onCloseTable}
          isClosingTable={isClosingTable}
        />
      );
    case 'reserved':
      return (
        <ReservedTableInfo
          table={table}
          key={table.id}
          onSeatReservation={onSeatReservation}
          isSeatingReservation={isSeatingReservation}
        />
      );
  }
}

export default function TablePanel({ table, actions }: TablePanelProps) {
  if (!table) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-bg text-muted">
          <MousePointerClickIcon className="size-6" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-ink">No table selected</p>
        <p className="max-w-60 text-sm text-muted">
          Select a table on the floor plan to see guests, reservation and order details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-semibold">Table {table.number}</h2>
        <span
          className={`rounded-full border px-3 py-1 text-[13px] font-bold ${TABLE_STATUS_STYLES[table.status].className}`}
        >
          {TABLE_STATUS_STYLES[table.status].label}
        </span>
      </div>

      {renderStatusContent(table, actions)}
    </div>
  );
}

type FreeTableInfoProps = {
  table: Table;
  onSeatWalkIn: (data: SeatTableData) => void;
  isSeating: boolean;
};

function FreeTableInfo({ table, onSeatWalkIn, isSeating }: FreeTableInfoProps) {
  const [guests, setGuests] = useState(Math.min(2, table.seats));
  const [waiter, setWaiter] = useState<string>(WAITERS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSeatWalkIn({ id: table.id, guests, waiter });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-tone-green text-tone-green-ink">
          <Armchair className="size-6" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-ink">This table is free</p>
        <p className="text-sm text-muted">Up to {table.seats} guests</p>
      </div>

      {/* Guests stepper */}
      <div className="flex flex-col gap-1.5">
        <span id="walkin-guests-label" className="text-[13px] font-bold">
          Guests
        </span>
        <div
          role="group"
          aria-labelledby="walkin-guests-label"
          className="flex h-11 items-center overflow-hidden rounded-[10px] border border-input"
        >
          <button
            type="button"
            aria-label="Fewer guests"
            className="size-11 shrink-0 bg-bg font-bold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setGuests((g) => g - 1)}
            disabled={guests <= 1}
          >
            −
          </button>
          <span aria-live="polite" className="flex-1 text-center font-medium">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
          <button
            type="button"
            aria-label="More guests"
            className="size-11 shrink-0 bg-bg font-bold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setGuests((g) => g + 1)}
            disabled={guests >= table.seats}
          >
            +
          </button>
        </div>
      </div>

      <WaiterSelect value={waiter} onChange={setWaiter} />

      <div className="mt-auto flex flex-col gap-2.5">
        <Button type="submit" size="lg" className="w-full" disabled={isSeating}>
          {isSeating ? 'Seating…' : 'Seat walk-in guests'}
        </Button>
      </div>
    </form>
  );
}

type ReservedTableInfoProps = {
  table: Extract<Table, { status: 'reserved' }>;
  onSeatReservation: (data: SeatReservationData) => void;
  isSeatingReservation: boolean;
};

function ReservedTableInfo({
  table,
  onSeatReservation,
  isSeatingReservation,
}: ReservedTableInfoProps) {
  const reservation = table.nextReservation;
  const [waiter, setWaiter] = useState<string>(WAITERS[0]);
  function handleSeat() {
    onSeatReservation({ reservationId: reservation.id, waiter });
  }
  return (
    <>
      <div className="flex flex-col gap-2 rounded-xl border border-tone-blue-ink/20 bg-tone-blue p-4">
        <span className="text-[13px] font-bold tracking-wider text-tone-blue-ink uppercase">
          Reservation at {format(reservation.startsAt, 'HH:mm')}
        </span>
        <span className="text-lg font-bold">{reservation.guestName}</span>
        <span className="text-sm text-muted">{reservation.guests} guests</span>
      </div>
      <WaiterSelect value={waiter} onChange={setWaiter} />
      <div className="mt-auto flex flex-col gap-2.5">
        <Button size="lg" className="w-full" disabled={isSeatingReservation} onClick={handleSeat}>
          Guests arrived · Seat them
        </Button>
      </div>
    </>
  );
}

function InfoTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[10px] bg-bg px-3 py-2.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-[15px] font-bold">{value}</span>
    </div>
  );
}

type WaiterSelectProps = {
  value: string;
  onChange: (waiter: string) => void;
};

function WaiterSelect({ value, onChange }: WaiterSelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px] font-bold">
      Waiter
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-[10px] border border-input bg-surface px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none"
      >
        {WAITERS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

type OccupiedTableInfoProps = {
  table: Extract<Table, { status: 'busy' }>;
  // table: Extract<Table, { status: 'busy' | 'bill' }>;
  onCloseTable: (id: string) => void;
  isClosingTable: boolean;
};

function OccupiedTableInfo({ table, onCloseTable, isClosingTable }: OccupiedTableInfoProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <InfoTile label="Guests" value={table.activeOrder.guests} />
        <InfoTile label="Seated" value={format(table.activeOrder.createdAt, 'HH:mm')} />
        <InfoTile label="Waiter" value={table.activeOrder.waiterName} />
      </div>

      {/* With 'bill' status the button was shown only for it:
      {table.status === 'bill' && (
        <div className="mt-auto flex flex-col gap-2.5">
          <Button
            size="lg"
            className="w-full"
            onClick={() => onCloseTable(table.id)}
            disabled={isClosingTable}
          >
            {isClosingTable ? 'Closing...' : 'Close table'}
          </Button>
        </div>
      )} */}
      <div className="mt-auto flex flex-col gap-2.5">
        <Button
          size="lg"
          className="w-full"
          onClick={() => onCloseTable(table.id)}
          disabled={isClosingTable}
        >
          {isClosingTable ? 'Closing...' : 'Close table'}
        </Button>
      </div>
    </>
  );
}
