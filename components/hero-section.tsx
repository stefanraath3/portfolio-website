"use client";

import { Button } from "@/components/ui/button";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Set up intersection observer to pause animation when out of view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "-10% 0px", // Add a small margin to pause slightly before it's fully out of view
        threshold: 0.1, // Pause when less than 10% is visible
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden h-[90vh] flex items-center justify-center"
    >
      {/* Container for the SplashCursor effect with strict containment */}
      <div className="absolute inset-0 overflow-hidden">
        <SplashCursor
          DENSITY_DISSIPATION={2.5}
          SPLAT_RADIUS={0.3}
          SPLAT_FORCE={8000}
          COLOR_UPDATE_SPEED={15}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          isPaused={!isInView}
        />
      </div>

      {/* Content positioned above the SplashCursor */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center px-4 max-w-7xl mx-auto">
        <div className="space-y-3">
          <h1
            className={cn(
              "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
              "animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both"
            )}
          >
            Product Engineer
          </h1>
          <p
            className={cn(
              "mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400",
              "animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both"
            )}
          >
            Software should be elegant, magical and delightful. I'm a builder
            with a passion for creating beautiful and functional software.
          </p>
        </div>
        <div
          className={cn(
            "space-x-4",
            "animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both"
          )}
        >
          <Link href="https://github.com/stefanraath3" target="_blank">
            <Button
              variant="outline"
              size="icon"
              className="backdrop-blur-sm bg-background/30"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link
            href="https://linkedin.com/in/stefan-raath-65351b201"
            target="_blank"
          >
            <Button
              variant="outline"
              size="icon"
              className="backdrop-blur-sm bg-background/30"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://x.com" target="_blank">
            <Button
              variant="outline"
              size="icon"
              className="backdrop-blur-sm bg-background/30"
            >
              <Image src="/x-logo/logo.svg" alt="X" width={16} height={16} />
              <span className="sr-only">X</span>
            </Button>
          </Link>
          <Link href="mailto:stefanxraath@gmail.com">
            <Button
              variant="outline"
              size="icon"
              className="backdrop-blur-sm bg-background/30"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Visual separator at the bottom of the hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}
