import { cn } from "@/lib/utils";
import React from "react";
import { Heading } from "./typography";

import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva(
  // Base styles
  "relative w-full",
  {
    variants: {
      // Visual style variations
      variant: {
        default: "bg-background text-foreground",
        muted: "bg-muted/50 text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        dark: "bg-slate-900 text-slate-50",
        gradient: "bg-gradient-to-br from-background via-muted to-background",
        dotPattern:
          "bg-background [&::before]:absolute [&::before]:inset-0 [&::before]:opacity-[0.03] [&::before]:bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] [&::before]:bg-[size:24px_24px] [&::before]:pointer-events-none",
        grid: "bg-background [&::before]:absolute [&::before]:inset-0 [&::before]:opacity-[0.02] [&::before]:bg-[linear-gradient(to_right,_#00000_1px,_transparent_1px),linear-gradient(to_bottom,_#00000_1px,_transparent_1px)] [&::before]:bg-[size:4rem_4rem] [&::before]:pointer-events-none",
      },

      // Spacing variations
      spacing: {
        none: "",
        xs: "py-6 md:py-8",
        sm: "py-8 md:py-12",
        md: "py-12 md:py-24",
        lg: "py-14 md:py-32 lg:py-40",
        xl: "py-16 md:py-40 lg:py-52",
      },

      // Container width variations
      container: {
        none: "",
        sm: "px-4 sm:px-6 lg:px-8",
        md: "px-4 sm:px-8 lg:px-12",
        lg: "px-4 sm:px-12 lg:px-16 xl:px-24",
        full: "px-0",
      },

      // Border/separator variations
      border: {
        none: "",
        top: "border-t border-border",
        bottom: "border-b border-border",
        both: "border-y border-border",
      },

      // Overflow behavior
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        clip: "overflow-clip",
      },

      // Min height variations
      minHeight: {
        none: "",
        screen: "min-h-screen flex items-center",
        "75": "min-h-[75vh] flex items-center",
        "50": "min-h-[50vh] flex items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "md",
      container: "none",
      border: "none",
      overflow: "visible",
      minHeight: "none",
    },
  },
);

export interface SectionProps
  extends
    React.PropsWithChildren<React.ComponentProps<"section">>,
    VariantProps<typeof sectionVariants> {
  id?: string;
  ariaLabel?: string;
  // Allow nested container constraints
  innerContainer?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Section({
  className,
  children,
  id = "",
  ariaLabel = "",
  variant,
  spacing,
  container,
  border,
  overflow,
  minHeight,
  innerContainer = "none",
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants({
          variant,
          spacing,
          container,
          border,
          overflow,
          minHeight,
        }),
        className,
      )}
      id={id}
      aria-label={ariaLabel}
    >
      {/* Optional inner container constraint */}
      {innerContainer !== "none" ? (
        <div
          className={cn(
            "mx-auto",
            innerContainer === "sm" && "max-w-2xl",
            innerContainer === "md" && "max-w-3xl",
            innerContainer === "lg" && "max-w-4xl",
            innerContainer === "xl" && "max-w-6xl",
            innerContainer === "2xl" && "max-w-7xl",
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export function SectionLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-4 text-xs font-medium uppercase tracking-[0.2em] bg-accent text-accent-foreground py-0.5 px-3 rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mb-16 max-w-2xl md:mb-20", className)} {...props} />
  );
}

export function SectionTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <Heading
      level="h2"
      impact={"high"}
      className={cn("text-balance font-normal tracking-tight", className)}
      {...props}
    />
  );
}

export function SectionDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
        className,
      )}
      {...props}
    />
  );
}
