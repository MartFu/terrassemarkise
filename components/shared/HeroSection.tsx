// components/organisms/HeroSection.tsx
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text } from "../ui/typography";
import { Button } from "../ui/button";
import PaperCrease, { PaperCreaseBox } from "../ui/paper-crease";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { LANDING_PAGE_CONTENT } from "@/app/page";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  cta?: {
    primary: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  image?: string;
  impact?: "low" | "medium" | "high";
  alignment?: "left" | "center";
  showTrustBadges?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  description,
  cta,
  image,
  impact = "medium",
  alignment = "left",
  showTrustBadges = true,
}: HeroSectionProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
  };

  const impactStyles = {
    low: {
      wrapper: "py-12 md:py-16",
      title: "text-3xl md:text-4xl",
      spacing: "space-y-4",
    },
    medium: {
      wrapper: "py-16 md:py-24 lg:py-32",
      title: "text-4xl md:text-5xl lg:text-6xl",
      spacing: "space-y-6",
    },
    high: {
      wrapper: "py-20 md:py-32 lg:py-40",
      title: "text-5xl md:text-6xl lg:text-7xl",
      spacing: "space-y-8",
    },
  };

  const styles = impactStyles[impact];

  return (
    <Section className={cn("relative overflow-hidden")}>
      <Container>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "max-w-3xl flex flex-col",
              alignmentClasses[alignment],
              styles.spacing,
            )}
          >
            {/* Label */}
            <Text
              size="sm"
              weight="semibold"
              className="text-primary uppercase tracking-wider"
            >
              {subtitle}
            </Text>

            {/* Title */}
            <Heading
              level="h1"
              className={cn(
                "font-bold tracking-tight",
                styles.title,
                impact === "high" && "lg:leading-[1.1]",
              )}
            >
              {title}
            </Heading>

            {/* Description */}
            {description && (
              <Text
                size={impact === "high" ? "xl" : "lg"}
                color="muted"
                className="max-w-2xl"
              >
                {description}
              </Text>
            )}

            {/* CTAs */}
            {cta && (
              <div
                className={cn(
                  "flex flex-wrap gap-4 pt-4",
                  alignment === "center" && "justify-center",
                )}
              >
                <Button size="lg" asChild>
                  <Link href={cta.primary.href}>
                    {cta.primary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {cta.secondary && (
                  <Button variant="outline" size="lg" asChild>
                    <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
                  </Button>
                )}
              </div>
            )}

            {/* Trust badges */}
            {showTrustBadges && impact !== "low" && (
              <div
                className={cn(
                  "flex items-center gap-6 pt-8 text-sm text-muted-foreground",
                  alignment === "center" && "justify-center",
                )}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>5000+ fornøyde kunder</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Levering i hele landet</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Norsk kundeservice</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative mt-16 h-6">
          <div className="relative uppercase text-xs h-full font-semibold flex items-center justify-start px-6 text-muted-foreground">
            <PaperCrease className="z-1" />
            <PaperCrease position="right" />
            <PaperCrease position="left" />
            <span className="relative">Populær</span>
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
