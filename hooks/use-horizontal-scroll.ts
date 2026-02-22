"use client";

import { useRef, useCallback, useState, useEffect } from "react";

interface UseHorizontalScrollOptions {
  scrollAmount?: number;
  wheelMultiplier?: number;
}

interface UseHorizontalScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
  scrollToStart: () => void;
  scrollToEnd: () => void;
  handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  isPastSecondScrollStep: boolean;
}

export function useHorizontalScroll({
  scrollAmount = 320,
  wheelMultiplier = 2,
}: UseHorizontalScrollOptions = {}): UseHorizontalScrollReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isPastSecondScrollStep, setIsPastSecondScrollStep] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    setIsPastSecondScrollStep(scrollLeft >= scrollAmount * 2);
  }, [scrollAmount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, [scrollAmount]);

  const scrollToStart = useCallback(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, []);

  const scrollToEnd = useCallback(() => {
    scrollRef.current?.scrollTo({
      left: scrollRef.current.scrollWidth,
      behavior: "smooth",
    });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      scrollRef.current?.scrollBy({
        left: e.deltaY * wheelMultiplier,
        behavior: "smooth",
      });
    },
    [wheelMultiplier],
  );

  return {
    scrollRef,
    scrollLeft,
    scrollRight,
    scrollToStart,
    scrollToEnd,
    handleWheel,
    isAtStart,
    isAtEnd,
    isPastSecondScrollStep,
  };
}
