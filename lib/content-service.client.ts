import { z } from "zod";

const PageDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

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

// Error types (client-safe)
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

// Client-side utility to validate frontmatter
export function validateClientFrontmatter(data: unknown): PageData {
  try {
    return PageDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Invalid frontmatter: ${error.message}`);
    }
    throw new ContentError(
      "Invalid content data",
      "VALIDATION_ERROR",
      400
    );
  }
}