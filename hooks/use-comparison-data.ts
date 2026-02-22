"use client";

import { StaticComparisonData } from "@/lib/comparison";
import { useMemo } from "react";

export function useStaticComparisonData(data: StaticComparisonData) {
  return useMemo(
    () => ({
      columns: data.columns,
      rows: data.rows,
      categories: data.categories,

      // Helper to get values for a specific column
      getColumnValues: (columnIndex: number) =>
        data.rows.map((row) => row.values[columnIndex]),

      // Helper to get rows by category
      getRowsByCategory: (category: string) =>
        data.rows.filter((row) => row.category === category),
    }),
    [data],
  );
}
