import PageHeader from '@/components/PageHeader';
import OrderCard from '@/features/kitchen/OrderCard';
import useOrders from '@/features/kitchen/useOrders';
import useUpdateOrderStatus from '@/features/kitchen/useUpdateOrderStatus';
import { useNow } from '@/hooks/useNow';
import type { Order, OrderStatus } from '@/types';
import { compareAsc } from 'date-fns';

const COLUMN_TONES = {
  new: { dot: 'bg-status-new', bar: 'border-t-status-new' },
  cooking: { dot: 'bg-status-cooking', bar: 'border-t-status-cooking' },
  ready: { dot: 'bg-status-ready', bar: 'border-t-status-ready' },
} as const;

type ColumnTone = keyof typeof COLUMN_TONES; // 'new' | 'cooking' | 'ready'

export default function KitchenPage() {
  const { data: orders = [] } = useOrders();
  const { mutate: updateStatus, isPending, variables } = useUpdateOrderStatus();
  const updatingOrderId = isPending ? variables?.id : undefined;
  const now = useNow(60_000);

  const sortedOrders = orders.toSorted((a, b) => compareAsc(a.createdAt, b.createdAt));
  const newOrders = sortedOrders.filter((o) => o.status === 'new');
  const cookingOrders = sortedOrders.filter((o) => o.status === 'cooking');
  const readyOrders = sortedOrders.filter((o) => o.status === 'ready');
  const activeOrdersCount = newOrders.length + readyOrders.length + cookingOrders.length;

  return (
    <>
      <PageHeader title="Kitchen display" subtitle={`${activeOrdersCount} active orders`} />
      <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <KitchenColumn
          title="New"
          orders={newOrders}
          now={now}
          action={{ label: 'Start cooking', nextStatus: 'cooking', variant: 'info' }}
          onChangeStatus={updateStatus}
          updatingOrderId={updatingOrderId}
          tone="new"
        />
        <KitchenColumn
          title="Cooking"
          orders={cookingOrders}
          now={now}
          action={{ label: 'Mark ready', nextStatus: 'ready', variant: 'primary' }}
          onChangeStatus={updateStatus}
          updatingOrderId={updatingOrderId}
          tone="cooking"
        />
        <KitchenColumn title="Ready to serve" orders={readyOrders} now={now} tone="ready" />
      </div>
    </>
  );
}

type KitchenColumnProps = {
  title: string;
  orders: Order[];
  now: Date;
  action?: { label: string; nextStatus: OrderStatus; variant: 'info' | 'primary' };
  onChangeStatus?: (data: { id: string; status: OrderStatus }) => void;
  updatingOrderId?: string;
  tone: ColumnTone;
};

function KitchenColumn({
  title,
  orders,
  now,
  action,
  onChangeStatus,
  updatingOrderId,
  tone,
}: KitchenColumnProps) {
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-2xl bg-tone-gray/60 p-3">
      <h2 className="flex items-center justify-between px-1 text-sm font-bold">
        <span className="flex items-center gap-2">
          <span className={`size-2.5 rounded-[3px] ${COLUMN_TONES[tone].dot}`} aria-hidden="true" />
          {title}
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-surface text-xs">
          {orders.length}
        </span>
      </h2>

      {orders.length === 0 && (
        <p className="rounded-xl border border-dashed border-input py-8 text-center text-sm text-muted">
          No orders
        </p>
      )}

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          now={now}
          actionLabel={action?.label}
          isUpdating={updatingOrderId === order.id}
          onAction={() => {
            if (!action) return;
            onChangeStatus?.({ id: order.id, status: action.nextStatus });
          }}
          barClass={COLUMN_TONES[tone].bar}
          actionVariant={action?.variant}
        />
      ))}
    </section>
  );
}
