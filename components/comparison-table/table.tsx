"use client";

import { useState } from "react";
import { DesktopTable } from "./desktop";
import { MobileTable } from "./mobile";
import { StaticComparisonData } from "@/lib/comparison";

type Props = {
  data: StaticComparisonData;
  footer?: React.ReactNode;
};

export function ComparisonTable({ data, footer }: Props) {
  // Only UI state - no data fetching or transformation
  const [activeColumn, setActiveColumn] = useState(
    data.columns.findIndex((c) => c.isPopular) ?? 0,
  );

  return (
    <div className="comparison-table">
      <MobileTable
        data={data}
        activeColumn={activeColumn}
        onColumnChange={setActiveColumn}
        footer={footer}
      />
      <DesktopTable
        data={data}
        highlightedColumn={data.columns.findIndex((c) => c.isPopular)}
        footer={footer}
      />
    </div>
  );
}
