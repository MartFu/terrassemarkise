import { ContentErrorCode, ContentErrorJSON } from "./content-loader.types";

export class ContentServiceError extends Error {
  constructor(
    message: string,
    public code: ContentErrorCode,
    public statusCode: number,
    public context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ContentServiceError";
  }

  toJSON(): ContentErrorJSON {
    return {
      error: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };
  }

  static fromJSON(json: ContentErrorJSON): ContentServiceError {
    return new ContentServiceError(json.message, json.code, json.statusCode);
  }
}

export class NotFoundError extends ContentServiceError {
  constructor(resource: string, context?: Record<string, unknown>) {
    super(`Content not found: ${resource}`, "NOT_FOUND", 404, context);
  }
}

export class ValidationError extends ContentServiceError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, context);
  }
}

// Client-safe check function
export function isNotFoundError(error: unknown): boolean {
  return error instanceof ContentServiceError && error.code === "NOT_FOUND";
}

export function formatContentError(error: unknown): {
  message: string;
  code: ContentErrorCode;
  isNotFound: boolean;
} {
  if (error instanceof ContentServiceError) {
    return {
      message: error.message,
      code: error.code,
      isNotFound: error.code === "NOT_FOUND",
    };
  }

  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
    isNotFound: false,
  };
}
