"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { CreaseBox } from "@/components/ui/crease";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stack } from "@/components/ui/stack";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CONTACT_METHODS = [
  {
    id: "telefon",
    label: "Telefon",
    value: "+47 69 00 00 00",
    note: "Man-fre, 08-16",
    href: "tel:+4769000000",
  },
  {
    id: "epost",
    label: "E-post",
    value: "post@terrassemarkise.no",
    note: "Svar innen én arbeidsdag",
    href: "mailto:post@terrassemarkise.no",
  },
  {
    id: "adresse",
    label: "Adresse",
    value: "Kråkerøy, Fredrikstad",
    note: "Kontor og lager — ikke utsalg",
    href: null,
  },
];

const WHY_ITEMS = [
  {
    n: "01",
    heading: "Faste priser — ingen selgere",
    body: "Alle priser er synlige i nettbutikken. Du vet hva ting koster før du tar kontakt.",
  },
  {
    n: "02",
    heading: "Ingeniører, ikke selgere",
    body: "Bygg- og maskiningeniører besvarer spørsmålene dine. Vi forstår innfesting, korrosjon og dimensjonering.",
  },
  {
    n: "03",
    heading: "Du monterer selv — vi hjelper",
    body: "Din kontaktperson har montert hundrevis av det samme produktet du skal sette opp. Bruk oss fritt.",
  },
  {
    n: "04",
    heading: "Støtte hele veien",
    body: "Spør oss om stort og smått — før bestilling, underveis i montering, eller år etterpå.",
  },
];

// ─── Contact Methods Strip ────────────────────────────────────────────────────

