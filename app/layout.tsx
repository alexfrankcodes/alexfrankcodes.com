import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-body",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
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
        className={`${geist.variable} ${geistMono.variable} ${bricolage.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light", "dusk", "dawn", "radar"]}
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
