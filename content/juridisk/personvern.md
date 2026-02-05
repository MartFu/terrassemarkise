# Personvern

Write a prompt to have an ai create the entire website in typesafe nextjs. The purpose of the website is to:

1. present 3 terrace awnings (see attached files)
2. funnel traffic to our shop (a constant should be used for the href)
3. build trust with customers and potential customers
4. lead

pages:
juridisk/page.tsx
juridisk/[slug]/page.tsx
veiledning/page.tsx
veiledning/[slug]/page.tsx
produkter/page.tsx
produkter/[slug]/page.tsx
kontakt/page.tsx
om-oss/page.tsx
/page.tsx

The website and layout should feel very modern (think award winning websites). No excessive hover effects. It should feel modern and thought out.

Reqs:
Display language: Norwegian Bokmål
Shadcn is available to you
Use tailwindcss (you may only use colors associated with shadcn, e.g. bg-background - no hardcoded colors such as bg-blue-500)
All sections should be in our custom <Section> and <Container> (do not create these - simply reference them)
Text content should be configurable from an object such as in the following example for the business' conveinience:

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
