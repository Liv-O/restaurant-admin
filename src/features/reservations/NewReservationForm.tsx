import Button from '@/components/ui/Button';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '@/components/ui/FormField';
import { format, isBefore, parse } from 'date-fns';
import { tableNumbers, TIME_SLOTS } from './constants';
import type { Reservation } from '@/types';

const MIN_QTY = 1;
const MAX_QTY = 20;

type NewReservationFormProps = {
  onClose: () => void;
  chosenDate: Date;
  addReservation: (newReservation: Reservation) => void;
};

const newReservationSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(1, 'Guest name is required')
      .min(2, 'Guest name must be at least 2 characters')
      .max(100, 'Guest name must be at most 100 characters'),
    guestPhone: z
      .string()
      .regex(
        /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        'Invalid phone number',
      ),
    date: z.string().min(1, 'Pick a date'),
    time: z.string().min(1, 'Pick a time'),
    partySize: z
      .number()
      .int()
      .min(MIN_QTY, `At least ${MIN_QTY}`)
      .max(MAX_QTY, `No more than ${MAX_QTY}`),
    tableNumber: z.string().optional(),
    status: z.enum(['pending', 'confirmed']),
    note: z.string().max(200, 'Note must be at most 200 characters').optional(),
  })
  .refine(
    ({ date, time }) => {
      if (!date || !time) return true; // порожні поля вже ловлять .min(1) вище
      const dateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
      return !isBefore(dateTime, new Date());
    },
    { error: 'This time has already passed', path: ['time'] },
  );

type NewReservationValues = z.infer<typeof newReservationSchema>;

export default function NewReservationForm({
  onClose,
  chosenDate,
  addReservation,
}: NewReservationFormProps) {
  const defaultValues: NewReservationValues = {
    guestName: '',
    guestPhone: '',
    date: format(chosenDate, 'yyyy-MM-dd'),
    time: '',
    partySize: 2,
    tableNumber: '',
    status: 'pending',
    note: '',
  };

  const {
    register, // підключити поле
    handleSubmit, // обгортка для сабміту
    formState: { errors, isSubmitting },
    reset, // скинути форму
    control, // підглянути значення поля
    setValue, // змінити значення поля з коду
  } = useForm<NewReservationValues>({ defaultValues, resolver: zodResolver(newReservationSchema) });

  function onSubmit(data: NewReservationValues) {
    const newReservation: Reservation = {
      id: crypto.randomUUID(),
      tableId: data.tableNumber || undefined,
      guestName: data.guestName,
      phone: data.guestPhone,
      guests: data.partySize,
      startsAt: parse(`${data.date} ${data.time}`, 'yyyy-MM-dd HH:mm', new Date()).toISOString(),
      status: data.status,
      note: data.note || undefined,
    };

    addReservation(newReservation); // Викликаємо функцію оновлення резервацій
    reset(); // скидаємо форму після сабміту
    onClose(); // закриваємо модалку після сабміту
  }

  const quantity = useWatch({ control, name: 'partySize' }); // поточне число; компонент перерендериться, коли воно зміниться

  function changeQuantity(delta: number) {
    setValue('partySize', quantity + delta, { shouldValidate: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3.5">
        <FormField label="Guest Name *" error={errors.guestName?.message} errorId="guestName-error">
          <input
            className="h-11 rounded-[10px] border border-input px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
            aria-describedby="guestName-error"
            aria-invalid={!!errors.guestName}
            placeholder="Enter guest name"
            {...register('guestName')}
          />
        </FormField>

        <FormField
          label="Guest Phone *"
          error={errors.guestPhone?.message}
          errorId="guestPhone-error"
        >
          <input
            className="h-11 rounded-[10px] border border-input px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
            aria-describedby="guestPhone-error"
            aria-invalid={!!errors.guestPhone}
            placeholder="Enter guest phone"
            {...register('guestPhone')}
          />
        </FormField>

        <FormField label="Date *" error={errors.date?.message} errorId="date-error">
          <input
            className="h-11 rounded-[10px] border border-input px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
            aria-describedby="date-error"
            aria-invalid={!!errors.date}
            type="date"

            min={format(new Date(), 'yyyy-MM-dd')}

            {...register('date')}
          />
        </FormField>
        <FormField label="Time *" error={errors.time?.message} errorId="time-error">
          <select
            className="h-11 rounded-[10px] border border-input px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
            aria-describedby="time-error"
            aria-invalid={!!errors.time}
            {...register('time')}
          >
            <option value="" disabled>
              Select time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </FormField>
        <div className="flex flex-col gap-1.5">
          <span id="partySize-label" className="text-[13px] font-bold">
            Party Size *
          </span>
          <div
            className="flex h-11 items-center overflow-hidden rounded-[10px] border border-input"
            aria-labelledby="partySize-label"
            role="group"
          >
            <button
              type="button"
              aria-label="Fewer guests"
              className="size-11 shrink-0 bg-bg text-center font-bold disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => changeQuantity(-1)}
              disabled={quantity <= MIN_QTY}
            >
              -
            </button>
            <span
              aria-live="polite"
              className="flex-1 text-center font-medium text-ink"
            >{`${quantity} ${quantity === 1 ? 'guest' : 'guests'}`}</span>
            <button
              type="button"
              aria-label="More guests"
              className="size-11 shrink-0 bg-bg text-center font-bold disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => changeQuantity(1)}
              disabled={quantity >= MAX_QTY}
            >
              +
            </button>
          </div>
          {errors.partySize?.message && (
            <span id="partySize-error" className="text-xs font-semibold text-danger">
              {errors.partySize?.message}
            </span>
          )}
        </div>

        <FormField
          label="Table Number"
          error={errors.tableNumber?.message}
          errorId="tableNumber-error"
        >
          <select
            className="h-11 rounded-[10px] border border-input px-3 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
            aria-describedby="tableNumber-error"
            aria-invalid={!!errors.tableNumber}
            {...register('tableNumber')}
          >
            <option value="">Assign later</option>
            {tableNumbers.map((number) => (
              <option key={number} value={number}>
                Table {number}
              </option>
            ))}
          </select>
        </FormField>

        <fieldset className="col-span-2 flex flex-col gap-1.5">
          <legend className="mb-1.5 text-[13px] font-bold">Status</legend>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-tone-gray p-1">
            <label>
              <input
                type="radio"
                value="pending"
                className="peer sr-only"
                {...register('status')}
              />
              <span className="flex h-9.5 items-center justify-center rounded-[9px] text-sm font-semibold text-muted peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                Pending
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="confirmed"
                className="peer sr-only"
                {...register('status')}
              />
              <span className="flex h-9.5 items-center justify-center rounded-[9px] text-sm font-semibold text-muted peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                Confirmed
              </span>
            </label>
          </div>
        </fieldset>

        <FormField
          label="Note"
          error={errors.note?.message}
          errorId="note-error"
          className="col-span-2"
        >
          <textarea
            rows={3}
            {...register('note')}
            aria-invalid={!!errors.note}
            aria-describedby="note-error"
            className="resize-none rounded-[10px] border border-input px-3 py-2.5 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
          />
        </FormField>
      </div>
      <div className="mt-2 flex justify-end gap-2.5 border-t border-line pt-4">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Create Reservation
        </Button>
      </div>
    </form>
  );
}
