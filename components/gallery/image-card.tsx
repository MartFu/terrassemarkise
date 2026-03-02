import React from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types";

export type AspectRatio = "auto" | "square" | "video" | "portrait";

export interface ImageCardProps {
  image: GalleryImage;
  className?: string;
  onClick?: () => void;
  aspectRatio?: AspectRatio;
  priority?: boolean;
}

const ASPECT_RATIO_CLASSES: Record<AspectRatio, string> = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  className = "",
  onClick,
  aspectRatio = "auto",
  priority = false,
}) => {
  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden rounded group cursor-pointer ${aspectClass}`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        blurDataURL={image?.blurData}
      />
      {(image.title || image.description) && (
        <div className="absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
          <div className="text-white">
            {image.title && <h3 className="font-semibold">{image.title}</h3>}
            {image.description && (
              <p className="text-sm">{image.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
