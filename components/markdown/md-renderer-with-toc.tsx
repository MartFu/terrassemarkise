"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./md-renderer";
import { TableOfContents } from "./table-of-contents";
import { Heading, MarkdownRendererProps, TableOfContentsProps } from "./types";
import { Container } from "@/components/ui/container";
import { MarkdownHeader } from "./md-header";
import readingTime from "reading-time";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BreadcrumbItem } from "../breadcrumbs";
import { useScrollContainer } from "@/context/scroll-container-provider";
import { usePathname, useRouter } from "next/navigation";
import { MarkdownCTA } from "./md-cta";
import { Section } from "../ui/section";
import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";
import { MarkdownNavigation } from "./md-navigation";
import { ContentSiblings } from "@/lib/content-loader.types";

export interface MarkdownRendererWithTocProps
  extends
    MarkdownRendererProps,
    Pick<TableOfContentsProps, "scrollBehavior" | "title" | "showTitle"> {
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  frontmatterDisplay?: React.ReactNode;
  contentClassName?: string;
  tocClassName?: string;
  tocContainerClassName?: string;
  asideClassName?: string;
  footerSlot?: React.ReactNode;
  showProgress?: boolean;
  scrollOffset?: number;
  siblings?: ContentSiblings;
}

export function MarkdownRendererWithToc({
  content,
  frontmatter,
  frontmatterDisplay,
  breadcrumbs,
  variant = "default",
  enableMath = true,
  enableEmoji = true,
  enableReadingTime = true,
  baseUrl = "",
  showProgress = true,
  onLinkClick,
  onImageClick,
  customComponents = {},
  allowedElements,
  disallowedElements,
  scrollBehavior = "smooth",
  title = "Innholdsfortegnelse",
  showTitle = true,
  className,
  contentClassName,
  tocClassName,
  footerSlot,
  scrollOffset = 120,
  siblings,
}: MarkdownRendererWithTocProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const { containerRef: scrollContainerRef } = useScrollContainer();

  const router = useRouter();
  const pathname = usePathname();

  const readingStats = useMemo(() => {
    if (!content) return;
    return readingTime(content);
  }, [content]);

  // Extract headings from rendered DOM
  const extractHeadings = useCallback(() => {
    if (!contentRef.current) return;
    const headingElements = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );
    const extracted = Array.from(headingElements)
      .map((el) => ({
        id: el.id,
        text: el.textContent?.trim() || "",
        level: parseInt(el.tagName[1]),
      }))
      .filter((h): h is Heading => Boolean(h.id && h.text));
    setHeadings(extracted);
  }, []);

  // Single effect to extract headings after content renders
  useEffect(() => {
    if (headings.length > 0) return;

    const frameId = requestAnimationFrame(extractHeadings);
    return () => cancelAnimationFrame(frameId);
  }, [content, extractHeadings, headings]);

  const scroll = useCallback(
    (hash: string) => {
      const container = scrollContainerRef?.current;
      const heading = contentRef.current?.querySelector(`[id="${hash}"]`);
      if (!heading) return;

      const headingRect = heading.getBoundingClientRect();

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeTop =
          headingRect.top -
          containerRect.top +
          container.scrollTop -
          scrollOffset;
        container.scrollTo({
          top: Math.max(0, relativeTop),
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: window.scrollY + headingRect.top - scrollOffset,
          behavior: scrollBehavior,
        });
      }
    },
    [scrollContainerRef, scrollBehavior, scrollOffset],
  );

  const handleHeadingClick = useCallback(
    (id: string) => {
      if (!contentRef?.current) return;

      router.replace(`${pathname}#${id}`, { scroll: false });
      scroll(id);
    },
    [scrollBehavior],
  );

  return (
    <div className={cn("relative", className)}>
      <ScrollProgress targetRef={scrollContainerRef} disabled={!showProgress} />

      {/* Frontmatter display */}
      {frontmatter && (
        <MarkdownHeader
          breadcrumbs={breadcrumbs}
          frontmatter={frontmatter}
          readingTime={readingStats?.minutes}
        />
      )}

      {!frontmatter && frontmatterDisplay && (
        <div className="bg-red-500 p-2 rounded-xl flex items-center justify-center mx-auto">
          Custom frontmatter display not yet available
        </div>
      )}

      <Section>
        <Container className="h-full">
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-[1fr_15rem] gap-6 lg:gap-8",
            )}
          >
            <div
              className={cn(
                "min-h-0 flex flex-col px-1 relative",
                contentClassName,
              )}
            >
              <div
                ref={contentRef}
                className="mx-auto prose prose-neutral max-w-[64ch] dark:prose-invert"
              >
                <MarkdownRenderer
                  content={content}
                  variant={variant}
                  enableMath={enableMath}
                  enableEmoji={enableEmoji}
                  frontmatter={frontmatter}
                  enableReadingTime={enableReadingTime}
                  baseUrl={baseUrl}
                  onLinkClick={onLinkClick}
                  onImageClick={onImageClick}
                  customComponents={customComponents}
                  allowedElements={allowedElements}
                  disallowedElements={disallowedElements}
                  onHeadingClick={handleHeadingClick}
                />
              </div>

              {footerSlot && (
                <div className="mx-auto max-w-[64ch] mt-12">{footerSlot}</div>
              )}

              <div className="sticky bottom-0 inset-x-0 bg-linear-to-t from-background via-background/80 to-transparent h-2 md:h-12 pointer-events-none" />
            </div>
            <TableOfContents
              headings={headings}
              title={title}
              showTitle={showTitle}
              className={tocClassName}
              onHeadingClick={handleHeadingClick}
            />
          </div>
        </Container>
      </Section>

      {(frontmatter?.ctaText || footerSlot) && (
        <Section spacing={"sm"}>
          <Container>
            {footerSlot && footerSlot}

            {frontmatter?.ctaText && (
              <MarkdownCTA
                text={frontmatter?.ctaText ?? "Se vårt utvalg i nettbutikken"}
                link={
                  frontmatter?.ctaLink ??
                  EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS_TERRACE_AWNINGS
                }
                secondaryText={
                  frontmatter?.ctaSecondary ?? "Lær mer om være produkter"
                }
                secondaryLink={
                  frontmatter?.ctaSecondaryLink ?? SITE_URLS.ARTICLES
                }
                variant={frontmatter?.ctaVariant ?? "banner"}
                heading={
                  frontmatter?.ctaHeading ??
                  "Gjør terrassen til det perfekte stedet å tilbringe sommeren!"
                }
                description={frontmatter?.ctaDescription}
                icon={frontmatter?.ctaIcon || "external"}
                align={frontmatter?.ctaAlign || "center"}
              />
            )}
            <MarkdownNavigation
              previous={
                siblings?.previous
                  ? {
                      slug: siblings.previous.slug,
                      title: siblings.previous?.frontmatter?.title,
                      excerpt: siblings.previous?.frontmatter?.excerpt,
                      imageSrc: siblings.previous?.frontmatter?.thumbnailSrc,
                    }
                  : null
              }
              next={
                siblings?.next
                  ? {
                      slug: siblings.next.slug,
                      title: siblings.next?.frontmatter?.title,
                      excerpt: siblings.next?.frontmatter?.excerpt,
                      imageSrc: siblings.next?.frontmatter?.thumbnailSrc,
                    }
                  : null
              }
              basePath="/ressurser/artikler"
            />
          </Container>
        </Section>
      )}
    </div>
  );
}
