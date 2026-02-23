// app/ressurser/page.tsx
import Link from "next/link";
import { BookOpen, Video, Wrench } from "lucide-react";
import { getAllContent } from "@/lib/content-loader.server";
import { ErrorBoundary } from "@/components/error-boundary";
import type { ContentIndex, ContentItem } from "@/lib/content-loader.types";
import { Stack } from "@/components/ui/stack";
import {
  ArticlePreviewList,
  SectionRow,
  SectionRow1,
  SectionRow2,
  ToolPreviewList,
  TOOLS,
  VideoPreviewList,
} from "@/components/pages/resources/views/overview";

// ============================================================================
// DATA FETCHING
// ============================================================================

async function getOverviewData(): Promise<{
  artikler: ContentIndex;
  videoer: ContentIndex;
}> {
  const [artikler, videoer] = await Promise.all([
    getAllContent("ressurser/artikler"),
    getAllContent("ressurser/videoer"),
  ]);
  return { artikler, videoer };
}

// ============================================================================
// PAGE (SERVER COMPONENT)
// ============================================================================

export default async function Page() {
  const { artikler, videoer } = await getOverviewData();

  const mockItems = [
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
    {
      slug: "/",
    },
  ];

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="p-4 bg-card/50">
        <h1 className="text-base leading-tight tracking-tight font-semibold text-foreground/80 mb-1">
          Alt du trenger, samlet på ett sted
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Guider, videoer og verktøy som hjelper deg å planlegge, installere og
          vedlikeholde din terrassemarkise.
        </p>
      </div>

      {/* Section rows */}
      <ErrorBoundary context="ressurser">
        <div className="flex flex-col">
          <SectionRow
            href="/ressurser/artikler"
            label="Artikler"
            title="Guider og tips"
            description="Fra planlegging til vedlikehold — finn svar på det du lurer på."
            count={artikler.totalCount}
            countLabel="artikler"
          >
            {mockItems.map((item, idx) => (
              <Link
                key={`article-items-${item.slug}-${idx}`}
                href={`/ressurser/artikler/${item.slug}`}
              >
                <div
                  key={item.slug}
                  className="h-full w-80 transition-colors bg-card/50 hover:bg-card/30 border border-border/40 p-4"
                >
                  <Stack preset="card">
                    <h3 className="text-foreground/70 text-base font-semibold leading-snug tracking-tight">
                      Tool Item {idx + 1}
                    </h3>
                    {item.slug}
                  </Stack>
                </div>
              </Link>
            ))}
          </SectionRow>
          <SectionRow
            href="/ressurser/videoer"
            label="Videoer"
            title="Se det i praksis"
            description="Steg-for-steg monteringsveiledninger og produktgjennomganger."
            count={videoer.totalCount}
            countLabel="videoer"
          >
            {mockItems.map((item, idx) => (
              <Link
                key={`article-items-${item.slug}-${idx}`}
                href={`/ressurser/artikler/${item.slug}`}
              >
                <div
                  key={item.slug}
                  className="h-full w-80 transition-colors bg-card/50 hover:bg-card/30 border border-border/40 p-4"
                >
                  <Stack preset="card">
                    <h3 className="text-foreground/70 text-base font-semibold leading-snug tracking-tight">
                      Tool Item {idx + 1}
                    </h3>
                    {item.slug}
                  </Stack>
                </div>
              </Link>
            ))}
          </SectionRow>
          <SectionRow
            href="/ressurser/verktoy"
            label="Verktøy"
            title="Interaktive hjelpemidler"
            description="Beregnings- og planleggingsverktøy skreddersydd for ditt prosjekt."
            count={TOOLS.length}
            countLabel="verktøy"
          >
            {mockItems.map((item, idx) => (
              <Link
                key={`article-items-${item.slug}-${idx}`}
                href={`/ressurser/artikler/${item.slug}`}
              >
                <div
                  key={item.slug}
                  className="h-full w-80 transition-colors bg-card/50 hover:bg-card/30 border border-border/40 p-4"
                >
                  <Stack preset="card">
                    <h3 className="text-foreground/70 text-base font-semibold leading-snug tracking-tight">
                      Tool Item {idx + 1}
                    </h3>
                    {item.slug}
                  </Stack>
                </div>
              </Link>
            ))}
          </SectionRow>
        </div>
      </ErrorBoundary>
    </div>
  );
}
