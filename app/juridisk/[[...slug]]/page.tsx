// app/juridisk/[[...slug]]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { getContentBySlug, getAllContent } from "@/lib/content-loader.server";
import { ErrorBoundary } from "@/components/error-boundary";
import { MarkdownRendererWithToc } from "@/components/markdown/md-renderer-with-toc";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/typography";
import { cn, truncate } from "@/lib/utils";
import { SITE_URLS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// Generate all possible paths at build time (index + all slugs)
export async function generateStaticParams() {
  try {
    const { items } = await getAllContent("juridisk");
    return [
      { slug: [] }, // index route
      ...items.map((item) => ({ slug: [String(item.slug)] })),
    ];
  } catch (error) {
    console.error(
      "[generateStaticParams] Failed to load juridisk content:",
      error,
    );
    return [{ slug: [] }];
  }
}

// Generate metadata for both index and slug routes
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    // Index page
    if (!slug || slug.length === 0) {
      return {
        title: "Juridisk dokumentasjon",
        description:
          "Lær om hvordan vi håndterer personvern, cookies og andre juridiske aspekter knyttet til våre tjenester.",
      };
    }

    // Document page
    const document = await getContentBySlug("juridisk", slug[0]);

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

// Main page component
export default async function JuridiskPage({ params }: PageProps) {
  const { slug } = await params;
  const isIndex = !slug || slug.length === 0;

  if (isIndex) {
    return <JuridiskIndex />;
  }

  return (
    <ErrorBoundary context="juridisk" slug={slug[0]}>
      <Suspense fallback={<JuridiskSkeleton />}>
        <JuridiskContent slug={slug[0]} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Index page component
async function JuridiskIndex() {
  const { items: documents, totalCount } = await getAllContent("juridisk");

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Juridisk" }]}
        className="bg-card"
        title="Juridisk dokumentasjon"
        minHeight="min-h-40"
        description="Lær om hvordan vi håndterer personvern, cookies og andre juridiske aspekter knyttet til våre tjenester."
      />

      <Section className="min-h-80vh">
        <Container>
          {totalCount === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                Ingen dokumenter funnet.
              </p>
              <p className="text-sm text-muted-foreground/60">
                Sjekk tilbake senere for oppdatert informasjon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {documents
                .filter((doc) => doc.frontmatter.title)
                .map((doc) => (
                  <Link
                    key={doc.slug}
                    href={SITE_URLS.LEGAL + doc.slug}
                    className={cn(
                      "group w-full px-6 md:px-12 flex flex-wrap items-center border-b justify-between py-6 transition-all hover:bg-card/50",
                    )}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <h2 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground truncate">
                        {doc.frontmatter.title}
                      </h2>
                      {doc.frontmatter.description && (
                        <Text
                          size="sm"
                          color="muted"
                          className="max-w-lg line-clamp-2"
                        >
                          {truncate(doc.frontmatter.description, 100)}
                        </Text>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 ml-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

// Document page component
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
        { label: "Juridisk", href: SITE_URLS.LEGAL },
        { label: document?.frontmatter?.title ?? "Ukjent tittel" },
      ]}
      frontmatter={document.frontmatter}
      content={document.rawContent}
    />
  );
}
