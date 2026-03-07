// app/ressurser/videoer/videoer-client.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayCircle, Video } from "lucide-react";
import type { ContentItem } from "@/lib/content-loader.types";
import { useVideos } from "@/context/resources-provider";

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
        item.frontmatter.description?.toLowerCase().includes(lower),
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

function VideoCard({
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
        href={`/ressurser/videoer/${slug}`}
        className="group flex items-start gap-4 py-4 border-b border-border last:border-0 hover:bg-accent/20 -mx-2 px-2 rounded-lg transition-colors"
      >
        <div className="relative shrink-0 h-14 w-24 rounded-md bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle
              className="h-6 w-6 text-muted-foreground/40"
              strokeWidth={1.5}
            />
          </div>
        </div>
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
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/ressurser/videoer/${slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:bg-accent/30 transition-colors"
    >
      <div className="relative aspect-video bg-muted w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-background/80 p-3 backdrop-blur-sm">
            <PlayCircle
              className="h-8 w-8 text-foreground/60"
              strokeWidth={1.5}
            />
          </div>
        </div>
        {frontmatter.keywords?.[0] && (
          <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-background/80 text-foreground px-1.5 py-0.5 rounded backdrop-blur-sm">
            {frontmatter.keywords[0]}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {frontmatter.title ?? slug}
        </h3>
        {frontmatter.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {frontmatter.description}
          </p>
        )}
      </div>
    </Link>
  );
}

function EmptyState({ query }: { query: string | null }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Video
        className="h-10 w-10 text-muted-foreground/30 mb-4"
        strokeWidth={1.5}
      />
      <p className="text-sm font-medium text-foreground mb-1">
        {query ? "Ingen treff" : "Ingen videoer"}
      </p>
      <p className="text-sm text-muted-foreground">
        {query
          ? `Prøv et annet søkeord enn «${query}»`
          : "Kom tilbake snart for nye videoer."}
      </p>
    </div>
  );
}

// ============================================================================
// CLIENT COMPONENT
// ============================================================================

export function ClientPage() {
  const { items, totalCount } = useVideos();
  const searchParams = useSearchParams();
  const view: "grid" | "list" =
    searchParams.get("view") === "list" ? "list" : "grid";
  const filtered = applyFilters(items, searchParams);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Videoer</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length === totalCount
            ? `${totalCount} videoer`
            : `${filtered.length} av ${totalCount} videoer`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={searchParams.get("q")} />
      ) : view === "list" ? (
        <div className="max-w-2xl">
          {filtered.map((item) => (
            <VideoCard key={item.slug} item={item} view="list" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <VideoCard key={item.slug} item={item} view="grid" />
          ))}
        </div>
      )}
    </>
  );
}
