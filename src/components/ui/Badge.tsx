import type { ReactNode } from 'react';
import type { ComponentProps } from 'react';

type Tone = 'green' | 'amber' | 'blue' | 'red' | 'neutral';

type BadgeProps = ComponentProps<'span'> & {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

const tones: Record<Tone, string> = {
  green: 'bg-tone-green text-tone-green-ink',
  amber: 'bg-tone-amber text-tone-amber-ink',
  blue: 'bg-tone-blue text-tone-blue-ink',
  red: 'bg-tone-red text-tone-red-ink',
  neutral: 'bg-tone-gray text-tone-gray-ink',
};

export default function Badge({
  tone = 'neutral',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
