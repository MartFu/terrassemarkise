import { ReviewList } from "@/components/review";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CreaseBox } from "@/components/ui/crease";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";

import { REVIEWS } from "@/innhold/reviews";
import { SITE_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <section
        id="hero"
        className="relative h-[calc(100svh-var(--header-height))] bg-secondary"
      >
        <div
          className={cn("absolute inset-0 z-1")}
          style={{
            backgroundImage: "url('/mock/hero-awning.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-[24vh] bg-linear-to-b from-black/80 to-transparent z-2" />
        <div className="absolute bottom-0 inset-x-0 h-[60vh] md:h-[40vh] bg-linear-to-t from-black/90 to-transparent z-2" />

        <Container className="relative z-3 h-full pb-8 text-neutral-50">
          <Stack
            className="h-full pb-4"
            direction={{ base: "col", md: "row" }}
            align={{ base: "start", md: "end" }}
            justify={{ base: "end", md: "between" }}
          >
            <h1 className="text-3xl md:text-5xl">
              Flytt stua ut. <br />
              Hele sommeren.
            </h1>
            <p className="text-lg max-w-[48ch] text-neutral-100">
              De beste sommerkveldene krever ikke mye, bare litt ly for solen og
              dekke mot kveldsyren. En god terrassemarkise forlenger
              uteselskapene fra de første vårdagene til langt ut i september.
            </p>
          </Stack>
        </Container>
      </section>

      <Section spacing={"none"} className="bg-card">
        <Container>
          <CreaseBox sides={["left", "right"]} className="h-20" />
        </Container>
        <Container>
          <CreaseBox pad="xl" overflow={["top", "bottom"]}>
            <Stack space={{ base: 8, md: 16 }}>
              <Stack preset="card">
                <h2 className="text-xl md:text-3xl">
                  Gi fasaden rett uttrykk med <br /> riktig terrassemarkise
                </h2>
                <p className="md:text-lg max-w-prose">
                  Alle terrassemarkiser gir skygge. Forskjellen ligger i hva de
                  gjør med boligen din når solen har gått ned og duken er rullet
                  inn. Valget handler om du vil at markisen skal være en del av
                  arkitekturen, eller om den skal være helt usynlig.
                </p>
              </Stack>

              <Grid
                preset="one-col"
                gap={{ base: 20, md: 16 }}
                className="min-h-80"
              >
                <Stack preset="row-between-collapse">
                  <div
                    className={cn("h-80 aspect-video w-full")}
                    style={{
                      backgroundImage: "url('/mock/product-window.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <p className="max-w-prose md:ml-12">
                    Den åpne markisen er et klassisk arkitektonisk element. Den
                    setter preg på fasaden og kan monteres mot både vegg og tak.
                    For ekstra beskyttelse kan den utstyres med toppdeksel mot
                    nedbør, og en nedsenkbar front som gir le for lav kveldssol.
                    Dette er markisen for deg som ønsker et uttrykk du både ser
                    og merker.
                  </p>
                </Stack>

                <Stack preset="row-between-collapse">
                  <div
                    className={cn("h-80 aspect-video w-full")}
                    style={{
                      backgroundImage: "url('/mock/product-folding.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <p className="max-w-prose md:ml-12">
                    Kassettmarkisen er den diskré perfeksjonisten. Når den ikke
                    er i bruk, forsvinner duken helt inn i en lukket profil.
                    Ingenting er eksponert for vær, støv eller fugler, og
                    fasaden forblir urørt. En markise du bare legger merke til
                    når du trenger den.
                  </p>
                </Stack>
              </Grid>
            </Stack>
          </CreaseBox>
        </Container>
        <Container>
          <CreaseBox sides={["left", "right"]} className="h-20" />
        </Container>
      </Section>

      <Section
        spacing={"xl"}
        className="bg-secondary text-secondary-foreground"
      >
        <Container>
          <Grid preset="two-col" gap={{ base: 8, md: 20 }} className="md:px-12">
            <Stack preset="card" align={"start"}>
              <h2 className="text-3xl">Gjør markisen din</h2>
              <p className="max-w-prose">
                Terrassemarkisene leveres i fem konstruksjonsfarger, fra
                klassisk hvit til antrasitt. Duken velger du blant 31
                alternativer - nøytrale toner som smelter inn i fasaden,
                dristigere farger som setter preg, og strukturvevde stoffer som
                gir tekstur og karakter. Alle dukene er teflonbehandlet akryl
                utviklet for nordisk klima.
              </p>

              <p className="max-w-prose">
                Det finnes ingen standardmarkise her. Hvert eksemplar produseres
                etter nøyaktig dine mål, ønske om uttrykk og montasjesituasjon.
              </p>

              <Button asChild>
                <Link href={SITE_URLS.AWNING_OPTIONS}>
                  Se duk- og fargealternativer <ArrowUpRight />
                </Link>
              </Button>
            </Stack>
            <div
              className={cn("h-80 w-full")}
              style={{
                backgroundImage: "url('/mock/fabrics.png')",
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Grid>
        </Container>
      </Section>

      <Section spacing={"xl"}>
        <Container>
          <Stack
            className="flex-col-reverse"
            direction={{ base: "col", md: "row" }}
            align={{ base: "start", md: "center" }}
            justify={{ base: "start", md: "center" }}
            space={0}
          >
            <div className="relative">
              <div className="absolute z-1 left-0 h-full w-20 bg-linear-to-r from-background to-transparent" />
              <div
                className={cn("h-80 w-120 -translate-x-8")}
                style={{
                  backgroundImage: "url('/mock/protected-fabric.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            <Stack preset="card" space={{ base: 2, md: 6 }} className="">
              <h2 className="text-3xl md:text-4xl">
                Beskyttelse lønner seg nesten alltid
              </h2>
              <p className="max-w-prose mb-4">
                En lukket kassett er ikke bare estetikk - det er også fornuftig
                vedlikehold. Duken beskyttes året rundt. Mindre slitasje, mindre
                rengjøring, lengre levetid.
              </p>
            </Stack>
          </Stack>
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
