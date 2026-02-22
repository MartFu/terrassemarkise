import { formatPrice } from "@/lib/utils";
import { createComparisonData, Product } from "@/lib/products/types";
import { SITE_URLS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

import { ComparisonRowDef, StaticComparisonData } from "@/lib/comparison";
import { products } from "./catalog";
import { SPEC_CATALOG } from "@/lib/products/spec-catalog";

export const productComparisonTableMetadata = {
  footer: {
    note: "Vi forsøker å holde tabellen oppdatert, men tar forbehold om eventuelle feil og mangler som følge av utdaterte data.",
  },
};

export const comparisonData = createComparisonData([
  // --- Pris ---
  {
    label: "Pris fra",
    description:
      "Sluttsummen vil variere avhengig av konfigurasjon, tilleggsvalg og hvorvidt du ønsker å installere markisen på egenhånd",
    category: "Pris",
    getValue: (p) => formatPrice(p.priceFrom),
  },

  // --- Dimensjoner ---
  {
    label: "Maks bredde",
    category: "Dimensjoner",
    getValue: (p) => `${p.maxWidth} cm`,
  },
  {
    label: "Maks projeksjon",
    getValue: (p) => `${p.maxProjection} cm`,
  },
  {
    label: "Fallvinkel",
    description: "Større vinkel gir bedre fleksibilitet for plassering",
    getValue: (p) => `${p.fallAngle}\u00B0`,
  },

  // --- Farge ---
  {
    label: "Konstruksjon",
    category: "Farge",
    description: "Fargealternativer på markisens ramme og øvrig kontruksjon",
    getValue: (p) => `${p.constructionColors} valg`,
    tooltip: (p) =>
      p.name === "Jamaica" || p.name === "Corsica"
        ? `${p.name} er ikke tilgjengelig i RAL9005`
        : undefined,
    action: {
      type: "link",
      label: "Se farger",
      icon: ArrowUpRight,
      path: (p) => `${SITE_URLS.ACCESSORIES}/${p.slug}`,
    },
  },
  {
    label: "Duk",
    description: "Fargealternativer på markisens duk",
    getValue: (p) => `${p.fabricOptions} valg`,
    action: {
      type: "link",
      label: "Se farger",
      icon: ArrowUpRight,
      path: (p) => `${SITE_URLS.ACCESSORIES}/${p.slug}`,
    },
  },

  // --- Konstruksjon ---
  {
    label: "Kassett",
    category: "Konstruksjon",
    description:
      "Kassett beskytter duken mot støv, nedbør og UV-stråling når markisen er innrullet",
    getValue: (p) => p.hasCassette,
  },
  {
    label: "Toppdeksel",
    description: "Tilgjengelig for modeller uten kassett",
    getValue: (p) => p.hasTopCover,
  },
  {
    label: "Nedsenkbar frontkappe",
    description: "Gir ekstra skygge og ly ved lav sol",
    getValue: (p) => p.hasDropdownFront,
  },
  {
    label: "LED-belysning",
    description: "Integrert belysning for kveldshygge på terrassen",
    getValue: (p) => p.hasLedLighting,
  },
  {
    label: "Qualicoat sertifisert",
    description: "Europeisk standard for overflatebehandling av aluminium",
    getValue: (p) => p.qualicoat,
  },

  // --- Vindklasse ---
  {
    label: "Vindklasse",
    category: "Vind & vaer",
    description: "Maks vindstyrke markisen er godkjent for",
    getValue: (p) => p.windRating,
  },
  {
    label: "Vindsensor tilgjengelig",
    description:
      "Automatisk innrulling ved for sterk vind - en sikkerhetsfunksjon som ikke kan overstyres",
    getValue: (p) => p.windSensors.length > 0,
  },
  {
    label: "Automatisk innrulling",
    description:
      "Markisen trekker seg inn automatisk ved vind, selv når du ikke er hjemme",
    getValue: (p) => p.autoRetractWind,
  },

  // --- Motor & styring ---
  {
    label: "Antall motoralternativer",
    category: "Motor & styring",
    description: "Flere valg gir storre fleksibilitet i pris og funksjonalitet",
    getValue: (p) => `${p.motorOptions.length} valg`,
  },
  {
    label: "Manuell sveiv",
    getValue: () => true,
  },
  {
    label: "Kablet motor",
    description: "Styres med veggbryter eller relé, lavere pris",
    getValue: (p) => p.motorOptions.some((m) => m.type === "wired"),
  },
  {
    label: "Tradlos motor (RTS)",
    description: "Fjernkontrollstyring, enklere installasjon",
    getValue: (p) => p.motorOptions.some((m) => m.name === "Somfy RTS"),
  },
  {
    label: "Tradlos motor (IO)",
    description: "Toveis-kommunikasjon, app-styring, mest avansert",
    getValue: (p) => p.motorOptions.some((m) => m.name === "Somfy IO"),
  },

  // --- Smarthjem ---
  {
    label: "App-styring",
    category: "Smarthjem",
    description: "Styr markisen fra mobilen via Somfy Tahoma Switch",
    getValue: (p) => p.supportsAppControl,
  },
  {
    label: "HomeAssistant / Homey",
    description: "Integrer markisen i ditt eksisterende smarthjem-oppsett",
    getValue: (p) => p.supportsHomeAutomation,
  },
  {
    label: "Blebox Shutterbox rele",
    description: "WiFi/BT-relé for app-styring av kablede motorer",
    getValue: (p) => p.controlOptions.some((c) => c.name.includes("Blebox")),
  },

  // --- Garanti & levering ---
  {
    label: "Garanti",
    category: "Garanti & levering",
    getValue: (p) => p.warranty,
  },
  {
    label: "Leveringstid",
    getValue: (p) => p.deliveryTime,
  },
]);

export function createRowsFromProduct(
  products: Product[],
): ComparisonRowDef<Product>[] {
  if (products.length === 0) return [];

  // Get all comparison data from first product to determine rows
  const comparisonData = products[0].getComparisonData();

  return comparisonData.map((row) => ({
    id: row.label,
    label: row.label,
    category: row.category ?? undefined,
    description: row.description ?? undefined,
    getValue: (product) => {
      const data = product
        .getComparisonData()
        .find((r) => r.label === row.label);
      return data?.rawValue;
    },
    renderValue: (_, product) => {
      const data = product
        .getComparisonData()
        .find((r) => r.label === row.label);
      return data?.value ?? "-";
    },
  }));
}

export function generateStaticProductComparisonData(): StaticComparisonData {
  // Determine popular product (e.g., middle one, or by config)
  const popularIndex = Math.floor(products.length / 2);

  const columns = products.map((p, index) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    priceFrom: p.priceFrom,
    typeLabel: p.typeLabel,
    isPopular: index === popularIndex,
  }));

  // Get all comparison specs from catalog
  const comparisonSpecs = SPEC_CATALOG.filter(
    (spec) => spec.showIn.comparison,
  ).sort((a, b) => (a.priority || 99) - (b.priority || 99));

  // Pre-compute ALL values at build time
  const rows = comparisonSpecs.map((spec) => {
    // Get values for each product
    const values = products.map((product) => {
      const specData = product
        .getSpecs("comparison")
        .find((s) => s.id === spec.id);
      return {
        formatted: specData?.value ?? "-",
        raw: specData?.rawValue,
      };
    });

    return {
      id: spec.id,
      label: spec.label,
      category: spec.category,
      description: spec.description,
      values,
    };
  });

  // Extract unique categories in order of appearance
  const categories = [...new Set(rows.map((r) => r.category).filter(Boolean))];

  return {
    columns,
    rows,
    categories,
  };
}
