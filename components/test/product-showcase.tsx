// app/_components/sections/product-showcase.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "../ui/typography";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Terrasse Markise K70",
    description: "Kassettmarkise med integrert LED-belysning",
    price: "fra 12.990,-",
    image: "/products/k70.jpg",
    badge: "Mest populær",
  },
  {
    id: "2",
    name: "Frittstående Pavilion",
    description: "Frittstående markise for åpne terrasser",
    price: "fra 18.500,-",
    image: "/products/pavilion.jpg",
  },
  {
    id: "3",
    name: "Vindskjerm Essential",
    description: "Nedfellbar vindskjerm i glassklar duk",
    price: "fra 8.990,-",
    image: "/products/essential.jpg",
  },
];

export function ProductShowcase() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
            Våre markiseløsninger
          </Badge>
          <Heading level="h2" className="text-3xl font-bold sm:text-4xl">
            For enhver terrasse, ethvert behov
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Fra kompakte byterrasser til store åpne uteplasser – vi har
            løsningen
          </p>
        </div>

        {/* Product grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      RAL-farger etter eget ønske
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      Motor med fjernkontroll
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-6">
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      Pris fra
                    </span>
                    <span className="font-heading text-lg font-semibold">
                      {product.price}
                    </span>
                  </div>
                  <div className="rounded-full border p-2 transition-colors group-hover:border-primary group-hover:bg-primary/5">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/produkter">
              Se alle produkter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
