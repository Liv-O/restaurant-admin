export type Dish = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
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

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export type Reservation = {
  id: string;
  tableId: string;
  guestName: string;
  phone: string;
  guests: number;
  dateTime: string;
  status: ReservationStatus;
};
