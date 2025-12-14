"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  // Mouse interaction for background parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Map mouse to small displacement for background blobs
  const blobX = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-50, 50]);
  const blobY = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-50, 50]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  useEffect(() => {
    // Entrance animation logic if needed
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.002" 
              numOctaves="1" 
              result="warp"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="16s" 
                values="0.015 0.002;0.005 0.004;0.015 0.002" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap 
              xChannelSelector="R" 
              yChannelSelector="G" 
              scale="30" 
              in="SourceGraphic" 
              in2="warp" 
            />
          </filter>
        </defs>
      </svg>

      {/* Decorative Gradients with Parallax */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <motion.div 
          style={{ x: blobX, y: blobY }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 relative"
      >
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[-15vh] md:top-[-20vh] left-4 md:left-0 flex items-center gap-2"
        >
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
           <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Online • Based in Digital Realm</span>
        </motion.div>

        {/* Main Title - The Liquid Effect */}
        <div className="relative group cursor-default">
           <motion.h1 
             ref={textRef}
             initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-[16vw] sm:text-[14vw] md:text-[13vw] leading-[0.8] font-bold tracking-tighter text-center uppercase text-foreground mix-blend-difference select-none"
             style={{ 
               filter: "url(#liquid-filter)",
             }}
           >
             Stefan
             <br />
             Raath
           </motion.h1>
           
           {/* Hover reveal or accent */}
           <motion.div
              className="absolute -inset-4 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
              }}
           />
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-12 w-full max-w-4xl flex flex-col md:flex-row justify-between items-end md:items-start gap-8 mix-blend-difference">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-2"
          >
             <p className="text-sm md:text-base font-medium max-w-[200px]">
               Product Engineer crafting high-end digital experiences.
             </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 1 }}
             className="flex flex-col items-end gap-1"
          >
             <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Est. 2025</span>
             <div className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors cursor-pointer group">
               Scroll to explore
               <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
             </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Noise is now handled globally in page.tsx or we can keep a local one for safety. 
          Since I removed the local noise div to rely on page.tsx, I'll stick with that. 
          But wait, I want the noise to be consistent. 
          I'll leave it out here and rely on page.tsx.
      */}
    </section>
  );
}
