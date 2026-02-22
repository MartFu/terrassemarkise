/* eslint-disable @next/next/no-img-element */
import { ArrowDown, ArrowRight, Check, Heart, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Heading, Text } from "@/components/ui/typography";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { SITE_URLS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FireIcon } from "@/components/ui/fire-icon";
import { products } from "@/innhold/produkter";

export function ProductShowcase() {
  return (
    <Section className="bg-primary/5">
      <Container>
        {/* Section header */}
        <Stack
          space={4}
          align="center"
          justify="center"
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="text-sm">
            <Wind className="text-primary" />
            Våre markiseløsninger
          </Badge>
          <Heading level="h2" className="text-3xl font-bold sm:text-4xl">
            For enhver terrasse, ethvert behov
          </Heading>
          <Text color={"muted"} size={"lg"}>
            Fra kompakte byterrasser til store åpne uteplasser - vi har
            løsningen
          </Text>
        </Stack>

        {/* Product grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => {
            const featuredImage = product.images.find((img) => img.isFeatured);

            return (
              <div
                key={product.id}
                className={cn(
                  "h-full relative",
                  idx === 1 &&
                    "p-px bg-linear-to-t from-primary/30 to-border rounded-xl overflow-hidden shadow-2xl shadow-primary/25",
                )}
              >
                {idx === 1 && (
                  <Badge className="absolute top-2 left-2 z-1 bg-background border border-border/80 text-foreground shadow-sm">
                    Kundefavoritten
                    <FireIcon className="fill-orange-500 stroke-orange-500" />
                  </Badge>
                )}
                <Link
                  href={`${SITE_URLS.AWNINGS}${product.slug}`}
                  className={cn(
                    "h-full group relative flex flex-col transition-all overflow-hidden rounded-xl",
                    idx === 1
                      ? "bg-linear-to-bl from-card to-card/70"
                      : "bg-card border",
                  )}
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
                    {featuredImage && (
                      <img
                        src={featuredImage.src}
                        alt={featuredImage.alt}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <Stack space={4} className="flex-1">
                      <h3 className="font-heading text-xl font-semibold">
                        {product.name}
                      </h3>
                      <ul className="space-y-1">
                        {product.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm flex items-center gap-2"
                          >
                            <Check className="text-primary w-4 h-4 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </Stack>

                    <div className="mt-6 flex items-center justify-between border-t border-muted-foreground/20 pt-6">
                      <div>
                        <span className="block text-sm text-muted-foreground">
                          Pris fra
                        </span>
                        <span className="font-heading text-lg font-semibold">
                          {formatPrice(product.priceFrom)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block text-sm text-nowrap opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-[transform_opacity]">
                          Se detaljer
                        </span>
                        <div className="inline-block w-16 rounded-full border p-2 transition-colors group-hover:border-primary group-hover:bg-primary/5">
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-7 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="secondary" asChild>
            <Link href="#sammenligning">
              Se sammenligning <ArrowDown />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
