"use client";

import { SketchDef, useSketchCanvas } from "@/lib/useSketchCanvas";
import { boxBlur, noise3, strokeContourLevels } from "@/lib/contourMath";

interface ContourState {
  cell: number;
  gw: number;
  gh: number;
  plateau: Float32Array;
  field: Float32Array;
  t: number;
  mouseAmp: number;
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

    strokeContourLevels({
      ctx,
      field,
      cell,
      gw,
      gh,
      colors,
      levels: LEVELS,
      accentLevel: ACCENT_LEVEL,
    });
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
