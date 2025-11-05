import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Canada Travel Blog",
  description: "Stories, photos, and tips from the Canada trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}>
        <div className="border-b border-zinc-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Canada Travel Blog
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-zinc-700 hover:text-zinc-900">
                Home
              </Link>
              <Link href="/new" className="text-zinc-700 hover:text-zinc-900">
                New Post
              </Link>
            </div>
          </nav>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
