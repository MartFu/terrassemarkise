import {
  products,
  generateStaticProductComparisonData,
} from "@/innhold/produkter";
import { notFound, redirect } from "next/navigation";
import { SITE_URLS } from "@/lib/constants";
import { ClientPage } from "./page.client";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  try {
    return [
      { slug: [] }, // index route
      ...products.map((item) => ({ slug: [String(item.slug)] })),
    ];
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [{ slug: [] }];
  }
}

export default async function ProductsPage({ params }: PageProps) {
  const { slug } = await params;

  // Slug route — redirect to awnings
  if (slug && slug.length > 0) {
    const product = products.find((p) => p.slug === slug[0]);
    if (!product) return notFound();
    redirect(SITE_URLS.AWNINGS + product.slug);
  }

  // Index route
  const comparisonData = generateStaticProductComparisonData();
  return <ClientPage comparisonData={comparisonData} />;
}
