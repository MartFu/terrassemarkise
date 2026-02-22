import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { type CellTooltip, Product } from "@/lib/products/types";

export function CellTooltip({
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
