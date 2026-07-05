"use client";

import { SketchDef, useSketchCanvas } from "@/lib/useSketchCanvas";
import { ProjectSketchKind } from "@/lib/types";

/* Each project draws itself: a tiny generative vignette of what it does. */

interface WalkState {
  x: number;
  y: number;
  angle: number;
  steps: number;
  fade: number;
}

const walk: SketchDef<WalkState> = {
  // Name Walker: a little random walk that wanders, fades, and starts over
  staticSteps: 120,
  init(w, h) {
    return {
      x: w / 2,
      y: h / 2,
      angle: Math.random() * Math.PI * 2,
      steps: 220 + Math.floor(Math.random() * 80),
      fade: 0,
    };
  },
  step(ctx, s, w, h, colors) {
    if (s.steps <= 0) {
      ctx.fillStyle = `rgba(${colors.bg},0.08)`;
      ctx.fillRect(0, 0, w, h);
      if (++s.fade > 110) Object.assign(s, walk.init(w, h));
      return;
    }
    for (let i = 0; i < 2 && s.steps > 0; i++, s.steps--) {
      s.angle += (Math.floor(Math.random() * 3) - 1) * (Math.PI / 4);
      const nx = s.x + Math.cos(s.angle) * 5;
      const ny = s.y + Math.sin(s.angle) * 5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = `rgba(${colors.fg},0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      s.x = Math.min(Math.max(nx, 4), w - 4);
      s.y = Math.min(Math.max(ny, 4), h - 4);
      if (s.x !== nx || s.y !== ny) s.angle += Math.PI / 2;
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.6, 0, 7);
    ctx.fillStyle = `rgb(${colors.accent})`;
    ctx.fill();
  },
};

interface SortState {
  hues: number[];
  i: number;
  sortedPass: boolean;
  hold: number;
}

const sort: SketchDef<SortState> = {
  // Rainbow Sorts: nested arcs bubble-sorting themselves by hue
  staticSteps: 2000,
  init() {
    const n = 14;
    const hues = Array.from({ length: n }, (_, i) => (i / n) * 300);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hues[i], hues[j]] = [hues[j], hues[i]];
    }
    return { hues, i: 0, sortedPass: false, hold: 0 };
  },
  step(ctx, s, w, h, colors) {
    if (s.hold > 0) {
      s.hold--;
      if (s.hold === 0) Object.assign(s, sort.init(w, h));
    } else {
      const a = s.hues;
      if (s.i >= a.length - 1) {
        if (s.sortedPass) s.hold = 160;
        s.i = 0;
        s.sortedPass = true;
      } else {
        if (a[s.i] > a[s.i + 1]) {
          [a[s.i], a[s.i + 1]] = [a[s.i + 1], a[s.i]];
          s.sortedPass = false;
        }
        s.i++;
      }
    }
    ctx.fillStyle = `rgb(${colors.bg})`;
    ctx.fillRect(0, 0, w, h);
    const n = s.hues.length;
    const cx = w / 2;
    const maxR = Math.min(w / 2, h) - 3;
    const r0 = maxR * 0.25;
    const dr = (maxR - r0) / n;
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.arc(cx, h, r0 + i * dr, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = `hsl(${s.hues[i]} 60% 55% / 0.8)`;
      ctx.lineWidth = Math.max(dr - 1.2, 1);
      ctx.stroke();
    }
  },
};

interface Star {
  x: number;
  y: number;
  v: number;
  r: number;
}

interface ShipState {
  stars: Star[];
  t: number;
}

const ship: SketchDef<ShipState> = {
  // Galaxy Fighter: a starfield streaming past a little ship
  staticSteps: 1,
  init(w, h) {
    return {
      t: Math.random() * 100,
      stars: Array.from({ length: 26 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        v: 0.3 + Math.random() * 1.4,
        r: 0.5 + Math.random(),
      })),
    };
  },
  step(ctx, s, w, h, colors) {
    s.t += 0.03;
    ctx.fillStyle = `rgb(${colors.bg})`;
    ctx.fillRect(0, 0, w, h);
    for (const star of s.stars) {
      star.x -= star.v;
      if (star.x < 0) {
        star.x = w;
        star.y = Math.random() * h;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 7);
      ctx.fillStyle = `rgba(${colors.fg},${0.2 + star.v * 0.25})`;
      ctx.fill();
    }
    const sy = h / 2 + Math.sin(s.t) * h * 0.14;
    ctx.beginPath();
    ctx.moveTo(w * 0.22, sy);
    ctx.lineTo(w * 0.22 - 9, sy + 4.5);
    ctx.lineTo(w * 0.22 - 6.5, sy);
    ctx.lineTo(w * 0.22 - 9, sy - 4.5);
    ctx.closePath();
    ctx.fillStyle = `rgb(${colors.accent})`;
    ctx.fill();
  },
};

interface ChatState {
  t: number;
}

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const chat: SketchDef<ChatState> = {
  // DevChat: two sides of a conversation, typing in turns
  staticSteps: 1,
  init() {
    return { t: 0 };
  },
  step(ctx, s, w, h, colors) {
    s.t++;
    const cycle = s.t % 360;
    const leftTyping = cycle < 180;
    ctx.fillStyle = `rgb(${colors.bg})`;
    ctx.fillRect(0, 0, w, h);
    const bw = w * 0.52;
    const bh = h * 0.3;
    const bubbles = [
      { x: 4, y: h * 0.14, typing: leftTyping },
      { x: w - bw - 4, y: h * 0.56, typing: !leftTyping },
    ];
    for (const b of bubbles) {
      roundedRect(ctx, b.x, b.y, bw, bh, 6);
      ctx.strokeStyle = `rgba(${colors.fg},0.3)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      if (b.typing) {
        for (let i = 0; i < 3; i++) {
          const pulse = 0.3 + 0.7 * Math.abs(Math.sin(s.t * 0.09 - i * 0.7));
          ctx.beginPath();
          ctx.arc(b.x + bw * 0.3 + i * bw * 0.2, b.y + bh / 2, 2, 0, 7);
          ctx.fillStyle = `rgba(${colors.accent},${pulse})`;
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(b.x + bw * 0.15, b.y + bh / 2);
        ctx.lineTo(b.x + bw * 0.85, b.y + bh / 2);
        ctx.strokeStyle = `rgba(${colors.fg},0.45)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  },
};

const sketches: Record<ProjectSketchKind, SketchDef<unknown>> = {
  walk: walk as unknown as SketchDef<unknown>,
  sort: sort as unknown as SketchDef<unknown>,
  ship: ship as unknown as SketchDef<unknown>,
  chat: chat as unknown as SketchDef<unknown>,
};

// the walk accumulates trails, so soften its canvas edges into the page
const walkMask =
  "radial-gradient(ellipse 80% 80% at 50% 50%, black 45%, transparent 92%)";

const ProjectSketch = ({ kind }: { kind: ProjectSketchKind }) => {
  const canvasRef = useSketchCanvas(sketches[kind]);
  const mask =
    kind === "walk"
      ? { maskImage: walkMask, WebkitMaskImage: walkMask }
      : undefined;
  return (
    <canvas
      ref={canvasRef}
      className="w-24 h-16 sm:w-28 sm:h-20 shrink-0"
      style={mask}
      aria-hidden="true"
    />
  );
};

export default ProjectSketch;
