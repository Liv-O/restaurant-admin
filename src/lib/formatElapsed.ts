const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

// Compact elapsed time: formatElapsed(45) → "45 min", formatElapsed(200) → "3 h", formatElapsed(11520) → "8 d".
export function formatElapsed(minutes: number): string {
  if (minutes < MINUTES_IN_HOUR) return `${minutes} min`;
  if (minutes < MINUTES_IN_DAY) return `${Math.floor(minutes / MINUTES_IN_HOUR)} h`;
  return `${Math.floor(minutes / MINUTES_IN_DAY)} d`;
}
