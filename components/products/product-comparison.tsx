"use client";

import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check, Eye, HelpCircle, InfoIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

import Link from "next/link";
import { useStuck } from "@/hooks/use-stuck";
import {
  comparisonData,
  productComparisonTableMetadata,
} from "@/innhold/produkter/comparison.data";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { products } from "@/innhold/produkter";
import { type CellTooltip, ComparisonRow, Product } from "@/lib/products/types";

function BoolCell({ value }: { value: boolean }) {
  return (
    <span className={value ? "text-green-600" : "text-muted-foreground/30"}>
      {value ? <Check className="w-4 h-4 mx-auto" /> : "\u2014"}
    </span>
  );
}

function CellTooltip({
  tooltip,
  product,
}: {
  tooltip: CellTooltip | undefined;
  product: Product;
}) {
  if (!tooltip) return null;

  const tooltipContent =
    typeof tooltip === "function" ? tooltip(product) : tooltip;

  if (!tooltipContent || tooltipContent === "") return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span role="button" aria-label="Mer infromasjon">
          <HelpCircle className="w-3.5 h-3.5" />
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}

function ComparisonCell({
  product,
  row,
  isHighlighted,
}: {
  product: Product;
  row: ComparisonRow;
  isHighlighted: boolean;
}) {
  const value = row.getValue(product);
  const action = row.action;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 1. Value Rendering */}
      {typeof value === "boolean" ? (
        <BoolCell value={value} />
      ) : (
        <div className="relative flex items-center gap-1">
          <span
            className={cn(
              "text-sm",
              isHighlighted
                ? "font-medium text-foreground"
                : "text-foreground/80",
            )}
          >
            {value ?? row.placeHolder}
          </span>
          <CellTooltip tooltip={row.tooltip} product={product} />
        </div>
      )}

      {/* 2. Action Rendering */}
      {action && action.type === "link" && (
        <Link
          href={action.path?.(product) ?? "#"}
          onClick={() => action.onClick?.(product)}
          className="text-xs text-muted-foreground hover:text-foreground mt-2 flex items-center gap-1 hover:underline"
        >
          {action.label}
          {action.icon && <action.icon className="w-3.5 h-3.5 shrink-0" />}
        </Link>
      )}
    </div>
  );
}

