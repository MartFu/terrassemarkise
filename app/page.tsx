import { ContactForm } from "@/components/contact-form";
import { BenefitsSection } from "@/components/home/benefits-section";
import { TrustSection } from "@/components/home/trust-section";
import { CTASection } from "@/components/shared/cta";
// import { HeroSection } from "@/components/shared/HeroSection";
import HighImpactHero from "@/components/shared/HighImpactHero";
import { FeaturesSection } from "@/components/test/features";
import { HowItWorks } from "@/components/test/how-it-works";
import { ProductShowcase } from "@/components/test/product-showcase";
import { TestimonialsSection } from "@/components/test/testimonials";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import PaperCrease from "@/components/ui/paper-crease";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { indexPageContent } from "@/innhold/sider";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Shield,
  Wrench,
  Sun,
  ArrowUpRight,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
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
        href: "/assets/product-images/jamaica_index_image.png",
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
        href: "/assets/product-images/corsica_index_image.png",
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
        href: "/assets/product-images/palladio_index_image.png",
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

export default function Page() {
  const { hero, trustIndicators, features, testimonials, stats, ctaBanner } =
    indexPageContent;

  const products = [
    {
      id: "",
      name: "Jamaica - Den Fleksible Samlingsplassen",
      slug: "jamaica-terrassemarkise",
      image: "/assets/product-images/jamaica_index_image.png",
      description:
        "Glem værmeldingen og inviter til grillfest uansett. Jamaica er den robuste arbeidshesten som forvandler uteplassen til et lunt fristed. Med nedsenkbar frontkappe skjermer den perfekt mot den lave norske kveldssola, slik at dere kan nyte kaffen uten å bli blendet.",
      strengths: [
        "Perfekt for lave solforhold med nedsenkbar frontkappe",
        "Robust konstruksjon som tåler norske forhold",
        "Vannavstøtende teflonduk som holder dere tørre ved en regnskur",
        "Kan monteres både på vegg og i tak for maksimal fleksibilitet",
      ],
      technical: {
        maxWidth: "700 cm (470 cm med frontkappe)",
        maxProjection: "360 cm",
        tilt_angle: "5° to 40°",
        controls: "Manuell, Somfy RTS, IO eller WT",
        fabric: "100% teflonbehandlet akryl",
      },
    },

    {
      id: "",
      name: "Palladio - Elegant Trygghet i Kassett",
      slug: "palladio-terrassemarkise",
      image: "/assets/product-images/palladio_index_image.png",
      description:
        "For deg som vil ha det ryddig og elegant. Palladio lagrer duken trygt i en lukket kassett når den ikke er i bruk, noe som beskytter mot støv og norsk vintervær. Skap en sømløs overgang mellom stue og terrasse med en markise som ser like god ut som den fungerer.",
      strengths: [
        "Helkassett som beskytter duken mot alle typer nedbør",
        "Elegant design som smelter inn i husets arkitektur",
        "Stor fallvinkel (opptil 50°) for effektiv solskjerming og vannavrenning",
        "Høy teknisk kvalitet med Somfy-styring",
      ],
      technical: {
        maksBredde: "700 cm",
        maxProjection: "360 cm",
        tiltAngle: "5° til 50°",
        controls: "Sveiv eller elektrisk (Somfy)",
        beskyttelse: "Integrert kassettløsning",
      },
    },

    {
      id: "",
      name: "Corsica - Designperlen for Utestuen",
      slug: "corsica-terrassemarkise",
      image: "/assets/product-images/corsica_index_image.png",
      description:
        "Corsica er mer enn bare solskjerming; det er kronen på verket for din uteplass. Denne robuste terrassemarkisen gir deg følelsen av en eksklusiv utestue. Med en vannavstøtende duk av høyeste kvalitet kan dere sitte ute og høre på regnet mens dere forblir tørre og varme.",
      strengths: [
        "Moderne design med duken trygt beskyttet i kassett",
        "Svært vannavstøtende teflonduk for norske sommerkvelder",
        "Enkel justering av fallvinkel for optimal komfort",
        "Leveres i flere lekre konstruksjons- og dukfarger",
      ],
      technical: {
        maksBredde: "700 cm",
        maksUtfall: "360 cm",
        tiltAngle: "5° til 50°",
        controls: "Full støtte for smarthus/Somfy",
        fabric: "100% Teflon-treated acrylic",
      },
    },
  ];

  return (
    <>
      <section className="relative min-h-[calc(100svh-var(--header-height))] w-full overflow-hidden bg-background">
        {/* Bakgrunnsbilde - Fokuserer på "utesalong i regn" */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/product-images/corsica_illustration.jpg"
            alt="Moderne terrassemarkise som beskytter mot regn - Uteplass i norsk vær"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay - Shadcn farger */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        {/* Innhold - Posisjonert for lesbarhet */}
        <div className="container relative z-10 mx-auto flex min-h-[90dvh] flex-col items-start justify-center px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            {/* H1 - SEO optimalisert med nøkkelord */}
            <h1 className="text-balance font-bold tracking-tight text-foreground">
              <span className="block text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                Uteplassen du
              </span>
              <span className="block text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                alltid kan bruke
              </span>
              <span className="mt-2 block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl leading-[1.1] text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                — uansett vær.
              </span>
            </h1>

            {/* Beskrivelse - Inneholder "terrassemarkise" naturlig */}
            <p className="text-balance max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Fra blendende kveldssol til lette regnskurer.{" "}
              <span className="font-medium text-foreground">
                Vi leverer skreddersydde terrassemarkiser
              </span>{" "}
              som forvandler uteplassen til et lunt og lystig samlingspunkt for
              familie og venner.
            </p>

            {/* CTA - Tydelig og moderne */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link
                href="/produkter"
                className="group inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Se våre markiser
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tilbud"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background/80 px-6 py-3 text-base font-medium text-foreground backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Be om uforpliktende tilbud
              </Link>
            </div>

            {/* Trygghetselementer - Subtile norske preferanser */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Norske håndverkere</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Skreddersydd mål</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>5 års garanti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indikator - Modern touch */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce md:block">
          <div className="flex flex-col items-center gap-1 text-xs font-medium text-white">
            <span className="text-[10px] uppercase tracking-wider">
              Utforsk
            </span>
            <ArrowDown />
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* <Section className="py-20 md:py-32" id="produkter">
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {LANDING_PAGE_CONTENT.products.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {LANDING_PAGE_CONTENT.products.subtitle}
            </p>
          </div>

          <div className="space-y-40">
            {LANDING_PAGE_CONTENT.products.items.map((product, index) => (
              <div
                key={product.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] rounded-lg bg-linear-to-br ${
                    product.id === "jamaica"
                      ? "from-slate-100 to-slate-200"
                      : product.id === "corsica"
                        ? "from-stone-100 to-stone-200"
                        : "from-zinc-100 to-zinc-200"
                  } ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                >
                  <div
                    role="img"
                    className={cn(
                      "absolute inset-0 z-1 after:absolute after:inset-0 after:content-[''] after:from-transparent after:via-transparent after:to-transparent",
                      index % 2 === 0
                        ? "after:bg-linear-to-l"
                        : "after:bg-linear-to-r",
                    )}
                    aria-label={product.name}
                    style={{
                      backgroundImage: `url('${product.href}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {product.featured && (
                    <div className="absolute z-2 top-6 left-6 inline-flex items-center px-3 py-1 text-xs font-medium bg-background border rounded-full shadow-sm">
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

                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

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
      <BenefitsSection />
      <TrustSection /> */}

      <ProductShowcase />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
