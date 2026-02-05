// app/veiledning/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getPageBySlug } from "@/lib/content-service";
import { ContentPageTemplate } from "@/components/content-page-template";
import { createMetadata } from "@/lib/create-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for veiledning pages
export async function generateStaticParams() {
  const { getAllContent } = await import("@/lib/content-service");

  try {
    const veiledningItems = await getAllContent("veiledning");
    return veiledningItems.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for veiledning:", error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const pageData = await getPageBySlug("veiledning", slug);
    const metadata = createMetadata(pageData, slug, "veiledning");

    // Merge with parent images
    const previousImages = (await parent).openGraph?.images || [];
    return {
      ...metadata,
      openGraph: {
        ...metadata.openGraph,
        images: [...previousImages],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Feil | Veiledning",
      description: "En feil oppsto ved lasting",
    };
  }
}

// Main page component
export default async function VeiledningPage({ params }: PageProps) {
  const { slug } = await params;

  // This is a Server Component, so we can use getPageBySlug
  const pageData = await getPageBySlug("veiledning", slug);

  if (!pageData) {
    notFound();
  }

  return (
    <ContentPageTemplate
      frontmatter={pageData.frontmatter}
      contentHtml={pageData.contentHtml}
      contentType="veiledning"
      slug={slug}
    />
  );
}
