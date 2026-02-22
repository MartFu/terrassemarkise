import { cn } from "@/lib/utils";
import React from "react";

export function ImagePlaceholder({
  className,
  label,
  position = "center",
}: {
  className?: string;
  label?: string;
  position?: string;
}) {
  return (
    <div
      className={cn(
        "bg-muted/40 flex items-center justify-center text-secondary-foreground text-sm tracking-widest uppercase font-light",
        className,
      )}
      style={{ backgroundPosition: position }}
    >
      {label ?? "Image"}
    </div>
  );
}
