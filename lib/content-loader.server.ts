import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod";

// Re-export types from safe module
export type {
  ContentType,
  Frontmatter,
  ContentItem,
  RenderedContent,
  ContentIndex,
  ContentErrorCode,
  ContentErrorJSON,
} from "./content-loader.types";

// Re-export errors from safe module
export {
  ContentServiceError,
  NotFoundError,
  ValidationError,
  isNotFoundError,
  formatContentError,
} from "./content-loader.error";

import {
  ContentServiceError,
  NotFoundError,
  ValidationError,
} from "./content-loader.error";
import {
  ContentIndex,
  ContentItem,
  ContentSiblings,
  ContentType,
  Frontmatter,
  RenderedContent,
} from "./content-loader.types";

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONTENT_ROOT = path.join(process.cwd(), "innhold");

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

const FrontmatterSchema = z.object({
  // Core
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  // Accept both "YYYY-MM-DD" date strings and full ISO datetimes
  date: z.string().optional(),
  lastUpdated: z.string().optional(),
  draft: z.boolean().default(false),
  order: z.number().default(0),

  // Authorship & taxonomy
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),

  // Display
  imageUrl: z.string().optional(),
  readTime: z.string().optional(),
  featured: z.boolean().optional(),

  // Thumbnail
  thumbnailSrc: z.string().optional(),
  thumbnailAlt: z.string().optional(),
  thumbnailWidth: z.number().optional(),
  thumbnailHeight: z.number().optional(),
  thumbnailObjectFit: z
    .enum(["contain", "cover", "fill", "none", "scale-down"])
    .optional(),
  thumbnailObjectPosition: z
    .enum(["left", "right", "top", "bottom"])
    .optional(),
  thumbnailOpacity: z.number().min(0).max(1).optional(),
  thumbnailOverlayHidden: z.boolean().optional(),

  // Call-to-action
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
  ctaAlign: z.enum(["left", "center", "right"]).optional(),
  ctaDescription: z.string().optional(),
  ctaIcon: z
    .enum(["arrow", "external", "download", "document", "none"])
    .optional(),
  ctaVariant: z.enum(["default", "compact", "banner", "card"]).optional(),

  // Legal / typed documents
  type: z.string().optional(),
  key: z.string().optional(),
});

const SlugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .max(200, "Slug too long")
  .regex(
    /^[a-z0-9-\/]+$/,
    "Slug can only contain lowercase letters, numbers, hyphens, and forward slashes for subdirectories",
  );

// ============================================================================
// SAFE OPERATIONS (Core safety layer)
// ============================================================================

/**
 * Safely validates a slug string
 */
function safeValidateSlug(slug: string): string {
  const result = SlugSchema.safeParse(slug);
  if (!result.success) {
    throw new ValidationError(`Invalid slug format: ${result.error}`, {
      slug,
      issues: result.error,
    });
  }
  return result.data;
}

/**
 * Safely validates frontmatter data
 */
function safeValidateFrontmatter(data: unknown): Frontmatter {
  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(`Invalid frontmatter: ${result.error}`, {
      issues: result.error,
    });
  }
  return result.data;
}

/**
 * Safely reads a file with proper error handling
 */
