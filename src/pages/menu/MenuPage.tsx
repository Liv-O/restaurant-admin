import { Plus } from 'lucide-react';
import { useState } from 'react';

import { mockDishes } from '@/features/menu/mockDishes';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';

export default function MenuPage() {
  const [dishes, setDishes] = useState(mockDishes);
  const unavailableDishesCount = dishes.filter((dish) => !dish.isAvailable).length;
  const totalDishesCount = dishes.length;

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
    </>
  );
}
