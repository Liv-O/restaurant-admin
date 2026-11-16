// Imitates network latency so loading states can be seen and tested.
export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
