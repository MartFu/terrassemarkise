import React, { CSSProperties } from "react";
import { Section, SectionProps } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Heading, Text } from "@/components/ui/typography";
import Breadcrumbs, { BreadcrumbItem } from "@/components/breadcrumbs";
import { Stack, StackProps } from "@/components/ui/stack";

export interface PageHeaderProps {
  title: string | string[];
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumbsOptions?: {
    className?: string;
  };
  sectionSpacing?: SectionProps["spacing"];
  contentStackOptions?: Omit<StackProps<"div">, "children">;

  layout?: "default" | "compact" | "centered" | "split";
  actions?: React.ReactNode;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundImageOptions?: {
    objectFit?: CSSProperties["objectFit"];
    objectPosition?: CSSProperties["objectPosition"];
    opacity?: number;
  };
  overlay?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "none";
  splitSlot?: React.ReactNode;
  className?: string;
}

/**
 * PageHeader - A flexible, accessible hero component for internal pages
 *
 * Features:
 * - Multiple layout variants for different content needs
 * - Optional background images with overlay control
 * - Breadcrumb navigation with proper ARIA labels
 * - Action button/CTA support
 * - Decorative element slot for custom graphics
 * - Fully responsive with mobile-first approach
 *
 * @example
 * ```tsx
 * // Default layout with breadcrumbs
 * <PageHeader
 *   title="About Us"
 *   description="Learn more about our mission and values"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About' }
 *   ]}
 * />
 *
 * // Centered layout with background image
 * <PageHeader
 *   title="Our Services"
 *   description="Comprehensive solutions for your business"
 *   layout="centered"
 *   backgroundImage="/assets/hero-bg.webp"
 *   overlay="medium"
 *   actions={
 *     <>
 *       <Button>Get Started</Button>
 *       <Button variant="outline">Learn More</Button>
 *     </>
 *   }
 * />
 *
 * // Split layout with decorative element
 * <PageHeader
 *   title="Contact Us"
 *   description="We'd love to hear from you"
 *   layout="split"
 *   splitSlot={<ContactIllustration />}
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  breadcrumbsOptions,
  sectionSpacing,
  contentStackOptions,
  layout = "default",
  actions,
  backgroundImage,
  backgroundImageAlt,
  backgroundImageOptions = {
    objectFit: "cover",
    objectPosition: "center",
    opacity: 0.15,
  },
  overlay = "sm",
  splitSlot,
  className = "",
}: PageHeaderProps) {
  // Layout-specific styles
  const layoutStyles: Record<
    string,
    Record<string, string> & { section: SectionProps["spacing"] }
  > = {
    default: {
      section: "sm",
      container: "grid grid-cols-1 gap-8",
      content: "max-w-3xl",
    },
    compact: {
      section: "xs",
      container: "grid grid-cols-1 gap-6",
      content: "max-w-2xl",
    },
    centered: {
      section: "lg",
      container: "flex flex-col items-center text-center",
      content: "max-w-3xl mx-auto",
    },
    split: {
      section: "lg",
      container:
        "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
      content: "max-w-2xl",
    },
  };

  const currentLayout = splitSlot ? layoutStyles.split : layoutStyles[layout];

  return (
    <Section
      spacing={sectionSpacing ? sectionSpacing : currentLayout.section}
      className={cn(
        className,
        "relative w-full overflow-hidden grid text-white",
      )}
    >
      {/* Background Image Layer */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt={backgroundImageAlt || ""}
            className="w-full h-full"
            style={{
              objectFit: backgroundImageOptions.objectFit,
              objectPosition: backgroundImageOptions.objectPosition,
              opacity: backgroundImageOptions.opacity,
            }}
            aria-hidden="true"
          />
          {/* Overlay */}
          {overlay !== "none" && (
            <>
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/80 to-transparent",
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

      <Container className={cn("relative z-10 min-h-80 h-full w-full")}>
        <Stack justify={"between"} preset="card" className="h-full w-full">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs
              className={cn("text-white", breadcrumbsOptions?.className)}
              breadcrumbs={breadcrumbs}
              centered={layout === "centered"}
            />
          )}

          {/* Title & Description */}
          <Stack
            className={cn(
              "h-full w-full flex-wrap",
              contentStackOptions?.className,
            )}
            space={4}
            direction={{
              base: "col",
              md: "row",
            }}
            align={{
              base: "start",
              md: "end",
            }}
            justify={{
              base: "end",
              md: "between",
            }}
            {...contentStackOptions}
          >
            <h1
              className={cn(
                "text-2xl md:text-3xl lg:text-5xl text-inherit text-balance",
                layout === "compact" && "text-3xl md:text-4xl",
              )}
              style={{
                animation:
                  "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 80ms both",
              }}
            >
              {typeof title === "string"
                ? title
                : title.map((t, idx) => (
                    <React.Fragment key={`title-${idx}`}>
                      {t}
                      {idx < title.length + 1 && <br />}
                    </React.Fragment>
                  ))}
            </h1>

            {description && (
              <p
                className="text-pretty text-base max-w-[32ch] opacity-80"
                style={{
                  ["--fadeup-final-opacity" as any]:
                    "0.9" as React.CSSProperties,
                  animation:
                    "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both",
                }}
              >
                {description}
              </p>
            )}

            {/* Actions */}
            {actions && (
              <div
                className={cn(
                  "flex flex-wrap gap-3 pt-2",
                  layout === "centered" && "justify-center",
                )}
              >
                {actions}
              </div>
            )}
          </Stack>
        </Stack>

        {(layout === "split" || splitSlot) && (
          <div
            className="h-full w-full flex items-center justify-center lg:justify-end"
            style={{
              animation: "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 80ms both",
            }}
          >
            {splitSlot}
          </div>
        )}
      </Container>
    </Section>
  );
}
