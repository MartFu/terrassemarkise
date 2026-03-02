export type ContentType = "veiledning" | "juridisk" | string;

export interface Frontmatter {
  // Core
  title?: string;
  subtitle?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  lastUpdated?: string;
  draft?: boolean;
  order?: number;

  // Authorship & taxonomy
  author?: string;
  category?: string;
  tags?: string[];
  keywords?: string[];

  // Display
  imageUrl?: string;
  imageAlt?: string;
  readTime?: string;
  featured?: boolean;

  // Thumbnail settings
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  thumbnailObjectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  thumbnailObjectPosition?: "left" | "right" | "top" | "bottom";
  thumbnailOpacity?: number;
  thumbnailOverlayHidden?: boolean;

  // Call-to-action
  ctaHeading?: string;
  ctaDescription?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  ctaAlign?: "left" | "center" | "right";
  ctaIcon?: "arrow" | "external" | "download" | "document" | "none";
  ctaVariant?: "default" | "compact" | "banner" | "card";

  // Legal / typed documents
  type?: string;
  key?: string;
}

export interface RenderedContent extends ContentItem {
  contentHtml: string;
  rawContent: string;
  readingTime: number;
}

export interface ContentItem {
  slug: string;
  frontmatter: Frontmatter;
  contentPath: string;
  modifiedAt: Date;
}

export interface ContentIndex {
  items: ContentItem[];
  totalCount: number;
  lastUpdated: Date;
}

export interface ContentNavItem {
  slug: string;
  title?: string;
  excerpt?: string;
  imageSrc?: string;
}

export interface ContentSiblings {
  previous: ContentItem | null;
  next: ContentItem | null;
  currentIndex: number;
  total: number;
}

// Error codes only - no server imports
export type ContentErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "READ_ERROR"
  | "PARSE_ERROR"
  | "RENDER_ERROR"
  | "DIRECTORY_ERROR"
  | "UNKNOWN_ERROR";

export interface ContentErrorJSON {
  error: string;
  code: ContentErrorCode;
  message: string;
  statusCode: number;
}
