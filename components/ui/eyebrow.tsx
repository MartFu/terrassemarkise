import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const eyebrowVariants = cva(
  "inline-flex items-center uppercase tracking-[0.1em]",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        inverse: "text-background/80",
        accent: "text-accent",
      },
      size: {
        sm: "text-[0.625rem] gap-1.5",
        default: "text-[0.65rem] gap-2",
        lg: "text-[0.7rem] gap-2.5",
        xl: "text-[0.75rem] gap-2.5",
      },
      style: {
        default: "",
        pill: "bg-primary/10 text-primary px-3 py-1 rounded-full tracking-[0.05em] normal-case font-medium",
        line: "before:content-[''] before:w-8 before:h-px before:bg-current",
        dot: "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      style: "default",
    },
  },
);

function Eyebrow({
  className,
  variant,
  size,
  style,
  ref,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof eyebrowVariants>) {
  return (
    <span
      ref={ref}
      className={cn(eyebrowVariants({ variant, size, style }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

Eyebrow.displayName = "ContentLockup";

export { Eyebrow, eyebrowVariants };
