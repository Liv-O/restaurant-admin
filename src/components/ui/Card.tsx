import type { ComponentProps } from 'react';

export default function Card({ className = '', ...props }: ComponentProps<'div'>) {
  return <div className={`rounded-2xl border border-line bg-surface ${className}`} {...props} />;
}
