// app/_components/sections/features.tsx
import {
  Sun,
  Wind,
  Sparkles,
  Shield,
  Clock,
  Ruler,
  Home,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "../ui/typography";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: "UV-bestandig duk",
    description: "Motstandsdyktig mot falming og slitasje",
    icon: Sun,
  },
  {
    title: "Vindsikker",
    description: "Tester opp til vindstyrke 80 km/t",
    icon: Wind,
  },
  {
    title: "10 års garanti",
    description: "På alle mekaniske komponenter",
    icon: Shield,
  },
  {
    title: "Rask montering",
    description: "Profesjonell montering på 2-4 timer",
    icon: Clock,
  },
  {
    title: "Skreddersydd",
    description: "Tilpasset din terrasses mål",
    icon: Ruler,
  },
  {
    title: "Miljøvennlig",
    description: "Resirkulerbare materialer",
    icon: Leaf,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Heading level="h2" className="text-3xl font-bold sm:text-4xl">
            Kvalitet du kan stole på
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Norskutviklet solskjerming med fokus på holdbarhet og design
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-0 bg-muted/30 shadow-none"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
