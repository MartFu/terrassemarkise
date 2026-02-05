// app/components/content-page-template.tsx
"use client";

import { ContentType } from "@/types";
import { Link } from "./ui/link";
import {
  HelpCircle,
  Scale,
  BookOpen,
  ArrowLeft,
  HelpingHand,
} from "lucide-react";
import { ClientErrorBoundary } from "./client-error-boundary";
import { Section } from "./ui/section";
import { Container } from "./ui/container";

interface ContentPageTemplateProps {
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    author?: string;
    keywords?: string[];
  };
  contentHtml: string;
  contentType: ContentType;
  slug: string;
}

export function ContentPageTemplate({
  frontmatter,
  contentHtml,
  contentType,
  slug,
}: ContentPageTemplateProps) {
  const getContentTypeInfo = () => {
    switch (contentType) {
      case "veiledning":
        return {
          title: "Veiledning",
          icon: <HelpingHand />,
          path: "/veiledning",
        };
      case "juridisk":
        return {
          title: "Juridisk",
          icon: <Scale />,
          path: "/juridisk",
        };
      default:
        return {
          title: "Innhold",
          icon: <BookOpen />,
          path: "/",
        };
    }
  };

  const typeInfo = getContentTypeInfo();

  return (
    <ClientErrorBoundary context={contentType} slug={slug}>
      <div className="min-h-screen bg-background">
        {/* Content Type Header */}
        <Section className="pb-0!">
          <Container>
            <div className="flex items-center space-x-2">
              {typeInfo.icon}
              <span className="text-xl font-medium uppercase tracking-wide">
                {typeInfo.title}
              </span>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            {/* Main Content */}
            <article>
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link href="/">Hjem</Link>
                <span>/</span>
                <Link href={`/${contentType}`} className="hover:text-gray-700">
                  {typeInfo.title}
                </Link>
                <span>/</span>
                <span className="text-gray-700">
                  {frontmatter.title || "Dokument"}
                </span>
              </nav>

              {/* Publication Info */}
              <div className="mb-8 space-y-2">
                {frontmatter.date && (
                  <time
                    dateTime={frontmatter.date}
                    className="block text-sm text-gray-500"
                  >
                    Publisert:{" "}
                    {new Date(frontmatter.date).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}

                {frontmatter.author && (
                  <p className="text-sm text-gray-600">
                    Forfatter: {frontmatter.author}
                  </p>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {frontmatter.title || "Uten tittel"}
              </h1>

              {/* Description */}
              {frontmatter.description && (
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg border-l-4 border-gray-300">
                    {frontmatter.description}
                  </p>
                </div>
              )}

              {/* Keywords */}
              {frontmatter.keywords && frontmatter.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {frontmatter.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Back to List Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href={`/${contentType}`}>
                  <ArrowLeft /> Tilbake til {typeInfo.title.toLowerCase()}
                </Link>
              </div>
            </article>
          </Container>
        </Section>
      </div>
    </ClientErrorBoundary>
  );
}
