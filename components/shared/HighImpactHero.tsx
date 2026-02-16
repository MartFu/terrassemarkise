/**
 * HighImpactHero
 *
 * A bold, full-width hero section with gradient background.
 * Best used on: Index page, key landing pages
 *
 * Features:
 * - Full-width gradient background
 * - Large centered text
 * - Primary and secondary CTAs
 * - Optional trust badges
 */

import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "../ui/section";
import { Container } from "../ui/container";

export interface CtaButton {
  label: string;
  href: string;
  external?: boolean;
}

export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  image?: ImageContent;
  badges?: string[];
}

interface HighImpactHeroProps {
  content: HeroContent;
  className?: string;
}

export function HighImpactHero({
  content,
  className = "",
}: HighImpactHeroProps) {
  const { eyebrow, title, description, primaryCta, secondaryCta, badges } =
    content;

  return (
    <Section className={`${className}`}>
      {/* Assumed: Section and Container are already defined elsewhere */}
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider opacity-80">
              {eyebrow}
            </p>
          )}

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl leading-relaxed">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button
                  size="lg"
                  variant="default"
                  className="min-w-[180px] font-semibold"
                  asChild
                >
                  <a
                    href={primaryCta.href}
                    target={primaryCta.external ? "_blank" : undefined}
                    rel={
                      primaryCta.external ? "noopener noreferrer" : undefined
                    }
                  >
                    {primaryCta.label}
                    {primaryCta.external ? (
                      <ExternalLink className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </a>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="ghost"
                  className="min-w-[180px]"
                  asChild
                >
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </div>
          )}

          {badges && badges.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default HighImpactHero;
