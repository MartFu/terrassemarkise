import React from "react";
import { GalleryImage } from "@/lib/types";
import { AspectRatio, ImageCard } from "./image-card";

interface MasonryGridProps {
  images: GalleryImage[];
  columns: number;
  gap: number;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export function MasonryGrid({
  images,
  columns,
  gap,
  imageClassName,
  aspectRatio,
  onImageClick,
}: MasonryGridProps) {
  const columnHeights = new Array(columns).fill(0);
  const columnItems: GalleryImage[][] = Array.from(
    { length: columns },
    () => [],
  );
  // Track the global index for each image per column so click handlers are correct
  const columnIndices: number[][] = Array.from({ length: columns }, () => []);

  images.forEach((image, globalIndex) => {
    const targetColumn = columnHeights.indexOf(Math.min(...columnHeights));
    columnItems[targetColumn].push(image);
    columnIndices[targetColumn].push(globalIndex);
    const aspect = image.width / image.height;
    columnHeights[targetColumn] += 100 / aspect;
  });

  return (
    <div className="flex" style={{ gap }}>
      {columnItems.map((column, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col" style={{ gap }}>
          {column.map((image, imgIndex) => (
            <ImageCard
              key={image.id}
              image={image}
              className={imageClassName}
              onClick={() =>
                onImageClick?.(image, columnIndices[colIndex][imgIndex])
              }
              aspectRatio={aspectRatio}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
