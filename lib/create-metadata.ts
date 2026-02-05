import { Metadata } from "next";
import { PageResult } from "./content-service";

export function createMetadata(
  pageData: PageResult | null,
  slug: string,
  type: "veiledning" | "juridisk",
): Metadata {
  if (!pageData) {
    return {
      title: `${type === "veiledning" ? "Veiledning" : "Juridisk dokument"} ikke funnet`,
      description: `Denne ${type === "veiledning" ? "veiledningen" : "juridiske dokumentet"} finnes ikke.`,
    };
  }

  const { frontmatter } = pageData;
  const typeDisplay = type === "veiledning" ? "Veiledning" : "Juridisk";

  return {
    title: `${frontmatter.title || typeDisplay} | ${typeDisplay}`,
    description:
      frontmatter.description || `${typeDisplay.toLowerCase()} dokumentasjon`,
    keywords: frontmatter.keywords,
    authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
    openGraph: {
      title: frontmatter.title || typeDisplay,
      description:
        frontmatter.description || `${typeDisplay.toLowerCase()} dokumentasjon`,
      type: "article",
      publishedTime: frontmatter.date,
      authors: frontmatter.author ? [frontmatter.author] : undefined,
      tags: frontmatter.keywords,
    },
  };
}
