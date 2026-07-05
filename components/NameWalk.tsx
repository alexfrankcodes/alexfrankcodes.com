const STEPS = 700;
const STEP_LENGTH = 12;
const WIDTH = 640;
const HEIGHT = 360;
const PADDING = 24;

// mulberry32 — deterministic, so server and client render the same walk
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromName(name: string) {
  let seed = 0;
  for (const char of name) {
    seed = (seed * 31 + char.charCodeAt(0)) | 0;
  }
  return seed;
}

function generateWalk(name: string) {
  const random = mulberry32(seedFromName(name));
  const points: string[] = [];
  let x = WIDTH / 2;
  let y = HEIGHT / 2;
  let angle = random() * Math.PI * 2;

  points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  for (let i = 0; i < STEPS; i++) {
    // turn by a random multiple of 45 degrees, biased toward going straight
    const turn = Math.floor(random() * 3) - 1;
    angle += turn * (Math.PI / 4);
    x += Math.cos(angle) * STEP_LENGTH;
    y += Math.sin(angle) * STEP_LENGTH;
    if (x < PADDING || x > WIDTH - PADDING) {
      angle = Math.PI - angle;
      x = Math.min(Math.max(x, PADDING), WIDTH - PADDING);
    }
    if (y < PADDING || y > HEIGHT - PADDING) {
      angle = -angle;
      y = Math.min(Math.max(y, PADDING), HEIGHT - PADDING);
    }
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

const walkPoints = generateWalk("Alex Frank");
const walkLength = STEPS * STEP_LENGTH;

const NameWalk = () => (
  <svg
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    className="w-full h-auto text-accent"
    aria-hidden="true"
    focusable="false"
  >
    <polyline
      points={walkPoints}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      className="walk-path"
      style={{ "--walk-length": walkLength } as React.CSSProperties}
    />
  </svg>
);

export default NameWalk;
