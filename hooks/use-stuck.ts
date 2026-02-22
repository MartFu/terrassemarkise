import { remToPx } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function useStuck<T extends HTMLElement>({
  getSentinelParent = (el) => el.parentNode as HTMLElement,
  getTargets = (el) => [el],
  rootMarginBottom = 0,
}: {
  getSentinelParent?: (el: T) => HTMLElement | null;
  getTargets?: (el: T) => HTMLElement[];
  rootMarginBottom?: number;
} = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sentinelParent = getSentinelParent(el);
    if (!sentinelParent) return;

    const sentinel = document.createElement("div");
    sentinelParent.insertBefore(sentinel, sentinelParent.firstChild);

    const targets = getTargets(el);

    const rootMarginTop = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height")
      .trim();

    const observer = new IntersectionObserver(
      ([entry]) => {
        targets.forEach((target) => {
          target.toggleAttribute("data-stuck", !entry.isIntersecting);
        });
      },
      {
        rootMargin: `-${remToPx(rootMarginTop)}px 0px ${rootMarginBottom}px 0px`,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [getSentinelParent, getTargets]);

  return ref;
}
