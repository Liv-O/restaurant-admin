import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
  className?: string;
};

export default function FormField({
  label,
  error,
  errorId,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="flex flex-col gap-1.5 text-[13px] font-bold">
        {label}
        {children}
      </label>
      {error && (
        <span id={errorId} className="text-xs font-semibold text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
