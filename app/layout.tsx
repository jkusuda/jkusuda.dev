import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { PageShell } from "@/components/page-shell";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "jordan's website", template: "%s - jordan's website" },
  description: "Jordan Kusuda - software engineer. Personal website and portfolio.",
};

// Runs before first paint so the page never flashes ahead of the pug.
const introDecision = `try {
  if (
    location.pathname === "/" &&
    !sessionStorage.getItem("intro-played") &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    sessionStorage.setItem("intro-played", "1");
    document.documentElement.setAttribute("data-intro-playing", "");
  }
} catch {}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introDecision }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
