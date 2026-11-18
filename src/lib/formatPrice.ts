// Currency matches CURRENCY in the backend .env.
const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Prices come from the backend in cents: formatPrice(1450) → "$14.50".
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}
