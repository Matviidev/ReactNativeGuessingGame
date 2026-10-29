export function generateRandomBetween(
  min: number,
  max: number,
  exclude?: number,
): number {
  if (min >= max) {
    return min;
  }

  let value: number;
  do {
    value = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (value === exclude);

  return value;
}
