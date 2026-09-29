import type { HTMLAttributes } from 'react';

export default function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`border-line bg-surface rounded-2xl border ${className}`} {...props} />;
}
