import HeroSection from "@/components/hero-section";
import ScribbleLink from "@/components/scribble-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactForm from "../components/contact-form";
import ProjectCard from "../components/project-card";
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="E-commerce Platform"
                description="A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration."
                image="/placeholder.webp"
                link="https://github.com"
                tags={["Next.js", "Prisma", "Stripe"]}
              />
              <ProjectCard
                title="Task Management System"
                description="A real-time task management application with team collaboration features."
                image="/placeholder.webp"
                link="https://github.com"
                tags={["React", "Node.js", "Socket.io"]}
              />
              <ProjectCard
                title="AI Chat Interface"
                description="An AI-powered chat interface with natural language processing capabilities."
                image="/placeholder.webp"
                link="https://github.com"
                tags={["OpenAI", "Next.js", "TailwindCSS"]}
              />
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
