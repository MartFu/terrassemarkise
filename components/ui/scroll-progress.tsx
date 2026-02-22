"use client";

import React, { useEffect, useRef } from "react";

interface ScrollProgressProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
}

export function ScrollProgress({
  targetRef,
  disabled = false,
}: ScrollProgressProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const bar = progressBarRef.current;
    if (!bar) return;

    let frameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        let scrollTop: number;
        let scrollHeight: number;
        let clientHeight: number;

        if (!targetRef?.current) {
          // Window scroll - use documentElement for dimensions
          const docEl = document.documentElement;
          scrollTop = window.pageYOffset || docEl.scrollTop;
          scrollHeight = docEl.scrollHeight;
          clientHeight = docEl.clientHeight;
        } else {
          // Element-specific scroll
          const el = targetRef.current;
          scrollTop = el.scrollTop;
          scrollHeight = el.scrollHeight;
          clientHeight = el.clientHeight;
        }

        const range = scrollHeight - clientHeight;
        const progress = range > 0 ? scrollTop / range : 0;

        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      });
    };

    const target = targetRef?.current || window;

    target.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial sync
    handleScroll();

    return () => {
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [targetRef, disabled]);

  if (disabled) return null;

  return (
    <div className="fixed top-(--header-height) left-0 right-0 h-0.75 bg-muted/50 z-50 overflow-hidden pointer-events-none">
      <div
        ref={progressBarRef}
        className="h-full bg-linear-to-r from-primary to-primary/70 origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
        role="progressbar"
        aria-label="Reading progress"
      />
    </div>
  );
}
