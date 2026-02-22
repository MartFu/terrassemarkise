"use client";

import { cn } from "@/lib/utils";
import { Check, Eye } from "lucide-react";
import { StaticComparisonData } from "@/lib/comparison";
import { useStuck } from "@/hooks/use-stuck";

type Props = {
  data: StaticComparisonData;
  activeColumn: number;
  onColumnChange: (index: number) => void;
  footer?: React.ReactNode;
};

export function MobileTable({
  data,
  activeColumn,
  onColumnChange,
  footer,
}: Props) {
  const { columns, rows } = data;
  const activeProduct = columns[activeColumn];
  const stickyMobileRef = useStuck<HTMLDivElement>();

  // Group rows by category for mobile display
  const grouped = data.categories.map((category) => ({
    category,
    rows: rows.filter((r) => r.category === category),
  }));

  return (
    <div className="md:hidden">
      {/* Sticky Product Switcher */}
      <div className="relative rounded-2xl">
        <div
          ref={stickyMobileRef}
          className="sticky-el group transition-transform bg-background/95 backdrop-blur-sm border-b border-border/50"
        >
          <div className="flex gap-1 p-4 bg-card rounded-t-xl transition-[margin,colors] group-stuck:rounded-t-none group-stuck:-mx-6 group-stuck:bg-accent/40">
            {columns.map((col, index) => (
              <button
                key={col.id}
                onClick={() => onColumnChange(index)}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  "flex items-center justify-center gap-2",
                  activeColumn === index
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Eye
                  className={cn(
                    "w-4 h-4 transition-opacity",
                    activeColumn === index ? "opacity-100" : "opacity-0",
                  )}
                />
                {col.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rows for Active Product */}
        <div
          className={cn(
            "divide-y divide-border/30 border-x border-b border-border/40 bg-card/40",
            !footer && "rounded-b-xl",
          )}
        >
          {grouped.map(({ category, rows: categoryRows }) => (
            <div key={category}>
              <div className="flex items-center gap-2 px-6 pt-5 pb-2 bg-card">
                <div className="h-px w-4 bg-foreground" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {category}
                </span>
              </div>

              {categoryRows.map((row) => {
                const value = row.values[activeColumn];

                return (
                  <div
                    key={row.id}
                    className="flex items-start justify-between gap-4 px-6 py-4"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-sm font-medium text-foreground">
                        {row.label}
                      </span>
                      {row.description && (
                        <span className="block text-xs text-muted-foreground leading-relaxed">
                          {row.description}
                        </span>
                      )}
                    </div>

                    <div className="shrink-0 mt-0.5">
                      <MobileCellValue
                        value={value.formatted}
                        raw={value.raw}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {footer && <div className="p-6 bg-card rounded-b-xl">{footer}</div>}
    </div>
  );
}

function MobileCellValue({ value, raw }: { value: string; raw: unknown }) {
  if (typeof raw === "boolean") {
    return raw ? (
      <Check className="w-4 h-4 text-green-600" />
    ) : (
      <span className="text-muted-foreground/30">—</span>
    );
  }

  return (
    <span className="text-sm font-medium text-foreground/90">{value}</span>
  );
}
