import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexfrankcodes.com"),
  title: {
    default: "Alex Frank | Software Engineer",
    template: "%s | Alex Frank",
  },
  description: "The personal website of Software Engineer Alexander Frank.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Frank | Software Engineer",
    description: "The personal website of Software Engineer Alexander Frank.",
    url: "https://alexfrankcodes.com",
    siteName: "alexfrankcodes.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alex Frank | Software Engineer",
    description: "The personal website of Software Engineer Alexander Frank.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
