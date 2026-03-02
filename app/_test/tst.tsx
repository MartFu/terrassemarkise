// ─── Hero ─────────────────────────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/innhold/produkter/catalog";
import { Product } from "@/lib/products/types";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  Award,
  Box,
  Check,
  Droplets,
  Ruler,
  Shield,
  Sun,
  Truck,
  Wifi,
  WifiOff,
  Wind,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Terrassemarkiser med
              <span className="text-primary block mt-2">
                ærlige priser og åpenhet
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Velg mellom tre kvalitetsmodeller – alle med pulverlakkert
              aluminium, teflonbehandlet duk og 5 års garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base">
                Se våre modeller
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Kontakt oss for veiledning
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ærlige priser</h3>
              <p className="text-sm text-muted-foreground">
                Ingen skjulte kostnader eller pressende salgstaktikker. Prisene
                er som de er.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Levering 4-7 uker</h3>
              <p className="text-sm text-muted-foreground">
                Rask og pålitelig levering fra vårt lager på Kråkerøy i
                Fredrikstad.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">5 års garanti</h3>
              <p className="text-sm text-muted-foreground">
                Kvalitetsprodukter du kan stole på, med lang garanti som
                trygghet.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Vindtestet</h3>
              <p className="text-sm text-muted-foreground">
                Sertifisert etter EN13561:2004+A1:2015 for trygg bruk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Våre terrassemarkiser
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tre modeller å velge mellom – fra enkel og fleksibel til eksklusiv
              med full kassett
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Tekniske spesifikasjoner
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Mål og dimensjoner</h3>
                    <p className="text-muted-foreground">
                      Maks bredde: 700 cm · Maks utfall: 360 cm · Fallvinkel:
                      5-50°
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sun className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Konstruksjon</h3>
                    <p className="text-muted-foreground">
                      Pulverlakkert aluminium (Qualicoat-sertifisert) ·
                      Teflonbehandlet akrylduk
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wind className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Vindtoleranse</h3>
                    <p className="text-muted-foreground">
                      Sertifisert til 8 m/s ved maks mål · Mindre
                      konfigurasjoner tåler betydelig mer
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border">
              <h3 className="text-xl font-semibold mb-4">
                Viktig om montering
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Veggbraketter: 20 cm høye, 6 cm brede · 3 skruer per brakett
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Må treffe bærende konstruksjon – ikke bare panel og lekter
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Maks 60 cm fra ende til første brakett</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Anbefalt fall: 15° for best avrenning og dukstramming
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Terrassemarkiser leveres uten festemateriell. Kontakt oss for
                veiledning om riktig oppheng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Colors & Finishes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Konstruksjonsfarger</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alle modeller fås i flere RAL-farger uten pristillegg. Palladio
              også i sort. Pulverlakkeringen er Qualicoat-sertifisert for
              maksimal holdbarhet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {["Hvit", "Grå", "Antrasitt", "Brun", "Sort (Palladio)"].map(
              (color, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`h-16 w-16 rounded-full mx-auto mb-2 ${
                      i === 0
                        ? "bg-gray-100"
                        : i === 1
                          ? "bg-gray-400"
                          : i === 2
                            ? "bg-gray-800"
                            : i === 3
                              ? "bg-amber-800"
                              : "bg-black"
                    }`}
                  />
                  <span className="text-sm">{color}</span>
                </div>
              ),
            )}
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Hva er Qualicoat?</h3>
            <p className="text-sm text-muted-foreground">
              En internasjonal kvalitetsstandard for pulverlakkering som sikrer
              høy motstandsdyktighet mot vær, UV-stråling, korrosjon og mekanisk
              slitasje. Gir lengre levetid og mindre risiko for fargebleking
              eller avskalling.
            </p>
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vedlikehold for lengre levetid
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Spesielt viktig for markiser uten kassett (Jamaica). Duken
              påvirkes av støv, pollen og vær.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Uten kassett/toppdeksel</h3>
                <p className="text-sm text-muted-foreground">
                  Børst av de første 30 cm av duken minst 2 ganger i året. Vask
                  duken 1-2 ganger årlig.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Med kassett (Palladio/Corsica)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Duken beskyttes når den er rullet inn. Mindre vedlikehold,
                  lengre levetid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Klar for å skaffe ny terrassemarkise?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Vi hjelper deg med valg av modell, farge og riktig montering.
              Ingen press, bare ærlig veiledning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base">
                Se priser og modeller
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Kontakt oss
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Om Solskjerming AS
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Solskjerming AS ble startet i 2013 av Håkon Renskoug, etter en
                frustrerende opplevelse med en bransje preget av uærlige priser
                og pressende salgstaktikker. I dag driver vi med kontorer og
                lager på Kråkerøy i Fredrikstad, med et klart mål: åpenhet og
                ærlighet rundt pris.
              </p>
              <p className="mt-4">
                Med bygg- og maskiningeniører i teamet jobber vi tett med
                arkitekter og håndverkere, og kan gi deg detaljert informasjon
                om alt fra sikker innfesting til hvordan ulike duker påvirker
                inneklimaet. Vi er tilgjengelige på telefon og mail – før, under
                og etter montering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cassette":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-1">{product.name}</CardTitle>
            <CardDescription className="text-base">
              {product.tagline}
            </CardDescription>
          </div>
          <Badge variant="outline" className={getTierColor(product.type)}>
            {product.typeLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Image placeholder - would be replaced with actual image */}
        <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center text-muted-foreground">
          [Produktbilde: {product.name}]
        </div>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
          {product.description}
        </p>

        {/* Key specs */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="h-4 w-4 text-primary" />
            <span>
              Maks bredde: {product.maxWidth} cm · Utfall:{" "}
              {product.maxProjection} cm
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {product.hasCassette ? (
              <Box className="h-4 w-4 text-primary" />
            ) : (
              <Droplets className="h-4 w-4 text-primary" />
            )}
            <span>
              {product.hasCassette
                ? "Lukket kassett - full beskyttelse"
                : product.hasTopCover
                  ? "Toppdeksel tilgjengelig"
                  : "Åpen konstruksjon"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Sun className="h-4 w-4 text-primary" />
            <span>
              {product.constructionColors} konstruksjonsfarger ·{" "}
              {product.fabricOptions} duker
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {product.motorOptions.some((m) => m.type === "wireless") ? (
              <Wifi className="h-4 w-4 text-primary" />
            ) : (
              <WifiOff className="h-4 w-4 text-primary" />
            )}
            <span>
              {product.motorOptions.length > 1
                ? `${product.motorOptions.length} motoralternativer`
                : "Inkludert Somfy IO-motor"}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          {product.highlights.slice(0, 3).map((highlight, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Fra</span>
            <span className="text-2xl font-bold ml-2">
              {formatPrice(product.priceFrom)}
            </span>
          </div>
          <Badge variant="secondary">{product.windRating}</Badge>
        </div>

        <Button className="w-full group">
          Se {product.name}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
