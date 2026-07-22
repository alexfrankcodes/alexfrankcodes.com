// Shared marching-squares contour math used by both the hero ContourField
// and the smaller CardContourGlow sketch.

// smooth value noise on an integer lattice, third axis used as time
export function hash3(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

export function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const sx = xf * xf * (3 - 2 * xf);
  const sy = yf * yf * (3 - 2 * yf);
  const sz = zf * zf * (3 - 2 * zf);
  let v = 0;
  for (let dz = 0; dz <= 1; dz++)
    for (let dy = 0; dy <= 1; dy++)
      for (let dx = 0; dx <= 1; dx++) {
        const w =
          (dx ? sx : 1 - sx) * (dy ? sy : 1 - sy) * (dz ? sz : 1 - sz);
        v += w * hash3(xi + dx, yi + dy, zi + dz);
      }
  return v;
}

export function boxBlur(grid: Float32Array, gw: number, gh: number, passes: number) {
  const a = grid;
  const b = new Float32Array(gw * gh);
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < gh; y++)
      for (let x = 0; x < gw; x++) {
        const x0 = Math.max(0, x - 1), x1 = Math.min(gw - 1, x + 1);
        b[y * gw + x] = (a[y * gw + x0] + a[y * gw + x] + a[y * gw + x1]) / 3;
      }
    for (let x = 0; x < gw; x++)
      for (let y = 0; y < gh; y++) {
        const y0 = Math.max(0, y - 1), y1 = Math.min(gh - 1, y + 1);
        a[y * gw + x] = (b[y0 * gw + x] + b[y * gw + x] + b[y1 * gw + x]) / 3;
      }
  }
  return a;
}

// segments per marching-squares case, as pairs of edge indices
// (0 top, 1 right, 2 bottom, 3 left)
export const MS_SEGS: Record<number, [number, number][]> = {
  1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]],
  5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]],
  9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[3, 1]],
  13: [[0, 1]], 14: [[3, 0]],
};

export interface ContourColors {
  bg: string;
  fg: string;
  accent: string;
}

export interface StrokeContourLevelsOptions {
  ctx: CanvasRenderingContext2D;
  field: Float32Array;
  cell: number;
  gw: number;
  gh: number;
  colors: ContourColors;
  levels: number;
  accentLevel: number;
  isoBase?: number;
  isoRange?: number;
  accentOpacity?: number;
  baseOpacityHigh?: number;
  baseOpacityLow?: number;
  accentLineWidth?: number;
  baseLineWidth?: number;
}

// draws `levels` iso-line passes of a marching-squares field onto ctx
export function strokeContourLevels({
  ctx,
  field,
  cell,
  gw,
  gh,
  colors,
  levels,
  accentLevel,
  isoBase = 0.16,
  isoRange = 0.95,
  accentOpacity = 0.55,
  baseOpacityHigh = 0.2,
  baseOpacityLow = 0.11,
  accentLineWidth = 1.4,
  baseLineWidth = 1,
}: StrokeContourLevelsOptions) {
  for (let li = 0; li < levels; li++) {
    const iso = isoBase + (li / (levels - 1)) * isoRange;
    const isAccent = li === accentLevel;
    ctx.strokeStyle = isAccent
      ? `rgba(${colors.accent},${accentOpacity})`
      : `rgba(${colors.fg},${li % 3 === 0 ? baseOpacityHigh : baseOpacityLow})`;
    ctx.lineWidth = isAccent ? accentLineWidth : baseLineWidth;
    ctx.beginPath();
    for (let gy = 0; gy < gh - 1; gy++)
      for (let gx = 0; gx < gw - 1; gx++) {
        const a = field[gy * gw + gx];
        const b = field[gy * gw + gx + 1];
        const c = field[(gy + 1) * gw + gx + 1];
        const d = field[(gy + 1) * gw + gx];
        const idx =
          (a > iso ? 1 : 0) | (b > iso ? 2 : 0) |
          (c > iso ? 4 : 0) | (d > iso ? 8 : 0);
        if (idx === 0 || idx === 15) continue;
        const px = gx * cell;
        const py = gy * cell;
        const f = (u: number, v: number) => (iso - u) / (v - u);
        const E: [number, number][] = [
          [px + cell * f(a, b), py],
          [px + cell, py + cell * f(b, c)],
          [px + cell * f(d, c), py + cell],
          [px, py + cell * f(a, d)],
        ];
        for (const [e0, e1] of MS_SEGS[idx]) {
          ctx.moveTo(E[e0][0], E[e0][1]);
          ctx.lineTo(E[e1][0], E[e1][1]);
        }
      }
    ctx.stroke();
  }
}
