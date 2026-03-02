import { JSX } from "react";
import { GalleryImage } from "@/lib/types";
import { AspectRatio, ImageCard } from "./image-card";

const TARGET_ROW_HEIGHT = 300;
const MAX_ROW_WIDTH = 1200;

interface BalancedGridProps {
  images: GalleryImage[];
  gap: number;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export function BalancedGrid({
  images,
  gap,
  imageClassName,
  aspectRatio,
  onImageClick,
}: BalancedGridProps) {
  const rows: JSX.Element[] = [];
  let currentRow: GalleryImage[] = [];
  let currentRowAspectSum = 0;
  let rowStartIndex = 0;

  images.forEach((image, globalIndex) => {
    const aspect = image.width / image.height;

    if (currentRow.length === 0) {
      currentRow.push(image);
      currentRowAspectSum = aspect;
    } else {
      const newAspectSum = currentRowAspectSum + aspect;
      const rowWidth = newAspectSum * TARGET_ROW_HEIGHT;

      if (rowWidth > MAX_ROW_WIDTH) {
        rows.push(
          <BalancedRow
            key={`row-${rows.length}`}
            images={currentRow}
            targetHeight={TARGET_ROW_HEIGHT}
            gap={gap}
            globalOffset={rowStartIndex}
            onImageClick={onImageClick}
            imageClassName={imageClassName}
            aspectRatio={aspectRatio}
          />,
        );
        rowStartIndex = globalIndex;
        currentRow = [image];
        currentRowAspectSum = aspect;
      } else {
        currentRow.push(image);
        currentRowAspectSum = newAspectSum;
      }
    }
  });

  if (currentRow.length > 0) {
    rows.push(
      <BalancedRow
        key={`row-${rows.length}`}
        images={currentRow}
        targetHeight={TARGET_ROW_HEIGHT}
        gap={gap}
        globalOffset={rowStartIndex}
        onImageClick={onImageClick}
        imageClassName={imageClassName}
        aspectRatio={aspectRatio}
      />,
    );
  }

  return (
    <div className="flex flex-col" style={{ gap }}>
      {rows}
    </div>
  );
}

export interface BalancedRowProps {
  images: GalleryImage[];
  targetHeight: number;
  gap: number;
  globalOffset: number; // index of first image in this row within the full images array
  onImageClick?: (image: GalleryImage, index: number) => void;
  imageClassName?: string;
  aspectRatio?: AspectRatio;
}

export function BalancedRow({
  images,
  targetHeight,
  gap,
  globalOffset,
  onImageClick,
  imageClassName,
  aspectRatio,
}: BalancedRowProps) {
  const totalAspect = images.reduce(
    (sum, img) => sum + img.width / img.height,
    0,
  );

  return (
    <div className="flex" style={{ gap }}>
      {images.map((image, index) => {
        const aspect = image.width / image.height;
        const width = (aspect / totalAspect) * 100;

        return (
          <div key={image.id} style={{ width: `${width}%` }}>
            <ImageCard
              image={image}
              className={imageClassName}
              onClick={() => onImageClick?.(image, globalOffset + index)}
              aspectRatio={aspectRatio}
            />
          </div>
        );
      })}
    </div>
  );
}
