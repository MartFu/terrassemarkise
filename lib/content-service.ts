
import { ContentType } from "@/types";

// Re-export server types and functions
export type { ContentType, PageData, ContentItem, PageResult } from "./content-service.server";
export { ContentError, NotFoundError, ValidationError } from "./content-service.server";

// Dynamic imports for server-only functions
export async function getAllContent(dir: ContentType) {
  const { getAllContent: serverGetAllContent } = await import("./content-service.server");
  return serverGetAllContent(dir);
}

export async function getPageBySlug(dir: ContentType, slug: string) {
  const { getPageBySlug: serverGetPageBySlug } = await import("./content-service.server");
  return serverGetPageBySlug(dir, slug);
}

export async function getAllContentAcrossTypes() {
  const { getAllContentAcrossTypes: serverGetAllContentAcrossTypes } = await import("./content-service.server");
  return serverGetAllContentAcrossTypes();
}

// Export client-safe functions
export { validateClientFrontmatter } from "./content-service.client";