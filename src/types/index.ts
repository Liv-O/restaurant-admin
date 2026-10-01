import type { CATEGORIES, TAGS } from '../features/menu/constants';
import type { RESERVATION_STATUSES } from '../features/reservations/constants';

export type Category = (typeof CATEGORIES)[number];
export type Tag = (typeof TAGS)[number];

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags: Tag[];
  isAvailable: boolean;
};

export type TableStatus = 'free' | 'busy' | 'reserved' | 'bill';

export type Table = {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
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
