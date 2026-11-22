import type { ListResponse, Table } from '@/types';
import { api } from './client';
import { ZONES } from '@/features/floor/constants';

export async function getTables(): Promise<Table[]> {
  const response = await api.get<ListResponse<Table>>('/tables');
  const neededZoneTables = response.data.data.filter((t) => ZONES.includes(t.zone));
  return neededZoneTables;
}

export async function closeTable(_id: string): Promise<Table> {
  // await delay(400);
  // const tableIndex = db.tables.findIndex((table) => table.id === id);
  // if (tableIndex === -1) {
  //   throw new Error('Table not found');
  // }
  // if (db.tables[tableIndex].status === 'free') {
  //   throw new Error('Table is already free');
  // }
  // const newTableData: Table = {
  //   id: db.tables[tableIndex].id,
  //   number: db.tables[tableIndex].number,
  //   seats: db.tables[tableIndex].seats,
  //   status: 'free',
  //   zone: db.tables[tableIndex].zone,
  // };
  // db.tables[tableIndex] = newTableData;
  // return structuredClone(newTableData);
  throw new Error('Not implemented yet');
}

export async function seatTable(
  _id: string,
  _data: { guests: number; waiter: string },
): Promise<Table> {
  // await delay(400);
  // const tableIndex = db.tables.findIndex((table) => table.id === id);
  // if (tableIndex === -1) {
  //   throw new Error('Table not found');
  // }
  // if (db.tables[tableIndex].status !== 'free') {
  //   throw new Error('Table is not free');
  // }
  // if (guests > db.tables[tableIndex].seats) {
  //   throw new Error('Number of guests exceeds table capacity');
  // }
  // const newTableData: Table = {
  //   id: db.tables[tableIndex].id,
  //   number: db.tables[tableIndex].number,
  //   seats: db.tables[tableIndex].seats,
  //   status: 'busy',
  //   zone: db.tables[tableIndex].zone,
  //   guests,
  //   seatedAt: new Date().toISOString(),
  //   waiter,
  // };
  // db.tables[tableIndex] = newTableData;
  // return structuredClone(newTableData);
  throw new Error('Not implemented yet');
}
