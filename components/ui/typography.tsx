import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, ElementType } from "react";

// --- Heading (Golden Ratio: 1.618) ---

const headingVariants = cva("tracking-tight", {
  variants: {
    level: {
      // Hero: 61.8px / 38.2px ratio for dramatic impact
      h1: [
        "text-[2.027rem] md:text-[2.566rem] lg:text-[3.247rem] xl:text-[4.11rem] 2xl:text-[5.202rem]",
        "leading-[1.1] lg:leading-[1.05]",
        "font-extrabold",
        "text-foreground",
        "max-w-[20ch]",
        "tracking-[-0.02em]",
      ],
      // Major sections: ~38.2px
      h2: [
        "text-[1.802rem] md:text-[2.027rem] lg:text-[2.566rem] xl:text-[3.247rem]",
        "leading-[1.15] lg:leading-[1.1]",
        "font-bold",
        "text-foreground",
        "max-w-[25ch]",
        "tracking-[-0.015em]",
      ],
      // Sub-sections: ~23.6px
      h3: [
        "text-[1.602rem] md:text-[1.802rem] lg:text-[2.027rem] xl:text-[2.566rem]",
        "leading-[1.2] lg:leading-[1.15]",
        "font-bold",
        "text-foreground",
        "max-w-[30ch]",
        "tracking-[-0.01em]",
      ],
      // Cards/features: ~16.18px (scaled up)
      h4: [
        "text-[1.424rem] md:text-[1.602rem] lg:text-[1.802rem]",
        "leading-[1.25] lg:leading-[1.2]",
        "font-semibold",
        "text-foreground",
        "max-w-[35ch]",
        "tracking-[-0.005em]",
      ],
      // Minor headings: ~14.6px
      h5: [
        "text-[1.266rem] md:text-[1.424rem]",
        "leading-[1.3] lg:leading-[1.25]",
        "font-semibold",
        "text-foreground/90",
        "max-w-[40ch]",
        "tracking-[0]",
      ],
      // Small labels: ~13px
      h6: [
        "text-[1rem] md:text-[1.125rem]",
        "leading-[1.35]",
        "text-foreground/80",
        "tracking-[0.05em]",
        "max-w-[45ch]",
      ],
    },
    impact: {
      default: "",
      high: "text-foreground drop-shadow-sm",
      low: "text-foreground/70 font-medium",
      brand: "text-primary",
    },
    balance: {
      default: "text-wrap",
      pretty: "text-pretty",
      balance: "text-balance",
    },
  },
  defaultVariants: {
    level: "h2",
    impact: "default",
    balance: "balance",
  },
});

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, impact, balance, as, children, ...props }, ref) => {
    const Component = as || (level as ElementType) || "h2";

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, impact, balance }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Heading.displayName = "Heading";

// --- Text (Refined Prose) ---

const textVariants = cva("", {
  variants: {
    size: {
      // Lead paragraph: ~20px
      xl: [
        "text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem]",
        "leading-[1.6] md:leading-[1.7]",
        "max-w-[55ch]",
        "font-normal",
      ],
      // Body large: ~18px
      lg: [
        "text-[1.0625rem] sm:text-[1.125rem]",
        "leading-[1.6] md:leading-[1.65]",
        "max-w-[60ch]",
        "font-normal",
      ],
      // Body: ~16px (base)
      base: [
        "text-[1rem] sm:text-[1.0625rem]",
        "leading-[1.6] md:leading-[1.7]",
        "max-w-[65ch]",
        "font-normal",
      ],
      // Small: ~14px
      sm: [
        "text-[0.875rem] sm:text-[0.9375rem]",
        "leading-[1.5] md:leading-[1.6]",
        "max-w-[70ch]",
        "font-normal",
      ],
      // Caption: ~12px
      xs: [
        "text-[0.75rem] sm:text-[0.8125rem]",
        "leading-[1.4] md:leading-[1.5]",
        "max-w-[75ch]",
        "font-medium",
      ],
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-primary",
      inverse: "text-background",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    variant: {
      default: "",
      prose: "prose-p:my-0", // For markdown content
      lead: "font-light text-foreground/80",
      label: "font-medium tracking-wide",
      code: "font-mono bg-muted px-1.5 py-0.5 rounded text-[0.9em]",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
    align: "left",
    variant: "default",
  },
});

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label" | "strong" | "em" | "small";
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    { className, size, weight, color, align, variant, as, children, ...props },
    ref,
  ) => {
    const Component = (as || "p") as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({ size, weight, color, align, variant }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Text.displayName = "Text";

// --- Display Text (For Hero/Brand moments) ---

const displayVariants = cva("font-sans tracking-tighter", {
  variants: {
    size: {
      huge: [
        "text-[3.052rem] sm:text-[3.815rem] md:text-[4.768rem] lg:text-[5.96rem] xl:text-[7.451rem]",
        "leading-[0.95] tracking-[-0.03em]",
        "font-black",
      ],
      large: [
        "text-[2.441rem] sm:text-[3.052rem] md:text-[3.815rem] lg:text-[4.768rem]",
        "leading-[0.95] tracking-[-0.025em]",
        "font-black",
      ],
      medium: [
        "text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] lg:text-[3.815rem]",
        "leading-[1] tracking-[-0.02em]",
        "font-extrabold",
      ],
    },
    gradient: {
      default: "text-foreground",
      primary:
        "bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent",
      subtle:
        "bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    size: "large",
    gradient: "default",
  },
});

export interface DisplayProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof displayVariants> {
  as?: "h1" | "h2" | "span" | "div";
}

export const Display = forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, size, gradient, as = "h1", children, ...props }, ref) => {
    const Component = as as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(displayVariants({ size, gradient }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Display.displayName = "Display";
