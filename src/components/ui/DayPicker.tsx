import type { ComponentProps, ReactNode } from 'react';

type DayPickerProps = ComponentProps<'button'> & {
  children?: ReactNode;
  isActive?: boolean;
};

export default function DayPicker({
  children,
  className = '',
  isActive,
  ...props
}: DayPickerProps) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-20 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 transition-colors ${isActive ? 'border-primary bg-primary text-white hover:bg-primary/80' : 'border-line bg-surface hover:bg-surface/80'} ${className}`}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}