function ContactMethods() {
  const isMobile = useIsMobile();

  const creaseSides: ("left" | "right" | "bottom" | "top")[] = isMobile
    ? ["left", "right", "top"]
    : ["left", "right", "bottom"];

  return (
    <Section className="bg-card py-0! overflow-hidden">
      <Container>
        <CreaseBox sides={creaseSides} padY="none" padX="none">
          <Stack
            preset="row-around-collapse"
            space={12}
            className="p-8 md:p-12 lg:py-16"
          >
            {CONTACT_METHODS.map((method) => (
              <div key={method.id} className="relative">
                <div className={cn("flex flex-col gap-1.5")}>
                  <p className="font-medium">{method.label}</p>
                  {method.href ? (
                    <Link
                      href={method.href}
                      className="text-md lg:text-xl font-light text-foreground hover:text-muted-foreground transition-colors duration-200 tracking-tight"
                    >
                      {method.value}
                    </Link>
                  ) : (
                    <p className="text-md lg:text-xl font-light text-foreground tracking-tight">
                      {method.value}
                    </p>
                  )}
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {method.note}
                  </p>
                </div>
              </div>
            ))}
          </Stack>
        </CreaseBox>
      </Container>
    </Section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "Produktspørsmål",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    {
      label: "Produktspørsmål",
      value: "products",
    },
    {
      label: "Tilbud / pris",
      value: "price",
    },
    {
      label: "Installering",
      value: "installation",
    },
    {
      label: "Reklamasjon",
      value: "complaint",
    },
    {
      label: "Annet",
      value: "other",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const commonInputClassName =
    "border-x-0 border-t-0 rounded-none bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-0";

  return (
    <Section className="py-0! bg-card overflow-hidden">
      <Container>
        <CreaseBox sides={["left", "right"]} padY="none" padX="none">
          {/* Right column: form */}
          <div>
            {submitted && (
              <div className="h-full flex flex-col items-start justify-center gap-4 py-16 bg-background">
                <CreaseBox
                  sides={["left", "right"]}
                  padX="none"
                  padY="none"
                  className="pl-5 border-l-0"
                >
                  <div className="pl-5 pointer-events-auto">
                    <p className="text-lg font-light text-foreground mb-2">
                      Melding mottatt.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Vi kommer tilbake til deg så snart som mulig — vanligvis
                      samme dag.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "Produktspørsmål",
                          message: "",
                        });
                      }}
                      className="mt-6 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Send ny melding →
                    </button>
                  </div>
                </CreaseBox>
              </div>
            )}

            <div className="p-px">
              {!submitted && (
                <div
                  className={cn(
                    "flex flex-col gap-7 relative h-full bg-background/20 pointer-events-auto",
                    "after:content-[''], after:absolute after:bg-background/30 after:z-1 after:inset-px",
                  )}
                >
                  <form className="p-8 relative z-6">
                    <FieldGroup>
                      <FieldSet>
                        <FieldLegend className="text-center text-xl!">
                          Send oss en melding!
                        </FieldLegend>
                        <FieldDescription className="max-w-[80ch] text-center mx-auto mb-6 md:mb-10">
                          Fortell oss hva du lurer på. Typisk trenger vi gjerne
                          mål, fasadetype og informasjon om hvorvidt du
                          planlegger å montere selv. Del så konkret som mulig om
                          prosjektet - det hjelper oss å svare deg bedre.
                        </FieldDescription>
                        <FieldGroup>
                          <div className="grid md:grid-cols-2 gap-8 md:gap-4">
                            <Field>
                              <FieldLabel>
                                Navn<span>*</span>
                              </FieldLabel>
                              <Input
                                className={cn(commonInputClassName)}
                                placeholder="Ola Nordmann"
                              />
                            </Field>
                            <Field>
                              <FieldLabel>
                                E-post<span>*</span>
                              </FieldLabel>
                              <Input
                                className={cn(commonInputClassName)}
                                placeholder="ola.nordmann@epost.no"
                              />
                            </Field>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Field>
                              <FieldLabel>Telefon</FieldLabel>
                              <Input
                                className={cn(commonInputClassName)}
                                placeholder="123 45 678"
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="subject">
                                Tema<span>*</span>
                              </FieldLabel>
                              <Select>
                                <SelectTrigger
                                  className={cn(commonInputClassName)}
                                  id="subject"
                                >
                                  <SelectValue placeholder="Velg tema" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {subjects.map((subj) => (
                                      <SelectItem
                                        value={subj.value}
                                        key={subj.value}
                                      >
                                        {subj.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </Field>
                          </div>
                          <Field>
                            <FieldLabel>
                              Melding<span>*</span>
                            </FieldLabel>
                            <Textarea
                              className={cn(
                                commonInputClassName,
                                "resize-none min-h-30",
                              )}
                              rows={5}
                              spellCheck="true"
                              lang="no-NB"
                              placeholder="Beskriv hva du lurer på — gjerne i detaljer..."
                            />
                          </Field>
                        </FieldGroup>
                      </FieldSet>
                      <FieldSet>
                        <div className="flex flex-col gap-6">
                          <Field
                            orientation={"horizontal"}
                            className="items-start"
                          >
                            <Checkbox
                              id="compliance"
                              className="mt-0.5 shrink-0"
                            />
                            <FieldLabel
                              htmlFor="compliance"
                              className="font-normal leading-snug flex flex-wrap"
                            >
                              Jeg har lest og godtar nettstedets
                              <Link
                                className="inline-flex items-center gap-1 underline hover:text-primary whitespace-nowrap"
                                href={SITE_URLS.LEGAL}
                              >
                                bruker- og personvernsvilkår
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </FieldLabel>
                          </Field>
                          <button
                            type="submit"
                            className="shrink-0 bg-card w-full cursor-pointer px-7 py-3 flex items-center justify-center gap-2 border text-foreground text-xs tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                          >
                            Send melding
                            <Send className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                      </FieldSet>
                    </FieldGroup>
                  </form>
                </div>
              )}
            </div>
          </div>
        </CreaseBox>
      </Container>
    </Section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <PageHeader
        className="text-white min-h-[45vh]"
        breadcrumbs={[
          {
            label: "Hjem",
            href: "/",
          },
          {
            label: "Kontakt",
          },
        ]}
        backgroundImage="/mock/product-window.webp"
        backgroundImageOptions={{
          opacity: 1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        overlay="2xl"
        // title="Vi er alltid klare for å hjelpe deg"
        title={["Vi er alltid klare", "for å hjelpe deg"]}
        description="Har du spørsmål om produkter, mål, montering eller frakt? Ta kontakt."
      />

      <div className="flex flex-col overflow-hidden bg-card">
        <Container>
          <CreaseBox
            sides={["left", "right", "bottom"]}
            overflow={["bottom"]}
            className="h-20"
          />
        </Container>
        <div className="flex flex-col-reverse md:flex-col">
          <ContactMethods />
          <ContactForm />
        </div>
        <Container>
          <CreaseBox
            sides={["left", "right", "top"]}
            overflow={["top"]}
            className="h-20"
          />
        </Container>
      </div>

      <Section className="py-0! overflow-hidden">
        <div className="aspect-square md:aspect-21/9 bg-muted relative overflow-hidden">
          {/* Placeholder for actual map */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
            <iframe
              title="Solskjerming AS lokasjon"
              src={EXTERNAL_URLS.GOOGLE_MAPS_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0 grayscale-50 dark:grayscale-100 contrast-80"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="absolute top-2 right-2 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
            <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded shadow-sm border border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium tracking-tight text-foreground">
                Måkeveien 6, Kråkerøy
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
