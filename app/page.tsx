import { BenefitsSection } from "@/components/home/benefits-section";
import { TrustSection } from "@/components/home/trust-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArrowRight, Check, Shield, Wrench, Sun } from "lucide-react";
import Link from "next/link";

// Content configuration
export const LANDING_PAGE_CONTENT = {
  hero: {
    badge: "Premium Terrassemarkiser",
    title: "Skape skygge.\nSkape komfort.",
    subtitle: "Tre distinkte løsninger. Én visjon om perfekt uteliv.",
    cta: {
      primary: { label: "Utforsk produktene", href: "#produkter" },
      secondary: { label: "Bestill konsultasjon", href: "/kontakt" },
    },
  },
  stats: [
    { value: "700cm", label: "Maksimal bredde" },
    { value: "360cm", label: "Maksimal projeksjon" },
    { value: "100%", label: "Teflonbehandlet akryl" },
    { value: "5-50°", label: "Justerbar fallvinkel" },
  ],
  products: {
    title: "Vårt utvalg kvalitetsmarkiser",
    subtitle: "Tre unike markiseløsninger, hver designet for spesifikke behov",
    items: [
      {
        id: "jamaica",
        name: "Jamaica",
        tagline: "Den fleksible klassikeren",
        description:
          "En robust terrassemarkise som kombinerer funksjonalitet med eleganse. Ideell for de som ønsker maksimal fleksibilitet.",
        features: [
          "Nedsenkbar frontkappe",
          "Valgfritt toppdeksel",
          "Manuell eller elektrisk styring",
          "Fallvinkel 5-40°",
        ],
        specs: {
          maxWidth: "700cm",
          projection: "160-360cm",
          control: "Sveiv / Somfy RTS, IO, WT",
        },
        href: "/produkter/jamaica",
        featured: false,
      },
      {
        id: "corsica",
        name: "Corsica",
        tagline: "Elegant kassettløsning",
        description:
          "Duk lagres i kassett for optimal beskyttelse. Perfekt balanse mellom design og funksjonalitet for det moderne hjem.",
        features: [
          "Fullstendig kassett",
          "Beskyttelse mot støv og nedbør",
          "Sleek, moderne design",
          "Fallvinkel 5-50°",
        ],
        specs: {
          maxWidth: "700cm",
          projection: "160-360cm",
          control: "Sveiv / Somfy RTS, IO, WT",
        },
        href: "/produkter/corsica",
        featured: true,
      },
      {
        id: "palladio",
        name: "Palladio",
        tagline: "Premium kassettmarkise",
        description:
          "Vår mest raffinerte løsning. Maksimal beskyttelse og elegant design for den krevende kunde.",
        features: [
          "Premium kassettdesign",
          "Overlegen dukholdbarhet",
          "Minimal vedlikehold",
          "Fallvinkel 5-50°",
        ],
        specs: {
          maxWidth: "700cm",
          projection: "160-360cm",
          control: "Sveiv / Somfy RTS, IO, WT",
        },
        href: "/produkter/palladio",
        featured: false,
      },
    ],
  },
  features: {
    title: "Kvalitet i hver detalj",
    items: [
      {
        icon: Shield,
        title: "Vannavstøtende duk",
        description: "100% teflonbehandlet akryl for maksimal beskyttelse",
      },
      {
        icon: Wrench,
        title: "Enkel justering",
        description: "Justerbar fallvinkel på bærearmbrakettene",
      },
      {
        icon: Sun,
        title: "Smart styring",
        description: "Somfy RTS, IO eller WT for sømløs kontroll",
      },
    ],
  },
  cta: {
    title: "Klar for å transformere ditt uterom?",
    description:
      "Vi hjelper deg med å finne den perfekte markisen for dine behov. Få en uforpliktende konsultasjon i dag.",
    button: { label: "Kom i gang", href: "/kontakt" },
  },
};

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/30 to-transparent -z-10" />

        <Container>
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full">
                {LANDING_PAGE_CONTENT.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              {LANDING_PAGE_CONTENT.hero.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
              {LANDING_PAGE_CONTENT.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <Link href={LANDING_PAGE_CONTENT.hero.cta.primary.href}>
                  {LANDING_PAGE_CONTENT.hero.cta.primary.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href={LANDING_PAGE_CONTENT.hero.cta.secondary.href}>
                  {LANDING_PAGE_CONTENT.hero.cta.secondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Bar */}
      <Section className="py-12 border-y bg-muted/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LANDING_PAGE_CONTENT.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <BenefitsSection />

      {/* Products Section */}
      <Section className="py-20 md:py-32" id="produkter">
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {LANDING_PAGE_CONTENT.products.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {LANDING_PAGE_CONTENT.products.subtitle}
            </p>
          </div>

          <div className="space-y-24">
            {LANDING_PAGE_CONTENT.products.items.map((product, index) => (
              <div
                key={product.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Product Image Placeholder */}
                <div
                  className={`relative aspect-[4/3] rounded-lg bg-gradient-to-br ${
                    product.id === "jamaica"
                      ? "from-slate-100 to-slate-200"
                      : product.id === "corsica"
                        ? "from-stone-100 to-stone-200"
                        : "from-zinc-100 to-zinc-200"
                  } ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                >
                  {product.featured && (
                    <div className="absolute top-6 left-6 inline-flex items-center px-3 py-1 text-xs font-medium bg-background border rounded-full shadow-sm">
                      Mest populær
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-foreground/10 mb-2">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div
                  className={
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }
                >
                  <div className="inline-block mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {product.tagline}
                    </span>
                  </div>

                  <h3 className="text-4xl font-bold mb-4">{product.name}</h3>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border bg-muted/50 mb-6">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Maks bredde
                      </div>
                      <div className="font-semibold">
                        {product.specs.maxWidth}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Projeksjon
                      </div>
                      <div className="font-semibold">
                        {product.specs.projection}
                      </div>
                    </div>
                    <div className="col-span-3 border-t pt-3 mt-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        Styring
                      </div>
                      <div className="text-sm font-medium">
                        {product.specs.control}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button asChild>
                      <Link href={product.href}>
                        Konfigurer i nettbutikken
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                      <Link href={product.href}>Les mer om {product.name}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <TrustSection />

      {/* CTA Section */}
      <Section className="pb-0!">
        <Container className="bg-primary text-primary-foreground p-8 rounded-t-3xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {LANDING_PAGE_CONTENT.cta.title}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              {LANDING_PAGE_CONTENT.cta.description}
            </p>
            <Button size="lg" variant="outline" className="text-base" asChild>
              <Link href={LANDING_PAGE_CONTENT.cta.button.href}>
                {LANDING_PAGE_CONTENT.cta.button.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