function safeReadFile(filePath: string): string {
  try {
    if (!fs.existsSync(filePath)) {
      throw new NotFoundError(filePath, { filePath });
    }
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    if (error instanceof ContentServiceError) throw error;

    throw new ContentServiceError(
      `Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`,
      "READ_ERROR",
      500,
      {
        filePath,
        originalError: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

/**
 * Safely parses markdown frontmatter
 */
function safeParseMatter(content: string, filePath: string) {
  try {
    return matter(content);
  } catch (error) {
    throw new ContentServiceError(
      `Failed to parse frontmatter: ${error instanceof Error ? error.message : "Unknown error"}`,
      "PARSE_ERROR",
      500,
      {
        filePath,
        originalError: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

/**
 * Safely renders markdown to HTML
 */
async function safeRenderMarkdown(
  content: string,
  filePath: string,
): Promise<string> {
  try {
    const processed = await remark()
      .use(html, { sanitize: true })
      .process(content);
    return processed.toString();
  } catch (error) {
    throw new ContentServiceError(
      `Failed to render markdown: ${error instanceof Error ? error.message : "Unknown error"}`,
      "RENDER_ERROR",
      500,
      {
        filePath,
        originalError: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

/**
 * Safely gets file stats
 */
function safeGetStats(filePath: string): { modifiedAt: Date } {
  try {
    const stats = fs.statSync(filePath);
    return { modifiedAt: stats.mtime };
  } catch {
    // Non-critical error, return current date
    return { modifiedAt: new Date() };
  }
}

/**
 * Calculates reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// ============================================================================
// CORE SERVICE FUNCTIONS
// ============================================================================

/**
 * Resolves a content directory path, supporting nested subdirectories
 * Examples: "veiledning", "veiledning/artikler", "juridisk/vilkår"
 */
function resolveContentPath(dirPath: string): string {
  // Security: Prevent directory traversal
  const normalized = path.normalize(dirPath).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(CONTENT_ROOT, normalized);
}

/**
 * Recursively scans a directory for .md files
 */
function scanDirectory(
  dirPath: string,
  baseSlug: string = "",
  results: Array<{ fullPath: string; slug: string }> = [],
): Array<{ fullPath: string; slug: string }> {
  try {
    if (!fs.existsSync(dirPath)) {
      return results;
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const entrySlug = baseSlug
        ? `${baseSlug}/${entry.name.replace(/\.md$/, "")}`
        : entry.name.replace(/\.md$/, "");

      if (entry.isDirectory()) {
        // Recurse into subdirectories
        scanDirectory(fullPath, entrySlug, results);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push({ fullPath, slug: entrySlug });
      }
    }

    return results;
  } catch (error) {
    throw new ContentServiceError(
      `Failed to scan directory: ${error instanceof Error ? error.message : "Unknown error"}`,
      "DIRECTORY_ERROR",
      500,
      {
        dirPath,
        originalError: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Get all content from a directory (including subdirectories)
 * Returns empty array on any error - never throws to frontend
 */
export async function getAllContent(
  contentType: ContentType,
  options: {
    includeDrafts?: boolean;
    sortBy?: "date" | "order" | "title" | "featured";
    sortOrder?: "asc" | "desc";
  } = {},
): Promise<ContentIndex> {
  const {
    includeDrafts = false,
    sortBy = "date",
    sortOrder = "desc",
  } = options;

  try {
    const contentPath = resolveContentPath(contentType);
    const files = scanDirectory(contentPath);

    const items: ContentItem[] = [];

    for (const { fullPath, slug } of files) {
      try {
        // Individual file errors don't crash the whole operation
        const fileContent = safeReadFile(fullPath);
        const { data } = safeParseMatter(fileContent, fullPath);
        const frontmatter = safeValidateFrontmatter(data);
        const { modifiedAt } = safeGetStats(fullPath);

        // Skip drafts unless explicitly included
        if (frontmatter.draft && !includeDrafts) continue;

        items.push({
          slug,
          frontmatter,
          contentPath: fullPath,
          modifiedAt,
        });
      } catch (itemError) {
        // Log but don't crash - skip problematic files
        console.warn(`[ContentService] Skipping file ${fullPath}:`, itemError);
        continue;
      }
    }

    // Sort results
    const sorted = items.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          const dateA = a.frontmatter.date
            ? new Date(a.frontmatter.date).getTime()
            : 0;
          const dateB = b.frontmatter.date
            ? new Date(b.frontmatter.date).getTime()
            : 0;
          comparison = dateB - dateA;
          break;
        case "order":
          comparison = (a.frontmatter.order || 0) - (b.frontmatter.order || 0);
          break;
        case "title":
          comparison = (a.frontmatter.title || "").localeCompare(
            b.frontmatter.title || "",
          );
          break;
        case "featured":
          // Featured items sort before non-featured
          comparison =
            (b.frontmatter.featured ? 1 : 0) - (a.frontmatter.featured ? 1 : 0);
          break;
      }

      return sortOrder === "asc" ? -comparison : comparison;
    });

    return {
      items: sorted,
      totalCount: sorted.length,
      lastUpdated: new Date(),
    };
  } catch (error) {
    // Top-level error returns empty result rather than crashing
    console.error(
      `[ContentService] Failed to load content for ${contentType}:`,
      error,
    );

    return {
      items: [],
      totalCount: 0,
      lastUpdated: new Date(),
    };
  }
}

/**
 * Get a single content item by slug
 * Supports nested slugs like "veiledning/artikler/some-article"
 */
export async function getContentBySlug(
  contentType: ContentType,
  slug: string,
): Promise<RenderedContent | null> {
  try {
    const validatedSlug = safeValidateSlug(slug);
    const contentPath = resolveContentPath(contentType);

    // Try direct file path first
    let filePath = path.join(contentPath, `${validatedSlug}.md`);

    // If not found, try as nested path (e.g., "artikler/some-article" -> "artikler/some-article.md")
    if (!fs.existsSync(filePath) && validatedSlug.includes("/")) {
      filePath = path.join(contentPath, validatedSlug) + ".md";
    }

    const rawContent = safeReadFile(filePath);
    const { data, content } = safeParseMatter(rawContent, filePath);
    const frontmatter = safeValidateFrontmatter(data);
    const contentHtml = await safeRenderMarkdown(content, filePath);
    const { modifiedAt } = safeGetStats(filePath);

    return {
      slug: validatedSlug,
      frontmatter,
      contentPath: filePath,
      modifiedAt,
      contentHtml,
      rawContent: content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    if (error instanceof ContentServiceError && error.code === "NOT_FOUND") {
      return null;
    }

    // Log unexpected errors but return null to prevent crashes
    console.error(
      `[ContentService] Error loading content ${contentType}/${slug}:`,
      error,
    );
    return null;
  }
}

/**
 * Get content across multiple types
 */
export async function getAllContentAcrossTypes(
  types: ContentType[],
  options?: Parameters<typeof getAllContent>[1],
): Promise<Record<string, ContentIndex>> {
  const results: Record<string, ContentIndex> = {};

  for (const type of types) {
    results[type] = await getAllContent(type, options);
  }

  return results;
}

/**
 * Search content (basic implementation)
 */
export async function searchContent(
  contentType: ContentType,
  query: string,
): Promise<ContentItem[]> {
  try {
    const { items } = await getAllContent(contentType, {
      includeDrafts: false,
    });
    const lowerQuery = query.toLowerCase();

    return items.filter((item) => {
      const { frontmatter } = item;
      const titleMatch = frontmatter.title?.toLowerCase().includes(lowerQuery);
      const descMatch = frontmatter.description
        ?.toLowerCase()
        .includes(lowerQuery);
      const excerptMatch = frontmatter.excerpt
        ?.toLowerCase()
        .includes(lowerQuery);
      const keywordMatch = frontmatter.keywords?.some((k) =>
        k.toLowerCase().includes(lowerQuery),
      );
      const tagMatch = frontmatter.tags?.some((t) =>
        t.toLowerCase().includes(lowerQuery),
      );
      const authorMatch = frontmatter?.author
        ?.toLowerCase()
        .includes(lowerQuery);

      return (
        titleMatch ||
        descMatch ||
        excerptMatch ||
        keywordMatch ||
        tagMatch ||
        authorMatch
      );
    });
  } catch {
    return [];
  }
}

/**
 * Get previous and next siblings for navigation
 * Uses order field primarily, falls back to date
 */
export async function getContentSiblings(
  contentType: ContentType,
  currentSlug: string,
  options: {
    sortBy?: "order" | "date";
    sortOrder?: "asc" | "desc";
    filterByCategory?: string;
  } = {},
): Promise<ContentSiblings> {
  const { sortBy = "order", sortOrder = "asc", filterByCategory } = options;

  try {
    const validatedSlug = safeValidateSlug(currentSlug);
    const { items } = await getAllContent(contentType, {
      includeDrafts: false,
      sortBy: sortBy === "date" ? "date" : "order",
      sortOrder,
    });

    // Filter by category if specified
    const filteredItems = filterByCategory
      ? items.filter((item) => item.frontmatter.category === filterByCategory)
      : items;

    const currentIndex = filteredItems.findIndex(
      (item) => item.slug === validatedSlug,
    );

    if (currentIndex === -1) {
      throw new NotFoundError(`Content not found: ${validatedSlug}`, {
        slug: validatedSlug,
        contentType,
      });
    }

    return {
      previous: currentIndex > 0 ? filteredItems[currentIndex - 1] : null,
      next:
        currentIndex < filteredItems.length - 1
          ? filteredItems[currentIndex + 1]
          : null,
      currentIndex,
      total: filteredItems.length,
    };
  } catch (error) {
    if (error instanceof ContentServiceError) throw error;

    throw new ContentServiceError(
      `Failed to get content siblings: ${error instanceof Error ? error.message : "Unknown error"}`,
      "UNKNOWN_ERROR",
      500,
      {
        contentType,
        slug: currentSlug,
        originalError: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

// ============================================================================
// CLIENT-SAFE UTILITIES
// ============================================================================

/**
 * Client-side validation that doesn't depend on Node APIs
 */
export function validateFrontmatterClient(data: unknown): Frontmatter | null {
  const result = FrontmatterSchema.safeParse(data);
  return result.success ? result.data : null;
}
