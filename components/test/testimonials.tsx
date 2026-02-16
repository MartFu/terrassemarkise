// app/_components/sections/testimonials.tsx
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "../ui/typography";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  image?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Anne Lise Hansen",
    location: "Tønsberg",
    rating: 5,
    content:
      "Utrolig fornøyd med markisen! Profesjonell montering, og duken er akkurat i den fargen vi ønsket. Anbefales på det varmeste.",
    image: "/avatars/anne.jpg",
  },
  {
    id: "2",
    name: "Per Kristian Olsen",
    location: "Oslo",
    rating: 5,
    content:
      "God service hele veien - fra befaring til ferdig montert markise. Kundebehandleren var tålmodig og hjalp oss med fargevalg.",
    image: "/avatars/per.jpg",
  },
  {
    id: "3",
    name: "Marianne Berg",
    location: "Sandefjord",
    rating: 5,
    content:
      "Har hatt markisen i to år nå, fungerer perfekt. Motorisert løsning med solsensor er gull verdt på sommeren.",
    image: "/avatars/marianne.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Header with trustpilot-style rating */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-primary text-primary" />
            ))}
          </div>
          <div>
            <Heading level="h2" className="text-3xl font-bold sm:text-4xl">
              Dette sier våre kunder
            </Heading>
            <p className="mt-2 text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span>{" "}
              basert på 328 anmeldelser
            </p>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="relative">
              <CardContent className="p-6">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-muted-foreground/20" />

                {/* Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Review content */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {`"${review.content}"`}
                </p>

                {/* Customer info */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {review.image && (
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
