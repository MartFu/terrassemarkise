import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Review } from "@/innhold/reviews";

export function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  return (
    <Section className="relative">
      <Container>
        {/* Header with trustpilot-style rating */}
        <div className="flex flex-col items-center gap-6 text-center mb-16 relative z-20">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-primary text-primary" />
            ))}
          </div>
          <div>
            <h2 className="text-3xl">Dette sier våre kunder</h2>

            <p className="mt-2 text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span>{" "}
              basert på 90 anmeldelser
            </p>
          </div>
        </div>

        {/* Masonry mosaic grid */}
        <div className="relative">
          {/* Bottom fade gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10" />

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, idx) => (
              <div
                key={`review-${review.year}-${idx}`}
                className="break-inside-avoid relative rounded-lg bg-card border border-border p-6"
              >
                {/* Quote icon */}
                <Quote className="absolute right-4 top-4 h-6 w-6 text-muted-foreground/10" />

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Review content */}
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  "{review.comment}"
                </p>

                {/* Divider and reviewer */}
                <div className="pt-4 flex items-center justify-between border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    {review.reviewer}
                  </p>
                  {review.year && (
                    <p className="text-xs text-muted-foreground">
                      {review.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
