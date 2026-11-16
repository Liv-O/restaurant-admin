import type { Reservation, Table } from '@/types';
import { Armchair, MousePointerClickIcon } from 'lucide-react';
import { TABLE_STATUS_STYLES } from './constants';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';

type TablePanelProps = { table: Table | undefined; reservation: Reservation | undefined };

function renderStatusContent(table: Table, reservation: Reservation | undefined) {
  switch (table.status) {
    case 'free':
      return <FreeTableInfo table={table} />;
    case 'occupied':
    case 'bill':
      return <OccupiedTableInfo table={table} />;
    case 'reserved':
      return <ReservedTableInfo reservation={reservation} />;
  }
}

export default function TablePanel({ table, reservation }: TablePanelProps) {
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

      {renderStatusContent(table, reservation)}
    </div>
  );
}

function FreeTableInfo({ table }: { table: Table }) {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-tone-green text-tone-green-ink">
          <Armchair className="size-6" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-ink">This table is free</p>
        <p className="text-sm text-muted">Up to {table.seats} guests</p>
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        <Button size="lg" className="w-full">
          Seat walk-in guests
        </Button>
      </div>
    </>
  );
}

function ReservedTableInfo({ reservation }: { reservation: Reservation | undefined }) {
  return (
    <>
      {reservation ? (
        <div className="flex flex-col gap-2 rounded-xl border border-tone-blue-ink/20 bg-tone-blue p-4">
          <span className="text-[13px] font-bold tracking-wider text-tone-blue-ink uppercase">
            Reservation at {format(reservation.startsAt, 'HH:mm')}
          </span>
          <span className="text-lg font-bold">{reservation.guestName}</span>
          <span className="text-sm text-muted">
            {reservation.guests} guests
            {reservation.note && ` · ${reservation.note}`}
          </span>
        </div>
      ) : (
        <p className="text-sm text-muted">No reservation details</p>
      )}

      <div className="mt-auto flex flex-col gap-2.5">
        <Button size="lg" className="w-full">
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

type OccupiedTableInfoProps = {
  table: Extract<Table, { status: 'occupied' | 'bill' }>;
};

function OccupiedTableInfo({ table }: OccupiedTableInfoProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <InfoTile label="Guests" value={table.guests} />
        <InfoTile label="Seated" value={format(table.seatedAt, 'HH:mm')} />
        <InfoTile label="Waiter" value={table.waiter} />
      </div>

      {table.status === 'bill' && (
        <div className="mt-auto flex flex-col gap-2.5">
          <Button size="lg" className="w-full">
            Close table
          </Button>
        </div>
      )}
    </>
  );
}
