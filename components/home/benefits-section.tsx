import { Check, Sun, Droplets, Wind, Thermometer } from "lucide-react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";

const benefits = [
  {
    icon: Sun,
    title: "Beskyttelse mot sol",
    description:
      "Reduser temperaturen på terrassen med inntil 15°C og beskytt møbler mot bleking.",
  },
  {
    icon: Droplets,
    title: "Vannavstøtende",
    description:
      "Teflonbehandlet akrylduk som beskytter mot lette regnskyll og morgendugg.",
  },
  {
    icon: Wind,
    title: "Vindbestandig",
    description:
      "Robuste armer og solid konstruksjon som tåler norsk vær og vind.",
  },
  {
    icon: Thermometer,
    title: "Energibesparende",
    description:
      "Reduserer varmeinnstråling og kan redusere energiforbruk til nedkjøling.",
  },
];

const features = [
  "Forleng utesesongen med flere uker",
  "Øk verdien på eiendommen din",
  "Skap et ekstra rom utendørs",
  "Nyt utelivet uten sjenerende sol",
];

export function BenefitsSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Fordeler
            </p>
            <h2 className="mt-3 text-xl md:text-2xl font-semibold">
              Mer enn bare skygge
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              En terrassemarkise er en investering i livskvalitet. Opplev
              hvordan riktig solskjerming kan forvandle uterommet ditt.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Benefit cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <benefit.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
