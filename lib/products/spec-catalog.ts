import { ProductSpecDisplay } from "@/lib/products/types";

/**
 * SPEC CATALOG
 *
 * Non-developers can edit this to:
 * - Change labels
 * - Show/hide specs in different contexts
 * - Reorder by changing priority numbers
 *
 * The actual data comes from Product, this is purely presentational config
 */
export const SPEC_CATALOG = [
  {
    id: "priceFrom",
    label: "Pris fra",
    category: "Pris",
    description: "Sluttsummen vil variere avhengig av konfigurasjon...",
    format: "price",
    showIn: { specList: true, comparison: true },
    priority: 1,
  },
  {
    id: "maxWidth",
    label: "Maks bredde",
    category: "Dimensjoner",
    description: undefined,
    format: "custom",
    customFormatter: "cm",
    showIn: { specList: true, comparison: true },
    priority: 2,
  },
  {
    id: "maxProjection",
    label: "Maks projeksjon",
    category: "Dimensjoner",
    description: undefined,
    format: "custom",
    customFormatter: "cm",
    showIn: { specList: true, comparison: true },
    priority: 3,
  },
  {
    id: "fallAngle",
    label: "Fallvinkel",
    category: "Dimensjoner",
    description: "Større vinkel gir bedre fleksibilitet for plassering",
    format: "custom",
    customFormatter: "degrees",
    showIn: { specList: true, comparison: true },
    priority: 4,
  },
  {
    id: "hasCassette",
    label: "Kassett",
    category: "Konstruksjon",
    description: "Kassett beskytter duken mot støv, nedbør og UV-stråling...",
    format: "boolean",
    showIn: { specList: true, comparison: true },
    priority: 5,
  },
  {
    id: "constructionColors",
    label: "Konstruksjon",
    category: "Farge",
    description: "Fargealternativer på markisens ramme",
    format: "count",
    showIn: { specList: true, comparison: true },
    priority: 6,
  },
  {
    id: "fabricOptions",
    label: "Duk",
    category: "Farge",
    description: "Fargealternativer på markisens duk",
    format: "count",
    showIn: { specList: true, comparison: true },
    priority: 7,
  },
  {
    id: "motorOptionsCount",
    label: "Antall motoralternativer",
    category: "Motor & styring",
    description: "Flere valg gir større fleksibilitet i pris og funksjonalitet",
    format: "custom",
    customFormatter: "motorCount",
    showIn: { specList: true, comparison: true },
    priority: 8,
  },
  {
    id: "hasWiredMotor",
    label: "Kablet motor",
    category: "Motor & styring",
    description: "Styres med veggbryter eller relé, lavere pris",
    format: "boolean",
    showIn: { specList: false, comparison: true },
    priority: 9,
  },
  {
    id: "hasRTSMotor",
    label: "Trådløs motor (RTS)",
    category: "Motor & styring",
    description: "Fjernkontrollstyring, enklere installasjon",
    format: "boolean",
    showIn: { specList: false, comparison: true },
    priority: 10,
  },
  {
    id: "hasIOMotor",
    label: "Trådløs motor (IO)",
    category: "Motor & styring",
    description: "Toveis-kommunikasjon, app-styring, mest avansert",
    format: "boolean",
    showIn: { specList: false, comparison: true },
    priority: 11,
  },
  {
    id: "supportsAppControl",
    label: "App-styring",
    category: "Smarthjem",
    description: "Styr markisen fra mobilen via Somfy Tahoma Switch",
    format: "boolean",
    showIn: { specList: true, comparison: true },
    priority: 12,
  },
  {
    id: "windRating",
    label: "Vindklasse",
    category: "Vind & vær",
    description: "Maks vindstyrke markisen er godkjent for",
    format: "string",
    showIn: { specList: true, comparison: true },
    priority: 13,
  },
  {
    id: "autoRetractWind",
    label: "Automatisk innrulling",
    category: "Vind & vær",
    description: "Markisen trekker seg inn automatisk ved vind",
    format: "boolean",
    showIn: { specList: true, comparison: true },
    priority: 14,
  },
] as const satisfies readonly ProductSpecDisplay[];
