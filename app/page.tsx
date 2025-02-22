import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import ContactForm from "./components/contact-form";
import ProjectCard from "./components/project-card";
import TechStack from "./components/tech-stack";

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
            <Link
              href="#about"
              className="transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="transition-colors hover:text-foreground/80"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
          <Button variant="outline">Resume</Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Full Stack Developer
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                text
              </p>
            </div>
            <div className="space-x-4">
              <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">X</span>
                </Button>
              </Link>
              <Link href="mailto:hello@example.com">
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration."
              image="/placeholder.svg?height=400&width=600"
              link="https://github.com"
              tags={["Next.js", "Prisma", "Stripe"]}
            />
            <ProjectCard
              title="Task Management App"
              description="A real-time task management application with team collaboration features."
              image="/placeholder.svg?height=400&width=600"
              link="https://github.com"
              tags={["React", "Node.js", "Socket.io"]}
            />
            <ProjectCard
              title="AI Chat Interface"
              description="An AI-powered chat interface with natural language processing capabilities."
              image="/placeholder.svg?height=400&width=600"
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
