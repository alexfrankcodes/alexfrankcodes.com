"use client";

import { SketchDef, useSketchCanvas } from "@/lib/useSketchCanvas";
import { noise3, strokeContourLevels } from "@/lib/contourMath";

interface GlowState {
  cell: number;
  gw: number;
  gh: number;
  field: Float32Array;
  t: number;
  mouseAmp: number;
}

const LEVELS = 8;
const ACCENT_LEVEL = 4;

// a smaller, softer version of the hero's contour sketch (no text-peak
// plateau) used as a hover/ambient glow behind smaller UI elements.
// `cellSize` controls the marching-squares grid resolution — small targets
// (e.g. a text link) need a finer grid than a full card or the field is too
// coarse to show any contour crossings at all.
function makeGlowSketch(cellSize: number): SketchDef<GlowState> {
  return {
    staticSteps: 1,
    init(w, h) {
      const gw = Math.ceil(w / cellSize) + 1;
      const gh = Math.ceil(h / cellSize) + 1;
      return {
        cell: cellSize,
        gw,
        gh,
        field: new Float32Array(gw * gh),
        t: Math.random() * 100,
        mouseAmp: 0,
      };
    },
    step(ctx, s, w, h, colors, mouse) {
      s.t += 0.0028;
      s.mouseAmp += ((mouse.active ? 1 : 0) - s.mouseAmp) * 0.06;
      ctx.clearRect(0, 0, w, h);

      const { cell, gw, gh, field } = s;
      const hill = s.mouseAmp > 0.01;
      const mr2 = 2 * 90 * 90;
      for (let gy = 0; gy < gh; gy++)
        for (let gx = 0; gx < gw; gx++) {
          const px = gx * cell;
          const py = gy * cell;
          let v =
            noise3(px * 0.0052 + s.t * 0.55, py * 0.0062, s.t) * 0.55 +
            noise3(px * 0.014, py * 0.016, s.t * 1.7 + 40) * 0.18;
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
        accentOpacity: 0.4,
        baseOpacityHigh: 0.14,
        baseOpacityLow: 0.07,
      });
    },
  };
}

// module-level (stable identity) sketch defs — useSketchCanvas re-runs its
// effect whenever the sketch object identity changes, so these must not be
// recreated on render.
const REGULAR_SKETCH = makeGlowSketch(12);
const COMPACT_SKETCH = makeGlowSketch(5);

interface CardContourGlowProps {
  // "compact" uses a finer grid, for small targets like a text link where
  // the default 12px cell is too coarse to show any contour lines
  variant?: "regular" | "compact";
}

const CardContourGlow = ({ variant = "regular" }: CardContourGlowProps) => {
  const canvasRef = useSketchCanvas(
    variant === "compact" ? COMPACT_SKETCH : REGULAR_SKETCH
  );
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default CardContourGlow;
