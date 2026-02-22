import { formatPrice } from "@/lib/utils";
import { MASTER_DATA } from "./master.data";
import { SPEC_CATALOG } from "./spec-catalog";
import {
  Product,
  ProductImage,
  ProductSpecDisplay,
  ProductSpecItem,
  SpecId,
} from "./types";

type ProductConfigInput = {
  // Core identification
  name: string;
  slug: string;

  // Marketing content
  tagline: string;
  description: string;
  images: ProductImage[];
  priceFrom: number;

  // Classification
  type: keyof typeof MASTER_DATA.TYPES;

  // Technical constraints
  maxWidth: number;
  maxProjection: number;
  projections: readonly number[];
  fallAngle: string;
  minWidth: string;

  // Performance ratings
  windRating: string;
  deliveryTime: string;
  warranty: string;

  // Feature flags
  hasDropdownFront?: boolean;
  hasTopCover?: boolean;
  hasLedLighting?: boolean;

  // Component selection
  motors: readonly (keyof typeof MASTER_DATA.MOTORS)[];
  controls: readonly (keyof typeof MASTER_DATA.CONTROLS)[];
  sensors?: readonly (keyof typeof MASTER_DATA.SENSORS)[];

  // Exclusions
  excludedColors?: readonly (typeof MASTER_DATA.COLORS)[number][];
  excludedFabrics?: readonly (typeof MASTER_DATA.FABRICS)[number][];

  // Marketing
  highlights: readonly string[];

  // SPEC OVERRIDES (optional)
  // Override default spec display for this product only
  specOverrides?: {
    // Hide specific specs for this product
    hiddenSpecs?: SpecId[];
    // Custom values (e.g., "Inkludert" instead of "Ja" for Palladio's IO motor)
    customValues?: Partial<Record<SpecId, string>>;
  };
};

/**
 *
 * **defineProduct - The single entry point for product creation.**
 *
 * This function takes a plain configuration object and transforms it into
 * a full Product. It handles all the type logic internally.
 *
 * Handles:
 * - Validation
 * - Derivation
 * - Product spec generation
 * - Comparison data prep
 *
 *
 *
 * @param config
 */
export function defineProduct(config: ProductConfigInput): Product {
  // Calculate available options
  const availableColors = MASTER_DATA.COLORS.filter(
    (c) => !config.excludedColors?.includes(c),
  );

  const availableFabrics = MASTER_DATA.FABRICS.filter(
    (f) => !config.excludedFabrics?.includes(f),
  );

  // Resolve references to actual objects
  const motorOptions = config.motors.map((k) => MASTER_DATA.MOTORS[k]);
  const controlOptions = config.controls.map((k) => MASTER_DATA.CONTROLS[k]);
  const windSensors = (config.sensors || []).map((k) => MASTER_DATA.SENSORS[k]);

  // Derive capabilities
  const hasWirelessMotor = motorOptions.some((m) => m.type === "wireless");
  const typeInfo = MASTER_DATA.TYPES[config.type];

  const product: Omit<Product, "getSpecs" | "getComparisonData" | "getSpec"> = {
    // Direct passthrough
    id: `product-${config.slug.toLowerCase().replace(/\s+/g, "-")}`,
    name: config.name,
    slug: config.slug,
    tagline: config.tagline,
    description: config.description,
    images: config.images,
    priceFrom: config.priceFrom,

    // Tier info
    type: config.type,
    typeLabel: typeInfo.label,

    // Dimensions
    maxWidth: config.maxWidth,
    maxProjection: config.maxProjection,
    projections: config.projections,
    fallAngle: config.fallAngle,
    minWidth: config.minWidth,

    // Ratings
    windRating: config.windRating,
    deliveryTime: config.deliveryTime,
    warranty: config.warranty,

    // Derived features
    hasCassette: typeInfo.hasCassette,
    hasDropdownFront: config.hasDropdownFront ?? false,
    hasTopCover: config.hasTopCover ?? false,
    hasLedLighting: config.hasLedLighting ?? false,

    // Calculated counts
    constructionColors: availableColors.length,
    fabricOptions: availableFabrics.length,
    qualicoat: true, // Default for all products

    // Resolved components
    motorOptions: motorOptions as any,
    controlOptions: controlOptions as any,
    windSensors: windSensors as any,

    // Derived capabilities
    supportsAppControl: hasWirelessMotor,
    supportsHomeAutomation: hasWirelessMotor,
    autoRetractWind: windSensors.length > 0,

    // Direct passthrough
    highlights: config.highlights,
  };

  return {
    ...product,

    // --- Attach Product Spec Generation

    /**
     * Generate specs for ProductSpecList component
     */
    getSpecs(
      context: "full" | "comparison" | "summary" = "full",
    ): ProductSpecItem[] {
      const overrides = config.specOverrides;

      return SPEC_CATALOG.filter((spec) => {
        // Check context visibility
        if (context === "comparison" && !spec.showIn.comparison) return false;
        if (context === "full" && !spec.showIn.specList) return false;
        // Check product-specific overrides
        if (overrides?.hiddenSpecs?.includes(spec.id)) return false;
        return true;
      })
        .sort((a, b) => (a.priority || 99) - (b.priority || 99))
        .map((spec) => ({
          id: spec.id,
          label: spec.label,
          category: spec.category,
          description: spec.description,
          value: formatSpecValue(spec, product, overrides?.customValues),
          rawValue: getSpecRawValue(spec.id, product),
        }));
    },

    /**
     * Get comparison row data (for comparison table)
     */
    getComparisonData() {
      return this.getSpecs("comparison").map((spec) => ({
        label: spec.label,
        category: spec.category,
        description: spec.description,
        value: spec.value,
        rawValue: spec.rawValue,
      }));
    },

    /**
     * Get single spec value by ID (for quick access)
     */
    getSpec(specId: string) {
      const spec = SPEC_CATALOG.find((s) => s.id === specId);
      if (!spec) return undefined;
      return formatSpecValue(spec, product, config.specOverrides?.customValues);
    },
  };
}

