import type { User } from '@/types';
import { api } from './client';

export async function login(credentials: { email: string; password: string }): Promise<User> {
  const response = await api.post<User>('/auth/login', credentials);
  return response.data;
}

export async function logout(): Promise<void> {
  const response = await api.post<void>('/auth/logout');
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/auth/me');
  return response.data;
}
