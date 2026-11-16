import type { TableStatus } from '@/types';
import type { Zone } from '@/types';

export const ZONES = ['main', 'terrace'] as const;

export const TABLE_STATUSES = ['free', 'occupied', 'reserved', 'bill'] as const;

export const ZONES_LABELS: Record<Zone, string> = {
  main: 'Main Hall',
  terrace: 'Terrace',
};

// Fixed points of reference shown above the tables grid.
// 'fixture' — furniture (solid fill), 'passage' — walkway/opening (dashed border).
export type Landmark = {
  label: string;
  kind: 'fixture' | 'passage';
  width: string;
};

export const ZONE_LANDMARKS: Record<Zone, Landmark[]> = {
  main: [
    { label: 'Bar counter', kind: 'fixture', width: 'flex-1' },
    { label: 'Entrance', kind: 'passage', width: 'w-40' },
  ],
  terrace: [{ label: 'Street', kind: 'passage', width: 'flex-1' }],
};

export const LANDMARK_KIND_STYLES: Record<Landmark['kind'], string> = {
  fixture: 'bg-tone-gray',
  passage: 'border-2 border-dashed border-input',
};

export const TABLE_STATUS_STYLES: Record<TableStatus, { label: string; className: string }> = {
  free: { label: 'Free', className: 'border-tone-green-ink/30 bg-tone-green text-tone-green-ink' },
  occupied: {
    label: 'Occupied',
    className: 'border-tone-amber-ink/30 bg-tone-amber text-tone-amber-ink',
  },
  reserved: {
    label: 'Reserved',
    className: 'border-tone-blue-ink/30 bg-tone-blue text-tone-blue-ink',
  },
  bill: {
    label: 'Bill requested',
    className: 'border-tone-red-ink/30 bg-tone-red text-tone-red-ink',
  },
};
