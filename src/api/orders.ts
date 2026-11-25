import type { CreateOrderBody, Order } from '@/types';
import { api } from './client';

export async function createOrder(body: CreateOrderBody) {
  const response = await api.post<Order>('/orders', body);
  return response.data;
}
