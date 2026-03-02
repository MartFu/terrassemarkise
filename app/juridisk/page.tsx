// app/juridisk/page.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllContent } from "@/lib/content-loader.server";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/typography";
import { cn, truncate } from "@/lib/utils";
import { SITE_URLS } from "@/lib/constants";

export default async function JuridiskIndexPage() {
  // Safe loading - returns empty array on error
  const { items: documents, totalCount } = await getAllContent("juridisk");

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Juridisk" }]}
        className="bg-card"
        title="Juridisk dokumentasjon"
        minHeight="min-h-40"
        description="Lær om hvordan vi håndterer personvern, cookies og andre juridiske aspekter knyttet til våre tjenester."
      />

      <Section className="min-h-80vh">
        <Container>
          {totalCount === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                Ingen dokumenter funnet.
              </p>
              <p className="text-sm text-muted-foreground/60">
                Sjekk tilbake senere for oppdatert informasjon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {documents
                .filter((doc) => doc.frontmatter.title)
                .map((doc) => (
                  <Link
                    key={doc.slug}
                    href={SITE_URLS.LEGAL + doc.slug}
                    className={cn(
                      "group w-full px-6 md:px-12 flex flex-wrap items-center border-b justify-between py-6 transition-all hover:bg-card/50",
                    )}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <h2 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground truncate">
                        {doc.frontmatter.title}
                      </h2>
                      {doc.frontmatter.description && (
                        <Text
                          size="sm"
                          color="muted"
                          className="max-w-lg line-clamp-2"
                        >
                          {truncate(doc.frontmatter.description, 100)}
                        </Text>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 ml-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
