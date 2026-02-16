import { Container } from "@/components/ui/container";
import Image from "next/image";
import { footer as footerContent } from "@/innhold/navigasjon/footer";
import NextLink from "next/link";
import { Logo } from "../ui/logo";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border relative z-20">
      <Container className="py-8 md:py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 lg:gap-12">
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
                  <h4 className="mb-3 md:mb-4 text-base md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <NextLink
                          aria-label={`Til ${link.label}`}
                          href={link.href}
                          className="text-sidebar-foreground/60 hover:text-accent transition-colors text-base md:text-sm inline-block"
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

        {/* Payment section - separate row for better placement */}
        <div className="relative mt-24 lg:mt-24 w-full">
          <p className="absolute left-1/2 -translate-x-1/2 -top-4 text-xs text-sidebar-foreground/70 font-semibold uppercase whitespace-nowrap">
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

        {/* Bottom bar with copyright and parent company */}
        <div className="mt-10 md:mt-12 lg:mt-16 flex flex-col items-center gap-4 border-t border-border/30 pt-6 md:pt-8 text-xs sm:text-sm text-sidebar-foreground/90 sm:flex-row sm:justify-between">
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
