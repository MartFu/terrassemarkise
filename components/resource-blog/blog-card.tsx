import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Frontmatter } from "@/lib/content-loader.types";

interface BlogCardProps {
  data: Frontmatter;
  slug: string;
}

export function BlogCard({ data, slug }: BlogCardProps) {
  return (
    <Link href={`/ressurser/${slug}`} className="group block">
      <Card className="h-full pt-0 overflow-hidden border shadow-sm">
        <CardContent className="px-6 pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {data.category && (
                <Badge variant="secondary" className="rounded-full">
                  {data.category}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                {data.title}
              </h3>
              {data.excerpt && (
                <p className="text-muted-foreground line-clamp-3">
                  {data.excerpt}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        {data.keywords && (
          <CardFooter className="p-6 py-0 flex flex-wrap gap-2">
            {data.keywords.slice(0, 2).map((keyword) => (
              <Badge
                key={keyword}
                variant="outline"
                className="rounded-full text-xs"
              >
                {keyword}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
