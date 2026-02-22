"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Rows = 1 | 2 | 3 | 4 | 5 | 6;
type Gap = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

// Presets describe the same props Grid accepts, minus preset itself.
// Explicit props always win — presets are just defaults.
type GridPreset =
  | "one-col"
  | "two-col"
  | "three-col"
  | "four-col"
  | "sidebar-left"
  | "sidebar-right";

interface GridPresetConfig {
  cols?: Cols | ResponsiveValue<Cols>;
  gap?: Gap | ResponsiveValue<Gap>;
}

const GRID_PRESETS: Record<GridPreset, GridPresetConfig> = {
  // Single column at all sizes
  "one-col": {
    cols: 1,
    gap: 6,
  },
  // 1 col → 2 col at md
  "two-col": {
    cols: { base: 1, md: 2 },
    gap: 8,
  },
  // 1 col → 2 col at sm → 3 col at lg
  "three-col": {
    cols: { base: 1, sm: 2, lg: 3 },
    gap: 8,
  },
  // 1 col → 2 col at sm → 4 col at lg
  "four-col": {
    cols: { base: 1, sm: 2, lg: 4 },
    gap: 6,
  },
  // 1 col → content (8) + sidebar (4) at lg
  "sidebar-left": {
    cols: { base: 1, lg: 12 },
    gap: 8,
  },
  // Same column structure, sidebar on right — use GridItem to assign spans
  "sidebar-right": {
    cols: { base: 1, lg: 12 },
    gap: 8,
  },
};

interface GridProps {
  children: React.ReactNode;
  className?: string;
  preset?: GridPreset;
  cols?: Cols | ResponsiveValue<Cols>;
  gap?: Gap | ResponsiveValue<Gap>;
  container?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: Cols | ResponsiveValue<Cols>;
  rowSpan?: Rows | ResponsiveValue<Rows>;
  colStart?: Cols | ResponsiveValue<Cols>;
  colEnd?: Cols | ResponsiveValue<Cols>;
  rowStart?: Rows | ResponsiveValue<Rows>;
  rowEnd?: Rows | ResponsiveValue<Rows>;
  as?: keyof React.JSX.IntrinsicElements;
}

// ============================================================================
// CLASS MAPS
// ============================================================================

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
} as const;

const gapClasses = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
} as const;

const colSpanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
} as const;

const breakpoints = ["sm", "md", "lg", "xl", "2xl"] as const;

