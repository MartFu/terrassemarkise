"use client";

import { BlogCard } from "@/components/resource-blog/blog-card";
import { BlogHero } from "@/components/resource-blog/blog-hero";
import { CategoriesFilter } from "@/components/resource-blog/categories-filter";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContentItem } from "@/lib/content-loader.types";
import { useState } from "react";

interface Props {
  posts: ContentItem[];
  categories: string[];
}

export default function Page({ posts, categories }: Props) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const metadata = post.frontmatter;
    const matchesCategory =
      category && category !== "all" ? metadata?.category === category : true;
    const matchesQuery = query
      ? metadata?.title?.toLowerCase().includes(query.toLowerCase()) ||
        metadata?.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        metadata?.tags?.map((t) =>
          t.toLowerCase().includes(query.toLowerCase()),
        )
      : true;

    return matchesCategory && matchesQuery;
  });

  console.log(posts);

  return (
    <>
      <PageHeader
        className="min-h-[50vh] text-white"
        title={["Utforsk våre gudier,", "videoer og artikler"]}
        description="Vi gjør en innsats for at nesten hvem som helst skal kunne montere våre produkter."
        backgroundImage="/mock/product-folding.png"
        backgroundImageOptions={{
          opacity: 1,
          objectFit: "cover",
          objectPosition: "center",
        }}
        overlay="xl"
        breadcrumbs={[{ label: "Hjem", href: "/" }, { label: "Ressurser" }]}
      />
      <Section className="pb-0!">
        <Container className="border-b pb-12">
          <BlogHero query={query} onSetQuery={(query) => setQuery(query)} />
        </Container>
      </Section>

      <Section className="pt-0!">
        <Container className="pt-12">
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Våre seneste artikler om markiser
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Hold deg oppdatert med siste nytt fra våre eksperter.
                </p>
              </div>

              {categories && (
                <CategoriesFilter
                  categories={categories}
                  activeCategory={category}
                  onSetCategory={(category) => setCategory(category)}
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
              {filteredPosts.map((post, idx) => (
                <BlogCard
                  key={`post-card-${idx}`}
                  data={post.frontmatter}
                  slug={post?.slug}
                />
              ))}
            </div>

            {/* You can now pass query/category to pagination links too */}
          </div>
        </Container>
      </Section>
    </>
  );
}
