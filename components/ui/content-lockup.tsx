import { cva, VariantProps } from "class-variance-authority";
import { Heading, Text } from "./typography";
import { Eyebrow } from "./eyebrow";
import { cn } from "@/lib/utils";

const contentLockupVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "items-start text-left",
      center: "items-center text-center mx-auto",
      right: "items-end text-right ml-auto",
      left: "items-start text-left mr-auto",
    },
    size: {
      xs: "gap-1.5",
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
      xl: "gap-6",
    },
    width: {
      narrow: "max-w-[40ch]",
      default: "max-w-[55ch]",
      wide: "max-w-[70ch]",
      full: "max-w-none",
    },
    density: {
      tight: "",
      default: "",
      relaxed: "[&>p]:mt-1",
    },
  },
  compoundVariants: [
    {
      variant: "center",
      width: "default",
      class: "max-w-[50ch]",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    width: "default",
    density: "default",
  },
});

const headingSizeMap = {
  xs: "h6" as const,
  sm: "h5" as const,
  default: "h3" as const,
  lg: "h2" as const,
  xl: "h1" as const,
};

const textSizeMap = {
  xs: "xs" as const,
  sm: "sm" as const,
  default: "base" as const,
  lg: "lg" as const,
  xl: "xl" as const,
};

const eyebrowSizeMap = {
  xs: "sm" as const,
  sm: "default" as const,
  default: "default" as const,
  lg: "lg" as const,
  xl: "xl" as const,
};

export interface ContentLockupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentLockupVariants> {
  heading: React.ReactNode;
  paragraph?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  headingProps?: Omit<React.ComponentProps<typeof Heading>, "as" | "level">;
  textProps?: Omit<React.ComponentProps<typeof Text>, "as" | "size">;
  eyebrowProps?: Omit<
    React.ComponentProps<typeof Eyebrow>,
    "children" | "size"
  >;
}

export function ContentLockup({
  className,
  variant,
  size,
  width,
  density,
  heading,
  paragraph,
  eyebrow,
  actions,
  headingProps,
  textProps,
  eyebrowProps,
  ref,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof contentLockupVariants> &
  ContentLockupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const headingLevel = headingSizeMap[size || "default"];
  const textSize = textSizeMap[size || "default"];
  const eyebrowSize = eyebrowSizeMap[size || "default"];

  return (
    <div
      ref={ref}
      className={cn(
        contentLockupVariants({ variant, size, width, density }),
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <Eyebrow
          size={eyebrowSize}
          {...eyebrowProps}
          className={cn(
            "shrink-0",
            variant === "center" && "justify-center",
            variant === "right" && "flex-row-reverse",
            eyebrowProps?.className,
          )}
        >
          {eyebrow}
        </Eyebrow>
      )}

      <Heading
        as={headingLevel}
        level={headingLevel}
        balance="balance"
        {...headingProps}
        className={cn(
          variant === "center" && "mx-auto",
          variant === "right" && "ml-auto",
          headingProps?.className,
        )}
      >
        {heading}
      </Heading>

      {paragraph && (
        <Text
          as="p"
          size={textSize}
          color="muted"
          {...textProps}
          className={cn(
            variant === "center" && "mx-auto text-center",
            variant === "right" && "ml-auto text-right",
            textProps?.className,
          )}
        >
          {paragraph}
        </Text>
      )}

      {actions && (
        <div
          className={cn(
            "flex flex-wrap items-center gap-3 mt-2",
            variant === "center" && "justify-center",
            variant === "right" && "justify-end",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}

ContentLockup.displayName = "ContentLockup";

// --- Specialized Variants ---

export function HeroLockup({
  className,
  ...props
}: Omit<ContentLockupProps, "size">) {
  return (
    <ContentLockup
      size="xl"
      width="wide"
      className={cn("gap-6 md:gap-8", className)}
      {...props}
    />
  );
}

export function SectionLockup({
  className,
  ...props
}: Omit<ContentLockupProps, "size">) {
  return (
    <ContentLockup
      size="lg"
      width="default"
      className={cn("gap-4", className)}
      {...props}
    />
  );
}

export function CardLockup({
  className,
  ...props
}: Omit<ContentLockupProps, "size">) {
  return (
    <ContentLockup
      size="sm"
      width="narrow"
      className={cn("gap-2", className)}
      {...props}
    />
  );
}
