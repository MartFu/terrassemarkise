import { MetadataRoute } from "next";
import { products } from "@/innhold/produkter/catalog";
import fs from "fs";
import path from "path";
import { parseNorwegianDate, slugify } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? "https://terassemarkise.no")
      : "http://localhost:3000";

  const getEntriesFromMarkdown = (folderPath: string, routePrefix: string) => {
    const fullPath = path.join(process.cwd(), folderPath);
    if (!fs.existsSync(fullPath)) return [];

    return fs
      .readdirSync(fullPath)
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map((file) => {
        const filePath = path.join(fullPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        // Extract frontmatter using regex
        const frontmatterMatch = content.match(/---\s*([\s\S]*?)\s*---/);
        const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : "";

        // Simple key-value parser for frontmatter
        const metadata: Record<string, string> = {};
        frontmatterStr.split("\n").forEach((line) => {
          const [key, ...value] = line.split(":");
          if (key && value.length) {
            metadata[key.trim()] = value
              .join(":")
              .trim()
              .replace(/^["']|["']$/g, "");
          }
        });

        // Slug logic: Title -> Metadata Slug -> Filename
        const rawSlug =
          metadata.slug || metadata.title || file.replace(/\.mdx?$/, "");
        const finalSlug = slugify(rawSlug);

        // Date logic: Check 'date' or 'publishedAt'
        const rawDate = metadata.date || metadata.publishedAt;

        return {
          url: `${baseUrl}${routePrefix}/${finalSlug}`,
          lastModified: parseNorwegianDate(rawDate),
        };
      });
  };

  const productEntries = products.map((product) => ({
    url: `${baseUrl}/produkter/${product.slug}`,
    lastModified: new Date(),
  }));

  const productCategoryEntries = products.map((product) => ({
    url: `${baseUrl}/produkter/terrassemarkiser/${product.slug}`,
    lastModified: new Date(),
  }));

  const articleEntries = getEntriesFromMarkdown(
    "innhold/ressurser/artikler",
    "/ressurser/artikler",
  );
  const legalEntries = getEntriesFromMarkdown("innhold/juridisk", "/juridisk");

  const staticPages = [
    "",
    "/produkter",
    "/ressurser",
    "/produkter",
    "/juridisk",
    "/kontakt",
    "/om-oss",
    "/produkter/tilbehor",
    "/produkter/duk-og-farger",
    "/produkter/terassemarkiser",
    "/produkter/tilbehor",
    "/produkter/duk-og-farger",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const getPriority = (url: string) => {
    if (url.endsWith("no")) return 1.0;
    if (url.includes("/produkter/")) return 0.9;
    if (url.includes("/artikler/")) return 0.7;
    return 0.5;
  };

  const staticEntries = staticPages.map((p) => ({
    ...p,
    priority: getPriority(p.url),
    changeFrequency: "weekly" as const,
  }));

  const productEntriesMapped = productEntries.map((p) => ({
    ...p,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const productCategoryEntriesMapped = productCategoryEntries.map((p) => ({
    ...p,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const articleEntriesMapped = articleEntries.map((p) => ({
    ...p,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const legalEntriesMapped = legalEntries.map((p) => ({
    ...p,
    priority: 0.3,
    changeFrequency: "never" as const,
  }));

  return [
    ...staticEntries,
    ...productEntriesMapped,
    ...productCategoryEntriesMapped,
    ...articleEntriesMapped,
    ...legalEntriesMapped,
  ];
}
