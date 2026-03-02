"use client";

import { useMemo, useState } from "react";
import { GalleryImage, GridVariant } from "@/lib/types";
import { Lightbox } from "../lightbox";
import { AspectRatio } from "./image-card";
import { MasonryGrid } from "./masonry";
import { BentoGrid } from "./bento";
import { BalancedGrid } from "./balanced";
import { PanoramaGrid } from "./panorama";
import { CompactGrid } from "./compact";

interface GalleryGridProps {
  images: GalleryImage[];
  variant?: GridVariant;
  columns?: number;
  gap?: number;
  className?: string;
  imageClassName?: string;
  onImageClick?: (image: GalleryImage, index: number) => void;
  aspectRatio?: AspectRatio;
  /**
   * Whether to enable the lightbox when clicking images.
   * Defaults to true.
   */
  lightbox?: boolean;
}

function GalleryGrid({
  images,
  variant = "masonry",
  columns = 4,
  gap = 16,
  className = "",
  imageClassName = "",
  onImageClick,
  aspectRatio = "auto",
  lightbox = true,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImageUrls = useMemo(
    () => images.map((image) => image.src),
    [images],
  );

  const handleImageClick = (image: GalleryImage, index: number) => {
    onImageClick?.(image, index);
    if (lightbox) {
      setLightboxIndex(index);
    }
  };

  const sharedProps = {
    images,
    gap,
    imageClassName,
    aspectRatio,
    onImageClick: handleImageClick,
  };

  const renderVariant = () => {
    switch (variant) {
      case "masonry":
        return <MasonryGrid {...sharedProps} columns={columns} />;
      case "bento":
        return <BentoGrid {...sharedProps} />;
      case "balanced":
        return <BalancedGrid {...sharedProps} />;
      case "panorama":
        return <PanoramaGrid {...sharedProps} />;
      case "compact":
        return <CompactGrid {...sharedProps} columns={columns} />;
      default:
        return <MasonryGrid {...sharedProps} columns={columns} />;
    }
  };

  return (
    <div className={`gallery-grid w-full ${className}`}>
      {renderVariant()}
      {lightbox && lightboxIndex !== null && (
        <Lightbox
          images={allImageUrls}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
}

export default GalleryGrid;
