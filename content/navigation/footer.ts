import type { FooterProps } from "@/types";

/* 

  Konfigurerbart innhold assosiert med <Footer> komponenten.

*/
export const FOOTER_CONTENT: FooterProps = {
  brandSection: {
    title: "Solskjerming AS",
    description:
      "Din komplette guide til terrassemarkiser. Vi hjelper deg med å finne den perfekte løsningen for ditt uterom.",

    /* 
    
    Brand kan defineres med følgende props
     - logo (src) - string
     - href - string
     - ariaLabel - string
    */
    brand: undefined,
  },
  navigation: {
    products: [
      {
        title: "Corsica",
        href: "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming/markiser/terrassemarkiser/corsica",
      },
      {
        title: "Palladio",
        href: "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming/markiser/terrassemarkiser/palladio",
      },
      {
        title: "Jamaica",
        href: "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming/markiser/terrassemarkiser/jamaica",
      },
    ],
    resources: [
      { title: "Monteringsveiledning", href: "/veiledning" },
      { title: "Inspirasjon", href: "/inspirasjon" },
      { title: "Ofte stilte spørsmål", href: "/veiledning#faq" },
    ],
    contact: [
      {
        title: "Kundeservice",
        href: "https://www.solskjerming-as.no/kundeservice/kontaktoss",
      },
      {
        title: "Om oss",
        href: "https://www.solskjerming-as.no/kundeservice/om-solskjerming-as",
      },
    ],
  },

  legal: [
    {
      title: "Personvern",
      href: "juridisk/personvern",
    },
    {
      title: "Betingelser",
      href: "juridisk/betingelser",
    },
  ],
};
