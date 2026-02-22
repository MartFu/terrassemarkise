import { clsx, type ClassValue } from "clsx";
import { IntlFormatLocaleOptions } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Truncates a string to a specified length and appends an ellipsis.
 * @param text - The input string to truncate.
 * @param length - The maximum length of the resulting string (including ellipsis).
 * @returns The truncated string or the original string if it's within limits.
 */
export const truncate = (text: string, length: number = 100): string => {
  if (!text || text.length <= length) {
    return text;
  }

  // Ensure we don't return just "..." if length is very small
  const threshold = length > 3 ? length - 3 : length;

  return `${text.substring(0, threshold).trim()}...`;
};

export function remToPx(rem: string): number {
  // Get the numerical value (e.g., 5.625)
  const remValue = parseFloat(rem);

  // Get the actual root font size from the browser
  // This handles cases where the root font-size isn't 16px
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  return remValue * rootFontSize;
}

export function formatPrice(
  price: number,
  options: {
    locale?: IntlFormatLocaleOptions["locale"];
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {
    locale: "nb-NO",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    ...options,
  }).format(price);
}

export function exclude<T extends string, K extends T>(
  list: T[],
  toExclude: K[],
): Exclude<T, K>[] {
  return list.filter((item) => !toExclude.includes(item as any)) as Exclude<
    T,
    K
  >[];
}
