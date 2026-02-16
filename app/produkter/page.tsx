import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { products } from "@/innhold/produkter";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <Section>
      <Container>
        {products.map((product, i) => (
          <div
            key={product.slug}
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:direction-rtl" : ""
            }`}
          >
            {/* Image */}
            <Link
              href={`/produkter/${product.slug}`}
              className={`group overflow-hidden rounded-lg ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <div className="relative aspect-473 overflow-hidden rounded-lg">
                {/*  eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images?.[0]?.src ?? ""}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Link>

            {/* Info */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <span className="text-xs font-medium uppercase tracking-widest text-accent">
                {product.price}
              </span>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
                {product.name}
              </h2>
              <p className="mt-1 text-muted-foreground">{product.tagline}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap gap-6">
                {product.highlights.map((h) => (
                  <div key={h.label}>
                    <span className="block font-heading text-xl font-semibold text-foreground">
                      {h.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="mt-6 grid gap-1.5 sm:grid-cols-2">
                {product.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild>
                  <Link href={`/produkter/${product.slug}`}>
                    Se detaljer <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
