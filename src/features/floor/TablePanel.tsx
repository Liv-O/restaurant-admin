import type { CreateOrderBody, Table } from '@/types';
import { Armchair, LoaderCircle, MousePointerClickIcon, Plus } from 'lucide-react';
import { TABLE_STATUS_STYLES } from './constants';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';
import { useState } from 'react';

import Modal from '@/components/Modal';
import DishPicker from '../orders/DishPicker';
import DraftList from '../orders/DraftList';
import useCreateOrder from '../orders/useCreateOrder';
import { useAppSelector } from '@/store/hooks';
import { selectDraft } from '@/store/orderDraftsSlice';
import useOrder from '../orders/useOrder';
import { draftToOrderItems } from '../orders/utils';
import { ORDER_NEXT_ACTION, ORDER_STATUS_STYLES } from '../orders/constants';
import { formatPrice } from '@/lib/formatPrice';
import useUpdateOrderStatus from '../kitchen/useUpdateOrderStatus';
import useAddOrderItems from '../orders/useAddOrderItems';
import NewOrderForm from '../orders/NewOrderForm';
import useReservations from '../reservations/useReservations';
import useUpdateReservation from '../reservations/useUpdateReservation';

type TablePanelProps = {
  table: Table | undefined;
};

function renderStatusContent(table: Table) {
  switch (table.status) {
    case 'free':
      return <FreeTableInfo key={table.id} table={table} />;
    case 'busy':
      // case 'bill':
      return <OccupiedTableInfo table={table} />;
    case 'reserved':
      return <ReservedTableInfo table={table} key={table.id} />;
  }
}

export default function TablePanel({ table }: TablePanelProps) {
  if (!table) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-bg text-muted">
          <MousePointerClickIcon className="size-6" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-ink">No table selected</p>
        <p className="max-w-60 text-sm text-muted">
          Select a table on the floor plan to see guests, reservation and order details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-semibold">Table {table.number}</h2>
        <span
          className={`rounded-full border px-3 py-1 text-[13px] font-bold ${TABLE_STATUS_STYLES[table.status].className}`}
        >
          {TABLE_STATUS_STYLES[table.status].label}
        </span>
      </div>

      {renderStatusContent(table)}
    </div>
  );
}

type FreeTableInfoProps = {
  table: Table;
};

function FreeTableInfo({ table }: FreeTableInfoProps) {
  const { mutate: sendOrder, isPending: orderIsSending } = useCreateOrder();

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-tone-green text-tone-green-ink">
          <Armchair className="size-6" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-ink">This table is free</p>
        <p className="text-sm text-muted">Up to {table.seats} guests</p>
      </div>

      <NewOrderForm
        table={table}
        defaultGuests={2}
        submitLabel="Send to kitchen"
        isSubmitting={orderIsSending}
        onSubmit={sendOrder}
      />
    </div>
  );
}

// type ReservedTableInfoProps = {
//   table: Extract<Table, { status: 'reserved' }>;
//   onSeatReservation: (data: SeatReservationData) => void;
//   isSeatingReservation: boolean;
// };

type ReservedTableInfoProps = {
  table: Extract<Table, { status: 'reserved' }>;
};

function ReservedTableInfo({ table }: ReservedTableInfoProps) {
  const reservation = table.nextReservation;
  const { data: reservations = [] } = useReservations();
  const createOrder = useCreateOrder();
  const updateReservation = useUpdateReservation();

  const fullReservation = reservations.find((reserv) => reserv.id === reservation.id);

  async function handleSeat(body: CreateOrderBody) {
    try {
      await createOrder.mutateAsync(body);
      if (fullReservation?.status === 'pending')
        await updateReservation.mutateAsync({
          id: reservation.id,
          reservationData: { status: 'confirmed' },
        });
      await updateReservation.mutateAsync({
        id: reservation.id,
        reservationData: { status: 'seated' },
      });
    } catch {
      //   помилку вже показав toast у хуці
    }
  }
  return (
    <>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2 rounded-xl border border-tone-blue-ink/20 bg-tone-blue p-4">
          <span className="text-[13px] font-bold tracking-wider text-tone-blue-ink uppercase">
            Reservation at {format(reservation.startsAt, 'HH:mm')}
          </span>
          <span className="text-lg font-bold">{reservation.guestName}</span>
          <span className="text-sm text-muted">{reservation.guests} guests</span>
        </div>

        <NewOrderForm
          table={table}
          defaultGuests={reservation.guests}
          submitLabel="Seat & send to kitchen"
          isSubmitting={createOrder.isPending || updateReservation.isPending}
          onSubmit={handleSeat}
        />
      </div>
    </>
  );
}

function InfoTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[10px] bg-bg px-3 py-2.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-[15px] font-bold">{value}</span>
    </div>
  );
}

// type WaiterSelectProps = {
//   value: string;
//   onChange: (waiter: string) => void;
// };

// function WaiterSelect({ value, onChange }: WaiterSelectProps) {
//   return (
//     <label className="flex flex-col gap-1.5 text-[13px] font-bold">
//       Waiter
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="h-11 rounded-[10px] border border-input bg-surface px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none"
//       >
//         {WAITERS.map((name) => (
//           <option key={name} value={name}>
//             {name}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

type OccupiedTableInfoProps = {
  table: Extract<Table, { status: 'busy' }>;
  // table: Extract<Table, { status: 'busy' | 'bill' }>;
};

function OccupiedTableInfo({ table }: OccupiedTableInfoProps) {
  const { data: order, isLoading: orderLoading } = useOrder(table.activeOrder.id);
  const { mutate: updateOrderStatus, isPending: isUpdatingOrderStatus } = useUpdateOrderStatus();
  const draft = useAppSelector((state) => selectDraft(state, table.id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: addItems, isPending: isAddingItems } = useAddOrderItems();
  const nextAction = order ? ORDER_NEXT_ACTION[order.status] : undefined;
  const isNew = order?.status === 'new';
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <InfoTile label="Guests" value={table.activeOrder.guests} />
        <InfoTile label="Seated" value={format(table.activeOrder.createdAt, 'HH:mm')} />
        <InfoTile label="Waiter" value={table.activeOrder.waiterName} />
      </div>

      {orderLoading || !order ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <section className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-bold text-ink">Order #{order.number}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${ORDER_STATUS_STYLES[order.status].className}`}
              >
                {ORDER_STATUS_STYLES[order.status].label}
              </span>
            </div>

            <ul className="flex flex-col divide-y divide-input">
              {order.items.map((item) => (
                <li className="flex items-start gap-3 py-3 text-sm" key={item.id}>
                  <span className="w-6 shrink-0 font-bold text-primary">{item.quantity}x</span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium text-ink">{item.dishName}</span>
                    {item.note && <span className="text-xs text-tone-amber-ink">{item.note}</span>}
                  </div>
                  <span className="shrink-0 font-medium text-ink">
                    {formatPrice(item.priceAtOrder * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-input pt-3">
              <span className="text-base font-bold">Subtotal</span>
              <span className="text-lg font-bold text-ink">{formatPrice(order.subtotal)}</span>
            </div>
          </section>

          {isNew && draft.length > 0 && (
            <section className="rounded-xl bg-bg p-3">
              <DraftList tableId={table.id} title="To add" />
            </section>
          )}

          <div className="mt-auto flex flex-col gap-2.5">
            {isNew && (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(true);
                  }}
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Add items
                </Button>

                {draft.length > 0 && (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      addItems({
                        orderId: order.id,
                        tableId: table.id,
                        items: draftToOrderItems(draft),
                      });
                    }}
                    disabled={isAddingItems}
                  >
                    {isAddingItems ? 'Adding…' : 'Add to order'}
                  </Button>
                )}
              </>
            )}

            {nextAction && (
              <Button
                size="lg"
                className="w-full"
                onClick={() =>
                  updateOrderStatus({
                    id: order.id,
                    status: nextAction.nextStatus,
                  })
                }
                disabled={isUpdatingOrderStatus}
              >
                {isUpdatingOrderStatus ? 'Updating...' : nextAction.label}
              </Button>
            )}

            {!isNew && !nextAction && (
              <p className="text-center text-sm text-muted">Waiting for the kitchen…</p>
            )}
          </div>

          {isMenuOpen && (
            <Modal
              title={`Add items · Table ${table.number}`}
              onClose={() => {
                setIsMenuOpen(false);
              }}
            >
              <DishPicker tableId={table.id} />
            </Modal>
          )}
        </>
      )}

      {/* With 'bill' status the button was shown only for it:
      {table.status === 'bill' && (
        <div className="mt-auto flex flex-col gap-2.5">
          <Button
            size="lg"
            className="w-full"
            onClick={() => onCloseTable(table.id)}
            disabled={isClosingTable}
          >
            {isClosingTable ? 'Closing...' : 'Close table'}
          </Button>
        </div>
      )} */}
    </>
  );
}
