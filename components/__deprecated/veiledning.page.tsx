import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllContent } from "@/lib/content-loader.server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { CTASection } from "@/components/shared/cta";
import { ArticleList } from "@/components/articles/article-list";
import GuideCard from "@/components/articles/article-card";
import { truncate } from "@/lib/utils";
import { SITE_URLS } from "@/lib/constants";

/* Gammel type - Article må konsolideres */
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  image?: string;
  featured?: boolean;
}

const featuredArticles = [
  {
    id: "terrace-trends-2025",
    slug: "terrace-trends-2025",
    title: "Terrasse-Trender for 2025: Naturlige Materialer og Bærekraft",
    excerpt: "Oppdag de nyeste trendene innen terrassebygging.",
    category: "Terrasse Tips",
    date: "15.03.2025",
    readTime: "6 min",
    featured: true,
    image: "/assets/product-images/corisca_illustration.jpg",
    author: { name: "Markiseeksperten" },
  },
  // ... other sample articles
];

export default async function VeiledningPage() {
  // Load dynamic content from /innhold/veiledning
  const { items: guides, totalCount } = await getAllContent("Ressurser");

  return (
    <>
      <PageHeader
        className="text-white"
        title="Lær hvordan handle, installere og vedlikeholde din nye terrassemarkise"
        description="Her finner du nyttige ressurser som hjelper deg med å få mest mulig ut av din nye terrassemarkise. Alt starter med å velge rett!"
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Ressurser" }]}
        overlay={"3xl"}
        backgroundImageOptions={{
          opacity: 0.4,
          objectFit: "cover",
          objectPosition: "center",
        }}
        backgroundImage={"/assets/5grader.jpg"}
      />

      {/* Marquee with featured articles */}
      <Section className="py-12! border-t">
        <Container>
          <Marquee fadeOut speed={100} pauseOnHover gap="1.5rem">
            {featuredArticles.map((post) => (
              <ArticleCard key={post.id} {...post} />
            ))}
          </Marquee>
        </Container>
      </Section>

      <ArticleList articles={featuredArticles} />

      <Section className="py-16 md:py-24">
        <Container>
          {/* Quick links */}
          <div className="mb-12 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link
                href={SITE_URLS.CASE_STUDIES}
                className="inline-flex items-center gap-1"
              >
                Kundehistorier <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={SITE_URLS.TOOLS + "kalkulator"}
                className="inline-flex items-center gap-1"
              >
                Kalkulator <ArrowRight size={14} />
              </Link>
            </Button>
          </div>

          {/* Dynamic guides from content service */}
          {totalCount > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard
                  key={guide.slug}
                  slug={guide.slug}
                  title={guide.frontmatter.title || guide.slug}
                  excerpt={guide.frontmatter.description || ""}
                  category="Veiledning"
                  date={guide.frontmatter.date || new Date().toISOString()}
                  readTime={`${Math.max(1, Math.ceil(guide.slug.length / 5))} min`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-muted/30">
              <p className="text-muted-foreground">
                Ingen tilgjengelige ressurser for øyeblikket.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

function ArticleCard({
  title,
  category,
  slug,
}: {
  title: string;
  category: string;
  slug: string;
}) {
  return (
    <div className="w-60 md:w-80 border-l border-border px-4 transition-colors hover:border-foreground/20">
      <Link
        href={`${SITE_URLS.RESOURCES}${slug}`}
        className="block hover:no-underline hover:text-foreground/80 text-foreground"
      >
        <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {category}
        </div>
        <h3 className="font-semibold leading-tight max-w-[32ch] line-clamp-2">
          {truncate(title, 60)}
        </h3>
      </Link>
    </div>
  );
}
