import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alex Frank — Software Engineer";

const BACKGROUND = "rgb(10, 13, 18)";
const FOREGROUND = "rgb(231, 235, 242)";
const MUTED = "rgb(139, 149, 166)";
const ACCENT = "rgb(52, 211, 153)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: BACKGROUND,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: ACCENT,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: ACCENT,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: ACCENT,
            }}
          />
          alexfrankcodes.com
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            color: FOREGROUND,
            marginTop: 28,
            letterSpacing: -2,
          }}
        >
          Alex Frank
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: MUTED,
            marginTop: 16,
          }}
        >
          Full-stack software engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
