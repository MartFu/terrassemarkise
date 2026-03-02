import React, { JSX } from "react";
import { GalleryImage } from "@/lib/types";
import { AspectRatio, ImageCard } from "./image-card";

const BENTO_PATTERNS = [
  [1, 1, 1, 1],
  [2, 1, 1],
  [1, 2, 1],
  [1, 1, 2],
  [2, 2],
  [1, 1, 1, 1],
];

interface BentoGridProps {
  images: GalleryImage[];
  gap: number;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export function BentoGrid({
  images,
  gap,
  imageClassName,
  aspectRatio,
  onImageClick,
}: BentoGridProps) {
  let patternIndex = 0;
  let imageIndex = 0;
  const rows: JSX.Element[] = [];

  while (imageIndex < images.length) {
    const pattern = BENTO_PATTERNS[patternIndex % BENTO_PATTERNS.length];
    const rowImages = images.slice(imageIndex, imageIndex + pattern.length);

    if (rowImages.length === 0) break;

    const rowStartIndex = imageIndex;

    rows.push(
      <div key={`row-${imageIndex}`} className="flex" style={{ gap }}>
        {rowImages.map((image, i) => {
          const span = pattern[i] || 1;
          return (
            <div key={image.id} className="flex" style={{ flex: span }}>
              <ImageCard
                image={image}
                className={imageClassName}
                onClick={() => onImageClick?.(image, rowStartIndex + i)}
                aspectRatio={aspectRatio}
              />
            </div>
          );
        })}
      </div>,
    );

    patternIndex++;
    imageIndex += pattern.length;
  }

  return (
    <div className="flex flex-col" style={{ gap }}>
      {rows}
    </div>
  );
}
