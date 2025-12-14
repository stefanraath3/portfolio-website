import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BotIdClient } from "botid/client";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const protectedRoutes = [{ path: "/", method: "POST" }];

export const metadata: Metadata = {
  title: "Stefan Raath - Product Engineer",
  description: "Product engineer portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-blue-600 selection:text-white",
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
