"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export interface MarkdownCTAProps {
  /** Primary CTA text */
  text?: string;
  /** Primary CTA link */
  link?: string;
  /** Secondary CTA text (optional) */
  secondaryText?: string;
  /** Secondary CTA link (optional) */
  secondaryLink?: string;
  /** Visual variant */
  variant?: "default" | "compact" | "banner" | "card";
  /** Alignment of content */
  align?: "left" | "center" | "right";
  /** Heading */
  heading?: string;
  /** Additional context/description */
  description?: string;
  /** Icon type for primary action */
  icon?: "arrow" | "external" | "download" | "document" | "none";
  /** Custom className */
  className?: string;
  /** Callback for primary action (if no link provided) */
  onPrimaryClick?: () => void;
  /** Callback for secondary action */
  onSecondaryClick?: () => void;
}

const iconMap = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  download: Download,
  document: FileText,
  none: null,
};

export function MarkdownCTA({
  text,
  link,
  heading,
  secondaryText,
  secondaryLink,
  variant = "default",
  align = "left",
  description,
  icon = "arrow",
  className,
  onPrimaryClick,
  onSecondaryClick,
}: MarkdownCTAProps) {
  // Don't render if no CTA data provided
  if (!text && !secondaryText) return null;

  const PrimaryIcon = iconMap[icon];
  const isExternal = link?.startsWith("http");

  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary/90 to-primary/80",
          "p-8 md:p-10 my-8",
          "shadow-xl shadow-primary/20",
          className,
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

        <div
          className={cn(
            "relative z-10 flex flex-col gap-6",
            alignClasses[align],
          )}
        >
          <div className="space-y-2 text-primary-foreground">
            {heading && (
              <h3 className="text-xl md:text-2xl max-w-2xl leading-relaxed">
                {heading}
              </h3>
            )}

            {description && (
              <p className="text-base md:text-lg max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {text && (
              <Button
                size="lg"
                variant="secondary"
                asChild={!!link}
                onClick={!link ? onPrimaryClick : undefined}
              >
                {link ? (
                  <a
                    href={link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2"
                  >
                    {text}
                    {PrimaryIcon && <PrimaryIcon className="w-4 h-4" />}
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    {text}
                    {PrimaryIcon && <PrimaryIcon className="w-4 h-4" />}
                  </span>
                )}
              </Button>
            )}

            {secondaryText && (
              <Button
                variant="ghost"
                className="text-primary-foreground"
                size="lg"
                asChild={!!secondaryLink}
                onClick={!secondaryLink ? onSecondaryClick : undefined}
              >
                {secondaryLink ? (
                  <a
                    href={secondaryLink}
                    target={
                      secondaryLink.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      secondaryLink.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {secondaryText}
                  </a>
                ) : (
                  secondaryText
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "relative my-8 p-6 rounded-xl",
          "bg-card border border-border/50",
          "shadow-sm hover:shadow-md transition-shadow duration-300",
          className,
        )}
      >
        <div className={cn("flex flex-col gap-4", alignClasses[align])}>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}

          <div className="flex flex-wrap gap-3">
            {text && (
              <Button
                className="group"
                asChild={!!link}
                onClick={!link ? onPrimaryClick : undefined}
              >
                {link ? (
                  <a
                    href={link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2"
                  >
                    {text}
                    {PrimaryIcon && (
                      <PrimaryIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    {text}
                    {PrimaryIcon && <PrimaryIcon className="w-4 h-4" />}
                  </span>
                )}
              </Button>
            )}

            {secondaryText && (
              <Button
                variant="ghost"
                asChild={!!secondaryLink}
                onClick={!secondaryLink ? onSecondaryClick : undefined}
              >
                {secondaryLink ? (
                  <a
                    href={secondaryLink}
                    target={
                      secondaryLink.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      secondaryLink.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {secondaryText}
                  </a>
                ) : (
                  secondaryText
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3 my-6", className)}>
        {text && (
          <Button
            size="sm"
            className="group"
            asChild={!!link}
            onClick={!link ? onPrimaryClick : undefined}
          >
            {link ? (
              <a
                href={link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5"
              >
                {text}
                {PrimaryIcon && (
                  <PrimaryIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </a>
            ) : (
              <span className="flex items-center gap-1.5">
                {text}
                {PrimaryIcon && <PrimaryIcon className="w-3.5 h-3.5" />}
              </span>
            )}
          </Button>
        )}

        {secondaryText && (
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            asChild={!!secondaryLink}
            onClick={!secondaryLink ? onSecondaryClick : undefined}
          >
            {secondaryLink ? (
              <a
                href={secondaryLink}
                target={secondaryLink.startsWith("http") ? "_blank" : undefined}
                rel={
                  secondaryLink.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {secondaryText}
              </a>
            ) : (
              secondaryText
            )}
          </Button>
        )}
      </div>
    );
  }

  // Default variant - elegant inline style
  return (
    <div
      className={cn(
        "my-8 p-6 rounded-lg",
        "bg-linear-to-r from-muted/50 to-muted/30",
        "border border-border/50",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", alignClasses[align])}>
        {description && (
          <p className="text-muted-foreground max-w-xl">{description}</p>
        )}

        <div className="flex flex-wrap gap-3">
          {text && (
            <Button
              className="group"
              asChild={!!link}
              onClick={!link ? onPrimaryClick : undefined}
            >
              {link ? (
                <a
                  href={link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2"
                >
                  {text}
                  {PrimaryIcon && (
                    <PrimaryIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </a>
              ) : (
                <span className="flex items-center gap-2">
                  {text}
                  {PrimaryIcon && <PrimaryIcon className="w-4 h-4" />}
                </span>
              )}
            </Button>
          )}

          {secondaryText && (
            <Button
              variant="ghost"
              asChild={!!secondaryLink}
              onClick={!secondaryLink ? onSecondaryClick : undefined}
            >
              {secondaryLink ? (
                <a
                  href={secondaryLink}
                  target={
                    secondaryLink.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    secondaryLink.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {secondaryText}
                </a>
              ) : (
                secondaryText
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
