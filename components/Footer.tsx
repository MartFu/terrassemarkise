import type { FooterProps } from "@/types";
import { Container } from "./ui/container";
import { Link } from "./ui/link";

export function Footer({ content }: { content: FooterProps }) {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-sidebar border-t border-sidebar-border relative z-20">
      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Brand */}
          <div className="shrink-0">
            <span className="text-xl font-semibold">
              {content.brandSection.title}
            </span>
            <p className="mt-4 text-sm leading-relaxed max-w-[48ch]">
              {content.brandSection.description}
            </p>
          </div>

          <div className="flex-1 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-8 items-start justify-around flex-wrap">
            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold">Produkter</h3>
              <ul className="mt-4 space-y-3">
                {content.navigation.products.map((item) => (
                  <li key={item.title}>
                    <Link
                      aria-label={item.title}
                      href={item.href}
                      className="text-sm transition-colors hover:no-underline!"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold">Ressurser</h3>
              <ul className="mt-4 space-y-3">
                {content.navigation.resources.map((item) => (
                  <li key={item.title}>
                    <Link
                      aria-label={item.title}
                      href={item.href}
                      className="text-sm transition-colors hover:no-underline!"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold">Kontakt</h3>
              <ul className="mt-4 space-y-3">
                {content.navigation.contact.map((item) => (
                  <li key={item.title}>
                    <Link
                      aria-label={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:no-underline!"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm border-t border-border pt-8 flex flex-col lg:flex-row-reverse gap-2 items-center justify-between">
          <div className="underline flex items-center gap-2">
            {content.legal.map((item) => (
              <Link
                key={item.title}
                aria-label={item?.ariaLabel ?? item.title}
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 flex-nowrap! text-nowrap!">
            {"Del av "}
            <Link
              aria-label={content.brandSection.title}
              href="https://www.solskjerming-as.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline flex-nowrap!"
            >
              {content.brandSection.title}
            </Link>
            {content.brandSection?.tagLine && (
              <p className="hidden md:block">
                {" - "}
                {content.brandSection.tagLine}
              </p>
            )}
          </div>

          <p className="text-center mt-4 lg:mt-0 text-muted-foreground">
            © {date} {content.brandSection.title}
          </p>
        </div>
      </Container>
    </footer>
  );
}
