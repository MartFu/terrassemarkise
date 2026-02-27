"use client";

import { Button } from "@/components/ui/button";

interface CategoriesFilterProps {
  categories: string[];
  activeCategory: string | null;
  onSetCategory: (category: any) => void;
}

export function CategoriesFilter({
  categories,
  activeCategory,
  onSetCategory,
}: CategoriesFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        asChild
        variant={
          !activeCategory || activeCategory === "all" ? "default" : "outline"
        }
        size="sm"
        className="rounded-full px-4"
        onClick={() => onSetCategory("")}
      >
        Alle artikler
      </Button>

      {/* Dynamic Category Buttons */}
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <Button
            key={category}
            asChild
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="rounded-full px-4 capitalize"
            onClick={() => onSetCategory(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
