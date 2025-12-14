"use client";

import HeroSection from "@/components/hero-section";
import ProjectGallery from "@/components/project-gallery";
import TechMarquee from "@/components/tech-marquee";
import ContactForm from "@/components/contact-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-600 selection:text-white">
      {/* Minimal Fixed Nav */}
      <nav className="fixed top-0 left-0 w-full p-4 sm:p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto uppercase font-bold tracking-tighter text-base sm:text-lg md:text-xl"
        >
          SR©25
        </Link>
        <div className="flex flex-col items-end gap-0.5 sm:gap-1 pointer-events-auto">
          <a
            href="mailto:stefanraath3@gmail.com"
            className="uppercase text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest hover:underline"
          >
            Contact
          </a>
          <span className="uppercase text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest opacity-50">
            Available for work
          </span>
        </div>
      </nav>

      <HeroSection />

      <div className="relative z-20 bg-background">
        <div className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <p className="text-xl md:text-3xl font-light leading-relaxed max-w-4xl">
            I craft digital experiences that merge{" "}
            <span className="text-blue-600 font-medium">functionality</span>{" "}
            with <span className="text-blue-600 font-medium">aesthetics</span>.
            Based in the digital realm, obsessed with the details that others
            miss.
          </p>
        </div>

        <ProjectGallery />
        <TechMarquee />

        <section className="py-32 bg-background border-t border-border/40">
          <ContactForm />
        </section>

        <footer className="py-8 px-4 md:px-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase font-mono text-muted-foreground">
            © 2025 Stefan Raath. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://github.com/stefanraath3"
              className="text-xs uppercase font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
            </Link>
            <Link
              href="https://linkedin.com/in/stefan-raath-65351b201"
              className="text-xs uppercase font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://x.com"
              className="text-xs uppercase font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              X (Twitter)
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
