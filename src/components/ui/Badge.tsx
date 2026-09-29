import type { ReactNode } from 'react';

type Tone = 'free' | 'busy' | 'reserved' | 'bill' | 'neutral';

const tones: Record<Tone, string> = {
  free: 'bg-status-free',
  busy: 'bg-status-busy',
  reserved: 'bg-status-reserved',
  bill: 'bg-status-bill',
  neutral: 'bg-bg',
};

export default function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
