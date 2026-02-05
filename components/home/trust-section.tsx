import { Section } from "../ui/section";
import { Container } from "../ui/container";
import {
  Award,
  Clock,
  HeartHandshake,
  LucideIcon,
  Shield,
  Truck,
  Wrench,
} from "lucide-react";

export interface TrustSignal {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
}

export const TRUST_SIGNALS: TrustSignal[] = [
  {
    icon: Clock,
    title: "20+ års erfaring",
    description:
      "Vi har levert kvalitetssolskjerming til norske hjem siden 2003",
    stat: "20+",
  },
  {
    icon: Shield,
    title: "5 års garanti",
    description: "Trygghet med lang garanti på alle våre produkter",
    stat: "5 år",
  },
  {
    icon: HeartHandshake,
    title: "Gratis rådgivning",
    description:
      "Få personlig veiledning fra våre eksperter uten forpliktelser",
  },
  {
    icon: Award,
    title: "Premium kvalitet",
    description: "Kun førsteklasses materialer og teflonbehandlet akrylduk",
  },
  {
    icon: Wrench,
    title: "Profesjonell montering",
    description: "Våre sertifiserte montører sikrer perfekt installasjon",
  },
  {
    icon: Truck,
    title: "Levering i hele Norge",
    description: "Vi leverer og monterer over hele landet",
  },
];

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  product?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Erik Hansen",
    location: "Oslo",
    text: "Fantastisk service fra start til slutt. Palladio-markisen har forvandlet terrassen vår til et ekte uterom. Kvaliteten er upåklagelig.",
    rating: 5,
    product: "Palladio",
  },
  {
    name: "Maria Olsen",
    location: "Bergen",
    text: "Etter mye research valgte vi Jamaica med nedsenkbar frontkappe. Perfekt for de vindfulle dagene vi har her på Vestlandet.",
    rating: 5,
    product: "Jamaica",
  },
  {
    name: "Thomas Andersen",
    location: "Trondheim",
    text: "Tredje sommeren med Corsica-markisen og den er like fin som ny. Kassetten holder duken beskyttet hele vinteren.",
    rating: 5,
    product: "Corsica",
  },
];

export function TrustSection() {
  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Hvorfor velge oss?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Over to tiår med erfaring har lært oss hva som skaper fornøyde
            kunder.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal.title}
              className="group rounded-lg border border-accent/40 bg-accent/40 p-6 transition-colors"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <signal.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
