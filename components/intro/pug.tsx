import { formatPoint, mapPoints, pointsOf, ring, type Point } from "@/components/intro/path";

export const PUG_SIZE = 400;

const BRUSH_WIDTH = 4.5;
const SAMPLES_PER_CURVE = 24;
const SPIRAL_PITCH = 2.4;
const THREAD_HALF_WIDTH = 1.5;

const mirror = (d: string) => mapPoints(d, (x, y) => [PUG_SIZE - x, y]);

function cubicAt([a, b, c, d]: Point[], t: number): Point {
  const u = 1 - t;
  const at = (i: 0 | 1) =>
    u ** 3 * a[i] + 3 * u ** 2 * t * b[i] + 3 * u * t ** 2 * c[i] + t ** 3 * d[i];
  return [at(0), at(1)];
}

function sampleCubics(d: string) {
  const points = pointsOf(d);
  const samples: Point[] = [];
  for (let i = 0; i + 3 < points.length; i += 3) {
    const curve = points.slice(i, i + 4);
    for (let step = i === 0 ? 0 : 1; step <= SAMPLES_PER_CURVE; step++) {
      samples.push(cubicAt(curve, step / SAMPLES_PER_CURVE));
    }
  }
  return samples;
}

/** Outlines a centerline as a brush stroke that is thin at both ends. */
function taperedOutline(d: string) {
  const samples = sampleCubics(d);
  const left: string[] = [];
  const right: string[] = [];

  samples.forEach(([x, y], i) => {
    const [prevX, prevY] = samples[Math.max(i - 1, 0)];
    const [nextX, nextY] = samples[Math.min(i + 1, samples.length - 1)];
    const dx = nextX - prevX;
    const dy = nextY - prevY;
    const length = Math.hypot(dx, dy) || 1;
    const halfWidth = (BRUSH_WIDTH / 2) * Math.sin((i / (samples.length - 1)) * Math.PI) ** 0.7;
    const nx = (-dy / length) * halfWidth;
    const ny = (dx / length) * halfWidth;
    left.push(formatPoint([x + nx, y + ny]));
    right.unshift(formatPoint([x - nx, y - ny]));
  });

  return `M${[...left, ...right].join(" L")} Z`;
}

/**
 * A spiral from the middle of a shape out to its edge, ending at the top and heading
 * left. Its loops overlap when stroked, so it looks solid until it unwinds.
 */
function spiral([cx, cy]: Point, radiusAt: (angle: number) => number) {
  const radii = Array.from({ length: 64 }, (_, i) => radiusAt((i / 64) * 2 * Math.PI));
  const turns = Math.ceil(Math.max(...radii) / SPIRAL_PITCH);
  const steps = turns * 32;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = -Math.PI / 2 - t * turns * 2 * Math.PI;
    const radius = t * radiusAt(angle);
    points.push(formatPoint([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]));
  }
  return `M${points.join(" L")}`;
}

function spiralInside(outline: string, center: Point) {
  const edge = sampleCubics(outline).map(([x, y]) => ({
    angle: Math.atan2(y - center[1], x - center[0]),
    radius: Math.hypot(x - center[0], y - center[1]),
  }));
  const angleGap = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));

  return spiral(center, (angle) => {
    const nearest = edge.reduce((best, point) =>
      angleGap(point.angle, angle) < angleGap(best.angle, angle) ? point : best,
    );
    return nearest.radius - THREAD_HALF_WIDTH;
  });
}

const EYE_CENTER: Point = [122, 172];
const EYE_RING_RADIUS = 33;
const PUPIL_RADIUS = 24;
const NOSE_CENTER: Point = [200, 214];
const NOSE = "M172 206 C176 192 224 192 228 206 C232 222 214 234 200 236 C186 234 168 222 172 206";

const EYE_RING = ring(EYE_CENTER, EYE_RING_RADIUS);
const PUPIL = spiral(EYE_CENTER, () => PUPIL_RADIUS - THREAD_HALF_WIDTH);

// Lines run toward the outside of the face, so each thread leaves in the direction
// it is already heading. Brush lines only support M and C commands.
const BRUSH_LEFT = {
  brow: "M160 160 C172 146 172 122 158 112 C130 96 84 112 72 150",
  lid: "M146 134 C132 118 100 120 84 136",
  bridge: "M200 174 C168 176 150 214 124 222",
  "wrinkle-1": "M158 232 C130 232 104 246 88 270",
  "wrinkle-2": "M150 262 C136 276 116 284 98 286",
  "wrinkle-3": "M156 300 C130 322 100 334 72 308",
  jaw: "M200 300 C172 314 150 342 130 362 C106 382 72 368 62 306",
  tick: "M186 246 C178 252 168 252 160 246",
};

const BRUSH_LINES: Record<string, string> = { philtrum: "M200 236 C200 256 200 276 200 300" };
for (const [name, d] of Object.entries(BRUSH_LEFT)) {
  BRUSH_LINES[`${name}-left`] = d;
  BRUSH_LINES[`${name}-right`] = mirror(d);
}

/** The path every thread starts from, in pug coordinates. */
export const PUG_LINES: Record<string, string> = {
  ...BRUSH_LINES,
  "eye-ring-left": EYE_RING,
  "eye-ring-right": mirror(EYE_RING),
  "pupil-left": PUPIL,
  "pupil-right": mirror(PUPIL),
  nose: spiralInside(NOSE, NOSE_CENTER),
};

function Eye({ side, cx, cy }: Readonly<{ side: string; cx: number; cy: number }>) {
  return (
    <>
      <circle
        data-line={`eye-ring-${side}`}
        cx={cx}
        cy={cy}
        r={EYE_RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
      />
      <circle data-line={`pupil-${side}`} cx={cx} cy={cy} r={PUPIL_RADIUS} />
      <circle data-highlight cx={cx + 9} cy={cy - 9} r={7} fill="var(--background)" />
      <circle data-highlight cx={cx - 9} cy={cy + 10} r={3} fill="var(--background)" />
    </>
  );
}

export function Pug() {
  return (
    <svg
      viewBox={`0 0 ${PUG_SIZE} ${PUG_SIZE}`}
      className="intro-pug"
      fill="currentColor"
      aria-hidden
    >
      {Object.entries(BRUSH_LINES).map(([name, d]) => (
        <path key={name} data-line={name} d={taperedOutline(d)} />
      ))}
      <Eye side="left" cx={EYE_CENTER[0]} cy={EYE_CENTER[1]} />
      <Eye side="right" cx={PUG_SIZE - EYE_CENTER[0]} cy={EYE_CENTER[1]} />
      <path data-line="nose" d={`${NOSE} Z`} />
      <ellipse data-highlight cx={188} cy={205} rx={8} ry={3.5} fill="var(--background)" />
    </svg>
  );
}
