import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  );
}
