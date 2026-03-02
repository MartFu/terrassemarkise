"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkdownTableProps {
  children: ReactNode;
  className?: string;
}

export function MarkdownTable({ children, className }: MarkdownTableProps) {
  return (
    <div className="my-6 w-full overflow-x-auto border border-border">
      <div className="inline-block min-w-full align-middle">
        <table className={cn("w-full border-collapse", className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

export default MarkdownTable;
