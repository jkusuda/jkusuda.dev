export type Point = [x: number, y: number];

const POINT = /(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/g;

export function formatPoint([x, y]: Point) {
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

/** Applies `fn` to every coordinate pair. Paths must use absolute commands only. */
export function mapPoints(d: string, fn: (x: number, y: number) => Point) {
  return d.replace(POINT, (_, x, y) => formatPoint(fn(Number(x), Number(y))));
}

export function pointsOf(d: string): Point[] {
  return [...d.matchAll(POINT)].map((match) => [Number(match[1]), Number(match[2])]);
}

export function firstPoint(d: string): Point {
  return pointsOf(d)[0];
}

export function lastPoint(d: string): Point {
  return pointsOf(d).at(-1)!;
}

/** A circle starting at the top and heading left at its end, as four cubic curves. */
export function ring([cx, cy]: Point, r: number) {
  const k = r * 0.5523;
  return [
    `M${cx} ${cy - r}`,
    `C${cx - k} ${cy - r} ${cx - r} ${cy - k} ${cx - r} ${cy}`,
    `C${cx - r} ${cy + k} ${cx - k} ${cy + r} ${cx} ${cy + r}`,
    `C${cx + k} ${cy + r} ${cx + r} ${cy + k} ${cx + r} ${cy}`,
    `C${cx + r} ${cy - k} ${cx + k} ${cy - r} ${cx} ${cy - r}`,
  ].join(" ");
}
