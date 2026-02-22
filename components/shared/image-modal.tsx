"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types/gallery";

interface ImageModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (image: GalleryImage) => void;
}

export function ImageModal({
  image,
  images,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelect,
}: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <div
      className="fixed mt-(--header-height) inset-0 z-50 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Image counter */}
      <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main content */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:right-8 z-50 p-2 rounded-full bg-destructive hover:bg-destructive/80 transition-colors duration-200 group"
          aria-label="Lukk bildevisning"
          title="Lukk bildevisning"
        >
          <X className="w-6 h-6 text-destructive-foreground" />
        </button>

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-foreground hover:bg-foreground/70"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-background" />
          </button>
        )}

        {/* Image container */}
        <div className="relative max-w-7xl max-h-[calc(85vh-var(--header-height))] w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-foreground hover:bg-foreground/70"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-background" />
          </button>
        )}
      </div>

      {/* Thumbnail strip - Fixed width issue */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 min-w-60">
        <div className="absolute z-50 -top-6 left-1/2 -translate-x-1/2 w-4/5 text-center bg-black/70 text-white text-sm rounded-t px-4 py-0.5 text-nowrap">
          {image.alt}
        </div>
        <div className="flex gap-2 p-2 rounded-lg bg-card border shadow-lg backdrop-blur-md overflow-x-auto max-w-[90vw] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {images.map((img, idx) => (
            <button
              key={`thumbnail-${img.id}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(img); // Call onSelect with the clicked image
              }}
              className={`shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200
                    ${
                      img.id === image.id
                        ? "border-foreground scale-110 shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
              aria-label={`Select image ${idx + 1}: ${img.alt || "thumbnail"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img?.alt ?? "thumbnail"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
