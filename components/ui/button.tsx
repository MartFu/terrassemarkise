import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
  Design direction: Skandinavisk friluftsliv møter håndverk
  ─────────────────────────────────────────────────────────
  Palette inspired by bleached linen, warm birch wood, sage lichen,
  and the amber glow of a long Nordic summer evening.

  Typography: assumes a serif like "Lora" or "Fraunces" loaded at the app level
  for the editorial warmth. Falls back to Georgia.

  Textures: a subtle noise grain is baked in via a CSS pseudo-element trick
  on the primary button, giving it a tactile, almost pressed-paper feel.

  Motion: gentle ease-out scale on press — like pressing a wooden stamp into paper.
*/

const buttonVariants = cva(
  // ── Base ──────────────────────────────────────────────────────────────────
  [
    "relative isolate",
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap select-none",
    "font-[Lora,Fraunces,Georgia,serif] font-medium tracking-[0.02em]",
    "text-sm leading-none",
    "rounded",
    "transition-all duration-200 ease-out",
    "cursor-pointer",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#B8834A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97] active:duration-75", // tactile press
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",

    // grain overlay on every button — very faint tactile texture
    "after:content-[''] after:absolute after:inset-0 after:rounded-[inherit]",
    "after:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")]",
    "after:opacity-[0.03] after:mix-blend-overlay after:pointer-events-none",
    "shrink-0",
  ],
  {
    variants: {
      variant: {
        // ── Primary — warm birch amber ──────────────────────────────────────
        default: [
          "bg-primary text-primary-foreground", // toasted birch / linen white
          "shadow-[0_1px_3px_rgba(100,60,20,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "hover:bg-primary/90 hover:shadow-[0_2px_6px_rgba(100,60,20,0.22),inset_0_1px_0_rgba(255,255,255,0.10)]",
        ],

        // ── Outline — linen border, airy ────────────────────────────────────
        outline: [
          "bg-secondary/20 text-foreground hover:text-secondary-foreground", // warm parchment / deep bark
          "border border-secondary/30", // flaxen border
          "shadow-[0_1px_2px_rgba(80,55,30,0.08)]",
          "hover:bg-secondary hover:border-border",
        ],

        // ── Secondary — sage/lichen muted green ──────────────────────────────
        secondary: [
          "bg-secondary text-secondary-foreground", // sage green
          "border",
          "shadow-[0_1px_3px_rgba(50,80,45,0.18),inset_0_1px_0_rgba(255,255,255,0.10)]",
          "hover:bg-secondary/90",
        ],

        // ── Ghost — barely there, like morning mist ──────────────────────────
        ghost: [
          "bg-transparent text-foreground",
          "border-transparent",
          "hover:bg-secondary hover:text-secondary-foreground",
        ],

        // ── Destructive — ember red, still warm ─────────────────────────────
        destructive: [
          "bg-destructive/10 text-destructive-foreground",
          "border-destructive/30",
          "hover:bg-destructive/20",
          "dark:bg-destructive/20",
          "focus-visible:ring-destructive/50",
        ],

        // ── Link — understated editorial underline ───────────────────────────
        link: [
          "text-muted-foreground underline-offset-[3px] decoration-muted-foreground",
          "border-transparent bg-transparent",
          "hover:underline hover:text-foreground",
          "after:hidden",
        ],
      },

      size: {
        default: "h-9 px-4 py-2",
        xs: "h-6 px-2.5 py-1 text-xs rounded-[3px] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-11 px-5 py-2.5 text-[15px] tracking-[0.025em]",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[3px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
