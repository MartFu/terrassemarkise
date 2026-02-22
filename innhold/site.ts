/**
 * Site-wide content and configuration
 * Central place for global content that appears across multiple pages
 */

import { SITE_URLS } from "@/lib/constants";
import type { NavItem, CompanyInfo, ContactInfo, CtaBanner } from "./types";

export const siteConfig = {
  name: "Firmanavn AS",
  url: "https://firmanavn.no",
  shopUrl: "https://shop.firmanavn.no",
  description:
    "Din pålitelige partner for [bransje]. Vi leverer kvalitetsprodukter og tjenester til bedrifter over hele Norge.",
};

export const navigation: NavItem[] = [
  {
    label: "Produkter",
    href: "/produkter",
    description: "Utforsk vårt utvalg av produkter",
  },
  {
    label: "Veiledning",
    href: "/veiledning",
    description: "Nyttige artikler og verktøy",
  },
  {
    label: "Om oss",
    href: "/om-oss",
    description: "Bli kjent med oss",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
    description: "Ta kontakt med oss",
  },
];

export const footerNavigation = {
  produkter: {
    title: "Produkter",
    links: [
      { label: "Alle produkter", href: SITE_URLS.PRODUCTS },
      { label: "Kategori 1", href: "/produkter?kategori=1" },
      { label: "Kategori 2", href: "/produkter?kategori=2" },
      { label: "Nettbutikk", href: siteConfig.shopUrl },
    ],
  },
  ressurser: {
    title: "Ressurser",
    links: [
      { label: "Veiledninger", href: SITE_URLS.RESOURCES },
      { label: "Verktøy", href: SITE_URLS.TOOLS },
    ],
  },
  selskap: {
    title: "Selskap",
    links: [
      { label: "Om oss", href: SITE_URLS.ABOUT },
      { label: "Kontakt oss", href: SITE_URLS.CONTACT },
      { label: "Karriere", href: "/om-oss#karriere" },
    ],
  },
  juridisk: {
    title: "Juridisk",
    links: [
      { label: "Personvern", href: "/juridisk/personvern" },
      { label: "Kjøpsvilkår", href: "/juridisk/kjopsvilkar" },
      { label: "Cookies", href: "/juridisk/cookies" },
    ],
  },
};

export const companyInfo: CompanyInfo = {
  name: "Firmanavn AS",
  tagline: "Kvalitet du kan stole på",
  description:
    "Vi har levert kvalitetsprodukter og tjenester til norske bedrifter siden 2010. Vår misjon er å gjøre hverdagen enklere for våre kunder gjennom pålitelige løsninger og førsteklasses kundeservice.",
  mission:
    "Å levere kvalitetsprodukter som gjør hverdagen enklere for våre kunder.",
  vision: "Å være Norges mest pålitelige leverandør innen vår bransje.",
  founded: "2010",
  location: "Oslo, Norge",
  values: [
    {
      icon: "Shield",
      title: "Pålitelighet",
      description: "Vi holder det vi lover og leverer alltid som avtalt.",
    },
    {
      icon: "Heart",
      title: "Kundefokus",
      description: "Kundens behov står alltid i sentrum for alt vi gjør.",
    },
    {
      icon: "Lightbulb",
      title: "Innovasjon",
      description:
        "Vi søker kontinuerlig etter bedre måter å løse utfordringer på.",
    },
    {
      icon: "Users",
      title: "Samarbeid",
      description:
        "Sammen med våre kunder og partnere skaper vi bedre resultater.",
    },
  ],
};

export const contactInfo: ContactInfo = {
  email: "post@firmanavn.no",
  phone: "+47 22 00 00 00",
  address: {
    street: "Eksempelgaten 1",
    postalCode: "0123",
    city: "Oslo",
    country: "Norge",
  },
  openingHours: "Mandag - Fredag: 08:00 - 16:00",
};

export const globalCtaBanner: CtaBanner = {
  title: "Klar til å komme i gang?",
  description:
    "Besøk nettbutikken vår eller ta kontakt for en uforpliktende samtale.",
  cta: {
    label: "Til nettbutikken",
    href: siteConfig.shopUrl,
    external: true,
  },
  secondaryCta: {
    label: "Kontakt oss",
    href: "/kontakt",
  },
  variant: "primary",
};

export const socialLinks = {
  facebook: "https://facebook.com/firmanavn",
  instagram: "https://instagram.com/firmanavn",
  linkedin: "https://linkedin.com/company/firmanavn",
};
