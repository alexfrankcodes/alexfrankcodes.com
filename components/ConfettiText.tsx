"use client";

import { useRef } from "react";

interface ConfettiTextProps {
  children: React.ReactNode;
  className?: string;
}

// Rainbow tuned per theme: bright pastels read well on the dark grounds,
// deeper tones hold up on the light ones. Each includes the theme accent's hue.
const RAINBOW_DARK = [
  "248,113,113", // coral
  "251,191,36", // amber
  "52,211,153", // emerald
  "56,189,248", // sky
  "167,139,250", // violet
  "244,114,182", // pink
];
const RAINBOW_LIGHT = [
  "220,38,38",
  "217,119,6",
  "5,150,105",
  "2,132,199",
  "124,58,237",
  "219,39,119",
];

// Wraps an inline phrase and pops a small confetti burst out of it on
// hover or tap. Particles are cleaned up when their animation ends, and
// skipped entirely under prefers-reduced-motion.
const ConfettiText = ({ children, className }: ConfettiTextProps) => {
  const hostRef = useRef<HTMLSpanElement>(null);
  const lastBurst = useRef(0);

  const burst = () => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    if (now - lastBurst.current < 350) return;
    lastBurst.current = now;

    const colors = document.documentElement.classList.contains("light")
      ? RAINBOW_LIGHT
      : RAINBOW_DARK;

    for (let i = 0; i < 18; i++) {
      const p = document.createElement("span");
      const w = 3 + Math.random() * 4;
      const h = 2 + Math.random() * 3;
      p.style.cssText = [
        "position:absolute",
        `left:${10 + Math.random() * 80}%`,
        "top:40%",
        `width:${w}px`,
        `height:${h}px`,
        `background:rgba(${colors[i % colors.length]},${0.7 + Math.random() * 0.3})`,
        `border-radius:${Math.random() < 0.3 ? "50%" : "1px"}`,
        "pointer-events:none",
      ].join(";");
      p.setAttribute("aria-hidden", "true");
      host.appendChild(p);

      const angle = -Math.PI * (0.15 + Math.random() * 0.7);
      const speed = 36 + Math.random() * 54;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      const rot = (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360);
      const anim = p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${dx * 0.7}px, ${dy}px) rotate(${rot * 0.5}deg)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(${dx}px, ${dy * 0.1 + 44}px) rotate(${rot}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 750 + Math.random() * 450,
          easing: "cubic-bezier(0.16, 0.66, 0.42, 1)",
        }
      );
      anim.onfinish = () => p.remove();
    }
  };

  return (
    <span
      ref={hostRef}
      onMouseEnter={burst}
      onClick={burst}
      className={`relative inline-block ${className ?? ""}`}
    >
      {children}
    </span>
  );
};

export default ConfettiText;
