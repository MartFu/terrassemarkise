import { COMPANY_INFO } from "@/content/company";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Configuration object
export const CONTACT_PAGE_CONTENT = {
  hero: {
    title: "Kontakt oss",
    subtitle: "Få profesjonell rådgivning om terrassemarkiser",
    description:
      "Våre eksperter hjelper deg med å finne den perfekte markisen for ditt uterom. Vi tilbyr gratis befaring og skreddersydde løsninger.",
  },
  contactMethods: {
    title: "Kontaktinformasjon",
    items: [
      {
        icon: Phone,
        title: "Telefon",
        content: COMPANY_INFO.phone,
        subtitle: COMPANY_INFO.hours,
        action: { label: "Ring oss", href: `tel:${COMPANY_INFO.phone}` },
      },
      {
        icon: Mail,
        title: "E-post",
        content: COMPANY_INFO.email,
        subtitle: "Svar innen 24 timer",
        action: {
          label: "Send e-post",
          href: `mailto:${COMPANY_INFO.email}}`,
        },
      },
      {
        icon: MapPin,
        title: "Besøksadresse",
        content: COMPANY_INFO.address,
        subtitle: COMPANY_INFO.zip,
        action: { label: "Se på kart", href: "https://maps.google.com" },
      },
      {
        icon: Clock,
        title: "Åpningstider",
        content: COMPANY_INFO.days,
        subtitle: COMPANY_INFO.hours,
        action: { label: "Bestill befaring", href: "#kontaktskjema" },
      },
    ],
  },
  contactForm: {
    title: "Send oss en melding",
    description:
      "Fyll ut skjemaet under, så tar vi kontakt med deg innen kort tid.",
    fields: {
      name: { label: "Fullt navn", placeholder: "Ola Nordmann" },
      email: { label: "E-post", placeholder: "ola@eksempel.no" },
      phone: { label: "Telefon", placeholder: "123 45 678" },
      subject: { label: "Hva gjelder henvendelsen?", placeholder: "Velg emne" },
      message: {
        label: "Melding",
        placeholder: "Beskriv hva du trenger hjelp til...",
      },
      submit: { label: "Send melding" },
    },
    subjects: [
      "Spørsmål om produkt",
      "Befaring og måling",
      "Prisforespørsel",
      "Reparasjon/service",
      "Annet",
    ],
  },
  benefits: {
    title: "Hvorfor velge oss?",
    items: [
      "Gratis befaring og rådgivning",
      "10 års garanti på alle markiser",
      "Montering av sertifiserte fagfolk",
      "Rask levering fra lager",
    ],
  },
  areas: {
    title: "Vi dekker hele Norge",
    description:
      "Fra Oslo til Færøyene - vi finner en løsning som passer akkurat deg.",
    note: "Befaringer og montering i Oslo, Akershus, Buskerud, Østfold og Vestfold.",
  },
};
