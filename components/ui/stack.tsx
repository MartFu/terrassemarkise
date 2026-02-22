import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const gapClasses = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  28: "gap-28",
  32: "gap-32",
  36: "gap-36",
  40: "gap-40",
  44: "gap-44",
  48: "gap-48",
  52: "gap-52",
  56: "gap-56",
  60: "gap-60",
  64: "gap-64",
  72: "gap-72",
  80: "gap-80",
  96: "gap-96",
} as const;

type GapKey = keyof typeof gapClasses;
type AlignValue = "start" | "center" | "end" | "stretch";
type JustifyValue =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
type DirectionValue = "col" | "row";

type ResponsiveValue<T> =
  | T
  | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; "2xl"?: T };

type ResponsiveGap =
  | GapKey
  | {
      base?: GapKey;
      sm?: GapKey;
      md?: GapKey;
      lg?: GapKey;
      xl?: GapKey;
      "2xl"?: GapKey;
    };

// Presets describe the same props Stack accepts, minus preset itself.
// Explicit props always win — presets are just defaults.
type StackPreset =
  | "row" // horizontal, centered, wrapping — nav items, tag lists
  | "row-between" // horizontal, space-between — toolbar, header
  | "row-between-collapse" // horizontal, space-between — toolbar, header, collapses into column on mobile
  | "row-around" // horizontal, space-around — toolbar, horizontal stack
  | "row-around-collapse" // horizontal, space-around — toolbar, horizontal stack, collapses into column on mobile
  | "center" // vertical stack, centered on both axes
  | "card" // vertical stack with standard card spacing
  | "form" // vertical stack with tight spacing for form fields
  | "inline"; // horizontal, centered, tight — icon + label pairs

interface StackPresetConfig {
  direction?: ResponsiveValue<DirectionValue>;
  align?: ResponsiveValue<AlignValue>;
  justify?: ResponsiveValue<JustifyValue>;
  space?: ResponsiveGap;
  wrap?: boolean;
}

const STACK_PRESETS: Record<StackPreset, StackPresetConfig> = {
  row: {
    direction: "row",
    align: "center",
    justify: "start",
    space: 3,
    wrap: true,
  },
  "row-between": {
    direction: "row",
    align: "center",
    justify: "between",
    space: 4,
    wrap: false,
  },
  "row-between-collapse": {
    direction: {
      base: "col",
      md: "row",
    },
    align: {
      base: "start",
      md: "center",
    },
    justify: {
      base: "start",
      md: "around",
    },
    space: 4,
    wrap: false,
  },
  "row-around": {
    direction: "row",
    align: "center",
    justify: "around",
    space: 4,
    wrap: false,
  },
  "row-around-collapse": {
    direction: {
      base: "col",
      md: "row",
    },
    align: {
      base: "start",
      md: "center",
    },
    justify: {
      base: "around",
      md: "around",
    },
    space: 4,
    wrap: false,
  },
  center: {
    direction: "col",
    align: "center",
    justify: "center",
    space: 4,
  },
  card: {
    direction: "col",
    align: "stretch",
    justify: "start",
    space: 6,
  },
  form: {
    direction: "col",
    align: "stretch",
    justify: "start",
    space: 3,
  },
  inline: {
    direction: "row",
    align: "center",
    justify: "start",
    space: 2,
    wrap: false,
  },
};

export interface StackProps<T extends React.ElementType> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  preset?: StackPreset;
  space?: ResponsiveGap;
  align?: ResponsiveValue<AlignValue>;
  direction?: ResponsiveValue<DirectionValue>;
  wrap?: boolean;
  justify?: ResponsiveValue<JustifyValue>;
}

// ============================================================================
// CLASS MAPS
// ============================================================================

const alignmentClasses: Record<AlignValue, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};
const justifyClasses: Record<JustifyValue, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};
const directionClasses: Record<DirectionValue, string> = {
  col: "flex-col",
  row: "flex-row",
};

