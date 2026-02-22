// app/juridisk/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { getContentBySlug, getAllContent } from "@/lib/content-loader.server";
import { ErrorBoundary } from "@/components/error-boundary";
import { MarkdownRendererWithToc } from "@/components/markdown/md-renderer-with-toc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate all possible paths at build time
export async function generateStaticParams() {
  try {
    const { items } = await getAllContent("juridisk");
    return items.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error(
      "[generateStaticParams] Failed to load juridisk content:",
      error,
    );
    return [];
  }
}

// Generate metadata with error handling
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const document = await getContentBySlug("juridisk", slug);

    if (!document) {
      return {
        title: "Ikke funnet | Juridisk",
        description: "Dokumentet finnes ikke",
      };
    }

    const { frontmatter } = document;

    return {
      title: frontmatter.title ? `${frontmatter.title} | Juridisk` : "Juridisk",
      description: frontmatter.description || "Juridisk dokumentasjon",
      authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
      keywords: frontmatter.keywords,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: "article",
        publishedTime: frontmatter.date,
        authors: frontmatter.author,
      },
    };
  } catch (error) {
    console.error("[generateMetadata] Error:", error);
    return {
      title: "Juridisk",
      description: "Juridisk informasjon",
    };
  }
}

// Loading skeleton for Suspense
function JuridiskSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 bg-muted rounded w-3/4 mb-4" />
      <div className="h-4 bg-muted rounded w-1/2 mb-8" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}

// Main page component with error boundary
export default async function JuridiskPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <ErrorBoundary context="juridisk" slug={slug}>
      <Suspense fallback={<JuridiskSkeleton />}>
        <JuridiskContent slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Separate async component for data fetching
async function JuridiskContent({ slug }: { slug: string }) {
  let document;

  try {
    document = await getContentBySlug("juridisk", slug);
  } catch (error) {
    console.error(`[JuridiskContent] Error loading ${slug}:`, error);
    notFound();
  }

  if (!document) {
    notFound();
  }

  return (
    <MarkdownRendererWithToc
      breadcrumbs={[
        { label: "Hjem", href: "/" },
        { label: "Juridisk", href: "/juridisk" },
        { label: document?.frontmatter?.title ?? "Ukjent tittel" },
      ]}
      frontmatter={document.frontmatter}
      content={document.rawContent}
    />
  );
}
