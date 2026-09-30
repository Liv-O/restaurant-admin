import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';

import { mockDishes } from '@/features/menu/mockDishes';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

import { TAG_TONES } from '@/features/menu/constants';

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
      <Card className="mt-6 overflow-hidden py-6">
        <Table columns={['Dish', 'Category', 'Price', 'Availability', '']}>
          <Table.Header />
          <Table.Body
            data={dishes}
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
                <Table.Cell>{dish.isAvailable ? 'Available' : 'Unavailable'}</Table.Cell>
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
