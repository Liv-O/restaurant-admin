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
import { mockTables } from '@/features/floor/mockTables';
import { useState } from 'react';
import type { Zone, TableStatus, Table } from '@/types';
import Card from '@/components/ui/Card';
import TableCard from '@/features/floor/TableCard';
import { useNow } from '@/hooks/useNow';
import { getTableDetails } from './utils';
import { mockReservations } from '@/features/reservations/mockReservations';

export default function FloorPage() {
  const [selectedZone, setSelectedZone] = useState<Zone>('main');
  const zoneTables: Table[] = mockTables.filter((table) => table.zone === selectedZone);

  const now = useNow(60_000);

  const tableCount = zoneTables.reduce<Record<TableStatus, number>>(
    (acc, table) => {
      acc[table.status] += 1;
      return acc;
    },
    {
      free: 0,
      occupied: 0,
      reserved: 0,
      bill: 0,
    },
  );

  const today = format(now, 'EEEE, dd MMMM');

  return (
    <>
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
          {zoneTables.map((table) => {
            return (
              <TableCard
                key={table.id}
                className={TABLE_STATUS_STYLES[table.status].className}
                tableInfo={table}
                tableStatus={TABLE_STATUS_STYLES[table.status].label}
                details={getTableDetails(table, mockReservations, now)}
              ></TableCard>
            );
          })}
        </div>
      </Card>
    </>
  );
}
