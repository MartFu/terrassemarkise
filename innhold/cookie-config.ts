import { CookieBannerProps } from "@/lib/types";

export const cookieConfig: CookieBannerProps = {
  title: "Vi bruker informasjonskapsler",
  description: "Vi bruker cookies for å forbedre din opplevelse...",
  categories: [
    {
      id: "necessary",
      label: "Nødvendige",
      description: "Påkrevd for drift",
      required: true,
    },
    {
      id: "analytics",
      label: "Analyse",
      description: "Hjelper oss å forbedre",
      required: false,
    },
  ],
  buttons: {
    acceptAll: "Godta alle",
    saveSelection: "Lagre valg",
    decline: "Avvis alle",
  },
};
