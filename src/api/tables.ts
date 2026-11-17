import type { Table } from '@/types';
import { db } from './db';
import { delay } from './delay';

export async function getTables(): Promise<Table[]> {
  await delay(400);
  return structuredClone(db.tables);
}

export async function closeTable(id: string): Promise<Table> {
  await delay(400);
  const tableIndex = db.tables.findIndex((table) => table.id === id);
  if (tableIndex === -1) {
    throw new Error('Table not found');
  }
  if (db.tables[tableIndex].status === 'free') {
    throw new Error('Table is already free');
  }
  const newTableData: Table = {
    id: db.tables[tableIndex].id,
    number: db.tables[tableIndex].number,
    seats: db.tables[tableIndex].seats,
    status: 'free',
    zone: db.tables[tableIndex].zone,
  };
  db.tables[tableIndex] = newTableData;
  return structuredClone(newTableData);
}

export async function seatTable(
  id: string,
  { guests, waiter }: { guests: number; waiter: string },
): Promise<Table> {
  await delay(400);
  const tableIndex = db.tables.findIndex((table) => table.id === id);
  if (tableIndex === -1) {
    throw new Error('Table not found');
  }
  if (db.tables[tableIndex].status !== 'free') {
    throw new Error('Table is not free');
  }
  if (guests > db.tables[tableIndex].seats) {
    throw new Error('Number of guests exceeds table capacity');
  }
  const newTableData: Table = {
    id: db.tables[tableIndex].id,
    number: db.tables[tableIndex].number,
    seats: db.tables[tableIndex].seats,
    status: 'occupied',
    zone: db.tables[tableIndex].zone,
    guests,
    seatedAt: new Date().toISOString(),
    waiter,
  };
  db.tables[tableIndex] = newTableData;
  return structuredClone(newTableData);
}
