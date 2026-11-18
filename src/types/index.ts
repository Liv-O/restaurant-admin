import type { TAGS } from '../features/menu/constants';
import type { RESERVATION_STATUSES } from '../features/reservations/constants';
import type { TABLE_STATUSES, ZONES } from '../features/floor/constants';
import type { ROLES } from '@/features/auth/constants';

// Every list endpoint wraps its items the same way: { data: [...], meta: { total } }.
export type ListResponse<T> = {
  data: T[];
  meta: { total: number };
};

export type Category = {
  id: string;
  name: string;
  sortOrder: number;
};

export type Tag = (typeof TAGS)[number];
export type Zone = (typeof ZONES)[number];

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number; // in cents: 1450 = $14.50
  category: Pick<Category, 'id' | 'name'>;
  tags: Tag[];
  isAvailable: boolean;
  imageUrl: string | null;
};

export type TableStatus = (typeof TABLE_STATUSES)[number];

export type TableBase = {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  zone: Zone;
};

export type Table = TableBase &
  (
    | { status: 'free' }
    | { status: 'reserved' }
    | { status: 'occupied' | 'bill'; guests: number; seatedAt: string; waiter: string }
  );

export type OrderStatus = 'new' | 'cooking' | 'ready' | 'served' | 'paid';

export type OrderItem = {
  dishId: string;
  quantity: number;
  note?: string;
};

export type Order = {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
};

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export type Reservation = {
  id: string;
  tableId?: string;
  guestName: string;
  phone: string;
  guests: number;
  startsAt: string;
  status: ReservationStatus;
  note?: string;
};

export type Role = (typeof ROLES)[number];

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
