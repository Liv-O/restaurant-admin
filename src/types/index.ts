import type { CATEGORIES, TAGS } from '../features/menu/constants';
import type { RESERVATION_STATUSES } from '../features/reservations/constants';
import type { TABLE_STATUSES, ZONES } from '../features/floor/constants';

export type Category = (typeof CATEGORIES)[number];
export type Tag = (typeof TAGS)[number];
export type Zone = (typeof ZONES)[number];

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags: Tag[];
  isAvailable: boolean;
};

export type TableStatus = (typeof TABLE_STATUSES)[number];

export type Table = {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  zone: Zone;
};

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
