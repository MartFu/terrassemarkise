"use client";

import { Container } from "../ui/container";
import { Link } from "../ui/link";
import { Marquee } from "../ui/marquee";
import { Section } from "../ui/section";

import { cn } from "@/lib/utils";
import { Article } from "./article-list";

export function ArticlesHero({ articles }: { articles: Article[] }) {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative bg-background min-h-[40vh] flex! items-center!">
        <div
          className="absolute right-0 inset-y-0 h-full w-2/3 z-1 after:absolute after:inset-0 after:content-[''] after:bg-linear-to-l after:from-white/30 md:after:from-white/30 md:after:via-white/20 after:to-background"
          aria-label="Corsica Illustrasjon"
          style={{
            backgroundImage:
              "url('/assets/product-images/corsica_illustration.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Container className="relative z-1 h-full">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 lg:mb-4 text-2xl md:text-3xl lg:text-5xl max-w-[20ch] font-bold tracking-tight text-foreground">
              Alt du trenger å vite om din nye markise
            </h1>
            <p className="max-w-[40ch] md:text-lg lg:text-xl text-muted-foreground">
              Her finner du nyttig informasjon om hvordan du får mest mulig ut
              av din markise. Alt starter med å velge rett!
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
