// components/sections/testimonial-wall.tsx
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import {
  SectionHeader,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Text } from "@/components/ui/typography";

const testimonials = [
  {
    name: "Erik Lunde",
    location: "Oslo",
    rating: 5,
    text: "Veldig fornøyd med både markis og service. Montøren var presis, hyggelig og ryddet opp etter seg. Markisen fungerer perfekt, og vi bruker terrassen mye mer nå.",
    initials: "EL",
  },
  {
    name: "Marianne Berg",
    location: "Bærum",
    rating: 5,
    text: "Profesjonelt hele veien. Fikk god veiledning på hvilken markis som passet vårt hus, og monteringen gikk knirkefritt. Anbefales på det varmeste!",
    initials: "MB",
  },
  {
    name: "Thomas Hagen",
    location: "Stavanger",
    rating: 5,
    text: "Glassmarkisen overgikk alle forventninger. Nå kan vi sitte ute selv når det blåser. Kvaliteten er tydelig høy, og den ser flott ut.",
    initials: "TH",
  },
  {
    name: "Ingrid Viken",
    location: "Trondheim",
    rating: 5,
    text: "Rask levering, hyggelig montør og en markis som tåler trøndervær. Hva mer kan man ønske seg?",
    initials: "IV",
  },
];

export function TestimonialWall() {
  return (
    <Section ariaLabel="Kundeanmeldelser">
      <Container>
        <Stack space={{ sm: 12, md: 16 }}>
          <SectionHeader className="mx-auto max-w-3xl text-center">
            <SectionLabel>4.9 i snitt på Google</SectionLabel>
            <SectionTitle>Det mener våre kunder</SectionTitle>
          </SectionHeader>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-0 bg-muted/20 shadow-sm transition-all hover:shadow-md"
              >
                <CardContent className="p-6">
                  <Stack space={4}>
                    {/* Stjerner */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Sitattest */}
                    <Text className="italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </Text>

                    {/* Kundeinfo */}
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <Stack space={0.5}>
                        <Text weight="semibold" size="sm">
                          {testimonial.name}
                        </Text>
                        <Text color="muted" size="xs">
                          {testimonial.location}
                        </Text>
                      </Stack>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
