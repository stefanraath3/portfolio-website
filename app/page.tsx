import HeroSection from "@/components/hero-section";
import ScribbleLink from "@/components/scribble-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactForm from "../components/contact-form";
import TechStack from "../components/tech-stack";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-6">
          <Link className="flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Stefan Raath
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <ScribbleLink href="#about">About</ScribbleLink>
            <ScribbleLink href="#projects">Projects</ScribbleLink>
            <ScribbleLink href="#contact">Contact</ScribbleLink>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Resume</Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero section with contained SplashCursor effect */}
      <HeroSection />

      <main className="mx-auto max-w-7xl bg-background">
        <div className="px-6">
          <section id="projects" className="py-12 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Projects
            </h2>
            <div className="mx-auto max-w-3xl space-y-6">
              <article className="rounded-lg border border-border/60 bg-muted/5 p-6 transition-colors hover:bg-muted/10">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-xl font-semibold">SentryCode</h3>
                  <Link
                    href="https://www.sentrycodetech.com"
                    target="_blank"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    sentrycodetech.com
                  </Link>
                </div>
                <p className="mt-4 text-sm font-medium italic text-muted-foreground">
                  Synthesizing the present to command the future.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Building the next generation of operational intelligence—AI-powered platforms that fuse real-time, disconnected data into a unified, actionable picture for decision-makers around the world.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Helping organizations master complex challenges and turn insight into lasting advantage.
                </p>
              </article>
              <article className="rounded-lg border border-border/60 bg-muted/5 p-6 transition-colors hover:bg-muted/10">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-xl font-semibold">Phoenix</h3>
                  <Link
                    href="https://www.pnxai.com"
                    target="_blank"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    pnxai.com
                  </Link>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Phoenix automates the entire intelligence workflow with autonomous agents—collecting, reasoning, and acting on data end-to-end so teams can ship decisions at machine speed.
                </p>
              </article>
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Tech Stack
            </h2>
            <TechStack />
          </section>

          <section id="contact" className="py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Stefan Raath. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
