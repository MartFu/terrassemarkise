import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import React from "react";

export default function ProtectionSection() {
  return (
    <Section spacing="xl">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — fade-in from left edge like the hero does */}
          <div className="relative order-last md:order-first">
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div
              className="h-80 w-full -translate-x-8"
              style={{
                backgroundImage: "url('/mock/protected-fabric.png')",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>

          {/* Copy */}
          <div>
            {/* Eyebrow */}
            <p className="text-[0.6rem] font-mono tracking-widest uppercase text-muted-foreground mb-5">
              Holdbarhet
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-snug mb-5">
              Beskyttelse lønner seg <br className="hidden md:block" /> nesten
              alltid
            </h2>

            <hr className="border-border mb-5" />

            <p className="text-base font-light leading-relaxed text-muted-foreground">
              En lukket kassett er ikke bare estetikk — det er også fornuftig
              vedlikehold. Duken beskyttes året rundt. Mindre slitasje, mindre
              rengjøring, lengre levetid.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
