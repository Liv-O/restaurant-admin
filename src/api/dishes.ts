import type { Category, Dish, ListResponse, Tag } from '@/types';
import { api } from './client';

// TODO: remove when backend fixes tags.
// Postgres returns an enum array (dish_tag[]) as the string "{vegan,spicy}".
function parseTags(tags: Tag[] | string): Tag[] {
  if (typeof tags !== 'string') return tags;

  const inner = tags.slice(1, -1); // "{vegan,spicy}" -> "vegan,spicy"
  if (inner === '') return []; // "{}" -> []

  return inner.split(',') as Tag[];
}

export async function getDishes(): Promise<Dish[]> {
  const response = await api.get<ListResponse<Dish>>('/dishes');
  return response.data.data.map((dish) => ({ ...dish, tags: parseTags(dish.tags) }));
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<ListResponse<Category>>('/categories');
  return response.data.data;
}

export async function updateDishAvailability(id: string, isAvailable: boolean) {
  const response = await api.patch<Pick<Dish, 'id' | 'name' | 'isAvailable'>>(
    `/dishes/${id}/availability`,
    {
      isAvailable,
    },
  );
  return response.data;
}
