/* eslint-disable @next/next/no-img-element */
import { ReviewList } from "@/components/review";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Crease, CreaseBox } from "@/components/ui/crease";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Heading } from "@/components/ui/typography";
import { REVIEWS } from "@/innhold/reviews";
import { TEAM } from "@/innhold/selskap";
import { aboutContent } from "@/innhold/sider/om-oss";
import { SITE_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Mail, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="bg-card">
      <PageHeader
        className="text-white min-h-[45vh]"
        title={aboutContent.hero.title}
        description={aboutContent.hero.subtitle}
        breadcrumbsOptions={{
          className: "font-semibold",
        }}
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Om oss" }]}
        overlay={"lg"}
        backgroundImageOptions={{
          opacity: 1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        backgroundImage={aboutContent.hero.image.src}
        backgroundImageAlt={aboutContent.hero.image.alt}
      />

      <Container>
        <CreaseBox sides={["left", "right"]} className="h-20" />
      </Container>
      <StorySection />
      <Container>
        <CreaseBox className="h-16 md:h-20 w-full bg-noise" />
      </Container>
      <ValuesSection />
      <Container>
        <CreaseBox sides={["left", "right"]} className="h-20" />
      </Container>

      <TeamSection />

      <Section className="bg-background">
        <Container className="pb-16">
          <ReviewList reviews={REVIEWS} />
        </Container>
      </Section>

      {/* 6. CTA / CONTACT */}

      {/* <GridSection /> */}

      <Section
        spacing={"md"}
        className="bg-secondary text-secondary-foreground"
      >
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-balance">
              {aboutContent.contact.title}
            </h2>
            <p className="text-base lg:text-lg max-w-2xl mx-auto">
              {aboutContent.contact.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="default" size="lg" asChild>
                <Link href={SITE_URLS.CONTACT}>
                  {aboutContent.contact.buttonText}
                </Link>
              </Button>
              <p className="text-sm text-secondary-foreground/90">
                {aboutContent.contact.cta}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export function AboutHero() {
  return (
    <Section>
      <Container>
        <div className="w-full flex flex-col items-center text-center gap-3">
          <Badge variant="secondary" className="text-sm">
            <ShieldCheck className="mb-px stroke-3" />
            <span>{aboutContent.hero.companyBadge}</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4 max-w-4xl">
            {aboutContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
            {aboutContent.hero.subtitle}
          </p>
        </div>
      </Container>
    </Section>
  );
}

export function StorySection() {
  return (
    <Section className="py-0! relative bg-card text-card-foreground">
      <Container className="relative">
        <CreaseBox
          sides={["top", "left", "right"]}
          overflow={["top"]}
          padY="none"
          className="py-12 md:py-16 px-8 lg:py-20 lg:px-12"
        >
          <div className="space-y-10 md:space-y-12 max-w-[74ch] mx-auto">
            <div className="space-y-4 md:space-y-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl">
                {aboutContent.story.title}
              </h2>
              {aboutContent.story.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg leading-relaxed font-light"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-6 border-t border-secondary/40 flex items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutContent.story.founderStory?.image}
                alt={aboutContent.story.founderStory?.imageAlt}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 object-cover object-top grayscale"
              />
              <div>
                <h4 className="font-medium">
                  {aboutContent.story.founderStory.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {aboutContent.story.founderStory.role}
                </p>
              </div>
            </div>
          </div>
        </CreaseBox>
      </Container>
    </Section>
  );
}

const values = [
  {
    number: "01",
    title: "Åpenhet og transparens",
    description:
      "Alle priser er synlige. Ingen kampanjedager med kunstig tidspress, ingen selgere på døren. Du vet hva våre produkter koster før du tar kontakt.",
  },
  {
    number: "02",
    title: "Faglig tyngde",
    description:
      "Med bygg- og maskiningeniører blant vare ansatte, er sikker innfesting, dimensjonering, materialvalg, korrosjon og overflatebehandling noe vi mestrer.",
  },
  {
    number: "03",
    title: "Kvalitet i alle ledd",
    description:
      "Vi jobber tett med arkitekter og alle typer handverkere for å gi deg en smidig opplevelse allerede fra før kjøp til din markise er montert. Dersom du ønsker å montere på egenhånd, har vi et bredt utvalg ressurser - helt gratis.",
  },
  {
    number: "04",
    title: "Støtte hele veien",
    description:
      "Vi er behjelpelige i forbindelse med alle type spørsmal - både på telefon og e-post - før, under og naturligvis også etter montering. Med støtte fra oss, tør vi påstå at nesten hvem som helst skal kunne montere våre produkter.",
  },
];

export function ValuesSection() {
  return (
    <Section className="py-0! bg-card text-card-foreground">
      <Container>
        <CreaseBox
          padY="none"
          className="grid gap-12 md:gap-16 py-16 px-8 lg:py-20 lg:px-12"
          sides={["bottom", "right", "left"]}
          overflow={["bottom"]}
        >
          <Stack
            space={0}
            style={{
              top: "calc(var(--header-height) + 2rem)",
            }}
          >
            <Badge variant="secondary" className="mb-4">
              VÅRE VERDIER
            </Badge>
            <h2 className="text-2xl md:text-3xl max-w-[34ch]">
              Utover faglig innsikt og et oppriktig engasjement for å levere
              kvalitetsprodukter, er åpenhet og ærlighet kjernen av var
              virksomhet.
            </h2>
          </Stack>

          <Grid cols={{ base: 1, lg: 2 }} gap={{ base: 12, lg: 20 }}>
            {values.map((value, i) => (
              <div
                key={value.number}
                className={cn(
                  "relative flex flex-col md:flex-row gap-2 md:gap-6",
                )}
              >
                {/* {i > 0 && <Crease />} */}
                <span className="text-2xl font-black text-muted-foreground/20">
                  {value.number}
                </span>
                <div className="flex flex-col gap-2">
                  <Heading level={"h3"} className="text-lg! font-bold">
                    {value.title}
                  </Heading>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </Grid>
        </CreaseBox>
      </Container>
    </Section>
  );
}

export function TeamSection() {
  return (
    <Section className="bg-background pt-20! md:pt-48!">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between max-w-5xl mx-auto mb-8">
          <h2 className="text-3xl">
            Teamet bak <br /> Solskjerming AS
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg">
            Vi er et dedikert team med lang erfaring fra bransjen. Sammen jobber
            vi for å gi deg den beste opplevelsen.
          </p>
        </div>

        {/* Team Grid */}
        <Grid
          className="max-w-5xl mx-auto"
          cols={{
            sm: 1,
            md: 2,
            lg: 3,
          }}
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-col gap-2 group relative bg-card overflow-hidden border border-border"
            >
              {/* Image */}
              <div className="min-h-80 relative aspect-square overflow-hidden bg-accent/5">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={"Portrett av " + member.name}
                    className="object-cover object-top h-full w-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <span className="text-4xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between gap-1 px-5 pb-5 pt-2 h-full">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {member.role}
                  </p>

                  {member.description && (
                    <p className="text-sm line-clamp-2 mb-3">
                      {member.description}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                {member.social && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    {member.social.email && (
                      <Link
                        href={`mailto:${member.social.email}`}
                        className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Send e-post til ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </Link>
                    )}
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${member.name} på LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Link>
                    )}
                    {member.social.facebook && (
                      <Link
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${member.name} på Facebook`}
                      >
                        <Facebook className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Grid>

        {/* Optional: CTA or additional info */}
        <Stack
          space={{ base: 6, md: 4 }}
          align="center"
          justify="center"
          className="text-center flex-col-reverse mt-8 md:mt-12"
        >
          <Stack
            space={{ base: 2, md: 4 }}
            direction={{ base: "col", md: "row" }}
            align="center"
          >
            <p className="font-medium text-lg">Vi er her for å hjelpe deg!</p>
            <Button variant="secondary" asChild>
              <Link href={SITE_URLS.CONTACT}>
                Send oss en melding <Send />
              </Link>
            </Button>
          </Stack>
          <p className="text-muted-foreground text-sm">
            Vil du bli en del av teamet?{" "}
            <Link
              href={SITE_URLS.CONTACT}
              className="text-primary hover:underline font-medium"
            >
              Se ledige stillinger
            </Link>
          </p>
        </Stack>
      </Container>
    </Section>
  );
}

export function GridSection() {
  return (
    <Section className="py-0! bg-card">
      <Container>
        <CreaseBox padY="none" overflow={["top", "bottom"]}>
          <div className="grid gap:16 md:gap-0 md:grid-cols-3">
            <div className="relative min-h-80"></div>

            <CreaseBox
              sides={["left"]}
              padX="none"
              className="relative h-full md:col-span-2"
            >
              <Stack
                space={0}
                className="p-8"
                style={{
                  top: "calc(var(--header-height) + 2rem)",
                }}
              >
                <Heading className="text-lg! max-w-xl font-bold tracking-wide text-foreground">
                  Utover faglig innsikt og et oppriktig engasjement for å levere
                  kvalitetsprodukter, er åpenhet og ærlighet kjernen av var
                  virksomhet.
                </Heading>
              </Stack>
            </CreaseBox>
          </div>
          <Stack space={0} direction={"row"} className="grid grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={`item-${i}`}
                className={cn("relative min-h-80 flex gap-6 py-8 md:pl-8 pr-8")}
              >
                {i > 0 && <Crease position="left" />}
                <Crease position="top" />
                <Heading className="text-lg! max-w-xl font-bold tracking-wide text-foreground">
                  Utover faglig innsikt og et oppriktig engasjement for å levere
                </Heading>
              </div>
            ))}
          </Stack>
          <CreaseBox
            padX="none"
            sides={["top"]}
            className="grid gap:16 md:gap-0 md:grid-cols-3"
          >
            <Stack
              space={0}
              className="p-8 col-span-2"
              style={{
                top: "calc(var(--header-height) + 2rem)",
              }}
            >
              <Heading className="text-lg! max-w-xl font-bold tracking-wide text-foreground">
                Utover faglig innsikt og et oppriktig engasjement for å levere
                kvalitetsprodukter, er åpenhet og ærlighet kjernen av var
                virksomhet.
              </Heading>
            </Stack>

            <div className="relative min-h-80 p-8">
              <Crease position="left" />
              <Heading className="text-lg! max-w-xl font-bold tracking-wide text-foreground">
                Utover faglig innsikt og et oppriktig engasjement for å levere
              </Heading>
            </div>
          </CreaseBox>
        </CreaseBox>
      </Container>
    </Section>
  );
}
