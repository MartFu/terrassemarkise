import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import matter from "gray-matter";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(articlesDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));

  // Log paths to verify they are being found during build
  console.log("Generating static paths:", paths);
  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    return { title: "Artikkel ikke funnet" };
  }

  const filePath = path.join(process.cwd(), "content/articles", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Artikkel ikke funnet",
    };
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  return {
    title: data.title || slug,
    description: data.description || "",
    keywords: data.keywords || [],
    authors: data.author ? [{ name: data.author }] : [],
    openGraph: {
      title: data.title || slug,
      description: data.description || "",
      type: "article",
      publishedTime: data.date || undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug === "undefined") {
    notFound();
  }

  const filePath = path.join(process.cwd(), "content/articles", `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  // Parse frontmatter and content
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <article className="prose lg:prose-xl mx-auto p-8">
      {frontmatter.title && <h1>{frontmatter.title}</h1>}
      {frontmatter.date && (
        <time className="text-muted-foreground">{frontmatter.date}</time>
      )}
      {frontmatter.author && (
        <p className="text-muted-foreground">Av {frontmatter.author}</p>
      )}

      {/* You'll need to convert markdown to HTML here */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
