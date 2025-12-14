"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitContactForm } from "../app/actions";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      const response = await submitContactForm(formData);
      setMessage(response.message);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-24 px-4">
      <h2 className="text-[10vw] md:text-[5vw] font-bold leading-[0.8] tracking-tighter uppercase mb-12">
        Let's Talk
      </h2>
      <form action={handleSubmit} className="space-y-12">
        <div className="group">
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 group-focus-within:text-foreground transition-colors"
          >
            01. What's your name?
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="John Doe"
            className="border-0 border-b border-border bg-transparent px-0 py-6 text-2xl md:text-4xl rounded-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20"
          />
        </div>

        <div className="group">
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 group-focus-within:text-foreground transition-colors"
          >
            02. What's your email?
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="border-0 border-b border-border bg-transparent px-0 py-6 text-2xl md:text-4xl rounded-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20"
          />
        </div>

        <div className="group">
          <label
            htmlFor="message"
            className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 group-focus-within:text-foreground transition-colors"
          >
            03. Your message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell me about your project..."
            className="min-h-[150px] border-0 border-b border-border bg-transparent px-0 py-6 text-xl md:text-2xl rounded-none resize-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20"
          />
        </div>

        <div className="pt-8">
          <Button
            type="submit"
            disabled={pending}
            className="w-full md:w-auto text-xl md:text-2xl py-8 px-12 rounded-full uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            variant="outline"
          >
            {pending ? "Sending..." : "Send Message"}
          </Button>
        </div>

        {message && (
          <p className="text-sm font-mono uppercase tracking-widest mt-4 text-muted-foreground">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
