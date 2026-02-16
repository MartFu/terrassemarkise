"use client";

import { ProductSpecItem } from "@/innhold/produkter";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function ProductSpecList({ specs }: { specs: ProductSpecItem[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid gap-px">
      <button
        onClick={() => setExpanded(!expanded)}
        className="py-2 px-4 text-sm cursor-pointer border border-border/40 bg-card/30 hover:bg-card/80 flex items-center justify-between w-full focus-visible:outline-0 focus-visible:ring-0"
      >
        <span className="pointer-events-none underline">{`${!expanded ? "Vis" : "Skjul"} tekniske detaljer`}</span>
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-[rotate]",
            expanded ? "rotate-90" : "",
          )}
        />
      </button>
      <div
        className={cn(
          "transition-transform overflow-hidden grid gap-px bg-border",
          expanded ? "min-h-max" : "h-0",
        )}
      >
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex bg-background justify-between px-5 py-3"
          >
            <span
              className={cn(
                "text-sm transition-opacity text-muted-foreground",
                expanded ? "opacity-100" : "opacity-0",
              )}
            >
              {spec.label}
            </span>
            <span
              className={cn(
                "text-sm transition-opacity font-medium text-foreground",
                expanded ? "opacity-100" : "opacity-0",
              )}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
