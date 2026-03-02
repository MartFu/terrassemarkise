import { CookieBannerProps } from "@/lib/types";

export const cookieConfig: CookieBannerProps = {
  title: "Vi bruker informasjonskapsler",
  description:
    "Enkelte av våre informasjonskapsler er strengt nødvendige, mens andre hjelper oss å kontinuerlig forbedre tjenestene våre.",
  categories: [
    {
      id: "necessary",
      label: "Nødvendige",
      description: "Påkrevd for drift av tjenestene våre",
      required: true,
    },
    {
      id: "analytics",
      label: "Analyse",
      description:
        "Hjelper oss å forbedre med å forbedre oss, og forstå hvordan tjenestene våre brukes",
      required: false,
    },
  ],
  buttons: {
    acceptAll: "Godta alle",
    saveSelection: "Lagre valg",
    decline: "Avvis alle",
  },
};
