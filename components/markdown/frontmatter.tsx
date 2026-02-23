"use client";

import { Clock, Calendar, User, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading, Text } from "../ui/typography";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import Breadcrumbs, { BreadcrumbItem } from "../breadcrumbs";
import { type Frontmatter } from "@/lib/content-loader.types";

interface FrontmatterProps {
  frontmatter: Frontmatter | null;
  readingTime?: number;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

/*
  Add once to your global CSS (e.g. globals.css) to reuse across components:

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
*/

export function Frontmatter({
  frontmatter,
  readingTime,
  breadcrumbs,
  className,
}: FrontmatterProps) {
  if (!frontmatter || Object.keys(frontmatter).length === 0) return null;

  const hasMetadata =
    frontmatter.date ||
    frontmatter.author ||
    readingTime ||
    typeof frontmatter?.date === "string";

  const tags =
    frontmatter?.keywords && frontmatter?.keywords?.length > 0
      ? frontmatter.keywords
      : null;

  return (
    <Section className="bg-secondary text-secondary-foreground border-b py-4 md:py-12">
      <Container>
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}

        <div className={cn("not-prose mt-4 md:mt-12", className)}>
          {/* Tags */}
          {tags && (
            <div
              className="mb-5 flex flex-wrap gap-2"
              style={{
                animation: "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {tags.map((tag: string, index: number) => (
                <span
                  key={`${tag}-${index}`}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          {frontmatter.title && (
            <Heading
              level="h1"
              style={{
                animation:
                  "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 80ms both",
              }}
            >
              {frontmatter.title}
            </Heading>
          )}

          {/* Description */}
          {frontmatter.description && (
            <Text
              className="mt-6"
              color="muted"
              size={"lg"}
              style={{
                animation:
                  "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both",
              }}
            >
              {frontmatter.description}
            </Text>
          )}

          {/* Metadata */}
          {hasMetadata && (
            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{
                animation:
                  "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 240ms both",
              }}
            >
              {frontmatter.author && (
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>{frontmatter.author}</span>
                </div>
              )}

              {frontmatter.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                </div>
              )}

              {typeof frontmatter?.lastUpdated === "string" && (
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3.5 w-3.5 text-primary" />
                  <span>Sist oppdatert {frontmatter.lastUpdated}</span>
                </div>
              )}

              {readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>ca. {Math.ceil(readingTime)} min lesing</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
