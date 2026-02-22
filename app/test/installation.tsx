// components/sections/installation-process.tsx
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import {
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone, ClipboardCheck, HardHat, Sparkles } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";

const steps = [
  {
    icon: Phone,
    title: "1. Uforpliktende kontakt",
    description:
      "Ta kontakt for en hyggelig prat om dine ønsker og behov. Vi booker tid for befaring når det passer deg.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Befaring og tilbud",
    description:
      "Vår montør kommer hjem til deg, måler opp og gir et skreddersydd tilbud uten skjulte kostnader.",
  },
  {
    icon: HardHat,
    title: "3. Profesjonell montering",
    description:
      "Våre sertifiserte montører installerer markisen din på én dag – ryddig og presist.",
  },
  {
    icon: Sparkles,
    title: "4. Overlevering og opplæring",
    description:
      "Vi viser deg hvordan markisen brukes, og sørger for at du er 100% fornøyd før vi drar.",
  },
];

export function InstallationProcess() {
  return (
    <Section ariaLabel="Slik fungerer det" className="bg-muted/30">
      <Container>
        <Stack space={{ sm: 12, md: 16 }}>
          <SectionHeader className="mx-auto max-w-3xl text-center">
            <SectionLabel>Enkel prosess</SectionLabel>
            <SectionTitle>
              Slik går vi frem – fra første kontakt til ferdig montert
            </SectionTitle>
            <SectionDescription>
              Vi har utviklet en strømlinjeformet prosess som gjør det enkelt og
              trygt å få ny markis.
            </SectionDescription>
          </SectionHeader>

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Linje som forbinder stegene (skjules på mobil) */}
            <div className="absolute left-0 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 lg:block" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.title}
                  className="relative border-0 bg-background shadow-sm"
                >
                  <CardHeader className="pb-2">
                    <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                      <Icon className="h-8 w-8" />
                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                        {index + 1}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Stack space={2}>
                      <Heading level="h3" className="text-lg">
                        {step.title}
                      </Heading>
                      <Text color="muted" size="sm">
                        {step.description}
                      </Text>
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
