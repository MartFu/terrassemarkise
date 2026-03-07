"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { StaticComparisonData } from "@/lib/comparison";
import React from "react";
import { useStuck } from "@/hooks/use-stuck";
import { SITE_URLS } from "@/lib/constants";

type Props = {
  data: StaticComparisonData;
  highlightedColumn?: number;
  footer?: React.ReactNode;
};

export function DesktopTable({ data, highlightedColumn, footer }: Props) {
  const { columns, rows, categories } = data;
  const stickTheadRef = useStuck<HTMLTableSectionElement>({
    getSentinelParent: (el) => el.closest("table")?.parentElement || null,
  });

  // Group rows by category for rendering
  const grouped = categories.map((category) => ({
    category,
    rows: rows.filter((r) => r.category === category),
  }));

  return (
    <div className="hidden md:block border border-border/40 bg-card">
      <table className="w-full min-w-[700px]">
        <thead
          style={{ transform: "translateY(var(--push-up, 0px))" }}
          ref={stickTheadRef}
          className="group"
        >
          <tr>
            <th className="sticky-el pl-6 pr-6 pt-8 pb-2 text-left transition-all group-stuck:bg-card">
              <div className="h-px absolute bottom-0 inset-x-0 bg-border opacity-0 group-stuck:opacity-100 transition-opacity" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Egenskap
              </span>
            </th>
            {columns.map((col, index) => (
              <th
                key={col.id}
                className={cn(
                  "sticky-el text-center pb-6 pt-8 transition-all group-stuck:bg-card",
                  index === highlightedColumn && "bg-accent/8",
                )}
              >
                <div className="h-px absolute bottom-0 inset-x-0 bg-border opacity-0 group-stuck:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-medium tracking-tight">
                    {col.name}
                  </span>
                  <Link
                    href={`${SITE_URLS.AWNINGS}${col.slug}`}
                    className="flex items-center hover:underline text-xs font-normal text-primary hover:text-primary/80"
                  >
                    Se produkt <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {grouped.map(({ category, rows: categoryRows }) => (
            <CategorySection
              key={category}
              category={category}
              rows={categoryRows}
              columns={columns}
              highlightedColumn={highlightedColumn}
            />
          ))}
        </tbody>
      </table>
      <div className="p-6 border-t">{footer}</div>
    </div>
  );
}

// Sub-components for clarity
function CategorySection({
  category,
  rows,
  columns,
  highlightedColumn,
}: {
  category: string;
  rows: StaticComparisonData["rows"];
  columns: StaticComparisonData["columns"];
  highlightedColumn?: number;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={columns.length + 1}
          className="bg-card pb-2 pl-6 pr-2 pt-6"
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-4 bg-foreground" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {category}
            </span>
          </div>
        </td>
      </tr>

      {rows.map((row) => (
        <tr
          key={row.id}
          className={cn(
            "border-b border-border/30 last:border-b-0",
            "bg-background/70 hover:bg-secondary/10 transition-colors",
          )}
        >
          <td className="py-4 pl-6 pr-2">
            <div className="space-y-1">
              <span className="text-sm font-medium">{row.label}</span>
              {row.description && (
                <span className="block max-w-[54ch] text-xs text-muted-foreground leading-relaxed">
                  {row.description}
                </span>
              )}
            </div>
          </td>

          {row.values.map((value, colIndex) => (
            <td
              key={colIndex}
              className={cn(
                "px-4 py-4 text-center",
                colIndex === highlightedColumn && "bg-accent/10",
              )}
            >
              <CellValue value={value.formatted} raw={value.raw} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CellValue({ value, raw }: { value: string; raw: unknown }) {
  // Simple boolean check for checkmark rendering
  if (typeof raw === "boolean") {
    return raw ? (
      <Check className="w-4 h-4 mx-auto text-primary" />
    ) : (
      <span className="text-muted-foreground">—</span>
    );
  }

  return <span className="text-sm text-foreground/90">{value}</span>;
}
