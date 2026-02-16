// app/produkter/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Ruler,
  Droplets,
  Wind,
  Sun,
  Download,
  Heart,
  Share2,
  Shield,
  Clock,
  Home,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "../ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Fetch product data based on slug
  return {
    title: `Terrasse Markise K70 | Solskjerming AS`,
    description: "Kassettmarkise med integrert LED-belysning",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // This would normally be fetched from a CMS or database
  const product = {
    name: "Terrasse Markise K70",
    tagline: "Kassettmarkise med integrert LED-belysning",
    price: "fra 12.990,-",
    description:
      "En komplett markiseløsning for deg som ønsker maksimal utnyttelse av terrassen. Med innebygget LED-belysning og solcellemotor er dette vårt mest populære valg for den moderne boligen.",
    features: [
      "Solcellemotor med fjernkontroll",
      "Integrert LED-list (3000K varmhvitt)",
      "Akrylduk i 200+ RAL-farger",
      "Vindtester opp til 80 km/t",
      "10 års garanti på motor og mekanikk",
      "5 års garanti på duk",
    ],
    specifications: {
      Bredde: "Opptil 600 cm",
      Utslag: "250 cm / 300 cm",
      Vekt: "Fra 45 kg",
      Falldemping: "Ja, manuell krank",
      Belysning: "LED 12V, dimbar",
      Styring: "RF-fjernkontroll / App",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Hjem
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/produkter" className="hover:text-foreground">
              Produkter
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column - Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              {/* Placeholder for actual image */}
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">Produktbilde</span>
              </div>

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  Mest populær
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/80 backdrop-blur"
                >
                  <Award className="mr-1 h-3.5 w-3.5" />
                  Best i test 2024
                </Badge>
              </div>

              {/* Actions */}
              <div className="absolute right-4 top-4 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 bg-background/80 backdrop-blur"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 bg-background/80 backdrop-blur"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border bg-muted transition-colors hover:border-primary"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Bilde {i}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Product info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Heading level="h1" className="text-3xl font-bold lg:text-4xl">
                {product.name}
              </Heading>
              <p className="mt-3 text-lg text-muted-foreground">
                {product.tagline}
              </p>
            </div>

            {/* Key specs in cards */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Ruler className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Bredde</span>
                  <span className="text-sm font-semibold">600 cm</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Droplets className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Vanntett</span>
                  <span className="text-sm font-semibold">Ja, klasse 4</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Wind className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Vindtest</span>
                  <span className="text-sm font-semibold">80 km/t</span>
                </CardContent>
              </Card>
            </div>

            {/* Price & CTA */}
            <div className="rounded-lg border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Veiledende pris fra
                  </span>
                  <span className="ml-2 font-heading text-3xl font-bold text-foreground">
                    {product.price}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    inkl. mva. Montering kommer i tillegg.
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="lg" className="gap-2" asChild>
                    <Link href="/konfigurer">Konfigurer</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/befaring">Be om befaring</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Key features */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold">Egenskaper</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty badges */}
            <div className="flex flex-wrap gap-4 border-t pt-6">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block text-xs font-medium">
                    10 års garanti
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Motor & mekanikk
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block text-xs font-medium">
                    Levering 2-3 uker
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Etter målbestilling
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block text-xs font-medium">
                    Fri hjemlevering
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Over hele Norge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed tabs */}
        <div className="mt-24">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent">
              <TabsTrigger
                value="specs"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Spesifikasjoner
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Montering
              </TabsTrigger>
              <TabsTrigger
                value="warranty"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Garanti
              </TabsTrigger>
              <TabsTrigger
                value="downloads"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Nedlastinger
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="pt-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="font-heading text-lg font-semibold">
                    Tekniske spesifikasjoner
                  </h4>
                  <dl className="mt-6 space-y-4">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b pb-2"
                        >
                          <dt className="text-sm text-muted-foreground">
                            {key}
                          </dt>
                          <dd className="text-sm font-medium">{value}</dd>
                        </div>
                      ),
                    )}
                  </dl>
                </div>
                <div className="rounded-lg bg-muted/50 p-6">
                  <h4 className="font-heading text-lg font-semibold">
                    Dokumentasjon
                  </h4>
                  <div className="mt-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      asChild
                    >
                      <Link href="/docs/k70-tegninger.pdf">
                        <Download className="h-4 w-4" />
                        Tegninger (PDF)
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      asChild
                    >
                      <Link href="/docs/k70-montering.pdf">
                        <Download className="h-4 w-4" />
                        Monteringsanvisning (PDF)
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="pt-8">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Profesjonell montering utføres av våre sertifiserte montører.
                  Vi kommer hjem til deg med alt nødvendig verktøy og utstyr.
                </p>
                <ul className="mt-4">
                  <li>Befaring inkludert i prisen</li>
                  <li>Montering tar 2-4 timer avhengig av kompleksitet</li>
                  <li>
                    Rengjøring og gjennomgang av funksjoner etter montering
                  </li>
                  <li>5 års monteringsgaranti</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="pt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <Shield className="mb-4 h-8 w-8 text-primary" />
                    <h5 className="font-heading text-lg font-semibold">
                      10 års garanti
                    </h5>
                    <p className="mt-2 text-sm text-muted-foreground">
                      På motor, fjernkontroll og mekaniske komponenter.
                      Garantien dekker produksjonsfeil og funksjonssvikt.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Sun className="mb-4 h-8 w-8 text-primary" />
                    <h5 className="font-heading text-lg font-semibold">
                      5 års dukgaranti
                    </h5>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Mot falming og materialfeil. Akrylduken er UV-stabilisert
                      og fargeekte.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="pt-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Produktark",
                  "Teknisk tegning",
                  "Monteringsveiledning",
                  "Fargekart",
                  "Bruksanvisning",
                  "FDV-dokumentasjon",
                ].map((doc) => (
                  <Button
                    key={doc}
                    variant="outline"
                    className="h-auto justify-start gap-3 py-4"
                    asChild
                  >
                    <Link href="#">
                      <Download className="h-4 w-4 shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{doc}</span>
                        <span className="text-xs text-muted-foreground">
                          PDF, 2.4 MB
                        </span>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
