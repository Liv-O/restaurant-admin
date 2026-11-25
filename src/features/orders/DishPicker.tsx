import FilterChip from '@/components/ui/FilterChip';
import { formatPrice } from '@/lib/formatPrice';
import useDishes from '../menu/useDishes';
import useCategories from '../menu/useCategories';
import type { Category } from '@/types';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, selectDraft } from '@/store/orderDraftsSlice';
import { LoaderCircle } from 'lucide-react';
type DishPickerProps = {
  tableId: string;
};

export default function DishPicker({ tableId }: DishPickerProps) {
  const { data: dishes } = useDishes();
  const { data: categories } = useCategories();
  const [category, setCategory] = useState<'All' | Category['id']>('All');
  const items = useAppSelector((state) => selectDraft(state, tableId));
  const dispatch = useAppDispatch();

  if (!dishes) {
    return <LoaderCircle className="animate-spin" />;
  }
  const availableDishes = dishes.filter(
    (d) => d.isAvailable && (category === 'All' || d.category.id === category),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterChip isActive={category === 'All'} onClick={() => setCategory('All')}>
          All
        </FilterChip>
        {categories?.map((c) => {
          return (
            <FilterChip key={c.id} isActive={category === c.id} onClick={() => setCategory(c.id)}>
              {c.name}
            </FilterChip>
          );
        })}
      </div>

      {availableDishes.length > 0 ? (
        <ul className="-mx-2 flex max-h-[60vh] flex-col overflow-y-auto">
          {availableDishes.map((dish) => {
            const quantity = items.find((i) => i.dishId === dish.id)?.quantity;
            return (
              <li key={dish.id}>
                <button
                  type="button"
                  onClick={() => dispatch(addItem({ tableId, dishId: dish.id }))}
                  className="flex w-full items-center gap-4 rounded-xl px-2 py-3 text-left transition-colors hover:bg-bg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-bold text-ink">{dish.name}</span>
                    <span className="truncate text-sm text-muted">{dish.description}</span>
                  </div>

                  {quantity !== undefined && quantity > 0 && (
                    <span className="shrink-0 rounded-full bg-tone-green px-2 py-0.5 text-xs font-bold text-tone-green-ink">
                      x{quantity}
                    </span>
                  )}

                  <span className="w-16 shrink-0 text-right font-semibold text-ink">
                    {formatPrice(dish.price)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="py-8 text-center text-sm text-muted">No available dishes in this category.</p>
      )}
    </div>
  );
}
