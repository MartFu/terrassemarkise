// components/sections/value-proposition.tsx
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import {
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Shield, Sparkles, Wind, Palette, Clock } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";

const values = [
  {
    icon: Sun,
    title: "UV-beskyttelse",
    description:
      "Blokkerer opptil 95% av skadelig UV-stråling, slik at du kan nyte solen trygt.",
  },
  {
    icon: Shield,
    title: "Værbestandig",
    description:
      "Tåler norsk vær – fra stekende sol til kraftige vindkast og regnbyger.",
  },
  {
    icon: Sparkles,
    title: "Enkel rengjøring",
    description:
      "Spesialbehandlet stoff som motstår smuss og mugg – enkelt å holde rent.",
  },
  {
    icon: Wind,
    title: "Vindtester",
    description:
      "Alle markiser er testet for vindstyrker opp mot 12 m/s for trygghet.",
  },
  {
    icon: Palette,
    title: "Tilpasset design",
    description:
      "Velg blant 50+ farger og mønstre som komplementerer ditt hjem.",
  },
  {
    icon: Clock,
    title: "Levering på 14 dager",
    description:
      "Rask produksjon og montering – fra bestilling til ferdig montert.",
  },
];

export function ValueProposition() {
  return (
    <Section ariaLabel="Våre fordeler" className="bg-muted/30">
      <Container>
        <Stack space={{ sm: 12, md: 16 }}>
          <SectionHeader className="mx-auto text-center">
            <SectionLabel>Hvorfor velge oss</SectionLabel>
            <SectionTitle>Kvalitet du kan stole på, året rundt</SectionTitle>
            <SectionDescription>
              Vi kombinerer nordisk design med tysk ingeniørkunst for å skape
              markiser som tåler norske forhold – og som gjør uterommet ditt
              brukbart uansett vær.
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="border-0 bg-background shadow-sm transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <Stack space={4}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Stack space={2}>
                        <Heading level="h3" className="text-lg">
                          {value.title}
                        </Heading>
                        <Text color="muted" className="text-sm">
                          {value.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
