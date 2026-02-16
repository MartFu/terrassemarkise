import { LANDING_PAGE_CONTENT } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import PaperCrease from "@/components/ui/paper-crease";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function CreasedSection() {
  return (
    <Section className="pt-0! -mt-6!">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative h-6">
          <div className="bg-primary relative uppercase text-xs font-semibold text-muted-foreground">
            <PaperCrease className="z-1" />
            <PaperCrease position="right" />
            <PaperCrease position="left" />
            <div className="relative w-full h-full flex items-center px-6">
              Populær
            </div>
          </div>
          <div className="relative hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start relative">
          <PaperCrease
            position="bottom"
            shouldOverflow
            className="block lg:hidden"
          />
          {/* Optional hero image */}
          <div className="w-full h-full md:col-span-2 lg:col-span-1 mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative p-6 grid grid-rows-2">
            <PaperCrease shouldOverflow />
            <PaperCrease position="bottom" shouldOverflow />
            <PaperCrease position="right" />
            <PaperCrease position="left" />
            <div className="relative aspect-video overflow-hidden w-full">
              <Image
                src={"/assets/product-images/corsica_profile.png"}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-3 flex flex-col justify-between mt-6 gap-2">
              <div className="space-y-2">
                <Heading level="h2" className="text-xl!">
                  Corsica
                </Heading>
                <Text size={"sm"}>
                  Den fleksible klassikeren. Ideell for de som ønsker maksimal
                  fleksibilitet.
                </Text>
              </div>
              <Button variant="ghost">
                Les mer <ArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 relative p-6 grid grid-rows-2">
            <PaperCrease className="hidden" />
            <PaperCrease
              position="bottom"
              className="block md:hidden"
              shouldOverflow
            />
            <PaperCrease className="block lg:hidden" position="left" />
            <PaperCrease className="block md:hidden" position="right" />

            <div className="relative aspect-video overflow-hidden w-full">
              <Image
                src={"/assets/product-images/jamaica_profile.png"}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-3 flex flex-col justify-between mt-6 gap-2">
              <div className="space-y-2">
                <Heading level="h2" className="text-xl!">
                  Jamaica
                </Heading>
                <Text size={"sm"}>
                  Den fleksible klassikeren. Ideell for de som ønsker maksimal
                  fleksibilitet.
                </Text>
              </div>
              <Button variant="ghost">
                Les mer <ArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 relative p-6 grid grid-rows-2">
            <PaperCrease shouldOverflow className="hidden lg:block" />
            <PaperCrease
              position="bottom"
              shouldOverflow
              className="hidden lg:block"
            />
            <PaperCrease position="left" />
            <PaperCrease position="right" />

            <div className="relative aspect-video overflow-hidden w-full">
              <Image
                src={"/assets/product-images/palladio_profile.png"}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-3 flex flex-col justify-between mt-6 gap-2">
              <div className="space-y-2">
                <Heading level="h2" className="text-xl!">
                  Palladio
                </Heading>
                <Text size={"sm"}>Elegant og moderne.</Text>
              </div>
              <Button variant="ghost">
                Les mer <ArrowUpRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="py-12 relative">
          <PaperCrease position="left" />
          <PaperCrease position="right" />
          <PaperCrease position="bottom" shouldOverflow />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LANDING_PAGE_CONTENT.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-2xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
