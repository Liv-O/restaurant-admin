import type { Table } from '@/types';
import type { ComponentProps } from 'react';

import { getTableShape } from '@/features/floor/utils';

type TableCardProps = ComponentProps<'button'> & {
  className: string;
  tableInfo: Table;
  tableStatus: string;
  details?: string;
};

export default function TableCard({
  className,
  tableInfo,
  tableStatus,
  details,
  onClick,
  ...props
}: TableCardProps) {
  return (
    <button
      type="button"
      className={`flex min-h-33 flex-col justify-between gap-1.5 border-2 p-4 text-left aria-pressed:outline-3 aria-pressed:outline-offset-3 aria-pressed:outline-tone-green-ink ${className} ${getTableShape(tableInfo.seats)}`}
      onClick={onClick}
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
