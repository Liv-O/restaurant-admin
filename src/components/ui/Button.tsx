import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-line bg-surface text-ink hover:bg-bg',
};

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-5 py-3 font-semibold transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
