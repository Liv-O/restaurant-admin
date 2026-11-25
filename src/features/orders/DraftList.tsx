import { LoaderCircle, Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import useDishes from '../menu/useDishes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  changeQuantity,
  removeItem,
  selectDraft,
  selectDraftCount,
  setNote,
} from '@/store/orderDraftsSlice';

type DraftListProps = {
  tableId: string;
};

export default function DraftList({ tableId }: DraftListProps) {
  const { data: dishes } = useDishes();
  const items = useAppSelector((state) => selectDraft(state, tableId));
  const count = useAppSelector((state) => selectDraftCount(state, tableId));
  const dispatch = useAppDispatch();

  if (!dishes) {
    return <LoaderCircle className="animate-spin" />;
  }

  const subtotal = items.reduce((sum, item) => {
    const dish = dishes.find((d) => d.id === item.dishId);
    if (dish) sum += item.quantity * dish.price;
    return sum;
  }, 0);

  if (items.length === 0)
    return (
      <p className="rounded-xl border border-dashed border-input py-6 text-center text-sm text-muted">
        No items yet. Tap "Add items" to start an order.
      </p>
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[13px] font-bold">New order</h3>
        <span className="text-xs text-muted">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>

      <ul className="flex flex-col divide-y divide-input">
        {items.map((item) => {
          const dish = dishes.find((d) => d.id === item.dishId);
          if (!dish) return null;
          return (
            <li key={item.dishId} className="flex flex-col gap-2 py-3">
              <div className="flex items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-bold text-ink">{dish.name}</span>
                  <span className="text-xs text-muted">
                    {formatPrice(dish.price)} x {item.quantity}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-ink">
                  {formatPrice(dish.price * item.quantity)}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${dish.name}`}
                  onClick={() => {
                    dispatch(removeItem({ tableId, dishId: dish.id }));
                  }}
                  className="-mr-1 shrink-0 rounded-md p-1 text-muted hover:bg-bg hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 items-center overflow-hidden rounded-lg border border-input">
                  <button
                    type="button"
                    aria-label={`Fewer ${dish.name}`}
                    onClick={() => {
                      dispatch(changeQuantity({ tableId, dishId: dish.id, delta: -1 }));
                    }}
                    className="flex size-8 items-center justify-center bg-bg"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`More ${dish.name}`}
                    onClick={() => {
                      dispatch(changeQuantity({ tableId, dishId: dish.id, delta: 1 }));
                    }}
                    className="flex size-8 items-center justify-center bg-bg"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Note (e.g. no garlic)"
                  value={item.note}
                  onChange={(e) => {
                    dispatch(setNote({ tableId, dishId: dish.id, note: e.target.value }));
                  }}
                  className="h-8 min-w-0 flex-1 rounded-lg border border-input bg-surface px-2.5 text-sm placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-input pt-3">
        <span className="text-sm font-bold">Subtotal</span>
        <span className="text-base font-bold text-ink">{formatPrice(subtotal)}</span>
      </div>
    </div>
  );
}
