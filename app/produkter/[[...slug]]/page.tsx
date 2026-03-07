import { products } from "@/innhold/produkter";
import { notFound, redirect } from "next/navigation";
import { SITE_URLS } from "@/lib/constants";

export function generateStaticParams() {
  try {
    return products.map((item) => ({
      slug: String(item.slug),
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  redirect(SITE_URLS.AWNINGS + product.slug);
}
