"use client";
/* eslint-disable @next/next/no-img-element */

import { PageHeader } from "@/components/shared/page-header";
import { FAQSection } from "@/components/shared/faq-section";
import { ContactCTA } from "@/components/shared/contact-cta";
import { ProductShowcase } from "@/components/products/product-showcase";
import { ComparisonTable } from "@/components/comparison-table/table";
import { productComparisonTableMetadata } from "@/innhold/produkter/comparison.data";
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
import { StaticComparisonData } from "@/lib/comparison";
import {
  GENERAL_PRODUCT_FAQS,
  GENERAL_PRODUCT_FAQS_SECTION_CONTENT,
} from "@/innhold/produkter/product-faqs";

export function ClientPage({
  comparisonData,
}: {
  comparisonData: StaticComparisonData;
}) {
  return (
    <>
      <PageHeader
        className="min-h-[50vh] text-white"
        title={["Terrassemarkiser —", "skreddersydd på dine mål"]}
        description="Vi produserer din markise på bestilling, slik at den passer optimalt til ditt tilfelle."
        backgroundImage="/mock/product-folding.webp"
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
                <Info className="text-accent w-4 h-4 shrink-0" />
              </Stack>
            }
          />
        </Container>
      </Section>
      <FAQSection
        {...GENERAL_PRODUCT_FAQS_SECTION_CONTENT}
        decriptionSize="sm"
        faqs={GENERAL_PRODUCT_FAQS}
      />
      <ContactCTA
        title="Utfordrende å finne rett løsning?"
        description="Vi har forståelse for at det kan være vanskelig å velge rett selv. Kontakt oss, så hjelper vi deg med å finne den beste løsningen for nettopp ditt behov."
        formProps={{
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
                { label: "Fredrikstad", value: "fredrikstad" },
                { label: "Oslo", value: "oslo" },
                { label: "Akershus", value: "akershus" },
                { label: "Vestfold", value: "vestfold" },
                { label: "Annet", value: "annet" },
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
      />
    </>
  );
}
