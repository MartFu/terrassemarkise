import React from "react";
import { GalleryImage } from "@/lib/types";
import { ImageCard, AspectRatio } from "./image-card";

interface CompactGridProps {
  images: GalleryImage[];
  columns: number;
  gap: number;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export function CompactGrid({
  images,
  columns,
  gap,
  imageClassName,
  aspectRatio,
  onImageClick,
}: CompactGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(columns, 4)} lg:grid-cols-${columns}`}
      style={{ gap }}
    >
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          className={`w-full h-full object-cover ${imageClassName ?? ""}`}
          onClick={() => onImageClick?.(image, index)}
          aspectRatio={aspectRatio === "auto" ? "square" : aspectRatio}
        />
      ))}
    </div>
  );
}
