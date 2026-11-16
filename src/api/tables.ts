import type { Table } from '@/types';
import { db } from './db';
import { delay } from './delay';

export async function getTables(): Promise<Table[]> {
  await delay(400);
  return structuredClone(db.tables);
}
