// components/sections/hero-section.tsx
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";

export function HeroSection() {
  return (
    <Section ariaLabel="Hovedseksjon" className="relative overflow-hidden">
      {/* Bakgrunnseffekt */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <Container maxWidth="1280px">
        <Stack space={{ sm: 8, md: 12 }} align="center" className="text-center">
          {/* Merkelapp */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sun className="h-4 w-4" />
            <span>Skreddersydde markisløsninger siden 1985</span>
          </div>

          {/* Hovedinnhold */}
          <Stack space={6} align="center">
            <Heading
              level="h1"
              impact="high"
              className="max-w-4xl text-balance bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text"
            >
              Nyt uterommet hele året med{" "}
              <span className="text-primary">perfekte markiser</span>
            </Heading>

            <Text size="xl" color="muted" className="max-w-2xl text-balance">
              Fra klassiske utemarksiser til innovative glassmarkiser – vi
              hjelper deg med å skape det ultimate uterommet, uansett vær.
            </Text>
          </Stack>

          {/* CTA-knapper */}
          <Stack direction="row" space={4} wrap justify="center">
            <Button size="lg" className="gap-2">
              Be om uforpliktende befaring
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Se våre referanser
            </Button>
          </Stack>

          {/* Tillitsindikatorer */}
          <Stack
            direction="row"
            space={8}
            wrap
            justify="center"
            className="pt-8"
          >
            {[
              { number: "1000+", label: "fornøyde kunder" },
              { number: "25+", label: "års garanti" },
              { number: "4.9", label: "i gjennomsnitt på Google" },
            ].map((stat) => (
              <Stack key={stat.label} space={1} align="center">
                <Text size="xl" weight="semibold" className="text-primary">
                  {stat.number}
                </Text>
                <Text size="sm" color="muted">
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
