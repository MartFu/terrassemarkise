import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Heading, Text } from "../ui/typography";
import { SITE_URLS } from "@/lib/constants";

interface GuideCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  basePath?: string;
  date?: string;
}

const GuideCard = ({
  slug,
  title,
  excerpt,
  category,
  readTime,
  date,
  basePath = SITE_URLS.RESOURCES,
}: GuideCardProps) => {
  return (
    <Link
      href={`${basePath}${slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:shadow-foreground/5"
    >
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="rounded-sm bg-secondary px-2 py-0.5 font-medium uppercase tracking-wider text-secondary-foreground">
          {category}
        </span>
        <span>{`${readTime} lesing`}</span>
      </div>
      <Heading level={"h3"} className="text-lg! mt-4 mb-2">
        {title}
      </Heading>
      <Text className="text-sm">{excerpt}</Text>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-accent">
        Les mer{" "}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
};

export default GuideCard;
