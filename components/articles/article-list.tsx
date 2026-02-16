"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Clock,
  Calendar,
  Search,
  ArrowUpRight,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Section } from "../ui/section";
import Link from "next/link";

// Types
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

interface ArticleListProps {
  articles: Article[];
  className?: string;
}

// Article Category Badge
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] font-serif font-medium uppercase tracking-wider text-secondary-foreground bg-secondary/50 rounded">
      {category}
    </span>
  );
}

// Article Metadata
function ArticleMeta({
  date,
  readTime,
  className,
  featured = false,
}: {
  date: string;
  readTime?: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-sm",
        featured ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        <time>{date}</time>
      </div>
      {readTime && (
        <>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>
        </>
      )}
    </div>
  );
}

// Featured Article Card (Large)
function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative overflow-hidden border-b border-border/30 hover:bg-accent/10">
      <Link
        href={`/veiledning/${article.id}`}
        className="hover:no-underline! py-0!"
      >
        {article.image && (
          <div
            className={cn(
              "absolute h-full w-full overflow-hidden bg-secondary/20",
              // "after:content-[''] after:absolute after:inset-0 after:z-1 after:bg-linear-to-r after:from-background/10 after:via-background/10 after:to-background",
            )}
          >
            {/* <div className="absolute top-0 inset-x-0 z-1 bg-linear-to-b from-background to-transparent h-12" /> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="w-full min-h-80 xl:min-h-120 relative flex justify-start items-end z-1">
          <div className="bg-linear-to-r from-background/70 via-background/70 to-background/20 p-4 w-full">
            <h2 className="mb-4 text-xl lg:text-2xl max-w-[32ch] font-bold tracking-tight text-foreground">
              {article.title}
            </h2>
            <div className="flex items-center justify-between">
              <ArticleMeta
                featured
                date={article.date}
                readTime={article.readTime}
              />
              <div className="flex items-center gap-1 font-semibold text-primary">
                <span>Les mer</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Standard Article Card
function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className={
        "group relative flex flex-col overflow-hidden hover:bg-secondary/10 border-border/30 border"
      }
    >
      <Link
        href={`/veiledning/${article.id}`}
        className="flex flex-col h-full hover:no-underline!"
      >
        <div className="flex flex-col flex-1 p-8">
          <div className="mb-3">
            <CategoryBadge category={article.category} />
          </div>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent leading-tight">
            {article.title}
          </h3>
          <p className="mb-4 flex-1 text-muted-foreground leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
          <ArticleMeta
            date={article.date}
            readTime={article.readTime}
            className="mt-auto pt-4 border-t border-border/50"
          />
        </div>
      </Link>
    </article>
  );
}

// List View Article Card
function ArticleListItem({ article }: { article: Article }) {
  return (
    <article className="group relative my-px ml-px border-l border-y border-border/30 last:border-b-0 transition-colors hover:bg-secondary/20">
      <Link
        href={`/articles/${article.id}`}
        className="flex gap-6 py-6 px-4 hover:no-underline!"
      >
        {article.image && (
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-lg bg-secondary/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <div className="mb-2">
              <CategoryBadge category={article.category} />
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {article.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
          <ArticleMeta date={article.date} readTime={article.readTime} />
        </div>
        <div className="flex items-end">
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </article>
  );
}

// Filter Bar Component
function ArticleFilters({
  categories,
  activeCategory,
  onCategoryChange,
  onToggleLayout,
  layout,
}: {
  layout: "grid" | "list";
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onToggleLayout: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="w-full flex items-center gap-1">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2" />
          <Input placeholder="Søk..." className="w-full" />
        </div>
        <Button
          title={"Vis som " + (layout === "grid" ? "liste" : "rutenett")}
          size={"icon"}
          variant={"outline"}
          onClick={onToggleLayout}
          className="focus-visible:outline-0! focus-visible:ring-0!"
        >
          {layout === "grid" ? <List /> : <Grid />}
        </Button>
      </div>
      <span className="w-full uppercase font-serif tracking-wide text-sm font-semibold">
        Tagger
      </span>
      <Button
        variant={"outline"}
        onClick={() => onCategoryChange(null)}
        className={cn(
          activeCategory === null ? "bg-accent text-accent-foreground" : "",
        )}
      >
        Alle
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          value={category}
          variant={"outline"}
          onClick={() => onCategoryChange(category)}
          className={cn(
            activeCategory === category
              ? "bg-accent text-accent-foreground"
              : "",
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

// Main ArticleList Component
export function ArticleList({ articles, className }: ArticleListProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  );

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(articles.map((article) => article.category));
    return Array.from(cats).sort();
  }, [articles]);

  // Filter articles
  const filteredArticles = React.useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [articles, activeCategory]);

  // Separate featured from regular articles
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <Section className={cn("w-full pt-0!", className)}>
      <Container>
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="space-y-8">
            {featuredArticles.map((article) => (
              <FeaturedArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Container>

      <Container className="grid md:grid-cols-[0.33fr_1fr]">
        <div className="mb-2 border-0 md:mb-0 h-full relative md:border-r md:border-t border-border/30 pt-2 pr-2 mt-px">
          <div className="block md:sticky top-32">
            {categories.length > 1 && (
              <ArticleFilters
                layout={layout}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onToggleLayout={() =>
                  setLayout((prev) => (prev === "grid" ? "list" : "grid"))
                }
              />
            )}
          </div>
        </div>

        <div className="pt-0">
          {/* Regular Articles */}
          {layout === "grid" && (
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-px p-px">
              {regularArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {layout === "list" && (
            <div className="divide-y divide-border">
              {regularArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-6xl">📄</div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Ingen artikler funnet
              </h3>
              <p className="text-muted-foreground">
                Prøv å velge en annen kategori eller se alle artikler
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

// Export sub-components for flexibility
export { CategoryBadge, ArticleMeta, ArticleCard, FeaturedArticleCard };
