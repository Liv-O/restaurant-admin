import type { Dish } from '@/types';
import { db } from './db';
import { delay } from './delay';

export async function getDishes(): Promise<Dish[]> {
  await delay(400);
  return structuredClone(db.dishes);
}

export async function updateDish(id: string, changes: Partial<Dish>): Promise<Dish> {
  await delay(400);
  const dish = db.dishes.find((d) => d.id === id);
  if (!dish) throw new Error('Dish not found');
  Object.assign(dish, changes); // змінюємо «базу»
  return structuredClone(dish);
}
