import type { CreateOrderBody } from '@/types';
import type { DraftItem } from '@/store/orderDraftsSlice';

// Turns a Redux draft into the items array the backend expects.
// note is sent only when it's not empty: the schema is strict and doesn't accept ''.
export function draftToOrderItems(draft: DraftItem[]): CreateOrderBody['items'] {
  return draft.map((item) => ({
    dishId: item.dishId,
    quantity: item.quantity,
    ...(item.note && { note: item.note }),
  }));
}
