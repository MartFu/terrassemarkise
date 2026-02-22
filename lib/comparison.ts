import { LucideIcon } from "lucide-react";

type CellValue = string | number | boolean | undefined;

// Generic comparison column (was: Product)
export type ComparisonColumn<T> = {
  id: string;
  name: string;
  data: T; // The underlying data object
};

// Generic row definition
export type ComparisonRowDef<T, V = CellValue> = {
  id: string;
  label: string;
  category?: string;
  description?: string;

  getValue: (data: T) => V;
  renderValue?: (value: V, data: T) => React.ReactNode;

  action?: RowAction<T>;
  tooltip?: string | ((data: T) => string | undefined);
};

export type RowAction<T> = {
  type: "link" | "toggle" | "modal";
  label: string;
  icon?: LucideIcon;
  onClick?: (data: T) => void;
  path?: (data: T) => string;
};

export type StaticComparisonData = {
  columns: Array<{
    id: string;
    name: string;
    slug: string;
    tagline: string;
    priceFrom: number;
    typeLabel: string;
    isPopular: boolean; // determined at build
  }>;

  // Pre-computed rows - no getValue functions, just data
  rows: Array<{
    id: string;
    label: string;
    category?: string;
    description?: string;
    // Values for each column by index
    values: Array<{
      formatted: string;
      raw: unknown;
    }>;
  }>;

  categories: string[]; // unique categories in order
};
