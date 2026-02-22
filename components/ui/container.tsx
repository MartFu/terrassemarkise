import React from "react";
import { cn } from "@/lib/utils";

// ─── Bleed ────────────────────────────────────────────────────────────────────

type BleedSide =
  | "horizontal"
  | "vertical"
  | "both"
  | "left"
  | "right"
  | "top"
  | "bottom";

type BleedAmount =
  | number
  | "full"
  | {
      left?: number | "full";
      right?: number | "full";
      top?: number | "full";
      bottom?: number | "full";
    };

interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Which sides bleed. Ignored when amount is an object (sides are inferred from the keys). */
  sides?: BleedSide;
  /**
   * Bleed amount.
   * - number  → Tailwind spacing units (1 = 0.25rem)
   * - "full"  → full viewport bleed via `calc(50% - 50vw)` (horizontal only unless sides includes vertical)
   * - object  → per-side control; keys present determine which sides bleed
   */
  amount?: BleedAmount;
  /**
   * When true the element stretches edge-to-edge but its children are
   * re-contained to the original column width via compensating padding.
   * Useful for full-bleed background sections.
   */
  backgroundOnly?: boolean;
  /** Tailwind background-color class, e.g. "bg-indigo-50" */
  backgroundColor?: string;
}

function toRem(units: number) {
  return `${units * 0.25}rem`;
}

/**
 * Returns inline styles that produce the requested bleed for a single axis.
 * Uses the `calc(50% - 50vw)` trick so it works regardless of container width
 * and doesn't rely on `position: relative` shenanigans.
 */
function fullBleedStyles(sides: BleedSide): React.CSSProperties {
  const h =
    sides === "horizontal" ||
    sides === "both" ||
    sides === "left" ||
    sides === "right";
  const v =
    sides === "vertical" ||
    sides === "both" ||
    sides === "top" ||
    sides === "bottom";

  const styles: React.CSSProperties = {};

  if (h) {
    const bleedLeft = sides === "right" ? undefined : "calc(50% - 50vw)";
    const bleedRight = sides === "left" ? undefined : "calc(50% - 50vw)";

    if (bleedLeft !== undefined) styles.marginLeft = bleedLeft;
    if (bleedRight !== undefined) styles.marginRight = bleedRight;
    styles.width = "100vw";
    styles.maxWidth = "100vw";
  }

  if (v) {
    const bleedTop = sides === "bottom" ? undefined : "calc(50% - 50vh)";
    const bleedBottom = sides === "top" ? undefined : "calc(50% - 50vh)";

    if (bleedTop !== undefined) styles.marginTop = bleedTop;
    if (bleedBottom !== undefined) styles.marginBottom = bleedBottom;
  }

  return styles;
}

/**
 * Returns inline styles for a fixed numeric bleed.
 * Relies on CSS custom properties so the Tailwind negative-margin utilities
 * (`-ml-(--bleed-left)` etc.) resolve correctly in Tailwind v4.
 * In Tailwind v3 projects swap the utilities for `style={{ marginLeft: -value }}`.
 */
function fixedBleedStyles(
  amount: number,
  sides: BleedSide,
): React.CSSProperties {
  const v = toRem(amount);
  switch (sides) {
    case "left":
      return { "--bleed-left": v } as React.CSSProperties;
    case "right":
      return { "--bleed-right": v } as React.CSSProperties;
    case "top":
      return { "--bleed-top": v } as React.CSSProperties;
    case "bottom":
      return { "--bleed-bottom": v } as React.CSSProperties;
    case "horizontal":
      return { "--bleed-x": v } as React.CSSProperties;
    case "vertical":
      return { "--bleed-y": v } as React.CSSProperties;
    case "both":
      return { "--bleed-all": v } as React.CSSProperties;
  }
}

function objectBleedStyles(
  amount: Exclude<BleedAmount, number | "full">,
): React.CSSProperties {
  const styles: React.CSSProperties = {};

  const resolve = (val: number | "full", dimension: "h" | "v") =>
    val === "full"
      ? dimension === "h"
        ? "calc(50% - 50vw)"
        : "calc(50% - 50vh)"
      : `-${toRem(val)}`;

  if (amount.left !== undefined) styles.marginLeft = resolve(amount.left, "h");
  if (amount.right !== undefined)
    styles.marginRight = resolve(amount.right, "h");
  if (amount.top !== undefined) styles.marginTop = resolve(amount.top, "v");
  if (amount.bottom !== undefined)
    styles.marginBottom = resolve(amount.bottom, "v");

  // If any horizontal side bled, we need to widen the element
  if (amount.left !== undefined || amount.right !== undefined) {
    const leftRem =
      amount.left === "full"
        ? "50vw"
        : amount.left !== undefined
          ? toRem(amount.left)
          : "0px";
    const rightRem =
      amount.right === "full"
        ? "50vw"
        : amount.right !== undefined
          ? toRem(amount.right)
          : "0px";
    styles.width = `calc(100% + ${leftRem} + ${rightRem})`;
    styles.maxWidth = "none";
  }

  return styles;
}

