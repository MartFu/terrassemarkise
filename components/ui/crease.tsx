import { cn } from "@/lib/utils";
import React from "react";

type CreasePosition = "top" | "bottom" | "left" | "right";

interface CreaseProps {
  /** Which edge to place the crease */
  position?: CreasePosition;
  /** If true, extends to viewport width (requires parent with position: relative) */
  overflow?: boolean;
  /** Additional Tailwind classes */
  className?: string;

  debug?: boolean;
}

/**
 * Crease - A subtle border component that creates a "pressed paper" effect
 */
export const Crease: React.FC<CreaseProps> = ({
  position = "top",
  overflow = false,
  className = "",
  debug = false,
}) => {
  const debugClassName = debug
    ? "before:bg-red-500/50! dark:before:bg-red-500/50!"
    : "";

  const positionClasses: Record<CreasePosition, string> = {
    top: overflow
      ? `left-1/2 top-0 h-px w-screen -translate-x-1/2 ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0_0.5px_0_rgba(255,255,255,0.5)] dark:shadow-[0_0.5px_0_rgba(255,255,255,0.05)]`
      : `left-0 top-0 h-px w-full ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0_0.5px_0_rgba(255,255,255,0.5)] dark:shadow-[0_0.5px_0_rgba(255,255,255,0.05)]`,

    bottom: overflow
      ? `left-1/2 bottom-0 h-px w-screen -translate-x-1/2 ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0_-0.5px_0_rgba(255,255,255,0.5)] dark:shadow-[0_-0.5px_0_rgba(255,255,255,0.05)]`
      : `left-0 bottom-0 h-px w-full ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0_-0.5px_0_rgba(255,255,255,0.5)] dark:shadow-[0_-0.5px_0_rgba(255,255,255,0.05)]`,

    left: overflow
      ? `left-0 top-1/2 w-px h-screen -translate-y-1/2 ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0.5px_0_0_rgba(255,255,255,0.5)] dark:shadow-[0.5px_0_0_rgba(255,255,255,0.05)]`
      : `left-0 top-0 w-px h-full ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[0.5px_0_0_rgba(255,255,255,0.5)] dark:shadow-[0.5px_0_0_rgba(255,255,255,0.05)]`,

    right: overflow
      ? `right-0 top-1/2 w-px h-screen -translate-y-1/2 ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[-0.5px_0_0_rgba(255,255,255,0.5)] dark:shadow-[-0.5px_0_0_rgba(255,255,255,0.05)]`
      : `right-0 top-0 w-px h-full ${debugClassName} bg-black/10 dark:bg-black/70 shadow-[-0.5px_0_0_rgba(255,255,255,0.5)] dark:shadow-[-0.5px_0_0_rgba(255,255,255,0.05)]`,
  };

  return (
    <span
      className={cn(
        "absolute pointer-events-none",
        className,
        positionClasses[position],
      )}
      aria-hidden="true"
    />
  );
};

type PaddingSize =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

interface CreaseBoxProps {
  /**
   * If you wish to have more granular control,
   * use padY and padX, as these props unset the default
   * pad value
   */
  pad?: PaddingSize;
  padY?: PaddingSize;
  padX?: PaddingSize;
  /** Which sides to show creases on */
  sides?: ("top" | "bottom" | "left" | "right")[];
  /** If true, horizontal creases extend to viewport width */
  overflow?: ("top" | "bottom")[];
  /** Content to render inside */
  children?: React.ReactNode;
  /** Additional classes for the container */
  className?: string;

  debug?: boolean;
}

/**
 * CreaseBox - A box component with creases on all sides
 */
export const CreaseBox: React.FC<CreaseBoxProps> = ({
  pad = "2xl",
  padY,
  padX,
  sides = ["top", "bottom", "left", "right"],
  overflow = [],
  children,
  className = "",
  debug = false,
}) => {
  const py = {
    none: "",
    sm: "py-2",
    md: "py-4",
    lg: "py-6",
    xl: "py-6 md:py-8 lg:py-10",
    "2xl": "py-8 md:py-10 lg:py-12",
    "3xl": "py-9 md:py-12 lg:py-14",
    "4xl": "py-10 md:py-14 lg:py-16",
    "5xl": "py-11 md:py-16 lg:py-18",
    "6xl": "py-12 md:py-18 lg:py-20",
  };

  const px = {
    none: "",
    sm: "px-2",
    md: "px-4",
    lg: "px-4 md:px-6",
    xl: "px-4 md:px-6 lg:px-8",
    "2xl": "px-10",
    "3xl": "px-12",
    "4xl": "px-14",
    "5xl": "px-16",
    "6xl": "px-18",
  };

  const debugClassName = debug
    ? "before:bg-red-500/50! dark:before:bg-red-500/50!"
    : "";

  const leftCreaseClass = sides.includes("left")
    ? `before:absolute before:left-0 before:top-0 before:h-full before:w-px ${debugClassName} before:bg-black/10 dark:before:bg-black/70 before:shadow-[0.5px_0_0_rgba(255,255,255,0.5)] dark:before:shadow-[0.5px_0_0_rgba(255,255,255,0.05)]`
    : "";

  const rightCreaseClass = sides.includes("right")
    ? `after:absolute after:right-0 after:top-0 after:h-full after:w-px ${debugClassName} after:bg-black/10 dark:after:bg-black/70 after:shadow-[-0.5px_0_0_rgba(255,255,255,0.5)] dark:after:shadow-[-0.5px_0_0_rgba(255,255,255,0.05)]`
    : "";

  return (
    <div
      className={cn(
        "relative pointer-events-none",
        leftCreaseClass,
        rightCreaseClass,
        className,
        !padX && !padY && py[pad],
        !padX && !padY && px[pad],
        padY && py[padY],
        padX && px[padX],
      )}
    >
      {sides.includes("top") && (
        <Crease
          debug={debug}
          position="top"
          overflow={overflow.includes("top")}
        />
      )}
      {sides.includes("bottom") && (
        <Crease
          debug={debug}
          position="bottom"
          overflow={overflow.includes("bottom")}
        />
      )}

      {children}
    </div>
  );
};
