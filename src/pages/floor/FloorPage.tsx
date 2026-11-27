import PageHeader from '@/components/PageHeader';
import { format } from 'date-fns';

import {
  ZONES,
  ZONES_LABELS,
  TABLE_STATUS_STYLES,
  TABLE_STATUSES,
  ZONE_LANDMARKS,
  LANDMARK_KIND_STYLES,
} from '@/features/floor/constants';
import { useState } from 'react';
import type { Zone, TableStatus, Table } from '@/types';
import Card from '@/components/ui/Card';
import TableCard from '@/features/floor/TableCard';
import { useNow } from '@/hooks/useNow';
import { getTableDetails } from '@/features/floor/utils';
import TablePanel from '@/features/floor/TablePanel';
import useTables from '@/features/floor/useTables';
import useSeatReservation from '@/features/floor/useSeatReservation';

export default function FloorPage() {
  const [selectedZone, setSelectedZone] = useState<Zone>('main');
  const [selectedTableId, setSelectedTableId] = useState<string | undefined>(undefined);

  const { data: tables = [], isPending, error } = useTables();

  const zoneTables: Table[] = tables.filter((table) => table.zone === selectedZone);
  const selectedTable = zoneTables.find((table) => table.id === selectedTableId);

  const { mutate: seatReservation, isPending: isSeatingReservation } = useSeatReservation();

  const now = useNow(60_000);

  const tableCount = zoneTables.reduce<Record<TableStatus, number>>(
    (acc, table) => {
      acc[table.status] += 1;
      return acc;
    },
    {
      free: 0,
      reserved: 0,
      busy: 0,
      // bill: 0,
    },
  );

  const today = format(now, 'EEEE, dd MMMM');

  return (
    <div className="-m-8 flex min-h-screen">
      <div className="min-w-0 flex-1 p-8">
        <PageHeader
          title="Floor Plan"
          subtitle={today}
          action={
            <div className="flex gap-1 rounded-xl bg-tone-gray p-1" role="group" aria-label="Zone">
              {ZONES.map((zone) => {
                return (
                  <button
                    key={zone}
                    className="h-10 rounded-[9px] px-4.5 text-sm font-semibold whitespace-nowrap text-muted transition-colors hover:text-ink aria-pressed:bg-surface aria-pressed:font-bold aria-pressed:text-ink aria-pressed:shadow-sm"
                    aria-pressed={zone === selectedZone}
                    onClick={() => setSelectedZone(zone)}
                  >
                    {ZONES_LABELS[zone]}
                  </button>
                );
              })}
            </div>
          }
        ></PageHeader>

        <ul className="mt-4 flex flex-wrap gap-5 text-sm text-ink">
          {TABLE_STATUSES.map((status) => {
            return (
              <li className="flex items-center gap-2" key={status}>
                <span
                  aria-hidden="true"
                  className={`${TABLE_STATUS_STYLES[status].className} size-3.5 rounded border-2`}
                />
                <span>{TABLE_STATUS_STYLES[status].label}</span>
                <span className="font-bold tabular-nums">{tableCount[status]}</span>
              </li>
            );
          })}
        </ul>

        <Card className="mt-10 p-6">
          <div className="mb-5 flex gap-4">
            {ZONE_LANDMARKS[selectedZone].map((landmark) => {
              return (
                <div
                  key={landmark.label}
                  className={`${landmark.width} ${LANDMARK_KIND_STYLES[landmark.kind]} flex h-11 items-center justify-center rounded-[10px] text-[13px] font-bold tracking-widest text-muted uppercase`}
                >
                  {landmark.label}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {isPending ? (
              <p className="py-10 text-center text-muted">Loading tables…</p>
            ) : error ? (
              <p className="py-10 text-center text-danger">Could not load tables.</p>
            ) : (
              zoneTables.map((table) => {
                return (
                  <TableCard
                    key={table.id}
                    className={`${TABLE_STATUS_STYLES[table.status].className}`}
                    tableInfo={table}
                    tableStatus={TABLE_STATUS_STYLES[table.status].label}
                    details={getTableDetails(table, now)}
                    onClick={() => setSelectedTableId(table.id)}
                    aria-pressed={table.id === selectedTableId}
                  ></TableCard>
                );
              })
            )}
          </div>
        </Card>
      </div>
      <aside className="sticky top-0 h-screen w-80 shrink-0 overflow-y-auto border-l border-line bg-surface p-7">
        <TablePanel
          table={selectedTable}
          actions={{
            onSeatReservation: seatReservation,
            isSeatingReservation,
          }}
        />
      </aside>
    </div>
  );
}
