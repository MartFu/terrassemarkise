import Breadcrumbs from "@/components/breadcrumbs";
import { ImageGallery } from "@/components/shared/product-gallery";
import { FAQSection } from "@/components/shared/faq-section";
import { ProductSpecList } from "@/components/spec-list";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Heading } from "@/components/ui/typography";
import { products } from "@/innhold/produkter";
import { ExternalLink, Send } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";

export function generateStaticParams() {
  try {
    return products.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for juridisk:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Produkt ikke funnet",
    };
  }

  return {
    title: `${product.name} | Solskjerming AS`,
    description: product.tagline || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({
        url: img.src,
        alt: product.name,
      })),
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <article className="min-h-screen">
      <Section className="py-8!">
        <Container className="pb-0">
          <Breadcrumbs
            breadcrumbs={[
              {
                label: "Hjem",
                href: "/",
              },
              {
                label: "Produkter",
                href: "/produkter",
              },
              {
                label: product.name,
              },
            ]}
          />
        </Container>
      </Section>
      <Section className="pt-0!">
        <Container>
          <Stack space={8}>
            <ImageGallery
              images={product.images.map((img) => ({ ...img, id: img.src }))}
            />

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header: Name & Price */}
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <Stack space={2}>
                  <Heading
                    level="h1"
                    className="text-xl! md:text-xl! lg:text-2xl!"
                  >
                    {product.name}
                  </Heading>
                  <p className="text-base text-muted-foreground">
                    {product.tagline}
                  </p>
                </Stack>

                <div className="md:text-right">
                  <div className="font-display block space-x-2 font-heading text-lg md:text-xl lg:text-2xl font-semibold ">
                    <span>Fra</span>
                    <span>{formatPrice(product.priceFrom)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    inkl. mva, ekskl. montering
                  </span>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid gap-8 md:gap-12 lg:gap-20 lg:grid-cols-[2fr_1fr] border-t pt-8">
                {/* Main Content - Description & Actions */}
                <Stack
                  align={"start"}
                  justify={"between"}
                  space={6}
                  className="h-full"
                >
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="space-y-10">
                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="lg" asChild>
                        <Link
                          href={
                            EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS_TERRACE_AWNINGS +
                            "/" +
                            product.slug
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Konfigurer i nettbutikken
                          <ExternalLink />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link
                          href={
                            EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS_TERRACE_AWNINGS
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Utforsk hele vårt sortiment
                          <ExternalLink />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Stack>

                <Stack space={2} className="relative">
                  {product.highlights.map((f) => (
                    <Stack
                      direction={"row"}
                      align="center"
                      justify="between"
                      key={f}
                      className="border border-border/40 bg-card/30 px-4 h-10"
                    >
                      <span className="text-xs tracking-wider text-card-foreground/80">
                        {f}
                      </span>
                    </Stack>
                  ))}
                  <ProductSpecList specs={product.getSpecs()} />
                </Stack>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* {product?.faqs && (
        <FAQSection
          title={`Kunder som handler ${product.name} lurer ofte på`}
          faqs={product.faqs}
        />
      )} */}

      <Section>
        <Container>
          <Card className="text-center bg-card/50 border border-border/30 rounded-none py-8">
            <CardHeader>
              <CardTitle className="text-left md:text-center text-lg md:text-xl">
                Fant du ikke det du lette etter?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-left md:text-center text-base md:text-lg text-balance">
                Send oss en melding, så hjelper vi deg med å finne <br /> den
                beste løsningen for akkurat ditt tilfelle!
              </CardDescription>
              <div className="flex flex-col items-start gap-2 md:block space-x-2 space-y-2 mt-8">
                <Button asChild variant={"outline"}>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS}
                  >
                    Se hele vårt sortiment
                    <ExternalLink />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={SITE_URLS.CONTACT}>
                    Send oss en melding <Send />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </article>
  );
}
