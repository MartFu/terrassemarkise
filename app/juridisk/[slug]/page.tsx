// app/juridisk/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getPageBySlug, getAllContent } from "@/lib/content-service";
import { ContentPageTemplate } from "@/components/content-page-template";
import { createMetadata } from "@/lib/create-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for juridisk pages
export async function generateStaticParams() {
  try {
    const juridiskItems = await getAllContent("juridisk");
    return juridiskItems.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for juridisk:", error);
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
    const pageData = await getPageBySlug("juridisk", slug);
    const metadata = createMetadata(pageData, slug, "juridisk");

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
      title: "Feil | Juridisk",
      description: "En feil oppsto ved lasting",
    };
  }
}

export default async function JuridiskPage({ params }: PageProps) {
  const { slug } = await params;

  const pageData = await getPageBySlug("juridisk", slug);

  if (!pageData) {
    notFound();
  }

  return (
    <ContentPageTemplate
      frontmatter={pageData.frontmatter}
      contentHtml={pageData.contentHtml}
      contentType="juridisk"
      slug={slug}
    />
  );
}
