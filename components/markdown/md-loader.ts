import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "innhold");

export interface ContentFile {
  content: string;
  frontmatter: Record<string, unknown>;
  slug: string;
}

// Generic loader for a specific directory
function getContentFromDir(dirName: string): ContentFile[] {
  const dirPath = path.join(contentDir, dirName);

  console.log(dirPath);

  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const fullPath = path.join(dirPath, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      content,
      frontmatter: data,
      slug: file.replace(/\.md$/, ""),
    };
  });
}

// Specific loaders - each page uses only what it needs
export const getArticles = () => getContentFromDir("veiledning/artikler");
export const getLegalDocs = () => getContentFromDir("juridisk");
export const getDocs = () => getContentFromDir("docs");

// Single file loaders
export const getArticleBySlug = (slug: string) =>
  getContentFromDir("veiledning/artikler").find((a) => a.slug === slug);

export const getLegalDocBySlug = (slug: string) =>
  getContentFromDir("juridisk").find((d) => d.slug === slug);
