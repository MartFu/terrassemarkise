import { getAllContent } from "@/lib/content-loader.server";
import ClientPage from "./page.client";

export default async function Page() {
  const { items: posts } = await getAllContent("ressurser");

  const categories = Array.from(
    new Set(
      posts.flatMap((post) =>
        post.frontmatter?.category ? [post.frontmatter.category] : [],
      ),
    ),
  );

  return <ClientPage posts={posts} categories={categories} />;
}
