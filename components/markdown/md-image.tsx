"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2, ZoomIn } from "lucide-react";

interface MarkdownImageProps {
  src?: string | Blob;
  alt?: string;
  title?: string;
  onClick?: (src: string) => void;
  baseUrl?: string;
  /** When true, the image fills its grid cell without extra margins */
  compact?: boolean;
  /** When true, fixes the image to a 4:3 aspect ratio with object-cover for uniform grid rows */
  uniformHeight?: boolean;
}

export function MarkdownImage({
  src,
  alt = "",
  title,
  onClick,
  baseUrl = "",
  compact = false,
  uniformHeight = false,
}: MarkdownImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Supports all browser-native formats: jpg, png, gif, svg, webp, avif, etc.
  const displaySrc = useMemo(() => {
    if (!src) return "";
    if (src instanceof Blob) return URL.createObjectURL(src);
    const isAbsolute =
      src.startsWith("http") || src.startsWith("/") || src.startsWith("data:");
    return isAbsolute ? src : `${baseUrl}${src}`;
  }, [src, baseUrl]);

  useEffect(() => {
    return () => {
      if (displaySrc.startsWith("blob:")) URL.revokeObjectURL(displaySrc);
    };
  }, [displaySrc]);

  if (!src) return null;

  const handleClick = () => {
    if (onClick) onClick(displaySrc);
  };

  if (error) {
    return (
      <span
        className={cn(
          "bg-muted/30 border border-dashed border-border p-8 flex flex-col items-center gap-2",
          !compact && "my-6",
        )}
      >
        <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
        <span className="text-sm font-medium text-muted-foreground">
          Failed to load image
        </span>
        {alt && <span className="text-xs text-muted-foreground/70">{alt}</span>}
      </span>
    );
  }

  return (
    <span className={cn("group block", !compact && "my-6")}>
      <span
        className={cn(
          "relative overflow-hidden border border-border bg-muted/30 block",
          "transition-all duration-200",
          onClick &&
            "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
          isLoading && "min-h-32",
          uniformHeight && "aspect-[4/3]",
        )}
        onClick={handleClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
          </span>
        )}

        {/* Native <img> handles jpg, png, gif, svg, webp, avif automatically */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displaySrc}
          alt={alt}
          title={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          className={cn(
            "transition-opacity duration-300 block",
            uniformHeight
              ? "absolute inset-0 w-full h-full object-cover"
              : "w-full h-auto",
            compact && !uniformHeight && "object-cover",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          loading="lazy"
        />

        {onClick && !isLoading && (
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-end justify-end p-2">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 text-white p-1.5 rounded-md">
              <ZoomIn className="h-4 w-4" />
            </span>
          </span>
        )}
      </span>

      {!compact && (alt || title) && !error && (
        <span className="mt-2 text-center text-xs text-muted-foreground px-2 block italic">
          {title || alt}
        </span>
      )}
    </span>
  );
}

export default MarkdownImage;
