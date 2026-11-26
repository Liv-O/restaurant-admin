import type { CreateOrderBody, ListResponse, Order, OrderStatus } from '@/types';
import { api } from './client';

export async function createOrder(body: CreateOrderBody): Promise<Order> {
  const response = await api.post<Order>('/orders', body);
  return response.data;
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<ListResponse<Order>>('/orders');
  return response.data.data;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const response = await api.patch<Order>(`/orders/${id}/status`, { status });
  return response.data;
}
