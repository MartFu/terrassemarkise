import { defineProduct } from "@/lib/products/config";
import { MASTER_DATA } from "@/lib/products/master.data";
import { Product } from "@/lib/products/types";

// ============================================================================
// PRODUCT CATALOG
// ============================================================================

/**
 * ### PRODUCT CONFIGURATION GUIDE
 * ===========================
 *
 * To add a new product:
 * 1. Copy an existing product block (everything between { and })
 * 2. Change the values inside
 * 3. Make sure every line ends with a comma (,)
 *
 * HELPFUL TIPS:
 * - Press Ctrl+Space to see available options
 * - Red squiggly lines mean something is wrong - hover for details
 * - Motors/controls/sensors must match names from MASTER_DATA
 * - Colors to exclude must be written exactly as they appear in MASTER_DATA
 *
 * SAFETY CHECKS:
 * - TypeScript will warn if you misspell a motor name
 * - TypeScript will warn if you exclude a color that doesn't exist
 * - TypeScript will warn if you forget required fields
 */
export const products: Product[] = [
  // ============================================================
  // JAMAICA
  // ============================================================
  defineProduct({
    name: "Jamaica",
    slug: "jamaica",

    tagline: "Allsidig terrassemarkise med fleksible tilvalg",
    description:
      "En robust terrassemarkise som kan monteres mot vegg eller i tak. " +
      "Kan leveres med toppdeksel som beskytter mot nedbør og nedsenkbar frontkappe. " +
      "Med pulverlakkert aluminiumskonstruksjon og teflonbehandlet akrylduk er " +
      "Jamaica et solid valg for enhver terrasse.",
    images: [
      {
        src: "/assets/product-images/jamaica_profile.png",
        alt: "Jamaica terrassemarkise i profil",
        isFeatured: true,
      },
    ],
    priceFrom: 8152,

    type: "standard",

    excludedFabrics: [],

    maxWidth: 700,
    maxProjection: 360,
    projections: [160, 210, 260, 310, 360],
    fallAngle: "5-40",
    minWidth: "Projeksjon + 50 cm",

    windRating: "Opptil 15 m/s",
    deliveryTime: "4-7 uker",
    warranty: "5 år",

    // Optional features - remove line if not applicable
    hasDropdownFront: true,
    hasTopCover: true,
    // hasLedLighting is omitted (defaults to false)

    // Component selection - use keys from MASTER_DATA
    motors: ["dooyaM45", "somfyLT", "somfyWT", "somfyRTS", "somfyIO"],
    controls: ["situioRTS", "smooveRTS", "situioIO", "amyIO", "elko", "blebox"],
    sensors: ["eolis3d", "eolisWire", "eolisRTS"],

    // Exclusions - which colors/fabrics are NOT available
    excludedColors: ["RAL 9005", "RAL 9005"],
    // excludedFabrics omitted (all fabrics available)

    highlights: [
      "Monteres mot vegg eller i tak",
      "Toppdeksel og nedsenkbar front som tilvalg",
      "Flest motoralternativer - 5 valg",
      "Bred fallvinkel: 5-40 grader",
    ],

    specOverrides: {
      // hiddenSpecs: ["hasCassette"],
    },
  }),

  // ============================================================
  // CORSICA
  // ============================================================
  defineProduct({
    name: "Corsica",
    slug: "corsica",

    tagline: "Kassettmarkise med full beskyttelse og LED-belysning",
    description:
      "En robust kassett-terrassemarkise med elegant design. Duken lagres i " +
      "en lukket kassett som beskytter mot støv og alle typer nedbør. Med en " +
      "bredere fallvinkel og mulighet for LED-belysning er Corsica et utmerket " +
      "valg for den kvalitetsbevisste.",
    images: [
      {
        src: "/assets/product-images/corsica_profile.png",
        alt: "Corsica terrassemarkise i profil",
        isFeatured: true,
      },
    ],
    priceFrom: 14845,

    type: "cassette",

    maxWidth: 700,
    maxProjection: 360,
    projections: [160, 210, 260, 310, 360],
    fallAngle: "5-50",
    minWidth: "Projeksjon + 50 cm",

    windRating: "Opptil 15 m/s",
    deliveryTime: "4-7 uker",
    warranty: "5 år",

    hasLedLighting: true,
    // hasDropdownFront and hasTopCover omitted (default false)

    motors: ["dooyaM45", "somfyLT", "somfyWT", "somfyRTS", "somfyIO"],
    controls: ["situioRTS", "smooveRTS", "situioIO", "amyIO", "elko", "blebox"],
    sensors: ["eolis3d", "eolisWire", "eolisRTS"],

    excludedColors: ["RAL 9005"],

    highlights: [
      "Lukket kassett beskytter duken helt",
      "LED-belysning som tilvalg",
      "Bredere fallvinkel: 5-50 grader",
      "Flest motoralternativer - 5 valg",
    ],
  }),

  // ============================================================
  // PALLADIO
  // ============================================================
  defineProduct({
    name: "Palladio",
    slug: "palladio",

    tagline: "Eksklusivt kassettdesign med trådløs Somfy IO-motor",
    description:
      "Vår mest eksklusive kassett-terrassemarkise med et sofistikert design. " +
      "Leveres med Somfy IO-motor for fullverdig trådløs styring via app, " +
      "fjernkontroll og smarthjem-integrasjon. Ekstra konstruksjonsfarge " +
      "(RAL 9005) tilgjengelig uten pristillegg.",
    images: [
      {
        src: "/assets/product-images/palladio_profile.png",
        alt: "Palladio terrassemarkise i profil",
        isFeatured: true,
      },
    ],
    priceFrom: 17394,

    type: "cassette",

    maxWidth: 700,
    maxProjection: 360,
    projections: [160, 210, 260, 310, 360],
    fallAngle: "5-50",
    minWidth: "Projeksjon + 50 cm",

    windRating: "Opptil 12 m/s",
    deliveryTime: "4-7 uker",
    warranty: "5 år",

    // No optional features - all default to false

    // Only IO motor for premium
    motors: ["somfyIO"],
    controls: ["situioIO", "amyIO"],
    sensors: ["eolis3d", "eolisWire"],

    // No excluded colors - gets all 6 including RAL 9005
    excludedColors: [],

    highlights: [
      "Eksklusivt kassettdesign",
      "Somfy IO trådløs motor inkludert",
      "6 konstruksjonsfarger uten pristillegg",
      "Full app- og smarthjem-styring",
    ],
  }),
] as const;

// ============================================================================
// TYPE EXPORTS (Auto-generated, do not edit)
// ============================================================================

export type ProductId = (typeof products)[number]["id"];
export type ProductSlug = (typeof products)[number]["slug"];
export type ProductName = (typeof products)[number]["name"];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getProductBySlug(slug: ProductSlug): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: ProductId): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByType(
  type: keyof typeof MASTER_DATA.TYPES,
): Product[] {
  return products.filter((p) => p.type === type);
}
