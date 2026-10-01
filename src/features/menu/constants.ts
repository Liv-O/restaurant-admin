import type { Tone } from '@/components/ui/Badge';

export const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const;
export const TAGS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Spicy'] as const;

export const TAG_TONES: Record<(typeof TAGS)[number], Tone> = {
  Vegetarian: 'green',
  Vegan: 'amber',
  'Gluten-Free': 'blue',
  Spicy: 'red',
};
