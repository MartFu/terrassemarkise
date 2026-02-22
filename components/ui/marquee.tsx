"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

// #TODO Remember user play/pause preference across all instances of the marquee
export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  fadeOut = false,
  gap = "1rem",
  repeat = 2,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  gap?: string;
  repeat?: number;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background group",
        className,
        fadeOut &&
          !paused &&
          "before:absolute before:pointer-events-none before:left-0 before:inset-y-0 before:w-24 before:z-1 before:bg-linear-to-r before:via-transparent before:from-background before:to-transparent",
        "after:absolute after:pointer-events-none after:right-0 after:inset-y-0 after:w-24 after:z-1 after:bg-linear-to-l after:from-background after:via-transparent after:to-transparent",
      )}
    >
      <button
        aria-label="Spill/ikke spill animasjonen"
        onClick={() => setPaused(!paused)}
        title={paused ? "Spill animasjon" : "Ikke spill animasjonen"}
        className="absolute z-1 p-1 bg-accent text-accent-foreground cursor-pointer rounded top-0 group-hover:opacity-100 opacity-0"
      >
        {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>
      <div
        className={cn("flex w-max", !paused && "animate-marquee")}
        style={{
          gap,
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          ["--marquee-gap" as string]: gap,
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "marquee-item-container",
              "flex! shrink-0!",
              "transition-opacity duration-300",
            )}
            style={{ gap }}
          >
            {children}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / ${repeat} - var(--marquee-gap) / ${repeat}));
          }
        }

        .animate-marquee:hover .marquee-item-container > * {
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }

        .animate-marquee .marquee-item-container:hover > *:hover {
          opacity: 1 !important;
        }

        .animate-marquee {
          animation: marquee linear infinite;
        }

        ${
          pauseOnHover
            ? `
          .relative:hover .animate-marquee {
            animation-play-state: paused !important;
          }
        `
            : ""
        }
      `}</style>
    </div>
  );
}
