import type { Table } from '@/types';
import type { ComponentProps } from 'react';

type TableCardProps = ComponentProps<'button'> & {
  className: string;
  tableInfo: Table;
  tableStatus: string;
  details?: string;
};

function getTableShape(seats: number) {
  if (seats < 4) return 'rounded-[48px]';
  else if (seats === 4) return 'rounded-xl';
  else return 'rounded-xl col-span-2';
}

export default function TableCard({
  className,
  tableInfo,
  tableStatus,
  details,
  ...props
}: TableCardProps) {
  return (
    <button
      type="button"
      className={`flex min-h-33 flex-col justify-between gap-1.5 border-2 p-4 text-left ${className} ${getTableShape(tableInfo.seats)}`}
      {...props}
    >
      <div className="flex w-full items-baseline justify-between">
        <span className="font-display text-2xl font-semibold">T{tableInfo.number}</span>
        <span className="text-xs font-bold">{tableInfo.seats} seats</span>
      </div>

      <span className="text-[13px] font-bold">{tableStatus}</span>
      {details && <span className="text-xs font-medium opacity-80">{details}</span>}
    </button>
  );
}
