import Button from '@/components/ui/Button';
import { useAppSelector } from '@/store/hooks';
import { selectDraft } from '@/store/orderDraftsSlice';
import type { CreateOrderBody, Table } from '@/types';
import { useId, useState, type FormEvent } from 'react';
import { draftToOrderItems } from './utils';
import DraftList from './DraftList';
import Modal from '@/components/Modal';
import DishPicker from './DishPicker';

type NewOrderFormProps = {
  table: Table;
  defaultGuests: number;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (body: CreateOrderBody) => void;
};

export default function NewOrderForm({
  table,
  defaultGuests,
  submitLabel,
  isSubmitting,
  onSubmit,
}: NewOrderFormProps) {
  const [guests, setGuests] = useState(Math.min(defaultGuests, table.seats));
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const draft = useAppSelector((state) => selectDraft(state, table.id));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body: CreateOrderBody = {
      tableId: table.id,
      guests,
      items: draftToOrderItems(draft),
    };
    onSubmit(body);
  }
  const guestsLabelId = useId();

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <span id={guestsLabelId} className="text-[13px] font-bold">
          Guests
        </span>
        <div
          role="group"
          aria-labelledby={guestsLabelId}
          className="flex h-11 items-center overflow-hidden rounded-[10px] border border-input"
        >
          <button
            type="button"
            aria-label="Fewer guests"
            className="size-11 shrink-0 bg-bg font-bold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setGuests((g) => g - 1)}
            disabled={guests <= 1}
          >
            −
          </button>
          <span aria-live="polite" className="flex-1 text-center font-medium">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
          <button
            type="button"
            aria-label="More guests"
            className="size-11 shrink-0 bg-bg font-bold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setGuests((g) => g + 1)}
            disabled={guests >= table.seats}
          >
            +
          </button>
        </div>
      </div>
      <DraftList tableId={table.id} />
      <Button
        variant="outline"
        onClick={() => {
          setIsOpenMenu(true);
        }}
      >
        Add Items
      </Button>
      {isOpenMenu && (
        <Modal
          onClose={() => {
            setIsOpenMenu(false);
          }}
          title={`Add items · Table ${table.number}`}
        >
          <DishPicker tableId={table.id} />
        </Modal>
      )}

      <div className="mt-auto flex flex-col gap-2.5">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={draft.length === 0 || isSubmitting}
        >
          {isSubmitting ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
