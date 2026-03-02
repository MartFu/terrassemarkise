import React, { JSX } from "react";
import { GalleryImage } from "@/lib/types";
import { AspectRatio, ImageCard } from "./image-card";

interface PanoramaGridProps {
  images: GalleryImage[];
  gap: number;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export function PanoramaGrid({
  images,
  gap,
  imageClassName,
  aspectRatio,
  onImageClick,
}: PanoramaGridProps) {
  const items: JSX.Element[] = [];
  let regularBatch: GalleryImage[] = [];
  let regularBatchStartIndex = 0;

  const flushRegularBatch = (beforeIndex: number) => {
    if (regularBatch.length === 0) return;

    items.push(
      <div
        key={`batch-${beforeIndex}`}
        className={`grid grid-cols-${regularBatch.length}`}
        style={{ gap }}
      >
        {regularBatch.map((img, i) => (
          <ImageCard
            key={img.id}
            image={img}
            className={imageClassName}
            onClick={() => onImageClick?.(img, regularBatchStartIndex + i)}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>,
    );

    regularBatch = [];
  };

  images.forEach((image, index) => {
    const isPanorama = image.width / image.height > 2;

    if (isPanorama) {
      flushRegularBatch(index);

      items.push(
        <div key={image.id} className="w-full">
          <ImageCard
            image={image}
            className={`w-full ${imageClassName ?? ""}`}
            onClick={() => onImageClick?.(image, index)}
            aspectRatio="auto"
            priority={image.priority}
          />
        </div>,
      );
    } else {
      if (regularBatch.length === 0) {
        regularBatchStartIndex = index;
      }
      regularBatch.push(image);

      if (regularBatch.length === 3) {
        flushRegularBatch(index + 1);
      }
    }
  });

  flushRegularBatch(images.length);

  return (
    <div className="flex flex-col" style={{ gap }}>
      {items}
    </div>
  );
}
