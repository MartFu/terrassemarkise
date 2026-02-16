import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, ElementType } from "react";

// --- Heading ---

const headingVariants = cva("tracking-tight font-semibold text-foreground", {
  variants: {
    level: {
      h1: "text-2xl md:text-3xl lg:text-4xl leading-tight",
      h2: "text-xl md:text-2xl lg:text-3xl leading-tight",
      h3: "text-2xl md:text-3xl leading-snug",
      h4: "text-xl md:text-2xl leading-snug",
      h5: "text-lg md:text-xl leading-snug",
      h6: "text-base md:text-lg leading-snug font-medium",
    },
    impact: {
      default: "",
      high: "font-bold",
      low: "font-normal",
    },
  },
  defaultVariants: {
    level: "h2",
    impact: "default",
  },
});

interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, impact, as, ...props }, ref) => {
    // Logic: Use 'as' if provided, otherwise fallback to 'level', then 'h2'
    const Component = as || (level as ElementType) || "h2";
    return (
      <Component
        ref={ref}
        className={cn(className, headingVariants({ level, impact }))}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

// --- Text ---

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xl: "text-lg md:text-xl leading-relaxed",
      lg: "text-base md:text-lg leading-relaxed",
      base: "text-base leading-relaxed",
      sm: "text-sm leading-relaxed",
      xs: "text-xs leading-relaxed",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
  },
});

interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label";
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, color, as, ...props }, ref) => {
    // Component is already ensured safe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = (as || "p") as any;

    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";
