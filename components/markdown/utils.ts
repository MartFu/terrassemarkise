// ============================================================================
// URL HASH MANAGEMENT
// ============================================================================

import { isValidElement, ReactElement, ReactNode } from "react";

export function updateUrlHash(hash: string, replace: boolean = false) {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    url.hash = hash;

    if (replace) {
      window.history.replaceState(null, "", url.toString());
    } else {
      window.history.pushState(null, "", url.toString());
    }
  } catch (error) {
    console.error("Failed to update URL hash:", error);
  }
}

// ============================================================================
// FRONTMATTER EXTRACTION
// ============================================================================

export interface Frontmatter {
  [key: string]: unknown;
}

/**
 * Extracts YAML-like frontmatter from markdown content.
 * Consolidates parsing logic for strings, numbers, booleans, and arrays.
 */
export function extractFrontmatter(content: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  if (!content || typeof content !== "string") {
    return { frontmatter: {}, content: "" };
  }

  // Matches text between triple dashes at the start of the string
  const frontmatterRegex = /^\s*---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = content.match(frontmatterRegex);

  console.log("CONTENT", content);
  console.log("MATCH", match);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);
  const frontmatter: Frontmatter = {};

  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const rawValue = line.slice(colonIndex + 1).trim();

      // Basic cleanup: remove quotes
      const cleanValue: string = rawValue.replace(/^["']|["']$/g, "");

      // Value Type Casting
      if (cleanValue.startsWith("[") && cleanValue.endsWith("]")) {
        frontmatter[key] = cleanValue
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""));
      } else if (cleanValue === "true") {
        frontmatter[key] = true;
      } else if (cleanValue === "false") {
        frontmatter[key] = false;
      } else if (cleanValue === "null") {
        frontmatter[key] = null;
      } else if (!isNaN(Number(cleanValue)) && cleanValue !== "") {
        frontmatter[key] = Number(cleanValue);
      } else {
        frontmatter[key] = cleanValue;
      }
    }
  });

  return { frontmatter, content: contentWithoutFrontmatter };
}

// ============================================================================
// TEXT EXTRACTION FROM REACT CHILDREN
// ============================================================================

/**
 * Extracts text content from React children in a type-safe manner
 */
export function extractTextFromChildren(children: ReactNode): string {
  // Handle Primitives
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);

  // Handle Null/Undefined/Booleans (which React doesn't render)
  if (!children || typeof children === "boolean") return "";

  // Handle Arrays (Fragments or multiple children)
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  // Handle Valid React Elements (Objects with props)
  // isValidElement is a built-in Type Guard that narrows to ReactElement
  if (isValidElement(children)) {
    // Narrow to an element that specifically has children in its props
    const element = children as ReactElement<{ children?: ReactNode }>;

    if (element.props.children) {
      return extractTextFromChildren(element.props.children);
    }
  }

  // Handle Iterables (like Map or Set, though rare in this context)
  if (typeof children === "object" && Symbol.iterator in children) {
    return Array.from(children as Iterable<ReactNode>)
      .map(extractTextFromChildren)
      .join("");
  }

  return "";
}

// ============================================================================
// SAFE INTERSECTION OBSERVER
// ============================================================================

export function createSafeObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    // Return a mock observer for SSR
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {},
      takeRecords: () => [],
      root: null,
      rootMargin: "",
      thresholds: [],
    } as IntersectionObserver;
  }

  return new IntersectionObserver(callback, options);
}

// ============================================================================
// SCROLL CONTAINER TO ELEMENT
// ============================================================================

export function scrollContainerToElement(
  container: HTMLElement,
  element: HTMLElement,
  options: { behavior?: ScrollBehavior } = {},
) {
  if (!container || !element) return;

  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const relativeTop = elementRect.top - containerRect.top;
  const relativeBottom = elementRect.bottom - containerRect.bottom;

  // Only scroll if element is not fully visible
  if (relativeTop < 0 || relativeBottom > 0) {
    const scrollTop = container.scrollTop + relativeTop - 20; // 20px padding

    container.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: options.behavior || "smooth",
    });
  }
}

// ============================================================================
// GENERATE HEADING ID
// Must match the ID generation in markdown components
// ============================================================================

export function generateHeadingId(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, "") || "heading" // Remove leading/trailing hyphens
  );
}

// ============================================================================
// COPY TO CLIPBOARD
// ============================================================================

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand("copy");
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}
