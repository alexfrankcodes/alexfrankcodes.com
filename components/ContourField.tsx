"use client";

import { SketchDef, useSketchCanvas } from "@/lib/useSketchCanvas";

interface ContourState {
  cell: number;
  gw: number;
  gh: number;
  plateau: Float32Array;
  field: Float32Array;
  t: number;
  mouseAmp: number;
}

// smooth value noise on an integer lattice, third axis used as time
function hash3(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise3(x: number, y: number, z: number) {
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

function boxBlur(grid: Float32Array, gw: number, gh: number, passes: number) {
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

// the element marked data-contour-peak, rasterized in its computed font and
// blurred into a smooth summit the iso-lines bunch around
function peakPlateau(
  canvas: HTMLCanvasElement,
  cell: number,
  gw: number,
  gh: number
) {
  const plateau = new Float32Array(gw * gh);
  const el = document.querySelector<HTMLElement>("[data-contour-peak]");
  const off = document.createElement("canvas");
  const octx = off.getContext("2d");
  if (!el || !octx) return plateau;

  const canvasRect = canvas.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  off.width = Math.max(1, Math.ceil(canvasRect.width));
  off.height = Math.max(1, Math.ceil(canvasRect.height));

  const style = getComputedStyle(el);
  octx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const spaced = octx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ("letterSpacing" in spaced) {
    spaced.letterSpacing =
      style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
  }
  octx.textBaseline = "alphabetic";
  octx.fillStyle = "#fff";
  const text = el.textContent ?? "";
  const m = octx.measureText(text);
  const ascent = m.actualBoundingBoxAscent;
  const descent = m.actualBoundingBoxDescent;
  const x = rect.left - canvasRect.left;
  const y =
    rect.top - canvasRect.top + (rect.height - (ascent + descent)) / 2 + ascent;
  octx.fillText(text, x, y);

  const data = octx.getImageData(0, 0, off.width, off.height).data;
  for (let gy = 0; gy < gh; gy++)
    for (let gx = 0; gx < gw; gx++) {
      const px = Math.min(off.width - 1, gx * cell);
      const py = Math.min(off.height - 1, gy * cell);
      plateau[gy * gw + gx] = data[(py * off.width + px) * 4 + 3] / 255;
    }
  return boxBlur(plateau, gw, gh, 5);
}

// segments per marching-squares case, as pairs of edge indices
// (0 top, 1 right, 2 bottom, 3 left)
const MS_SEGS: Record<number, [number, number][]> = {
  1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]],
  5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]],
  9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[3, 1]],
  13: [[0, 1]], 14: [[3, 0]],
};

const LEVELS = 12;
const ACCENT_LEVEL = 7;

const contourSketch: SketchDef<ContourState> = {
  staticSteps: 1,
  init(w, h, canvas) {
    const cell = 12;
    const gw = Math.ceil(w / cell) + 1;
    const gh = Math.ceil(h / cell) + 1;
    return {
      cell,
      gw,
      gh,
      plateau: peakPlateau(canvas, cell, gw, gh),
      field: new Float32Array(gw * gh),
      t: Math.random() * 100,
      mouseAmp: 0,
    };
  },
  step(ctx, s, w, h, colors, mouse) {
    s.t += 0.0028;
    s.mouseAmp += ((mouse.active ? 1 : 0) - s.mouseAmp) * 0.06;
    ctx.fillStyle = `rgb(${colors.bg})`;
    ctx.fillRect(0, 0, w, h);

    const { cell, gw, gh, plateau, field } = s;
    const hill = s.mouseAmp > 0.01;
    const mr2 = 2 * 130 * 130;
    for (let gy = 0; gy < gh; gy++)
      for (let gx = 0; gx < gw; gx++) {
        const px = gx * cell;
        const py = gy * cell;
        let v =
          noise3(px * 0.0052 + s.t * 0.55, py * 0.0062, s.t) * 0.55 +
          noise3(px * 0.014, py * 0.016, s.t * 1.7 + 40) * 0.18 +
          plateau[gy * gw + gx] * 1.15;
        if (hill) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          v += Math.exp(-(dx * dx + dy * dy) / mr2) * 0.5 * s.mouseAmp;
        }
        field[gy * gw + gx] = v;
      }

    for (let li = 0; li < LEVELS; li++) {
      const iso = 0.16 + (li / (LEVELS - 1)) * 0.95;
      const isAccent = li === ACCENT_LEVEL;
      ctx.strokeStyle = isAccent
        ? `rgba(${colors.accent},0.55)`
        : `rgba(${colors.fg},${li % 3 === 0 ? 0.2 : 0.11})`;
      ctx.lineWidth = isAccent ? 1.4 : 1;
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
  },
};

const ContourField = () => {
  const canvasRef = useSketchCanvas(contourSketch);
  return (
    <div
      className="absolute inset-x-0 top-0 -z-10 h-[70svh] pointer-events-none select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 78%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default ContourField;
