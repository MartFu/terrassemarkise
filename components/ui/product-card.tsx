// components/molecules/ArticleCard.tsx
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/innhold/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "compact";
}

export function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "nb-NO",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  if (variant === "horizontal") {
    return (
      <Link href={`/veiledning/${article.slug}`} className="group block">
        <Card>
          {article.image && (
            <div className="relative w-48 h-32 shrink-0 rounded-md overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-1 py-2">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  article.category === "tool"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                )}
              >
                {article.category === "tool" ? "Verktøy" : "Artikkel"}
              </span>
              <Text size="xs" color="muted">
                {formattedDate}
              </Text>
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {article.excerpt}
            </CardDescription>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min lesning
              </span>
              <span className="flex items-center gap-1">{article.author}</span>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-4" />
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/veiledning/${article.slug}`} className="group block">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded",
                article.category === "tool"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
              )}
            >
              {article.category === "tool" ? "Verktøy" : "Artikkel"}
            </span>
            <Text size="xs" color="muted">
              {formattedDate}
            </Text>
          </div>
          <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </CardTitle>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/veiledning/${article.slug}`} className="group block h-full">
      <Card>
        {article.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                article.category === "tool"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
              )}
            >
              {article.category === "tool" ? "Verktøy" : "Artikkel"}
            </span>
            <Text size="xs" color="muted" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime} min
            </Text>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {article.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
            <span>{article.author}</span>
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
