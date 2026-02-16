import { ImageGallery } from "@/components/product-gallery";
import { ProductSpecList } from "@/components/spec-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { products } from "@/innhold/produkter";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      <Container className="py-4">
        <Link
          href="/produkter"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> Tilbake til produkter
        </Link>
      </Container>
      <Section className="py-0!">
        <Container>
          <div className="flex flex-col gap-8">
            <ImageGallery images={product.images} />

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header: Name & Price */}
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1.5">
                  <Heading
                    level="h1"
                    className="text-xl! md:text-xl! lg:text-2xl!"
                  >
                    {product.name}
                  </Heading>
                  <p className="text-base text-muted-foreground">
                    {product.tagline}
                  </p>
                </div>

                <div className="md:text-right">
                  <span className="block font-heading text-lg md:text-xl lg:text-2xl font-semibold text-accent">
                    {product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    inkl. mva, ekskl. montering
                  </span>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid gap-20 lg:grid-cols-[2fr_1fr] border-t pt-8">
                {/* Main Content - Description & Actions */}
                <div className="space-y-8">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="space-y-6">
                    {/* Features List */}
                    <ul className="space-y-3">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <Check
                            size={18}
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="lg" asChild>
                        <Link href="/kontakt">Konfigurer i nettbutikken</Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link
                          href="https://solskjerming-as.no"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Utforsk hele vårt sortiment
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="h-full relative grid gap-3">
                  {product.highlights.map((f) => (
                    <div
                      key={f.label}
                      className="relative flex items-center justify-between gap-1.5 border border-border/40 bg-card/30 px-4 py-2"
                    >
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </span>
                      <span className="block font-heading text-sm font-medium text-foreground">
                        {f.value}
                      </span>
                    </div>
                  ))}
                  <ProductSpecList specs={product.specs} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="mt-16">
        <Container className="space-y-3">
          <Heading level={"h2"}>Ofte stilte spørsmål</Heading>
          <Accordion
            type="single"
            defaultValue={product?.faqs[0]?.question}
            collapsible
          >
            {product?.faqs &&
              product.faqs.length > 0 &&
              product.faqs.map((faq) => (
                <AccordionItem value={faq.question} key={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </Container>
      </Section>
    </article>
  );
}