export function ProductComparison() {
  const lastCategory = "";
  const [activeProduct, setActiveProduct] = useState(1);
  const stickyMobileRef = useStuck<HTMLDivElement>();
  const stickyDesktopRef = useStuck<HTMLTableSectionElement>({
    getSentinelParent: (el) => el.closest("table")?.parentElement || null,
  });

  const spec = products.map((p) => p.getSpecs());

  console.log("SPEC", spec);

  return (
    <Section id="sammenligning">
      <Container className="relative">
        <SectionHeader className="text-center mx-auto">
          <SectionTitle className="text-center">
            Detaljert sammenligning av <br /> våre terrassemarkiser
          </SectionTitle>
          <SectionDescription className="text-center">
            Alle forskjeller mellom våre modeller samlet på ett sted. Fra
            kassettbeskyttelse og vindautomasjon til app-styring og
            smarthjem-integrasjon.
          </SectionDescription>
        </SectionHeader>

        {/* ─── MOBILE: single-product view with sticky switcher (hidden on md+) ─── */}
        <div className="md:hidden relative">
          {/* Sticky product switcher */}
          <div
            ref={stickyMobileRef}
            className="group sticky-el mb-40 transition-transform bg-background/95 backdrop-blur-sm border-b border-border/50"
          >
            <div className="flex rounded-t-xl transition-[margin,colors] group-stuck:-mx-6 group-stuck:rounded-t-none group-stuck:bg-accent/40 bg-card gap-1 p-4">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={cn(
                    "relative flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                    activeProduct === index
                      ? "bg-secondary text-secondary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Eye
                    className={cn(
                      "shrink-0 transition-opacity w-4 h-4",
                      activeProduct === index ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {product.name}
                </button>
              ))}
            </div>
          </div>

          {/* Rows for the active product */}
          <div className="divide-y divide-border/30 border border-border/40 bg-card/40 overflow-hidden">
            {(() => {
              let lastCat: string | undefined;
              return comparisonData.map((row) => {
                const showCategory = row.category && row.category !== lastCat;
                const value = row.getValue(products[activeProduct]);

                return (
                  <Fragment key={`${row.category}-${row.label}`}>
                    {showCategory && (
                      <div className="flex items-center gap-2 px-6 pt-5 pb-2 bg-card">
                        <div className="h-px w-4 bg-foreground" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {row.category}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4 px-6 py-4">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-sm font-medium text-foreground">
                          {row.label}
                        </span>
                        {row.description && (
                          <span className="block text-xs leading-relaxed text-muted-foreground">
                            {row.description}
                          </span>
                        )}
                      </div>
                      <div className="shrink-0 mt-0.5">
                        {typeof value === "boolean" ? (
                          <BoolCell value={value} />
                        ) : (
                          <span className="text-sm font-medium text-foreground/90">
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              });
            })()}
          </div>
        </div>

        {/* ─── DESKTOP: original side-by-side table (hidden below md) ─── */}
        <div className="rounded-b-xl md:rounded-xl border border-border/40 bg-card hidden md:block">
          <table className="w-full min-w-[700px]">
            <thead ref={stickyDesktopRef} className="group">
              <tr className="border-b border-border/50">
                <th className="sticky-el pl-6 pr-6 pt-8 pb-2 text-left transition-all group-stuck:bg-card group-stuck:border-border">
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Egenskap
                  </span>
                </th>
                {products.map((product, index) => (
                  <th
                    key={product.id}
                    className="sticky-el text-center transition-all group-stuck:bg-card group-stuck:border-border"
                  >
                    <div
                      className={cn(
                        "flex flex-col items-center gap-2 pb-6 pt-8 relative",
                        index === 1 && "bg-accent/8",
                      )}
                    >
                      {index === 1 && (
                        <Badge
                          variant="default"
                          className="bg-accent text-accent-foreground absolute left-1/2 -translate-x-1/2 top-1"
                        >
                          Populær
                        </Badge>
                      )}
                      <span className="block text-lg font-medium tracking-tight text-foreground">
                        {product.name}
                      </span>
                      <Link
                        className="flex items-center hover:underline hover:text-primary gap-1 font-normal text-xs text-muted-foreground"
                        href={`/produkter/${product.slug}`}
                      >
                        Se produkt <ArrowRight className="shrink-0 w-4 h-4" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, rowIndex) => {
                const showCategory =
                  row.category && row.category !== lastCategory;
                // Update lastCategory for next iteration logic if necessary in your component scope

                const isLastRow = rowIndex === comparisonData.length - 1;

                return (
                  <Fragment key={row.id}>
                    {/* Using the auto-generated UUID here */}
                    {showCategory && (
                      <tr>
                        <td
                          colSpan={products.length + 1}
                          className="bg-card pb-2 pl-6 pr-2 pt-6 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-px w-4 bg-foreground" />
                            {row.category}
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr
                      className={cn(
                        "group transition-colors bg-background/40 hover:bg-background/80",
                        !isLastRow && "border-b border-border/30",
                      )}
                    >
                      <td className="py-4 pl-6 pr-2">
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-foreground">
                            {row.label}
                          </span>
                          {row.description && (
                            <span className="block max-w-[24ch] md:max-w-[34ch] lg:max-w-[54ch] text-xs leading-relaxed text-muted-foreground">
                              {row.description}
                            </span>
                          )}
                        </div>
                      </td>

                      {products.map((product, index) => (
                        <td
                          key={product.id}
                          className={cn(
                            "px-4 py-4 text-center transition-colors",
                            index === 1 && "bg-accent/8",
                          )}
                        >
                          <ComparisonCell
                            product={product}
                            row={row}
                            isHighlighted={index === 1}
                          />
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={products.length + 1} className="p-0">
                  <div className="w-full border-t border-border/30 px-6 py-6 text-left">
                    <div className="flex items-center gap-3 justify-between text-sm font-medium tracking-wider text-foreground">
                      <div className="max-w-[34ch] md:max-w-[48ch] lg:max-w-[54ch] text-xs md:text-sm">
                        <span className="text-destructive inline-block font-bold mr-0.5">
                          *{" "}
                        </span>
                        {productComparisonTableMetadata.footer.note}
                      </div>
                      <InfoIcon className="text-accent w-6 h-6 shrink-0" />
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </Section>
  );
}
