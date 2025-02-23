"use client";

import Link from "next/link";
import React from "react";
import "./scribble-link.css"; // Import our CSS for the scribble path

// We'll define a prop type for clarity.
interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function ScribbleLink({ href, children }: ScribbleLinkProps) {
  return (
    <Link href={href} className="group relative inline-flex items-center">
      <span className="relative z-0 px-3 py-1">{children}</span>
      <svg
        viewBox="0 0 120 40"
        fill="none"
        className="pointer-events-none absolute top-1/2 left-1/2 w-[120%] h-[160%] -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <path
          d="M 8 20 Q 12 5, 60 5 Q 108 5, 112 20 Q 108 35, 60 35 Q 12 35, 8 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scribble-path"
        />
      </svg>
    </Link>
  );
}
