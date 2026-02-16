import { GalleryImage } from "@/types/gallery";
import { FaqItem } from "../types";

interface ProductHighlight {
  label: string;
  value: string;
}

interface ProductImage extends GalleryImage {
  featured?: boolean;
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  strengths: string[];
  specs: ProductSpecItem[];
  images: ProductImage[];
  faqs: FaqItem[];
  highlights: ProductHighlight[];
  price: string;
  body: string;
}

export const productsPageContent = {
  title: "Eksklusive terrassemarkiser for norske forhold",
  subtitle:
    "Tre unike modeller utviklet for å maksimere din utetid – uansett vær.",
};

export const productFaqContent = [
  {
    question:
      "Hva er fordelen med en kassettmarkise som Palladio eller Corsica?",
    answer:
      "I det norske klimaet er en kassettmarkise en smart investering. Når markisen er rullet inn, ligger duken og de mekaniske armene fullstendig beskyttet inne i en aluminiumskassett. Dette hindrer at støv, pollen og fuktighet tærer på materialene gjennom vinteren, noe som forlenger markisens levetid betraktelig.",
  },
  {
    question: "Hvor mye vind tåler en terrassemarkise?",
    answer:
      "Våre markiser er robuste, men som alle utkragede konstruksjoner har de sine begrensninger. Ved sterk vind eller kastevinder bør markisen rulles inn. Vi anbefaler alltid å kombinere markisen med en Somfy vindsensor; da ruller markisen seg inn automatisk hvis det blåser opp, selv om du ikke er hjemme.",
  },
  {
    question:
      "Hvorfor bør jeg velge nedsenkbar frontkappe på Jamaica-modellen?",
    answer:
      "Dette er vår mest populære funksjon for hus med vestvendt terrasse. Den nedsenkbare kappen fungerer som en vertikal levegg som du kan justere trinnløst ned. Den stopper den lave kveldssola som ellers kommer snikende under markisen, samtidig som den gir ekstra skjerming mot innsyn og trekk.",
  },
  {
    question: "Kan jeg montere markisen selv?",
    answer:
      "Markisene våre er konstruert for enkel montering på både vegg og i tak. Det følger med detaljerte monteringsanvisninger. Likevel er dette tunge kvalitetsprodukter (opptil 7 meter brede), så vi anbefaler at man er minst to personer under monteringen, eller at man benytter seg av profesjonelle montører for å sikre korrekt innfesting i husveggen.",
  },
  {
    question: "Tåler markisene det norske regnværet?",
    answer:
      "Ja, absolutt. Alle våre modeller, fra Jamaica til Corsica, leveres med en duk i 100 % teflonbehandlet akryl. Dette gjør duken ekstremt vannavstøtende. Så lenge markisen har nok fallvinkel (vi anbefaler minst 15 grader for optimal avrenning), kan du trygt sitte ute og nyte lyden av regnet mens du forblir helt tørr.",
  },
  {
    question: "Hva betyr det at duken er teflonbehandlet?",
    answer:
      "Teflonbehandlingen fungerer som et beskyttende skjold rundt hver enkelt fiber i duken. Det gjør at skitt, pollen og vann ikke trekker inn i stoffet, men legger seg på utsiden. Dette gjør markisen svært enkel å holde ren – ofte holder det med en lett spyling med hageslangen.",
  },
];

