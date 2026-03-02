import { getTeamMemberByName } from "@/innhold/selskap";
import { TeamMember } from "@/innhold/types";

const morten = getTeamMemberByName("Morten Øhrn");

export interface AboutContent {
  hero: {
    title: string | string[];
    subtitle: string;
    companyBadge: string;
    image: {
      src: string;
      alt: string;
    };
  };
  companyInfo: {
    name: string;
    established: string;
    location: string;
    employees: string;
    description: string;
    websiteRelation: {
      title: string;
      description: string;
      domain: string;
    };
  };
  story: {
    title: string;
    founderStory: {
      name?: string;
      role?: string;
      background?: string;
      image?: string;
      imageAlt?: string;
    };
    challenge: string;
    solution: string;
    paragraphs: string[];
  };
  values: {
    title: string;
    coreValues: Array<{
      title: string;
      description: string;
    }>;
  };
  expertise: {
    title: string;
    description: string;
    areas: Array<{
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    description: string;
    members: TeamMember[];
  };
  contact: {
    title: string;
    description: string;
    cta: string;
    buttonText: string;
  };
}

/**
 * CONTENT DATA
 */
export const aboutContent: AboutContent = {
  hero: {
    title: ["Din spesialist på nesten", "alt innen solskjerming"],
    subtitle:
      "Vi er her for å utfordre en ugjennomsiktig bransje med faglig tyngde, transparente priser og kundeservicen du fortjener.",
    companyBadge: "En del av Solskjerming AS",
    image: {
      src: "/mock/hero-awning.webp",
      alt: "Solskjerming AS",
    },
  },
  companyInfo: {
    name: "Solskjerming AS",
    established: "2013",
    location: "Kråkerøy, Fredrikstad",
    employees: "3 faste ansatte + partnernettverk",
    description:
      "Vi startet opp i 2013 med en klar visjon: å skape åpenhet og ærlighet i en bransje preget av uklare priser og aggressive salgstaktikker.",
    websiteRelation: {
      title: "terrassemarkise.no er en del av Solskjerming AS",
      description:
        "Når du handler hos terrassemarkise.no, handler du direkte fra Solskjerming AS. Vi er et solid selskap med kontorer og lager på Kråkerøy i Fredrikstad. Vi kombinerer tryggheten til en etablert aktør med effektiviteten til en moderne nettbutikk.",
      domain: "terrassemarkise.no",
    },
  },
  story: {
    title: "Slik startet Solskjerming AS",
    founderStory: {
      name: morten?.name,
      role: morten?.role,
      background: morten?.description,
      image: morten?.image,
      imageAlt: morten?.imageAlt,
    },
    challenge: "En bransje basert på 'skjulte' priser og falske rabatter",
    solution: "Full åpenhet og muligheten til å velge selv",
    paragraphs: [
      "Solskjerming AS ble født ut av ren frustrasjon. Da gründer Håkon Renskoug skulle handle solskjerming til egen bolig, møtte han en bransje preget av lukkede prislister og 'fagmenn' som måtte komme hjem for å gi tilbud på enkle mål.",
      "Det var kampanjer med 40% rabatt uten utgangspris, korte akseptfrister og selgere som presset på for signatur der og da. Som maskiningeniør så Håkon det unødvendige i dette spillet.",
      "Han ønsket en enkel løsning: Kvalitetsprodukter til faste, ærlige priser, hvor kunden selv kan velge om de vil montere eller få hjelp. Uten press, og uten skjulte mellomledd. Slik ble Solskjerming AS, og dermed også terrassemarkise.no til.",
    ],
  },
  values: {
    title: "Hva vi står for",
    coreValues: [
      {
        title: "Total Åpenhet",
        description:
          "Vi opererer ikke med fiktive førpriser eller hemmelige rabatter. Prisen du ser er den du betaler – rett fra lageret vårt på Kråkerøy.",
      },
      {
        title: "Ingeniørens Tilnærming",
        description:
          "Med bakgrunn innen maskin og bygg selger vi ikke bare produkter; vi forstår mekanikken, materialtrettheten og de tekniske kravene bak dem.",
      },
      {
        title: "Kunden i Sentrum",
        description:
          "Vi brenner for faget og for at du skal få en løsning som varer i tiår, ikke bare sesonger.",
      },
    ],
  },
  expertise: {
    title: "Teknisk Overlegenhet",
    description:
      "Vi snakker samme språk som arkitekter og ingeniører. Vi forstår vindlast, korrosjonsklasser og tekstilteknologi.",
    areas: [
      {
        title: "Faglig Tyngde",
        description:
          "Vårt team inkluderer bygg- og maskiningeniører som kan veilede deg gjennom kompliserte innfestinger og dimensjonering.",
      },
      {
        title: "Praktisk Erfaring",
        description:
          "Vi har selv montert hundrevis av markiser. Vi vet nøyaktig hvor skoen trykker og gir råd basert på faktisk erfaring, ikke bare brosjyrer.",
      },
      {
        title: "Helhetlig Rådgivning",
        description:
          "Fra valg av dukfarge for optimalt inneklima til teknisk support under montering – vi er med deg hele veien.",
      },
    ],
  },
  team: {
    title: "Møt Teamet",
    description:
      "Bak terrassemarkise.no står et lite, men dedikert team i Fredrikstad som brenner for gode løsninger.",
    members: [
      {
        name: "Håkon Renskoug",
        role: "Eier & Produktansvarlig",
        education: "Høgskoleingeniør maskin",
        description:
          "Gründeren med det tekniske overblikket. Håkon sørger for at produktene vi tar inn holder de strenge kravene han selv stilte som privatkunde.",
        social: { email: "hakon@solskjerming.no" },
        image: {
          alt: "Håkon Renskoug",
          src: "/assets/team/h-renskoug.jpg",
        },
      },
      {
        name: "Morten Øhrn",
        role: "Daglig Leder",
        description:
          "Morten har over et tiår med erfaring i bransjen og sørger for at den daglige driften og kundereisen er så sømløs som mulig.",
        social: { email: "morten@solskjerming.no" },
        image: {
          alt: "Morten Øhrn",
          src: "/assets/team/m-ohrn.jpg",
        },
      },
      {
        name: "Ståle Krabset",
        role: "Økonomiansvarlig",
        education: "Høgskoleingeniør bygg",
        description:
          "Ståle kombinerer teknisk forståelse fra byggbransjen med økonomisk styring for å sikre konkurransedyktige priser over tid.",
        social: { email: "stale@solskjerming.no" },
        image: {
          alt: "Ståle Krabset",
          src: "/assets/team/s-krabset.jpg",
        },
      },
    ],
  },
  contact: {
    title: "Ta kontakt for en uforpliktende prat",
    description:
      "Ingen spørsmål er for små. Vi hjelper deg med bilder av løsninger, tekniske tegninger eller bare en ærlig vurdering av ditt behov.",
    cta: "Vi svarer raskt på både telefon og e-post.",
    buttonText: "Send oss en melding",
  },
};
