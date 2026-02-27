import { StepByStepGuide } from "@/components/step-by-step-guide";
import React from "react";

const guideData = {
  metadata: {
    title: "Montering av Terrassemarkise",
    description:
      "En komplett guide for å montere din nye terrassemarkise trygt og korrekt.",
    difficulty: "medium" as const,
    estimatedTime: "2-3 timer",
    category: "Montering",
  },
  steps: [
    {
      id: "forberedelser",
      title: "Forberedelser",
      description:
        "Start med å sjekke at du har alle deler og verktøy. Les gjennom hele bruksanvisningen før du begynner. Sørg for at veggen er solid nok til å bære markisen.",
      imageUrl: "/images/guide/step1.jpg",
      imageAlt: "Alle deler linet opp på et bord",
      duration: "15 min",
      tools: ["Bor", "Skrujern", "Vater", "Blyant", "Målebånd"],
      warnings: [
        "Sjekk at det ikke er skjulte rør eller ledninger i veggen før du borrer",
      ],
    },
    {
      id: "maling",
      title: "Mål og merk",
      description:
        "Mål nøyaktig hvor markisen skal sitte. Bruk vater for å sikre at monteringspunktene er i vater. Merk borepunktene tydelig med blyant.",
      imageUrl: "/images/guide/step2.jpg",
      imageAlt: "Måling av avstand på vegg",
      duration: "20 min",
      tips: [
        "Det er bedre å måle to ganger enn å bore feil én gang",
        "Ha noen til å hjelpe deg med å holde markisen",
      ],
    },
    {
      id: "montering",
      title: "Monter konsollene",
      description:
        "Bor hullene og fest konsollene solid i veggen. Bruk riktige plugger for veggmaterialet. Stram skruene godt, men ikke overdriv.",
      imageUrl: "/images/guide/step3.jpg",
      duration: "45 min",
      tools: ["Skruer", "Plugger", "Skiftenøkkel"],
      warnings: [
        "Ikke bruk for stor kraft når du strammer - det kan ødelegge festene",
      ],
    },
  ],
};

export default function Page() {
  return <StepByStepGuide {...guideData} />;
}
