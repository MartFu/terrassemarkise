// app/_components/sections/how-it-works.tsx
import { Ruler, Palette, Truck, Wrench } from "lucide-react";
import { Heading } from "../ui/typography";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Ruler,
    title: "Mål opp",
    description:
      "Mål din terrasse eller last opp bilder for skreddersydd tilpasning",
  },
  {
    icon: Palette,
    title: "Velg farger",
    description: "Velg akkurat de fargene som passer din nye markise",
  },
  {
    icon: Truck,
    title: "Produksjon",
    description:
      "Vi produserer din markise etter på bestilling, etter dine ønsker",
  },
  {
    icon: Wrench,
    title: "Montering",
    description:
      "Profesjonell montering av våre montører - eller spar inntil 30% på å montere selv!",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-primary/5 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Heading level="h2" className="text-3xl font-bold sm:text-4xl">
            Slik får du din nye markise
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Enkelt, raskt og helt uten stress
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connection line (hidden on mobile) */}
          <div className="absolute left-0 top-9 hidden h-0.5 w-full -translate-y-1/2 bg-border/50 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className={cn("relative text-center")}>
                  {/* Step number bubble */}
                  <div
                    className={cn(
                      "relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background",
                    )}
                  >
                    <div
                      className={cn(
                        "relative z-3 flex h-16 w-16 items-center justify-center rounded-full bg-background lg:bg-primary/15 lg:ring-0",
                      )}
                    >
                      <Icon className="z-3 relative h-7 w-7 text-primary" />
                      <span className="z-3 absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
