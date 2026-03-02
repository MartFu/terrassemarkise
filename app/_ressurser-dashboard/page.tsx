import { getAllContent } from "@/lib/content-loader.server";
import { redirect } from "next/navigation";
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

  redirect("/");
  // return <ClientPage posts={posts} categories={categories} />;
}
