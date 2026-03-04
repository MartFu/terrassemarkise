import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section className="h-[calc(100vh-var(--header-height))] relative">
      <Container className="text-center md:text-left space-y-6 max-w-2xl relative">
        <div className="h-48 w-48 bg-amber-400/80 rounded-full absolute -top-48 blur-3xl right-0" />
        <div
          className="min-h-80 mb-0 md:mb-12 relative dark:backdrop-invert-0"
          style={{
            backgroundImage: "url('/assets/404.webp')",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 dark:backdrop-invert-70" />
        </div>
        <Heading as="h1" level="h3" className="mx-auto">
          Oi, nå sitter du midt i solsteken!
        </Heading>

        <p className="text-xl">
          Denne siden finnes ikke, men vi har heldigvis markiser som dekker det
          meste annet.
        </p>

        <div className="flex flex-col md:flex-row gap-2 w-full justify-start items-center">
          <Button
            className="w-full md:w-auto"
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/">
              <ArrowLeft /> Tilbake til forsiden
            </Link>
          </Button>
          <Button className="w-full md:w-auto" size="lg" asChild>
            <Link href="/produkter">Se våre markiser</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
