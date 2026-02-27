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
  readTime?: string;
  featured?: boolean;

  // Call-to-action
  ctaText?: string;
  ctaLink?: string;

  // Legal / typed documents
  type?: string;
  key?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: Frontmatter;
  contentPath: string;
  modifiedAt: Date;
}

export interface RenderedContent extends ContentItem {
  contentHtml: string;
  rawContent: string;
  readingTime: number;
}

export interface ContentIndex {
  items: ContentItem[];
  totalCount: number;
  lastUpdated: Date;
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
