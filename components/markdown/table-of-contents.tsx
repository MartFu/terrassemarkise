"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Heading, TableOfContentsProps } from "./types";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";

export function TableOfContents({
  headings,
  className,
  activeId,
  onHeadingClick,
  title = "Innholdsfortegnelse",
  showTitle = true,
}: TableOfContentsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const validHeadings = useMemo(() => {
    return headings.filter((h): h is Heading =>
      Boolean(h && h.id && h.text && typeof h.level === "number"),
    );
  }, [headings]);

  const filteredHeadings = useMemo(() => {
    if (!searchQuery.trim()) return validHeadings;
    const query = searchQuery.toLowerCase();
    return validHeadings.filter((h) => h.text.toLowerCase().includes(query));
  }, [validHeadings, searchQuery]);

  const handleHeadingClick = useCallback(
    (id: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      onHeadingClick?.(id);
    },
    [onHeadingClick],
  );

  if (validHeadings.length === 0) return null;

  const hasSearchResults = searchQuery && filteredHeadings.length === 0;

  return (
    <aside className={cn("relative hidden lg:block w-full shrink-0")}>
      <nav
        className={cn(
          "toc flex flex-col sticky top-[calc(var(--header-height)+2rem)] z-10",
          !showTitle && "pt-0",
          className,
        )}
        aria-label="Innholdsfortegnelse"
        role="navigation"
      >
        {showTitle && (
          <div className="mb-3 pb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {title}
            </h3>

            {validHeadings.length > 5 && (
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Søk i overskrifter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-9 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  aria-label="Søk i innholdsfortegnelsen"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hidden group-hover:block absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Avbryt søket"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <ScrollArea className="pr-2 flex-1 min-h-0 max-h-80 overflow-y-auto">
          <div>
            {hasSearchResults ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                Ingen treff for {`"${searchQuery}"`}
              </div>
            ) : (
              <ul className="space-y-2.5 text-sm" role="list">
                {filteredHeadings.map((heading, idx) => (
                  <TocItem
                    key={`toc-item-${heading.id}-${idx}`}
                    headingId={heading.id}
                    headingLevel={heading.level}
                    headingText={heading.text}
                    isActive={activeId === heading.id}
                    onHeadingClick={handleHeadingClick}
                    searchQuery={searchQuery}
                  />
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </nav>
    </aside>
  );
}

interface TocItemProps {
  isActive: boolean;
  headingLevel: number;
  headingId: string;
  headingText: string;
  onHeadingClick?: (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  searchQuery?: string;
}

function TocItem({
  isActive,
  headingLevel,
  headingId,
  headingText,
  onHeadingClick,
  searchQuery,
}: TocItemProps) {
  const highlightedText = useMemo(() => {
    if (!searchQuery) return headingText;
    const query = searchQuery.toLowerCase();
    const text = headingText;
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <mark className="bg-accent/30 text-foreground px-0.5 rounded">
          {text.slice(index, index + searchQuery.length)}
        </mark>
        {text.slice(index + searchQuery.length)}
      </>
    );
  }, [headingText, searchQuery]);

  return (
    <li
      style={{
        marginLeft: `${Math.max(0, (headingLevel - 1) * 0.75)}rem`,
      }}
    >
      <Link
        href={`#${headingId}`}
        onClick={(e) => onHeadingClick?.(headingId, e)}
        className={cn(
          "block truncate py-1 px-2 rounded-md transition-all duration-150",
          isActive
            ? "font-semibold text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
        aria-current={isActive ? "location" : undefined}
        title={headingText}
      >
        {highlightedText}
      </Link>
    </li>
  );
}

export default TableOfContents;
