import type { ComponentProps, ReactNode } from 'react';

type FilterChipProps = ComponentProps<'button'> & {
  children: ReactNode;

  isActive: boolean;
};

export default function FilterChip({
  children,
  className = '',
  isActive,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={`h-11 rounded-full px-4 text-sm font-semibold transition-colors ${isActive ? 'bg-sidebar text-white' : 'border border-line bg-surface text-ink hover:bg-bg'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
