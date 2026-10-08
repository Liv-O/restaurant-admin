import type { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'md' | 'lg' | 'sm' | 'icon' | 'icon-sm';

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white enabled:hover:bg-primary-hover',
  secondary: 'border border-line bg-surface text-ink enabled:hover:bg-bg',
  ghost: 'bg-transparent text-ink enabled:hover:bg-bg',
  outline: 'border border-primary bg-white text-primary enabled:hover:bg-primary/10',
  danger: 'bg-danger text-white enabled:hover:bg-danger/90',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-4 text-sm ',
  lg: 'h-13 px-6 text-base ',
  sm: 'h-9 px-3 text-sm',
  icon: 'size-11',
  'icon-sm': 'size-9',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className} ${sizes[size]}`}
      {...props}
    />
  );
}
