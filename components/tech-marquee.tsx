"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Figma",
  "Three.js",
];

export default function TechMarquee() {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="relative flex w-full flex-col gap-4">
        <MarqueeItem direction="left" speed={20}>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="mx-8 text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground/20 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </MarqueeItem>
        <MarqueeItem direction="right" speed={25}>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="mx-8 text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground/20 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </MarqueeItem>
      </div>
    </section>
  );
}

function MarqueeItem({
  children,
  direction = "left",
  speed = 20,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex shrink-0 items-center"
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
