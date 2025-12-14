"use client";

import { useScroll, useTransform, motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SplashCursor } from "@/components/ui/splash-cursor";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function useScrambleText(finalText: string, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState(finalText);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          finalText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return finalText[index];
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= finalText.length) {
          clearInterval(interval);
          setIsComplete(true);
        }

        iteration += 1 / 2;
      }, 40);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalText, startDelay]);

  return { displayText, isComplete };
}

function MagneticText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const { displayText: firstName } = useScrambleText("STEFAN", 800);
  const { displayText: lastName } = useScrambleText("RAATH", 1200);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Fluid simulation background */}
      <div className="absolute inset-0 opacity-60">
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={2}
          VELOCITY_DISSIPATION={1}
          PRESSURE={0.2}
          CURL={20}
          SPLAT_RADIUS={0.35}
          SPLAT_FORCE={4000}
          SHADING={true}
          COLOR_UPDATE_SPEED={8}
          TRANSPARENT={true}
        />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none z-[1]" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale, filter: isMounted ? `blur(${blur.get()}px)` : 'none' }}
        className="z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 relative"
      >
        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-[60vw] max-w-md h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-8 origin-center"
        />

        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">
            Available for work
          </span>
        </motion.div>

        {/* Main name - with scramble effect */}
        <div className="relative">
          <MagneticText>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-bold tracking-[-0.04em] text-center uppercase text-foreground"
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text"
                >
                  {lastName}
                </motion.span>
              </span>
            </motion.h1>
          </MagneticText>

          {/* Floating accent elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute -right-4 sm:-right-8 top-1/4 w-16 h-16 sm:w-24 sm:h-24"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-foreground/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border border-foreground/5 rounded-full"
            />
          </motion.div>
        </div>

        {/* Role/tagline with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 sm:mt-12 flex items-center gap-3 sm:gap-6"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent to-foreground/40 hidden sm:block"
          />
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase text-muted-foreground">
              Product Engineer
            </span>
            <span className="hidden sm:block text-muted-foreground/40">×</span>
            <span className="text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase text-muted-foreground">
              Design Obsessed
            </span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-l from-transparent to-foreground/40 hidden sm:block"
          />
        </motion.div>

        {/* Bottom accent text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-8 text-xs sm:text-sm text-muted-foreground/60 max-w-md text-center font-light tracking-wide"
        >
          Crafting digital experiences at the intersection of
          <span className="text-foreground/80 mx-1">engineering excellence</span>
          and
          <span className="text-foreground/80 mx-1">aesthetic refinement</span>
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>

      {/* Corner accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-8 left-8 z-20 hidden lg:block"
      >
        <div className="w-12 h-px bg-foreground/20" />
        <div className="w-px h-12 bg-foreground/20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-8 right-8 z-20 hidden lg:block"
      >
        <div className="w-12 h-px bg-foreground/20 ml-auto" />
        <div className="w-px h-12 bg-foreground/20 ml-auto" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-8 z-20 hidden lg:block"
      >
        <div className="w-px h-12 bg-foreground/20" />
        <div className="w-12 h-px bg-foreground/20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-8 z-20 hidden lg:block"
      >
        <div className="w-px h-12 bg-foreground/20 ml-auto" />
        <div className="w-12 h-px bg-foreground/20 ml-auto" />
      </motion.div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-blue-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
