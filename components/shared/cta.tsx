// app/_components/sections/cta.tsx
import Link from "next/link";
import { ArrowRight, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "../ui/typography";
import { Section } from "../ui/section";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/innhold/selskap";
import { Stack } from "../ui/stack";
import { Container } from "../ui/container";

export function CTASection({ className }: { className?: string }) {
  return (
    <Section
      className={cn(
        className,
        "relative isolate overflow-hidden bg-accent min-h-160",
      )}
    >
      {/* Abstract pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[40rem] font-bold leading-none text-primary-foreground/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Logo"
            src="/assets/logo_icon.png"
            className="object-fit opacity-40"
          />
        </div>
      </div>

      <Container>
        <Stack
          space={8}
          align="center"
          justify="center"
          className="text-center max-w-3xl mx-auto"
        >
          <Heading
            level="h2"
            className="text-3xl font-bold text-accent-foreground! sm:text-4xl lg:text-5xl!"
          >
            Slipp sjenerende sol og kald trekk på uteplassen din!
          </Heading>

          <Text className="text-lg text-accent-foreground/90!">
            Enten du vil skjerme for den laveste kveldssola eller skape et lunt
            hjørne på vindfulle dager, leverer vi skreddersydd solskjerming som
            varer. La oss ta en uforpliktende prat om hvordan du kan nyte
            uterommet ditt enda mer.
          </Text>

          <Stack space={4} className="mt-4">
            <Stack direction={"row"} align="center" space={2}>
              <Button
                size="lg"
                variant="secondary"
                className="group gap-2 px-4"
                asChild
              >
                <Link href="/befaring">
                  Besøk nettbutikken
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-accent-foreground/80 hover:text-secondary-foreground hover:bg-secondary/80"
                asChild
              >
                <Link href="/kontakt">Snakk med en ekspert</Link>
              </Button>
            </Stack>

            {/* Contact options */}
            <Stack
              direction={"row"}
              align="center"
              space={4}
              className="text-sm text-accent-foreground/60"
            >
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {COMPANY_INFO.phone}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {COMPANY_INFO.email}
              </span>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
