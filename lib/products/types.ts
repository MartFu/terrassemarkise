/*============================================================== 

                    WARNING! DO NOT TOUCH 

    Any and all modification of the type system WILL likely lead
    to downstream bugs in one or more components. 


==============================================================*/

import { Image } from "@/lib/types";
import { LucideIcon } from "lucide-react";
import { v4 as uuid } from "uuid";

export type SpecId =
  | "maxWidth"
  | "priceFrom"
  | "maxProjection"
  | "fallAngle"
  | "hasCassette"
  | "constructionColors"
  | "fabricOptions"
  | "motorOptionsCount"
  | "hasWiredMotor"
  | "hasRTSMotor"
  | "hasIOMotor"
  | "supportsAppControl"
  | "windRating"
  | "autoRetractWind";

export type ProductSpecItem = {
  id: SpecId;
  label: string;
  category: string | undefined;
  description: string | undefined;
  value: string;
  rawValue: any;
};

export type ProductComparisonRowData = {
  label: string;
  category: string | undefined;
  description: string | undefined;
  value: string;
  rawValue: any;
};

export type ProductSpecDisplay = {
  id: string;
  label: string;
  category?: string;
  description?: string;
  format: "string" | "boolean" | "price" | "count" | "list" | "custom";
  // For custom formatting, reference a formatter by name
  customFormatter?: "cm" | "degrees" | "motorCount";
  // Visibility in different contexts
  showIn: {
    specList: boolean;
    comparison: boolean;
    filterChips?: boolean;
  };
  // Optional: override default sort order
  priority?: number;
};

export type MotorOption = {
  name: string;
  type: "wired" | "wireless";
  features: string[];
};

export type ControlOption = {
  name: string;
  price?: number;
  requiresMotor: string;
};

export type WindSensorOption = {
  name: string;
  price: number;
  features: string[];
  requiresMotor: string;
};

export type ProductImage = Image & {
  isFeatured?: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  priceFrom: number;
  type: "standard" | "cassette" | "premium";
  typeLabel: string;

  // Dimensions
  maxWidth: number;
  maxProjection: number;
  projections: readonly number[];
  fallAngle: string;
  minWidth: string;

  // Ratings
  windRating: string;
  deliveryTime: string;
  warranty: string;

  // Construction
  hasCassette: boolean;
  hasDropdownFront: boolean;
  hasTopCover: boolean;
  hasLedLighting: boolean;
  constructionColors: number;
  fabricOptions: number;
  qualicoat: boolean;

  // Control
  motorOptions: readonly MotorOption[];
  controlOptions: readonly ControlOption[];
  windSensors: readonly WindSensorOption[];
  supportsAppControl: boolean;
  supportsHomeAutomation: boolean;
  autoRetractWind: boolean;

  // Key selling points
  highlights: readonly string[];

  getSpecs(context?: "full" | "comparison" | "summary"): ProductSpecItem[];
  getComparisonData(): ProductComparisonRowData[];
  getSpec(specId: string): string | undefined;
};

/* For product comparison system */

export type CellTooltip = string | ((product: Product) => string | undefined);

export type RowAction = {
  type: "link" | "toggle" | "modal";
  label: string;
  icon?: LucideIcon;
  onClick?: (product: Product) => void;
  path?: (product: Product) => string;
};

export type ComparisonRow = {
  id: string; // React keys
  label: string;
  description?: string;
  category?: string;

  getValue: (product: Product) => string | number | boolean | undefined;

  // Actions & Info
  action?: RowAction;
  tooltip?: CellTooltip;

  // UI Customization
  renderValue?: (product: Product) => React.ReactNode;
  placeHolder?: string;
};

export type ComparisonRowInput = Omit<ComparisonRow, "id">;
export const createComparisonData = (
  rows: ComparisonRowInput[],
): ComparisonRow[] => {
  return rows.map((row) => ({
    ...row,
    id: uuid(), // Automatic ID gen for react keys
  }));
};

/*============================================================== 

                    END OF DO NOT TOUCH 

==============================================================*/
