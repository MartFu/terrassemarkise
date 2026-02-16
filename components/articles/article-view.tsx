"use client";

import {
  Calendar,
  Clock,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Link } from "../ui/link";
import { Section } from "../ui/section";
import { Container } from "../ui/container";

interface ArticleDetailProps {
  article: any & {
    content: string;
    tags?: string[];
  };
  relatedArticles?: any[];
}

// Category Badge (reused from ArticleList)
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] font-serif font-medium uppercase tracking-wider text-secondary-foreground bg-secondary rounded">
      {category}
    </span>
  );
}

// Article Metadata
function ArticleMeta({
  date,
  readTime,
  author,
  className,
}: {
  date: string;
  readTime?: string;
  author?: { name: string; avatar?: string };
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-6 text-sm", className)}>
      {author && (
        <div className="flex items-center gap-2">
          {author.avatar ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.avatar}
                alt={author.name}
                className="h-8 w-8 rounded-full border border-border"
              />
            </>
          ) : (
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground">
              {author.name.charAt(0)}
            </div>
          )}
          <span className="font-medium text-foreground">{author.name}</span>
        </div>
      )}
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <time>{date}</time>
      </div>
      {readTime && (
        <>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>
        </>
      )}
    </div>
  );
}

// Share Buttons
function ShareButtons({ title, url }: { title: string; url: string }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Del:</span>
      <div className="flex items-center gap-2">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-secondary hover:border-foreground/20 transition-colors"
          aria-label="Del på Facebook"
        >
          <Facebook className="h-4 w-4" />
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-secondary hover:border-foreground/20 transition-colors"
          aria-label="Del på Twitter"
        >
          <Twitter className="h-4 w-4" />
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-secondary hover:border-foreground/20 transition-colors"
          aria-label="Del på LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// Related Article Card
function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative border border-border hover:bg-accent/20 transition-colors">
      <Link
        href={`/veiledning/${article.id}`}
        className="flex flex-col h-full hover:no-underline!"
      >
        {article.image && (
          <div className="relative h-48 overflow-hidden bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-6">
          <div className="mb-2">
            <CategoryBadge category={article.category} />
          </div>
          <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-amber-900 leading-tight">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}

// Markdown Renderer with Custom Styling
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Headings
        h1: ({ children, ...props }) => (
          <h1
            className="text-4xl font-bold tracking-tight text-foreground mb-6 mt-12 first:mt-0"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="text-3xl font-bold tracking-tight text-foreground mb-4 mt-10 border-b border-border pb-2"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="text-2xl font-semibold tracking-tight text-foreground mb-3 mt-8"
            {...props}
          >
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4
            className="text-xl font-semibold tracking-tight text-foreground mb-2 mt-6"
            {...props}
          >
            {children}
          </h4>
        ),
        // Paragraphs
        p: ({ children, ...props }) => (
          <p className="text-foreground leading-relaxed mb-6" {...props}>
            {children}
          </p>
        ),
        // Links
        a: ({ children, href, ...props }) => (
          <Link
            href={href || "#"}
            className="font-medium text-amber-800 hover:text-amber-900 underline decoration-amber-800/30 hover:decoration-amber-900"
            {...props}
          >
            {children}
          </Link>
        ),
        // Lists
        ul: ({ children, ...props }) => (
          <ul
            className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="list-decimal list-outside ml-6 mb-6 space-y-2 text-foreground"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="leading-relaxed" {...props}>
            {children}
          </li>
        ),
        // Blockquotes
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-amber-800 pl-6 py-2 my-6 italic text-muted-foreground bg-secondary/30"
            {...props}
          >
            {children}
          </blockquote>
        ),
        // Code blocks
        code: ({ inline, children, ...props }: any) => {
          return inline ? (
            <code
              className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="block p-4 rounded-lg bg-secondary text-foreground font-mono text-sm overflow-x-auto my-6"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children, ...props }) => (
          <pre className="my-6" {...props}>
            {children}
          </pre>
        ),
        // Images
        img: ({ src, alt, ...props }) => (
          <figure className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || ""}
              className="w-full rounded-lg border border-border"
              {...props}
            />
            {alt && (
              <figcaption className="mt-2 text-sm text-center text-muted-foreground italic">
                {alt}
              </figcaption>
            )}
          </figure>
        ),
        // Tables
        table: ({ children, ...props }) => (
          <div className="my-6 overflow-x-auto">
            <table
              className="w-full border-collapse border border-border"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-secondary" {...props}>
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th
            className="border border-border px-4 py-2 text-left font-semibold text-foreground"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="border border-border px-4 py-2 text-foreground"
            {...props}
          >
            {children}
          </td>
        ),
        // Horizontal rule
        hr: ({ ...props }) => (
          <hr className="my-8 border-t border-border" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// Main ArticleDetail Component
export function ArticleDetail({
  article,
  relatedArticles,
}: ArticleDetailProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="text-foreground">
      {/* Back Navigation */}
      <Section className="py-6 border-b border-border">
        <Container>
          <Link
            href="/veiledning"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:no-underline!"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake til artikler
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section className="pt-12 pb-8">
        <Container className="max-w-4xl">
          <div className="mb-6">
            <CategoryBadge category={article.category} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {article.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-border">
            <ArticleMeta
              date={article.date}
              readTime={article.readTime}
              author={article.author}
            />
            <ShareButtons title={article.title} url={currentUrl} />
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {article.image && (
        <Section className="py-0">
          <Container className="max-w-5xl">
            <div className="relative overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Article Content */}
      <Section className="py-12">
        <Container className="max-w-4xl">
          <MarkdownContent content={article.content} />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-muted-foreground border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <Section className="py-12 bg-secondary/30 border-t border-border">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Relaterte artikler
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <RelatedArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
