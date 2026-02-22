"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  TouchEvent,
} from "react";
import { Container } from "../ui/container";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
  /** Auto-advance interval in ms. Set to 0 to disable. Default: 5000 */
  autoplay?: number;
  /** Show dot indicators. Default: true */
  showDots?: boolean;
  /** Show prev/next arrow buttons. Default: true */
  showArrows?: boolean;
  /** The type of arrow. Standard, compact or both */
  arrowType?: "standard" | "compact" | "both";
  /** Show image caption if provided. Default: true */
  showCaptions?: boolean;
  /** Loop back to start. Default: true */
  loop?: boolean;
  /** Called when the active slide changes */
  onChange?: (index: number) => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageCarousel({
  images,
  autoplay = 5000,
  showDots = true,
  showArrows = true,
  showCaptions = true,
  arrowType,
  loop = true,
  onChange,
  className = "",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      const next = loop
        ? ((index % total) + total) % total
        : Math.max(0, Math.min(index, total - 1));
      setCurrent(next);
      setProgress(0);
      onChange?.(next);
    },
    [loop, total, onChange],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Autoplay with smooth progress
  useEffect(() => {
    if (autoplay <= 0 || isHovered || isDragging || !loop) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    const step = 100 / (autoplay / 50); // Update every 50ms

    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + step;
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setProgress(0);
      next();
    }, autoplay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [autoplay, isHovered, isDragging, next, loop]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ── Touch / swipe ──────────────────────────────────────────────────────────

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(false);
    setDragOffset(0);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    setDragOffset(dx);
    setIsDragging(true);
  };

  const onTouchEnd = () => {
    if (Math.abs(dragOffset) > 50) {
      dragOffset < 0 ? next() : prev();
    }
    setIsDragging(false);
    setDragOffset(0);
    touchStartX.current = null;
  };

  if (total === 0) return null;

  const canGoPrev = loop || current > 0;
  const canGoNext = loop || current < total - 1;

  const translateX = isDragging
    ? `calc(${-current * 100}% + ${dragOffset}px)`
    : `${-current * 100}%`;

  return (
    <div
      className={`relative group w-full h-full select-none overflow-hidden ${className}`}
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showArrows && (arrowType === "both" || arrowType === "standard") && (
        <Container className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
          <button
            disabled={!canGoPrev}
            onClick={prev}
            className="h-12 w-12 pointer-events-auto transition-[colors_opacity] flex items-center justify-center rounded-full group-hover:opacity-100 opacity-0 backdrop-blur-md bg-white/30 hover:bg-white/50 disabled:bg-white/10 disabled:cursor-default cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            disabled={!canGoNext}
            onClick={next}
            className="h-12 w-12 pointer-events-auto transition-[colors_opacity] flex items-center justify-center rounded-full group-hover:opacity-100 opacity-0 backdrop-blur-md bg-white/30 hover:bg-white/50 disabled:bg-white/10 disabled:cursor-default cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </Container>
      )}

      {/* ── Track ───────────────────────────────────────────────────────────── */}
      <div
        className="flex h-full w-full touch-pan-y"
        style={{
          transform: `translateX(${translateX})`,
          transition: isDragging
            ? "none"
            : "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-none w-full h-full overflow-hidden"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            aria-hidden={i !== current}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Caption overlay */}
            {showCaptions && img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-6 pt-20">
                <p className="text-white text-sm font-medium tracking-tight max-w-prose">
                  {img.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Bottom Controls Container ────────────────────────────────────────── */}
      <Container className="absolute z-5 bottom-4 inset-x-0 flex items-end justify-start px-4 gap-2 pointer-events-none">
        {/* Counter */}
        <div className="px-3 py-1.5 h-7 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-xs font-medium tabular-nums pointer-events-auto">
          <span className="text-white">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/50 mx-1">/</span>
          <span className="text-white/50">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {showArrows && (arrowType === "both" || arrowType === "compact") && (
          <div className="flex items-center gap-1 px-2 h-7 bg-black/70 rounded-full backdrop-blur-md text-white text-xs font-medium pointer-events-auto">
            <button
              disabled={!canGoPrev}
              onClick={prev}
              className="h-4 w-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/10 disabled:bg-white/10 disabled:cursor-default cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={!canGoNext}
              onClick={next}
              className="h-4 w-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/10 disabled:bg-white/10 disabled:cursor-default cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Dots */}
        {showDots && total > 1 && (
          <div
            className="flex items-center h-7 gap-1.5 pointer-events-auto bg-black/70 backdrop-blur-sm px-2 rounded-full"
            role="tablist"
            aria-label="Slides"
          >
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={[
                  "h-3 rounded-full transition-all duration-500 ease-out cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                  i === current
                    ? "w-9 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/60",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </Container>

      {/* ── Progress Bar ───────────────────────────────────────────────────────── */}
      {autoplay > 0 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-white/80 backdrop-blur-sm transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
