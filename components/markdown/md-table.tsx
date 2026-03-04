"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkdownTableProps {
  children: ReactNode;
  className?: string;
}

export function MarkdownTable({ children, className }: MarkdownTableProps) {
  return (
    <div
      className={cn(
        "relative max-w-[74ch] mt-4",
        "overflow-x-auto overflow-y-hidden",
        "border",
        "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent",
        "hover:scrollbar-thumb-muted-foreground/30",
        className,
      )}
    >
      <table
        className={cn(
          "border-collapse min-w-full w-max",
          "text-sm md:text-base",
        )}
      >
        {children}
      </table>
    </div>
  );
}
