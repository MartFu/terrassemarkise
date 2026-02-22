"use client";

import { easeOutQuart } from "@/lib/easing";
import React, { useEffect, useState, useRef } from "react";

interface CounterAnimationProps {
  /** The target number to count up to */
  end: number;
  /** Duration in milliseconds to reach the target number */
  duration?: number;
  /** Starting number (defaults to 0) */
  start?: number;
  /** Number of decimal places to show (defaults to 0 for integers) */
  decimals?: number;
  /** Optional CSS class name */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Format function for custom number formatting */
  format?: (value: number) => string;
  /** Custom easing function */
  easing?: (x: number) => number;
}

export function CounterAnimation({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  className,
  style,
  format,
  easing = easeOutQuart,
}: CounterAnimationProps) {
  const [count, setCount] = useState(start);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    // Reset animation state
    startTimeRef.current = null;

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        // Set initial value
        setCount(start);
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      const easedPercentage = easing(percentage);
      const currentCount = start + (end - start) * easedPercentage;

      setCount(currentCount);

      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at the target
        setCount(end);
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration, start, easing]);

  // Format the number
  const formattedValue = format ? format(count) : count.toFixed(decimals);

  return (
    <span className={className} style={style}>
      {formattedValue}
    </span>
  );
}
