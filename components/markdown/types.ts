import { Frontmatter } from "@/lib/content-loader.types";
import { Components } from "react-markdown";

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// ============================================================================
// MARKDOWN RENDERER PROPS
// ============================================================================

export interface MarkdownRendererProps {
  content: string;
  frontmatter?: Frontmatter;
  className?: string;

  // Display variants
  variant?: "default" | "compact" | "full" | "article";

  // Feature toggles
  enableMath?: boolean;
  enableEmoji?: boolean;
  enableReadingTime?: boolean;

  // Theme
  theme?: "light" | "dark" | "auto";

  // Base URL for relative links/images
  baseUrl?: string;

  // Event handlers
  onHeadingClick?: (id: string) => void;
  onLinkClick?: (href: string) => void;
  onImageClick?: (src: string) => void;

  // Customization
  customComponents?: Partial<Components>;
  allowedElements?: string[];
  disallowedElements?: string[];
}

// ============================================================================
// TABLE OF CONTENTS PROPS
// ============================================================================

export interface TableOfContentsProps {
  headings: Heading[];
  className?: string;

  // Active heading control
  activeId?: string;

  // Scroll behavior
  scrollBehavior?: ScrollBehavior;

  // Display options
  title?: string;
  showTitle?: boolean;

  // Auto-scroll delay
  tocAutoScrollDelay?: number;

  // Event handlers
  onHeadingClick?: (id: string) => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface ReadingTimeStats {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}
