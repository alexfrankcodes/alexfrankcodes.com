import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          dark: "#111827",
        },
        foreground: {
          DEFAULT: "#000000",
          dark: "#f1f5f9",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          dark: "#334155",
          foreground: {
            DEFAULT: "#64748b",
            dark: "#e0e0e0",
          },
        },
        accent: {
          DEFAULT: "#22C55E",
          dark: "#EC4899",
          secondary: {
            DEFAULT: "#1e9e4c",
            dark: "#DB2777",
          },
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          dark: "#334155",
          foreground: {
            DEFAULT: "#0f172a",
            dark: "#f1f5f9",
          },
        },
        primary: {
          DEFAULT: "#0f172a",
          dark: "#f1f5f9",
          foreground: {
            DEFAULT: "#f1f5f9",
            dark: "#0f172a",
          },
        },
        ring: {
          DEFAULT: "#22C55E",
          dark: "#cbd5e1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