// Tailwind v4 utility classes for fixed numeric bleeds
const fixedBleedClasses: Record<BleedSide, string> = {
  left: "-ml-(--bleed-left)",
  right: "-mr-(--bleed-right)",
  top: "-mt-(--bleed-top)",
  bottom: "-mb-(--bleed-bottom)",
  horizontal: "-mx-(--bleed-x)",
  vertical: "-my-(--bleed-y)",
  both: "-m-(--bleed-all)",
};

export const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(
  function Bleed(
    {
      children,
      className,
      sides = "horizontal",
      amount = "full",
      backgroundOnly = false,
      backgroundColor,
      style,
      ...props
    },
    ref,
  ) {
    if (
      process.env.NODE_ENV === "development" &&
      backgroundOnly &&
      amount !== "full"
    ) {
      console.warn(
        "[Bleed] `backgroundOnly` is designed for full-bleed sections. " +
          "With a numeric or object `amount` the compensating padding may be inaccurate.",
      );
    }

    const { bleedStyle, bleedClass } = React.useMemo<{
      bleedStyle: React.CSSProperties;
      bleedClass: string;
    }>(() => {
      if (amount === "full") {
        return { bleedStyle: fullBleedStyles(sides), bleedClass: "" };
      }

      if (typeof amount === "number") {
        return {
          bleedStyle: fixedBleedStyles(amount, sides),
          bleedClass: fixedBleedClasses[sides],
        };
      }

      // object
      return { bleedStyle: objectBleedStyles(amount), bleedClass: "" };
    }, [amount, sides]);

    /**
     * For backgroundOnly mode we compensate with padding so the children
     * remain at the original container width. This is pure CSS — no
     * ResizeObserver or getComputedStyle needed.
     *
     * For a full horizontal bleed the compensating padding equals
     * `calc(50vw - 50%)` on each side.
     */
    const innerStyle = React.useMemo<React.CSSProperties>(() => {
      if (!backgroundOnly) return {};

      if (amount === "full") {
        // Mirror the bleed outward so content is re-centered
        return {
          paddingLeft: "calc(50vw - 50%)",
          paddingRight: "calc(50vw - 50%)",
        };
      }

      if (typeof amount === "number") {
        const v = toRem(amount);
        if (sides === "horizontal" || sides === "both")
          return { paddingLeft: v, paddingRight: v };
        if (sides === "left") return { paddingLeft: v };
        if (sides === "right") return { paddingRight: v };
      }

      return {};
    }, [backgroundOnly, amount, sides]);

    return (
      <div
        ref={ref}
        className={cn(bleedClass, backgroundColor, className)}
        style={{ ...bleedStyle, ...style }}
        {...props}
      >
        {backgroundOnly ? <div style={innerStyle}>{children}</div> : children}
      </div>
    );
  },
);

Bleed.displayName = "Bleed";

// ─── Container ────────────────────────────────────────────────────────────────

/**
 * Responsive centered container.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="section" maxWidth="960px">…</Container>
 *   <Container fluid>…</Container>
 */

type ContainerOwnProps = {
  children?: React.ReactNode;
  className?: string;
  /** Removes the max-width cap. */
  fluid?: boolean;
  /** Draws a red border around the container — handy during layout work. */
  debug?: boolean;
  /** CSS max-width value, e.g. "1440px" or "90rem". */
  maxWidth?: string;
  /**
   * Responsive horizontal padding expressed as Tailwind utility strings.
   * Defaults give comfortable gutters at every breakpoint.
   */
  paddingX?: {
    default?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
};

/**
 * Polymorphic Container props.
 *
 * The `ref` is typed as `React.Ref<React.ElementRef<T>>` so callers get a
 * precise ref type when they supply `as`. We include it here rather than
 * relying on forwardRef so the generic is never erased.
 */
export type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  ref?: React.Ref<React.ComponentRef<T>>;
} & ContainerOwnProps &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ContainerOwnProps | "as" | "ref"
  >;

const DEFAULT_PADDING_X: Required<NonNullable<ContainerOwnProps["paddingX"]>> =
  {
    default: "px-4",
    sm: "px-4",
    md: "md:px-10",
    lg: "lg:px-16",
    xl: "xl:px-20",
  };

/**
 * Responsive centered container with polymorphic `as` prop.
 *
 * Uses a plain function (no forwardRef) so the generic T is never erased by
 * TypeScript. The ref is accepted as a regular prop, which works natively in
 * React 19 and can be wired manually in React 18 via `(props.ref as …)`.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="section" maxWidth="960px">…</Container>
 *   <Container as="main" ref={myRef} fluid>…</Container>
 */
export function Container<T extends React.ElementType = "div">({
  as,
  ref,
  children,
  className,
  fluid = false,
  debug = false,
  maxWidth = "1440px",
  paddingX,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as React.ElementType;
  const px = { ...DEFAULT_PADDING_X, ...paddingX };

  return (
    <Component
      ref={ref}
      className={cn(
        "mx-auto w-full",
        px.default,
        px.sm,
        px.md,
        px.lg,
        px.xl,
        !fluid && "max-w-(--container-max)",
        debug && "outline-2 outline-red-500 outline-offset-2",
        className,
      )}
      style={{ "--container-max": maxWidth } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}

Container.displayName = "Container";
