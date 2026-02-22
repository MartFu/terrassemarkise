// app/ressurser/artikler/artikler-client.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import type { ContentItem } from "@/lib/content-loader.types";
import { useArticles } from "@/context/resources-provider";

// ============================================================================
// HELPERS
// ============================================================================

function applyFilters(
  items: ContentItem[],
  params: URLSearchParams,
): ContentItem[] {
  let result = items;

  const q = params.get("q");
  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      (item) =>
        item.frontmatter.title?.toLowerCase().includes(lower) ||
        item.frontmatter.description?.toLowerCase().includes(lower) ||
        item.frontmatter.keywords?.some((k) => k.toLowerCase().includes(lower)),
    );
  }

  const kategorier = params.getAll("kategori");
  if (kategorier.length > 0) {
    result = result.filter((item) =>
      kategorier.some((k) => item.frontmatter.keywords?.includes(k)),
    );
  }

  return result;
}

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

function ArticleCard({
  item,
  view,
}: {
  item: ContentItem;
  view: "grid" | "list";
}) {
  const { frontmatter, slug } = item;

  if (view === "list") {
    return (
      <Link
        href={`/ressurser/artikler/${slug}`}
        className="group flex items-start py-4 border-b border-border last:border-0 hover:bg-card/50 -mx-2 px-2 rounded-lg transition-colors"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {frontmatter.title ?? slug}
          </h3>
          {frontmatter.description && (
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {frontmatter.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2">
            {frontmatter.keywords?.slice(0, 2).map((k) => (
              <span
                key={k}
                className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                {k}
              </span>
            ))}
            {frontmatter.date && (
              <span className="text-[11px] text-muted-foreground">
                {new Date(frontmatter.date).toLocaleDateString("nb-NO", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/ressurser/artikler/${slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:bg-card/50 transition-colors"
    >
      <div>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
          {frontmatter.title ?? slug}
        </h3>
        {frontmatter.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {frontmatter.description}
          </p>
        )}
      </div>
      <div className="mt-auto flex items-center gap-2 flex-wrap">
        {frontmatter.keywords?.slice(0, 2).map((k) => (
          <span
            key={k}
            className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded"
          >
            {k}
          </span>
        ))}
        {frontmatter.date && (
          <span className="text-[11px] text-muted-foreground ml-auto">
            {new Date(frontmatter.date).toLocaleDateString("nb-NO", {
              year: "numeric",
              month: "short",
            })}
          </span>
        )}
      </div>
    </Link>
  );
}

function EmptyState({ query }: { query: string | null }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <BookOpen
        className="h-10 w-10 text-muted-foreground/30 mb-4"
        strokeWidth={1.5}
      />
      <p className="text-sm font-medium text-foreground mb-1">
        {query ? "Ingen treff" : "Ingen artikler"}
      </p>
      <p className="text-sm text-muted-foreground">
        {query
          ? `Prøv et annet søkeord enn «${query}»`
          : "Kom tilbake senere for nytt innhold."}
      </p>
    </div>
  );
}

// ============================================================================
// CLIENT COMPONENT
// ============================================================================

export function ClientPage() {
  const { items, totalCount } = useArticles();
  const searchParams = useSearchParams();
  const view: "grid" | "list" =
    searchParams.get("view") === "list" ? "list" : "grid";
  const filtered = applyFilters(items, searchParams);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Artikler
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length === totalCount
            ? `${totalCount} artikler`
            : `${filtered.length} av ${totalCount} artikler`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={searchParams.get("q")} />
      ) : view === "list" ? (
        <div className="max-w-2xl">
          {filtered.map((item) => (
            <ArticleCard key={item.slug} item={item} view="list" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ArticleCard key={item.slug} item={item} view="grid" />
          ))}
        </div>
      )}
    </>
  );
}
