"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8"
      >
        <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.85] sm:leading-[0.8] font-bold tracking-tighter text-center uppercase mix-blend-difference text-foreground">
          Stefan
          <br />
          Raath
        </h1>
        <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-4 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="h-[1px] w-6 sm:w-8 md:w-12 bg-foreground/50"
          />
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-xs sm:text-sm md:text-xl font-medium tracking-wider sm:tracking-widest uppercase text-muted-foreground whitespace-nowrap"
          >
            Product Engineer
          </motion.span>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="h-[1px] w-6 sm:w-8 md:w-12 bg-foreground/50"
          />
        </div>
      </motion.div>

      {/* Abstract decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] border border-foreground/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[20vw] h-[20vw] border border-foreground/5 rounded-full blur-[80px]" />
      </div>
    </section>
  );
}