const responsivePrefixes = {
  cols: {
    sm: "sm:grid-cols-",
    md: "md:grid-cols-",
    lg: "lg:grid-cols-",
    xl: "xl:grid-cols-",
    "2xl": "2xl:grid-cols-",
  },
  gap: {
    sm: "sm:gap-",
    md: "md:gap-",
    lg: "lg:gap-",
    xl: "xl:gap-",
    "2xl": "2xl:gap-",
  },
  colSpan: {
    sm: "sm:col-span-",
    md: "md:col-span-",
    lg: "lg:col-span-",
    xl: "xl:col-span-",
    "2xl": "2xl:col-span-",
  },
  rowSpan: {
    sm: "sm:row-span-",
    md: "md:row-span-",
    lg: "lg:row-span-",
    xl: "xl:row-span-",
    "2xl": "2xl:row-span-",
  },
  colStart: {
    sm: "sm:col-start-",
    md: "md:col-start-",
    lg: "lg:col-start-",
    xl: "xl:col-start-",
    "2xl": "2xl:col-start-",
  },
  colEnd: {
    sm: "sm:col-end-",
    md: "md:col-end-",
    lg: "lg:col-end-",
    xl: "xl:col-end-",
    "2xl": "2xl:col-end-",
  },
  rowStart: {
    sm: "sm:row-start-",
    md: "md:row-start-",
    lg: "lg:row-start-",
    xl: "xl:row-start-",
    "2xl": "2xl:row-start-",
  },
  rowEnd: {
    sm: "sm:row-end-",
    md: "md:row-end-",
    lg: "lg:row-end-",
    xl: "xl:row-end-",
    "2xl": "2xl:row-end-",
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function processResponsiveValue<T extends string | number>(
  value: T | ResponsiveValue<T> | undefined,
  staticMap: Record<string, string>,
  prefixMap: Record<string, string>,
): string[] {
  if (value === undefined) return [];

  if (typeof value !== "object") {
    const cls = staticMap[String(value)];
    return cls ? [cls] : [];
  }

  const classes: string[] = [];

  if (value.base !== undefined) {
    const cls = staticMap[String(value.base)];
    if (cls) classes.push(cls);
  }

  breakpoints.forEach((bp) => {
    const val = (value as ResponsiveValue<T>)[bp];
    if (val !== undefined && prefixMap[bp]) {
      classes.push(`${prefixMap[bp]}${val}`);
    }
  });

  return classes;
}

function processPositionalResponsiveValue<T extends string | number>(
  value: T | ResponsiveValue<T> | undefined,
  basePrefix: string,
  prefixMap: Record<string, string>,
): string[] {
  if (value === undefined) return [];

  if (typeof value !== "object") {
    return [`${basePrefix}${value}`];
  }

  const classes: string[] = [];

  if (value.base !== undefined) {
    classes.push(`${basePrefix}${value.base}`);
  }

  breakpoints.forEach((bp) => {
    const val = (value as ResponsiveValue<T>)[bp];
    if (val !== undefined && prefixMap[bp]) {
      classes.push(`${prefixMap[bp]}${val}`);
    }
  });

  return classes;
}

// ============================================================================
// COMPONENTS
// ============================================================================

export const Grid = React.memo(
  ({
    children,
    className,
    preset,
    cols,
    gap,
    container = false,
    as: Component = "div",
  }: GridProps) => {
    const gridClasses = React.useMemo(() => {
      // Explicit props override preset, preset overrides component defaults
      const presetConfig = preset ? GRID_PRESETS[preset] : {};
      const resolvedCols = cols ??
        presetConfig.cols ?? { base: 1, md: 2, lg: 3 };
      const resolvedGap = gap ?? presetConfig.gap ?? 8;

      const classes = ["grid w-full"];
      classes.push(
        ...processResponsiveValue(
          resolvedCols,
          columnClasses,
          responsivePrefixes.cols,
        ),
      );
      classes.push(
        ...processResponsiveValue(
          resolvedGap,
          gapClasses,
          responsivePrefixes.gap,
        ),
      );
      if (container) classes.push("@container");

      return classes.join(" ");
    }, [preset, cols, gap, container]);

    return (
      <Component className={cn(gridClasses, className)} role="grid">
        {children}
      </Component>
    );
  },
);

Grid.displayName = "Grid";

export const GridItem = React.memo(
  ({
    children,
    className,
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    as: Component = "div",
  }: GridItemProps) => {
    const itemClasses = React.useMemo(() => {
      const classes: string[] = [];

      classes.push(
        ...processResponsiveValue(
          colSpan,
          colSpanClasses,
          responsivePrefixes.colSpan,
        ),
      );
      classes.push(
        ...processResponsiveValue(
          rowSpan,
          rowSpanClasses,
          responsivePrefixes.rowSpan,
        ),
      );
      classes.push(
        ...processPositionalResponsiveValue(
          colStart,
          "col-start-",
          responsivePrefixes.colStart,
        ),
      );
      classes.push(
        ...processPositionalResponsiveValue(
          colEnd,
          "col-end-",
          responsivePrefixes.colEnd,
        ),
      );
      classes.push(
        ...processPositionalResponsiveValue(
          rowStart,
          "row-start-",
          responsivePrefixes.rowStart,
        ),
      );
      classes.push(
        ...processPositionalResponsiveValue(
          rowEnd,
          "row-end-",
          responsivePrefixes.rowEnd,
        ),
      );

      return classes.join(" ");
    }, [colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd]);

    return (
      <Component className={cn(itemClasses, className)}>{children}</Component>
    );
  },
);

GridItem.displayName = "GridItem";
