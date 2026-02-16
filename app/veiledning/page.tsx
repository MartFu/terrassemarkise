import { getAllContent } from "@/lib/content-service";
import Link from "next/link";
import { ArticlesHero } from "@/components/articles/articles-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { guides } from "@/innhold/veiledning/guider";
import GuideCard from "@/components/articles/article-card";
import { Button } from "@/components/ui/button";
import { ArticleList } from "@/components/articles/article-list";
import { Marquee } from "@/components/ui/marquee";
import { CTASection } from "@/components/shared/cta";

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

const sampleArticles: Article[] = [
  {
    id: "terrace-trends-2025",
    slug: "terrace-trends-2025",
    title: "Terrasse-Trender for 2025: Naturlige Materialer og Bærekraft",
    excerpt:
      "Oppdag de nyeste trendene innen terrassebygging. Fra komposittmaterialer til smart belysning – slik skaper du det perfekte uteområdet.",
    category: "Terrasse Tips",
    date: "Mars 15, 2025",
    readTime: "6 min lesning",
    featured: true,
    image: "/articles/terrasse-trender-2025.jpg",
    author: {
      name: "Markiseeksperten",
    },
  },
  {
    id: "solskjerming-vs-markiser",
    slug: "solskjerming-vs-markiser",
    title: "Solskjerming eller Markiser? Velg Rett Løsning for Din Eiendom",
    excerpt:
      "Forstår forskjellen mellom faste solskjermingsløsninger og tradisjonelle markiser. Vi veileder deg til det beste valget for ditt klimat og behov.",
    category: "Solskjerming",
    date: "Februar 28, 2025",
    readTime: "7 min lesning",
    image: "/articles/solskjerming-sammenligning.jpg",
  },
  {
    id: "vedlikehold-terrasse",
    slug: "vedlikehold-terrasse",
    title: "Året Rundt Vedlikehold av Treterrassen Din",
    excerpt:
      "En sesongbasert guide for å holde treterrassen din fin og holdbar gjennom vinter, vår, sommer og høst.",
    category: "Vedlikehold",
    date: "Januar 20, 2025",
    readTime: "8 min lesning",
    image: "/articles/terrasse-vedlikehold.jpg",
  },
  {
    id: "automatiske-markiser-smart-hjem",
    slug: "automatiske-markiser-smart-hjem",
    title: "Automatiske Markiser: Fremtiden for Smart Hjem",
    excerpt:
      "Hvordan integrere automatiserte markiser i ditt smarte hjem for optimal komfort og energieffektivitet.",
    category: "Teknologi",
    date: "Desember 10, 2024",
    readTime: "5 min lesning",
    image: "/articles/automatiske-markiser.jpg",
  },
  {
    id: "bærekraftige-terrasse-materialer",
    slug: "bærekraftige-terrasse-materialer",
    title: "Bærekraftige Materialer til Din Nye Terrasse",
    excerpt:
      "En guide til miljøvennlige valg: FSC-sertifisert tre, resirkulert kompositt og andre bærekraftige alternativer.",
    category: "Bærekraft",
    date: "November 5, 2024",
    readTime: "10 min lesning",
  },
  {
    id: "solskjerming-bedrifter",
    slug: "solskjerming-bedrifter",
    title: "Solskjermingsløsninger for Bedrifter og Kontorer",
    excerpt:
      "Skape produktive arbeidsplasser med optimalt dagslys uten uønsket varme og blendingsproblemer.",
    category: "Kommersielle Løsninger",
    date: "Oktober 18, 2024",
    readTime: "9 min lesning",
    image: "/articles/kontor-solskjerming.jpg",
  },
  {
    id: "terrasse-tilgang-vinter",
    slug: "terrasse-tilgang-vinter",
    title: "Forbered Terrassen Din på Vinteren",
    excerpt:
      "Viktige tiltak for å beskytte terrassen mot frost, fukt og vinterens påkjenninger.",
    category: "Sesongråd",
    date: "September 30, 2024",
    readTime: "6 min lesning",
  },
  {
    id: "markise-mote-farger",
    slug: "markise-mote-farger",
    title: "Mote og Farger: Velg Rett Markise for Din Fasade",
    excerpt:
      "Slik matcher du markisen din med husets arkitektur, omgivelser og din personlige stil.",
    category: "Design",
    date: "August 22, 2024",
    readTime: "5 min lesning",
    image: "/articles/markise-farger-design.jpg",
  },
];

export default async function VeiledningIndexPage() {
  const veiledningItems = await getAllContent("veiledning");

  return (
    <>
      <ArticlesHero articles={sampleArticles} />
      {/* Marquee Section */}
      <Section className={"py-12! border-t"}>
        <Container>
          <Marquee fadeOut speed={100} pauseOnHover gap="1.5rem">
            {sampleArticles.map((post, index) => (
              <ArticleCard key={index} {...post} />
            ))}
          </Marquee>
        </Container>
      </Section>
      <ArticleList articles={sampleArticles} />
      <Section className="py-16 md:py-24">
        <Container>
          {/* Quick links */}
          <div className="mb-12 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link
                href="/veiledning/case-studier"
                className="inline-flex items-center gap-1"
              >
                Kundehistorier <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="/veiledning/verktoy"
                className="inline-flex items-center gap-1"
              >
                Prisberegner <ArrowRight size={14} />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
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
        href={`/veiledning/${slug}`}
        className="block! hover:no-underline! hover:text-foreground/80! text-foreground! cursor-pointer"
      >
        <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {category}
        </div>
        <h3 className="font-semibold leading-tight max-w-[32ch]">{title}</h3>
      </Link>
    </div>
  );
}
