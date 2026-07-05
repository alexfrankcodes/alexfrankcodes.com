"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  v: number;
  amber: boolean;
  life: number;
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

const WindField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let t = Math.random() * 100;
    let visible = true;
    let particles: Particle[] = [];
    let bg = "";
    let fog = "";
    let amber = "";

    const rgb = (token: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim()
        .split(/\s+/)
        .join(",");

    const readColors = () => {
      bg = rgb("--background");
      fog = rgb("--foreground");
      amber = rgb("--accent");
    };

    const clear = () => {
      ctx.fillStyle = `rgb(${bg})`;
      ctx.fillRect(0, 0, width, height);
    };

    const seed = () => {
      const count = Math.round(
        Math.min(420, Math.max(150, (width * height) / 1800))
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        v: 0.5 + Math.random() * 1.1,
        amber: Math.random() < 0.07,
        life: Math.random() * 400,
      }));
    };

    const step = () => {
      t += 0.0035;
      ctx.fillStyle = `rgba(${bg},0.075)`;
      ctx.fillRect(0, 0, width, height);
      for (const p of particles) {
        const a = fieldAngle(p.x, p.y, t);
        const nx = p.x + Math.cos(a) * p.v * 2.1;
        const ny = p.y + Math.sin(a) * p.v * 2.1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = p.amber
          ? `rgba(${amber},0.6)`
          : `rgba(${fog},0.16)`;
        ctx.lineWidth = p.amber ? 1.4 : 1;
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        p.life--;
        if (
          p.x < -5 ||
          p.x > width + 5 ||
          p.y < -5 ||
          p.y > height + 5 ||
          p.life < 0
        ) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 200 + Math.random() * 400;
        }
      }
    };

    const frame = () => {
      step();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && !reduced && visible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColors();
      clear();
      seed();
      if (reduced) {
        for (let i = 0; i < 200; i++) step();
      }
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      stop();
      resize();
      start();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    intersectionObserver.observe(canvas);

    // theme switches swap the CSS variables; restart the trails in new colors
    const themeObserver = new MutationObserver(() => {
      readColors();
      clear();
      if (reduced) {
        for (let i = 0; i < 200; i++) step();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

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
