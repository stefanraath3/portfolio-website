"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "SentryCode",
    category: "Operational Intelligence",
    href: "https://www.sentrycodetech.com",
    src: "/placeholder.webp", // Fallback for now, user should replace
    color: "#0000FF", // Electric Blue
  },
  {
    title: "Phoenix",
    category: "Autonomous Agents",
    href: "https://www.pnxai.com",
    src: "/placeholder.webp",
    color: "#FF4D00", // Orange/Red
  },
  {
    title: "Portfolio",
    category: "Design Engineering",
    href: "/",
    src: "/placeholder.webp",
    color: "#00FF94", // Neon Green
  },
];

export default function ProjectGallery() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom cursor for the image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 md:px-8 bg-background z-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-16 ml-2">
          Selected Works (2024-2025)
        </h2>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              target="_blank"
              className="group relative border-t border-border/40 py-12 md:py-20 transition-colors hover:bg-white/5"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative">
                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase transition-transform duration-500 group-hover:-translate-x-4">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 transition-transform duration-500 group-hover:translate-x-4">
                  <span className="text-sm md:text-lg font-light text-muted-foreground group-hover:text-foreground transition-colors">
                    {project.category}
                  </span>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-border/40" />
        </div>
      </div>

      {/* Floating Image Preview */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 w-[300px] h-[400px] z-30 hidden md:block rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: activeProject !== null ? 1 : 0,
          scale: activeProject !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300",
              activeProject === index ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundColor: project.color }} // Fallback color
          >
            {/* 
                  NOTE: Using a colored div as placeholder. 
                  In production, you would use Image component here with project.src 
                */}
            <div className="absolute inset-0 flex items-center justify-center text-black/50 font-bold text-2xl uppercase tracking-widest mix-blend-overlay">
              {project.title}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
