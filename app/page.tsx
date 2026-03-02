import HeroSection from "@/components/pages/index/hero";
import { SolutionsSection } from "@/components/pages/index/solutions";
import { ReviewList } from "@/components/review";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";

import { REVIEWS } from "@/innhold/reviews";
import { SITE_URLS } from "@/lib/constants";
import { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronRight, Shield } from "lucide-react";
import Link from "next/link";

const trustBadges = [
  {
    label: "5000+ kunder",
  },
  {
    label: "10 års erfaring",
  },
  {
    label: "5 års garanti",
  },
  {
    label: "Gassellebedrift",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Hotspot = {
  x: number; // % from left
  y: number; // % from top
  label: string;
  body: string;
};

type Variant = {
  tag: string;
  image: string;
  hotspots: Hotspot[];
};

export type Slide = {
  index: number;
  model: string;
  title: string;
  type: string;
  description: string;
  price: string;
  priceNote?: string;
  variants: Variant[];
  images?: GalleryImage[];
};

// ─── Content ──────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    index: 0,
    model: "Jamaica",
    type: "Åpen markise",
    title: "Vår mest fleksible løsning",
    description:
      "Den åpne markisen er arkitektur i seg selv. Monteres mot vegg eller tak - også i trange nisjer og under takutspring der en kassett ikke ville passet. Enkel, effektiv og synlig. En markise du legger merke til.",
    price: "fra kr 8\u202f152,-",
    priceNote: "+ kr 2\u202f972,- med toppdeksel",
    variants: [
      {
        tag: "Uten toppdeksel",
        image: "/assets/product-images/jamaica-illustrasjon-2.webp",
        hotspots: [
          {
            x: 84,
            y: 18,
            label: "Åpen rulleprofil",
            body: "Duken rulles rundt en synlig profil. Gir en ren, klassisk silhuett og enkel tilgang for service.",
          },
          {
            x: 60,
            y: 60,
            label: "Artikulerte armer",
            body: "Saksearmer med konstant fjærspenning holder duken stram i alle posisjoner.",
          },
          {
            x: 20,
            y: 84,
            label: "Frontprofil",
            body: "Nedsenkbar front kan monteres for å blokkere lav kveldssol og gi le mot vind.",
          },
        ],
      },
      {
        tag: "Med toppdeksel",
        image: "/assets/product-images/jamaica-illustrasjon-toppdeksel.webp",
        hotspots: [
          {
            x: 70,
            y: 12,
            label: "Toppdeksel",
            body: "Et presist tilpasset aluminiumdeksel beskytter rullemekanismen mot nedbør og fugler - uten å endre markisens rene uttrykk.",
          },
          {
            x: 60,
            y: 60,
            label: "Artikulerte armer",
            body: "Saksearmer med konstant fjærspenning holder duken stram i alle posisjoner.",
          },
          {
            x: 20,
            y: 84,
            label: "Frontprofil",
            body: "Nedsenkbar front kan monteres for å blokkere lav kveldssol og gi le mot vind.",
          },
        ],
      },
    ],
    images: [
      {
        id: "jamaica-img-1",
        src: "/assets/references/jamaica/2x-jamaica-montert-utrullet-hvit-fasade.webp",
        alt: "2 stk Jamaica terrassemarkise på hvit fasade",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
      {
        id: "jamaica-img-2",
        src: "/assets/references/jamaica/jamaica-toppdeksel-montert-hvit-fasade.webp",
        alt: "Jamaica med toppdeksel på hvit fasade",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
      {
        id: "jamaica-img-3",
        src: "/assets/references/jamaica/jamaica-toppdeksel-profil.webp",
        alt: "Jamaica med toppdeksel i profil",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
    ],
  },
  {
    index: 1,
    model: "Palladio",
    type: "Halvkassett",
    title: "Perfekt balanse mellom stil, funksjon og pris",
    description:
      "Duken trekkes inn i en lukket kassett. Armene forblir eksponert, men mekanismen er alltid beskyttet.",
    price: "fra kr 11\u202f164,–",
    variants: [
      {
        tag: "",
        image: "/assets/product-images/palladio-illustrasjon.webp",
        hotspots: [
          {
            x: 84,
            y: 8,
            label: "Halvkassett",
            body: "Duk og rulleaksel er innkapslet i en lukket aluminiumkassett. Beskyttet mot vær, støv og UV - alltid klar til bruk.",
          },
          {
            x: 28,
            y: 72,
            label: "Eksponerte armer",
            body: "Armene foldes langs fasaden men er ikke innkapslet. Robuste nok for norsk klima og enkle å vedlikeholde.",
          },
          {
            x: 74,
            y: 64,
            label: "Frontliste",
            body: "Slank aluminiumprofil holder dukkanten stram og gir et arkitektonisk avsluttet uttrykk.",
          },
        ],
      },
    ],
    images: [
      {
        id: "palladio-img-1",
        src: "/assets/references/palladio/palladio-3.webp",
        alt: "Palladio i hyggelig utekrok",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "palladio-img-2",
        src: "/assets/references/palladio/palladio-4.webp",
        alt: "Palladio med norsk flagg i bakgrunnen",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "palladio-img-3",
        src: "/assets/references/palladio/palladio-montert-utrullet-sort-fasade.webp",
        alt: "Palladio på sort fasade",
        width: 300,
        height: 169,
        title: "Palladio",
      },
    ],
  },
  {
    index: 2,
    model: "Corsica",
    type: "Helkassett",
    title: "Kompromissløs eleganse for den mest kresne",
    description:
      "Alt forsvinner. Duk, armer og mekanisme trekkes inn i én forseglet kassett. Fasaden forblir urørt. Corsica er vår mest komplette markise, og den eneste med integrert LED-belysning.",
    price: "fra kr 14\u202f845,-",
    variants: [
      {
        tag: "",
        image: "/assets/product-images/corsica-illustrasjon.webp",
        hotspots: [
          {
            x: 90,
            y: 14,
            label: "Forseglet kassett",
            body: "Duk og armer er fullstendig innkapslet. Kassetten børster støv og lett smuss av duken automatisk ved innrulling.",
          },
          {
            x: 25,
            y: 58,
            label: "Innkapslete armer",
            body: "Armene foldes inn i kassetten. Ledd og fjærsystem er alltid beskyttet - lenger levetid, mindre vedlikehold.",
          },
          {
            x: 83,
            y: 58,
            label: "Integrert LED",
            body: "Diskret LED-belysning er bygget inn i markisens profil. Terrassebelysning uten ekstra installasjoner.",
          },
        ],
      },
    ],
    images: [
      {
        id: "corsica-img-1",
        src: "/assets/references/corsica/corsica-1.webp",
        alt: "Corsica fra undersiden på hvit fasade",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "corsica-img-2",
        src: "/assets/references/corsica/corsica-2.webp",
        alt: "Corsica på skjermet terrasse",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "corsica-img-3",
        src: "/assets/references/corsica/corsica-utrullet-underside-hvit-fasade.webp",
        alt: "Utrullet Corsica på hvite fasade",
        width: 300,
        height: 169,
        title: "Palladio",
      },
    ],
  },
];

const galleryImages = [
  {
    id: "corsica-img-1",
    src: "/assets/references/corsica/corsica-1.webp",
    alt: "Corsica fra undersiden på hvit fasade",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "corsica-img-2",
    src: "/assets/references/corsica/corsica-2.webp",
    alt: "Corsica på skjermet terrasse",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "corsica-img-3",
    src: "/assets/references/corsica/corsica-utrullet-underside-hvit-fasade.webp",
    alt: "Utrullet Corsica på hvite fasade",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "palladio-img-1",
    src: "/assets/references/palladio/palladio-3.webp",
    alt: "Palladio i hyggelig utekrok",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "palladio-img-2",
    src: "/assets/references/palladio/palladio-4.webp",
    alt: "Palladio med norsk flagg i bakgrunnen",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "palladio-img-3",
    src: "/assets/references/palladio/palladio-montert-utrullet-sort-fasade.webp",
    alt: "Palladio på sort fasade",
    width: 300,
    height: 169,
    title: "Palladio",
  },
  {
    id: "jamaica-img-1",
    src: "/assets/references/jamaica/2x-jamaica-montert-utrullet-hvit-fasade.webp",
    alt: "2 stk Jamaica terrassemarkise på hvit fasade",
    width: 300,
    height: 169,
    title: "Jamaica",
  },
  {
    id: "jamaica-img-2",
    src: "/assets/references/jamaica/jamaica-toppdeksel-montert-hvit-fasade.webp",
    alt: "Jamaica med toppdeksel på hvit fasade",
    width: 300,
    height: 169,
    title: "Jamaica",
  },
  {
    id: "jamaica-img-3",
    src: "/assets/references/jamaica/jamaica-toppdeksel-profil.webp",
    alt: "Jamaica med toppdeksel i profil",
    width: 300,
    height: 169,
    title: "Jamaica",
  },
];

export const homePageContent = {
  hero: {
    title: ["Flytt stua ut.", "Hele sommeren."],
    description:
      "De beste sommerkveldene krever ikke mye, bare litt ly for solen og dekke mot kveldsyren. En god terrassemarkise forlenger uteselskapene fra de første vårdagene til langt ut i september.",
    imageSrc: "/mock/hero-awning.png",
    imageSize: "cover",
    imagePosition: "center",
    imageRepeat: "no-repeat",
  },
  trustBadges,
  solutions: {
    title: ["Gi fasaden rett uttrykk med", "riktig terrassemarkise"],
    slides,
  },
  customization: {
    title: "Gjør markisen din",
    description:
      "Våre terrassemarkiser leveres i fem konstruksjonsfarger, fra klassisk hvit til antrasitt. Duken velger du blant 31 alternativer — nøytrale toner som smelter inn i fasaden, dristigere farger som setter preg, og strukturvevde stoffer som gir tekstur og karakter.",
    imageSrc: "/mock/fabrics.png",
    imageSize: "cover",
    imagePosition: "top",
    imageRepeat: "no-repeat",
    badge: {
      title: "Alle duker er av teflonbehandlet akryl",
      icon: Shield,
    },
    ctaText: "Se duk- og fargealternativer",
    ctaLink: SITE_URLS.AWNING_OPTIONS,
  },
} as const;

export type HomePageContent = typeof homePageContent;

export const metadata = {
  title: "Terrassemarkise Nettbutikk - Solskjerming AS",
  description:
    "Terrassemarkiser i pulverlakkert aluminium. Maks 7m bredde og 3,6m utfall. Skreddersy din egen terrassemarkise - få pris levert hjem omgående.",
  keywords: ["terrassemarkiser"],
  // Theme color for mobile browsers
  themeColor: "#f0af09",
  // Open Graph (Social Media) settings
  openGraph: {
    images: [
      {
        url: "/upload/26/palladio-terrassemarkise-01.jpg",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection content={homePageContent.hero} />
      <section>
        <Container className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 py-12">
          {trustBadges.map((item, idx) => (
            <div
              key={item.label}
              className={cn(
                "border-border p-6 flex items-center justify-center font-medium text-lg",
                idx < trustBadges.length - 1 ? "border-r" : "",
              )}
            >
              {item.label}
            </div>
          ))}
        </Container>
      </section>

      {/* <SolutionsSection /> */}

      <SolutionsSection
        title={homePageContent.solutions.title}
        slides={homePageContent.solutions.slides}
      />

      {/* ── Section 2: Customisation ──────────────────────────────────────── */}
      <Section spacing="lg" className="bg-secondary text-secondary-foreground">
        <Container>
          <p className="text-4xl max-w-4xl mx-auto text-center font-light leading-relaxed mb-32">
            Det finnes ingen standardmarkise her. Hvert eksemplar produseres
            etter nøyaktig dine mål, ønske om uttrykk og montasjesituasjon.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Copy */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight leading-snug mb-5">
                {homePageContent.customization.title}
              </h2>

              <hr className="border-secondary-foreground/20 mb-5" />

              <p className="text-base font-light leading-relaxed opacity-80 mb-4">
                {homePageContent.customization.description}
              </p>

              {/* Text-link arrow — matches the prev/next nav pattern */}
              <Button asChild variant="ghost">
                <Link href={homePageContent.customization.ctaLink}>
                  {homePageContent.customization.ctaText}
                  <ChevronRight />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute text-foreground font-medium top-2 left-2 inline-flex items-center px-2 py-1 text-xs gap-2 bg-card/70 backdrop-blur-2xl shadow-sm rounded-full">
                {
                  <homePageContent.customization.badge.icon className="w-3.5 h-3.5" />
                }
                {homePageContent.customization.badge.title}
              </div>
              <div
                className="h-80 w-full"
                style={{
                  backgroundImage: "url('/mock/fabrics.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6 md:space-y-12">
          <Stack
            space={{ base: 2, md: 20 }}
            justify={{ md: "between" }}
            preset="row-between-collapse"
          >
            <h2 className="text-3xl shrink-0">
              Markisen som tar vare <br /> på seg selv
            </h2>
            <p className="max-w-prose">
              Med en integrert vindsensor blir terrassemarkisen selvgående. Den
              trekker seg inn automatisk dersom det blåser opp, slik at du
              slipper å bekymre deg når du ikke er hjemme.
            </p>
          </Stack>
          <div
            className={cn("h-120 w-full")}
            style={{
              backgroundImage: "url('/mock/product-window.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Button asChild variant="secondary">
            <Link href={SITE_URLS.WIND_SENSORS}>
              Les mer om våre vindsensorer <ArrowUpRight />
            </Link>
          </Button>
        </Container>
      </Section>

      <Section>
        <Container>
          <Stack space={6} preset="card" align={"start"}>
            <h2 className="text-3xl">Ta full kontroll over systemet</h2>
            <p className="max-w-prose">
              Vi tilbyr løsninger fra enkle kablede motorer til fullt trådløse
              Somfy-systemer - tilpasset alt fra en enkel hjemmeinstallasjon til
              krevende driftsforhold i restauranter, hoteller og borettslag, der
              markisen må ta vare på seg selv uansett vær og sesong.
            </p>

            <p className="max-w-prose">
              For deg som vil ha full kontroll, kan markisen integreres i
              smarthussystemet ditt og styres rett fra telefonen gjennom faste
              rutiner for vær og tidspunkt.
            </p>

            <Button asChild variant="secondary">
              <Link href={SITE_URLS.MOTORS}>
                Se motoralternativer og automatisering <ArrowUpRight />
              </Link>
            </Button>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <Stack space={6} preset="center" className="text-center">
            <h2 className="text-3xl">Vi er her gjennom hele prosessen</h2>
            <p className="max-w-prose">
              I ressursbiblioteket vårt finner du installasjonsguider,
              vedlikeholdsveiledninger og videoer for deg som vil forstå hva du
              kjøper og ta vare på det over tid. Målet vårt er at nesten hvem
              som helst skal kunne montere våre terrassemarkiser selv – med god
              veiledning, så klart.
            </p>

            <div className="relative w-full overflow-hidden">
              <div
                className={cn(
                  "h-100 w-full -translate-x-px -translate-y-[2px]",
                )}
                style={{
                  backgroundImage: "url('/mock/resources.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <Button asChild variant="secondary" className="ml-auto">
              <Link href={SITE_URLS.RESOURCES}>
                Utforsk vårt ressursbibliotek <ArrowUpRight />
              </Link>
            </Button>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <ReviewList reviews={REVIEWS} />
        </Container>
      </Section>

      <Section
        spacing={"md"}
        className="bg-secondary text-secondary-foreground"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-8">
            <h2 className="text-2xl lg:text-4xl text-balance">
              Forleng sommeren med våre terrassemarkiser
            </h2>
            <p className="text-base lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Se hele utvalget vårt, eller ta kontakt med oss direkte. Vi svarer
              raskt og hjelper deg å finne riktig løsning - enten du er
              privatperson eller driver en virksomhet med krav til holdbarhet og
              driftssikkerhet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 pt-4">
              <Button asChild variant="default" size="lg">
                <Link href={SITE_URLS.AWNINGS}>Se våre modeller</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-secondary-foreground hover:text-secondary"
                size="lg"
              >
                <Link href={SITE_URLS.CONTACT}>Kontakt oss</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
