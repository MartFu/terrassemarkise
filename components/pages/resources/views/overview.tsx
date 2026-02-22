"use client";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { ContentItem } from "@/lib/content-loader.types";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  LucideIcon,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useRef } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface SectionRowProps {
  href: string;
  label: string;
  title: string;
  description: string;
  count: number;
  countLabel: string;
}

// ============================================================================
// SECTION ROW
// ============================================================================

export function SectionRow({
  title,
  description,
  href,
  count,
  countLabel,
  children,
}: React.PropsWithChildren<SectionRowProps>) {
  const {
    scrollRef,
    scrollLeft,
    scrollRight,
    scrollToStart,
    handleWheel,
    isAtStart,
    isAtEnd,
    isPastSecondScrollStep,
  } = useHorizontalScroll();

  return (
    <div className="h-90 group relative overflow-hidden relative">
      <div className={`absolute inset-x-0 top-0 h-px bg-border/60`} />

      <div className="h-full w-full flex flex-col gap-2 py-6">
        <div className="flex items-end justify-between border-border/20 px-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-muted-foreground leading-snug mb-1">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-dashed border-border/50 px-4 pb-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-semibold tabular-nums">
                {count}
              </span>{" "}
              {countLabel}
            </p>

            <div className="w-px h-3 bg-muted-foreground" />

            <Link
              href={href}
              className={`inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors`}
            >
              Se alle
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full transition-opacity disabled:opacity-0"
              onClick={scrollToStart}
              disabled={!isPastSecondScrollStep}
              aria-label="Gå til start"
            >
              <ChevronsLeft className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full transition-opacity disabled:opacity-0"
              onClick={scrollLeft}
              disabled={isAtStart}
              aria-label="Scroll venstre"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full transition-opacity disabled:opacity-0"
              onClick={scrollRight}
              disabled={isAtEnd}
              aria-label="Scroll høyre"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="h-full flex flex-row gap-2 pt-4 px-4 overflow-x-auto scrollbar-hide"
        >
          {children}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 bottom-0 group-hover:bottom-2 transition-all flex items-center gap-1 absolute right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded-md border border-border/50 shadow-sm">
        <KbdGroup>
          <Kbd>⇧ shift</Kbd>+<Kbd>scroll</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}

// ============================================================================
// VARIANT 2: Sidebar Layout (Vertical Rail + Horizontal Scroll)
// ============================================================================

export function SectionRow1({
  href,
  label,
  title,
  description,
  count,
  countLabel,
  children,
}: React.PropsWithChildren<SectionRowProps>) {
  const {
    scrollRef,
    scrollLeft,
    scrollRight,
    scrollToStart,
    handleWheel,
    isAtStart,
    isAtEnd,
    isPastSecondScrollStep,
  } = useHorizontalScroll();

  return (
    <div className="group relative overflow-hidden transition-colors hover:border-border/80 border-b">
      {/* <div className="absolute inset-x-0 top-0 h-px bg-border/60" /> */}

      <div className="h-full min-h-70 flex flex-col md:flex-row">
        {/* ── Left rail: identity & meta ── */}
        <div className="flex flex-col justify-between gap-4 p-4 md:w-60 lg:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border bg-card/20">
          {/* Title + description */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-medium">
              {label}
            </span>
            <h2 className="text-sm font-semibold text-foreground leading-snug">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Count + CTA + Controls stacked */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-semibold tabular-nums">
                  {count}
                </span>{" "}
                {countLabel}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                Se alle
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Navigation controls - vertical stack in sidebar */}
            <div className="flex items-center gap-1 pt-2 border-t border-border/50">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-opacity disabled:opacity-30 hover:bg-accent"
                onClick={scrollToStart}
                disabled={!isPastSecondScrollStep}
                aria-label="Gå til start"
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-opacity disabled:opacity-30 hover:bg-accent"
                onClick={scrollLeft}
                disabled={isAtStart}
                aria-label="Scroll venstre"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-opacity disabled:opacity-30 hover:bg-accent"
                onClick={scrollRight}
                disabled={isAtEnd}
                aria-label="Scroll høyre"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: scrollable content area ── */}
        <div className="flex-1 relative min-w-0 bg-background">
          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className="h-full flex flex-row gap-3 p-4 overflow-x-auto scrollbar-hide"
          >
            {children}
          </div>

          {/* Gradient fade indicators */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background to-transparent transition-opacity duration-300",
              isAtStart ? "opacity-0" : "opacity-100",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent transition-opacity duration-300",
              isAtEnd ? "opacity-0" : "opacity-100",
            )}
          />

          {/* Keyboard hint - positioned in content area */}
          <div className="opacity-0 group-hover:opacity-100 bottom-0 group-hover:bottom-2 transition-all flex items-center gap-1 absolute right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded-md border border-border/50 shadow-sm">
            <KbdGroup>
              <Kbd>⇧ shift</Kbd>+<Kbd>scroll</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VARIANT 3: Card-Contained Layout (Island Design)
// ============================================================================

export function SectionRow2({
  href,
  label,
  title,
  description,
  count,
  countLabel,
  children,
}: React.PropsWithChildren<SectionRowProps>) {
  const {
    scrollRef,
    scrollLeft,
    scrollRight,
    scrollToStart,
    handleWheel,
    isAtStart,
    isAtEnd,
    isPastSecondScrollStep,
  } = useHorizontalScroll();

  return (
    <div className="group relative p-4 min-h-40">
      {/* Main card container */}
      <div className="relative rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
        {/* Header row with integrated controls */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-card/30">
          <div className="flex items-center gap-4">
            {/* Icon/label badge */}
            <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="text-xs font-bold">{label.charAt(0)}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-sm font-semibold text-foreground leading-snug">
                  {title}
                </h2>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border/50">
                  {count} {countLabel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                {description}
              </p>
            </div>
          </div>

          {/* Right side: CTA + Navigation */}
          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
            >
              Se alle {countLabel}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-muted/50 border border-border/30">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-all disabled:opacity-30 hover:bg-background"
                onClick={scrollToStart}
                disabled={!isPastSecondScrollStep}
                aria-label="Gå til start"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </Button>
              <div className="w-px h-4 bg-border/50" />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-all disabled:opacity-30 hover:bg-background"
                onClick={scrollLeft}
                disabled={isAtStart}
                aria-label="Scroll venstre"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md transition-all disabled:opacity-30 hover:bg-background"
                onClick={scrollRight}
                disabled={isAtEnd}
                aria-label="Scroll høyre"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="relative">
          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className="flex flex-row gap-3 p-4 overflow-x-auto scrollbar-hide"
          >
            {children}
          </div>

          {/* Scroll indicators */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-card/90 to-transparent transition-opacity duration-300",
              isAtStart ? "opacity-0" : "opacity-100",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card/90 to-transparent transition-opacity duration-300",
              isAtEnd ? "opacity-0" : "opacity-100",
            )}
          />
        </div>

        {/* Footer hint */}
        <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 px-4 py-2 border-t border-border/30 bg-muted/20 text-[11px] text-muted-foreground">
          <span>Naviger med</span>
          <KbdGroup>
            <Kbd>Shift</Kbd>+<Kbd>scroll</Kbd>
          </KbdGroup>
          <span>eller piltastene</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ARTICLE PREVIEW ITEMS
// ============================================================================

export function ArticlePreviewList({ items }: { items: ContentItem[] }) {
  const preview = items.slice(0, 4);
  return (
    <ul className="divide-y divide-border">
      {preview.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/ressurser/artikler/${item.slug}`}
            className="flex items-start justify-between gap-4 py-3 group/item"
          >
            <div className="min-w-0">
              {item?.frontmatter?.title && (
                <p className="text-sm font-medium text-foreground truncate group-hover/item:text-foreground/80 transition-colors">
                  {item.frontmatter.title}
                </p>
              )}
              {item?.frontmatter?.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {item.frontmatter.description}
                </p>
              )}
            </div>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground/30 group-hover/item:text-muted-foreground transition-colors" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ============================================================================
// VIDEO PREVIEW ITEMS
// ============================================================================

export function VideoPreviewList({ items }: { items: ContentItem[] }) {
  const preview = items.slice(0, 4);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {preview.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/ressurser/videoer/${item.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors group/item"
          >
            {/* Thumbnail placeholder / icon */}
            <div className="h-10 w-16 shrink-0 rounded-md bg-orange-500/10 flex items-center justify-center">
              <Video className="h-4 w-4 text-orange-500/70" />
            </div>
            {item?.frontmatter?.title && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground line-clamp-2 group-hover/item:text-foreground/80 transition-colors leading-snug">
                  {item.frontmatter.title}
                </p>
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ============================================================================
// TOOL PREVIEW ITEMS (static)
// ============================================================================

export const TOOLS = [
  {
    id: "befaringsveileder",
    label: "Befaringsveileder",
    description: "Kartlegg montasjeforholdene dine steg for steg.",
  },
  {
    id: "stoffvelger",
    label: "Stoffvelger",
    description: "Finn riktig markisestoff basert på behov og stil.",
  },
  {
    id: "monteringskalkulator",
    label: "Monteringskalkulator",
    description: "Beregn festeavstand og nødvendig utstyr.",
  },
];

export function ToolPreviewList() {
  return (
    <ul className="border border-red-500 flex-1 flex items-center justify-stretch gap-3">
      {TOOLS.map((tool) => (
        <li key={tool.id}>
          <Link
            href={`/ressurser/verktoy/${tool.id}`}
            className="flex flex-col gap-1.5 p-2 border border-border bg-background hover:bg-muted/40 transition-colors h-full group/item"
          >
            <p className="text-sm font-medium text-foreground group-hover/item:text-foreground/80 transition-colors">
              {tool.label}
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              {tool.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
