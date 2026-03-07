import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Frontmatter } from "@/lib/content-loader.types";
import { SITE_URLS } from "@/lib/constants";

interface BlogCardProps {
  data: Frontmatter;
  slug: string;
}

export function BlogCard({ data, slug }: BlogCardProps) {
  return (
    <Link href={`${SITE_URLS.RESOURCES}${slug}`} className="group block">
      <Card className="h-full pt-0 overflow-hidden bg-background hover:bg-card/40 shadow-sm rounded-none">
        <div className="min-h-40 relative overflow-hidden">
          <div
            className="absolute inset-0 w-full"
            style={{
              backgroundImage: `url('${data.thumbnailSrc}')`,
              backgroundPosition: data?.thumbnailObjectPosition ?? "center",
              backgroundSize: "cover",
            }}
          />
        </div>
        <CardContent className="group">
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
