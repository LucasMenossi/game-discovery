import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Discovery",
  description: "Discover and explore video games.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex-1">{children}</div>

        <footer className="border-t px-6 py-6 text-center text-sm text-gray-500">
          Data and images provided by{" "}
          <a
            href="https://rawg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            RAWG
          </a>
          .
        </footer>
      </body>
    </html>
  );
}