export const products: Product[] = [
  {
    name: "Jamaica – Fleksibilitet for den lave kveldssola",
    slug: "jamaica-terrassemarkise",
    tagline: "Skap et lunt fristed som tåler både vind og sol.",
    description:
      "Jamaica er den robuste arbeidshesten i vårt sortiment. Denne terrassemarkisen er spesialtilpasset norske hager hvor den lave kveldssola ofte kan være sjenerende. Ved å velge nedsenkbar frontkappe forvandler du uteplassen til et skjermet og koselig uterom der kaffekoppen kan nytes uforstyrret.",
    features: [
      "Trinnløs justering av nedsenkbar frontkappe (volant)",
      "Kraftige bæreprofiler for økt stabilitet",
      "Mulighet for integrert toppdeksel som beskytter duken mot smuss",
      "Støttestag for ekstra vindutsatte områder",
    ],
    strengths: [
      "Optimal skjerming mot lav sol med nedsenkbar frontkappe",
      "Robust konstruksjon testet for nordisk klima",
      "Vannavstøtende teflon-duk som preller av lett regn",
      "Allsidig montering på både vegg og i tak",
    ],
    specs: [
      { label: "Type", value: "Kassettmarkise" },
      { label: "Maks bredde", value: "600 cm" },
      { label: "Maks utfall", value: "350 cm" },
      { label: "Kassett", value: "Heldekkende aluminium" },
      { label: "Duk", value: "Spunduk, UV-beskyttet, 200+ farger" },
      { label: "Motor", value: "Somfy RTS fjernkontroll" },
      { label: "Vindklasse", value: "Klasse 2 (38 km/t)" },
      { label: "Garanti konstruksjon", value: "10 år" },
      { label: "Garanti duk", value: "5 år" },
      { label: "Vekt", value: "Ca. 35-50 kg avhengig av bredde" },
    ],
    images: [
      {
        id: "corsica-image-1",
        src: "/assets/product-images/corsica_illustration.jpg",
        alt: "Corsicas sterke sider",
        featured: true,
      },
      {
        id: "corsica-image-2",
        src: "/assets/product-images/corsica_profile.png",
        alt: "Corsica Teknisk Profil",
      },
      {
        id: "corsica-image-3",
        src: "/assets/product-images/corsica_index_image.png",
        alt: "Corsica",
      },
    ],
    highlights: [
      {
        label: "BREDDE",
        value: "Opp til 700 cm",
      },
      {
        label: "UTFALL",
        value: "Opp til 360 cm",
      },
      {
        label: "GARANTI",
        value: "5 år",
      },
      {
        label: "LEVERINGSTID",
        value: "4-7 uker",
      },
    ],
    faqs: productFaqContent,
    price: "Fra kr 14 900,-",
    body: "Jamaica kombinerer styrke med eleganse. Den nedsenkbare kappen gjør den unik for norske sommerforhold.",
  },
  {
    name: "Palladio – Vedlikeholdsfri eleganse i helkassett",
    slug: "palladio-terrassemarkise",
    tagline:
      "Beskytt investeringen din med markedets flotteste kassettløsning.",
    description:
      "For deg som ønsker et stilrent uttrykk og minimalt vedlikehold. Palladio er en helkassett-markise som skjuler både duk og mekanikk fullstendig når den er rullet inn. Dette beskytter mot støv, pollen og det tøffe norske vinterværet, slik at markisen din ser ny ut år etter år.",
    features: [
      "Velg fra over 30 dukalternativer for det perfekte utseendet",
      "Fullstendig lukket aluminiumskassett",
      "Selvrensende effekt da børster i kassetten fjerner støv ved innrulling",
      "Integrert vannrenne i frontprofilen for kontrollert avrenning",
      "Skjulte festebraketter for et sømløst design",
    ],
    strengths: [
      "Maksimal beskyttelse av duken mot alle typer nedbør",
      "Moderne design som smelter inn i husets arkitektur",
      "Stor fleksibilitet med fallvinkel opp til 50 grader",
      "Premium styringssystemer fra Somfy",
    ],
    specs: [
      { label: "Type", value: "Kassettmarkise" },
      { label: "Maks bredde", value: "600 cm" },
      { label: "Maks utfall", value: "350 cm" },
      { label: "Kassett", value: "Heldekkende aluminium" },
      { label: "Duk", value: "Spunduk, UV-beskyttet, 200+ farger" },
      { label: "Motor", value: "Somfy RTS fjernkontroll" },
      { label: "Vindklasse", value: "Klasse 2 (38 km/t)" },
      { label: "Garanti konstruksjon", value: "10 år" },
      { label: "Garanti duk", value: "5 år" },
      { label: "Vekt", value: "Ca. 35-50 kg avhengig av bredde" },
    ],
    images: [
      {
        id: "palladio-image-1",
        src: "/assets/product-images/corsica_illustration.jpg",
        alt: "Palladios sterke sider",
        featured: true,
      },
      {
        id: "palladio-image-2",
        src: "/assets/product-images/palladio_profile.png",
        alt: "Palladio Teknisk Profil",
      },
      {
        id: "palladio-image-3",
        src: "/assets/product-images/palladio_index_image.png",
        alt: "Palladio",
      },
      {
        id: "jamaica-image-1",
        src: "/assets/product-images/corsica_index_image.png",
        alt: "Jamaicas sterke sider",
        featured: true,
      },
      {
        id: "jamaica-image-2",
        src: "/assets/product-images/jamaica_profile.png",
        alt: "Jamaica Teknisk Profil",
      },
      {
        id: "jamaica-image-3",
        src: "/assets/product-images/jamaica_index_image.png",
        alt: "Jamaica",
      },
    ],
    highlights: [
      {
        label: "BREDDE",
        value: "Opp til 700 cm",
      },
      {
        label: "UTFALL",
        value: "Opp til 360 cm",
      },
      {
        label: "GARANTI",
        value: "5 år",
      },
      {
        label: "LEVERINGSTID",
        value: "4-7 uker",
      },
    ],
    faqs: productFaqContent,
    price: "Fra kr 19 500,-",
    body: "Palladio er valget for den kvalitetsbevisste huseieren som ønsker en diskret og holdbar solskjerming.",
  },
  {
    name: "Corsica – Designperlen med integrert LED",
    slug: "corsica-terrassemarkise",
    tagline: "Gjør uteplassen til et eksklusivt uterom, dag som natt.",
    description:
      "Corsica er mer enn bare solskjerming; det er kronen på verket for din uteplass. Denne robuste kassettmarkisen gir deg følelsen av en eksklusiv utestue. Med en vannavstøtende duk av høyeste kvalitet og et moderne formspråk, kan dere sitte ute og høre på regnet mens dere forblir varme og tørre under duken.",
    features: [
      "Designer-kassett med minimalistiske linjer",
      "Mulighet for integrert LED-belysning i armene",
      "Dobbel wire-teknologi i leddarmene for ekstrem dukstramming",
      "Forsterkede profiler for store spenn",
    ],
    strengths: [
      "Eksklusivt utseende som løfter boligens estetikk",
      "Overlegen vannavstøting takket være teflon-teknologi",
      "Enkel justering av vinkel for optimal komfort",
      "Støtter full smarthus-integrasjon",
    ],
    specs: [
      { label: "Type", value: "Kassettmarkise" },
      { label: "Maks bredde", value: "600 cm" },
      { label: "Maks utfall", value: "350 cm" },
      { label: "Kassett", value: "Heldekkende aluminium" },
      { label: "Duk", value: "Spunduk, UV-beskyttet, 200+ farger" },
      { label: "Motor", value: "Somfy RTS fjernkontroll" },
      { label: "Vindklasse", value: "Klasse 2 (38 km/t)" },
      { label: "Garanti konstruksjon", value: "10 år" },
      { label: "Garanti duk", value: "5 år" },
      { label: "Vekt", value: "Ca. 35-50 kg avhengig av bredde" },
    ],
    images: [
      {
        id: "jamaica-image-1",
        src: "/assets/product-images/jamaica_illustration.jpg",
        alt: "Jamaicas sterke sider",
        featured: true,
      },
      {
        id: "jamaica-image-2",
        src: "/assets/product-images/jamaica_profile.png",
        alt: "Jamaica Teknisk Profil",
      },
      {
        id: "jamaica-image-3",
        src: "/assets/product-images/jamaica_index_image.png",
        alt: "Jamaica",
      },
    ],
    highlights: [
      {
        label: "BREDDE",
        value: "Opp til 700 cm",
      },
      {
        label: "UTFALL",
        value: "Opp til 360 cm",
      },
      {
        label: "GARANTI",
        value: "5 år",
      },
      {
        label: "LEVERINGSTID",
        value: "4-7 uker",
      },
    ],
    faqs: productFaqContent,
    price: "Fra kr 22 900,-",
    body: "Corsica redefinerer hva en markise kan være, med fokus på detaljer, lyssetting og langvarig bruksglede.",
  },
];
