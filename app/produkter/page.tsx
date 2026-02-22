/* eslint-disable @next/next/no-img-element */

import { PageHeader } from "@/components/shared/page-header";

import { FAQSection } from "@/components/shared/faq-section";

import { cn } from "@/lib/utils";

import { ContactCTA } from "@/components/shared/contact-cta";
import { ProductShowcase } from "@/components/products/product-showcase";
import { submitContactForm } from "../actions/contact";
import { ComparisonTable } from "@/components/comparison-table/table";
import {
  generateStaticProductComparisonData,
  productComparisonTableMetadata,
} from "@/innhold/produkter/comparison.data";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/typography";
import { Info } from "lucide-react";

export default async function Page() {
  const comparisonData = generateStaticProductComparisonData();

  console.log("COMP data", comparisonData);

  return (
    <>
      <PageHeader
        className="min-h-[50vh]"
        title={["Terrassemarkiser —", "skreddersydd på dine mål"]}
        description="Vi produserer din markise på bestilling, slik at den passer optimalt til ditt tilfelle."
        backgroundImage="/mock/product-folding.png"
        backgroundImageOptions={{
          opacity: 1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        overlay="xl"
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Produkter" }]}
      />

      <ProductShowcase />
      <Section id="sammenligning">
        <Container>
          <SectionHeader className="text-center mx-auto">
            <SectionTitle className="text-center">
              Detaljert sammenligning av <br /> våre terrassemarkiser
            </SectionTitle>
            <SectionDescription className="text-center">
              Alle forskjeller mellom våre modeller samlet på ett sted. Fra
              kassettbeskyttelse og vindautomasjon til app-styring og
              smarthjem-integrasjon.
            </SectionDescription>
          </SectionHeader>
          <ComparisonTable
            data={comparisonData}
            footer={
              <Stack direction={"row"} align="center" justify="between">
                <Text size="sm">
                  <span className="text-red-500">* </span>
                  {productComparisonTableMetadata.footer.note}
                </Text>
                <Info className="text-accent" />
              </Stack>
            }
          />
        </Container>
      </Section>
      <FAQSection
        className="pt-12! pb-0!"
        title="Ofte stilte spørsmål"
        description="Vi får mange spørsmål om våre produkter. Her finner du noen svar på
          generelle spørsmål som omhandler flere eller alle produkter. Du kan
          finne spørsmål tilknyttet spesifikke produkter ved å trykke deg inn på
          den respektive produktsiden."
        decriptionSize="sm"
        faqs={[
          {
            question: "Tåler markisene det norske været?",
            answer:
              "Ja, disse markisene egner seg utmerket for norske forhold.",
          },
        ]}
      />
      <ContactCTA
        title="Utfordrende å finne rett løsning?"
        description="Vi har forståelse for at det kan være vanskelig å velge rett selv. Kontakt oss, så hjelper vi deg med å finne den beste løsningen for nettopp ditt behov."
        formProps={{
          serverAction: submitContactForm,
          fields: [
            {
              label: "Navn",
              name: "name",
              type: "text",
              placeholder: "Ditt navn",
            },
            {
              label: "Telefon",
              name: "phone",
              type: "tel",
              placeholder: "000 00 000",
            },
            {
              label: "Epost",
              name: "email",
              type: "email",
              placeholder: "ola@email.com",
            },
            {
              label: "Sted",
              name: "location",
              type: "select",
              placeholder: "Velg din region",
              options: [
                {
                  label: "Fredrikstad",
                  value: "fredrikstad",
                },
                {
                  label: "Oslo",
                  value: "oslo",
                },
                {
                  label: "Akershus",
                  value: "akershus",
                },
                {
                  label: "Vestfold",
                  value: "vestfold",
                },
                {
                  label: "Annet",
                  value: "annet",
                },
              ],
            },
            {
              label: "Melding",
              type: "textarea",
              name: "message",
              placeholder: "Skriv din melding her",
              rows: 6,
            },
          ],
          submitLabel: "Send forespørsel",
        }}
      >
        <div
          className={cn(
            "mt-4 text-xs absolute bottom-12 shadow-md shadow-black/5 p-6 rounded-xl bg-accent/10 text-foreground font-medium",
          )}
        >
          Visste du at vi tilbyr gratis befaring i Østfold, Oslo, Akershus og
          Vestfold
        </div>
      </ContactCTA>
    </>
  );
}
