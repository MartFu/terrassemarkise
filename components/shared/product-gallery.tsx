"use client";

import { useState, useMemo } from "react";
import { GalleryImage } from "@/types/gallery";
import { Plus, X } from "lucide-react";
import { ImageModal } from "./image-modal";
import { cn } from "@/lib/utils";

// Constants for localStorage keys
const LS_KEYS = {
  GALLERY_EXPANDED: "gallery_expanded",
} as const;

export interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

type GridItem = {
  image: GalleryImage;
  gridClass: string;
  isOverlay?: boolean;
};

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LS_KEYS.GALLERY_EXPANDED) === "true";
    }
    return false;
  });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Guard against duplicate keys
  const deduplicatedImages = useMemo(
    () => Array.from(new Map(images.map((img) => [img.id, img])).values()),
    [images],
  );

  // Toggle expanded state with localStorage persistence
  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEYS.GALLERY_EXPANDED, String(newState));
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = deduplicatedImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % deduplicatedImages.length;
    setSelectedImage(deduplicatedImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = deduplicatedImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + deduplicatedImages.length) %
      deduplicatedImages.length;
    setSelectedImage(deduplicatedImages[prevIndex]);
  };

  // Generate grid items with alternating row pattern
  const gridItems = useMemo<GridItem[]>(() => {
    // --- EXPANDED STATE (Desktop only, 4-column alternating) ---
    if (isExpanded) {
      const items: GridItem[] = [];
      let imageIndex = 0;
      let rowIndex = 0;

      while (imageIndex < deduplicatedImages.length) {
        const isEvenRow = rowIndex % 2 === 0;
        const remaining = deduplicatedImages.length - imageIndex;

        if (remaining >= 4) {
          if (isEvenRow) {
            items.push(
              {
                image: deduplicatedImages[imageIndex],
                gridClass: "col-span-2 row-span-2",
              },
              {
                image: deduplicatedImages[imageIndex + 1],
                gridClass: "col-span-1 row-span-1",
              },
              {
                image: deduplicatedImages[imageIndex + 2],
                gridClass: "col-span-1 row-span-1 row-start-2 col-start-3",
              },
              {
                image: deduplicatedImages[imageIndex + 3],
                gridClass: "col-span-1 row-span-2",
              },
            );
          } else {
            items.push(
              {
                image: deduplicatedImages[imageIndex],
                gridClass: "col-span-1 row-span-2",
              },
              {
                image: deduplicatedImages[imageIndex + 1],
                gridClass: "col-span-1 row-span-1 col-start-2",
              },
              {
                image: deduplicatedImages[imageIndex + 2],
                gridClass: "col-span-1 row-span-1 col-start-2 row-start-2",
              },
              {
                image: deduplicatedImages[imageIndex + 3],
                gridClass: "col-span-2 row-span-2",
              },
            );
          }
          imageIndex += 4;
        } else {
          items.push({
            image: deduplicatedImages[imageIndex],
            gridClass: "col-span-2",
          });
          imageIndex++;
        }
        rowIndex++;
      }
      return items;
    }

    // --- COLLAPSED STATES (Device Specific) ---

    // Base desktop layout (the 4-image hero)
    const desktopItems = deduplicatedImages.slice(0, 4).map((image, index) => ({
      image,
      gridClass: cn(
        "hidden lg:block",
        index === 0 &&
          "lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-2",
        index === 1 && "lg:col-start-3 lg:row-start-1 lg:col-span-1",
        index === 2 && "lg:col-start-3 lg:row-start-2 lg:col-span-1",
        index === 3 &&
          "lg:col-start-4 lg:row-start-1 lg:row-start-1 lg:row-span-2",
      ),
      isOverlay: index === 3 && deduplicatedImages.length > 4,
    }));

    // Tablet layout (3 images: 1 full width, 2 half width)
    const tabletItems = deduplicatedImages.slice(0, 3).map((image, index) => ({
      image,
      gridClass: cn(
        "hidden md:block lg:hidden", // Only visible on tablet
        index === 0 && "col-span-2 h-100 row-span-1",
        index === 1 && "col-span-1 h-60 row-span-1",
        index === 2 && "col-span-1 h-60 row-span-1",
      ),
    }));

    // Mobile layout (1 image, full width)
    const mobileItems = deduplicatedImages.slice(0, 1).map((image) => ({
      image,
      gridClass: "block md:hidden col-span-2",
    }));

    return [...desktopItems, ...tabletItems, ...mobileItems];
  }, [deduplicatedImages, isExpanded]);

  return (
    <>
      <div className={cn("relative", className)}>
        {/* Mobile Slider (Visible only on mobile) */}
        {!isExpanded && (
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-1">
            {deduplicatedImages.map((image, idx) => (
              <div
                key={`mobile-slider-item-${image.id}-${idx}`}
                className="min-w-full snap-center aspect-video bg-secondary/5"
                onClick={() => setSelectedImage(image)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Grid Container (Tablet & Desktop) */}
        <div
          className={cn(
            "hidden md:grid gap-2 md:gap-3 transition-all duration-500",
            "grid-cols-2 lg:grid-cols-4", // Tablet is 2 cols, Desktop is 4
            isExpanded
              ? "auto-rows-[150px] md:auto-rows-[200px]"
              : "grid-rows-2 md:grid-rows-[25rem_15rem] lg:grid-rows-2",
          )}
        >
          {gridItems.map((item, idx) => {
            const { image } = item;
            const isOverlay = "isOverlay" in item && item.isOverlay;
            const gridClass = "gridClass" in item ? item.gridClass : "";

            return (
              <div
                key={`grid-item-${image.id}-${idx}`}
                className={cn(
                  "relative group cursor-pointer overflow-hidden bg-card/50",
                  gridClass,
                )}
                onClick={() => setSelectedImage(image)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={idx < 4 ? "eager" : "lazy"}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />

                {/* Show All button */}
                {isOverlay && (
                  <div
                    className={cn(
                      "absolute bottom-0 inset-x-0 bg-secondary/80 flex items-center justify-center",
                      "group-hover:bg-secondary transition-colors duration-300",
                    )}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded();
                      }}
                      className={cn(
                        "px-4 py-2 text-secondary-foreground cursor-pointer",
                        "rounded-lg font-medium text-sm md:text-base",
                        "transition-all duration-200",
                        "flex items-center gap-2",
                      )}
                    >
                      <Plus className="w-4 h-4" />
                      Vis alle bilder
                      <span className="hidden sm:inline text-secondary-foreground">
                        ({deduplicatedImages.length})
                      </span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Collapse button */}
        {isExpanded && (
          <div className="sticky bottom-4 flex justify-center mt-6">
            <button
              onClick={toggleExpanded}
              className={cn(
                "px-6 py-3 bg-secondary/90 backdrop-blur-2xl shadow-lg cursor-pointer",
                "text-secondary-foreground rounded font-medium",
                "transition-all duration-200",
                "flex items-center gap-2 border border-secondary",
              )}
            >
              <X className="w-4 h-4" />
              Vis mindre
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ImageModal
        image={selectedImage}
        images={deduplicatedImages}
        isOpen={!!selectedImage}
        onSelect={setSelectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
