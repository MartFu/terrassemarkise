"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const produktKategorier: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Terrassemarkiser",
    href: SITE_URLS.AWNINGS,
    description: "Markiser for terrasse, balkong og vindu",
  },
  {
    title: "Tilbehør",
    href: SITE_URLS.ACCESSORIES,
    description: "Motor, styring og tilbehør",
  },
];

const resourceCategories: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Mål og tilpassing",
    href: SITE_URLS.RESOURCES + "mal-og-tilpassing",
    description: "Slik måler du riktig til din markise",
  },
  {
    title: "Monteringsanvisning",
    href: SITE_URLS.RESOURCES + "monteringsanvisning",
    description: "Trinn-for-trinn monteringsguide",
  },
  {
    title: "Motor og styring",
    href: SITE_URLS.RESOURCES + "motor-og-styring",
    description: "Veiledning for motor og fjernkontroll",
  },
  {
    title: "Vedlikehold",
    href: SITE_URLS.RESOURCES + "vedlikehold",
    description: "Rengjøring og vedlikehold av markisestoff",
  },
  {
    title: "Videoer",
    href: SITE_URLS.VIDEOS,
    description: "Instruksjonsvideoer og veiledninger",
  },
];

// Mobile accordion section
function MobileAccordion({
  label,
  href,
  items,
  onClose,
}: {
  label: string;
  href: string;
  items: { title: string; href: string; description: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-base font-medium text-foreground hover:text-accent transition-colors"
        aria-expanded={open}
      >
        <Link
          href={href}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:text-accent"
        >
          {label}
        </Link>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="pb-3 space-y-1">
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-accent/10 transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Mobile drawer
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-51 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-52 flex w-[min(85vw,340px)] flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigasjonsmeny"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Lukk meny"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          <MobileAccordion
            label="Produkter"
            href={SITE_URLS.PRODUCTS}
            items={produktKategorier}
            onClose={onClose}
          />

          <div className="border-b border-border/50">
            <Link
              href={SITE_URLS.ABOUT}
              onClick={onClose}
              className="flex w-full items-center py-4 text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Om oss
            </Link>
          </div>

          <div className="border-b border-border/50">
            <Link
              href={SITE_URLS.CONTACT}
              onClick={onClose}
              className="flex w-full items-center py-4 text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Kontakt
            </Link>
          </div>

          <MobileAccordion
            label="Ressurser"
            href={SITE_URLS.RESOURCES}
            items={resourceCategories}
            onClose={onClose}
          />
        </nav>

        {/* Drawer footer CTA */}
        <div className="border-t border-border p-5">
          <Link
            href={EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS}
            rel="noopener noreferrer"
            target="_blank"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Besøk nettbutikken
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function Header({
  sticky = true,
  debug = false,
}: {
  sticky?: boolean;
  debug?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinkClassName =
    "bg-transparent! hover:bg-transparent! text-sidebar-foreground cursor-pointer hover:text-accent";

  return (
    <>
      <header
        className={cn(
          "bg-card backdrop-blur-md text-foreground z-50 shadow-sm relative",
          sticky && "sticky top-0",
          debug && "border border-red-500! bg-red-500/20!",
        )}
      >
        <div className="h-px bg-border absolute inset-x-0 bottom-0 pointer-events-none" />
        <Container className="h-(--header-height) flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-2">
            {/* Desktop nav */}
            <NavigationMenu
              aria-label="Primærnavigasjon"
              className="hidden md:flex"
            >
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navLinkClassName}>
                    <Link href={SITE_URLS.PRODUCTS}>Produkter</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {produktKategorier.map((kategori) => (
                        <NavigationMenuListItem
                          key={kategori.title}
                          title={kategori.title}
                          href={kategori.href}
                        >
                          {kategori.description}
                        </NavigationMenuListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navLinkClassName}>
                    <Link href={SITE_URLS.ABOUT}>Om oss</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navLinkClassName}>
                    <Link href={SITE_URLS.CONTACT}>Kontakt</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navLinkClassName}>
                    <Link href={SITE_URLS.RESOURCES}>Ressurser</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/*  <NavigationMenuItem>
                  <NavigationMenuTrigger className={navLinkClassName}>
                    <Link href={SITE_URLS.RESOURCES}>Ressurser</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resourceCategories.map((kategori) => (
                        <NavigationMenuListItem
                          key={kategori.title}
                          title={kategori.title}
                          href={kategori.href}
                        >
                          {kategori.description}
                        </NavigationMenuListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 ml-4 rounded-full"
                  >
                    <Link
                      href={EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Besøk nettbutikken
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden rounded-full p-2 hover:bg-accent/10 transition-colors text-foreground"
              aria-label="Åpne meny"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer (rendered outside header so it overlays everything) */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

function NavigationMenuListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
