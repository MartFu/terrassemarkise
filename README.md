This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Markdown-guide for rendereren som er brukt for å prosessere artikler (/juridisk og /ressurser/artikler)

En praktisk referanse for alt du kan bruke når du skriver innhold til denne rendererern.

---

## Overskrifter

```markdown
# H1 – Sidetittel

## H2 – Hovedseksjon

### H3 – Underseksjon

#### H4

##### H5

###### H6
```

Alle overskrifter får automatisk en klikkbar anker-lenke og kan brukes til navigasjon (f.eks. innholdsfortegnelse).

---

## Avsnitt og linjeskift

Vanlig tekst skrives som løpende avsnitt. Et tomt linjeskift lager nytt avsnitt.

```markdown
Dette er ett avsnitt.

Dette er et nytt avsnitt.
```

---

## Uthevinger

```markdown
**Fet tekst**
_Kursiv tekst_
~~Gjennomstreking~~
```

**Fet tekst** · _Kursiv tekst_ · ~~Gjennomstreking~~

---

## Lister

```markdown
- Punkt én
- Punkt to
  - Innrykket underpunkt
  - Enda ett

1. Første
2. Andre
3. Tredje
```

---

## Lenker

```markdown
[Lenketekst](https://eksempel.no)
```

Eksterne lenker (starter med `https://`) åpnes automatisk i ny fane og får et eksternt-ikon. Interne lenker kan fanges opp via `onLinkClick`-callback.

---

## Bilder

### Enkelt bilde

```markdown
![Alternativ tekst](url-til-bilde.webp)
![Alternativ tekst](bilde.jpg "Bildetekst vises under")
```

Støtter alle nettleser-native formater: **jpg, png, gif, svg, webp, avif**. Bildet vises med innlastingsindikator og feilvisning automatisk. Dersom `onImageClick` er satt, blir bildet klikkbart og viser et forstørr-ikon ved hover.

### Bildegrid (2–4 kolonner)

Wrap bilder i en `:::grid-N`-blokk for å vise dem side om side. Alle bilder i en grid har lik høyde (4:3-format med `object-cover`) og er klikkbare.

```markdown
:::grid-3
![Bilde 1](foto1.webp "Valgfri bildetekst")
![Bilde 2](foto2.jpg)
![Bilde 3](foto3.webp)
:::
```

```markdown
:::grid-2
![Før](before.jpg)
![Etter](after.jpg)
:::
```

> Bruk `grid-2` for sammenligninger, `grid-3` for gallerier og `grid-4` for tette oversikter.

---

## Callout-bokser

Fremhev viktig informasjon med en callout-blokk. Syntaksen er `:::callout[type]` … `:::`.

```markdown
:::callout[info]
Dette er generell informasjon leseren bør kjenne til.
:::

:::callout[tip]
Husk at minste tillatte bredde er projeksjon + 50 cm.
:::

:::callout[warning]
Kontroller at underlaget er solid nok før montering.
:::

:::callout[danger]
Viktig: Må ikke monteres uten jordet strømtilkobling.
:::

:::callout[note]
Teknisk merknad for mer erfarne brukere.
:::
```

### Tilgjengelige typer

| Type      | Ikon | Norsk label | Farve |
| --------- | ---- | ----------- | ----- |
| `info`    | ℹ️   | Info        | Blå   |
| `tip`     | 💡   | Tips        | Grønn |
| `warning` | ⚠️   | Advarsel    | Gul   |
| `danger`  | 🔴   | Viktig      | Rød   |
| `note`    | 📖   | Merk        | Lilla |

---

## Tabeller

```markdown
| Kolonne 1 | Kolonne 2 | Kolonne 3 |
| --------- | --------- | --------- |
| Verdi A   | Verdi B   | Verdi C   |
| Verdi D   | Verdi E   | Verdi F   |
```

---

## Sitat (blockquote)

```markdown
> Dette er et sitat eller en fremhevet tekst.
> Det kan gå over flere linjer.
```

---

## Kode

Inline kode bruker enkle backticks:

```markdown
Bruk `npm install` for å installere avhengigheter.
```

Kodeblokker bruker tre backticks med valgfritt språk:

````markdown
```javascript
const greeting = "Hei verden";
console.log(greeting);
```
````

---

## Skillelinje

```markdown
---
```

---

## Matematikk (KaTeX)

Aktiveres via `enableMath`-prop (standard: på).

```markdown
Inline: $E = mc^2$

Blokk:

$$
\frac{d}{dx}\left( \int_{a}^{x} f(u)\,du\right) = f(x)
$$
```

---

## Emoji

Aktiveres via `enableEmoji`-prop (standard: på).

```markdown
:white_check_mark: Ferdig
:warning: Advarsel
:bulb: Tips
```

---

## Raske regler å huske

- **Callout og grid** krever en tom linje _over_ åpningsfence-en (`:::`) for å tolkes korrekt.
- Bildestier kan være **relative** (`bilder/foto.webp`) hvis `baseUrl`-prop er satt, eller **absolutte** (`https://...`).
- Grid-bilder cropper til **4:3** med `object-cover` — bruk bilder med relevant motiv sentrert.
- `:::` som avslutning må stå på **sin egen linje** uten mellomrom foran.
