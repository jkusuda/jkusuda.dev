import { PawShape } from "@/components/paw-shape";

const SIZE = 240;
const RADIUS = 186;
const STEPS = 9;
const STEP_SECONDS = 0.45;
const STANCE = 9;

// Only one trail shows at a time, so each gets a third of the loop. A print lasts
// 11.5% of the loop (the paw-step keyframes), which ends before the next trail starts.
const LOOP_SECONDS = 27;
const TRAIL_SECONDS = LOOP_SECONDS / 3;

// Each trail arches around its corner from one edge of the screen to the other.
// Angles are in degrees around the corner point, from the first print to the last.
const TRAILS = [
  { position: "bottom-0 left-0", corner: [0, SIZE], from: -82, to: -8 },
  { position: "top-0 left-0", corner: [0, 0], from: 8, to: 82 },
  { position: "top-0 right-0", corner: [SIZE, 0], from: 172, to: 98 },
];

function footprints({ corner, from, to }: (typeof TRAILS)[number]) {
  const direction = Math.sign(to - from);

  return Array.from({ length: STEPS }, (_, step) => {
    const angle = ((from + ((to - from) * step) / (STEPS - 1)) * Math.PI) / 180;
    const heading = angle + (direction * Math.PI) / 2;
    // Left and right feet land on either side of the path.
    const radius = RADIUS + (step % 2 === 0 ? STANCE : -STANCE);
    const x = corner[0] + radius * Math.cos(angle);
    const y = corner[1] + radius * Math.sin(angle);
    const rotation = (heading * 180) / Math.PI + 90;
    return { x, y, rotation };
  });
}

export function PawTrails() {
  return (
    <div
      data-intro-hidden
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 text-foreground"
    >
      {TRAILS.map((trail, trailIndex) => (
        <svg
          key={trail.position}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="currentColor"
          className={`absolute size-[clamp(160px,30vmin,270px)] ${trail.position}`}
        >
          {footprints(trail).map(({ x, y, rotation }, step) => (
            <g
              key={step}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation.toFixed(1)}) scale(0.8) translate(-12 -12)`}
            >
              <g
                className="paw-print"
                style={{
                  animationDuration: `${LOOP_SECONDS}s`,
                  animationDelay: `${(trailIndex * TRAIL_SECONDS + step * STEP_SECONDS).toFixed(2)}s`,
                }}
              >
                <PawShape />
              </g>
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
