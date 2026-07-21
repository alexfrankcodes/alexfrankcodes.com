"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// swatch colors mirror each theme's background/accent tokens in globals.css
const THEMES = [
  { id: "dark", label: "Night", bg: "#0A0D12", accent: "#34D399" },
  { id: "light", label: "Day", bg: "#FAFAF7", accent: "#1E5AA8" },
];

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-8" aria-hidden="true" />;
  }

  return (
    <div
      className="flex items-center gap-2 h-8"
      role="group"
      aria-label="Color theme"
    >
      {THEMES.map((theme) => {
        const active = resolvedTheme === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            aria-label={`${theme.label} theme`}
            aria-pressed={active}
            title={theme.label}
            className={`w-4 h-4 rounded-full border transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              active
                ? "scale-110 border-accent"
                : "border-border hover:scale-110"
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent} 50%)`,
            }}
          />
        );
      })}
    </div>
  );
}
