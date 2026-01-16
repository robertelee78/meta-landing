import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Start With Why | AI-Powered Frontend Development",
  description: "How I build production-ready frontends with AI in hours, not days. A meta landing page showcasing my AI coding workflow.",
  keywords: ["AI coding", "Claude Code", "frontend development", "workflow", "automation"],
  authors: [{ name: "Robert E. Lee", url: "mailto:robert@agidreams.us" }],
  openGraph: {
    title: "Start With Why | AI-Powered Frontend Development",
    description: "Ship with confidence using AI-powered workflows",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="aurora-bg fixed inset-0 pointer-events-none" />
        <div className="grid-pattern fixed inset-0 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
