import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';

import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

import { TAG_LABELS, TAG_TONES } from '@/features/menu/constants';
import { formatPrice } from '@/lib/formatPrice';
import FilterChip from '@/components/ui/FilterChip';
import Switch from '@/components/ui/Switch';
import useDishes from '@/features/menu/useDishes';
import useUpdateDishAvailability from '@/features/menu/useUpdateDishAvailability';
import useCategories from '@/features/menu/useCategories';
import type { Category } from '@/types';
import useMe from '@/features/auth/useMe';
// TEMP: Redux draft check
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, selectDraft, selectDraftCount } from '@/store/orderDraftsSlice';

type CategoryFilter = 'All' | Category['id'];

export default function MenuPage() {
  const { data: dishes = [], isPending: isDishesPending, error } = useDishes();
  const { mutate: updateDishAvailability } = useUpdateDishAvailability();
  const { data: categories = [] } = useCategories();
  const { data: me } = useMe();

  // TEMP: Redux draft check for table 'test'
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => selectDraft(state, 'test'));
  const draftCount = useAppSelector((state) => selectDraftCount(state, 'test'));

  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('All');

  const visibleDishes =
    selectedFilter === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category.id === selectedFilter);

  const unavailableDishesCount = dishes.filter((dish) => !dish.isAvailable).length;
  const totalDishesCount = dishes.length;

  function toggleAvailability(id: string, isAvailable: boolean) {
    updateDishAvailability({ id, isAvailable });
  }

  return (
    <>
      <PageHeader
        title="Menu"
        subtitle={`${totalDishesCount} dishes · ${unavailableDishesCount} unavailable today`}
        action={
          <Button disabled={me?.role !== 'admin'}>
            <Plus size={18} /> Add dish
          </Button>
        }
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip isActive={selectedFilter === 'All'} onClick={() => setSelectedFilter('All')}>
          All
        </FilterChip>

        {categories.map((category) => (
          <FilterChip
            key={category.id}
            isActive={selectedFilter === category.id}
            onClick={() => setSelectedFilter(category.id)}
          >
            {category.name}
          </FilterChip>
        ))}
      </div>
      {/* TEMP: Redux draft check */}
      <p className="mt-6 text-sm font-semibold text-muted">
        Draft: {draftCount} items ({draft.length} dishes)
      </p>
      <Card className="mt-2 overflow-hidden py-6">
        {isDishesPending && <p className="py-10 text-center text-muted">Loading dishes...</p>}
        {error && <p className="py-10 text-center text-muted">Error loading dishes</p>}
        {!isDishesPending && !error && visibleDishes.length === 0 && (
          <p className="py-10 text-center text-muted">No dishes found.</p>
        )}
        {!isDishesPending && !error && visibleDishes.length > 0 && (
          <Table columns={['Dish', 'Category', 'Price', 'Availability', '']}>
            <Table.Header />
            <Table.Body
              data={visibleDishes}
              render={(dish) => (
                <Table.Row className={`${dish.isAvailable ? '' : 'opacity-60'}`} key={dish.id}>
                  <Table.Cell>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-bold">{dish.name}</p>
                      <p>{dish.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {dish.tags.map((tag) => (
                          <Badge tone={TAG_TONES[tag]} key={tag}>
                            {TAG_LABELS[tag]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{dish.category.name}</Table.Cell>
                  <Table.Cell>{formatPrice(dish.price)}</Table.Cell>
                  <Table.Cell>
                    <Switch
                      className="mr-2"
                      checked={dish.isAvailable}
                      disabled={me?.role !== 'admin' && me?.role !== 'kitchen'}
                      onChange={(e) => toggleAvailability(dish.id, e.target.checked)}
                      aria-label={dish.name}
                    />
                    {/* {dish.isAvailable ? 'Available' : 'Unavailable'} */}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      {/* TEMP: Redux draft check */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch(addItem({ tableId: 'test', dishId: dish.id }))}
                      >
                        + Draft
                      </Button>
                      <Button
                        disabled={me?.role !== 'admin'}
                        variant="outline"
                        size="icon"
                        aria-label={`Edit ${dish.name}`}
                      >
                        <Pencil />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table>
        )}
      </Card>
    </>
  );
}
