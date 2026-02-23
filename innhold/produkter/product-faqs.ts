import { FaqItem } from "../types";

export const GENERAL_PRODUCT_FAQS_SECTION_CONTENT: {
  title: string;
  description: string;
} = {
  title: "Ofte stilte spørsmål",
  description:
    "Vi får mange spørsmål om våre produkter. Her finner du noen svar på generelle spørsmål som omhandler flere eller alle produkter. Du kan finne spørsmål tilknyttet spesifikke produkter ved å trykke deg inn på de respektive produktsidene.",
};

// ============================================================================
// FAQS
// ============================================================================

export const GENERAL_PRODUCT_FAQS: FaqItem[] = [
  {
    question: "Er dukene gjennomfargede, og hvordan påvirkes de av solbleking?",
    answer:
      "Akrylduker av denne typen er gjennomfarget i fiberen, ikke overflatebehandlet, så de blekes ikke på samme måte som trykte stoffer. UV-stabiliteten er høy.",
  },
  {
    question: "Må man ta ned markisen på vinteren?",
    answer:
      "Det er ikke nødvendig, men anbefalt i områder med mye snø og is. En motorisert markise med vindsensor rulles alltid inn korrekt og reduserer risikoen for skade betraktelig. Kassettmarkisen beskytter duken også når den er ute i kjølig vær.",
  },
  {
    question: "Tåler markisene en “typisk” norsk sommerdag?",
    answer:
      "Markisene våre er testet for vindklasse 2 (opptil 38 km/h). Det betyr at den står støtt selv når det er friskt nok til at naboens plaststoler begynner å flytte på seg. Men husk: Er det for vindfullt for en god kopp kaffe, er det som regel best at markisen også får hvile i kassetten sin.",
  },
  {
    question: "Kan jeg montere markisen selv, eller må jeg ha fagfolk?",
    answer:
      "Våre markiser er konstruert for å være spesielt monteringsvennlige. Med våre steg-for-steg guider og videoer kan de fleste montere den selv. Er du usikker på veggen eller høyden, anbefaler vi likevel å ta en prat med oss eller en lokal montør.",
  },
  {
    question:
      "Tåler duken at det regner, eller må den inn med en gang det kommer en dråpe?",
    answer:
      "Duken er teflonbehandlet og tåler fint en sommerbyge. Så lenge markisen har nok helling (fall) slik at vannet renner av, kan du trygt sitte under den. Husk bare å rulle den ut for å tørke når regnet har gitt seg, så unngår du jordslag.",
  },
  {
    question:
      "Hva gjør jeg om det begynner å blåse kraftig når jeg ikke er hjemme?",
    answer:
      "Hvis du har valgt en motor med vindsensor, trenger du ikke gjøre noe som helst. Sensoren merker vibrasjonene i markisearmene og ruller den inn automatisk. Det er din beste forsikring mot uforutsett uvær.",
  },
];
