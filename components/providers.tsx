"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { NoiseOverlay } from "@/components/noise-overlay";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll>
        <CustomCursor />
        <NoiseOverlay />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
