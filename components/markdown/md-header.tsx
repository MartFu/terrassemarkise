"use client";

import { Clock, Calendar, User, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading, Text } from "../ui/typography";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import Breadcrumbs, { BreadcrumbItem } from "../breadcrumbs";
import { type Frontmatter } from "@/lib/content-loader.types";
import { CSSProperties } from "react";
import { Badge } from "../ui/badge";

interface MarkdownHeaderProps {
  frontmatter: Frontmatter | null;
  readingTime?: number;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  overlay?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "none";
}

/*
  Add once to your global CSS (e.g. globals.css) to reuse across components:

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
*/

export function MarkdownHeader({
  frontmatter,
  readingTime,
  breadcrumbs,
  className,
}: MarkdownHeaderProps) {
  if (!frontmatter || Object.keys(frontmatter).length === 0) return null;

  console.log("FRONTMATTER: ", frontmatter);

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
    <Section
      className={"bg-card relative border-b py-8 md:py-12 text-card-foreground"}
    >
      <Container className="grid grid-cols lg:grid-cols-2 gap-8 md:gap-20">
        <div className="w-full h-full">
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}

          <div className={cn("not-prose mt-8", className)}>
            {/* Title */}
            {frontmatter.title && (
              <Heading
                as="h1"
                level="h2"
                className="mb-4"
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
              <p
                className={"text-card-foreground"}
                style={{
                  animation:
                    "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both",
                }}
              >
                {frontmatter.description}
              </p>
            )}

            {/* Metadata */}
            {hasMetadata && (
              <div
                className="my-4 md:mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground"
                style={{
                  animation:
                    "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 240ms both",
                }}
              >
                {frontmatter.author && (
                  <Badge variant="outline">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>{frontmatter.author}</span>
                  </Badge>
                )}

                {frontmatter.date && (
                  <Badge variant="outline">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                  </Badge>
                )}

                {typeof frontmatter?.lastUpdated === "string" && (
                  <Badge variant="outline">
                    <RotateCcw className="h-3.5 w-3.5 text-primary" />
                    <span>Sist oppdatert {frontmatter.lastUpdated}</span>
                  </Badge>
                )}

                {readingTime && (
                  <Badge variant="outline">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>ca. {Math.ceil(readingTime)} min lesing</span>
                  </Badge>
                )}
              </div>
            )}

            {/* Tags */}
            {tags && (
              <div
                className="mb-5 flex flex-wrap gap-2 max-w-xl"
                style={{
                  animation: "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                {tags.map((tag: string, index: number) => (
                  <Badge className="bg-primary/80" key={`${tag}-${index}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        {frontmatter?.thumbnailSrc && (
          <div className="w-full h-full max-h-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frontmatter?.thumbnailSrc}
              alt={frontmatter?.thumbnailAlt || ""}
              className="w-full h-full"
              style={{
                objectFit: frontmatter?.thumbnailObjectFit ?? "cover",
                objectPosition:
                  frontmatter?.thumbnailObjectPosition ?? "center",
                opacity: (frontmatter?.thumbnailOpacity as number) ?? 1,
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </Container>
    </Section>
  );
}

/* 
   {frontmatter?.thumbnailSrc && (
        <div className="absolute inset-0 z-0">
          <img
            src={frontmatter.thumbnailSrc}
            alt={frontmatter?.thumbnailAlt || ""}
            className="w-full h-full"
            style={{
              objectFit: frontmatter?.thumbnailObjectFit ?? "cover",
              objectPosition: frontmatter?.thumbnailObjectPosition ?? "center",
              opacity: (frontmatter?.thumbnailOpacity as number) ?? 1,
            }}
            aria-hidden="true"
          />
          {!frontmatter?.thumbnailOverlayHidden && (
            <>
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/90 to-transparent",
                )}
                aria-hidden="true"
              />
              <div
                className={cn(
                  "block absolute inset-x-0 bottom-0 h-4/5 md:h-2/3 bg-linear-to-t from-black/90 to-transparent",
                )}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      )}

*/
