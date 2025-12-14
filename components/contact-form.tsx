"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "../app/actions";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "scrambling" | "beaming" | "success"
  >("idle");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Scramble visual state
  const [displayState, setDisplayState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (status === "idle") {
      setDisplayState(formState);
    }
  }, [formState, status]);

  async function handleSubmit(formData: FormData) {
    if (status !== "idle") return;

    // 1. Start Scramble
    setStatus("scrambling");

    // Scramble effect
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayState((prev) => ({
        name: formState.name
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
        email: formState.email
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
        message: formState.message
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
      }));
      iteration++;
      if (iteration > 20) {
        clearInterval(intervalRef.current);
        startBeam(formData);
      }
    }, 50);
  }

  async function startBeam(formData: FormData) {
    // 2. Beam
    setStatus("beaming");

    // Actually submit in background
    try {
      await submitContactForm(formData);
    } catch (e) {
      console.error(e);
      // Even if fail, for this demo we show success or we could show glitch error
    }

    // 3. Success after delay
    setTimeout(() => {
      setStatus("success");
    }, 800);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-24 px-4 relative min-h-[600px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {status === "idle" || status === "scrambling" ? (
          <motion.div
            key="form"
            exit={{
              scaleX: 3,
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            className="w-full"
          >
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
                  value={
                    status === "scrambling" ? displayState.name : formState.name
                  }
                  onChange={handleInputChange}
                  readOnly={status === "scrambling"}
                  className={cn(
                    "border-0 border-b border-border bg-transparent px-0 py-6 text-2xl md:text-4xl rounded-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20 font-mono",
                    status === "scrambling" && "text-blue-500"
                  )}
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
                  value={
                    status === "scrambling"
                      ? displayState.email
                      : formState.email
                  }
                  onChange={handleInputChange}
                  readOnly={status === "scrambling"}
                  className={cn(
                    "border-0 border-b border-border bg-transparent px-0 py-6 text-2xl md:text-4xl rounded-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20 font-mono",
                    status === "scrambling" && "text-blue-500"
                  )}
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
                  value={
                    status === "scrambling"
                      ? displayState.message
                      : formState.message
                  }
                  onChange={handleInputChange}
                  readOnly={status === "scrambling"}
                  className={cn(
                    "min-h-[150px] border-0 border-b border-border bg-transparent px-0 py-6 text-xl md:text-2xl rounded-none resize-none focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/20 font-mono",
                    status === "scrambling" && "text-blue-500"
                  )}
                />
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full md:w-auto text-xl md:text-2xl py-8 px-12 rounded-full uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  variant="outline"
                >
                  {status === "idle" ? "Send Message" : "Intializing Uplink..."}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : null}

        {status === "beaming" && (
          <motion.div
            key="beam"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-[2px] bg-blue-500 shadow-[0_0_50px_rgba(59,130,246,1)]" />
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[15vw] leading-none font-bold tracking-tighter text-blue-600 mix-blend-difference"
            >
              SIGNAL
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[15vw] leading-none font-bold tracking-tighter text-blue-600 mix-blend-difference"
            >
              RECEIVED
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 font-mono text-sm uppercase tracking-widest text-muted-foreground"
            >
              Stand by for transmission response.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                setStatus("idle");
                setFormState({ name: "", email: "", message: "" });
              }}
              className="mt-12 text-xs uppercase tracking-widest underline hover:text-blue-500"
            >
              Send another transmission
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
