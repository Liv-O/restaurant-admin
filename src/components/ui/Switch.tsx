import type { ComponentProps } from 'react';

type SwitchProps = ComponentProps<'input'>;

export default function Switch({ className = '', ...props }: SwitchProps) {
  return (
    <label className={`relative inline-flex cursor-pointer items-center ${className}`}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="h-6.5 w-11 rounded-full bg-line transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"></span>
      <span className="absolute top-0.75 left-0.75 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4.5"></span>
    </label>
  );
}
