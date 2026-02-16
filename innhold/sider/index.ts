/**
 * Index (Forside) page content
 */

import { siteConfig } from "../site";
import { IndexPageContent } from "../types";

export const indexPageContent: IndexPageContent = {
  meta: {
    title: `${siteConfig.name} | Kvalitetsprodukter for din bedrift`,
    description:
      "Vi leverer kvalitetsprodukter og tjenester til bedrifter over hele Norge. Besøk nettbutikken vår eller ta kontakt for en uforpliktende samtale.",
    keywords: ["produkter", "kvalitet", "bedrift", "norge", "leverandør"],
  },

  hero: {
    eyebrow: "Velkommen til " + siteConfig.name,
    title: "Kvalitetsprodukter for norske bedrifter",
    description:
      "Vi gjør hverdagen enklere for tusenvis av bedrifter med pålitelige produkter og førsteklasses kundeservice. Oppdag hvorfor over 500 bedrifter velger oss.",
    primaryCta: {
      label: "Til nettbutikken",
      href: siteConfig.shopUrl,
      external: true,
    },
    secondaryCta: {
      label: "Se våre produkter",
      href: "/produkter",
    },
    badges: ["Gratis frakt over 1000 kr", "Rask levering", "30 dagers retur"],
  },

  trustIndicators: [
    {
      icon: "Users",
      value: "500+",
      label: "Fornøyde bedriftskunder",
    },
    {
      icon: "Package",
      value: "10 000+",
      label: "Leveranser i år",
    },
    {
      icon: "Star",
      value: "4.9/5",
      label: "Gjennomsnittlig vurdering",
    },
    {
      icon: "Clock",
      value: "24t",
      label: "Gjennomsnittlig leveringstid",
    },
  ],

  features: {
    eyebrow: "Hvorfor velge oss",
    title: "Alt du trenger på ett sted",
    description:
      "Vi har samlet alt du trenger for å drive din bedrift effektivt. Fra produkter til veiledning – vi er her for deg.",
    features: [
      {
        icon: "Truck",
        title: "Rask levering",
        description:
          "De fleste ordrer leveres innen 24 timer. Vi har lager over hele landet for raskest mulig levering.",
        href: "/veiledning/levering",
      },
      {
        icon: "Headphones",
        title: "Kundeservice i toppklasse",
        description:
          "Vårt team står klare til å hjelpe deg. Ring, chat eller send e-post – vi svarer alltid raskt.",
        href: "/kontakt",
      },
      {
        icon: "ShieldCheck",
        title: "Kvalitetsgaranti",
        description:
          "Alle produkter gjennomgår strenge kvalitetskontroller. Vi garanterer at du blir fornøyd.",
        href: "/veiledning/kvalitet",
      },
      {
        icon: "Wallet",
        title: "Konkurransedyktige priser",
        description:
          "Vi forhandler gode avtaler med våre leverandører, og sparer pengene dine.",
        href: "/produkter",
      },
      {
        icon: "RotateCcw",
        title: "Enkel retur",
        description:
          "30 dagers åpent kjøp på alle varer. Ingen spørsmål, bare enkel retur.",
        href: "/veiledning/retur",
      },
      {
        icon: "FileText",
        title: "Faktura og avtaler",
        description:
          "Fleksible betalingsløsninger tilpasset din bedrift. Faktura, abonnement eller direktebetaling.",
        href: "/kontakt",
      },
    ],
  },

  products: {
    eyebrow: "Våre produkter",
    title: "Populære produkter",
    description:
      "Utforsk vårt utvalg av kvalitetsprodukter – alltid til konkurransedyktige priser.",
    products: [
      {
        id: "produkt-1",
        name: "Produkt Alpha",
        slug: "produkt-alpha",
        description:
          "En kort beskrivelse av produktet og dets hovedfunksjoner. Perfekt for små og mellomstore bedrifter.",
        shortDescription: "Perfekt for små bedrifter",
        price: {
          amount: 1299,
          currency: "NOK",
          unit: "stk",
        },
        image: {
          src: "/placeholder.svg",
          alt: "Produkt Alpha",
        },
        features: ["Funksjon 1", "Funksjon 2", "Funksjon 3"],
        category: "Kategori 1",
        ctaLabel: "Se i nettbutikken",
        ctaHref: siteConfig.shopUrl + "/produkt-alpha",
      },
      {
        id: "produkt-2",
        name: "Produkt Beta",
        slug: "produkt-beta",
        description:
          "En annen fantastisk produkt med unike egenskaper som gjør hverdagen enklere.",
        shortDescription: "Vår bestselger",
        price: {
          amount: 2499,
          currency: "NOK",
          unit: "stk",
        },
        image: {
          src: "/placeholder.svg",
          alt: "Produkt Beta",
        },
        features: ["Premium kvalitet", "Lang levetid", "Garanti"],
        category: "Kategori 1",
        ctaLabel: "Se i nettbutikken",
        ctaHref: siteConfig.shopUrl + "/produkt-beta",
      },
      {
        id: "produkt-3",
        name: "Produkt Gamma",
        slug: "produkt-gamma",
        description:
          "Det ultimate valget for profesjonelle. Bygget for å vare.",
        shortDescription: "For profesjonelle",
        price: {
          amount: 4999,
          currency: "NOK",
          unit: "stk",
        },
        image: {
          src: "/placeholder.svg",
          alt: "Produkt Gamma",
        },
        features: [
          "Profesjonell kvalitet",
          "Utvidet garanti",
          "Prioritert støtte",
        ],
        category: "Kategori 2",
        ctaLabel: "Se i nettbutikken",
        ctaHref: siteConfig.shopUrl + "/produkt-gamma",
      },
    ],
    viewAllHref: "/produkter",
    viewAllLabel: "Se alle produkter",
  },

  testimonials: {
    title: "Det sier våre kunder",
    description: "Vi er stolte av tilliten våre kunder viser oss hver dag.",
    testimonials: [
      {
        quote:
          "Fantastisk service og kvalitetsprodukter. Vi har brukt dem i over 5 år og har aldri vært skuffet. Anbefales på det sterkeste!",
        author: {
          name: "Kari Nordmann",
          role: "Daglig leder",
          company: "Bedrift AS",
        },
        rating: 5,
      },
      {
        quote:
          "Rask levering og alltid god kommunikasjon. Det er tydelig at de bryr seg om kundene sine.",
        author: {
          name: "Ola Hansen",
          role: "Innkjøpssjef",
          company: "Firma AS",
        },
        rating: 5,
      },
      {
        quote:
          "Konkurransedyktige priser uten at det går utover kvaliteten. Vi har kuttet kostnader med 20% etter at vi byttet til dem.",
        author: {
          name: "Erik Larsen",
          role: "CFO",
          company: "Konsern AS",
        },
        rating: 5,
      },
    ],
  },

  stats: {
    title: "Tall som teller",
    stats: [
      {
        value: "14+",
        label: "År med erfaring",
        description: "Vi har vært i bransjen siden 2010",
      },
      {
        value: "500+",
        label: "Bedriftskunder",
        description: "Fornøyde kunder over hele Norge",
      },
      {
        value: "99%",
        label: "Kundetilfredshet",
        description: "Basert på kundeundersøkelser",
      },
      {
        value: "24t",
        label: "Leveringstid",
        description: "Gjennomsnittlig leveringstid",
      },
    ],
  },

  ctaBanner: {
    title: "Klar til å oppleve forskjellen?",
    description:
      "Besøk nettbutikken vår og oppdag hvorfor over 500 bedrifter velger oss som sin leverandør.",
    cta: {
      label: "Til nettbutikken",
      href: siteConfig.shopUrl,
      external: true,
    },
    secondaryCta: {
      label: "Kontakt oss først",
      href: "/kontakt",
    },
    variant: "primary",
  },
};
