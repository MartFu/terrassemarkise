import { getAllContent } from "@/lib/content-loader.server";
// import ClientPage from "./client.page";

export default async function Page() {
  const { items: posts } = await getAllContent("ressurser");

  const categories = Array.from(
    new Set(
      posts.flatMap((post) =>
        post.frontmatter?.category ? [post.frontmatter.category] : [],
      ),
    ),
  );

  return null;
  // return <ClientPage posts={posts} categories={categories} />;
}
