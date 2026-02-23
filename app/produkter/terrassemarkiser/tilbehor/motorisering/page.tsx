"use client";
/* eslint-disable @next/next/no-img-element */

import { PageHeader } from "@/components/shared/page-header";

import { cn } from "@/lib/utils";

import { ContactCTA } from "@/components/shared/contact-cta";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SITE_URLS } from "@/lib/constants";

export default function Page({}: {}) {
  return (
    <>
      <PageHeader
        className="min-h-[50vh] text-white"
        title={["Tilbehør", "— Motorisering"]}
        description="Vi fører en rekke tilbehør som forenkler vedlikehold og øker kapabilitetene på våre terrassemarkiser"
        backgroundImage="/mock/product-folding.png"
        backgroundImageOptions={{
          opacity: 1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        overlay="xl"
        breadcrumbs={[
          { label: "Hjem", href: "/" },
          { label: "Terrassemarkiser", href: SITE_URLS.AWNINGS },
          { label: "Tilbehør", href: SITE_URLS.ACCESSORIES },
          { label: "Motorer" },
        ]}
      />

      <Section>
        <Container>Tilbehør</Container>
      </Section>

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
