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

export async function getOrder(id: string): Promise<Order> {
  const response = await api.get<Order>(`/orders/${id}`);
  return response.data;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const response = await api.patch<Order>(`/orders/${id}/status`, { status });
  return response.data;
}

export async function addOrderItems(orderId: string, items: CreateOrderBody['items']) {
  const response = await api.post<Order>(`/orders/${orderId}/items`, { items });
  return response.data;
}
