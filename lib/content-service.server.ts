
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod";

// Schema validation
const PageDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const ContentSlugSchema = z.string()
  .min(1, "Slug cannot be empty")
  .max(100, "Slug too long")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

export type ContentType = "veiledning" | "juridisk";
export type PageData = z.infer<typeof PageDataSchema>;

export interface ContentItem {
  slug: string;
  frontmatter: PageData;
}

export interface PageResult {
  frontmatter: PageData;
  contentHtml: string;
}

// Error types
export class ContentError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500
  ) {
    super(message);
    this.name = "ContentError";
  }
}

export class NotFoundError extends ContentError {
  constructor(message: string = "Content not found") {
    super(message, "NOT_FOUND", 404);
  }
}

export class ValidationError extends ContentError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

// Utility functions
function validateSlug(slug: string): string {
  try {
    return ContentSlugSchema.parse(slug);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Invalid slug: ${error.message}`);
    }
    throw error;
  }
}

function safeReadFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new NotFoundError(`File not found: ${filePath}`);
    }
    throw new ContentError(
      `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      "READ_ERROR",
      500
    );
  }
}

function safeParseFrontmatter(data: unknown): PageData {
  try {
    return PageDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Invalid frontmatter: ${error.message}`);
    }
    throw error;
  }
}

// Get List of all items for Index Pages (Server only)
export function getAllContent(dir: ContentType): ContentItem[] {
  try {
    const contentPath = path.join(process.cwd(), "content", dir);
    
    if (!fs.existsSync(contentPath)) {
      return [];
    }

    const files = fs.readdirSync(contentPath);
    
    return files
      .filter((fn) => fn.endsWith(".md"))
      .map((fn) => {
        try {
          const fullPath = path.join(contentPath, fn);
          const fileContent = safeReadFile(fullPath);
          const { data } = matter(fileContent);
          
          const validatedData = safeParseFrontmatter(data);
          
          return {
            slug: fn.replace(/\.md$/, ""),
            frontmatter: validatedData,
          };
        } catch (error) {
          console.error(`Error processing file ${fn}:`, error);
          return null;
        }
      })
      .filter((item): item is ContentItem => item !== null)
      .sort((a, b) => {
        const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
        const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
        return dateB - dateA;
      });
  } catch (error) {
    console.error(`Error getting content for ${dir}:`, error);
    throw new ContentError(
      `Failed to get content list: ${error instanceof Error ? error.message : 'Unknown error'}`,
      "LIST_ERROR",
      500
    );
  }
}

// Get Single Page with HTML conversion (Server only)
export async function getPageBySlug(
  dir: ContentType, 
  slug: string
): Promise<PageResult | null> {
  try {
    const validatedSlug = validateSlug(slug);
    
    const filePath = path.join(process.cwd(), "content", dir, `${validatedSlug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new NotFoundError(`Content not found: ${validatedSlug}`);
    }

    const fileContent = safeReadFile(filePath);
    const { data, content } = matter(fileContent);
    
    const validatedData = safeParseFrontmatter(data);

    // Convert Markdown to HTML string safely
    try {
      const processedContent = await remark()
        .use(html)
        .process(content);
      const contentHtml = processedContent.toString();

      return {
        frontmatter: validatedData,
        contentHtml,
      };
    } catch (processingError) {
      throw new ContentError(
        `Failed to process markdown: ${processingError instanceof Error ? processingError.message : 'Unknown error'}`,
        "PROCESSING_ERROR",
        500
      );
    }
  } catch (error) {
    if (error instanceof ContentError) {
      throw error;
    }
    
    console.error(`Unexpected error getting page ${slug}:`, error);
    throw new ContentError(
      `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      "UNEXPECTED_ERROR",
      500
    );
  }
}

// Get all content across both types (Server only)
export function getAllContentAcrossTypes(): Record<ContentType, ContentItem[]> {
  const result: Record<ContentType, ContentItem[]> = {
    veiledning: [],
    juridisk: [],
  };

  for (const contentType of Object.keys(result) as ContentType[]) {
    try {
      result[contentType] = getAllContent(contentType);
    } catch (error) {
      console.error(`Error loading ${contentType} content:`, error);
      // Continue with other content types
    }
  }

  return result;
}