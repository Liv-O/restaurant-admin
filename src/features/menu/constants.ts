import type { Tone } from '@/components/ui/Badge';

export const TAGS = ['vegetarian', 'vegan', 'gluten-free', 'spicy'] as const;

export const TAG_LABELS: Record<(typeof TAGS)[number], string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-Free',
  spicy: 'Spicy',
};

export const TAG_TONES: Record<(typeof TAGS)[number], Tone> = {
  vegetarian: 'green',
  vegan: 'amber',
  'gluten-free': 'blue',
  spicy: 'red',
};
