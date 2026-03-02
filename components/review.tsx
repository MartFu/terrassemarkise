"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Quote,
  ExternalLink,
  ChevronsLeft,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Kbd, KbdGroup } from "./ui/kbd";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EXTERNAL_URLS } from "@/lib/constants";
import { Heading } from "./ui/typography";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  year: number;
  reply?: string;
}

interface ReviewListProps {
  reviews: Review[];
}

function getReviewAge(year: number): string {
  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - year;
  if (yearsAgo === 0) return "I år";
  if (yearsAgo === 1) return "I fjor";
  if (yearsAgo < 0) return "";
  return `${yearsAgo} år siden`;
}

export function ReviewList({ reviews }: ReviewListProps): React.ReactElement {
  const {
    scrollRef,
    scrollLeft,
    scrollRight,
    scrollToStart,
    handleWheel,
    isAtStart,
    isAtEnd,
    isPastSecondScrollStep,
  } = useHorizontalScroll({ scrollAmount: 360 });

  if (reviews.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-8">
        <p className="text-center text-muted-foreground italic">
          Ingen tilgjengelige tilbakemeldinger ennå.
        </p>
      </div>
    );
  }

  const scrollButtons = (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 md:h-9 md:w-9 rounded-full transition-opacity disabled:opacity-0"
        onClick={scrollToStart}
        disabled={!isPastSecondScrollStep}
        aria-label="Gå til start"
      >
        <ChevronsLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 md:h-9 md:w-9 rounded-full transition-opacity disabled:opacity-30"
        onClick={scrollLeft}
        disabled={isAtStart}
        aria-label="Forrige"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 md:h-9 md:w-9 rounded-full transition-opacity disabled:opacity-30"
        onClick={scrollRight}
        disabled={isAtEnd}
        aria-label="Neste"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </>
  );

  return (
    <div className="w-full md:overflow-hidden">
      <div className="flex items-end justify-start md:justify-between mb-8 md:mb-10">
        <Heading>Dette sier våre kunder</Heading>
        <div className="hidden md:flex items-center gap-2">{scrollButtons}</div>
      </div>

      <div className="relative -mx-4 md:mx-0">
        {/* Shadow overlays */}
        <div
          className={cn(
            "hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
            isAtStart ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          className={cn(
            "hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
            isAtEnd ? "opacity-0" : "opacity-100",
          )}
        />

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="overflow-x-auto pb-6 -mb-6 scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div
            className="flex items-stretch gap-4 min-w-min
              px-[calc(50%-44vw)]
              lg:px-0 lg:justify-center lg:gap-5
              group/list md:[&:has(.review-card:hover)_.review-card:not(:hover)]:opacity-50"
          >
            {reviews.map((review, index) => (
              <div
                key={`${review.reviewer}-${review.year}-${index}`}
                className="w-[80vw] md:w-[60vw] lg:w-[380px] shrink-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-between mt-4 md:mt-10 gap-2 md:gap-4 pt-4 border-t border-transparent md:border-border/50">
        <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
          Bruk
          <KbdGroup>
            <Kbd>{"\u21E7"} Shift</Kbd>+<Kbd>Scroll</Kbd>
          </KbdGroup>
          eller
          <KbdGroup>
            <Kbd>{"<"}</Kbd>
            <Kbd>{">"}</Kbd>
          </KbdGroup>
          for å navigere
        </div>

        <Button size="sm" variant="outline" className="rounded-full" asChild>
          <Link
            href={EXTERNAL_URLS.GOOGLE_MAPS_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Se alle på Google
          </Link>
        </Button>

        <div className="flex md:hidden items-center gap-2">{scrollButtons}</div>
      </div>
    </div>
  );
}
function ReviewCard({ review }: { review: Review }): React.ReactElement {
  const [isReplyExpanded, setIsReplyExpanded] = useState(false);
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const { reviewer, rating, comment, year, reply } = review;

  const isLongComment = comment.length > 150;

  return (
    <article className="review-card group/card hover:opacity-100 relative border border-border bg-linear-to-b from-card to-muted/20 p-6 transition-all duration-300 flex flex-col">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15 group-hover/card:text-primary/40 transition-colors" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-muted-foreground tracking-tight">
            {reviewer}
          </h3>
          <span className="hidden md:block text-[11px] uppercase tracking-wider font-medium text-background bg-foreground/50 px-2 py-0.5 rounded-full">
            {getReviewAge(year)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating
                    ? "fill-accent text-accent"
                    : "fill-foreground/20 text-muted-foreground/20",
                )}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground/60">
            {rating}.0
          </span>
        </div>
      </div>

      <div className={cn("mt-4 grow", isCommentExpanded ? "h-auto" : "h-24")}>
        <p
          className={cn(
            "text-sm text-foreground/80 leading-relaxed transition-all duration-300",
            !isCommentExpanded && "line-clamp-3",
          )}
        >
          {`"${comment}"`}
        </p>

        {isLongComment && (
          <button
            onClick={() => setIsCommentExpanded(!isCommentExpanded)}
            className="mt-1 text-xs font-semibold text-accent hover:underline focus-visible:outline-0 focus-visible:ring-0"
          >
            {isCommentExpanded ? "Vis mindre" : "Les mer"}
          </button>
        )}
      </div>

      {reply && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <button
            onClick={() => setIsReplyExpanded(!isReplyExpanded)}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity"
          >
            {isReplyExpanded ? "Skjul svar" : "Se svar"}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-300",
                isReplyExpanded && "rotate-180",
              )}
            />
          </button>

          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              isReplyExpanded
                ? "grid-rows-[1fr] opacity-100 mt-3"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded-md bg-secondary/30 p-3 border-l-3 border-secondary">
                <p className="text-sm text-foreground leading-snug">{reply}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
