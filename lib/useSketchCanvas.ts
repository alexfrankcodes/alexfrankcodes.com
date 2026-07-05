"use client";

import { useEffect, useRef } from "react";

export interface SketchColors {
  bg: string;
  fg: string;
  accent: string;
}

export interface SketchDef<S> {
  init: (w: number, h: number) => S;
  step: (
    ctx: CanvasRenderingContext2D,
    state: S,
    w: number,
    h: number,
    colors: SketchColors
  ) => void;
  staticSteps?: number;
}

// Drives a theme-aware canvas sketch: DPR scaling, pause when off-screen or
// the tab is hidden, restart in new colors on theme change, and a static
// pre-run frame under prefers-reduced-motion. The sketch definition must be
// module-level (stable identity) or the effect will re-run every render.
export function useSketchCanvas<S>(sketch: SketchDef<S>) {
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
    let visible = false;
    let state: S;
    const colors: SketchColors = { bg: "", fg: "", accent: "" };

    const rgb = (token: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim()
        .split(/\s+/)
        .join(",");

    const reset = () => {
      colors.bg = rgb("--background");
      colors.fg = rgb("--foreground");
      colors.accent = rgb("--accent");
      ctx.fillStyle = `rgb(${colors.bg})`;
      ctx.fillRect(0, 0, width, height);
      state = sketch.init(width, height);
      if (reduced) {
        for (let i = 0; i < (sketch.staticSteps ?? 200); i++) {
          sketch.step(ctx, state, width, height, colors);
        }
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
      reset();
    };

    const frame = () => {
      sketch.step(ctx, state, width, height, colors);
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

    resize();

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

    const themeObserver = new MutationObserver(() => {
      stop();
      reset();
      start();
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
  }, [sketch]);

  return canvasRef;
}
