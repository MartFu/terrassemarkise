"use client";

import { Container } from "@/components/ui/container";
import { FOOTER_CONTENT as footerContent } from "@/innhold/navigasjon/footer";
import NextLink from "next/link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Footer({
  compact = false,
  debug = false,
}: {
  compact?: boolean;
  debug?: boolean;
}) {
  return (
    <footer
      className={cn(
        "bg-sidebar text-sidebar-foreground relative z-20 group",
        debug && "border border-red-500! bg-red-500/20!",
      )}
    >
      <div className="h-px bg-border absolute inset-x-0 top-0 pointer-events-none" />
      <Container
        className={cn(
          "pb-4",
          compact
            ? "space-y-4 pt-4 h-(--footer-compact-height)! overflow-hidden"
            : "pt-6 md:pt-8 space-y-6 md:space-y-12",
        )}
      >
        {compact && (
          <div className="flex items-center justify-start gap-8 overflow-x-auto scrollbar-hide">
            {footerContent.sections.map((section, idx) => (
              <div
                key={section.title}
                className={cn(
                  idx < footerContent.sections.length - 1 &&
                    "border-r border-border/50 pr-8",
                )}
              >
                <h4 className="mb-1 text-sm md:text-xs! uppercase font-semibold text-muted-foreground tracking-wider">
                  {section.title}
                </h4>
                <ul className="flex flex-nowrap gap-4 group">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <NextLink
                        aria-label={`Til ${link.label}`}
                        href={link.href}
                        className="text-sidebar-foreground/60 hover:text-foreground text-nowrap text-sm inline-block transition-[colors,opacity] md:group-has-[a:hover]:opacity-50 md:hover:opacity-100!"
                      >
                        {link.label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {/* Main footer content */}
        {!compact && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Logo
                className="inline-flex"
                imageClassName="max-h-28 md:max-h-24 w-auto"
              />
              <p className="mt-4 text-base leading-relaxed max-w-[38ch] mx-auto lg:mx-0">
                {footerContent.tagline}
              </p>
            </div>

            {/* Navigation sections */}

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:h-full lg:flex lg:items-end lg:justify-around">
                {footerContent.sections.map((section) => (
                  <div key={section.title} className="text-center lg:text-left">
                    <h4 className="mb-3 md:mb-4 text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <ul className="space-y-2 sm:space-y-2.5 group">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <NextLink
                            aria-label={`Til ${link.label}`}
                            href={link.href}
                            className="text-sidebar-foreground/60 hover:text-foreground transition-[colors,opacity] text-sm md:text-base inline-block group-has-[a:hover]:opacity-50 hover:opacity-100!"
                          >
                            {link.label}
                          </NextLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!compact && (
          <div className="relative pt-8 md:pt-12 w-full border-t border-transparent md:border-border/50">
            <p className="absolute left-1/2 -translate-x-1/2 top-3.5 md:top-8 text-xs text-sidebar-foreground/50 font-semibold uppercase whitespace-nowrap">
              Enkel betaling med
            </p>
            <div className="bg-linear-to-r from-transparent via-muted to-transparent px-2 md:px-6 py-1 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="object-contain h-14 w-auto"
                alt="Betalingsalternativer"
                src="/payment-option-logos.png"
              />
            </div>
          </div>
        )}

        {/* Bottom bar with copyright and parent company */}
        <div className="pt-4 pb-2 flex flex-col items-center gap-2 border-t border-border/80 text-xs sm:text-sm text-sidebar-foreground/90 sm:flex-row sm:justify-between">
          <span className="text-center sm:text-left order-2 sm:order-1">
            {footerContent.copyright}
          </span>
          <span className="order-1 sm:order-2">
            {footerContent.parentCompany.text}{" "}
            <NextLink
              href={footerContent.parentCompany.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-sidebar-foreground text-sidebar-foreground/70"
            >
              {footerContent.parentCompany.name}
            </NextLink>
          </span>
        </div>
      </Container>
    </footer>
  );
}
