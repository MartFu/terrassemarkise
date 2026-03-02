import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";

/* 

  Konfigurerbart innhold assosiert med <Footer> komponenten.

*/
export const FOOTER_CONTENT = {
  logo: "Terrassemarkise",
  tagline: "Skandinaviske terrassemarkiser for de øyeblikkene som betyr mest.",
  sections: [
    {
      title: "Produkter",
      links: [
        {
          label: "Palladio",
          href: SITE_URLS.AWNINGS + "palladio",
        },
        {
          label: "Corsica",
          href: SITE_URLS.AWNINGS + "corsica",
        },
        {
          label: "Jamaica",
          href: SITE_URLS.AWNINGS + "jamaica",
        },
        // { label: "Produkt XYZ", href: SITE_URLS.AWNINGS + "/produkt-xyz" }, <-- Legg enkelt til nye lenker i footer slik
      ],
    },
    {
      title: "Ressurser",
      links: [{ label: "Guider & tips", href: SITE_URLS.RESOURCES }],
    },
    {
      title: "Selskapet",
      links: [
        { label: "Om oss", href: SITE_URLS.ABOUT },
        { label: "Kontakt", href: SITE_URLS.CONTACT },
        { label: "Juridisk", href: SITE_URLS.LEGAL },
        // { label: "Prosjekter", href: "/prosjekter" }, <-- Legg enkelt til nye lenker i footer slik
      ],
    },
  ],

  parentCompany: {
    text: "En del av",
    name: "Solskjerming AS",
    href: EXTERNAL_URLS.MAIN_DOMAIN_BASE,
  },
  copyright: `© ${new Date().getFullYear()} Solskjerming AS. Alle rettigheter forbeholdt.`,
};