// ============================================================================
// 5. SPEC FORMATTING ENGINE (Private to this module)
// ============================================================================

function getSpecRawValue(
  specId: string,
  product: Omit<Product, "getSpecs" | "getComparisonData" | "getSpec">,
): any {
  switch (specId) {
    case "priceFrom":
      return product.priceFrom;
    case "maxWidth":
      return product.maxWidth;
    case "maxProjection":
      return product.maxProjection;
    case "fallAngle":
      return product.fallAngle;
    case "hasCassette":
      return product.hasCassette;
    case "constructionColors":
      return product.constructionColors;
    case "fabricOptions":
      return product.fabricOptions;
    case "motorOptionsCount":
      return product.motorOptions.length;
    case "hasWiredMotor":
      return product.motorOptions.some((m) => m.type === "wired");
    case "hasRTSMotor":
      return product.motorOptions.some((m) => m.name === "Somfy RTS");
    case "hasIOMotor":
      return product.motorOptions.some((m) => m.name === "Somfy IO");
    case "supportsAppControl":
      return product.supportsAppControl;
    case "windRating":
      return product.windRating;
    case "autoRetractWind":
      return product.autoRetractWind;
    default:
      return undefined;
  }
}

function formatSpecValue(
  spec: ProductSpecDisplay,
  product: Omit<Product, "getSpecs" | "getComparisonData" | "getSpec">,
  // 1. Use Partial<Record<string, string>> to accept the SpecId record
  customValues?: Partial<Record<string, string>>,
): string {
  const rawValue = getSpecRawValue(spec.id, product);

  // 2. Use a safe lookup. If the ID exists in the map, return it.
  // We use a cast here because we've already validated the IDs in the Config type.
  const override = (customValues as Record<string, string> | undefined)?.[
    spec.id
  ];

  if (override) {
    return override;
  }

  // Apply formatter
  switch (spec.format) {
    case "price":
      return formatPrice(rawValue);
    case "boolean":
      return rawValue ? "Ja" : "Nei";
    case "count":
      return `${rawValue} valg`;
    case "string":
      return String(rawValue);
    case "custom":
      return applyCustomFormatter(spec.customFormatter, rawValue);
    default:
      return String(rawValue);
  }
}

function applyCustomFormatter(
  formatter: string | undefined,
  value: any,
): string {
  switch (formatter) {
    case "cm":
      return `${value} cm`;
    case "degrees":
      return `${value}°`;
    case "motorCount":
      return `${value} valg`;
    default:
      return String(value);
  }
}
