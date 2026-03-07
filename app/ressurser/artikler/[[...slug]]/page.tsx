// app/ressurser/artikler/[[...slug]]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  getContentBySlug,
  getAllContent,
  getContentSiblings,
} from "@/lib/content-loader.server";
import { ErrorBoundary } from "@/components/error-boundary";
import { MarkdownRendererWithToc } from "@/components/markdown/md-renderer-with-toc";
import { SITE_URLS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  try {
    const { items } = await getAllContent("ressurser/artikler");
    return [
      { slug: [] }, // index route
      ...items.map((item) => ({ slug: [String(item.slug)] })),
    ];
  } catch (error) {
    console.error(
      "[generateStaticParams] Failed to load resource content:",
      error,
    );
    return [{ slug: [] }];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Ressurser",
        description: "Ressurser og hjelp",
      };
    }

    const document = await getContentBySlug("ressurser/artikler", slug[0]);

    if (!document) {
      return {
        title: "Ikke funnet | Ressurser",
        description: "Ressurs finnes ikke",
      };
    }

    const { frontmatter } = document;

    return {
      title: frontmatter.title ? `${frontmatter.title} | Ressurs` : "Ressurs",
      description:
        frontmatter.description || frontmatter.excerpt || "Ressurs og hjelp",
      keywords: frontmatter.keywords ?? frontmatter.tags,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description ?? frontmatter.excerpt,
        type: "article",
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.lastUpdated,
        authors: frontmatter?.author,
        images: frontmatter.imageUrl
          ? [{ url: frontmatter.imageUrl }]
          : undefined,
      },
    };
  } catch (error) {
    console.error("[generateMetadata] Error:", error);
    return {
      title: "Ressurs",
      description: "Ressurs og hjelp",
    };
  }
}

function ResourcesSkeleton() {
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  return (
    <ErrorBoundary context="ressurser" slug={slug[0]}>
      <Suspense fallback={<ResourcesSkeleton />}>
        <ResourceContent slug={slug[0]} />
      </Suspense>
    </ErrorBoundary>
  );
}

async function ResourceContent({ slug }: { slug: string }) {
  let document;
  let siblings;

  try {
    document = await getContentBySlug("ressurser/artikler", slug);
  } catch (error) {
    console.error(`[ResourceContent] Error loading ${slug}:`, error);
    notFound();
  }

  if (!document) {
    notFound();
  }

  try {
    siblings = await getContentSiblings("ressurser/artikler", slug, {
      sortBy: "order",
    });
  } catch (error) {
    console.warn(
      `[ResourceContent] Could not load siblings for ${slug}:`,
      error,
    );
    siblings = { previous: null, next: null, currentIndex: 0, total: 0 };
  }

  return (
    <MarkdownRendererWithToc
      breadcrumbs={[
        { label: "Hjem", href: "/" },
        { label: "Ressurser", href: SITE_URLS.RESOURCES },
        {
          label: document.frontmatter?.title
            ? document.frontmatter.title.split(" ").slice(0, 8).join(" ") +
              "..."
            : "Artikkel",
          title: document.frontmatter?.title,
        },
      ]}
      showProgress
      siblings={siblings}
      frontmatter={document.frontmatter}
      content={document.rawContent}
    />
  );
}
