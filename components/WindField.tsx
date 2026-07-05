"use client";

import { SketchDef, useSketchCanvas } from "@/lib/useSketchCanvas";

interface Particle {
  x: number;
  y: number;
  v: number;
  amber: boolean;
  life: number;
}

interface WindState {
  parts: Particle[];
  t: number;
}

// direction of the invisible flow field at a point, drifting over time
function fieldAngle(x: number, y: number, t: number) {
  return (
    (Math.sin(x * 0.006 + t * 2) +
      Math.cos(y * 0.0075 - t * 1.4) +
      Math.sin((x + y) * 0.003 + t)) *
    1.05
  );
}

const windSketch: SketchDef<WindState> = {
  staticSteps: 200,
  init(w, h) {
    const count = Math.round(Math.min(420, Math.max(150, (w * h) / 1800)));
    return {
      t: Math.random() * 100,
      parts: Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        v: 0.5 + Math.random() * 1.1,
        amber: Math.random() < 0.07,
        life: Math.random() * 400,
      })),
    };
  },
  step(ctx, s, w, h, colors) {
    s.t += 0.0035;
    ctx.fillStyle = `rgba(${colors.bg},0.075)`;
    ctx.fillRect(0, 0, w, h);
    for (const p of s.parts) {
      const a = fieldAngle(p.x, p.y, s.t);
      const nx = p.x + Math.cos(a) * p.v * 2.1;
      const ny = p.y + Math.sin(a) * p.v * 2.1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = p.amber
        ? `rgba(${colors.accent},0.6)`
        : `rgba(${colors.fg},0.16)`;
      ctx.lineWidth = p.amber ? 1.4 : 1;
      ctx.stroke();
      p.x = nx;
      p.y = ny;
      p.life--;
      if (p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5 || p.life < 0) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.life = 200 + Math.random() * 400;
      }
    }
  },
};

const WindField = () => {
  const canvasRef = useSketchCanvas(windSketch);
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 75% at 50% 45%, black 35%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 75% at 50% 45%, black 35%, transparent 85%)",
      }}
      aria-hidden="true"
    />
  );
};

export default WindField;
