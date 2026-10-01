import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';

import { mockDishes } from '@/features/menu/mockDishes';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

import { CATEGORIES, TAG_TONES } from '@/features/menu/constants';
import type { Category } from '@/types';
import FilterChip from '@/components/ui/FilterChip';
import Switch from '@/components/ui/Switch';

type CategoryFilter = Category | 'All';

export default function MenuPage() {
  const [dishes, setDishes] = useState(mockDishes);
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('All');

  const visibleDishes =
    selectedFilter === 'All' ? dishes : dishes.filter((dish) => dish.category === selectedFilter);

  const unavailableDishesCount = dishes.filter((dish) => !dish.isAvailable).length;
  const totalDishesCount = dishes.length;
  const filterOptions: CategoryFilter[] = ['All', ...CATEGORIES];

  function toggleAvailability(id: string, isAvailable: boolean) {
    setDishes((prevDishes) =>
      prevDishes.map((dish) => (dish.id === id ? { ...dish, isAvailable } : dish)),
    );
  }

  return (
    <>
      <PageHeader
        title="Menu"
        subtitle={`${totalDishesCount} dishes · ${unavailableDishesCount} unavailable today`}
        action={
          <Button>
            <Plus size={18} /> Add dish
          </Button>
        }
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {filterOptions.map((opt) => {
          return (
            <FilterChip
              key={opt}
              isActive={opt === selectedFilter}
              onClick={() => setSelectedFilter(opt)}
            >
              {opt}
            </FilterChip>
          );
        })}
      </div>
      <Card className="mt-6 overflow-hidden py-6">
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
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{dish.category}</Table.Cell>
                <Table.Cell>${dish.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <Switch
                    className="mr-2"
                    checked={dish.isAvailable}
                    onChange={(e) => toggleAvailability(dish.id, e.target.checked)}
                    aria-label={dish.name}
                  />
                  {/* {dish.isAvailable ? 'Available' : 'Unavailable'} */}
                </Table.Cell>
                <Table.Cell>
                  <Button variant="outline" size="icon" aria-label={`Edit ${dish.name}`}>
                    <Pencil />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
          />
        </Table>
      </Card>
    </>
  );
}
