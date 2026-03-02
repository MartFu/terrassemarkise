"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentNavItem } from "@/lib/content-loader.types";

interface MarkdownNavigationProps {
  previous?: ContentNavItem | null;
  next?: ContentNavItem | null;
  basePath: string; // e.g., "/ressurser/artikler" or "/juridisk"
  className?: string;
}

export function MarkdownNavigation({
  previous,
  next,
  basePath,
  className,
}: MarkdownNavigationProps) {
  return (
    <nav
      className={cn(
        "grid grid-cols md:grid-cols-2 items-center justify-between gap-4 mt-12 pt-8 border-t border-border",
        className,
      )}
      aria-label="Navigasjon"
    >
      {/* Previous */}
      {previous && <NavItem basePath={basePath} item={previous} />}

      {/* Next */}
      {next && <NavItem basePath={basePath} item={next} isNext />}
    </nav>
  );
}

function NavItem({
  item,
  basePath,
  isNext = false,
}: {
  item: ContentNavItem;
  basePath: string;
  isNext?: boolean;
}) {
  return (
    <>
      {!isNext && (
        <Link
          href={`${basePath}/${item.slug}`}
          className="group flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors w-full relative"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Forrige
            </span>
            <span className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </span>
            {item.excerpt && (
              <span className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {item.excerpt}
              </span>
            )}
          </div>

          {item?.imageSrc && (
            <div
              className="hidden lg:block absolute z-20 bottom-full left-0 mb-2 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all rounded-lg max-h-48 h-48 aspect-video border-2 border-border shadow-sm"
              style={{
                backgroundImage: `url("${item.imageSrc}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </Link>
      )}

      {isNext && (
        <Link
          href={`${basePath}/${item.slug}`}
          className="md:col-start-2 group flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors w-full md:flex-row-reverse md:text-right relative"
        >
          <ChevronRight className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Neste
            </span>
            <span className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </span>
            {item.excerpt && (
              <span className="text-sm text-muted-foreground max-w-md line-clamp-1 truncate mt-1">
                {item.excerpt}
              </span>
            )}
          </div>

          <div
            className="hidden lg:block absolute z-20 bottom-full right-0 mb-2 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all rounded-lg max-h-48 h-48 aspect-video border-2 border-border shadow-sm"
            style={{
              backgroundImage: `url("${item.imageSrc}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Link>
      )}
    </>
  );
}