const breakpoints = ["sm", "md", "lg", "xl", "2xl"] as const;
type Breakpoint = (typeof breakpoints)[number];

const responsiveAlignPrefix: Record<Breakpoint, string> = {
  sm: "sm:items-",
  md: "md:items-",
  lg: "lg:items-",
  xl: "xl:items-",
  "2xl": "2xl:items-",
};
const responsiveJustifyPrefix: Record<Breakpoint, string> = {
  sm: "sm:justify-",
  md: "md:justify-",
  lg: "lg:justify-",
  xl: "xl:justify-",
  "2xl": "2xl:justify-",
};
const responsiveDirectionPrefix: Record<Breakpoint, string> = {
  sm: "sm:flex-",
  md: "md:flex-",
  lg: "lg:flex-",
  xl: "xl:flex-",
  "2xl": "2xl:flex-",
};
const responsiveGapPrefix: Record<Breakpoint, string> = {
  sm: "sm:gap-",
  md: "md:gap-",
  lg: "lg:gap-",
  xl: "xl:gap-",
  "2xl": "2xl:gap-",
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function processResponsiveValue<T extends string>(
  value: T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; "2xl"?: T },
  staticMap: Record<string, string>,
  responsivePrefix: Record<string, string>,
): string[] {
  if (typeof value === "string") {
    return [staticMap[value]];
  }

  const classes: string[] = [];

  if (value.base !== undefined) {
    classes.push(staticMap[value.base]);
  }

  breakpoints.forEach((bp) => {
    const val = (value as Record<string, string | undefined>)[bp];
    if (val && responsivePrefix[bp]) {
      classes.push(`${responsivePrefix[bp]}${val}`);
    }
  });

  return classes;
}

function processResponsiveGap(space: ResponsiveGap): string[] {
  if (typeof space === "number") {
    return [gapClasses[space as GapKey]];
  }

  const classes: string[] = [];

  if (space.base !== undefined) {
    classes.push(gapClasses[space.base]);
  }

  breakpoints.forEach((bp) => {
    const val = (space as Record<string, GapKey | undefined>)[bp];
    if (val !== undefined && responsiveGapPrefix[bp]) {
      classes.push(`${responsiveGapPrefix[bp]}${val}`);
    }
  });

  return classes;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Stack = React.memo(
  <T extends React.ElementType = "div">({
    as,
    children,
    className,
    preset,
    space,
    align,
    direction,
    wrap,
    justify,
    ...props
  }: StackProps<T> & React.ComponentPropsWithoutRef<T>) => {
    const Component = as || "div";

    const stackClasses = React.useMemo(() => {
      // Explicit props override preset, preset overrides component defaults
      const presetConfig = preset ? STACK_PRESETS[preset] : {};
      const resolvedDirection = direction ?? presetConfig.direction ?? "col";
      const resolvedAlign = align ?? presetConfig.align ?? "stretch";
      const resolvedJustify = justify ?? presetConfig.justify ?? "start";
      const resolvedSpace = space ?? presetConfig.space ?? 4;
      const resolvedWrap = wrap ?? presetConfig.wrap ?? false;

      const classes = ["flex"];
      classes.push(
        ...processResponsiveValue(
          resolvedDirection,
          directionClasses,
          responsiveDirectionPrefix,
        ),
      );
      classes.push(
        ...processResponsiveValue(
          resolvedAlign,
          alignmentClasses,
          responsiveAlignPrefix,
        ),
      );
      classes.push(
        ...processResponsiveValue(
          resolvedJustify,
          justifyClasses,
          responsiveJustifyPrefix,
        ),
      );
      if (resolvedWrap) classes.push("flex-wrap");
      classes.push(...processResponsiveGap(resolvedSpace));

      // Pre-join so cn() receives an opaque string — tailwind-merge cannot
      // inspect or deduplicate the internal responsive classes.
      return classes.join(" ");
    }, [preset, direction, align, justify, wrap, space]);

    return (
      <Component className={cn(stackClasses, className)} {...props}>
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";
